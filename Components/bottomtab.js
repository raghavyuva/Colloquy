import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import homescreen from '../Components/homescreen/homescreen';
import ChatTab from '../Components/homescreen/chatscreen';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {FontAwesome5,MaterialIcons} from 'react-native-vector-icons';
import blogpage from '../Components/homescreen/feedscreen';
import notifications from '../Components/homescreen/Notification';
import profile from '../Components/homescreen/profile';
const Tab = createMaterialBottomTabNavigator();

const MaintabScreen = () =>(
        <NavigationContainer>
        <Tab.Navigator
          initialRouteName="Screns"
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
            component={blogpage}
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


        </Tab.Navigator>
        </NavigationContainer>
      );

export default MaintabScreen;