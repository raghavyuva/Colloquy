import React, { useEffect, useState } from "react";
import {
  Image,
  StyleSheet,
  LogBox,
  FlatList,
  Dimensions,
  SafeAreaView,
  Text,
  Picker,
  Alert,
  View,
  Platform,
} from "react-native";
import {
  Card,
  Textarea,
  Fab,
  CardItem,
  Button,
  Left,
  Body,
  Title,
  Right,
  Header,
} from "native-base";
import * as ImagePicker from "expo-image-picker";
import { Config } from "../config";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
const { width: screenWidth, height: screenHeight } = Dimensions.get("window");
import * as MediaLibrary from "expo-media-library";
import { useTheme } from "@react-navigation/native";
import {
  MaterialIcons,
  MaterialCommunityIcons,
  Ionicons,
} from "@expo/vector-icons";
import Icon from "react-native-vector-icons/MaterialIcons";
import * as firebase from "firebase";
import LottieView from "lottie-react-native";
import "@firebase/auth";
import "@firebase/firestore";
import UploadingComp from "../components/UploadingComp";
import { useSelector, useDispatch } from "react-redux";

import mime from "mime";
LogBox.ignoreLogs(["Setting a timer"]);
const Uploadpost = (props) => {
  const [loading, setloading] = useState(true);
  const [body, setbody] = useState("");
  const [uploading, setuploading] = useState(false);
  const [ondone, setondone] = useState(false);
  const [postimage, setpostimage] = useState("");
  const [loaclimages, setloaclimages] = useState("");
  const [selectedItems, setselectedItems] = useState([]);
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const { colors } = useTheme();
  const [selectedValue, setSelectedValue] = useState("VTU");
  const [finaltags, setfinaltags] = useState([]);
  const [first, setfirst] = useState("");
  const [toggle, setToggle] = useState(true);
  const [status, setstatus] = useState(null);
  const [active, setactive] = useState(false);
  const [storagestatus, setstoragestatus] = useState(false);
  const user = useSelector((state) => state.userDetails);

  let defdarktheme = true;
  useEffect(() => {
    let IsMounted = true;
    // console.log(permstorage)
    GetPermofStorage();

    return () => {
      IsMounted = false;
    };
  }, []);

  const FabComponent = () => {
    return (
      <Fab
        active={active}
        direction="up"
        containerStyle={{}}
        style={{ backgroundColor: colors.primary }}
        position="bottomRight"
        onPress={() => setactive(!active)}
      >
        <MaterialCommunityIcons
          name="image-edit"
          size={24}
          color={colors.text}
        />
        <Button
          style={{ backgroundColor: colors.primary, marginBottom: 40 }}
          onPress={_pickImagefromGallery}
        >
          <MaterialCommunityIcons
            name="file-image"
            size={24}
            color={colors.text}
          />
        </Button>
        <Button
          style={{ backgroundColor: colors.primary, marginBottom: 40 }}
          onPress={_pickImagefromCamera}
        >
          <MaterialCommunityIcons name="camera" size={24} color={colors.text} />
        </Button>
      </Fab>
    );
  };
  const toggleFunction = () => {
    setToggle(!toggle);
  };

  const uploadPhotoAsync = async () => {
    try {
      return new Promise(async (res, rej) => {
        const response = await fetch(first);
        const file = await response.blob();
        // console.log(file)
        let upload = firebase.storage().ref(postimage.filename).put(file);
        upload.on(
          "state_changed",
          (snapshot) => {
            var progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Upload is " + progress + "% done");

            switch (snapshot.state) {
              case firebase.storage.TaskState.PAUSED: // or 'paused'
                console.log("Upload is paused");
                break;
              case firebase.storage.TaskState.RUNNING: // or 'running'
                console.log("Upload is running");
                break;
            }
          },
          (err) => {
            rej(err);
          },
          async () => {
            const url = await upload.snapshot.ref.getDownloadURL();
            res(url);
            console.log(url);
            mongoupload(url);
          }
        );
      });
    } catch (error) {
      alert(error);
      setuploading(false);
    }
  };
  const GetPermofStorage = async () => {
    const { status } = await MediaLibrary.getPermissionsAsync();
    if (status == "granted") {
      setstoragestatus("granted");
      const media = MediaLibrary.getAssetsAsync({
        mediaType: MediaLibrary.MediaType.photo,
      });
      setloaclimages((await media).assets);
      setfirst((await media).assets[0].uri);
      setpostimage((await media).assets[0]);
    } else {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      console.log(status);
      if (status == "granted") {
        setstoragestatus("granted");

        const media = MediaLibrary.getAssetsAsync({
          mediaType: MediaLibrary.MediaType.photo,
        });
        setloaclimages((await media).assets);
        setfirst((await media).assets[0].uri);
        setpostimage((await media).assets[0]);
        console.log(postimage);
      } else {
        setstoragestatus("notgranted");
      }
    } 
  }; 

  const mongoupload = () => {
    try {
      setuploading(true);
      const newImageUri =  "file:///" + first.split("file:/").join("");
      console.log(newImageUri)
      const formData = new FormData();
      formData.append("myfile", {
        uri : newImageUri,
        type: mime.getType(newImageUri),
        name: newImageUri.split("/").pop()
      });
      formData.append("caption", body);
      formData.append("category", selectedValue);
      console.log(formData);
      fetch(`${Config.url}/post`, {
        method: "POST",
        headers: {
          Authorization: "Bearer " + `${user.userToken}`,
        },
        body: formData,
      })
        .then((res) => {
          res.json();
        })
        .then((resp) => {
          setuploading(false);
          setbody("");
          setfinaltags([]);
          setSelectedValue("java");
          setondone(true);
          setTimeout(() => {
            setondone(false);
          }, 5000);
        })
        .catch((e) => {
          alert(e);
          setuploading(false);
        });
    } catch (error) {
      alert(error);
      setuploading(false);
    }
  };

  const _upload = async () => {
    if (!postimage) {
      alert("no photo selected to post");
    } else {
      setuploading(true);
      uploadPhotoAsync();
    }
  };

  const onSelectedItemsChange = (selectedItems) => {
    setselectedItems(selectedItems);
  };
  const oncomplete = (objectfo) => {
    setfinaltags(objectfo);
  };

  const HeaderView = () => {
    return (
      <Header style={{ backgroundColor: colors.background }}>
        <Left>
          <Button
            transparent
            onPress={() => {
              props.navigation.openDrawer();
            }}
          >
            <Icon name="menu" style={{ color: colors.text }} size={24} />
          </Button>
        </Left>
        <Body>
          <Title
            style={{
              fontFamily: "Montserrat",
              fontSize: 25,
              color: colors.text,
            }}
          >
            Vtyuva
          </Title>
        </Body>
        <Right>
          <Button transparent onPress={toggleFunction}>
            {toggle ? (
              <MaterialIcons name="wb-sunny" size={24} color={colors.text} />
            ) : (
              <Ionicons name="md-moon-sharp" size={24} color={colors.text} />
            )}
          </Button>
          <Button
            transparent
            style={{ backgroundColor: colors.card, borderRadius: 2 }}
            onPress={mongoupload}
          >
            <Text style={{ color: colors.text }}>Upload </Text>
          </Button>
        </Right>
      </Header>
    );
  };

  const _pickImagefromGallery = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      base64: false,
      allowsEditing: true,
    });
    setfirst(result.uri);
    console.log(result)
  };
  const _pickImagefromCamera = async () => {
    if (Platform.OS !== "web") {
      const { status } = await ImagePicker.getCameraPermissionsAsync();
      console.log(status);
      if (status == "undetermined") {
        const s = await (
          await ImagePicker.requestCameraPermissionsAsync()
        ).status;
        if (s == "granted") {
          const result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            base64: true,
            allowsEditing: true,
          });
          setfirst(result.uri);
        } else {
          alert("we need camera permissions");
        }
      }
      if (status == "granted") {
        const result = await ImagePicker.launchCameraAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          base64: true,
          allowsEditing: true,
        });
        setfirst(result.uri);
      }
      if (status == "denied") {
        const ss = await (
          await ImagePicker.requestCameraPermissionsAsync()
        ).status;
        if (ss == "granted") {
          const result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            base64: true,
            allowsEditing: true,
          });
          setfirst(result.uri);
        } else {
          alert("we need camera permissions");
        }
      }
    }
  };

  // const MulTiSelect = (colors) => {
  //     return (

  //     )
  // }

  // if (loading) {
  //   return(
  //       <LoadingComp />
  //   )
  // }
  if (uploading) {
    return (
      <View style={{ flex: 1, backgroundColor: colors.background }}>
        <HeaderView {...props} />
        <UploadingComp />
      </View>
    );
  }

  if (ondone) {
    return (
      <View style={{ flex: 1, backgroundColor: colors.background }}>
        <HeaderView {...props} />
        <LottieView
          loop={true}
          autoPlay={true}
          source={require("../animation/50465-done.json")}
        />
      </View>
    );
  }

  if (setstoragestatus == "notgranted") {
    const { status } = ImagePicker.getMediaLibraryPermissionsAsync;
    if (status != "granted") {
      setstoragestatus("granted");
      return (
        <View style={{ flex: 1, backgroundColor: colors.background }}>
          <HeaderView {...props} />
          <Text style={{ color: colors.text }}>
            We Need Camera Roll Permission to make this work
          </Text>
        </View>
      );
    } else {
      setstoragestatus("notgranted");
    }
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <HeaderView />
      <ScrollView keyboardShouldPersistTaps="always">
        <Card
          style={{
            backgroundColor: colors.card,
            padding: 0,
            margin: 5,
            height: screenHeight / 5,
            borderColor: colors.border,
            flexDirection: "row",
          }}
        >
          <Textarea
            rowSpan={5}
            style={{ color: colors.text }}
            placeholder="Type Description"
            width={screenWidth - 150}
            numberOfLines={5}
            multiline
            value={body}
            onChangeText={(body) => setbody(body)}
          />
          <Image
            style={{ width: 150, height: 150, alignSelf: "center" }}
            source={{ uri: first }}
          />
        </Card>
        <Card
          style={{
            backgroundColor: colors.card,
            padding: 0,
            margin: 5,
            borderColor: colors.border,
          }}
        >
          <CardItem
            style={{
              backgroundColor: colors.background,
              justifyContent: "space-between",
            }}
          >
            <Text
              style={{ color: colors.text, fontSize: 18, fontWeight: "bold" }}
            >
              Category
            </Text>
            <Picker
              selectedValue={selectedValue}
              style={{
                height: 50,
                width: 150,
                backgroundColor: colors.background,
                color: colors.text,
              }}
              onValueChange={(itemValue, itemIndex) =>
                setSelectedValue(itemValue)
              }
            >
              <Picker.Item label="VTU" value="VTU" />
              <Picker.Item label="STUDENTS" value="STUDENTS" />
              <Picker.Item label="MEMES" value="MEMES" />
              <Picker.Item label="Engineering" value="Engineering" />
              <Picker.Item label="Social" value="Social" />
            </Picker>
            <MaterialIcons name="category" size={24} color={colors.primary} />
          </CardItem>
        </Card>
        <Card
          style={{
            backgroundColor: colors.card,
            padding: 0,
            margin: 5,
            height: screenHeight / 2,
            borderColor: colors.border,
          }}
        >
          <Text style={{ color: colors.text, opacity: 0.4 }}>
            Choose One Photo
          </Text>
          <FlatList
            renderItem={({ item }) => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    setfirst(item.uri);
                    setpostimage(item);
                  }}
                >
                  <Card
                    style={{
                      backgroundColor: colors.card,
                      padding: 0,
                      borderColor: colors.border,
                    }}
                  >
                    <Image
                      style={{
                        width: 200,
                        height: screenHeight / 2,
                        resizeMode: "center",
                      }}
                      source={{ uri: item.uri }}
                    />
                  </Card>
                </TouchableOpacity>
              );
            }}
            keyExtractor={(item, index) => index.toString()}
            data={loaclimages}
            horizontal
          />
        </Card>
      </ScrollView>
      <FabComponent />
    </SafeAreaView>
  );
};
export default Uploadpost;
const styles = StyleSheet.create({
  screen: {
    backgroundColor: "#0b032b",
    height: screenHeight,
  },
  logo: {
    width: screenWidth,
    height: screenHeight / 2.4,
    alignSelf: "center",
  },
  Header: {
    backgroundColor: "#1e2a78",
  },
  opacity: {
    alignSelf: "center",
    marginLeft: 5,
  },
  contain: {
    flexDirection: "row",
    backgroundColor: "#5775a5",
    marginTop: 40,
    width: screenWidth - 100,
    height: 60,
    alignSelf: "center",
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 0.3,
    borderColor: "grey",
  },
  inputonblur: {
    width: screenWidth,
    height: 51,
    paddingLeft: 15,
    alignSelf: "center",
    color: "white",
  },
  fieldtitle: {
    color: "white",
    borderBottomWidth: 2,
    borderBottomColor: "red",
  },
  focused: {
    height: screenHeight / 2,
  },
  blurred: {
    height: screenHeight / 2,
  },
});

const items = [
  // this is the parent or 'item'
  {
    name: " Tags",
    id: 0,
    // these are the children or 'sub items'
    children: [
      {
        name: "Results",
        id: 10,
      },
      {
        name: "Strike",
        id: 17,
      },
      {
        name: "Rank",
        id: 13,
      },
      {
        name: "University",
        id: 14,
      },
      {
        name: "Engineering",
        id: 15,
      },
      {
        name: "Branch",
        id: 16,
      },
      {
        name: "Life",
        id: 18,
      },
      {
        name: "MEME",
        id: 196,
      },
      {
        name: "nammavtu",
        id: 1839,
      },
      {
        name: "VTU-Life",
        id: 18739,
      },
    ],
  },
];
