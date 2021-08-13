import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  Dimensions,
  FlatList,
  Image,
  TouchableHighlight,
} from "react-native";
const { width, height } = Dimensions.get("window");
import { useTheme } from "@react-navigation/native";
import Headingbar from "../components/Header";
import { TouchableOpacity } from "react-native-gesture-handler";
import LoadingComp from "../components/LoadingComp";
import { MaterialIcons } from "@expo/vector-icons";

const MockInterview = (props) => {
  const [load, setload] = useState(true);
  // const [selected, setselected] = useState(null);
  const Data = [
    {
      course: "CSE",
      id: "1",
    },
    {
      course: "CIVIL",
      id: "2",
    },
    {
      course: "MECH",
      id: "3",
    },
    {
      course: "ECE",
      id: "4",
    },
    {
      course: "EEE",
      id: "5",
    },
    {
      course: "Other ",
      id: "6",
    },
  ];
  const { colors } = useTheme();
  useEffect(() => {
    setTimeout(() => {
      setload(false);
    }, 2000);
    return () => {};
  }, []);

  if (load) {
    return <LoadingComp />;
  }
  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <Headingbar {...props} />
      <Text
        style={{
          color: colors.text,
          textTransform: "capitalize",
          fontWeight: "bold",
          fontSize: 20,
        }}
      >
        Preparing For AN iNTERVIEW ?
      </Text>
      <Image
        source={{
          uri: "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fblogs.longwood.edu%2Ffiles%2F2014%2F12%2FStudent-Icon.png&f=1&nofb=1",
        }}
        style={{
          width: width / 1.5,
          height: height / 3.3,
          alignSelf: "center",
          backgroundColor: colors.background,
        }}
      />
      <Text
        style={{ 
          color: "grey",
          textTransform: "capitalize",
          fontSize: 15,
          marginBottom: 20,
          textAlign: "center",
        }}
      >
        Take a Mockup Interview to Enrich {"\n"}Your Skill with Industry Experts
      </Text>
      <Text style={{ color: colors.text, marginLeft: 15 }}>Pick a Branch</Text>
      <FlatList
        renderItem={({ item }) => {
          let ele = item;
          return (
            <TouchableOpacity
              style={{
                width: width / 2.3,
                height: 100,
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
                justifyContent: "center",
              }}
              onPress={() => {
                props.navigation.navigate("external", {
                  screen: "slot",
                  params: { thread: ele.course },
                });
              }}
            >
              <View style={{ justifyContent: "center", alignSelf: "center" }}>
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: "bold",
                    color: colors.text,
                    textAlign: "center",
                  }}
                >
                  {ele.course}{" "}
                </Text>
              </View>
            </TouchableOpacity>
          );
        }}
        keyExtractor={(item, index) => index.toString()}
        data={Data}
        style={{ margin: 2 }}
        numColumns={2}
      />
    </View>
  );
};

export default MockInterview;
