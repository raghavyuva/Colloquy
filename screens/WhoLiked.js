import React, { useState, useEffect } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import Header from "../components/Header";
import { Config } from "../config";
import { Title } from "native-base";
import { useTheme } from "@react-navigation/native";
import Usercard from "../components/Usercard";
import { useSelector, useDispatch } from "react-redux";
import LoadingComp from "../components/LoadingComp";

const WhoLiked = (props) => {
  const [data, setdata] = useState(props.route.params.item);
  const { colors } = useTheme();
  const [load, setload] = useState(true);
  const [AllUsers, setAllUsers] = useState(null);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userDetails);
  useEffect(() => {
    let IsMounted = true;
    getuser();
    return () => {
      IsMounted = false;
    };
  }, []);
  const getuser = () => {
    try {
      fetch(`${Config.url}` + `/AllUsers`, {
        headers: {
          Authorization: "Bearer " + `${user.userToken}`,
        },
        method: "GET",
      })
        .then((response) => response.json())
        .then((responseJson) => {
          setAllUsers(responseJson);
          setload(false);
        });
    } catch (e) {
      console.log(e);
    }
  };
  if (load) {
    return <LoadingComp />;
  }
  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <Header {...props} />
      <Title
        style={{
          fontFamily: "Montserrat",
          fontSize: 25,
          color: colors.primary,
          marginLeft: 18,
        }}
      >
        People Who Liked
      </Title>
      <FlatList
        renderItem={({ item }) => {
          return data.likes.map((ele) => {
            if (ele == item._id) {
              return (
                <Usercard
                  item={item}
                  user={user.UserId}
                  name="followers"
                  {...props}
                />
              );
            } else {
              return <></>;
            }
          }); 
        }}
        keyExtractor={(item, index) => index.toString()}
        data={AllUsers}
      />
    </View>
  );
};

export default WhoLiked;
const styles = StyleSheet.create({});
