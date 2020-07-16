import React, { Component,useState } from 'react';
import { Image ,StyleSheet,SafeAreaView,FlatList,Dimensions,Share} from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Drawer, View, ListItem, Right, Radio, List, Title, ActionSheet, Item, Input } from 'native-base';
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
import { EvilIcons,AntDesign,FontAwesome5,Entypo} from '@expo/vector-icons';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { ScrollView } from 'react-native-gesture-handler';
import Headingbar from '../Homestack/Header';
const { width: screenWidth } = Dimensions.get('window');
const followerslist =[
  {
   iconname:'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn0.iconfinder.com%2Fdata%2Ficons%2Fuser-pictures%2F100%2Fmaturewoman-3-512.png&f=1&nofb=1',
   username:'Robert',
   tagline:'user tagline here',
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',

  },
  {
   iconname:'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn3.iconfinder.com%2Fdata%2Ficons%2Favatars-15%2F64%2F_Ninja-2-512.png&f=1&nofb=1',
   username:'Hellen vestr',
   tagline:'user tagline here',
   id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
  },
  {
   iconname:'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn1.iconfinder.com%2Fdata%2Ficons%2Favatar-3%2F512%2FPolice-512.png&f=1&nofb=1',
   username:'David',
   tagline:'user tagline here',
   id: '3ac68afc-c605-48d3-a4f8-fbd91aa97ffh',
  },
  {
   iconname:'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.q4eUNekkKecXzcmJNlUA1AHaHa%26pid%3DApi&f=1',
   username:'Ricky ras',
   tagline:'user tagline here',
   id: '3ac68afc-c605-48d3-a4f8-fbd91aa97sdf',
  },
  {
   iconname:'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn4.iconfinder.com%2Fdata%2Ficons%2Fuser-avatar-flat-icons%2F512%2FUser_Avatar-04-512.png&f=1&nofb=1',
   username:'Venom catre',
   tagline:'user tagline here',
   id: '3ac68afc-c605-48d3-a4f8-fbd91aa94fegfvef',
  },
  {
    iconname:'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn0.iconfinder.com%2Fdata%2Ficons%2Fuser-pictures%2F100%2Fmaturewoman-3-512.png&f=1&nofb=1',
    username:'Rober',
    tagline:'user tagline here',
     id: 'bd7acbea-c1b1-46c2-aed5-3ad5vhji',
 
   },
   {
    iconname:'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn3.iconfinder.com%2Fdata%2Ficons%2Favatars-15%2F64%2F_Ninja-2-512.png&f=1&nofb=1',
    username:'Hellen vestr',
    tagline:'user tagline here',
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97frs3',
   },
   {
    iconname:'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn1.iconfinder.com%2Fdata%2Ficons%2Favatar-3%2F512%2FPolice-512.png&f=1&nofb=1',
    username:'David',
    tagline:'user tagline here',
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97ssh',
   },
   {
    iconname:'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.q4eUNekkKecXzcmJNlUA1AHaHa%26pid%3DApi&f=1',
    username:'Ricky ras',
    tagline:'user tagline here',
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97yuf',
   },
   {
    iconname:'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn4.iconfinder.com%2Fdata%2Ficons%2Fuser-avatar-flat-icons%2F512%2FUser_Avatar-04-512.png&f=1&nofb=1',
    username:'Venom catre',
    tagline:'user tagline here',
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa94fklh',
   }

];

function  Listrenderer({user,tag,icon}) {
    return(
        <List>
        <ListItem thumbnail>
          <Left>
            <Thumbnail square source={{uri:icon}} />
          </Left>
          <Body>
    <Text>{user}</Text>
    <Text note numberOfLines={1}>{tag}</Text>
          </Body>
          <Right>
            <Button style = {styles.follow}>
              <Text>following</Text>
            </Button>
          </Right>
        </ListItem>
      </List>
    );
 }    

export default class Follower extends React.Component{
    constructor(props){
        super(props);
    }


    state = {
        loading: true,
        search_bar_enabled:false,
      }
      toggling=()=>{
        this.setState({search_bar_enabled:!this.state.search_bar_enabled});
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
    if (this.state.loading){
        return (
            <Container></Container>
          );
    }


    return (
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
<FlatList
        data={followerslist}
     renderItem={({ item }) => ( 
            <Listrenderer
              id={item.id}
              user={item.username}
              tag={item.tagline}
              icon={item.iconname}
            />
          )}
        keyExtractor={item => item.id}
        />

</Container>

    );
}
}




const styles = StyleSheet.create({
    follow:{
        backgroundColor:'#053e42'
      },
search:{
    backgroundColor:'#053e42'
},
following:{
    marginLeft:20,
    fontSize:25,
    fontWeight:'500'
}
})
