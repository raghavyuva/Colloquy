import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Config } from "../config";
import * as SecureStore from "expo-secure-store";
import Svg, {
  Stop,
  Path,
  Defs,
  LinearGradient as Fgrad,
} from "react-native-svg";
import { useTheme } from "@react-navigation/native";
import { Item, Input, Label, Right } from "native-base";
import { useFonts } from "expo-font";
import LoadingComp from "../components/LoadingComp";
import { setUserId, setUserToken } from "../redux/actions/UserAction";
import { useDispatch, useSelector } from "react-redux";
const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { colors } = useTheme();
  const [loggingin, setloggingin] = useState(false);
  const [passvisibility, setpassvisibility] = useState(true);
  const dispatch = useDispatch();
  const [loaded] = useFonts({
    Montserrat: require("../assets/Pacifico/Pacifico-Regular.ttf"),
  });
  if (!loaded) {
    return null;
  }
  const onsignin = () => {
    if (!email || !password) {
      alert("input fields cannot be as empty as like that");
    } else {
      setloggingin(true);
      fetch(`${Config.url}` + `/login`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      })
        .then((response) => response.json())
        .then((responseData) => {
          if (responseData.message == "Auth successfull") {
            dispatch(setUserId(responseData.user._id));
            dispatch(setUserToken(responseData.token));
            SecureStore.setItemAsync("userToken", responseData.token);
            SecureStore.setItemAsync("UserId", responseData.user._id);
            setEmail(null);
            setPassword(null);
            setloggingin(false);
          } else {
            alert(responseData.message);
            setloggingin(false);
          }
        })
        .done();
    }
  };

  if (loggingin) {
    return <LoadingComp />;
  }
  return (
    <View style={styles(colors).screen}>
      <StatusBar barStyle="light-content" backgroundColor="#e7008a" />
      <View style={{ marginTop: 0 }}>
        <View
          style={{
            height: "40%",
          }}
        >
          <Svg xmlns="http://www.w3.org/2000/svg">
            <Path
              fill="#e7008a"
              fillOpacity="1"
              d="M0,64L48,80C96,96,192,128,288,122.7C384,117,480,75,576,90.7C672,107,768,181,864,208C960,235,1056,213,1152,213.3C1248,213,1344,235,1392,245.3L1440,256L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
            ></Path>
          </Svg>
        </View>
        <Text style={styles(colors).header}>
          Hello there,{"\n"}
          Welcome back
        </Text>
      </View>
      <View style={{ marginTop: -80 }}>
        <View>
          <Item style={styles(colors).txtitm} stackedLabel>
            <Label style={styles(colors).txtinput}>Email Address</Label>
            <Input
              value={email}
              onChangeText={(useremail) => setEmail(useremail)}
              placeholderTextColor={colors.text}
              style={{ color: colors.text }}
            />
          </Item>
        </View>
        <View>
          <Item style={styles(colors).txtitm} stackedLabel>
            <Label style={styles(colors).txtinput}>Password</Label>
            <Input
              value={password}
              onChangeText={(userPassword) => setPassword(userPassword)}
              style={{ color: colors.text }}
              secureTextEntry={passvisibility}
            ></Input>
          </Item>
        </View>
      </View>
      <View style={{}}>
        <View style={{}}>
          <TouchableOpacity onPress={() => navigation.navigate("forgot")}>
            <Text style={styles(colors).forgot}>Forgot Your Password?</Text>
          </TouchableOpacity>
        </View>
        <View style={{ marginTop: "20%" }}>
          <TouchableOpacity
            style={{ width: "100%", paddingRight: "10%" }}
            onPress={onsignin}
          >
            <LinearGradient
              colors={["#e7008a", "#e7008a"]}
              style={styles(colors).btn1}
              start={[0, 0]}
              end={[1, 1]}
            >
              <Text style={styles(colors).btntxt}>Sign In</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
        {/* <View style={{ height: '15%', }}>
                    <TouchableOpacity onPress={() => navigation.navigate('phone')}>
                        <Text style={styles(colors).txtnav}>Login With Phone Number? </Text>
                    </TouchableOpacity>
                </View> */}
        <View style={{marginTop:20}}>
          <TouchableOpacity onPress={() => navigation.navigate("signup")}>
            <Text style={styles(colors).txtnav}>
              New Here? SignUp Instead!{" "}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={{
          height: "15%",
        }}
      >
        <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <Path
            fill="#e7008a"
            fill-opacity="1"
            d="M0,64L48,69.3C96,75,192,85,288,106.7C384,128,480,160,576,144C672,128,768,64,864,74.7C960,85,1056,171,1152,176C1248,181,1344,107,1392,69.3L1440,32L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></Path>
        </Svg>
      </View>
    </View>
  );
};

export default Login;

const styles = (colors) =>
  StyleSheet.create({
    screen: {
      backgroundColor: colors.background,
      flex: 1,
    },
    btn1: {
      width: "100%",
      padding: 15,
      borderRadius: 5,
      marginLeft: 20,
    },
    btntxt: {
      backgroundColor: "transparent",
      fontSize: 18,
      color: "white",
      textAlign: "center",
      fontFamily: "Montserrat",
    },
    txtinput: {
      color: colors.text,
      alignSelf: "flex-start",
    },
    txtitm: {
      width: "90%",
      alignSelf: "center",
      borderBottomColor: "grey",
      color: colors.text,
    },
    header: {
      fontFamily: "Montserrat",
      fontSize: 40,
      color: colors.text,
    },
    txtnav: {
      textAlign: "center",
      color: colors.text,
    },
    forgot: {
      textAlign: "right",
      color: colors.text,
      marginRight: 5,
      padding: 5,
    },
  });
