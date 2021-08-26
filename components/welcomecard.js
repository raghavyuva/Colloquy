import React from "react";
import { StyleSheet, Image } from "react-native";
import { useTheme } from "@react-navigation/native";
import { Button, View, Text, Card, CardItem, Title } from "native-base";

const Welcomecard = (props) => {
  const { colors } = useTheme();
  const onsignuppress = () => {
    props.navigation.navigate("signup");
  };
  const onloginpress = () => {
    props.navigation.navigate("login");
  };
  return (
    <View style={{}}>
      <Title
        style={{ fontFamily: "Montserrat", fontSize: 52, color: colors.text }}
      >
        VtYuva
      </Title>
      <Text style={styles(colors).caption}>Unleash your potential</Text>
      <Image
        source={require("../assets/logoorange.png")}
        style={{ width: 100, height: 200, alignSelf: "center" }}
      />
      <View
        style={{
          margin: 10,
        }}
      >
        <Button
          style={{
            backgroundColor: colors.card,
            borderColor: "grey",
            borderWidth: 1,
            alignSelf: "center",
            width: 200,
            justifyContent: "center",
            margin: 10,
          }}
          onPress={onloginpress}
        >
          <Text
            style={{
              color: colors.text,
              textTransform: "capitalize",
              textAlign: "center",
            }}
          >
            Login
          </Text>
        </Button>
        <Button
          style={{
            backgroundColor: colors.card,
            borderColor: "grey",
            borderWidth: 1,
            alignSelf: "center",
            width: 200,
            justifyContent: "center",
          }}
          onPress={onsignuppress}
        >
          <Text
            style={{
              color: colors.text,
              textTransform: "capitalize",
              textAlign: "center",
            }}
          >
            signup
          </Text>
        </Button>
      </View>
    </View>
  );
};

export default Welcomecard;

const styles = (colors) =>
  StyleSheet.create({
    caption: {
      fontSize: 14,
      color: "grey",
      textAlign: "right",
    },
  });
