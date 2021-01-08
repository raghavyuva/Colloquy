import React, { useContext, useState, useEffect, } from "react";
import {
    NavigationContainer,
} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'
import { ActivityIndicator, View, ToastAndroid } from "react-native";
import NetInfo from '@react-native-community/netinfo';
import Drawernav from "./Homenav";
import AuthNav from "./AuthNav";
import { DataLayerValue } from "../Context/DataLayer";
import * as SecureStore from 'expo-secure-store';
import LottieView from 'lottie-react-native';

const IndexNavigator = (props) => {
    const [{ userToken, isLoading,  }, dispatch] = DataLayerValue();
    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener(state => {
            if (state.isConnected == false) {
                ToastAndroid.show("please connect to internet", ToastAndroid.LONG);
            }
        });
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
            <View style={{ justifyContent: "center", flex: 1 ,backgroundColor:'#0E043B' }}>
                <LottieView
                    loop={true}
                    autoPlay={true}
                    source={require('../animation/5328-loading-11.json')}
                    style={{width:400,height:400}}
                />
            </View>
        );
    }
    return (
        <NavigationContainer>
            {userToken !== null || undefined ? (
                <Drawernav />
            ) : (
                    <AuthNav />
                )
            }
        </NavigationContainer>
    )
}
export default IndexNavigator;
