import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  Text,
  StatusBar,
  TouchableOpacity,
  Share,
  FlatList,
} from "react-native";
import {
  Header,
  Button,
  Icon,
  Left,
  Body,
  View,
  Right,
  Title,
  Item,
  Input,
  Radio,
} from "native-base";
import { Avatar } from "react-native-paper";
import { DataLayerValue } from "../Context/DataLayer";
import {
  MaterialIcons,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { useFonts } from "expo-font";
import { useTheme } from "@react-navigation/native";
import { Menu, Provider } from "react-native-paper";
import { Config } from "../config";
import { useSelector, useDispatch } from "react-redux";
import {
  setCurrentTheme,
  setModalForTHeme,
  setTheme,
} from "../redux/actions/ThemeAction";
import { BottomSheet } from "react-native-btr";
import * as SecureStore from "expo-secure-store";
import { setHomeSearch } from "../redux/actions/FeedAction";
global.myvar;
const ThemeSelectingComponent = ({ color, themename, colors, theme }) => {
  const activemodal = useSelector((state) => state.theme.active);
  const dispatch = useDispatch();
  return (
    <View
      style={{
        marginTop: 20,

        width: 200,
      }}
    >
      <TouchableOpacity
        style={{
          flexDirection: "row",
          borderRadius: 10,
          padding: 5,
          marginRight: 10,
          borderColor: "grey",
          alignItems: "center",
        }}
        onPress={() => {
          dispatch(setCurrentTheme(theme.theme));
          SecureStore.setItemAsync("themeid", theme.id.toString());
          dispatch(setModalForTHeme(!activemodal));
        }}
      >
        <Icon
          name="palette-swatch"
          style={{
            color: color,
            backgroundColor: colors.notification,
            borderRadius: 10,
            padding: 5,
            marginRight: 5,
          }}
          type="MaterialCommunityIcons"
        />
        <Text
          style={{
            color: colors.text,
            textAlign: "center",
            fontWeight: "500",
            fontSize: 18,
            textTransform: "capitalize",
          }}
        >
          {themename}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const Headingbar = (props) => {
  const user = useSelector((state) => state.userDetails.user.user);
  const activemodal = useSelector((state) => state.theme.active);
  const darkcontent = useSelector((state) => state.theme.currentTheme);

  const dispatch = useDispatch();
  const { colors } = useTheme();
  const [go, notgo] = React.useState(false);
  const searchbutton = useSelector((state) => state.allfeeds.search);
  const [loaded] = useFonts({
    Montserrat: require("../assets/Pacifico/Pacifico-Regular.ttf"),
  });
  if (!loaded) {
    return null;
  }
  const ActivateSearch = () => {
    dispatch(setHomeSearch(!searchbutton));
  };
  const _toggleBottomNavigationView = () => {
    dispatch(setModalForTHeme(!activemodal));
  };

  const BottomComponent = () => {
    return (
      <BottomSheet
        visible={activemodal}
        onBackButtonPress={_toggleBottomNavigationView}
        onBackdropPress={_toggleBottomNavigationView}
      >
        <View
          style={{
            backgroundColor: colors.background,
            width: "100%",
            padding: 10,
          }}
        >
          <View>
            <View style={{ paddingTop: 5, justifyContent: "space-between" }}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-around",
                  alignItems: "center",
                }}
              >
                <TouchableOpacity
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    position: "absolute",
                    left: 5,
                  }}
                  onPress={() => {
                    dispatch(setCurrentTheme(null));
                    SecureStore.deleteItemAsync("themeid");
                    dispatch(setModalForTHeme(!activemodal));
                  }}
                >
                  <Icon
                    name="undo"
                    style={{ color: "grey", marginRight: 2 }}
                    type="MaterialCommunityIcons"
                  />
                  <Text style={{ color: colors.text, fontSize: 14 }}>
                    Default
                  </Text>
                </TouchableOpacity>
                <View>
                  <Text
                    style={{
                      color: colors.text,
                      fontWeight: "bold",
                      fontSize: 24,
                    }}
                  >
                    Select Theme
                  </Text>
                </View>
              </View>
              <FlatList
                data={THEME}
                renderItem={({ item, index }) => {
                  return (
                    <ThemeSelectingComponent
                      color={item.color}
                      themename={item.name}
                      colors={colors}
                      theme={item}
                    />
                  );
                }}
                numColumns={2}
              />
            </View>
          </View>
        </View>
      </BottomSheet>
    );
  };
  const Headingcomp = () => {
    return (
      <View>
        <Header style={{ backgroundColor: colors.background }}>
          <StatusBar
            backgroundColor={colors.background}
            barStyle={darkcontent?.dark ? "light-content" : "dark-content"}
          />
          <Left>
            <Button
              transparent
              onPress={() => {
                if (go) {
                  props.navigation.goBack();
                } else {
                  props.navigation.openDrawer();
                }
              }}
            >
              <Icon
                name={go ? "arrow-back" : "menu"}
                style={{ color: colors.text }}
              />
            </Button>
          </Left>
          <Body>
            <Title
              style={{
                fontFamily: "Montserrat",
                fontSize: 25,
                color: colors.primary,
              }}
            >
              VtYuva
            </Title>
          </Body>
          <Right>
            <Button transparent onPress={_toggleBottomNavigationView}>
              <Icon
                name="palette"
                style={{ color: colors.text }}
                type="MaterialIcons"
              />
              <BottomComponent />
            </Button>
            {props.route.name === "Home" || props.route.name === "chat" ? (
              <Button transparent onPress={ActivateSearch}>
                <Icon name="search" style={{ color: colors.text }} />
              </Button>
            ) : (
              <View></View>
            )}
            {props.route.name == "profile" ? (
              <View></View>
            ) : (
              <Button
                transparent
                onPress={() =>
                  props.navigation.navigate("external", { screen: "profile" })
                }
              >
                {user == null || user == undefined || user.length == 0 ? (
                  <>
                    <View></View>
                  </>
                ) : (
                  <>
                    <Avatar.Image
                      source={{
                        uri: user.userphoto,
                      }}
                      size={30}
                      style={{ borderRadius: 14 }}
                    />
                  </>
                )}
              </Button>
            )}
          </Right>
        </Header>
      </View>
    );
  };
  const ReportTheUser = (item) => {
    fetch(`${Config.url}` + `/report`, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + `${user.userToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        description: `chat` + item.username,
        errscreenshot: item.userphoto,
      }),
    })
      .then((res) => res.json())
      .then((resp) => {
        console.log(resp);
        alert("reported this  user");
      });
  };
  const Headerforchat = (props) => {
    return (
      <Header style={{ backgroundColor: colors.card }}>
        <StatusBar backgroundColor={colors.background} />
        <Left>
          <Button
            transparent
            onPress={() => {
              props.navigation.goBack();
            }}
          >
            <Icon name="arrow-back" style={{ color: colors.text }} />
          </Button>
        </Left>
        <TouchableOpacity
          style={{ flexDirection: "row" }}
          onPress={() =>
            props.navigation.navigate("external", {
              screen: "userpro",
              params: { thread: props.user._id },
            })
          }
        >
          <Avatar.Image
            source={{
              uri: props.user.userphoto,
            }}
            size={40}
            style={{ margin: 8 }}
          />
          <View>
            <Text
              style={{ color: colors.text, fontSize: 20, margin: 10 }}
              numberOfLines={1}
            >
              {props.user.username}
            </Text>
            {/* <Text style={{ color: colors.primary, marginLeft: 15, fontWeight: 'bold' }}>{chatteeOnline === true ? "online" : "offline"}</Text> */}
          </View>
        </TouchableOpacity>
        <Right>
          <Button
            onPress={() => {
              ReportTheUser(props.user);
            }}
            transparent
          >
            <MaterialIcons name="report" size={24} color={colors.primary} />
          </Button>
        </Right>
      </Header>
    );
  };
  const HeaderForStatus = (props) => {
    console.log(props.user);
    return (
      <Header style={{ backgroundColor: colors.card }}>
        <StatusBar backgroundColor={colors.background} />
        <Left>
          <Button
            transparent
            onPress={() => {
              props.navigation.goBack();
            }}
          >
            <Icon name="arrow-back" style={{ color: colors.text }} />
          </Button>
        </Left>
        <TouchableOpacity
          style={{ flexDirection: "row" }}
          // onPress={() => props.navigation.navigate('external', { screen: 'userpro', params: { thread: props.user._id } })}
        >
          <Avatar.Image
            source={{
              uri: props.user.postedBy.userphoto,
            }}
            size={40}
            style={{ margin: 8 }}
          />
          <View>
            <Text
              style={{ color: colors.text, fontSize: 20, margin: 10 }}
              numberOfLines={1}
            >
              {props.user.postedBy.username}
            </Text>
          </View>
        </TouchableOpacity>
        <Right>
          <Button
            // onPress={() => { ReportTheUser(props.user) }}
            transparent
          >
            <MaterialIcons name="report" size={24} color={colors.primary} />
          </Button>
        </Right>
      </Header>
    );
  };
  return (
    <SafeAreaView>
      {props.route.name === "message" ? (
        <>
          <Headerforchat {...props} />
        </>
      ) : (
        <>
          {props.route.name === "StatusView" ? (
            <>
              <HeaderForStatus {...props} />
            </>
          ) : (
            <>
              {props.route.name === "addblog" ? (
                <></>
              ) : (
                <>
                  {props.route.name === "Home" ? (
                    <>
                      <Headingcomp />
                    </>
                  ) : (
                    <>
                      <Headingcomp />
                    </>
                  )}
                </>
              )}
            </>
          )}
        </>
      )}
    </SafeAreaView>
  );
};

export default Headingbar;
const THEME = [
  {
    id: 1,
    color: "blue",
    name: `Toads Turnpike`,
    theme: {
      dark: true,
      colors: {
        primary: "#ffd700",
        background: "#022c43",
        card: "#053f5e",
        text: "#fff",
        border: "#278ea5",
        notification: "#BDBDBD",
      },
    },
  },
  {
    id: 2,
    name: "Choco Dark",
    color: "#55423d",
    theme: {
      dark: true,
      colors: {
        primary: "#ffc0ad",
        background: "#55423d",
        card: "#55423d",
        text: "#fffffe",
        border: "#278ea5",
        notification: "#BDBDBD",
      },
    },
  },
  {
    id: 3,
    name: "Emarald-green",
    color: "#004643",
    theme: {
      dark: true,
      colors: {
        primary: "#f9bc60",
        background: "#004643",
        card: "#004643",
        text: "#fff",
        border: "#278ea5",
        notification: "#BDBDBD",
      },
    },
  },
  {
    id: 4,
    color: "black",
    name: "raven black",
    theme: {
      dark: true,
      colors: {
        primary: "rgb(10,132,255)",
        background: "rgb(1,1,1)",
        border: "rgb(39,39,41)",
        card: "rgb(18,18,18)",
        notification: "rgb(255,69,58)",
        text: "rgb(229,229,231)",
      },
    },
  },
  {
    id: 5,
    color: "#fef6e4",
    name: "Mo-Mo Farm",
    theme: {
      dark: false,
      colors: {
        primary: "#f582ae",
        background: "#fef6e4",
        border: "#8bd3dd",
        card: "#fef6e4",
        notification: "#f582ae",
        text: "#001858",
      },
    },
  },
  {
    id: 6,
    color: "#fec7d7",
    name: "rose Pink",
    theme: {
      dark: false,
      colors: {
        primary: "#0e172c",
        background: "#fec7d7",
        border: "#8bd3dd",
        card: "#fec7d7",
        notification: "#f582ae",
        text: "#001858",
      },
    },
  },
];
