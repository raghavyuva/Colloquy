import React, { Component } from 'react';
import { Image ,StyleSheet,FlatList,ScrollView} from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body ,Title,Right,DeckSwiper,View,ActionSheet} from 'native-base';
import { EvilIcons,AntDesign,FontAwesome5,Entypo} from '@expo/vector-icons';
const bloginfo =[
    {
    userpic:'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fs.cdpn.io%2F69263%2Fprofile%2Fprofile-512.jpg%3F2&f=1&nofb=1',
    username:'David Rodrigues',
    date:'April 15, 2048',
    description:'my first post gefgewgfgedfgedugd',
    postimage:'https://randomuser.me/api/portraits/men/63.jpg',
   comment:'21',
    likenum:'1k',
    upvotenum:'100',
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    },
    {
        userpic:'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fs.cdpn.io%2F69263%2Fprofile%2Fprofile-512.jpg%3F2&f=1&nofb=1',
        username:'David ',
        date:'April 15, 2048',
        description:'my first post gefgewgfgedfgedugd',
        postimage:'https://randomuser.me/api/portraits/women/87.jpg',
       comment:'21',
        likenum:'1k',
        upvotenum:'100',
        id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
        },
        {
            userpic:'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fs.cdpn.io%2F69263%2Fprofile%2Fprofile-512.jpg%3F2&f=1&nofb=1',
            username:'David Rodrigues',
            date:'April 15, 2048',
            description:'my first post gefgewgfgedfgedugd',
            postimage:'https://randomuser.me/api/portraits/men/21.jpg',
           comment:'21',
            likenum:'1k',
            upvotenum:'100',
            id: '3ac68afc-c605-48d3-a4f8-fbd91aa97ffh',
            },
            {
                userpic:'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fs.cdpn.io%2F69263%2Fprofile%2Fprofile-512.jpg%3F2&f=1&nofb=1',
                username:'David Rodrigues',
                date:'April 15, 2048',
                description:'my first post gefgewgfgedfgedugd',
                postimage:'https://randomuser.me/api/portraits/men/11.jpg',
               comment:'21',
                likenum:'1k',
                upvotenum:'100',
                id: '3ac68afc-c605-48d3-a4f8-fbd91aa97sdf',
                }
]
var BUTTONS = [
  { text: "WhatsApp", icon: "logo-whatsapp", iconColor: "#2c8ef4" },
  { text: "Facebook", icon: "logo-facebook", iconColor: "blue" },
  { text: "Gmail", icon: "mail", iconColor: "#ea943b" },
  { text: "Instagram", icon: "logo-instagram", iconColor: "#fa213b" },
  { text: "Cancel", icon: "close", iconColor: "red" }
];
var CANCEL_INDEX = 4;

export default class FeedComponent extends Component {
  constructor(props){
    super(props);
    this.state={};
}
static navigationOptions = {
  title: 'Sign up',
  headerStyle: { backgroundColor: 'white' },
  headerTitleStyle: { color: 'black',textAlign:'center' },
};
Listrenderer({id,userpic,date,username,description,postimage,likenum,upvotenum,comment}){
    return(
    
    <Card style={styles.card}>
    <CardItem>
        <Left>
          <Thumbnail source={{uri: userpic}} />
          <Body>
             <Text>{username}</Text>
            <Text note>{date} </Text>
          </Body>
          <Button style = {styles.follow}>
          <Entypo name="dots-three-vertical" size={24} color="white" />
          </Button>
        </Left>
      </CardItem>
      <CardItem>
        <Body>
          <Image source={{uri: postimage}} style={{height: 300, width: 380, flex: 1}}/>
          <Text>
           {description}
          </Text>
        </Body>
      </CardItem>
      <CardItem>
        
        <Left>
          <Button transparent textStyle={{color: '#87838B'}}>
          <EvilIcons name="comment" size={24} color="black" />
            <Text style = {{textTransform:'capitalize'}}> {comment} </Text>
          </Button>
          <Button transparent textStyle={{color: '#87838B'}}>
          <AntDesign name="heart" size={24} color="black" />
         <Text style = {{textTransform:'capitalize'}}>{likenum}</Text>
          </Button>
          <Button transparent textStyle={{color: '#87838B'}}  onPress={() =>
    ActionSheet.show(
      {
        options: BUTTONS,
        cancelButtonIndex: CANCEL_INDEX,
        title: "Share to"
      },
      buttonIndex => {
        this.setState({ clicked: BUTTONS[buttonIndex] });
      }
    )}>
          <FontAwesome5 name="share" size={24} color="black" />
         <Text style = {{textTransform:'capitalize'}}>share</Text>
          </Button>
          <Button transparent>
          <FontAwesome5 name="hand-point-up" size={24} color="black" />
          <Text style = {{textTransform:'capitalize'}}>{upvotenum}</Text>
          </Button>
        </Left>
      </CardItem>

    </Card>
   
    );
       
}

  render() {   
    return (
     
    <Container style ={{flex:1}}>
       
          
       <DeckSwiper
            ref={(c) => this._deckSwiper = c}
            dataSource={bloginfo}
            renderItem={this.Listrenderer}
            keyExtractor={item => item.id}
    />
     
        </Container>
      
    );
  }
}

 
const styles = StyleSheet.create({
header:{
  backgroundColor:'#0E043B'
},
feeds:{
  color:"white",
  fontSize:26,
},
card:{
  flex:0,
},
follow:{
  backgroundColor:'#0E043B'
},

})