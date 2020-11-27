import React, { Component } from 'react'
import { Text, StyleSheet, View, ActivityIndicator, LogBox } from 'react-native'
import IndexNavigator from './Auth'
import * as Font from 'expo-font';
import { EvilIcons, AntDesign, FontAwesome5, Entypo, Ionicons } from '@expo/vector-icons';
import { Provider } from 'react-redux';
import { ConfigureStore } from './redux/ConfigureStore';
const store = ConfigureStore();
LogBox.ignoreAllLogs = (true);
export default class App extends Component {
  state = {
    loading: true,
  }
  async componentDidMount() {
    await Font.loadAsync({
      'Roboto': require('native-base/Fonts/Roboto.ttf'),
      'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
      ...Ionicons.font,
    })
    this.setState({ loading: false })
  }
  render() {
    if (this.state.loading) {
      <View style={{ justifyContent: "center", alignSelf: 'center', flex: 1 }}>
        <ActivityIndicator size={100} color='red' />
      </View>
    }
    return (
      <Provider store={store}>
        <IndexNavigator />
      </Provider>
    )
  }
}

const styles = StyleSheet.create({})
