import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, ToastAndroid, Dimensions, StatusBar, TouchableOpacity, LogBox, Alert } from "react-native";
import { GiftedChat, Bubble, Send, SystemMessage, Actions, InputToolbar, MessageImage } from "react-native-gifted-chat";
const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
import { firebase } from '../components/firebase'
import 'firebase/auth';
import 'firebase/firestore';
require('firebase/storage');
import { useTheme } from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import { DataLayerValue } from '../Context/DataLayer';
import { MaterialIcons } from '@expo/vector-icons';
import Headingbar from '../components/Header';
import LoadingComp from '../components/LoadingComp';
import { Video, Audio } from 'expo-av';
import { BottomSheet } from 'react-native-btr';
import { CardItem, Right } from 'native-base';
import * as ImagePicker from "expo-image-picker";
import { Config } from '../config';
import * as MediaLibrary from 'expo-media-library';
import * as FileSystem from 'expo-file-system';
import UploadingComp from '../components/UploadingComp';
LogBox.ignoreLogs(['Animated.event now requires a second argument for options']);
LogBox.ignoreLogs(['Animated: `useNativeDriver` was not specified']);
import Image from 'react-native-image-progress';
import * as Progress from 'react-native-progress';

export function Chat(props) {
  const [imagePicked, setImagePicked] = useState(null);
  const [visible, setVisible] = useState();
  const [status, setstatus] = useState(null);
  const { anotheruser } = props.route.params;
  const [messages, setMessages] = useState([]);
  const { colors } = useTheme();
  const [AnOnline, setAnOnline] = useState(null);
  const [{ userToken, postData, searchactive, UserId, user, permstorage }, dispatch] = DataLayerValue();
  const [loading, setloading] = useState(true);
  const [filepresent, setfilepresent] = useState(false);
  const [imagetosendurl, setimagetosendurl] = useState(null);
  const [uploading, setuploading] = useState(null);
  const _toggleBottomNavigationView = () => {
    setVisible(!visible);
  };
  const renderMessageVideo = (props) => {
    const { currentMessage } = props;
    return (
      <View style={{ padding: 20 }}>
        <Video
          useNativeControls
          shouldPlay={true}
          source={{ uri: currentMessage.video }}
          style={{ width: screenWidth - 100, height: 300, }}
          accessibilityViewIsModal
        />
      </View>
    );
  };
  const ImagePickerComponent = async () => {
    if (permstorage == 'granted') {
      setstatus('granted')
    } else {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      console.log(status)
      if (status == 'granted') {
        dispatch({ type: 'STORAGEPERMISSION', data: 'granted' })
      } else {
        dispatch({ type: 'STORAGEPERMISSION', data: 'notgranted' })
      }
    }
  };

  useEffect(() => {
    let IsMounted = true;
    setloading(true);
    ImagePickerComponent();
    const DocIdgenerated = anotheruser._id > user.user._id ? user.user._id + "-" + anotheruser._id : anotheruser._id + "-" + user.user._id
    const messagesListener = firebase
      .firestore()
      .collection("chatrooms")
      .doc(DocIdgenerated)
      .collection("messages")
      .orderBy("createdAt", "desc")
      .onSnapshot((querySnapshot) => {
        const messages = querySnapshot.docs.map((doc) => {
          const firebaseData = doc.data();
          const data = {
            _id: doc.id,
            text: "",
            createdAt: new Date().getTime(),
            ...firebaseData,
          };
          if (!firebaseData.system) {
            data.user = {
              ...firebaseData.user,
              name: firebaseData.user.email,
            };
          }
          return data;
        });
        setMessages(messages);
        setloading(false);
      });
    return () => {
      messagesListener()
      IsMounted = false;
    };
  }, []);
  const _pickImagefromGallery = async () => {
    if (permstorage==='granted') {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        base64: true,
        allowsEditing: true,
      });
      setImagePicked(result.uri)
      setVisible(!visible);
      setfilepresent(true);
    } else {
      console.log("Camera Permission error");
      alert('need camera permission');
    }
  };
  const _pickImagefromCamera = async () => {
    if (permstorage==='granted') {
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        base64: true,
        allowsEditing: true,
      });
      setImagePicked(result.uri)
      setVisible(!visible)
      setfilepresent(true)
    } else {
      console.log("Camera Permission error");
      alert('need camera permission');
    }
  };
  const downloadFile = (item) => {
    Alert.alert(
      'Download Image',
      'Do you want to save image to gallery?,',
      [
        { text: 'Cancel' },
        {
          text: 'Download', onPress: () => {
            const uri = item.image;
            var randomstring = Math.random().toString(36).slice(-9);
            let fileUri = FileSystem.documentDirectory + `${randomstring}.jpg`;
            FileSystem.downloadAsync(uri, fileUri)
              .then(({ uri }) => {
                saveFile(uri);
                console.log(uri)
                ToastAndroid.show(" Image Downloaded !", ToastAndroid.LONG);
              })
              .catch(error => {
                console.error(error);
              })
          }
        }
      ]
    );
  }
  const saveFile = async (fileUri) => {
    const { status } = await MediaLibrary.getPermissionsAsync();
    if (status === "granted") {
      const asset = await MediaLibrary.createAssetAsync(fileUri)
      await MediaLibrary.createAlbumAsync("Primish", asset, false)
    } else {
      alert('provide permission');
    }
  }
  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            justifyContent: "space-around",
            backgroundColor: colors.card,
            borderColor: colors.primary,
            borderWidth: 0.3,

          },
          left: {
            borderColor: 'yellow',
            borderWidth: 0.3,
            backgroundColor: colors.card,
          }
        }}
        textStyle={{
          right: {
            color: colors.text,
          },
          left: {
            color: colors.text,

          }
        }}
        onLongPress={() => {
          // console.log(props.currentMessage.image)
          downloadFile(props.currentMessage)
        }}

      />
    );
  };



  const renderSend = (props) => {
    return (
      <Send {...props} containerStyle={{ borderColor: colors.card, borderWidth: 0 }} >
        <View style={{ marginRight: 10, marginBottom: 8 }}>
          <MaterialIcons name="send" size={28} color={colors.primary} />
        </View>
      </Send>
    );
  };
  const scrollToBottomComponent = () => {
    return (
      <View style={styles(colors).bottomComponentContainer}>
        <MaterialIcons name="arrow-downward" size={28} color={colors.primary} />
      </View>
    );
  };
  const renderSystemMessage = (props) => {
    return (
      <SystemMessage
        {...props}
        wrapperStyle={styles(colors).systemMessageWrapper}
        textStyle={styles(colors).systemMessageText}
      />
    );
  };




  const renderLoading = () => {
    return (
      <LoadingComp />
    );
  };





  const Notifyy = (val, sentby, sentto) => {
    // console.log(val, sentto)
    fetch("https://exp.host/--/api/v2/push/send",
      {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify({
          to: sentto.notifytoken,
          sound: 'default',
          vibrationPattern: [0, 250, 250, 250],
          lightColor: '#FF231F7C',
          body: `${val}`,
          title: `${sentby.username} sent you a message`
        })
      })
  }

  const uploadImage = async (messages) => {
    return new Promise(async (res, rej) => {
      setuploading(true);
      const response = await fetch(imagePicked);
      const blob = await response.blob();
      let upload = firebase.storage().ref(`images/${user.user.username}/${Date.now()}/chat`).put(blob)
      upload.on(
        "state_changed",
        snapshot => {
          // setImagePicked(uri);
        },
        err => {
          rej(err);
        },
        async () => {
          const url = await upload.snapshot.ref.getDownloadURL();
          res(url);
          // console.log(url)
          // setimagetosendurl(url);
          const giftedArray = messages[0];
          const SENDINGMESSAGE = {
            ...giftedArray,
            sentBy: user.user,
            sentTo: anotheruser,
            createdAt: new Date().getTime(),
            sent: true,
            received: AnOnline ? true : false,
            pending: false,
            image: url,
            // video:"https://www.youtube.com/watch?v=BsOmYpP4UDU",
            user: {
              name: user.user.username,
              avatar: user.user.userphoto,
              _id: user.user._id
            }
          }
          setMessages(previousMessages => GiftedChat.append(previousMessages, SENDINGMESSAGE))
          const DocIdgenerated = anotheruser._id > user.user._id ? user.user._id + "-" + anotheruser._id : anotheruser._id + "-" + user.user._id
          firebase
            .firestore()
            .collection("chatrooms").doc(DocIdgenerated).collection('messages').add({ ...SENDINGMESSAGE })
          await firebase.firestore()
            .collection('chatrooms')
            .doc(DocIdgenerated)
            .set(
              {
                latestMessage: {
                  text: giftedArray.text,
                  createdAt: new Date().getTime(),
                  user2: anotheruser,
                  sentBy: user.user,
                },
                UserType: {
                  sentBy: user.user._id,
                  sentTo: anotheruser._id,
                  SentUserDetails: user.user,
                  SentToUserDetails: anotheruser
                }
              },
              { merge: true }

            );
          let val = 'message';
          Notifyy(giftedArray.text, user.user, anotheruser)
          setfilepresent(false);
          setuploading(false);
        })
    })

  }


  const handleSend = async (messages) => {
    if (filepresent) {
      uploadImage(messages);
    } else {
      try {
        const giftedArray = messages[0];
        const SENDINGMESSAGE = {
          ...giftedArray,
          sentBy: user.user,
          sentTo: anotheruser,
          createdAt: new Date().getTime(),
          sent: true,
          received: AnOnline ? true : false,
          pending: false,
          // image: filepresent ? urlreturner : null,
          // video:"https://www.youtube.com/watch?v=BsOmYpP4UDU",
          user: {
            name: user.user.username,
            avatar: user.user.userphoto,
            _id: user.user._id
          }
        }
        setMessages(previousMessages => GiftedChat.append(previousMessages, SENDINGMESSAGE))
        const DocIdgenerated = anotheruser._id > user.user._id ? user.user._id + "-" + anotheruser._id : anotheruser._id + "-" + user.user._id
        firebase
          .firestore()
          .collection("chatrooms").doc(DocIdgenerated).collection('messages').add({ ...SENDINGMESSAGE })
        await firebase.firestore()
          .collection('chatrooms')
          .doc(DocIdgenerated)
          .set(
            {
              latestMessage: {
                text: giftedArray.text,
                createdAt: new Date().getTime(),
                user2: anotheruser,
                sentBy: user.user,
              },
              UserType: {
                sentBy: user.user._id,
                sentTo: anotheruser._id,
                SentUserDetails: user.user,
                SentToUserDetails: anotheruser
              }
            },
            { merge: true }

          );
        let val = 'message';
        Notifyy(giftedArray.text, user.user, anotheruser)
      } catch (error) {
        alert(error)
      }
    }


  };



  const CancelImage = () => {
    setfilepresent(false)
  }
  const renderActions = () => {

    return (

      <View style={{ flexDirection: 'row' }}>
        {
          filepresent == false ? (
            <TouchableOpacity onPress={_toggleBottomNavigationView} style={{ marginBottom: 5 }}>
              <MaterialIcons name="attach-file" size={34} color={colors.notification} />
            </TouchableOpacity>
          ) : (
            <>
              <TouchableOpacity style={{ marginBottom: 5 }}>
                <MaterialIcons name="file-present" size={34} color={colors.notification} />
              </TouchableOpacity>
              <TouchableOpacity onPress={CancelImage} style={{ marginBottom: 5 }}>
                <MaterialIcons name="cancel" size={14} color={colors.notification} />
              </TouchableOpacity>
            </>
          )
        }
        {/* {imagePicked == null ? (
          <Text></Text>
        ) : (
          <View>
            <Image source={{ uri: imagePicked }} style={{ width: 200, height: 20, }} />
          </View>
        )
        } */}
        <BottomSheet
          visible={visible}
          onBackButtonPress={_toggleBottomNavigationView}
          onBackdropPress={_toggleBottomNavigationView}

        >
          <View
            style={styles(colors).bottomNavigationView}>
            <Text style={{ padding: 20, fontSize: 25, color: colors.text, fontWeight: 'bold' }}>
              Select one
              </Text>
            <View style={{ flexDirection: 'row', }}>
              <TouchableOpacity onPress={_pickImagefromGallery} style={{ flexDirection: 'row', justifyContent: "center" }}>
                <MaterialIcons name="image" size={45} color={colors.primary} />
                <Text style={{ color: colors.text, alignSelf: "center" }}>Gallery</Text>
              </TouchableOpacity>
            </View>
            <View style={{ flexDirection: 'row', }}>
              <TouchableOpacity onPress={_pickImagefromCamera} style={{ flexDirection: 'row', justifyContent: "center" }}>
                <MaterialIcons name="camera" size={45} color={colors.primary} />
                <Text style={{ color: colors.text, alignSelf: "center" }}>Camera</Text>
              </TouchableOpacity>
            </View>
          </View>
        </BottomSheet>
      </View>
    );
  };




  // const Delete = (doci) => {
  //   console.log(doci)
  //   const DocIdgenerated = anotheruser._id > user.user._id ? user.user._id + "-" + anotheruser._id : anotheruser._id + "-" + user.user._id

  //   firebase.firestore().collection('chatrooms').doc(DocIdgenerated).collection('messages').doc('PPxqW0fPLFnIfS2oJxR2').delete().then((f) => {
  //     console.log(f);
  //   })

  // }


  const opencomp = (id) => {
    props.navigation.navigate('external', { screen: 'userpro', params: { thread: id } })
  }
  return (
    <View style={{ flex: 1 }}>
      <Headingbar {...props} user={anotheruser} isOnline={AnOnline} />
      <GiftedChat
        messages={messages}
        onSend={handleSend}
        user={{ _id: UserId }}
        renderBubble={renderBubble}
        renderSend={renderSend}
        scrollToBottomComponent={scrollToBottomComponent}
        renderLoading={renderLoading}
        renderSystemMessage={renderSystemMessage}
        placeholder="Type your message..."
        alwaysShowSend
        // renderMessageVideo={renderMessageVideo}
        scrollToBottom
        renderActions={renderActions}
        renderChatEmpty={renderLoading}
        // onLongPressAvatar={()=>opencomp(anotheruser._id)}
        onPressAvatar={() => opencomp(anotheruser._id)}
        renderInputToolbar={(props) => {
          return <InputToolbar {...props}
            containerStyle={{ backgroundColor: colors.card, height: 50, borderWidth: 0.5, borderTopColor: colors.card, marginLeft: 8, marginRight: 8 }}
            textInputStyle={{ color: colors.text }}
            primaryStyle={{ borderColor: colors.card }}
            accessoryStyle={{ borderColor: colors.card, borderWidth: 0 }}
          />
        }}
        renderChatFooter={() => {
          return (
            <>
              {uploading === true ? (
                <View style={{ flex: 0.1, backgroundColor: colors.background, }}>
                  <LottieView
                    loop={true}
                    autoPlay={true}
                    source={require('../animation/sending.json')}

                  />
                </View>
              ) : (
                <>
                </>
              )}
            </>
          )
        }}
      // renderMessageImage={(props) => {
      //   return (
      //     <Image
      //       source={{ uri: props.currentMessage.image }}
      //       indicator={Progress.Pie}
      //       indicatorProps={{
      //         size: 80,
      //         borderWidth: 0,
      //         color: colors.notification,
      //         unfilledColor: colors.primary
      //       }}
      //       style={{ width: 120, height: 120 }}
      //     >
      //     </Image>
      //   )
      // }}
      />
    </View>
  );
}

