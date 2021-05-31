import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, Image, ActivityIndicator, Dimensions, StatusBar } from "react-native";
import { GiftedChat, Bubble, Send, SystemMessage, Actions, InputToolbar } from "react-native-gifted-chat";
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
export function Chat(props) {


  const { anotheruser } = props.route.params;
  const [messages, setMessages] = useState([]);
  const { colors } = useTheme();

  const [{ userToken, postData, searchactive, UserId, user }, dispatch] = DataLayerValue();
  const [loading, setloading] = useState(true)
  useEffect(() => {
    setloading(true);
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
    return () => messagesListener();
  }, []);

  const renderBubble = (props) => {
    console.log(props)
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
        // onLongPress={() => Delete(props.currentMessage)}
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



  const handleSend = async (messages) => {
    try {
      const giftedArray = messages[0];
      const SENDINGMESSAGE = {
        ...giftedArray,
        sentBy: user.user,
        sentTo: anotheruser,
        createdAt: new Date().getTime(),
        sent: true,
        received: true,
        pending: false,
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
    } catch (error) {
      alert(error)
    }
  };







  // const Delete = (doci) => {
  //   console.log(doci)
  //   const DocIdgenerated = anotheruser._id > user.user._id ? user.user._id + "-" + anotheruser._id : anotheruser._id + "-" + user.user._id

  //   firebase.firestore().collection('chatrooms').doc(DocIdgenerated).collection('messages').doc('PPxqW0fPLFnIfS2oJxR2').delete().then((f) => {
  //     console.log(f);
  //   })

  // }
  return (
    <View style={{ flex: 1 }}>


      <Headingbar {...props} user={anotheruser} />

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
        scrollToBottom
        renderChatEmpty={renderLoading}
        renderInputToolbar={(props) => {
          return <InputToolbar {...props}
            containerStyle={{ backgroundColor: colors.card, height: 50, borderWidth: 0.5, borderTopColor: colors.card, marginLeft: 8, marginRight: 8 }}
            textInputStyle={{ color: colors.text }}
            primaryStyle={{ borderColor: colors.card }}
            accessoryStyle={{ borderColor: colors.card, borderWidth: 0 }}
          />
        }}

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
  }
});