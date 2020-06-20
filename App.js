import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {createAppContainer} from 'react-navigation';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import {createStackNavigator} from 'react-navigation-stack';
import { NavigationContainer } from '@react-navigation/native';
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
import { Root } from "native-base";
import Headingbar from './Components/common/Header';
import Upcoming_events from './Components/common/upcomingevents';
import Downloadpage from './Components/Homestack/downloads';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
//this is working but when i try to do with commented part its not working,,
const navigator = createStackNavigator(
  {
welcome:Welcomepage,
login:Signpage,
signup:Signuppage,
who:Whoyouare,
home:homescreen,
chat:ChatTab,
feed:Blogpage,
bell:notifications, 
pro:profile,
upcoming:Upcoming_events,
header:Headingbar,
setting:Settings,
  },
{
  initialRouteName: 'welcome',
  headerMode:'none',
},

);
const AppContainer = createAppContainer(navigator);
export default () =>{
 
 return(<Root>
    <AppContainer />
  </Root>
 );
}



/*const Tab = createMaterialBottomTabNavigator();

function Homestack(){
  return(
    <Tab.Navigator
    initialRouteName="Home"
    activeColor="yellow"
    barStyle={{ backgroundColor: '#0E043B' }}
    >
    <Tab.Screen
      name="Home"
      component={homescreen}
      options={{
        tabBarLabel: 'Home',
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
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name="menu" color={color} size={26} />
        ),
      }}
    />
                       <Tab.Screen
      name="write"
      component={notifications}
      options={{
        tabBarLabel: 'bell',
        tabBarIcon: ({ color }) => (
          <FontAwesome5 name="bell" color={color} size={26} />
        ),
      }}
    />
                       <Tab.Screen
      name="chat"
      component={ChatTab}
      options={{
        tabBarLabel: 'chat',
        tabBarIcon: ({ color }) => (
          <MaterialIcons name="chat" color={color} size={26} />
        ),
      }}
    />
   <Tab.Screen
      name="profile"
      component={profile}
      options={{
        tabBarLabel: 'Profile',
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name="account" color={color} size={26} />
        ),
      }}
    />
             <Tab.Screen
      name="settings"
      component={Settings}
      options={{
        tabBarLabel: 'settings',
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name="settings" color={color} size={26} />
        ),
      }}
    />


  </Tab.Navigator>
  );
}





const Stack = createStackNavigator();

function Rootstack() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="login" component={Signpage} />
        <Stack.Screen name="signup" component={Signuppage} />  //checking if working or not
      </Stack.Navigator>
    </NavigationContainer>
  )
}



*/