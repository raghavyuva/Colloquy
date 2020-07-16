import React, { Component,useState } from 'react';
import { Image ,StyleSheet,SafeAreaView,FlatList,Dimensions,Share} from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Drawer, View, ListItem, Right, Radio, List, Title, ActionSheet, Item, Input } from 'native-base';
import {
  Avatar,
  TouchableRipple,
  Switch
} from 'react-native-paper';
import * as Font from 'expo-font';
import { ScrollView } from 'react-native-gesture-handler';
//import { Actions } from 'react-native-router-flux';
import Display from 'react-native-display';
import { NavigationContainer, DarkTheme, DefaultTheme } from '@react-navigation/native';
import Headingbar from './Header';
import { useTheme } from '@react-navigation/native';
const { width: screenWidth } = Dimensions.get('window');
import { Ionicons,FontAwesome5,MaterialCommunityIcons,Feather,SimpleLineIcons,Octicons,Fontisto,FontAwesome,Entypo,AntDesign} from '@expo/vector-icons';
const shareOptions = {
  title: 'Title',
  message: 'Message to share', // here you can send app link to playstore.
  url: 'www.example.com',
  subject: 'Subject'
};

export default class Settings extends React.Component{
    constructor(props){
        super(props);
    }

    state={
        loading:true,
        airplane:false,
        darkmode:false,
        recent:false,
        poll:false,
       search_bar_enabled:false,
      }
      onSharePress = () => Share.share(shareOptions);
    toggling=()=>{
      this.setState({search_bar_enabled:!this.state.search_bar_enabled});
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
              <Container></Container>
            );
          }
        return(
<Container>
<View>
        {this.state.search_bar_enabled==false?(
           <>
      <Header>
      
     
      <Left>
        <Button transparent  onPress={() => { this.props.navigation.openDrawer() }}>
          <Icon name='menu' />
        </Button>
      </Left>
      <Body>
        <Title>CITECH (b'lore)</Title>
      </Body>
      <Right>
        <Button transparent onPress={this.toggling} >
          <Icon name='search' />
        </Button>
        <Button transparent onPress={this.onSharePress}>
          <Icon name='share' />
        </Button>
        <Button transparent onPress={()=>this.props.navigation.navigate('profile')}>
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
     
      ):(
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
<Content>
    <ListItem icon style={{marginTop:15}}>
      <Left>
        <Button style={{ backgroundColor:  "#FF9501"  }}>
          <Icon active name="airplane" />
        </Button>
      </Left>
      <Body>
        <Text style={{color:'red'}}> Airoplane mode </Text>
<Text note> Do not recieve notifications </Text>
      </Body>
      <Right>
        <Switch value={this.state.airplane} onValueChange={()=>this.setState({airplane: !this.state.airplane})}/>
      </Right>
    </ListItem>
    <ListItem icon style={{marginTop:15}}>
      <Left>
        <Button style={{ backgroundColor: "#FF9501" }}>
          <Icon active name="md-bulb" />
        </Button>
      </Left>
      <Body>
        <Text style={{color:'red'}}> Dark Mode </Text>
<Text note> Switch between themes </Text>
      </Body>
      <Right>
        <Switch value={this.state.darkmode} onValueChange={()=>this.setState({darkmode: !this.state.darkmode})}/>
      </Right>
    </ListItem>
    <ListItem icon style={{marginTop:15,height:60}}>
      <Left>
        <Button style={{ backgroundColor: "#FF9501" }}>
          <Icon active name="md-eye" />
        </Button>
      </Left>
      <Body >
        <Text style={{color:'red'}}> Hide Recent Posts </Text>
<Text note numberOfLines={2}> This will hide recent posts</Text>
      </Body>
      <Right>
        <Switch value={this.state.recent} onValueChange={()=>this.setState({recent: !this.state.recent})}/>
      </Right>
    </ListItem>
    <ListItem icon style={{marginTop:15,height:60}}>
      <Left>
        <Button style={{ backgroundColor: "#FF9501" }}>
          <Icon active name="user-secret" />
        </Button>
      </Left>
      <Body >
        <Text style={{color:'red'}}>Anonymous Poll</Text>
<Text note numberOfLines={2}>people wont come to know</Text>
      </Body>
      <Right>
        <Switch value={this.state.poll} onValueChange={()=>this.setState({poll: !this.state.poll})}/>
      </Right>
    </ListItem>
  </Content>
</Container>
        );
    }
}
const styles = StyleSheet.create({

});