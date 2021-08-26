import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  FlatList,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import { Fab, Button, Text, Item, Label, Input } from "native-base";
const { width, height } = Dimensions.get("window");
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import { DataLayerValue } from "../Context/DataLayer";
import { Config } from "../config";
import LottieView from "lottie-react-native";
import Postcard from "../components/Postcard";
import Headingbar from "../components/Header";
import { BottomSheet } from "react-native-btr";
import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";
import { DefaultTheme, DarkTheme, useTheme } from "@react-navigation/native";
import LoadingComp from "../components/LoadingComp";
import Image from "react-native-image-progress";
import * as Progress from "react-native-progress";
import { useSelector, useDispatch } from "react-redux";

const Profile = (props) => {
  const [load, setload] = useState(true);
  const [active, setactive] = useState(false);
  const [refresh, setrefresh] = useState(false);

  const user = useSelector((state) => state.userDetails.user);
  const User = useSelector((state) => state.userDetails);

  const dispatch = useDispatch();
  const GoTo_top_function = () => {
    flatListRef.scrollToOffset({ animated: true, offset: 0 });
  };

  const { colors } = useTheme();

  const fetching = async () => {
    try {
      await fetch(`${Config.url}` + `/user/${User.UserId}`, {
        headers: {
          Authorization: "Bearer " + `${User.userToken}`,
        },
      })
        .then((response) => response.json())
        .then((responseJson) => {
          setload(false);
        });
    } catch (e) {
      console.log(e);
    }
  };

  const getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
    }
  };

  useEffect(() => {
    let IsMounted = true;

    const subscribe = props.navigation.addListener("focus", () => {
      fetching();
    });
    getPermissionAsync();
    return () => {
      IsMounted = false;
      subscribe;
    };
  }, []);

  if (load) {
    return <LoadingComp />;
  }

  const PostNotnullcomp = () => {
    return (
      <View style={styles(colors).mainscreen}>
        <View style={{ flexDirection: "row" }}>
          <Image
            source={{ uri: user.user.userphoto }}
            style={{
              height: 150,
              width: 150,
              borderRadius: 20,
              marginVertical: 30,
              marginHorizontal: 10,
            }}
            indicator={Progress.Pie}
            indicatorProps={{
              size: 140,
              borderWidth: 0,
              color: "rgba(150, 150, 150, 1)",
              unfilledColor: "rgba(200, 200, 200, 0.2)",
            }}
          />
          <View>
            <View style={{ marginTop: 50 }}>
              <Text style={styles(colors).txt1}>{user.user.username}</Text>
            </View>
            <View style={{ width: 250, marginRight: 10 }}>
              {user.user.tagline == null ? (
                <Text style={styles(colors).txt2}>{user.user.email}</Text>
              ) : (
                <Text style={styles(colors).txt2}>{user.user.tagline}</Text>
              )}
            </View>
            <View
              style={{
                flexDirection: "row",
                marginTop: 10,
              }}
            >
              <TouchableOpacity>
                <MaterialCommunityIcons
                  name="instagram"
                  size={24}
                  color={colors.primary}
                  style={{
                    marginLeft: 5,
                  }}
                />
              </TouchableOpacity>
              <TouchableOpacity>
                <MaterialCommunityIcons
                  name="telegram"
                  size={24}
                  color={colors.primary}
                  style={{
                    marginLeft: 15,
                  }}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View
          style={{
            position: "absolute",
            bottom: 60,
            marginHorizontal: 20,
            flexDirection: "row",
          }}
        >
          {user.user.verified == true ? (
            <>
              <MaterialIcons
                name="verified-user"
                size={24}
                color={colors.primary}
              />
              <Text style={{ color: "green" }}>Verified</Text>
            </>
          ) : (
            <>
              <Text style={{ color: colors.notification }}>Not Verified</Text>
            </>
          )}
        </View>

        <View
          style={{
            flexDirection: "row",
            position: "absolute",
            bottom: 30,
            marginHorizontal: 20,
          }}
        >
          <View style={{ marginRight: 5 }}>
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 15,
                color: colors.text,
              }}
            >
              {user.userposts.length} Posts
            </Text>
          </View>
          <View style={{ marginRight: 5 }}>
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 15,
                color: colors.text,
              }}
            >
              {user.user.followers.length} Followers
            </Text>
          </View>

          <View style={{ marginRight: 5 }}>
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 15,
                color: colors.text,
              }}
            >
              {user.user.following.length} Following
            </Text>
          </View>
        </View>

        <Fab
          active={active}
          direction="up"
          containerStyle={{}}
          style={{ backgroundColor: colors.primary }}
          position="bottomRight"
          onPress={() => props.navigation.navigate("editprofile")}
        >
          <MaterialCommunityIcons
            name="pencil"
            size={24}
            color={colors.primary}
          />
        </Fab>
      </View>
    );
  };
  return (
    <View>
      <Headingbar {...props} />
      {user.userposts[0] == null ? (
        <>
          <PostNotnullcomp />
          <Image
            source={{
              uri: "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fcdn.onlinewebfonts.com%2Fsvg%2Fimg_412721.png&f=1&nofb=1",
            }}
            style={{ width: width, height: height / 2, alignSelf: "center" }}
            indicator={Progress.Pie}
            indicatorProps={{
              size: 140,
              borderWidth: 0,
              color: "rgba(150, 150, 150, 1)",
              unfilledColor: "rgba(200, 200, 200, 0.2)",
            }}
          />
        </>
      ) : (
        <>
          <FlatList
            ListHeaderComponent={<PostNotnullcomp />}
            renderItem={({ item }) => {
              return <Postcard item={item} {...props} name="NormalView" />;
            }}
            keyExtractor={(item, index) => index.toString()}
            data={user.userposts}
            onEndReached={fetching && GoTo_top_function}
            scrollEnabled
            onScrollAnimationEnd
            scrollToOverflowEnabled
            onEndReachedThreshold={0}
            refreshing={refresh}
            onRefresh={fetching}
            style={{ marginBottom: 50 }}
          />
        </>
      )}
    </View>
  );
};

