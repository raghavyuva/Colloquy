import React, { useEffect, useState } from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { View, } from 'native-base';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { FontAwesome5, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import Profile from '../screens/Profile';
import Uploadpost from '../screens/Uploadpost';
import Privacy from '../screens/Privacy';
import Followers from '../screens/Followers';
import Following from '../screens/Following';
import UserProfile from '../screens/UserProfile';
import PostfullView from '../screens/PostfullView';
import Events from '../screens/Events';
import Home from '../screens/Home';
import Subscription from '../screens/Subscription';
import Report from '../screens/Report';
import Notification from '../screens/Notification';
import { DrawerContent } from '../screens/DrawerContentScreen';
import { Chat } from '../screens/Chat';
import { Config } from '../config';
import { DataLayerValue } from '../Context/DataLayer';
import LottieView from 'lottie-react-native';
import Notes from '../screens/Notes';
import WhoLiked from '../screens/WhoLiked';
import { DefaultTheme, DarkTheme, useTheme } from '@react-navigation/native';
import ListOfChats from '../screens/ListOfChats';
import LoadingComp from '../components/LoadingComp';
const Tab = createMaterialBottomTabNavigator();
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
function External() {
    return (
        <Stack.Navigator headerMode={false}>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="profile" component={Profile} />
            <Stack.Screen name="feedback" component={Report} />
            <Stack.Screen name="segment" component={Privacy} />
            <Stack.Screen name="follower" component={Followers} />
            <Stack.Screen name="following" component={Following} />
            <Stack.Screen name="userpro" component={UserProfile} />
            <Stack.Screen name="view" component={PostfullView} />
            <Stack.Screen name="events" component={Events} />
            <Stack.Screen name='message' component={Chat} />
            <Stack.Screen name='notes' component={Notes} />
            <Stack.Screen name='wholiked' component={WhoLiked} />
        </Stack.Navigator>
    );
}

function HomeScreen() {
    const { colors } = useTheme();
    const [{ userToken, isLoading, UserId, refreshhome }, dispatch] = DataLayerValue();
    return (
        <Tab.Navigator
            initialRouteName="Home"
            activeColor={colors.text}
            shifting={false}
            barStyle={{ backgroundColor: colors.background }}
        >
            <Tab.Screen
                name="Home" initialRouteName="Home"
                component={Home}
                listeners={{
                    tabPress: () => {
                        dispatch({ type: "REFRESH", data: true })
                        fetch(`${Config.url}` + `/post`, {
                            headers: {
                                'Authorization': 'Bearer ' + `${userToken}`,
                            },
                            method: 'GET'
                        })
                            .then((response) => response.json())
                            .then((responseJson) => {
                                dispatch({
                                    type: "POSTDATA",
                                    postData: responseJson
                                })
                                dispatch({ type: "REFRESH", data: false })
                            })
                    }
                }
                }
                options={{
                    tabBarLabel: 'Home',
                    tabBarColor: Config.secondary,

                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="pentagon-outline" color={color} size={26} />
                    ),

                }

                }


            />
            <Tab.Screen
                name="subscribed"
                component={Subscription}
                options={{
                    tabBarLabel: 'subscribed',
                    tabBarColor: 'red',
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="post-outline" size={24} color={color} />
                    ),
                }}
            />
            <Tab.Screen
                name="addblog"
                component={Uploadpost}
                options={{
                    tabBarLabel: 'New post',
                    tabBarColor: 'green',
                    tabBarIcon: ({ color }) => (
                        <MaterialIcons name="post-add" size={24} color={color} />
                    ),
                }}
            />
            <Tab.Screen
                name="write"
                component={Notification}
                options={{
                    tabBarLabel: 'Notification',
                    tabBarColor: '#F99124',
                    tabBarIcon: ({ color }) => (
                        <MaterialIcons name="notifications" size={24} color={color} />
                    ),
                }}
            />
            <Tab.Screen
                name="chat"
                component={ListOfChats}
                options={{
                    tabBarLabel: 'chat',
                    tabBarColor: '#F99124',
                    tabBarIcon: ({ color }) => (
                        <MaterialIcons name="message" size={26} color={color} />
                    ),

                    tabBarBadge: '5'

                }}

            />
        </Tab.Navigator>
    );
}

function Drawernav() {
    const [load, setload] = useState(true);
    const [{ userToken, isLoading, UserId }, dispatch] = DataLayerValue();
    const { colors } = useTheme();

    const fetching = async () => {
        try {
            await fetch(`${Config.url}` + `/user/${UserId}`, {
                headers: {
                    'Authorization': 'Bearer ' + `${userToken}`,
                    'Content-Type': 'application/json'
                }
            })
                .then((response) => response.json())
                .then((responseJson) => {
                    dispatch({
                        type: "USERPROFILE",
                        data: responseJson
                    })
                    setload(false)
                })
        } catch (e) {
            console.log(e);
        }
    }
    useEffect(() => {
        fetching()
    }, [])
    if (load) {
        return (
            <LoadingComp />
        );
    }
    return (
        <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />} drawerPosition='left' drawerType='front'>
            <Drawer.Screen name="external" component={External} />
            <Drawer.Screen name="follower" component={Followers} />
            <Drawer.Screen name="following" component={Following} />
            <Drawer.Screen name="events" component={Events} />
            <Drawer.Screen name="segment" component={Privacy} />
            <Drawer.Screen name="feedback" component={Report} />
            <Drawer.Screen name="notes" component={Notes} />
        </Drawer.Navigator>
    );
}

export default Drawernav;