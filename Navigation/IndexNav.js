import React, { useEffect, } from "react";
import {
    NavigationContainer,
} from '@react-navigation/native';
import { View, ToastAndroid } from "react-native";
import NetInfo from '@react-native-community/netinfo';
import Drawernav from "./Homenav";
import AuthNav from "./AuthNav";
import { DataLayerValue } from "../Context/DataLayer";
import * as SecureStore from 'expo-secure-store';
import LottieView from 'lottie-react-native';
import { AppearanceProvider, useColorScheme } from 'react-native-appearance';
import { DefaultTheme, DarkTheme, useTheme } from '@react-navigation/native';
const IndexNavigator = (props) => {
    const [{ userToken, isLoading, defdarktheme }, dispatch] = DataLayerValue();
    const scheme = useColorScheme();
    { /*const THEMEOF = {
        dark:true,
        colors:{
            primary:'#8348FF',
            background:"#071e3d",
            card:"#1f4287",
            text:"#21e6c1",
            border:"#278ea5",
            notification:"#BDBDBD",
        },
    };*/}
    const { colors } = useTheme();
    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener(state => {
            if (state.isConnected == false) {
                ToastAndroid.show("please connect to internet", ToastAndroid.LONG);
            }
        });
        console.log(scheme)
        dispatch({ type: 'THEME', data: true })
        SecureStore.getItemAsync('UserId').then(user => {
            SecureStore.getItemAsync('userToken').then((token) => {
                dispatch({ type: 'RETRIEVE_TOKEN', token: token, id: user });
            })
        })
        return () => {
            unsubscribe();
        }
    }, [])
    if (isLoading) {
        return (
            <View style={{ justifyContent: "center", flex: 1, backgroundColor: colors.background }}>
                <LottieView
                    loop={true}
                    autoPlay={true}
                    source={require('../animation/5328-loading-11.json')}
                    style={{ width: 400, height: 400 }}
                />
            </View>
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
