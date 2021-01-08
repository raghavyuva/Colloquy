import React from 'react'
import { createStackNavigator } from "@react-navigation/stack";
import Login from '../screens/Login';
import Signup from '../screens/Signup';
import Welcome from '../screens/Welcome';

const Stack = createStackNavigator();

const AuthNav = () => {
    return (
        <Stack.Navigator initialRouteName="welcome" headerMode="none">
            <Stack.Screen name="welcome" component={Welcome} />
            <Stack.Screen name="login" component={Login} />
            <Stack.Screen name="signup" component={Signup} />
        </Stack.Navigator>
    )
}

export default AuthNav
