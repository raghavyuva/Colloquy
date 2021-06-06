import React from 'react'
import { createStackNavigator } from "@react-navigation/stack";
import Login from '../screens/Login';
import Signup from '../screens/Signup';
import Welcome from '../screens/Welcome';
import LoginWthPhone from '../screens/LoginWthPhone';
import ForgotPass from '../screens/ForgotPass';

const Stack = createStackNavigator();

const AuthNav = () => {
    return (
        <Stack.Navigator initialRouteName="welcome" headerMode="none">
            <Stack.Screen name="welcome" component={Welcome} />
            <Stack.Screen name="login" component={Login} />
            <Stack.Screen name="signup" component={Signup} />
            {/* <Stack.Screen name="phone" component={LoginWthPhone} /> */}
            <Stack.Screen name="forgot" component={ForgotPass} />
        </Stack.Navigator>
    )
}

export default AuthNav

