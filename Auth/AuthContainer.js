import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "../Components/Rootstack/Signincomponent";
import Signuppage from "../Components/Rootstack/SignupComponent";
import Welcomepage from "../Components/Rootstack/Welcomecomponent";
const Stack = createStackNavigator();

const AuthContainer = () => {
  return (
    <Stack.Navigator initialRouteName="welcome" headerMode="none">
      <Stack.Screen name="welcome" component={Welcomepage} />
      <Stack.Screen name="login" component={Login} />
      <Stack.Screen name="signup" component={Signuppage} />
    </Stack.Navigator>
  );
};

export default AuthContainer;
