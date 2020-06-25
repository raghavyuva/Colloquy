import React, { Component } from 'react';
import { Image ,StyleSheet,FlatList,ScrollView} from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body ,Title,Right,List,ListItem} from 'native-base';
import { EvilIcons,AntDesign,FontAwesome5,Entypo,Ionicons} from '@expo/vector-icons';
import * as Font from 'expo-font';
import Headingbar from '../common/Header';

const sameusn =[
    {
     iconname:'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn0.iconfinder.com%2Fdata%2Ficons%2Fuser-pictures%2F100%2Fmaturewoman-3-512.png&f=1&nofb=1',
     username:'Robert',
     usn:'1cd15is001',
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
  
    },
    {
     iconname:'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn3.iconfinder.com%2Fdata%2Ficons%2Favatars-15%2F64%2F_Ninja-2-512.png&f=1&nofb=1',
     username:'Hellen vestr',
     usn:'1cd15is002',
     id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    },
    {
     iconname:'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn1.iconfinder.com%2Fdata%2Ficons%2Favatar-3%2F512%2FPolice-512.png&f=1&nofb=1',
     username:'David',
     usn:'1cd15is003',
     id: '3ac68afc-c605-48d3-a4f8-fbd91aa97ffh',
    },
    {
     iconname:'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.q4eUNekkKecXzcmJNlUA1AHaHa%26pid%3DApi&f=1',
     username:'Ricky ras',
     usn:'1cd15is004',
     id: '3ac68afc-c605-48d3-a4f8-fbd91aa97sdf',
    },
    {
     iconname:'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn4.iconfinder.com%2Fdata%2Ficons%2Fuser-avatar-flat-icons%2F512%2FUser_Avatar-04-512.png&f=1&nofb=1',
     username:'Venom catre',
     usn:'1cd15is005',
     id: '3ac68afc-c605-48d3-a4f8-fbd91aa94fegfvef',
    },
    {
      iconname:'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn0.iconfinder.com%2Fdata%2Ficons%2Fuser-pictures%2F100%2Fmaturewoman-3-512.png&f=1&nofb=1',
      username:'Rober',
      usn:'1cd15is006',
       id: 'bd7acbea-c1b1-46c2-aed5-3ad5vhji',
   
     },
     {
      iconname:'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn3.iconfinder.com%2Fdata%2Ficons%2Favatars-15%2F64%2F_Ninja-2-512.png&f=1&nofb=1',
      username:'Hellen vestr',
      usn:'1cd15is007',
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97frs3',
     },
     {
      iconname:'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn1.iconfinder.com%2Fdata%2Ficons%2Favatar-3%2F512%2FPolice-512.png&f=1&nofb=1',
      username:'David',
      usn:'1cd15is008',
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97ssh',
     },
     {
      iconname:'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.q4eUNekkKecXzcmJNlUA1AHaHa%26pid%3DApi&f=1',
      username:'Ricky ras',
      usn:'1cd15is009',
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97yuf',
     },
     {
      iconname:'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn4.iconfinder.com%2Fdata%2Ficons%2Fuser-avatar-flat-icons%2F512%2FUser_Avatar-04-512.png&f=1&nofb=1',
      username:'Venom catre',
      usn:'1cd15is010',
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa94fklh',
     }
  
  ];
  
  function  Listrenderer({user,usn,icon}) {
      return(
          <List>
          <ListItem thumbnail>
            <Left>
              <Thumbnail square source={{uri:icon}} />
            </Left>
            <Body>
      <Text>{user}</Text>
      <Text note numberOfLines={1}>{usn}</Text>
            </Body>
            <Right>
              <Button style = {styles.follow}>
                <Text>View</Text>
              </Button>
            </Right>
          </ListItem>
        </List>
      );
   }    
  
  export default class Class extends React.Component{
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
  <Text>find your branch people from this page</Text>
  <FlatList
          data={sameusn}
       renderItem={({ item }) => ( 
              <Listrenderer
                id={item.id}
                user={item.username}
                usn={item.usn}
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
  