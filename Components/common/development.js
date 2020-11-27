import React, { Component, useState } from 'react';
import { Image, StyleSheet, SafeAreaView, FlatList, Dimensions, Share, ImageBackground, Linking } from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Drawer, View, ListItem, Right, Radio, List, Title, ActionSheet, Item, Input } from 'native-base';
import * as Font from 'expo-font';
import { ScrollView } from 'react-native-gesture-handler';
//import { Actions } from 'react-native-router-flux';
import Display from 'react-native-display';
const { width: screenWidth } = Dimensions.get('window');
import Svg, { Circle, Rect, Path } from 'react-native-svg';
import { Ionicons, FontAwesome5, MaterialCommunityIcons, Feather, SimpleLineIcons, Octicons, Fontisto, FontAwesome, Entypo, AntDesign } from '@expo/vector-icons';
import {
  Avatar,
  TouchableRipple,
  Switch
} from 'react-native-paper';
export default class Development extends React.Component {
  constructor(props) {
    super(props);
  }
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
      return (
        <Container></Container>
      );
    }
    return (
      <View style={{ flex: 1 }}>
        <View style={{ flex: 0.8, justifyContent: "center" }}>
          <ImageBackground source={require('../../assets/development.png')} style={{ width: "100%", height: "100%", flex: 0.7, justifyContent: "flex-end" }} />
          <Text style={{ textAlign: 'center', textShadowColor: 'yellow', fontWeight: 'bold', fontStyle: 'italic', textShadowRadius: 90, color: 'blue' }}>this feature is still in development mode </Text>
          <Button style={{ justifyContent: 'center', backgroundColor: 'red', width: '90%', alignSelf: 'center', marginTop: 40 }} onPress={() => Linking.openURL('https://raghav.orak.in/')}><Text style={{ textAlign: 'center' }}>contact developer</Text></Button>

        </View>
        <View style={{ flex: 0.2 }}>
          <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" style={{ flex: 1, }}>
            <Path fill="#000b76" fill-opacity="1" d="M0,64L48,96C96,128,192,192,288,197.3C384,203,480,149,576,149.3C672,149,768,203,864,197.3C960,192,1056,128,1152,96C1248,64,1344,64,1392,64L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z">
            </Path>
          </Svg>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({

});