export default Profile;
const styles = (colors) =>
  StyleSheet.create({
    mainscreen: {
      height: height / 3,
      backgroundColor: colors.card,
      flexDirection: "row",
      borderBottomStartRadius: 20,
      borderBottomEndRadius: 20,
      marginBottom: 20,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 6,
      },
      shadowOpacity: 0.37,
      shadowRadius: 7.49,
      elevation: 12,
    },
    row1: {
      marginTop: 50,
      marginLeft: 10,
      marginBottom: 10,
    },
    txt1: {
      fontSize: 25,
      color: colors.text,
      fontWeight: "bold",
    },
    txt2: {
      fontSize: 16,
      color: colors.text,
      opacity: 0.9,
      width: 200,
    },
    carousel: {
      height: "50%",
      backgroundColor: colors.background,
      paddingTop: 30,
    },
    item: {
      borderWidth: 2,
      backgroundColor: colors.background,
      borderRadius: 5,
      borderColor: colors.border,
      elevation: 3,
      flex: 2,
    },
    imageBackground: {
      backgroundColor: colors.background,
      borderWidth: 5,
      borderColor: colors.border,
      flex: 1,
    },
    rightTextContainer: {
      marginLeft: "auto",
      marginRight: -2,
      backgroundColor: "rgba(49, 49, 51,0.5)",
      padding: 3,
      marginTop: 3,
      borderTopLeftRadius: 5,
      borderBottomLeftRadius: 5,
    },
    rightText: { color: colors.text },
    lowerContainer: {
      margin: 10,
    },
    titleText: {
      fontWeight: "bold",
      fontSize: 18,
      color: colors.text,
    },
    contentText: {
      fontSize: 12,
      color: colors.text,
    },
    MainContainer: {
      margin: 2,
      justifyContent: "center",
      alignItems: "center",
      paddingTop: Platform.OS === "ios" ? 20 : 0,
      backgroundColor: colors.background,
    },
    bottomNavigationView: {},
    bottomNavigation: {
      backgroundColor: colors.background,
      width: "100%",
      height: height / 1.9,
      borderTopLeftRadius: 50,
      borderTopRightRadius: 50,
      borderWidth: 0.5,
      borderColor: colors.border,
    },
  });
