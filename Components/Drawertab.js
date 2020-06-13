import * as React from 'react';
import { Button, View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import blogpage from '../Components/homescreen/feedscreen';
import notifications from '../Components/homescreen/Notification';
import profile from '../Components/homescreen/profile';
function blog({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button
        onPress={() => navigation.navigate('blogpage')}
        title="Go to notifications"
      />
    </View>
  );
}

function profil({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button onPress={() => navigation.goBack()} title="Go back home" />
    </View>
  );
}

const Drawer = createDrawerNavigator();

export default function drawernavigat() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={blog} />
        <Drawer.Screen name="Notifications" component={profil} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}