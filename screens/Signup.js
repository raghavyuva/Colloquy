import React, { useState, useRef } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
} from "react-native";
import { useFonts } from "expo-font";
import { Item, Input, Label, Icon } from "native-base";
import { LinearGradient } from "expo-linear-gradient";
import { useTheme } from "@react-navigation/native";
import { Text } from "native-base";
import { Config } from "../config";
import * as SecureStore from "expo-secure-store";
import LoadingComp from "../components/LoadingComp";
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
import firebase from "firebase";
const { width: screenWidth } = Dimensions.get("window");
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from "react-native-confirmation-code-field";
import WaveComp from "../components/WaveComp";
import { useDispatch, useSelector } from "react-redux";
import { setUserId, setUserToken } from "../redux/actions/UserAction";
import Svg, {
  Stop,
  Path,
  Defs,
  LinearGradient as Fgrad,
} from "react-native-svg";
const Signup = ({ navigation }) => {
  const dispatch = useDispatch();
  const recaptchaVerifier = useRef(null);
  const [age, setAge] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [loggingin, setloggingin] = useState(false);
  const [password, setPassword] = useState("");
  const [verificationId, setVerificationId] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [code, setCode] = useState("");
  const [otpactive, setotpactive] = useState(false);
  const { colors } = useTheme();
  const [Id, setId] = useState(null);
  const [token, settoken] = useState(null);
  const refs = useBlurOnFulfill({ code, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    code,
    setCode,
  });
  const [loaded] = useFonts({
    Montserrat: require("../assets/Pacifico/Pacifico-Regular.ttf"),
  });
  if (!loaded) {
    return null;
  }

  const onsignup = async () => {
    if (!email || !password  || !username) {
      alert("input fields cannot be as empty as like that");
    } else {
      setloggingin(true);
      fetch(`${Config.url}` + `/signup`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
          username: username,
        }),
      })
        .then((response) => response.json())
        .then(async (responseData) => {
          console.log(responseData);
          if (responseData.message == "signed up successfully") {
            setloggingin(false);
            await sendVerification();
            setEmail(null);
            setPassword(null);
            setUsername(null);
            setId(responseData.user._id);
            settoken(responseData.token);
            setloggingin(false);
          } else {
            alert(responseData.message);
            setloggingin(false);
          }
        })
        .done();
    }
  };
  const confirmCode = () => {
    setloggingin(true);
    try {
      const credential = firebase.auth.PhoneAuthProvider.credential(
        verificationId,
        code
      );
      firebase
        .auth()
        .signInWithCredential(credential)
        .then((result) => {
          fetch(`${Config.url}` + `/updateuser/${Id}`, {
            method: "PUT",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              number: "+91" + phoneNumber,
            }),
          })
            .then((response) => response.json())
            .then((responseData) => {
              dispatch(setUserId(Id));
              dispatch(setUserToken(token));
              SecureStore.setItemAsync("userToken", token);
              SecureStore.setItemAsync("UserId", Id);
            })
            .done();
          console.log(result);
        });
      setloggingin(false);
    } catch (error) {
      alert(error);
      setloggingin(false);
    }
    setotpactive(false);
  };
  const generatepass = () => {
    var randomstring = Math.random().toString(36).slice(-9);
    setPassword(randomstring);
  };
  const sendVerification = () => {
    const phoneProvider = new firebase.auth.PhoneAuthProvider();
    phoneProvider
      .verifyPhoneNumber("+91" + phoneNumber, recaptchaVerifier.current)
      .then(setVerificationId)
      .then(() => {
        alert("OTP has been sent to your phone number");
        setotpactive(true);
      });
  };

  const CELL_COUNT = 6;

  if (loggingin) {
    return <LoadingComp />;
  }
  return (
    <View style={styles(colors).screen}>
      <View
        style={{
          height: "15%",
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
      <FirebaseRecaptchaVerifierModal
        ref={recaptchaVerifier}
        firebaseConfig={firebase.app().options}
        style={{ flex: 1 }}
      />
      {otpactive ? (
        <>
          <SafeAreaView style={styles(colors).root}>
            <Text style={styles(colors).title}>Enter Otp to Validate</Text>
            <CodeField
              ref={refs}
              {...props}
              value={code}
              onChangeText={setCode}
              cellCount={CELL_COUNT}
              rootStyle={styles(colors).codeFieldRoot}
              keyboardType="number-pad"
              textContentType="oneTimeCode"
              textInputStyle={{ color: colors.text }}
              renderCell={({ index, symbol, isFocused }) => (
                <Text
                  key={index}
                  style={[
                    styles(colors).cell,
                    isFocused && styles(colors).focusCell,
                  ]}
                  onLayout={getCellOnLayoutHandler(index)}
                >
                  {symbol || (isFocused ? <Cursor /> : null)}
                </Text>
              )}
            />
            <View style={{ height: "20%", marginTop: 30 }}>
              <TouchableOpacity
                style={{ width: "100%", paddingRight: "10%" }}
                onPress={confirmCode}
              >
                <LinearGradient
                   colors={["#e7008a", "#e7008a"]}
                  style={styles(colors).btn1}
                  start={[0, 0]}
                  end={[1, 1]}
                >
                  <Text style={styles(colors).btntxt}>Verify OTP</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </SafeAreaView>
        </>
      ) : (
        <View>
          <View style={{}}>
            <Text style={styles(colors).header}>
              Hello there,{"\n"}
              Create an Account
            </Text>
            <View>
              <Item stackedLabel style={styles(colors).txtitm}>
                <Label style={styles(colors).txtinput}>Email</Label>
                <Input
                  value={email}
                  onChangeText={(useremail) => setEmail(useremail)}
                  style={{ color: colors.text }}
                />
              </Item>
            </View>
            <View>
              <Item stackedLabel style={styles(colors).txtitm}>
                <Label style={styles(colors).txtinput}>Password</Label>
                <Input
                  style={{ color: colors.text }}
                  value={password}
                  onChangeText={(userPassword) => setPassword(userPassword)}
                />
              </Item>
            </View>
            <TouchableOpacity
              style={{ marginTop: 5, alignItems: "flex-end" }}
              onPress={generatepass}
            >
              <Text style={{ color: "#b3b3b3" }}>Generate Password ? </Text>
            </TouchableOpacity>
            <View>
              <Item stackedLabel style={styles(colors).txtitm}>
                <Label style={styles(colors).txtinput}>User Name</Label>
                <Input
                  style={{ color: colors.text }}
                  value={username}
                  onChangeText={(username) => setUsername(username)}
                />
              </Item>
            </View>
            <View>
              <Item style={styles(colors).phone}>
                <Text style={{ color: colors.text }}>+91</Text>
                <Input
                  placeholder="Phone Number"
                  onChangeText={setPhoneNumber}
                  keyboardType="phone-pad"
                  autoCompleteType="tel"
                  placeholderTextColor="grey"
                  style={{ color: colors.text }}
                />
              </Item>
            </View>
          </View>
          <View>
            <View>
              <TouchableOpacity
                style={{ width: "100%", paddingRight: "10%" }}
                onPress={onsignup}
              >
                <LinearGradient
                  colors={["#e7008a", "#e7008a"]}
                  style={styles(colors).btn1}
                  start={[0, 0]}
                  end={[1, 1]}
                >
                  <Text style={styles(colors).btntxt}>Sign Up</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
            <View style={{ marginTop: 20 }}>
              <TouchableOpacity onPress={() => navigation.navigate("login")}>
                <Text style={styles(colors).txtnav}>
                  Already a User? SignIn Instead!
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              width: "80%",
              justifyContent: "center",
              alignItems: "center",
              display: "flex",
              marginLeft: 35,
              marginTop: 50,
            }}
          >
            <Text style={styles(colors).txtnav}>
              By creating an account you agree to the
            </Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("terms");
              }}
            >
              <Text
                style={{
                  color: colors.notification,
                  alignSelf: "center",
                }}
              >
                Terms of use
              </Text>
            </TouchableOpacity>
            <Text
              style={{
                color: colors.text,
                alignSelf: "center",
                marginHorizontal: 5,
              }}
            >
              and
            </Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("privacy");
              }}
            >
              <Text
                style={{
                  color: colors.notification,
                  textAlign: "center",
                }}
              >
                Privacy policy
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

