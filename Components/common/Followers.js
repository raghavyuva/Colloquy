import React, { Component,useState } from 'react';
import { Image ,StyleSheet,SafeAreaView,FlatList,Dimensions} from 'react-native';
import { Container, Header, Content, List, ListItem, Thumbnail, Text, Left, Body, Right, Button ,TextInput,Item,Icon,Input} from 'native-base';
import { EvilIcons,AntDesign,FontAwesome5,Entypo} from '@expo/vector-icons';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { ScrollView } from 'react-native-gesture-handler';
import Headingbar from './Header';
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
        loading: true
      }
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
<Headingbar/>
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
