import React, { Component } from 'react';
import { Image ,StyleSheet,FlatList,ScrollView,Dimensions} from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body ,Title,Right,DeckSwiper,View,ActionSheet,List,ListItem} from 'native-base';
import { EvilIcons,AntDesign,FontAwesome5,Entypo,Ionicons} from '@expo/vector-icons';
import * as Font from 'expo-font';
const { width: screenWidth } = Dimensions.get('window');
const bloginfo =[
    {
    userpic:'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fs.cdpn.io%2F69263%2Fprofile%2Fprofile-512.jpg%3F2&f=1&nofb=1',
    username:'David Rodrigues',
    date:'April 15, 2048',
    description:'my first post gefgewgfgedfgedugd',
    postimage:'https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2F3.bp.blogspot.com%2F-8YfDSThUslI%2FT7j2aFQfBAI%2FAAAAAAAADSU%2Fjx23qdF9jC4%2Fs1600%2Frendom_cuteness_picture_12.jpg&f=1&nofb=1',
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
        postimage:'https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2F2.bp.blogspot.com%2F-lsTkKkC0gRE%2FT7j2X1nwG3I%2FAAAAAAAADSE%2F8QXq-UWXFY4%2Fs1600%2Frendom_cuteness_picture_10.jpg&f=1&nofb=1',
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
            postimage:'https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2F1.bp.blogspot.com%2F-RXbtK-51kio%2FT7j2l0WOH4I%2FAAAAAAAADT0%2FtoDW3LQCEpc%2Fs1600%2Frendom_cuteness_picture_23.jpg&f=1&nofb=1',
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
                postimage:'https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2F3.bp.blogspot.com%2F-pFNagnsnuqA%2FT7j2ZOmZr3I%2FAAAAAAAADSM%2FDbwE9WLHjsE%2Fs1600%2Frendom_cuteness_picture_11.jpg&f=1&nofb=1',
               comment:'21',
                likenum:'1k',
                upvotenum:'100',
                id: '3ac68afc-c605-48d3-a4f8-fbd91aa97sdf',
                }
]
const polloptions = [
  {
      id:'1',
      question:'Should our college organize cultural fest?',
      option1:"yes  we want",
      option2:'No we dont want',
      num1:'100 ',
      num2:'200',
      color:'#0E043B'
  },
  {
      id:'2',
      question:'Whats the fee that we have to pay for this year?',
      option1:"30000",
      option2:'20000',
      num1:'100 ',
      num2:'200',
      color:'red'
  },
  {
      id:'3',
      question:'Should our college organize cultural fest?',
      option1:"yes  we want",
      option2:'No we dont want',
      num1:'100 ',
      num2:'200',
      color:"green"
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
state={
  loading:true,
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
Listrender=({id,option1,option2,num1,num2,question,color})=>{
  return(
    <Card style={{backgroundColor:color,borderColor:'red',height:340,width:screenWidth}}>
    <CardItem style={{backgroundColor:color}}>
        <FontAwesome5 name="poll" size={80} color="white" style={{marginRight:1}} />   
         
  <Text style={{fontSize:24,color:'white'}} numberOfLines={3} note>{question}</Text>
       
    </CardItem>
    <CardItem style={{backgroundColor:color,marginLeft:50}}>
        <Left>
            <Button style={{marginRight:20}}>
  <Text style={{color:'white'}}>{option1}</Text>
            </Button>
            <Button>
                <Text style={{color:'white'}}>{option2} </Text>
            </Button>
        </Left>
    </CardItem>
    <List style={{backgroundColor:color}}>
        <ListItem>
    <Text style={{color:'white'}}> {num1} voted for option one </Text>
    </ListItem>
    <ListItem>
    <Text style={{color:'white'}}> {num2} voted for option two </Text>
    </ListItem>
    </List>
                </Card>
  );
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
    if (this.state.loading) {
      return (
        <View></View>
      );
    } 
    return (
     
<Container>
  
     <Container>
       <DeckSwiper
            ref={(c) => this._deckSwiper = c}
            dataSource={bloginfo}
            renderItem={this.Listrenderer}
            keyExtractor={item => item.id}
    />
  </Container>
  <Container style={{marginTop:140}}>
  <Text style ={styles.recent}>Recent Polls</Text>
      <DeckSwiper
            ref={(k) => this._deckSwiper = k}
            dataSource={polloptions}
            renderItem={this.Listrender}
            keyExtractor={item => item.id}
    />
    </Container>
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
recent:{
  fontSize:26,
  backgroundColor:'#0E043B',
  marginTop:10,
  color:"#FFF"
}
})