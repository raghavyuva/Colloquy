import React, { Component,useState } from 'react';
import { Image ,StyleSheet,SafeAreaView,FlatList,Dimensions,Share} from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Drawer, View, ListItem, Right, Radio, List, Title, ActionSheet, Item, Input } from 'native-base';
import { EvilIcons,AntDesign,FontAwesome5,Entypo} from '@expo/vector-icons';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { ScrollView } from 'react-native-gesture-handler';
const { width: screenWidth } = Dimensions.get('window');
import Headingbar from '../Homestack/Header';
import {
  Avatar,
  TouchableRipple,
  Switch
} from 'react-native-paper';
const eventlist =[
    {
        id:'1',
        title:'chiguru',
        image:'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.ytimg.com%2Fvi%2F0bXVRPzqUTE%2Fmaxresdefault.jpg&f=1&nofb=1',
        description:' time when students get bonded in very special ways and the true essence of being a CAMBRIAN comes into form',
        date:'12-03-2018'
    },
    {
        id:'2',
        title:'Event',
        image:'http://rsquare2014.com/wp-content/uploads/2017/02/External-Events-banner_2.png',
        description:' time when students get bonded in very special ways and the true essence of being a CAMBRIAN comes into form',
        date:'12-03-2018'
    },
    {
        id:'3',
        title:'Intuit',
        image:'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%3Fid%3DOIP.SyDN_Kx-lsZasFnhW9ZiGAHaEK%26pid%3DApi&f=1',
        description:' time when students get bonded in very special ways and the true essence of being a CAMBRIAN comes into form',
        date:'12-03-2018'
    },
    {
        id:'4',
        title:'Get together',
        image:'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP.oP6RsHt-5-iliHpCGFcGugHaE8%26pid%3DApi&f=1',
        description:' time when students get bonded in very special ways and the true essence of being a CAMBRIAN comes into form',
        date:'12-03-2018'
    },
    {
        id:'5',
        title:'Night party',
        image:'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%3Fid%3DOIP.4pWYz7vPYAP-iWWguvUQmgHaEi%26pid%3DApi&f=1',
        description:' time when students get bonded in very special ways and the true essence of being a CAMBRIAN comes into form',
        date:'12-03-2018'
    }

]
const shareOptions = {
  title: 'Title',
  message: 'Message to share', // Note that according to the documentation at least one of "message" or "url" fields is required
  url: 'www.example.com',
  subject: 'Subject'
};

export default class Upcoming_events_copy extends React.Component{
    constructor(props){
        super(props);
        this.state={};
        this.Listrenderer=this.Listrenderer.bind(this);
    }
    state = {
        loading: true,
        likecount:0,
        isPressed:false,
        isupvoted:false,
        upvotecount:0,
        search_bar_enabled:false,
      }
      toggling=()=>{
        this.setState({search_bar_enabled:!this.state.search_bar_enabled});
      }
      counter=()=>{
        var STORAGE_KEY = 'token';
        if (STORAGE_KEY=this.state.isPressed) {
          return;
        }
        else{
        this.setState({ likecount: this.state.likecount +1});
        this.setState({isPressed:!this.state.isPressed});
        }
       }
       decrementor=()=>{
         if (this.state.likecount==0) {
           return;
         } else {
          this.setState({ likecount: this.state.likecount -1});
          this.setState({isPressed:!this.state.isPressed});
         }
       
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
    Listrenderer=({id,title,icon,tagline,date,like})=>{
        return(
       
<Card style={Styles.card}>
    <CardItem>
<Text style={Styles.title}>Event Name: {title} </Text>
</CardItem>
<Image source={{uri:icon}} style={Styles.image}/>
<CardItem>
<Text style={Styles.title} note numberOfLines={2} >description: {tagline} </Text>  
</CardItem>
<CardItem>
<Text style={Styles.title}>date: {date} </Text>
<Button transparent textStyle={{color: '#87838B'}}>
          <FontAwesome5 name="save" size={24} color="red" />
         <Text style = {{textTransform:'capitalize'}}>save post</Text>
          </Button>
</CardItem>
<CardItem>
<Button transparent textStyle={{color: '#87838B'}}
 style={Styles.buttons} onPress={this.onSharePress}>
          <FontAwesome5 name="share" size={24} color="black" />
         <Text style = {{textTransform:'capitalize'}}>share</Text>
          </Button>
          <Button transparent textStyle={{color: '#87838B'}}  style={Styles.buttons} onPress={this.counter}  onPressIn={this.decrementor}>
          <FontAwesome5 name="heart" size={24} color="black" />
        <Text style = {{textTransform:'capitalize'}}>{like}like</Text>
          </Button>
          <Button transparent textStyle={{color: '#87838B'}}  style={Styles.buttons}>
          <FontAwesome5 name="eye" size={24} color="black" />
         <Text style = {{textTransform:'capitalize'}}>View</Text>
          </Button>
</CardItem>
</Card>

        );
    }
    
    render(){ 
        if (this.state.loading){
        return (
           <View></View>
          );
    }

        return(
<View style={{backgroundColor:'#0E043B'}}>
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
     <FlatList extraData={this.state.likecount}
                pagingEnabled={true}
                showsHorizontalScrollIndicator={false}
                data={eventlist}
                renderItem={({item})=>
                <this.Listrenderer
                id={item.id}
                title={item.title}
                tagline={item.description}
                icon={item.image}
                date={item.date}
                like={this.state.likecount}
              />
            }
          keyExtractor={item => item.id}
              />


</View>
        );
    }
}
const Styles = StyleSheet.create({
title:{
textAlign:'center',
color:'#000',
fontSize:18,
marginRight:15
},
card:{
width:400,
height:500,
},
image:{
    width:400,
    height:250
},
tagline:{

},
buttons:{
    marginRight:35,
}
});