export default Signup;

const styles = (colors) =>
  StyleSheet.create({
    screen: {
      backgroundColor: colors.background,
      flex: 1,
    },
    btn1: {
      width: "100%",
      padding: 10,
      borderRadius: 5,
      marginLeft: 20,
      marginTop: 20,
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
      borderBottomColor: colors.border,
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
    phone: {
      width: "90%",
      alignSelf: "center",
      borderBottomColor: colors.border,
      padding: 10,
    },
    input: {
      width: 200,
      height: 31,
      paddingLeft: 15,
      alignSelf: "center",
      marginLeft: 15,
      borderLeftWidth: 1,
      color: colors.text,
    },
    num: {
      fontSize: 20,
      color: colors.text,
      marginLeft: 10,
      fontWeight: "bold",
    },
    opacity: {
      alignSelf: "center",
    },
    contain: {
      flexDirection: "row",
      width: screenWidth - 100,
      height: 60,
      alignSelf: "center",
      marginBottom: 25,
      borderWidth: 0.4,
      borderColor: colors.text,
      borderRadius: 2,
    },
    root: { flex: 1, padding: 20 },
    title: { textAlign: "center", fontSize: 30, color: colors.text },
    codeFieldRoot: { marginTop: 20 },
    cell: {
      width: 40,
      height: 40,
      lineHeight: 38,
      fontSize: 24,
      borderWidth: 2,
      borderColor: colors.border,
      textAlign: "center",
      color: colors.text,
    },
    focusCell: {
      borderColor: colors.text,
      color: colors.text,
    },
  });

  