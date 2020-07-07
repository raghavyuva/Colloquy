import React, { Component,useState } from 'react';
import { Image ,StyleSheet,SafeAreaView,FlatList,Dimensions} from 'react-native';
import { Container, Header, Content, List, ListItem, Thumbnail, Text, Left, Body, Right, Button ,TextInput,Item,Icon,Input,Title, View,} from 'native-base';
import { EvilIcons,AntDesign,FontAwesome5,Entypo} from '@expo/vector-icons';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { ScrollView } from 'react-native-gesture-handler';
import Headingbar from '../common/Header';
//import { Actions } from 'react-native-router-flux';
const { width: screenWidth } = Dimensions.get('window');
const notificationlist_for_today =[
  {
   userpic:'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn0.iconfinder.com%2Fdata%2Ficons%2Fuser-pictures%2F100%2Fmaturewoman-3-512.png&f=1&nofb=1',
   icontop:'comment',
   username:'Robert',
   tagline:'one line description here',
   description:' mentioned you in a comment',
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',

  },
  {
   userpic:'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn3.iconfinder.com%2Fdata%2Ficons%2Favatars-15%2F64%2F_Ninja-2-512.png&f=1&nofb=1',
   icontop:'heart',
   username:'Hellen vestr',
   tagline:'one line description here',
   description:' liked your photo',
   id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
  },


];

const notificationlist_for_yesterday =[
    {
        userpic:'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn1.iconfinder.com%2Fdata%2Ficons%2Favatar-3%2F512%2FPolice-512.png&f=1&nofb=1',
        icontop:'user',
        username:'David',
        tagline:'one line description here',
        description:' started following you',
        id: '3ac68afc-c605-48d3-a4f8-fbd91aa97ffh',
       },
       {
        userpic:'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.q4eUNekkKecXzcmJNlUA1AHaHa%26pid%3DApi&f=1',
        icontop:'pencil',
        username:'Ricky ras',
        description:' shared a notes to your classroom',
        tagline:'one line description here',
        id: '3ac68afc-c605-48d3-a4f8-fbd91aa97sdf',
       },
       {
        userpic:'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn4.iconfinder.com%2Fdata%2Ficons%2Fuser-avatar-flat-icons%2F512%2FUser_Avatar-04-512.png&f=1&nofb=1',
        icontop:'star',
        username:'Venom catre',
        tagline:'one line description here',
        description:' upvoted to your post',
        id: '3ac68afc-c605-48d3-a4f8-fbd91aa94fegfvef',
       },
]

function  Listrenderer({user,tag,icon,liner,topicon}) {
    return(
      <Content>
        <List>
      <ListItem thumbnail>
        <Left>
          <Thumbnail square source={{ uri: icon }} />
          <EvilIcons name={topicon} size={14} color="green" />
        </Left>
        <Body>
          <Text>{user + liner }
          </Text>
    <Text note numberOfLines={1}>{tag}</Text>
        </Body>
        <Right>
          <Button transparent /*onPress={()=>Actions.likedpeople()}*/ onPress={()=>this.props.navigation.navigate('likedpeople')}>
            <Text style = {styles.view}>View</Text>
          </Button>
        </Right>
      </ListItem>
    </List>
    </Content>
    );
 }    

export default class notifications extends React.Component{
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
           <View></View>
          );
    }


    return (
        <View>
<Headingbar/>

<Text style = {{color:'black'}}>Today</Text>
<FlatList

        data={notificationlist_for_today}
     renderItem={({ item }) => ( 
            <Listrenderer
              id={item.id}
              user={item.username}
              tag={item.tagline}
              icon={item.userpic}
              liner={item.description}
              topicon={item.icontop}
            />
          )}
        keyExtractor={item => item.id}
        />
     <Text style = {{color:'black'}}>Yesterday</Text>   
        <FlatList
        data={notificationlist_for_yesterday}
     renderItem={({ item }) => ( 
            <Listrenderer
              id={item.id}
              user={item.username}
              tag={item.tagline}
              icon={item.userpic}
              liner={item.description}
              topicon={item.icontop}
            />
          )}
        keyExtractor={item => item.id}
        />
       
       </View>

    );
}
}



const styles = StyleSheet.create({
    header:{
        backgroundColor:'#0E043B',
    },
    feeds:{
      color:"#FFF",
      fontSize:26,
     marginTop:10
    },
    follow:{
      backgroundColor:'#053e42'
    },
    view:{
        color:'#053e42'
    }
    })