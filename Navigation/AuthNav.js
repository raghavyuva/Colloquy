import React from 'react'
import { createStackNavigator } from "@react-navigation/stack";
import Login from '../screens/Login';
import Signup from '../screens/Signup';
import Welcome from '../screens/Welcome';
import LoginWthPhone from '../screens/LoginWthPhone';
import ForgotPass from '../screens/ForgotPass';
import Terms from '../screens/TermsAndCondition';
import Privacy from '../screens/Privacy';

const Stack = createStackNavigator();

const AuthNav = () => {
    return (
        <Stack.Navigator initialRouteName="welcome" headerMode="none">
            <Stack.Screen name="welcome" component={Welcome} />
            <Stack.Screen name="login" component={Login} />
            <Stack.Screen name="signup" component={Signup} />
            <Stack.Screen name="terms" component={Terms} />
            <Stack.Screen name="privacy" component={Privacy} />
            <Stack.Screen name="forgot" component={ForgotPass} />
        </Stack.Navigator>
    )
}

export default AuthNav