const styles = (colors) => StyleSheet.create({
  sendingContainer: {
    justifyContent: "center",
    alignItems: "center",

  },
  bottomComponentContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  systemMessageText: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: "100",
  },
  screen: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: colors.background,
    textAlign: 'center',
  },
  MainContainer: {
    flex: 1,
    margin: 2,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: Platform.OS === 'ios' ? 20 : 0,
    backgroundColor: colors.background,
  },
  bottomNavigationView: {
    backgroundColor: '#0E043B',
    width: '100%',
    height: 250,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15
  },
  logo: {
    fontSize: 24,
    textAlign: 'center',
    color: 'yellow',
  },
  card: {
    backgroundColor: '#0E043B',
    height: screenHeight
  },
  fieldtitle: {
    color: 'white',
  },
  fieldinput: {
    color: 'yellow',
    width: screenWidth - 60,
  },
  submission: {
    marginTop: 15,
    borderColor: null,
  },
  submit: {
    backgroundColor: '#5F7',
    borderRadius: 26,
    width: 170,
    justifyContent: 'center'
  },
  submittext: {
    color: 'black',
    textTransform: 'capitalize',
  },
  signup: -{
    color: 'red',
    fontSize: 20
  },
  fieldtitl: {
    color: '#FFF',
    borderColor: null,
  },
  video: {
    width: screenWidth - 100,
    height: 300,
  },
  bottomNavigationView: {
    backgroundColor: colors.card,
    width: '100%',
    height: 250,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15
  },
});