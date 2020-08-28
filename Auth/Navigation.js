import React, { Component } from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import homescreen from '../Components/Homestack/homescreen';
import Blogpage from '../Components/Rootstack/feedscreen';
import Settings from '../Components/Homestack/settings';
import notifications from '../Components/Homestack/Notification';
import profile from '../Components/Homestack/profile';
import Headingbar from '../Components/Homestack/Header';
import Upcoming_events_copy from '../Components/common/Upcomingeventscopy';
import Notesshared from '../Components/Homestack/Notescomponent';
import Downloadpage from '../Components/Homestack/downloads';
import { DrawerContent } from '../Components/Rootstack/Drawercontentscreen';
import Follower from '../Components/common/Followers';
import Following from '../Components/common/following';
import Privacy from '../Components/common/privacy';
import Addblog from '../Components/Homestack/Addblog';
import Terms from '../Components/common/Termscondition';
import Class from '../Components/Homestack/Classroom';
import Polling from '../Components/common/Polling';
import Privacytermsegment from '../Components/common/Privacyterm';
import Feedback from '../Components/common/Feedback';
import Edition from '../Components/common/Editprofile';
import Addpoll from '../Components/Homestack/Addpoll';
import Development from '../Components/common/development';
import { Ionicons,FontAwesome,FontAwesome5,MaterialCommunityIcons,MaterialIcons } from '@expo/vector-icons';
const Tab = createMaterialBottomTabNavigator();
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
console.disableYellowBox = true;
function External() {
    return (
      <Stack.Navigator headerMode={false}>
        <Stack.Screen name="profile" component={profile} />
        <Stack.Screen name="edit" component={Edition} />
        <Stack.Screen name="polladd" component={Addpoll} />
        <Stack.Screen name="feedback" component={Feedback} />
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
          component={Development}
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
  function Drawernav() {
    return (
      <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />} drawerPosition='left' drawerType='front'>
        <Drawer.Screen name="Home" component={HomeScreen} />
  
        <Drawer.Screen name="external" component={External} />
      </Drawer.Navigator>
    );
  }
  const Homestack = ()=>{
      return(
        
              <Stack.Navigator headerMode="none">
                  <Stack.Screen name='homescreenstack' component={HomeScreen} />
                  <Stack.Screen name='drawerstack' component={Drawernav} />
                  <Stack.Screen name='external' component={External} />
              </Stack.Navigator>
      );
  }
  export default Homestack ;