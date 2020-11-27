import React, { useContext, useState, useEffect } from "react";
import {
    NavigationContainer,
    DefaultTheme as NavigationDefaultTheme,
    DarkTheme as NavigationDarkTheme
} from '@react-navigation/native'; import { createStackNavigator } from '@react-navigation/stack'
import { AsyncStorage, ActivityIndicator, View } from "react-native";
import { AuthContext } from '../Auth/AuthContext';
import AuthContainer from "./AuthContainer";
import Drawernav from "./Navigation";
import { MenuProvider } from "react-native-popup-menu";
import { URL } from "../config";
const Stack = createStackNavigator()
const IndexNavigator = () => {
    const [isDarkTheme, setIsDarkTheme] = React.useState(false);
    const initialLoginState = {
        isLoading: true,
        userName: null,
        userToken: null,
        Data: null,
    };
    const loginReducer = (prevState, action) => {
        switch (action.type) {
            case 'RETRIEVE_TOKEN':
                return {
                    ...prevState,
                    userToken: action.token,
                    isLoading: false,
                };
            case 'LOGIN':
                return {
                    ...prevState,
                    userName: action.id,
                    userToken: action.token,
                    isLoading: false,
                };
            case 'LOGOUT':
                return {
                    ...prevState,
                    userName: null,
                    userToken: null,
                    isLoading: false,
                };
            case 'REGISTER':
                return {
                    ...prevState,
                    userName: action.id,
                    userToken: action.token,
                    isLoading: false,
                };
            case 'PROFILE': return {
                ...prevState,
                userName: action.id,
                userToken: action.token,
                isLoading: false,
                Data: action.data
            }
        }

    };
    const [loginState, dispatch] = React.useReducer(loginReducer, initialLoginState);
    const authContext = React.useMemo(() => ({
        signIn: async (foundUser) => {
            const userToken = foundUser.token;
            const userName = foundUser.user._id;
            try {
                await AsyncStorage.setItem('userToken', userToken,);
                await AsyncStorage.setItem('userName', userName,)
            } catch (e) {
                console.log(e);
            }
            dispatch({ type: 'LOGIN', id: userName, token: userToken });
        },
        signOut: async () => {
            try {
                await AsyncStorage.removeItem('userToken');
                await AsyncStorage.removeItem('userName', userName,)
            } catch (e) {
                console.log(e);
            }
            dispatch({ type: 'LOGOUT' });
        },
        signUp: async (foundUser) => {
            const userToken = foundUser.token;
            const userName = foundUser.user._id;
            try {
                await AsyncStorage.setItem('userToken', userToken,);
                await AsyncStorage.setItem('userName', userName,)
            } catch (e) {
                console.log(e);
            }
            dispatch({ type: 'REGISTER', id: userName, token: userToken });
        },
        toggleTheme: () => {
            setIsDarkTheme(isDarkTheme => !isDarkTheme);
        },
        Profile: async () => {
            try {
                await AsyncStorage.getItem('userToken', userToken,);
                await AsyncStorage.getItem('userName', userName,)
                const Listener = fetch(`${URL.url}` + `/user/${userName}`, {
                    headers: {
                        'Authorization': 'Bearer ' + `${userToken}`,
                    }
                })
                    .then((response) => response.json())
                    .then((responseJson) => {
                        dispatch({ type: 'PROFILE', id: userName, token: userToken, data: responseJson });
                    })
            } catch (e) {
                console.log(e);
            }

        }

    }), []);
    useEffect(() => {
        setTimeout(async () => { 
            let userToken;
            let usrid;
            userToken = null; 
            try {
                userToken = await AsyncStorage.getItem('userToken');
                usrid = await AsyncStorage.getItem('userName');
              //console.log(usrid);
              //console.log(userToken) 
            } catch (e) {
                console.log(e);
            }  
            dispatch({ type: 'RETRIEVE_TOKEN', token: userToken });
        }, 1000); 
    }, []);

    if (loginState.isLoading) {
        return (
            <View style={{ justifyContent: "center", alignSelf: 'center', flex: 1 }}>
                <ActivityIndicator size={50} color='red' />
            </View>
        );
    } else {
        return (
            <AuthContext.Provider value={authContext}>
                <NavigationContainer>
                    {loginState.userToken !== null ? (
                        <MenuProvider>
                            <Drawernav />
                        </MenuProvider>

                    ) : (
                            <AuthContainer />
                        )}
                </NavigationContainer>
            </AuthContext.Provider>

        )
    }
}
export default IndexNavigator;