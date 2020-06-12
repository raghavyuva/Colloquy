import React from 'react';
import Image from 'react-native';
import { StyleSheet, Text, View } from 'react-native';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import Welcomepage from './Components/Welcomecomponent';
import Signpage from './Components/Signincomponent';
import Signuppage from './Components/SignupComponent';
import Whoyouare from './Components/selectfacstu';
import MaintabScreen from './Components/bottomtab';
import homescreen from './Components/homescreen/homescreen';
import ChatTab from './Components/homescreen/chatscreen';
import blogpage from './Components/homescreen/feedscreen';
import notifications from './Components/homescreen/Notification';
import profile from './Components/homescreen/profile';
const navigator = createStackNavigator(
  {
welcome:Welcomepage,
login:Signpage,
signup:Signuppage,
who:Whoyouare,
tab:MaintabScreen,
home:homescreen,
chat:ChatTab,
feed:blogpage,
bell:notifications,
pro:profile,
  },
{
  defaultNavigatiOnoption:{
  headerStyle:{},
  headerBackImage:<Image/>,
  headerBackTitle:null,
  headerLeftContainerStyle:{},
  headerRightContainerStyle:{},
  }
},
{
  initialRouteName: '',
}
);
const AppContainer = createAppContainer(navigator);
export default AppContainer;