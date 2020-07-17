import React, { Component, useState } from 'react';
import { Image, StyleSheet, SafeAreaView, FlatList, Dimensions, Share } from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, View, Drawer, ListItem, Right, Radio, List, Title, ActionSheet, Item, Input } from 'native-base';
import { EvilIcons, AntDesign, FontAwesome5, Entypo, MaterialCommunityIcons } from '@expo/vector-icons';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import {
  Avatar,
  TouchableRipple,
  Switch
} from 'react-native-paper';
const shareOptions = {
  title: 'Title',
  message: 'Message to share', // here you can send app link to playstore.
  url: 'www.example.com',
  subject: 'Subject'
};

import Carousel from '../common/carousel';
import Avatarcommon from '../common/Avatar';
import Upcoming_events from '../common/upcomingevents';
const { width: screenWidth } = Dimensions.get('window');
import Notessharedcopy from '../common/notescomponentcopy';
import Headingbar from './Header';
//import { Actions } from 'react-native-router-flux';
import Classroomcopy from '../common/classroomcopy';
import Pollingcopy from '../common/Pollingcopy';
export default class homescreen extends React.Component {
  constructor(props) {
    super(props);
  }
  state = {
    loading: true,
    search_bar_enabled: false,
  }
  toggling = () => {
    this.setState({ search_bar_enabled: !this.state.search_bar_enabled });
  }
  onSharePress = () => Share.share(shareOptions);
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
        <View></View>
      );
    }
    return (
      <View >
        <View>
          {this.state.search_bar_enabled == false ? (
            <>
              <Header>
                <Left>
                  <Button transparent onPress={() => { this.props.navigation.openDrawer() }}>
                    <Icon name='menu' />
                  </Button>
                </Left>
                <Body>
                  <Title>Cambridge</Title>
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
                        uri: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn4.iconfinder.com%2Fdata%2Ficons%2Fuser-avatar-flat-icons%2F512%2FUser_Avatar-31-512.png&f=1&nofb=1'
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
        <ScrollView style={{ backgroundColor: '#0E043B' }}>
          <CardItem style={Styles.carditem}>
            <Left>
              <Text style={Styles.notificationtop} note numberOfLines={2}>Howdy Raghav, There's  upcoming event waiting for you take a look at it once,</Text>
            </Left>

            <Button /*onPress={()=>Actions.notification()}*/>
              <Text>view</Text>
            </Button>
          </CardItem>
          <View>
            <Text style={Styles.heading}>Trending Feeds</Text>
            <Carousel />
          </View>

          <View>
            <Text style={Styles.heading}>Follow Cambrian</Text>
            <Avatarcommon />
          </View>
          <View>
            <Text style={Styles.heading}>Upcoming Events</Text>
            <Upcoming_events />
          </View>
          <View>
            <Text style={Styles.heading}>Shared Notes</Text>
            <Notessharedcopy />
          </View>
          <View>
            <Text style={Styles.heading}>Branch People</Text>
            <Classroomcopy />
          </View>
          <View>
            <Text style={Styles.heading}>Trending Polls</Text>
            <Pollingcopy />
          </View>
        </ScrollView>
      </View>
    );

  }
}
const Styles = StyleSheet.create({
  heading: {
    fontSize: 24,
    backgroundColor: '#053e42',
    color: 'white',
    paddingLeft: 20,
  },
  carditem: {
    backgroundColor: 'black',
    height: 100,
  },
  notificationtop: {
    color: 'white',
    fontSize: 15,
    marginLeft: 10,
  },
  Header: {
    backgroundColor: '#0E043B',
  },
  headercarditem: {
    backgroundColor: '#0E043B',
    color: 'white',
  }
});
