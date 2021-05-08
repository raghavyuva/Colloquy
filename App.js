import React, { useState, useEffect } from 'react'
import reducer, { DataLayer, initialState } from './Context/DataLayer'
import IndexNavigator from './Navigation/IndexNav'
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { View, } from "react-native";
import LottieView from 'lottie-react-native';
import NetInfo from '@react-native-community/netinfo';

import { DefaultTheme, DarkTheme, useTheme } from '@react-navigation/native';

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
      <View style={{ justifyContent: "center", flex: 1, backgroundColor: colors.background}}>
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
