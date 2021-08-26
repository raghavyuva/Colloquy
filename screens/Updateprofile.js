import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  FlatList,
  TouchableOpacity,
  TextInput,
  Alert,
  ScrollView,
} from "react-native";
import { Fab, Button, Text, Item, Label, Input } from "native-base";
const { width, height } = Dimensions.get("window");

import { Config } from "../config";

import * as ImagePicker from "expo-image-picker";

import { DefaultTheme, DarkTheme, useTheme } from "@react-navigation/native";
import Image from "react-native-image-progress";
import * as Progress from "react-native-progress";
import { useSelector, useDispatch } from "react-redux";
import Headingbar from "../components/Header";

const BottomComponent = (props) => {
  const { colors } = useTheme();
  const user = useSelector((state) => state.userDetails.user);
  const User = useSelector((state) => state.userDetails);
  const [username, setusername] = useState(user.user.username);
  const [postimage, setpostimage] = useState(user.user.userphoto);
  const [body, setbody] = useState(user.user.tagline);
  const [image, setimage] = useState("");
  const [email, setemail] = useState(null);
  const [token, settoken] = useState(null);
  const [password, setPassword] = useState(null);
  const [verifypass, setverifypass] = useState(null);
  const [canbeshown, setcanbeshown] = useState(false);
  const [acbottom, setacbottom] = useState(false);
  const [telgramlink, settelgramlink] = useState("");
  const [instalink, setinstalink] = useState("");
  const newpassword = () => {
    if (password == verifypass) {
      fetch(`${Config.url}` + `/new-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: token,
          password: password,
        }),
      })
        .then((res) => res.json())
        .then((resp) => {
          // console.log(resp);
          alert(resp.message);
          if (resp.message === "password updated successfully") {
          } else {
          }
        });
    } else {
      alert("err:passwords did not match");
    }
  };
  const _pickImagefromGallery = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        quality: 1,
        base64: true,
        aspect: [4, 3],
      });
      if (!result.cancelled) {
        const { uri, base64 } = result;
        setpostimage(uri);
        setimage(base64);
      }
    } catch (E) {
      console.log(E);
    }
  };
  const _upload = async () => {
    if (postimage == user.user.userphoto) {
      fetch(`${Config.url}` + `/user/update`, {
        method: "PUT",
        headers: {
          Authorization: "Bearer " + `${User.userToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          tagline: body,
          username: username,
          userphoto: user.user.userphoto,
        }),
      })
        .then((res) => res.json())
        .then((resp) => {
          console.log(resp);
        });
    } else {
      const uriArr = postimage.split(".");
      const fileType = uriArr[uriArr.length - 1];
      const file = `data:${fileType};base64,${image}`;
      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", "primish");
      data.append("cloud_name", "raghavyuva");
      fetch("https://api.cloudinary.com/v1_1/raghavyuva/image/upload", {
        method: "POST",
        body: data,
      })
        .then((res) => res.json())
        .then((da) => {
          fetch(`${Config.url}` + `/user/update`, {
            method: "PUT",
            headers: {
              Authorization: "Bearer " + `${User.userToken}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              tagline: body,
              username: username,
              userphoto: da.secure_url,
            }),
          })
            .then((res) => res.json())
            .then((resp) => {
              console.log(resp);
            });
        })
        .catch((err) => {
          Alert.alert(err);
        });
    }
  };

  const Reset = () => {
    fetch(`${Config.url}` + `/reset-password`, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + `${User.userToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: user.user.email,
      }),
    })
      .then((res) => res.json())
      .then((resp) => {
        console.log(resp);
        alert(resp.message);
        setacbottom(true);
        setcanbeshown(true);
      });
  };
  return (
    <View
      style={{
        backgroundColor: colors.background,
        width: "100%",
      }}
    >
      <Headingbar {...props} />
      <ScrollView>
        <View
          style={{
            justifyContent: "center",
            alignSelf: "center",
            paddingTop: 5,
          }}
        >
          <TouchableOpacity onPress={_pickImagefromGallery}>
            <Image
              source={{ uri: postimage }}
              style={{
                height: 150,
                width: 150,
                borderRadius: 20,
              }}
              indicator={Progress.Pie}
              indicatorProps={{
                size: 180,
                borderWidth: 0,
                color: "rgba(150, 150, 150, 1)",
                unfilledColor: "rgba(200, 200, 200, 0.2)",
              }}
            />
            <Text style={{ color: colors.text, textAlign: "center" }}>
              Change Photo
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{ margin: 5 }}>
          <Label
            style={{
              justifyContent: "center",
              marginLeft: "10%",
              textTransform: "capitalize",
            }}
          >
            User Name
          </Label>
          <TextInput
            style={{
              width: "80%",
              paddingLeft: 10,
              paddingBottom: 10,
              paddingRight: 10,
              color: colors.text,
              borderColor: colors.border,
              borderBottomWidth: 1,
              height: 60,
              justifyContent: "center",
              alignContent: "center",
              alignSelf: "center",
              opacity: 0.5,
            }}
            value={username}
            placeholder="Change UserName"
            onChangeText={(useremail) => setusername(useremail)}
            placeholderTextColor={colors.text}
          ></TextInput>
        </View>
        <View style={{ margin: 5 }}>
          <Label
            style={{
              justifyContent: "center",
              marginLeft: "10%",
              textTransform: "capitalize",
            }}
          >
            tagline
          </Label>
          <TextInput
            style={{
              width: "80%",
              paddingLeft: 10,
              paddingBottom: 10,
              paddingRight: 10,
              color: colors.text,
              borderColor: colors.border,
              borderBottomWidth: 1,
              height: 60,
              justifyContent: "center",
              alignContent: "center",
              alignSelf: "center",
              opacity: 0.5,
            }}
            value={body}
            placeholder="Change Tagline"
            onChangeText={(useremail) => setbody(useremail)}
            placeholderTextColor={colors.text}
          ></TextInput>
        </View>
        <View style={{ margin: 5 }}>
          <Label
            style={{
              justifyContent: "center",
              marginLeft: "10%",
              textTransform: "capitalize",
            }}
          >
            telegram profile
          </Label>
          <TextInput
            style={{
              width: "80%",
              paddingLeft: 10,
              paddingBottom: 10,
              paddingRight: 10,
              color: colors.text,
              borderColor: colors.border,
              borderBottomWidth: 1,
              height: 60,
              justifyContent: "center",
              alignContent: "center",
              alignSelf: "center",
              opacity: 0.5,
            }}
            value={telgramlink}
            placeholder="set telegram profile link"
            onChangeText={(useremail) => settelgramlink(useremail)}
            placeholderTextColor={colors.text}
          ></TextInput>
        </View>
        <View style={{ margin: 5 }}>
          <Label
            style={{
              justifyContent: "center",
              marginLeft: "10%",
              textTransform: "capitalize",
            }}
          >
            instagram profile
          </Label>
          <TextInput
            style={{
              width: "80%",
              paddingLeft: 10,
              paddingBottom: 10,
              paddingRight: 10,
              color: colors.text,
              borderColor: colors.border,
              borderBottomWidth: 1,
              height: 60,
              justifyContent: "center",
              alignContent: "center",
              alignSelf: "center",
              opacity: 0.5,
            }}
            value={instalink}
            placeholder="set instagram profile link"
            onChangeText={(useremail) => setinstalink(useremail)}
            placeholderTextColor={colors.text}
          ></TextInput>
        </View>
        <Button
          style={{
            backgroundColor: colors.primary,
            justifyContent: "center",
            alignSelf: "center",
            width: 150,
            marginTop: 10,
          }}
          onPress={_upload}
        >
          <Text style={{ color: colors.text }}>Submit</Text>
        </Button>
        <Button
          style={{
            backgroundColor: colors.card,
            justifyContent: "center",
            alignSelf: "center",
            width: 180,
            marginTop: 25,
          }}
          onPress={Reset}
        >
          <Text style={{ color: colors.text }}>Reset Password</Text>
        </Button>
        {canbeshown == true ? (
          <>
            <TextInput
              style={{
                width: "80%",
                paddingLeft: 10,
                paddingBottom: 10,
                paddingRight: 10,

                color: colors.text,
                borderColor: colors.border,
                borderWidth: 1.5,
                height: 60,
                justifyContent: "center",
                alignContent: "center",
                alignSelf: "center",
                opacity: 0.5,
                marginTop: 20,
              }}
              value={password}
              placeholder="Enter new password"
              onChangeText={(useremail) => setPassword(useremail)}
              placeholderTextColor={colors.text}
            ></TextInput>
            <TextInput
              style={{
                width: "80%",
                paddingLeft: 10,
                paddingBottom: 10,
                paddingRight: 10,

                color: colors.text,
                borderColor: colors.border,
                borderWidth: 1.5,
                height: 60,
                justifyContent: "center",
                alignContent: "center",
                alignSelf: "center",
                opacity: 0.5,
                marginTop: 20,
              }}
              value={verifypass}
              placeholder="Verify new password"
              onChangeText={(useremail) => setverifypass(useremail)}
              placeholderTextColor={colors.text}
            ></TextInput>
            <TextInput
              style={{
                width: "80%",
                paddingLeft: 10,
                paddingBottom: 10,
                paddingRight: 10,

                color: colors.text,
                borderColor: colors.border,
                borderWidth: 1.5,
                height: 60,
                justifyContent: "center",
                alignContent: "center",
                alignSelf: "center",
                opacity: 0.5,
                marginTop: 20,
              }}
              value={token}
              placeholder="Enter token"
              onChangeText={(useremail) => settoken(useremail)}
              placeholderTextColor={colors.text}
            ></TextInput>
            <Button
              style={{
                backgroundColor: colors.primary,
                justifyContent: "center",
                alignSelf: "center",
                width: width - 50,
                marginTop: 25,
                marginBottom: 80,
              }}
              onPress={newpassword}
            >
              <Text style={{ color: colors.text }}>Submit New Password</Text>
            </Button>
          </>
        ) : (
          <></>
        )}
      </ScrollView>
    </View>
  );
};

export default BottomComponent;

const styles = StyleSheet.create({});
