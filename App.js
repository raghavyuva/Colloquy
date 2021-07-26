import React, { useState, useEffect, useRef } from 'react'
import reducer, { DataLayer, DataLayerValue, initialState } from './Context/DataLayer'
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
import { Provider } from 'react-redux';
import store from './redux/Store';
 
function App() {
  const [loading, setLoading] = useState(true);
  const [connected, setconnected] = useState(null);
  useEffect(() => {

    return () => {
    };
  }, [])
  return (
    <Provider store={store}>
        <IndexNavigator />
    </Provider>
  )
}

export default App;
