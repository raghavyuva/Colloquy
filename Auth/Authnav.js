import React, { useContext, useState, useEffect } from "react";
import {View} from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import AuthContainer from "./AuthContainer";
import { firebase } from "./config";
import Homestack from "./Navigation";
import { AuthContext } from "./AuthProvider";
import { MenuProvider } from 'react-native-popup-menu';
export default function Routes() {
  const { user, setUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [initializing, setInitializing] = useState(true);

  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
    setLoading(false);
  }
  useEffect(() => {
    const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  if (loading) {
    return (
        <View>

        </View>
    )
  }

  return (
    <NavigationContainer>
<MenuProvider>
      {user ? <Homestack /> : <AuthContainer />}
      </MenuProvider>
    </NavigationContainer>
  );
}
