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
import WhoLiked from '../screens/WhoLiked';
import { useTheme } from '@react-navigation/native';
import ListOfChats from '../screens/ListOfChats';
import LoadingComp from '../components/LoadingComp';
import SlotSelection from '../screens/SlotSelection';
import AboutUs from '../screens/AboutUs';
import MockInterview from '../screens/Interview';
import NotesUpload from '../screens/NotesUpload';
import NotesRender from '../screens/NotesRender';
import StatusView from '../components/StatusView';
import Terms from '../screens/TermsAndCondition';
import { useSelector, useDispatch } from 'react-redux';
import { setUser } from '../redux/actions/UserAction';
import BottomComponent from '../screens/Updateprofile';

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
            <Stack.Screen name='interview' component={MockInterview} />
            <Stack.Screen name='slot' component={SlotSelection} />
            <Stack.Screen name='wholiked' component={WhoLiked} />
            <Stack.Screen name='aboutus' component={AboutUs} />
            <Stack.Screen name='terms' component={Terms} />
            <Stack.Screen name='rendernotes' component={NotesRender} />
            <Stack.Screen name='uploadNotes' component={NotesUpload} />
            <Stack.Screen name='editprofile' component={BottomComponent} />
        </Stack.Navigator>
    );
}

function HomeScreen() {
    const { colors } = useTheme();
    return (
        <Tab.Navigator
            initialRouteName="Home"
            activeColor={colors.text}
            shifting={false}
            barStyle={{ backgroundColor: colors.background }}
            // keyboardHidesNavigationBar
            sceneAnimationEnabled
        >
            <Tab.Screen
                name="Home" initialRouteName="Home"
                component={Home}
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
                        <MaterialCommunityIcons name="post-outline" size={24} color={color}  />
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

                    // tabBarBadge: '5'

                }}

            /> 
        </Tab.Navigator>
    );
}

function Drawernav() {
    const [load, setload] = useState(true);
    const user = useSelector((state) => state.userDetails);
    const dispatch = useDispatch();

    const fetching = async () => {
        try {
            await fetch(`${Config.url}` + `/user/${user.userId}`, {
                headers: {
                    'Authorization': 'Bearer ' + `${user.userToken}`,
                    'Content-Type': 'application/json'
                }
            })
                .then((response) => response.json())
                .then((responseJson) => {
                    dispatch(setUser(responseJson))
                })
        } catch (e) {
            console.log(e);
        }
    }
    useEffect(() => {
        fetching();
        return () => {
        }
    }, [])
    return (
        <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />} drawerPosition='left' drawerType='front'>
            <Drawer.Screen name="external" component={External} />
            <Drawer.Screen name="follower" component={Followers} />
            <Drawer.Screen name="following" component={Following} />
            <Drawer.Screen name="events" component={Events} />
            <Drawer.Screen name="segment" component={Privacy} />
            <Drawer.Screen name="feedback" component={Report} />
            <Drawer.Screen name="interview" component={MockInterview} />
            <Drawer.Screen name="aboutus" component={AboutUs} />
            <Drawer.Screen name="terms" component={Terms} />
        </Drawer.Navigator>
    );
}

export default Drawernav;