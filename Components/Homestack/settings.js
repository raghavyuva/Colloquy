import React, { Component,useState } from 'react';
import { Image ,StyleSheet,SafeAreaView,FlatList,Dimensions,Share} from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body,Drawer,View,ListItem,Right,Radio, List,Title,ActionSheet,Item,Input} from 'native-base';
import * as Font from 'expo-font';
import { ScrollView } from 'react-native-gesture-handler';
//import { Actions } from 'react-native-router-flux';
import Display from 'react-native-display';
import { NavigationContainer, DarkTheme, DefaultTheme } from '@react-navigation/native';
import Headingbar from '../common/Header';
import { useTheme } from '@react-navigation/native';
const { width: screenWidth } = Dimensions.get('window');
import { Ionicons,FontAwesome5,MaterialCommunityIcons,Feather,SimpleLineIcons,Octicons,Fontisto,FontAwesome,Entypo,AntDesign} from '@expo/vector-icons';
import {
  Avatar,
  TouchableRipple,
  Switch
} from 'react-native-paper';

const SetTheme = ({ setTheme }) => {
  const theme = useTheme()

  React.useEffect(() => {
      setTheme(theme)
      return () => null
  },[])

  return null
}
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
        theme: undefined
      }
      setTheme = theme => {
        this.setState({theme})
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
  <Headingbar/>
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