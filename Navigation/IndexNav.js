import React, { useEffect, useState } from "react";
import {
    NavigationContainer,
} from '@react-navigation/native';
import Drawernav from "./Homenav";
import AuthNav from "./AuthNav";
import * as SecureStore from 'expo-secure-store';
import { AppearanceProvider } from 'react-native-appearance';
import { DefaultTheme, DarkTheme, } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { setUserId, setUserToken } from "../redux/actions/UserAction";
import LoadingComp from "../components/LoadingComp";
import { changeTheme, setCurrentTheme } from "../redux/actions/ThemeAction";

const IndexNavigator = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.userDetails);
    const load = useSelector((state) => state.loadingDetails.loading);
    let themename = useSelector(state => state.theme.name)
    let currenttheme = useSelector(state => state.theme.currentTheme)
    const [LOADING, setLOADING] = useState(true);
    useEffect(() => {
        setTimeout(() => {
            SecureStore.getItemAsync('UserId').then(user => {
                SecureStore.getItemAsync('userToken').then((token) => {
                    SecureStore.getItemAsync('themeid').then(id => {
                        dispatch(setUserId(user));
                        dispatch(setUserToken(token));
                        if (id != null && id != undefined) {
                            dispatch(setCurrentTheme(THEME[id - 1].theme))
                        }
                        setLOADING(false)
                    })
                })
            })
        }, 3000);
        return () => {
        }
    }, [])
    if (LOADING) {
        return (
            <LoadingComp />
        )
    }
    return (
        <AppearanceProvider>
            <NavigationContainer

                theme={currenttheme == null ? DefaultTheme : currenttheme}

            >
                {user.userToken !== null || user.userToken != undefined ? (
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


const THEME = [
    {
        id: 1,
        color: 'blue',
        name: `Toads Turnpike`,
        theme: {
            dark: true,
            colors: {
                primary: '#ffd700',
                background: "#022c43",
                card: "#053f5e",
                text: "#fff",
                border: "#278ea5",
                notification: "#BDBDBD",
            },
        },
    },
    {
        id: 2,
        name: 'Choco Dark',
        color: '#55423d',
        theme: {
            dark: true,
            colors: {
                primary: '#ffc0ad',
                background: "#55423d",
                card: "#55423d",
                text: "#fffffe",
                border: "#278ea5",
                notification: "#BDBDBD",
            },
        }
    },
    {
        id: 3,
        name: 'Emarald-green',
        color: '#004643',
        theme: {
            dark: true,
            colors: {
                primary: '#f9bc60',
                background: "#004643",
                card: "#004643",
                text: "#fff",
                border: "#278ea5",
                notification: "#BDBDBD",
            },
        }
    },
    {
        id: 4,
        color: 'black',
        name: 'raven black',
        theme: {
            dark: true,
            colors: {
                primary: 'rgb(10,132,255)',
                background: 'rgb(1,1,1)',
                border: 'rgb(39,39,41)',
                card: 'rgb(18,18,18)',
                notification: 'rgb(255,69,58)',
                text: 'rgb(229,229,231)'
            }
        }
    },
    {
        id: 5,
        color: '#fef6e4',
        name: 'Mo-Mo Farm',
        theme: {
            dark: false,
            colors: {
                primary: '#f582ae',
                background: '#fef6e4',
                border: '#8bd3dd',
                card: '#fef6e4',
                notification: '#f582ae',
                text: '#001858'
            }
        }
    },
    {
        id: 6,
        color: '#fec7d7',
        name: 'rose Pink',
        theme: {
            dark: false,
            colors: {
                primary: '#0e172c',
                background: '#fec7d7',
                border: '#8bd3dd',
                card: '#fec7d7',
                notification: '#f582ae',
                text: '#001858'
            }
        }
    },

]