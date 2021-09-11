import React, { useState, useEffect } from "react";
import {  SafeAreaView, FlatList, StyleSheet, Platform, } from "react-native";
import Headerv from "../components/Header";
import Postcard from "../components/Postcard";
import { Config } from "../config";
import * as Notifications from "expo-notifications";
import { useTheme } from "@react-navigation/native";
import LoadingComp from "../components/LoadingComp";
import { useSelector, useDispatch } from "react-redux";
import { setFeeds, setHomeSearch } from "../redux/actions/FeedAction";
import { setAppusers } from "../redux/actions/UserAction";

const Home = (props) => {
  const feeds = useSelector((state) => state.allfeeds.feeds);
  const user = useSelector((state) => state.userDetails);
  const load = useSelector((state) => state.loadingDetails.loading);
  const [refresh, setrefresh] = useState(false);
  const { colors } = useTheme();
  const dispatch = useDispatch();
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
        .then((resp) => { });
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

  if (loading) {
    return <LoadingComp />;
  }

  return (
    <SafeAreaView
      style={{
        backgroundColor: colors.card,
      }}
    >
      <Headerv {...props} />
      <PostCardComp {...props} section="NormalView" />
    </SafeAreaView>
  );
};
export default Home;

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
