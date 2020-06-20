import React, { Component,useState } from 'react';
import { Image ,StyleSheet,SafeAreaView,FlatList} from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body,Drawer,View,ListItem,Right,Radio, List,Title,ActionSheet} from 'native-base';
import { EvilIcons,AntDesign,FontAwesome5,Entypo} from '@expo/vector-icons';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { ScrollView } from 'react-native-gesture-handler';
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
    }
    state={
      searchenabled:false,
    }
    _searchaction =()=>{
this.setState=({searchenabled:!this.state.searchenabled})
    }
    render(){
        return(
          
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
            <Button transparent onPress={this._searchaction}>
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
            <Button transparent>
              <Icon name='settings' />
            </Button>
          </Right>
        </Header>
        );
    }
}