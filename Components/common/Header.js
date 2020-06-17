import React, { Component,useState } from 'react';
import { Image ,StyleSheet,SafeAreaView,FlatList} from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body,Drawer,View,ListItem,Right,Radio, List,Title} from 'native-base';
import { EvilIcons,AntDesign,FontAwesome5,Entypo} from '@expo/vector-icons';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { ScrollView } from 'react-native-gesture-handler';
 
export default class Headingbar extends React.Component{
    constructor(props){
        super(props)
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
            <Button transparent>
              <Icon name='search' />
            </Button>
            <Button transparent>
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