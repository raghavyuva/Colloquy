import React, { Component,useState } from 'react';
import { Image ,StyleSheet,SafeAreaView,FlatList} from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body,Drawer,View,ListItem,Right,Radio, List,Title,ActionSheet,Item,Input} from 'native-base';
import * as Font from 'expo-font';
import { ScrollView } from 'react-native-gesture-handler';
import { Actions } from 'react-native-router-flux';
import Display from 'react-native-display';
import { Ionicons,FontAwesome5,MaterialCommunityIcons,Feather,SimpleLineIcons,Octicons,Fontisto,FontAwesome,Entypo} from '@expo/vector-icons';
import {
  Avatar,
  TouchableRipple,
  Switch
} from 'react-native-paper';
var BUTTONS = [
  { text: "WhatsApp", icon: "logo-whatsapp", iconColor: "#2c8ef4" },
  { text: "Facebook", icon: "logo-facebook", iconColor: "blue" },
  { text: "Gmail", icon: "mail", iconColor: "#ea943b" },
  { text: "Instagram", icon: "logo-instagram", iconColor: "#fa213b" },
  { text: "Cancel", icon: "close", iconColor: "red" }
];
var CANCEL_INDEX = 4;
export default class Headingbar extends React.Component{
    constructor(props){
        super(props);
        this.state={};
        this.state = {enable: true,};
    }
    state={
      loading:true,
    }
    toggling=()=>{
      this.setState({enable:!this.state.enable})
      }

searchaction=()=>{

    }
    async componentDidMount() {
      await Font.loadAsync({
        'Roboto': require('native-base/Fonts/Roboto.ttf'),
        'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
        ...Ionicons.font,
      })
      this.setState({ loading: false })
    }
    render(){
      if (this.state.loading) {
      return (
        <View></View>
      );
    }
    if (this.state.enable==true) {
      return(
        <Display enable={this.state.enable}>
          <Header>
        <Left>
          <Button transparent>
            <Icon name='menu' />
          </Button>
        </Left>
        <Body>
          <Title>CITECH (b'lore)</Title>
        </Body>
        <Right>
          <Button transparent onPress={this.toggling} enable={this.state.enable}>
            <Icon name='search' />
          </Button>
          <Button transparent onPress={() =>
  ActionSheet.show(
    {
      options: BUTTONS,
      cancelButtonIndex: CANCEL_INDEX,
      title: "Share to"
    },
    buttonIndex => {
      this.setState({ clicked: BUTTONS[buttonIndex] });
    }
  )}>
            <Icon name='share' />
          </Button>
          <Button transparent onPress={()=>Actions.profile()}>
          <Avatar.Image 
                              source={{
                                  uri: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn4.iconfinder.com%2Fdata%2Ficons%2Fuser-avatar-flat-icons%2F512%2FUser_Avatar-31-512.png&f=1&nofb=1'
                              }}
                              size={30}
                             
                          />
          </Button>
        </Right>
      </Header>
      </Display>
      );
    } 
    else {
      return(
        <Display >
        <Header searchBar rounded >
        <Item>
          <Icon name="ios-search" />
          <Input placeholder="What you are looking for?" />
          <Button transparent  enable={this.state.enable} onPress={this.toggling}>
          <Entypo name="cross" size={26} color="black" />
          </Button>
        </Item>
        <Button transparent>
          <Text>Search</Text>
        </Button>
      </Header>
      </Display>
      ); 
    }
      
      
    }
      
    }
