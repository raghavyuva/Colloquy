import React, { Component, useState } from 'react';
import { Image, StyleSheet, SafeAreaView, FlatList, Dimensions, Share, AsyncStorage } from 'react-native';
import { Container, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Drawer, View, ListItem, Right, Radio, List, Title, ActionSheet, Item, Input } from 'native-base';
import {
  Avatar,
  TouchableRipple,
  Switch
} from 'react-native-paper';
const shareOptions = {
  title: 'Title',
  message: 'Message to share',
  url: 'www.example.com',
  subject: 'Subject'
};
import { EvilIcons, AntDesign, FontAwesome5, Entypo } from '@expo/vector-icons';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { ScrollView } from 'react-native-gesture-handler';
import Header from '../Homestack/Header';
import { URL } from '../../config';
const { width: screenWidth } = Dimensions.get('window');
export default class Follower extends React.Component {
  constructor(props) {
    super(props);
  }
  state = {
    Data: []
  }
  Listrenderer({ item, index }) {
    return (
      <List>
        <ListItem thumbnail>
          <Left>
            <Thumbnail square source={{ uri: item.userphoto }} />
          </Left>
          <Body>
            <Text>{item.username}</Text>
            <Text note numberOfLines={1}>{item.tagline}</Text>
          </Body>
          <Right>
            <Button style={styles.follow}>
              <Text>follow</Text>
            </Button>
          </Right>
        </ListItem>
      </List>
    );
  }

  fetching = async () => {
    try {
      await AsyncStorage.getItem('userName').then(userName => {
        AsyncStorage.getItem('userToken').then(token => {
          const Listener = fetch(`${URL.url}` + `/followerslist`, {
            headers: {
              'Authorization': 'Bearer ' + `${token}`,
            }
          })
            .then((response) => response.json())
            .then((responseJson) => {
              this.setState({ Data: responseJson });
              //console.log(this.state.Data)
            })
        })
      })

    } catch (e) {
      console.log(e);
    }
  }
  anofetch = async () => {
    try {

    } catch (error) {

    }
  }
  componentDidMount = () => {
    this.fetching()
    setTimeout(() => {
      this.setState({ loading: false });
    }, 2000);
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
        <Container></Container>
      );
    }
    return (
      <Container>
        <Header {...this.props} />
        <FlatList
          data={this.state.Data}
          renderItem={this.Listrenderer}
          keyExtractor={item => item._id}
        />
      </Container>

    );
  }
}




const styles = StyleSheet.create({
  follow: {
    backgroundColor: '#053e42'
  },
  search: {
    backgroundColor: '#053e42'
  },
  following: {
    marginLeft: 20,
    fontSize: 25,
    fontWeight: '500'
  }
})
