import React, { useState, useEffect } from 'react'
import reducer, { DataLayer, initialState } from './Context/DataLayer'
import IndexNavigator from './Navigation/IndexNav'
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { View, } from "react-native";
import LottieView from 'lottie-react-native';
import NetInfo from '@react-native-community/netinfo';

import { DefaultTheme, DarkTheme, useTheme } from '@react-navigation/native';
import * as firebase from "firebase";
import "@firebase/auth";
import "@firebase/firestore";

var firebaseConfig = {
    apiKey: "AIzaSyChJ0ge-LvPuLpoN7KCNqTE7g7XSL2jJKY",
    authDomain: "vtyuva-dd9cb.firebaseapp.com",
    projectId: "vtyuva-dd9cb",
    storageBucket: "vtyuva-dd9cb.appspot.com",
    messagingSenderId: "742298040786",
    appId: "1:742298040786:web:88378266062e3820ec700b",
    measurementId: "G-JGEPSPEM8W"
  };

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

function App() {
  const [loading, setLoading] = useState(true);
  const [connected, setconnected] = useState(false);
  const {colors} = useTheme();

  useEffect(() => {
    Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
      ...Ionicons.font,
    });
    setTimeout(() => {
      setLoading(false)
    }, 3000);
    const unsubscribe = NetInfo.addEventListener(state => {
      setconnected(state.isConnected);
    });
  }, [])
  if (loading) {
    return (
      <View style={{ justifyContent: "center", flex: 1, backgroundColor: 'black'}}>
        <LottieView
          loop={true}
          autoPlay={true}
          source={require('./animation/5328-loading-11.json')}
          style={{ width: 400, height: 400 }}
        />
      </View>
    );
  }
  if (connected == false) {
    return (
      <View style={{ justifyContent: "center", alignSelf: 'center', flex: 1, backgroundColor: colors.background }}>
        <LottieView
          loop={true}
          autoPlay={true}
          source={require('./animation/1408-network-lost.json')}
          style={{ width: 400, height: 400 }}
        />
      </View>
    )
  }
  return (
    <DataLayer initialState={initialState} reducer={reducer}>
      <IndexNavigator />
    </DataLayer>
  )
}

export default App
