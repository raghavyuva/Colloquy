import React, { Component,useState } from 'react';
import { Image ,StyleSheet,SafeAreaView,FlatList,View,Dimensions} from 'react-native';
import { Container, Header, Content, List, ListItem, Thumbnail, Text, Left, Body, Right, Button ,TextInput,Item,Icon,Input} from 'native-base';
import { EvilIcons,AntDesign,FontAwesome5,Entypo} from '@expo/vector-icons';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { ScrollView } from 'react-native-gesture-handler';
import Carousel from './common/carousel';
import Avatarcommon from './common/Avatar';
import Upcoming_events from './common/upcomingevents';
const { width: screenWidth } = Dimensions.get('window');



export default class homescreen extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    return(
<View >
  <ScrollView style={{backgroundColor:'#0E043B'}}>
  <View>
    <Text style ={Styles.heading}>Trending Feeds</Text>
<Carousel/>
</View>

<View>
  <Text style ={Styles.heading}>Follow Cambrian</Text>
<Avatarcommon />
</View>
<View>
<Text style ={Styles.heading}>Upcoming Events</Text>
  <Upcoming_events/>
</View>
</ScrollView>
</View>
    );
  }
}
const Styles =StyleSheet.create({
heading:{
fontSize:24,
backgroundColor:'#053e42',
color:'white',
paddingLeft:20,
}
});