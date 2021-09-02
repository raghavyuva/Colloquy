import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  Dimensions,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useTheme } from "@react-navigation/native";
import { Button, Card, Item, Label, Input } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import Headingbar from "../components/Header";
const { width, height } = Dimensions.get("window");
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
import DocumentPicker from "react-native-document-picker";
import RNFetchBlob from "rn-fetch-blob";
import { Config } from "../config";
import UploadingComp from "../components/UploadingComp";
import { useSelector, useDispatch } from "react-redux";
import mime from "mime";
import RNFS from "react-native-fs";
const NotesUpload = (props) => {
  const user = useSelector((state) => state.userDetails);

  const { colors } = useTheme();
  const [document, setdocument] = useState("");
  const [docname, setdocname] = useState(null);
  const [first, setfirst] = useState(null);
  const [title, settitle] = useState("");
  const [year, setyear] = useState("");
  const [branch, setbranch] = useState("");
  const [uploading, setuploading] = useState(null);
  const [loading, setloading] = useState(false);
  const PickDocument = async () => {
    const res = await DocumentPicker.pick({
      type: [DocumentPicker.types.allFiles],
    });
    const urlComponents = res.uri.split("/");
    const fileNameAndExtension = urlComponents[urlComponents.length - 1];
    const destPath = `${RNFS.TemporaryDirectoryPath}/${fileNameAndExtension}`;
    await RNFS.copyFile(res.uri, destPath);
    // console.log('file://'+destPath)
    setfirst("file://" + destPath);
    setdocument(res.type);
    setdocname(res.name);
  };
  const UploadNotes = async () => {
    try {
      // setloading(true);
      const newImageUri = "file:///" + first.split("file:/").join("");
      console.log(newImageUri);

      const formData = new FormData();
      formData.append("myfile", {
        uri: newImageUri,
        type: document,
        name: docname,
      });
      formData.append("title", title);
      formData.append("branch", branch);
      formData.append("foryear", year);
      console.log(formData);
      fetch(`${Config.url}/upload_notes`, {
        method: "POST",
        headers: {
          Authorization: "Bearer " + `${user.userToken}`,
        },
        body: formData,
      })
        .then((res) => res.json())
        .then((resp) => {
          console.log(resp);
          // setloading(false);
          console.log(resp);
        });
    } catch (error) {
      alert(error);
    }
  };
  if (loading) {
    return (
      <View style={{ flex: 1, backgroundColor: colors.background }}>
        <Headingbar {...props} />
        <UploadingComp />
      </View>
    );
  }
  return (
    <View style={styles(colors).Main}>
      <Headingbar {...props} />
      <View style={styles(colors).scond}>
        <View style={styles(colors).part}>
          <Image
            source={require("../assets/reading.png")}
            style={{ height: "100%", width: 400 }}
          />
        </View>
      </View>
      <KeyboardAvoidingView style={styles(colors).bottompart}>
        <Text style={styles(colors).header}>Upload Notes</Text>
        <ScrollView style={{ height: "100%", marginTop: 20 }}>
          <View>
            <Item stackedLabel style={styles(colors).txtitm}>
              <Label style={styles(colors).txtinput}>Title for Notes</Label>
              <Input onChangeText={(e) => settitle(e)} value={title} />
            </Item>
          </View>
          <View>
            <Item stackedLabel style={styles(colors).txtitm}>
              <Label style={styles(colors).txtinput}>Notes for Branch</Label>
              <Input onChangeText={(e) => setbranch(e)} value={branch} />
            </Item>
          </View>
          <View>
            <Item stackedLabel style={styles(colors).txtitm}>
              <Label style={styles(colors).txtinput}>Notes for Semester</Label>
              <Input
                onChangeText={(e) => setyear(e)}
                keyboardType="number-pad"
                value={year}
              />
            </Item>
          </View>
        </ScrollView>
        {first != null ? (
          <View style={{ justifyContent: "center" }}>
            <View style={{ flexDirection: "row", justifyContent: "center" }}>
              <Text
                style={{ color: colors.text, textAlign: "center", margin: 10 }}
              >
                File Attached
              </Text>
              <MaterialIcons
                name="file-present"
                size={24}
                color={colors.primary}
                style={{ marginTop: 5 }}
              />
              <TouchableOpacity
                onPress={() => {
                  setfirst(null);
                }}
                style={{}}
              >
                <MaterialIcons name="cancel" size={18} color={colors.primary} />
              </TouchableOpacity>
            </View>
            <Text
              style={{ color: colors.text, textAlign: "center" }}
              numberOfLines={2}
            >
              {docname}
            </Text>
          </View>
        ) : (
          <View style={{ justifyContent: "center" }}>
            <View style={{ flexDirection: "row", justifyContent: "center" }}>
              <Text
                style={{
                  color: colors.text,
                  textAlign: "center",
                  marginRight: 5,
                }}
              >
                Attach Notes
              </Text>
              <TouchableOpacity onPress={PickDocument}>
                <MaterialIcons
                  name="attachment"
                  size={24}
                  color={colors.primary}
                  style={{ alignSelf: "center" }}
                />
              </TouchableOpacity>
            </View>
          </View>
        )}
      </KeyboardAvoidingView>

      <Button style={styles(colors).btn} onPress={UploadNotes}>
        <Text style={{ color: "white" }}>Submit</Text>
      </Button>
    </View>
  );
};
export default NotesUpload;

const styles = (colors) =>
  StyleSheet.create({
    Main: {
      flex: 1,
    },
    scond: {
      backgroundColor: colors.background,
      flex: 0.5,
    },
    header: {
      fontSize: 35,
      color: colors.text,
      textAlign: "center",
    },
    part: {
      justifyContent: "center",
      padding: 10,
      alignSelf: "center",
    },
    bottompart: {
      borderWidth: 1,
      margin: 10,
      borderColor: "grey",
      flex: 0.49,
      justifyContent: "center",
      padding: 5,
    },
    txtinput: {
      color: colors.text,
    },
    txtitm: {
      width: "90%",
      alignSelf: "center",
      borderBottomColor: "grey",
    },
    send: {
      justifyContent: "center",
      alignSelf: "center",
    },
    btn: {
      width: 200,
      justifyContent: "center",
      marginTop: 20,
      backgroundColor: colors.primary,
      alignSelf: "center",
      borderRadius: 26,
    },
  });
