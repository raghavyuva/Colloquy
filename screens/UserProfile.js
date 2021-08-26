import React, { useState, useEffect } from "react";
import { StyleSheet, View, Dimensions, Image, FlatList } from "react-native";
import { Button, Text } from "native-base";
const { height, width } = Dimensions.get("window");
import { Config } from "../config";
import LottieView from "lottie-react-native";
import Postcard from "../components/Postcard";
import Headingbar from "../components/Header";
import { DefaultTheme, DarkTheme, useTheme } from "@react-navigation/native";
import LoadingComp from "../components/LoadingComp";
import {
  MaterialIcons,
  MaterialCommunityIcons,
  SimpleLineIcons,
} from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";
import { setOtherUser } from "../redux/actions/UserAction";
import NotFoundComp from "../components/NotFoundComp";

const UserProfile = (props) => {
  const [load, setload] = useState(true);
  const [refresh, setrefresh] = useState(true);
  const [follow, setfollow] = useState(null);
  const user = useSelector((state) => state.userDetails);
  const otherprofile = useSelector((state) => state.userDetails.otheruser);

  const dispatch = useDispatch();
  const GoTo_top_function = () => {
    flatListRef.scrollToOffset({ animated: true, offset: 0 });
  };
  const fetching = async (id) => {
    setrefresh(true);
    try {
      await fetch(`${Config.url}` + `/user/${id}`, {
        headers: {
          Authorization: "Bearer " + `${user.userToken}`,
        },
      })
        .then((response) => response.json())
        .then((responseJson) => {
          dispatch(setOtherUser(responseJson));
          setTimeout(() => {
            if (user.user.user.following.includes(otherprofile.user._id)) {
              setfollow(true);
            }
          }, 1000);
        })
        .finally(() => {
          setload(false);
        });
    } catch (e) {
      console.log(e);
    }
    setrefresh(false);
  };
  useEffect(() => {
    const subscribe = fetching(props.route.params.thread);
    return () => subscribe;
  }, []);
  const { colors } = useTheme();
 
  const followuser = () => {
    try {
      fetch(`${Config.url}` + `/follow`, {
        method: "PUT",
        headers: {
          Authorization: "Bearer " + `${user.userToken}`,
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          followid: otherprofile.user._id,
        }),
      })
        .then((res) => res.json())
        .then((resp) => {
          fetching(otherprofile.user._id);
          setfollow(true);
        });
    } catch (error) {
      console.log("error", error);
    }
  };
  const PostNotnullcomp = () => {
    return (
      <View style={styles(colors).mainscreen}>
        <View style={{ flexDirection: "row" }}>
          <Image
            source={{ uri: otherprofile.user.userphoto }}
            style={{
              height: 150,
              width: 150,
              borderRadius: 20,
              marginTop: 20,
              marginRight: 10,
              marginLeft: 10,
            }}
          />
          <View>
            <View style={{ marginTop: 20 }}>
              <Text style={styles(colors).txt1}>
                {otherprofile.user.username}
              </Text>
            </View>
            <View style={{ width: 220, marginRight: 10 }}>
              {otherprofile.user.tagline == null ? (
                <Text style={styles(colors).txt2}>
                  hey there iam using this cool app are you? yay! that's
                  great,what do you feel?
                </Text>
              ) : (
                <Text style={styles(colors).txt2}>
                  {otherprofile.user.tagline}
                </Text>
              )}
            </View>
            <View style={{ flexDirection: "row", marginTop: 10 }}>
              <View style={{ marginRight: 5, flexDirection: "column" }}>
                <Text
                  style={{
                    fontWeight: "bold",
                    fontSize: 15,
                    color: colors.text,
                  }}
                >
                  Posts
                </Text>
                <Text
                  style={{
                    fontWeight: "bold",
                    fontSize: 15,
                    color: colors.primary,
                    textAlign: "center",
                  }}
                >
                  {otherprofile.userposts.length}
                </Text>
              </View>
              <View style={{ marginRight: 5, flexDirection: "column" }}>
                <Text
                  style={{
                    fontWeight: "bold",
                    fontSize: 15,
                    color: colors.text,
                  }}
                >
                  Followers
                </Text>
                <Text
                  style={{
                    fontWeight: "bold",
                    fontSize: 15,
                    color: colors.primary,
                    textAlign: "center",
                  }}
                >
                  {otherprofile.user.followers.length}
                </Text>
              </View>
              <View style={{ marginRight: 5, flexDirection: "column" }}>
                <Text
                  style={{
                    fontWeight: "bold",
                    fontSize: 15,
                    color: colors.text,
                  }}
                >
                  Following
                </Text>
                <Text
                  style={{
                    fontWeight: "bold",
                    fontSize: 15,
                    color: colors.primary,
                    textAlign: "center",
                  }}
                >
                  {otherprofile.user.following.length}
                </Text>
              </View>
            </View>
          </View>
        </View>
        <View style={{ flexDirection: "row", marginLeft: 10, marginTop: 10 }}>
          {otherprofile.user.verified == true ? (
            <>
              <MaterialIcons
                name="verified-user"
                size={24}
                color={colors.primary}
              />
              <Text style={{ color: "green", fontWeight: "700" }}>
                Verified User
              </Text>
            </>
          ) : (
            <>
              <Text style={{ color: colors.notification }}>
                User Not Verified
              </Text>
            </>
          )}
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            marginTop: 10,
          }}
        >
          {follow == true ? (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                marginLeft: 5,
              }}
            >
              <SimpleLineIcons
                name="user-unfollow"
                size={24}
                color={colors.primary}
              />
              <Text
                style={{
                  justifyContent: "center",
                  alignSelf: "center",
                  color: colors.text,
                  marginLeft: 2,
                }}
              >
                Unfollow
              </Text>
            </View>
          ) : (
            <View style={{}}>
              <Button style={styles(colors).follow} onPress={followuser}>
                <Text
                  style={{
                    justifyContent: "center",
                    alignSelf: "center",
                    color: colors.text,
                  }}
                >
                  Follow
                </Text>
              </Button>
            </View>
          )}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              marginLeft: 5,
            }}
          >
            <MaterialCommunityIcons
              name="instagram"
              size={24}
              color={colors.primary}
            />
            <Text
              style={{
                justifyContent: "center",
                alignSelf: "center",
                color: colors.text,
                marginLeft: 2,
              }}
            >
              Instagram
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              marginLeft: 5,
            }}
          >
            <MaterialCommunityIcons
              name="telegram"
              size={24}
              color={colors.primary}
            />
            <Text
              style={{
                justifyContent: "center",
                alignSelf: "center",
                color: colors.text,
                marginLeft: 2,
              }}
            >
              Telegram
            </Text>
          </View>
        </View>
      </View>
    );
  };
  const unfollow = () => {
    try {
      fetch(`${Config.url}` + `/unfollow`, {
        method: "PUT",
        headers: {
          Authorization: "Bearer " + `${user.userToken}`,
          "Content-type": "application/json",
        },

        body: JSON.stringify({
          followid: otherprofile.user._id,
        }),
      })
        .then((response) => response.json())
        .then((responseJson) => {
          fetching(otherprofile.user._id);
          setfollow(false);
        })
        .catch((err) => {
          alert(err);
        });
    } catch (error) {
      alert(error);
    }
  };

  if (load) {
    return <LoadingComp />;
  }
  return (
    <View style={{ backgroundColor: colors.background, flex: 1 }}>
      <Headingbar {...props} />
      {otherprofile.userposts[0] == undefined ? (
        <>
          <PostNotnullcomp />
          <LottieView
            autoPlay={true}
            loop={true}
            source={require("../animation/notfound.json")}
            style={{
              width: 400,
              height: 300,
              alignSelf: "center",
            }}
          />
        </>
      ) : (
        <FlatList
          ListHeaderComponent={<PostNotnullcomp />}
          renderItem={({ item }) => {
            return <Postcard item={item} {...props} name="NormalView" />;
          }}
          keyExtractor={(item, index) => index.toString()}
          data={otherprofile.userposts}
          onEndReached={fetching && GoTo_top_function}
          scrollEnabled
          onScrollAnimationEnd
          scrollToOverflowEnabled
          onEndReachedThreshold={0}
          style={{ marginBottom: 50 }}
          refreshing={refresh}
          onRefresh={fetching}
        />
      )}
    </View>
  );
};

export default UserProfile;
const styles = (colors) =>
  StyleSheet.create({
    mainscreen: {
      backgroundColor: colors.card,
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
      padding: 10,
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
      alignSelf: "flex-start",
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
      backgroundColor: colors.background,
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
    follow: {
      backgroundColor: colors.background,
      width: 120,
      justifyContent: "center",
      borderRadius: 15,
      borderColor: colors.border,
      borderWidth: 2,
      marginLeft: 4,
      marginTop: 5,
    },
  });
