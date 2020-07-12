import React, { Component } from 'react';
import { Image ,StyleSheet,FlatList,ScrollView,Dimensions,Share} from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body ,Title,Right} from 'native-base';
import { EvilIcons,AntDesign,FontAwesome5,Entypo,Ionicons,FontAwesome} from '@expo/vector-icons';
import Headingbar from '../common/Header';
import * as Font from 'expo-font';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
const shareOptions = {
  title: 'Title',
  message: 'Message to share', // here you can send app link to playstore.
  url: 'www.example.com',
  subject: 'Subject'
};
const { width: screenWidth } = Dimensions.get('window');
const bloginfo =[
    {
    userpic:'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fs.cdpn.io%2F69263%2Fprofile%2Fprofile-512.jpg%3F2&f=1&nofb=1',
    username:'David Rodrigues',
    date:'April 15, 2048',
    description:'my first post gefgewgfgedfgedugd',
    postimage:'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimages.wallpapersden.com%2Fimage%2Fdownload%2Fsmall-memory_58461_3840x2160.jpg&f=1&nofb=1',
    commentnum:'21',
    likenum:'1k',
    upvotenum:'100',
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    },
    {
        userpic:'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fs.cdpn.io%2F69263%2Fprofile%2Fprofile-512.jpg%3F2&f=1&nofb=1',
        username:'David ',
        date:'April 15, 2048',
        description:'my first post gefgewgfgedfgedugd',
        postimage:'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimages.wallpapersden.com%2Fimage%2Fdownload%2Fsmall-memory_58461_3840x2160.jpg&f=1&nofb=1',
        commentnum:'21',
        likenum:'1k',
        upvotenum:'100',
        id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
        },
        {
            userpic:'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fs.cdpn.io%2F69263%2Fprofile%2Fprofile-512.jpg%3F2&f=1&nofb=1',
            username:'David Rodrigues',
            date:'April 15, 2048',
            description:'my first post gefgewgfgedfgedugd',
            postimage:'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimages.wallpapersden.com%2Fimage%2Fdownload%2Fsmall-memory_58461_3840x2160.jpg&f=1&nofb=1',
            commentnum:'21',
            likenum:'1k',
            upvotenum:'100',
            id: '3ac68afc-c605-48d3-a4f8-fbd91aa97ffh',
            },
            {
                userpic:'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fs.cdpn.io%2F69263%2Fprofile%2Fprofile-512.jpg%3F2&f=1&nofb=1',
                username:'David Rodrigues',
                date:'April 15, 2048',
                description:'my first post gefgewgfgedfgedugd',
                postimage:'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimages.wallpapersden.com%2Fimage%2Fdownload%2Fsmall-memory_58461_3840x2160.jpg&f=1&nofb=1',
                commentnum:'21',
                likenum:'1k',
                upvotenum:'100',
                id: '3ac68afc-c605-48d3-a4f8-fbd91aa97sdf',
                }
]

export default class Blogpage extends Component {
  constructor(props){
    super(props);
    this.Listrenderer=this.Listrenderer.bind(this);
}
onSharePress = () => Share.share(shareOptions);
state = {
  loading: true,
  likecount:0,
  isPressed:false,
  isupvoted:false,
  upvotecount:0
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
 upvoteincreaser=()=>{
  var STORAGE_KEY = 'token';
  if (STORAGE_KEY=this.state.isupvoted) {
    return;
  }
  else{
  this.setState({ upvotecount: this.state.upvotecount +2});
  this.setState({isupvoted:!this.state.isupvoted});
  } 
 }
 upvotedecreaser =()=>{
  if (this.state.upvotecount==0) {
    return;
  } else {
   this.setState({ upvotecount: this.state.upvotecount -2});
   this.setState({isupvoted:!this.state.isupvoted});
  }

 }
async componentDidMount() {
  await Font.loadAsync({
    'Roboto': require('native-base/Fonts/Roboto.ttf'),
    'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
    ...Ionicons.font,
  })
  this.setState({ loading: false })
}
static navigationOptions = {
  title: 'Sign up',
  headerStyle: { backgroundColor: 'white' },
  headerTitleStyle: { color: 'black',textAlign:'center' },
};
Listrenderer({id,user,date,icon,description,postimage,like,comment,upvote}){
    return(
        <ScrollView>
    <Card style={styles.card}>
    <CardItem>
        <Left>
          <Thumbnail source={{uri: icon}} />
          <Body>
             <Text>{user}</Text>
            <Text note>{date} </Text>
          </Body>
          <Button style = {styles.follow}>
          <Menu>
      <MenuTrigger  customStyles={{color:'white',backgroundColor:'red'}} >
      
          <Entypo name="dots-three-vertical" size={24} color="white" />
     </MenuTrigger>
          <MenuOptions>
        <MenuOption   >
          <CardItem style={{flexDirection:'row'}} >

        <Entypo name="share" size={24} color="red" style={{marginRight:8}}onPress={this.onSharePress}/>
        <Text style={{color:"red"}} onPress={this.onSharePress}>share</Text>
  
        </CardItem>
        <CardItem style={{flexDirection:'row'}} >

<Entypo name="download" size={24} color="red" style={{marginRight:8}}/>
<Text style={{color:"red"}} >Download</Text>

</CardItem>
          </MenuOption>
          </MenuOptions>
    </Menu>

          </Button>
        </Left>
      </CardItem>
      <CardItem>
        <Body>
          <Image source={{uri: postimage}} style={{height: 400, width: 380, flex: 1}}/>
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

          <Button transparent textStyle={{color: '#87838B'}} onPress={this.counter}  onPressIn={this.decrementor}>
            {this.state.isPressed==true?(
              <AntDesign name="heart" size={24} color="black" />
            ):
            (
              <AntDesign name="hearto" size={24} color="black" />
            )
          
          }
          
         <Text style = {{textTransform:'capitalize'}}>{like} likes </Text>
          </Button>
          <Button transparent onPress={this.upvoteincreaser}  onPressIn={this.upvotedecreaser}>
            {this.state.isupvoted==true?(
  <FontAwesome5 name="hand-point-up" size={24} color="black" />
            ):(
              <FontAwesome name="hand-o-down" size={24} color="black" />
            )}
        
          <Text style = {{textTransform:'capitalize'}}>{upvote} upvotes</Text>
          </Button>
        </Left>
      </CardItem>
    </Card>
    </ScrollView>
    );
       
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
        data={bloginfo}
        extraData={this.state.likecount,this.state.upvotecount}
     renderItem={({ item }) => ( 
            <this.Listrenderer
              id={item.id}
              user={item.username}
              date={item.date}
              icon={item.userpic}
              description={item.description}
              postimage={item.postimage}
              like={item.likenum}
              comment={item.commentnum}
              upvote={item.upvotenum}
              like={this.state.likecount}
              upvote={this.state.upvotecount}
            />
          )}
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