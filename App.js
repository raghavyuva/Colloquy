import React, {Component} from 'react';
import { StyleSheet, Text, View,ActivityIndicator,AsyncStorage} from 'react-native';
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
import Upcoming_events_copy from './Components/common/Upcomingeventscopy';
import Notescomponent from './Components/common/notescomponentcopy';
import Notesshared from './Components/Homestack/Notescomponent';
import Downloadpage from './Components/Homestack/downloads';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import {AppRegistry} from 'react-native';
import {Router, Scene} from 'react-native-router-flux';
import DrawerContent from './Components/Rootstack/Drawercontentscreen';
AppRegistry.registerComponent('ReactNativeAuth', () => App);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { hasToken: false,isLoaded: false  };
  }
  componentDidMount() {
    AsyncStorage.getItem('id_token').then((token) => {
      this.setState({ hasToken: token !== null, isLoaded: true })
    });
  }

  render() {
    if (!this.state.isLoaded) {
      return (
        <ActivityIndicator />
      )
    } else {
    return(
      <NavigationContainer>
      <Root>
      <Router>
        <Scene key='root'>
        <Scene
            component={Welcomepage}
            hideNavBar={true}
            key='welcome page'
            title='welcome'
            />
          <Scene
            component={Signpage}
            hideNavBar={true}
            key='Authentication'
            title='Authentication'
           
          />
          <Scene
            component={Signuppage}
            hideNavBar={true}
            key='Signup'
            title='user signup'

          />
          <Scene
            component={homescreen}
            hideNavBar={true}
            key='Home'
            title='Home'
          />
                   <Scene
            component={mydrawer}
            hideNavBar={true}
            key='drawer'
            title='drawer'
initial={true}
          /> 
          <Scene
            component={Homestack}
            hideNavBar={true}
            key='homestack'
            title='homestack'

          /> 
                    <Scene
            component={Notesshared}
            hideNavBar={true}
            key='note'
            title='note'

          /> 
           <Scene
            component={Upcoming_events_copy}
            hideNavBar={true}
            key='upcoming'
            title='upcoming'

          /> 
                     <Scene
            component={Settings}
            hideNavBar={true}
            key='setting'
            title='setting'

          /> 
                               <Scene
            component={Downloadpage}
            hideNavBar={true}
            key='download'
            title='download'

          /> 
        </Scene>
      </Router>
      </Root>
      </NavigationContainer>
    )
  }
}
}
const Drawer = createDrawerNavigator();
function mydrawer(){
  return(
  <Drawer.Navigator initialRouteName="upcoming-events" drawerContent={props => <DrawerContent {...props}/>}>
  <Drawer.Screen name="upcoming-events" component={Upcoming_events_copy} />
  <Drawer.Screen name="Shared-Notes" component={Notesshared} />
</Drawer.Navigator>
  );
}
export default App;

/*const navigator = createStackNavigator(
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
  initialRouteName: 'login',
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


*/

const Tab = createMaterialBottomTabNavigator();

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



/*

const Stack = createStackNavigator();

function Rootstack() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="welcome" headermode="none">
        <Stack.Screen name="login" component={Signpage} />
        <Stack.Screen name="signup" component={Signuppage} /> 
        <Stack.Screen name="welcome" component={welcomepage} /> 
        <Stack.Screen name="who" component={whoyouare} /> 
        <Stack.Screen name="home" component={Homestack} /> 
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default class App extends Component {
  render() {
    return (
      <Root>
        <Rootstack />
      </Root>
    )
  }
}
*/