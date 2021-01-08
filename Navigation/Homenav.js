import React, { Component, useEffect, useState } from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, View, ListItem, Right, Radio, List, Title, ActionSheet, Item, Input } from 'native-base';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { FontAwesome5, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import Profile from '../screens/Profile';
import EditProfile from '../screens/EditProfile';
import UploadPoll from '../screens/UploadPoll';
import Uploadpost from '../screens/Uploadpost';
import Room from '../screens/Room';
import Privacy from '../screens/Privacy';
import Poll from '../screens/Poll';
import Followers from '../screens/Followers';
import Following from '../screens/Following';
import UserProfile from '../screens/UserProfile';
import PostfullView from '../screens/PostfullView';
import Events from '../screens/Events';
import Home from '../screens/Home';
import Subscription from '../screens/Subscription';
import Report from '../screens/Report';
import Notification from '../screens/Notification';
import Explore from '../screens/Explore';
import { DrawerContent } from '../screens/DrawerContentScreen';
import { Chat } from '../screens/Chat';
import { Config } from '../config';
import { DataLayerValue } from '../Context/DataLayer';
import LottieView from 'lottie-react-native';
import Notes from '../screens/Notes';
import Pdf from '../components/Pdf';

const Tab = createMaterialBottomTabNavigator();
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
function External() {
    return (
        <Stack.Navigator headerMode={false}>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="profile" component={Profile} />
            <Stack.Screen name="edit" component={EditProfile} />
            <Stack.Screen name="polladd" component={UploadPoll} />
            <Stack.Screen name="feedback" component={Report} />
            <Stack.Screen name="classroom" component={Room} />
            <Stack.Screen name="segment" component={Privacy} />
            <Stack.Screen name="poll" component={Poll} />
            <Stack.Screen name="follower" component={Followers} />
            <Stack.Screen name="following" component={Following} />
            <Stack.Screen name="userpro" component={UserProfile} />
            <Stack.Screen name="view" component={PostfullView} />
            <Stack.Screen name="events" component={Events} />
            <Stack.Screen name='chat' component={Chat} />
            <Stack.Screen name='notes' component={Notes} />

        </Stack.Navigator>
    );
}

function HomeScreen() {
    return (
        <Tab.Navigator
            initialRouteName="Home"
            activeColor="yellow"
            shifting={false}
            barStyle={{ backgroundColor: '#0E043B' }}
        >
            <Tab.Screen
                name="Home" initialRouteName="Home"
                component={Home}
                options={{
                    tabBarLabel: 'Home',
                    tabBarColor: '#0E043B',
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="pentagon-outline" color={color} size={26} />
                    ),
                }}
            />
            <Tab.Screen
                name="Feed"
                component={Subscription}
                options={{
                    tabBarLabel: 'Feed',
                    tabBarColor: 'red',
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="menu" color={color} size={26} />
                    ),
                }}
            />
            <Tab.Screen
                name="addblog"
                component={Uploadpost}
                options={{
                    tabBarLabel: 'post',
                    tabBarColor: 'green',
                    tabBarIcon: ({ color }) => (
                        <MaterialIcons name="add-circle" size={26} color={color} />
                    ),
                }}
            />
            <Tab.Screen
                name="write"
                component={Notification}
                options={{
                    tabBarLabel: 'bell',
                    tabBarColor: '#F99124',
                    tabBarIcon: ({ color }) => (
                        <FontAwesome5 name="bell" color={color} size={26} />
                    ),
                }}
            />
            <Tab.Screen
                name="explore"
                component={Explore}
                options={{
                    tabBarLabel: 'Explore',
                    tabBarColor: 'purple',
                    tabBarIcon: ({ color }) => (
                        <MaterialIcons name="explore" size={24} color={color} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
}

function Drawernav() {
    const [load, setload] = useState(true);
    const [{ userToken, isLoading, UserId }, dispatch] = DataLayerValue();

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
        setTimeout(() => {
            setload(false)
        }, 2000);
    }, [])
    if (load) {
        return (
            <View style={{ justifyContent: "center", flex: 1, backgroundColor: '#0E043B' }}>
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
        <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />} drawerPosition='left' drawerType='front'>
            <Drawer.Screen name="external" component={External} />
            <Drawer.Screen name="follower" component={Followers} />
            <Drawer.Screen name="following" component={Following} />
            <Drawer.Screen name="poll" component={Poll} />
            <Drawer.Screen name="events" component={Events} />
            <Drawer.Screen name="segment" component={Privacy} />
            <Drawer.Screen name="feedback" component={Report} />
            <Drawer.Screen name="notes" component={Notes} />

        </Drawer.Navigator>
    );
}

export default Drawernav;