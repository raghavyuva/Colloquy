import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
  Modal,
  Alert,
  Pressable,
  ToastAndroid
} from "react-native";
import Headingbar from "../components/Header";
import React, { useEffect, useState } from "react";
import { useTheme } from "@react-navigation/native";
import { Searchbar, List } from "react-native-paper";
import { MaterialIcons } from "@expo/vector-icons";
import { Config } from "../config";
import { useSelector, useDispatch } from "react-redux";
import { WebView } from "react-native-webview";
import LoadingComp from "../components/LoadingComp";
import * as MediaLibrary from "expo-media-library";
import * as FileSystem from "expo-file-system";
const TopPart = ({ item }) => {
  const [defaultRating, setDefaultRating] = useState(2);
  const [maxRating, setMaxRating] = useState([1, 2, 3, 4, 5]);
  const [modalVisible, setModalVisible] = useState(false);
  const starImageFilled =
    "https://raw.githubusercontent.com/AboutReact/sampleresource/master/star_filled.png";
  const starImageCorner =
    "https://raw.githubusercontent.com/AboutReact/sampleresource/master/star_corner.png";
  const CustomRatingBar = () => {
    return (
      <View style={styles.customRatingBarStyle}>
        {maxRating.map((item, key) => {
          return (
            <TouchableOpacity
              activeOpacity={0.7}
              key={item}
              onPress={() => setDefaultRating(item)}
            >
              <Image
                style={styles.starImageStyle}
                source={
                  item <= defaultRating
                    ? { uri: starImageFilled }
                    : { uri: starImageCorner }
                }
              />
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  const { colors } = useTheme();
  const downloadFile = (item) => {
    Alert.alert("Download Post", "Do you want to download this post?,", [
      { text: "Cancel" },
      {
        text: "YES",
        onPress: () => {
          const uri = item.Url;
          var randomstring = Math.random().toString(36).slice(-9);
          let fileUri =
            FileSystem.documentDirectory +
            `${item.postedBy.username + randomstring}.${item.type}`;
          FileSystem.downloadAsync(uri, fileUri)
            .then(({ uri }) => {
              saveFile(uri);
              ToastAndroid.show("Post Image Downloaded !", ToastAndroid.LONG);
            })
            .catch((error) => {
              console.error(error);
            });
        },
      },
    ]);
  };
  const saveFile = async (fileUri) => {
    const { status } = await MediaLibrary.requestPermissionsAsync();
    if (status === "granted") {
      const asset = await MediaLibrary.createAssetAsync(fileUri);
      await MediaLibrary.createAlbumAsync("Primish", asset, false);
    } else {
      alert("provide permission");
    }
  };
  return (
    <View
      style={{
        flexDirection: "row",
      }}
    >
      <Image
        style={{
          width: 100,
          height: 100,
          borderRadius: 10,
          marginLeft: 5,
        }}
        source={{
          uri: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.adazing.com%2Fwp-content%2Fuploads%2F2019%2F02%2Fstacked-book-clipart-07.png&f=1&nofb=1",
        }}
      />
      <View
        style={{
          flexDirection: "column",
        }}
      >
        <Text
          style={{
            fontSize: 16,
            color: colors.text,
            fontWeight: "bold",
            marginLeft: 5,
          }}
        >
          {item.title}
        </Text>
        <Text
          style={{
            fontSize: 18,
            color: "darkgrey",
            marginLeft: 5,
          }}
        >
          by {item.postedBy.username}
        </Text>
        <View
          style={{
            flexDirection: "row",
          }}
        >
          <View
            style={{
              marginLeft: 5,
              borderColor: colors.border,
              marginTop: 5,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontSize: 18,
                color: colors.primary,
                marginLeft: 5,
                textAlign: "center",
              }}
              numberOfLines={1}
            >
              {item.type?.includes("pdf") ? "pdf" : "word"}
            </Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            marginTop: 15,
            marginLeft: 5,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              marginRight: 15,
            }}
          >
            <TouchableOpacity
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <MaterialIcons name="star" color={colors.primary} size={26} />
              <Text
                style={{
                  color: colors.text,
                  marginLeft: 2,
                  fontWeight: "500",
                }}
              >
                8.2
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View
        style={{
          position: "absolute",
          right: 0,
          bottom: 0,
        }}
      >
        <TouchableOpacity onPress={()=>downloadFile(item)}>
        <MaterialIcons name="save" color={colors.primary} size={26} />
        </TouchableOpacity>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Rate this Notes</Text>
            <CustomRatingBar />
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>Submit</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};
const NotesRender = (props) => {
  const { colors } = useTheme();
  const [Notes, setNotes] = useState(null);
  const [open, setopen] = useState(null);
  const user = useSelector((state) => state.userDetails);
  const [loading, setloading] = useState(true);
  const [reading, setreading] = useState(false);
  const fetching = () => {
    setloading(true);
    fetch(`${Config.url}` + `/get_notes`, {
      headers: {
        Authorization: "Bearer " + `${user.userToken}`,
      },
      method: "GET",
    })
      .then((response) => response.json())
      .then((responseJson) => {
        setNotes(responseJson);
        setloading(false);
      });
  };

  useEffect(() => {
    fetching();
    return () => {};
  }, []);

  const NotesCard = (item) => (
    <View
      style={{
        backgroundColor: colors.card,
        margin: 10,
        justifyContent: "center",
        shadowColor: "fff",
        shadowOffset: {
          width: 0,
          height: 6,
        },
        shadowOpacity: 0.39,
        shadowRadius: 8.3,
        elevation: 13,
        padding: 10,
      }}
    >
      <View
        style={{
          position: "absolute",
          right: 10,
          top: 10,
        }}
      >
        <View
          style={{
            borderColor: colors.border,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: 18,
              color: colors.primary,
              marginLeft: 5,
              textAlign: "center",
            }}
          >
            {item.branch}
          </Text>
        </View>
      </View>
      <TopPart item={item} />
    </View>
  );

  if (loading) {
    return <LoadingComp />;
  }

  if (reading) {
    return (
      <WebView
        onShouldStartLoadWithRequest={false}
        onNavigationStateChange={false}
        source={{
          uri: "https://reactnativemaster.com/wp-content/uploads/2020/02/React-native-document-viewer-pdf-sample.pdf",
        }}
      />
    );
  }
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.background,
      }}
    >
      <Headingbar {...props} />
      <View style={{ margin: 15 }}>
        <Searchbar
          style={{ backgroundColor: colors.card, color: colors.text }}
          iconColor="grey"
          inputStyle={{ color: colors.text }}
          placeholder="Search Notes"
          placeholderTextColor="grey"
          // onIconPress={search}
          // onChangeText={search}
        />
      </View>
      <FlatList
        data={Notes}
        renderItem={({ item, index }) => {
          return <>{NotesCard(item)}</>;
        }}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

export default NotesRender;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 0,
    alignItems: "center",
  },
  button: {
    borderRadius: 0,
    padding: 10,
    marginTop: 5,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 5,
    textAlign: "center",
  },

  customRatingBarStyle: {
    justifyContent: "center",
    flexDirection: "row",
    marginTop: 0,
  },
  starImageStyle: {
    width: 40,
    height: 40,
    resizeMode: "cover",
  },
});
const typeofnote = [
  {
    type: "pdf",
  },
  {
    type: "word",
  },
  {
    type: "xlsx",
  },
  {
    type: "pptx",
  },
];
