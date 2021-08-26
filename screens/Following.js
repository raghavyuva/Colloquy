import React, { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  View,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { Container } from "native-base";
import LottieView from "lottie-react-native";
import { Config } from "../config";
import { DataLayerValue } from "../Context/DataLayer";
import Usercard from "../components/Usercard";
import Header from "../components/Header";
const { width, height } = Dimensions.get("window");
import { DefaultTheme, DarkTheme, useTheme } from "@react-navigation/native";
import LoadingComp from "../components/LoadingComp";
import { useSelector, useDispatch } from "react-redux";
import { setUserFollowings } from "../redux/actions/UserAction";
import NotFoundComp from "../components/NotFoundComp";

const Following = (props) => {
  const [load, setload] = useState(true);
  const { colors } = useTheme();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userDetails);
  const followinglist = useSelector((state) => state.userDetails.following);
  const fetching = async () => {
    try {
      const Listener = fetch(`${Config.url}` + `/followinglist`, {
        headers: {
          Authorization: "Bearer " + `${user.userToken}`,
        },
      })
        .then((response) => response.json())
        .then((responseJson) => {
          dispatch(setUserFollowings(responseJson));
          setload(false);
        });
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    fetching();
    return () => {};
  }, []);

  if (load) {
    return <LoadingComp />;
  }
  return (
    <Container style={{ backgroundColor: colors.background }}>
      <Header {...props} />
      {
        <FlatList
          data={followinglist}
          renderItem={({ item }) => {
            return (
           
                <Usercard
                  item={item}
                  {...props}
                  name={"following"}
                  user={user.userId}
                />
             
            );
          }}
          keyExtractor={(item) => item._id}
          ListEmptyComponent={
          <NotFoundComp />
          }
        />
      }
    </Container>
  );
};

export default Following;
