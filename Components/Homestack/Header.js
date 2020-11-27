import React, { Component, useState } from 'react';
import { Image, StyleSheet, SafeAreaView, FlatList, Dimensions, Share, AsyncStorage, ActivityIndicator } from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Drawer, View, ListItem, Right, Radio, List, Title, ActionSheet, Item, Input } from 'native-base';
import * as Font from 'expo-font';
import { ScrollView } from 'react-native-gesture-handler';
//import { Actions } from 'react-native-router-flux';
import Display from 'react-native-display';
const { width: screenWidth } = Dimensions.get('window');
import { Ionicons, FontAwesome5, MaterialCommunityIcons, Feather, SimpleLineIcons, Octicons, Fontisto, FontAwesome, Entypo, AntDesign } from '@expo/vector-icons';
import {
  Avatar,
  TouchableRipple,
  Switch
} from 'react-native-paper';
import { URL } from '../../config';
const shareOptions = {
  title: 'Title',
  message: 'Message to share', // here you can send app link to playstore.
  url: 'www.example.com',
  subject: 'Subject'
};
export default class Headingbar extends React.Component {
  constructor(props) {
    super(props);
  }
  state = {
    loading: true,
    search_bar_enabled: false,
    Data: ''
  }
  toggling = () => {
    this.setState({ search_bar_enabled: !this.state.search_bar_enabled });
  }
  fetching = async () => {
    try {
      await AsyncStorage.getItem('userName').then(userName => {
        AsyncStorage.getItem('userToken').then(token => {
          const Listener = fetch(`${URL.url}` + `/user/${userName}`, {
            headers: {
              'Authorization': 'Bearer ' + `${token}`,
            }
          })
            .then((response) => response.json())
            .then((responseJson) => {
              this.setState({ Data: responseJson });
              // console.log(this.state.Data.user);
            })
        })
      })

    } catch (e) {
      console.log(e);
    }
  }
  async componentDidMount() {
    await Font.loadAsync({
      'Roboto': require('native-base/Fonts/Roboto.ttf'),
      'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
      ...Ionicons.font,
    })
    this.fetching()
    setTimeout(() => {
      this.setState({ loading: false })
    }, 2000);
  }
  onSharePress = () => Share.share(shareOptions);
  render = () => {
    if (this.state.loading) {
      return (
        <View style={{ backgroundColor: "#0E043B", }}>
          <ActivityIndicator size={10} color='red' />
        </View>
      ); 
    }
    return (
      <SafeAreaView>
      <View>
        {this.state.search_bar_enabled == false ? (
          <>
            <Header style={{ backgroundColor: '#0E043B' }}>
              <Left>
                <Button transparent onPress={() => { this.props.navigation.openDrawer() }}>
                  <Icon name='menu' />
                </Button>
              </Left>
              <Body>
                <Title>Primish</Title>
              </Body>
              <Right>
                <Button transparent onPress={this.toggling} >
                  <Icon name='search' />
                </Button>
                <Button transparent onPress={this.onSharePress}>
                  <Icon name='share' />
                </Button>
                <Button transparent onPress={() => this.props.navigation.navigate('external', { screen: 'profile' })}>
                  <Avatar.Image
                    source={{
                      uri: this.state.Data.user.userphoto
                    }}
                    size={30}
                  />
                </Button>
              </Right>
            </Header>
          </>

        ) : (
            <Header searchBar rounded >
              <Item>
                <Icon name="ios-search" />
                <Input placeholder="What you are looking for?" />
                <Button transparent style={{ marginRight: 10 }} >
                  <AntDesign name="filter" size={26} color="black" />
                </Button>
                <Button transparent enable={this.state.enable} onPress={this.toggling}>
                  <Entypo name="cross" size={26} color="black" />
                </Button>
              </Item>
              <Button transparent>
                <Text>Search</Text>
              </Button>
            </Header>
          )
        }
      </View>
      </SafeAreaView>
    )
  }
}