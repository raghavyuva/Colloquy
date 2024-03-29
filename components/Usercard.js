import React, { useState, useEffect } from "react";
import { Image, StyleSheet, TouchableOpacity } from "react-native";
import {
  Thumbnail,
  Text,
  Button,
  Left,
  Body,
  ListItem,
  Right,
  List,
  View,
  Card,
  CardItem,
} from "native-base";
import { DataLayerValue } from "../Context/DataLayer";
import { Config } from "../config";
import { DefaultTheme, DarkTheme, useTheme } from "@react-navigation/native";
import { firebase } from "./firebase";
import "firebase/auth";
import "firebase/firestore";
import { useSelector, useDispatch } from "react-redux";
import {
    setAppusers,
  setUserFollowers,
  setUserFollowings,
} from "../redux/actions/UserAction";

const Usercard = (props) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userDetails);
  const [users, setusers] = useState([]);
  const [name, setname] = useState("");
  const [roomName, setRoomName] = useState("");
  const { colors } = useTheme();
  const followinglist = useSelector((state) => state.userDetails.following);

  useEffect(() => {
    setname(props.name);
    return () => {};
  }, []);

  const followuser = (itm) => {
    try {
      fetch(`${Config.url}` + `/follow`, {
        method: "PUT",
        headers: {
          Authorization: "Bearer " + `${user.userToken}`,
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          followid: itm._id,
        }),
      })
        .then((res) => res.json())
        .then((resp) => {
          update();
        });
    } catch (error) {
      console.log("error", error);
    }
  };
  const update = async () => {
    try {
      const Listener = fetch(`${Config.url}` + `/followerslist`, {
        headers: {
          Authorization: "Bearer " + `${user.userToken}`,
        },
      })
        .then((response) => response.json())
        .then((responseJson) => {
          dispatch(setUserFollowers(responseJson));
        });

      fetch(`${Config.url}` + `/allusers`, {
        headers: {
          Authorization: "Bearer " + `${user.userToken}`,
        },
        method: "GET",
      })
        .then((response) => response.json())
        .then((responseJson) => {
          dispatch(setAppusers(responseJson));
        });
      fetch(`${Config.url}` + `/followinglist`, {
        headers: {
          Authorization: "Bearer " + `${user.userToken}`,
        },
      })
        .then((response) => response.json())
        .then((responseJson) => {
          dispatch(setUserFollowings(responseJson));
        });
    } catch (e) {
      console.log(e);
    }
  };

  const unfollow = (itm) => {
    try {
      fetch(`${Config.url}` + `/unfollow`, {
        method: "PUT",
        headers: {
          Authorization: "Bearer " + `${user.userToken}`,
          "Content-type": "application/json",
        },

        body: JSON.stringify({
          followid: itm._id,
        }),
      })
        .then((response) => response.json())
        .then((responseJson) => {
          update();
        })
        .catch((err) => {
          alert(err);
        });
    } catch (error) {
      alert(error);
    }
  };

  const opencomp = (id) => {
    if (id == user.user._id) {
      props.navigation.navigate("external", { screen: "profile" });
    } else {
      props.navigation.navigate("external", {
        screen: "userpro",
        params: { thread: id },
      });
    }
  };
  const MessageParticularguy = (guy) => {
    props.navigation.navigate("external", {
      screen: "message",
      params: {
        anotheruser: guy,
      },
    });
  };
  if (props.name == "followers") {
    return (
      <List
        style={{
          backgroundColor: colors.background,
          borderRadius: 15,
          marginBottom: 5,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 6,
          },
          shadowOpacity: 0.37,
          shadowRadius: 7.49,

          elevation: 12,
          margin: 10,
        }}
      >
        <ListItem thumbnail onPress={() => opencomp(props.item._id)}>
          <Left>
            <Thumbnail source={{ uri: props.item.userphoto }} />
          </Left>
          <Body
            style={{
              borderBottomWidth: 0,
              borderWidth: 0,
              borderColor: colors.border,
              borderBottomColor: colors.border,
            }}
          >
            <Text style={{ color: colors.text }}>{props.item.username}</Text>
            <Text note numberOfLines={1}>
              {props.item.tagline
                ? props.item.tagline
                : "hey there iam using this cool app are you?yay! thats great,what do you feel?"}
            </Text>
          </Body>
          <Right
            style={{
              borderBottomWidth: 0,
              borderWidth: 0,
              borderColor: colors.border,
              borderBottomColor: colors.border,
            }}
          >
            {props.item._id === props.user ? (
              <></>
            ) : (
              <>
                {props.item.followers.includes(props.user) ? (
                  <View
                    style={{
                      borderWidth: 0.5,
                      borderColor: "grey",
                      borderBottomColor: "grey",
                    }}
                  >
                    <Button
                      style={styles(colors).follow}
                      onPress={() => unfollow(props.item)}
                    >
                      <Text>unfollow</Text>
                    </Button>
                  </View>
                ) : (
                  <View
                    style={{
                      borderWidth: 0.5,
                      borderColor: "grey",
                      borderBottomColor: "grey",
                    }}
                  >
                    <Button
                      style={styles(colors).follow}
                      onPress={() => followuser(props.item)}
                    >
                      <Text style={{ color: colors.text }}>follow</Text>
                    </Button>
                  </View>
                )}
              </>
            )}
          </Right>
        </ListItem>
      </List>
    );
  }
  if (props.name === "following") {
    return (
      <List
        style={{
          backgroundColor: colors.background,
          borderRadius: 15,
          marginBottom: 5,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 6,
          },
          shadowOpacity: 0.37,
          shadowRadius: 7.49,

          elevation: 12,
          margin: 10,
        }}
      >
        <ListItem thumbnail onPress={() => opencomp(props.item._id)}>
          <Left>
            <Thumbnail square source={{ uri: props.item.userphoto }} />
          </Left>
          <Body
            style={{
              borderBottomWidth: 0,
              borderWidth: 0,
              borderColor: colors.border,
              borderBottomColor: colors.border,
            }}
          >
            <Text style={{ color: colors.text }}>{props.item.username}</Text>
            <Text note numberOfLines={1} style={{ color: colors.text }}>
              {props.item.tagline}
            </Text>
          </Body>
          <Right>
            <View
              style={{
                borderBottomWidth: 0,
                borderWidth: 0,
                borderColor: colors.border,
                borderBottomColor: colors.border,
              }}
            >
              <Button
                style={styles(colors).follow}
                onPress={() => unfollow(props.item)}
              >
                <Text>unfollow</Text>
              </Button>
            </View>
          </Right>
        </ListItem>
      </List>
    );
  } else {
    return (
      <>
        {props.item._id == props.user ? (
          <></>
        ) : (
          <>
            <TouchableOpacity onPress={() => opencomp(props.item._id)}>
              <View
                style={{
                  margin: 0.2,
                }}
              >
                <CardItem
                  avatar
                  style={{
                    backgroundColor: colors.background,
                    borderRadius: null,
                    borderWidth: 0,
                    margin: 0,
                  }}
                  onPress={() => opencomp(props.item._id)}
                >
                  <Thumbnail
                    source={{
                      uri: props.item.userphoto,
                    }}
                    size={50}
                    square
                    style={{ borderRadius: 5 }}
                  />
                  <Left>
                    <Body>
                      <Text style={styles(colors).listTitle} numberOfLines={1}>
                        {props.item.username}
                      </Text>
                      <Text
                        note
                        style={styles(colors).listDescription}
                        numberOfLines={1}
                      >
                        {" "}
                        {props.item.tagline}
                      </Text>
                    </Body>
                  </Left>
                  <Right>
                    <Button
                      style={styles(colors).follow}
                      onPress={() => {
                        MessageParticularguy(props.item);
                      }}
                    >
                      <Text
                        style={{
                          textTransform: "capitalize",
                          color: colors.card,
                        }}
                      >
                        message{" "}
                      </Text>
                    </Button>
                  </Right>
                </CardItem>
              </View>
            </TouchableOpacity>
          </>
        )}
      </>
    );
  }
};

export default Usercard;
const styles = (colors) =>
  StyleSheet.create({
    follow: {
      backgroundColor: colors.primary,
      borderBottomWidth: 0,
      borderWidth: 0,
      borderColor: colors.border,
      borderBottomColor: "grey",
    },
    search: {
      backgroundColor: colors.background,
    },
    following: {
      marginLeft: 20,
      fontSize: 25,
      fontWeight: "500",
    },
    listTitle: {
      color: colors.text,
      fontSize: 18,
    },
    listDescription: {
      color: colors.text,
    },
  });
