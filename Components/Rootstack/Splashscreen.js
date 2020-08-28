import React, { Component,useState } from 'react';
import { Image ,StyleSheet,SafeAreaView,FlatList,Dimensions,Share,ImageBackground} from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body,Drawer,View,ListItem,Right,Radio, List,Title,ActionSheet,Item,Input} from 'native-base';
import * as Font from 'expo-font';
import { ScrollView } from 'react-native-gesture-handler';
//import { Actions } from 'react-native-router-flux';
import Display from 'react-native-display';
const { width: screenWidth } = Dimensions.get('window');
import { Ionicons,FontAwesome5,MaterialCommunityIcons,Feather,SimpleLineIcons,Octicons,Fontisto,FontAwesome,Entypo,AntDesign} from '@expo/vector-icons';
import {
  Avatar,
  TouchableRipple,
  Switch
} from 'react-native-paper';
import * as firebase from 'firebase';
export default class Splashscreen extends React.Component{
    constructor(props){
        super(props);
    }
    state={
        loading:true,
      }
      async componentDidMount() {
        await Font.loadAsync({
          'Roboto': require('native-base/Fonts/Roboto.ttf'),
          'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
          ...Ionicons.font,
        })
        this.setState({ loading: false })
      }
      componentDidMount() {
       }
    render(){
        if (this.state.loading) {
            return (
              <Container></Container>
            );
          }
        return(
<Container style={styles.screen}>
    <Content>
<ImageBackground source={require('../../assets/citech.jpg')} style={styles.background}/>
</Content>
</Container>
        );
    }
}
const styles = StyleSheet.create({
    screen: {
        flex:1,
        justifyContent:'center',
        backgroundColor:'#0E043B'
        },
        background:{
            width:'100%',
            height:'100%',
            flex:0.6,
            
        },
});