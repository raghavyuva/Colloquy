import React, { useEffect, useRef, useState } from "react";
import {
    NavigationContainer,
} from '@react-navigation/native';
import { View, ToastAndroid, AppState } from "react-native";
import NetInfo from '@react-native-community/netinfo';
import Drawernav from "./Homenav";
import AuthNav from "./AuthNav";
import { DataLayerValue } from "../Context/DataLayer";
import * as SecureStore from 'expo-secure-store';
import LottieView from 'lottie-react-native';
import { AppearanceProvider, useColorScheme } from 'react-native-appearance';
import { DefaultTheme, DarkTheme, useTheme } from '@react-navigation/native';
import LoadingComp from "../components/LoadingComp";
import { Config } from "../config";
import { MenuProvider } from 'react-native-popup-menu';

const IndexNavigator = (props) => {
    const [{ userToken, isLoading, defdarktheme }, dispatch] = DataLayerValue();
    const appState = useRef(AppState.currentState);
    const [appStateVisible, setAppStateVisible] = useState(appState.current);
    const scheme = useColorScheme();
    // const THEMEOF = {
    //     dark:true,
    //     colors:{
    //         primary:'green',
    //         background:"green",
    //         card:"green",
    //         text:"#21e6c1",
    //         border:"#278ea5",
    //         notification:"#BDBDBD",
    //     },
    // };
    const { colors } = useTheme();
    useEffect(() => {
        dispatch({ type: 'THEME', data: true })
        SecureStore.getItemAsync('UserId').then(user => {
            SecureStore.getItemAsync('userToken').then((token) => {
                dispatch({ type: 'RETRIEVE_TOKEN', token: token, id: user });
            })
        })

        AppState.addEventListener('change', _handleAppStateChange);
        return () => {
            AppState.removeEventListener('change', _handleAppStateChange);
        }
    }, [])

    const _handleAppStateChange = (nextAppState) => {
        if (
            appState.current.match(/inactive|background/) &&
            nextAppState === 'active'
        ) {
            // console.log('App foreground!');
        }
        appState.current = nextAppState;
        setAppStateVisible(appState.current);
        dispatch({ type: 'ONLINESTATUS', data: appState.current })
        // console.log('AppState', appState.current);
    };
    if (isLoading) {
        return (
            <LoadingComp />
        );
    }
    return (
        <AppearanceProvider>

            <NavigationContainer theme={defdarktheme === true ? DarkTheme : DefaultTheme}>
                {userToken !== null || undefined ? (
                        <Drawernav />

                ) : (
                    <AuthNav />
                )
                }
            </NavigationContainer>
        </AppearanceProvider>
    )
}
export default IndexNavigator;
