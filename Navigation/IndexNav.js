import React, { useEffect, useRef, useState } from "react";
import {
    NavigationContainer,
} from '@react-navigation/native';
import { AppState } from "react-native";
import Drawernav from "./Homenav";
import AuthNav from "./AuthNav";
import { DataLayerValue } from "../Context/DataLayer";
import * as SecureStore from 'expo-secure-store';
import { AppearanceProvider, useColorScheme } from 'react-native-appearance';
import { DefaultTheme, DarkTheme, useTheme } from '@react-navigation/native';
import LoadingComp from "../components/LoadingComp";

const IndexNavigator = (props) => {
    const [{ userToken, isLoading, }, dispatch] = DataLayerValue();
    const appState = useRef(AppState.currentState);
    const [appStateVisible, setAppStateVisible] = useState(appState.current);
    const scheme = useColorScheme();
    const defdarktheme = true
    const { colors } = useTheme();
    useEffect(() => {
        dispatch({ type: 'THEME', data: true })
        SecureStore.getItemAsync('UserId').then(user => {
            SecureStore.getItemAsync('userToken').then((token) => {
                dispatch({ type: 'RETRIEVE_TOKEN', token: token, id: user });
            })
        })
        return () => {
        }
    }, [])
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