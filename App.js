import React, { useState, useEffect, useRef } from 'react'
import reducer, { DataLayer, initialState } from './Context/DataLayer'
import IndexNavigator from './Navigation/IndexNav'
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { View, AppState } from "react-native";
import LottieView from 'lottie-react-native';
import NetInfo from '@react-native-community/netinfo';
// import io from 'socket.io-client';
import { DefaultTheme, DarkTheme, useTheme } from '@react-navigation/native';
import "@firebase/auth";
import "@firebase/firestore";
import { Config } from './config';
import { firebase } from './components/firebase'
import LoadingComp from './components/LoadingComp';
function App() {
  const [loading, setLoading] = useState(true);
  const [connected, setconnected] = useState(false);
  const { colors } = useTheme();
  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);
  useEffect(() => {
    AppState.addEventListener('change', _handleAppStateChange);
    // const socket = io(Config.url);
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
    return () => {
      AppState.removeEventListener('change', _handleAppStateChange);
    };
  }, [])
  const _handleAppStateChange = (nextAppState) => {
    if (
      appState.current.match(/inactive|background/) &&
      nextAppState === 'active'
    ) {
      console.log('App foreground!');
    }
    appState.current = nextAppState;
    setAppStateVisible(appState.current);
    console.log('AppState', appState.current);


  };
  if (loading) {
    return (
     <LoadingComp />
    );
  }
  if (connected == false) {
    return (
      <View style={{ justifyContent: "center", alignSelf: 'center', flex: 1, backgroundColor: colors.background }}>
        <LottieView
          loop={true}
          autoPlay={true}
          source={require('./animation/1408-network-lost.json')}
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
