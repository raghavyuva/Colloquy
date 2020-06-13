import React from 'react';
import Image from 'react-native';
import { StyleSheet, Text, View } from 'react-native';
import {createAppContainer} from 'react-navigation';
import { createDrawerNavigator } from '@react-navigation/drawer';
import {createStackNavigator} from 'react-navigation-stack';
import Welcomepage from './Components/Welcomecomponent';
import Signpage from './Components/Signincomponent';
import Signuppage from './Components/SignupComponent';
import Whoyouare from './Components/selectfacstu';
import MaintabScreen from './Components/bottomtab';
import homescreen from './Components/homescreen/homescreen';
import ChatTab from './Components/homescreen/chatscreen';
import Blogpage from './Components/homescreen/feedscreen';
import Settings from './Components/homescreen/settings';
import filter from './Components/homescreen/common/filtersearch';
import drawernavigat from './Components/Drawertab';
import notifications from './Components/homescreen/Notification';
import profile from './Components/homescreen/profile';
import { NavigationContainer } from '@react-navigation/native';
const navigator = createStackNavigator(
  {
welcome:Welcomepage,
login:Signpage,
signup:Signuppage,
who:Whoyouare,
tab:MaintabScreen,
home:homescreen,
chat:ChatTab,
feed:Blogpage,
bell:notifications,
pro:profile,
drawer:drawernavigat,
setting:Settings,
  },
{
  initialRouteName: 'welcome',
  headerMode:'none',
},

);
const AppContainer = createAppContainer(navigator);
export default AppContainer;



