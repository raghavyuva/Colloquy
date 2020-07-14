import React, { Component } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, AsyncStorage, Dimensions } from 'react-native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer, DarkTheme, DefaultTheme } from '@react-navigation/native';
import Welcomepage from './Components/Rootstack/Welcomecomponent';
import Signpage from './Components/Rootstack/Signincomponent';
import Signuppage from './Components/Rootstack/SignupComponent';
import Whoyouare from './Components/Rootstack/selectfacstu';
import homescreen from './Components/Homestack/homescreen';
import ChatTab from './Components/Homestack/chatscreen';
import Blogpage from './Components/Rootstack/feedscreen';
import Settings from './Components/Homestack/settings';
import notifications from './Components/Homestack/Notification';
import profile from './Components/Homestack/profile';
import { Root, Spinner } from "native-base";
import Headingbar from './Components/common/Header';
import Upcoming_events from './Components/common/upcomingevents';
import Upcoming_events_copy from './Components/common/Upcomingeventscopy';
import Notescomponent from './Components/common/notescomponentcopy';
import Notesshared from './Components/Homestack/Notescomponent';
import Downloadpage from './Components/Homestack/downloads';
//import { Router, Scene } from 'react-native-router-flux';
import { DrawerContent } from './Components/Rootstack/Drawercontentscreen';
import Follower from './Components/common/Followers';
import Following from './Components/common/following';
import Privacy from './Components/common/privacy';
import Addblog from './Components/Homestack/Addblog';
import Terms from './Components/common/Termscondition';
import Class from './Components/Homestack/Classroom';
import Polling from './Components/common/Polling';
import Privacytermsegment from './Components/common/Privacyterm';
import Feedback from './Components/common/Feedback';
import Chatui from './Components/common/Chatui';
import Edition from './Components/common/Editprofile';
import Addpoll from './Components/Homestack/Addpoll';
import { MenuProvider } from 'react-native-popup-menu';
import Development from './Components/common/development';
import { AppearanceProvider, useColorScheme } from 'react-native-appearance';
import { Ionicons, FontAwesome5, MaterialCommunityIcons, Feather, SimpleLineIcons, Octicons, Fontisto, FontAwesome, MaterialIcons } from '@expo/vector-icons';
import Peopleliked from './Components/common/peopleliked';
import SplashScreen from './Components/Rootstack/Splashscreen';
console.disableYellowBox = true;
const storagekey = 'token';
const Tab = createMaterialBottomTabNavigator();
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
function External() {
  return (
    <Stack.Navigator headerMode={false}>
      <Stack.Screen name="profile" component={profile} />
      <Stack.Screen name="edit" component={Edition} />
      <Stack.Screen name="polladd" component={Addpoll} />
      <Stack.Screen name="feedback" component={Feedback} />
      <Stack.Screen name="likedpeople" component={Peopleliked} />
      <Stack.Screen name="classroom" component={Class} />
      <Stack.Screen name="segment" component={Privacytermsegment} />
      <Stack.Screen name="poll" component={Polling} />
      <Stack.Screen name="follower" component={Follower} />
      <Stack.Screen name="following" component={Following} />
      <Stack.Screen name="upcoming" component={Upcoming_events_copy} />
      <Stack.Screen name="setting" component={Settings} />
      <Stack.Screen name="note" component={Notesshared} />
      <Stack.Screen name="privacy" component={Privacy} />
      <Stack.Screen name="terms" component={Terms} />
      <Stack.Screen name="download" component={Downloadpage} />
      <Stack.Screen name="header" component={Headingbar} />
    </Stack.Navigator>
  );
}

function HomeScreen() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      activeColor="yellow"

    >
      <Tab.Screen
        name="Home" initialRouteName="Home"
        component={homescreen}
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
        component={Blogpage}
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
        component={Addblog}
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
        component={notifications}
        options={{
          tabBarLabel: 'bell',
          tabBarColor: '#F99124',
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="bell" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="chat"
        component={Edition}
        options={{
          tabBarLabel: 'chat',
          tabBarColor: 'purple',
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="chat" color={color} size={26} />
          ),
        }}
      />




    </Tab.Navigator>
  );
}
function Authstack() {
  return (
    <Stack.Navigator >
      <Stack.Screen name="login" component={Signpage} />
      <Stack.Screen name="signup" component={Signuppage} />
      <Stack.Screen name="welcome" component={Welcomepage} />
      <Stack.Screen name="who" component={Whoyouare} />
    </Stack.Navigator>
  );
}

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = { hasToken: false, isLoaded: false };
  }
  state = {
    darkmode: false,
  }
  componentDidMount() {
    AsyncStorage.getItem('token').then((token) => {
      this.setState({ hasToken: token !== null, isLoaded: true })
    });
  }
  render() {
    if (!this.state.isLoaded) {
      return (
        <SplashScreen />
      );
    } else {
      return (
        <AppearanceProvider>
          <MenuProvider>
            <NavigationContainer>
              {this.state.hasToken == null ? (
                <Stack.Navigator >
                  <Stack.Screen name="Auth" component={Authstack} />
                </Stack.Navigator>
              ) : (
                  <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />}>
                    <Drawer.Screen name="Home" component={HomeScreen} />

                    <Drawer.Screen name="external" component={External} />

                  </Drawer.Navigator>
                )}
            </NavigationContainer>
          </MenuProvider>
        </AppearanceProvider>
      )
    }
  }
}