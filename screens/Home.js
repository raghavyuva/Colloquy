import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Platform,
  StatusBar,
} from "react-native";
import Headerv from "../components/Header";
import Postcard from "../components/Postcard";
import { DataLayerValue } from "../Context/DataLayer";
import { Config } from "../config";
import * as Notifications from "expo-notifications";
import { useTheme } from "@react-navigation/native";
import Usercard from "../components/Usercard";
import NotFoundComp from "../components/NotFoundComp";
import LoadingComp from "../components/LoadingComp";
import { Searchbar } from "react-native-paper";
import { useSelector, useDispatch } from "react-redux";
import { setFeeds, setHomeSearch } from "../redux/actions/FeedAction";
import {
  Button,
  Icon,
  Item,
  Input,
  Header,
  Card,
  CardItem,
  List,
  ListItem,
  Left,
  Body,
  Thumbnail,
  Right,
} from "native-base";
import { setAppusers } from "../redux/actions/UserAction";

const Home = (props) => {
  const feeds = useSelector((state) => state.allfeeds.feeds);
  const user = useSelector((state) => state.userDetails);
  const load = useSelector((state) => state.loadingDetails.loading);
  const [Notify, setNotify] = useState("");
  const [refresh, setrefresh] = useState(false);
  const [searchText, setsearchText] = useState(null);
  const [filtered, setfiltered] = useState(null);
  const [active, setactive] = useState("Post");
  const [AllUsers, setAllUsers] = useState(null);
  const [dataforfilter, setdataforfilter] = useState(null);
  const [Notfound, setNotfound] = useState(false);
  const { colors } = useTheme();
  const [searching, setsearching] = useState(false);
  const dispatch = useDispatch();
  const searchbutton = useSelector((state) => state.allfeeds.search);
  const [loading, setloading] = useState(true);

  async function requestUserPermission() {
    let token;
    if (Platform.OS == "android") {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        alert("Failed to get push token for push notification!");
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
    } else {
      alert("Must use physical device for Push Notifications");
    }
    if (Platform.OS === "android") {
      Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
        showBadge: true,
        sound: true,
        lockscreenVisibility: true,
        enableVibrate: true,
        description: "check now",
      });
    }
    return token;
  }

  const registerForPushNotifications = async () => {
    const token = await Notifications.getExpoPushTokenAsync();
    try {
      fetch(`${Config.url}` + `/notifytoken`, {
        method: "PUT",
        headers: {
          Authorization: "Bearer " + `${user.userToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          notifytoken: token.data,
        }),
      })
        .then((res) => res.json())
        .then((resp) => {});
    } catch (error) {
      alert(error);
      console.log(error);
    }
  };

  const fetchFeeds = async () => {
    setloading(true);
    const respo = await fetch(`${Config.url}/post`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + `${user.userToken}`,
      },
    })
      .then((resp) => resp.json())
      .then(async (d) => {
        dispatch(setFeeds(d));
        await fetch(`${Config.url}` + `/allusers`, {
          headers: {
            Authorization: "Bearer " + `${user.userToken}`,
          },
          method: "GET",
        })
          .then((response) => response.json())
          .then((responseJson) => {
            setAllUsers(responseJson);
            dispatch(setAppusers(responseJson));
            setloading(false);
          });
      });
  };

  useEffect(() => {
    let IsMounted = true;
    fetchFeeds();
    requestUserPermission();
    registerForPushNotifications();
    const subscribe = props.navigation.addListener("focus", () => {
      fetchFeeds();
    });
    return () => {
      IsMounted = false;
      subscribe;
    };
  }, [props.navigation]);

  const PostCardComp = (props) => {
    return (
      <FlatList
        renderItem={({ item, index }) => {
          return <Postcard item={item} {...props} name={props.section} />;
        }}
        keyExtractor={(item, index) => index.toString()}
        data={
          props.section === "NormalView"
            ? feeds
            : filtered && filtered.length > 0
            ? filtered
            : feeds
        }
        // onEndReached={fetching && GoTo_top_function}
        scrollEnabled
        onScrollAnimationEnd
        scrollToOverflowEnabled
        onEndReachedThreshold={0}
        refreshing={refresh}
        onRefresh={fetchFeeds}
        style={{
          marginBottom: props.section === "NormalView" ? 0 : 230,
          marginTop: 10,
        }}
      />
    );
  };

  const changedata = () => {
    switch (active) {
      case "People":
        setdataforfilter(AllUsers);
        setfiltered([]);
        setsearchText("");
        setNotfound(false);
        break;
      case "Post":
        setdataforfilter(feeds);
        setfiltered([]);
        setsearchText("");
        setNotfound(false);
        break;
      default:
        break;
    }
  };

  const search = () => {
    switch (active) {
      case "People":
        let filteredData = AllUsers.filter(function (item) {
          setNotfound(false);
          return item.username.toLowerCase().includes(searchText.toLowerCase());
        });
        setfiltered(filteredData);
        if (filteredData.length === 0) {
          setNotfound(true);
        }
        break;
      case "Post":
        let filteredDatas = feeds.filter(function (item) {
          setNotfound(false);
          return item.caption.toLowerCase().includes(searchText.toLowerCase());
        });
        if (filteredDatas.length === 0) {
          setNotfound(true);
        }
        setfiltered(filteredDatas);
        break;
      default:
        break;
    }
  };

  const PeopLeComp = () => {
    return (
      <FlatList
        renderItem={({ item }) => {
          return (
            <Usercard
              item={item}
              name={"followers"}
              user={user.userId}
              {...props}
            />
          );
        }}
        keyExtractor={(item, index) => index.toString()}
        data={filtered && filtered.length > 0 ? filtered : AllUsers}
        onEndReached={fetchFeeds}
        scrollEnabled
        onScrollAnimationEnd
        scrollToOverflowEnabled
        onEndReachedThreshold={0}
        refreshing={refresh}
        onRefresh={fetchFeeds}
        style={{ marginBottom: 230 }}
      />
    );
  };

  const FilterCardComp = () => {
    return (
      <FlatList
        renderItem={({ item }) => {
          return (
            <CardItem
              style={
                active == item.name
                  ? styles(colors).cardofactive
                  : styles(colors).cardof
              }
            >
              <TouchableOpacity
                onPress={() => {
                  setactive(item.name);
                  changedata();
                }}
                style={{ flexDirection: "row" }}
              >
                <Text style={{ color: colors.text }}>{item.name} </Text>
              </TouchableOpacity>
            </CardItem>
          );
        }}
        keyExtractor={(item, index) => index.toString()}
        data={Filter}
        horizontal
      />
    );
  };

  const ActiveRenderer = () => {
    return (
      <>
        {active == "Post" ? (
          <PostCardComp {...props} section="FilterView" />
        ) : (
          <>
            {active == "People" ? (
              <>
                <PeopLeComp />
              </>
            ) : (
              <></>
            )}
          </>
        )}
      </>
    );
  };

  if (loading) {
    return <LoadingComp />;
  }

  return (
    <SafeAreaView
      style={{
        backgroundColor: colors.card,
      }}
    >
      {searchbutton == true ? (
        <View>
          <Header
            searchBar
            rounded
            style={{ backgroundColor: colors.background }}
          >
            <Item style={{ backgroundColor: colors.background }}>
              <TouchableOpacity
                onPress={() => {
                  dispatch(setHomeSearch(!searchbutton));
                }}
              >
                <Icon
                  name="arrow-back"
                  style={{ backgroundColor: colors.background }}
                />
              </TouchableOpacity>
              <Input
                placeholder="Search"
                style={{
                  backgroundColor: colors.card,
                  borderRadius: 25,
                  color: colors.text,
                  justifyContent: "flex-end",
                }}
                onChangeText={(bo) => setsearchText(bo)}
                value={searchText}
                clearButtonMode="while-editing"
                multiline={false}
                keyboardAppearance="dark"
                keyboardType="web-search"
                onSubmitEditing={() => search(searchText)}
              ></Input>
              <TouchableOpacity onPress={() => search(searchText)}>
                <Icon
                  name="ios-search"
                  style={{
                    backgroundColor: colors.background,
                    color: colors.primary,
                  }}
                />
              </TouchableOpacity>
            </Item>
            <Button transparent>
              <Text>Search</Text>
            </Button>
          </Header>
          <Card style={styles(colors).cardoff}>
            <FilterCardComp />
          </Card>
          {Notfound == false ? (
            <>
              <ActiveRenderer />
            </>
          ) : (
            <>
              <NotFoundComp />
            </>
          )}
        </View>
      ) : (
        <>
          <Headerv {...props} />
          <PostCardComp {...props} section="NormalView" />
        </>
      )}
    </SafeAreaView>
  );
};
export default Home;

const Filter = [
  {
    name: "People",
    id: 1,
  },
  {
    name: "Post",
    id: 2,
  },
  // {
  //     "name": 'Tag',
  //     "id": 3
  // },
  // {
  //     "name": 'Category',
  //     "id": 74
  // },
  // {
  //     "name": 'Location',
  //     "id": 75
  // },
];
const styles = (colors) =>
  StyleSheet.create({
    cardoff: {
      backgroundColor: colors.background,
      borderWidth: 0,
      borderColor: colors.background,
    },
    cardof: {
      margin: 4,
      backgroundColor: colors.background,
      borderRadius: 20,
      borderWidth: 1,
      borderColor: colors.border,
    },
    cardofactive: {
      backgroundColor: colors.card,
      borderRadius: 20,
      borderWidth: 1,
      borderColor: colors.primary,
      margin: 4,
    },
  });
