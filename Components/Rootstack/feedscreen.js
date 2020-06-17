import React, { Component } from 'react';
import { Image ,StyleSheet,FlatList,ScrollView} from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body ,Title,Right} from 'native-base';
import { EvilIcons,AntDesign,FontAwesome5,Entypo} from '@expo/vector-icons';
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
          <Entypo name="dots-three-vertical" size={24} color="white" />
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
          <Button transparent textStyle={{color: '#87838B'}} >
          <AntDesign name="heart" size={24} color="black" />
         <Text style = {{textTransform:'capitalize'}}>{like}</Text>
          </Button>
          <Button transparent textStyle={{color: '#87838B'}}>
          <FontAwesome5 name="share" size={24} color="black" />
         <Text style = {{textTransform:'capitalize'}}>share</Text>
          </Button>
          <Button transparent>
          <FontAwesome5 name="hand-point-up" size={24} color="black" />
          <Text style = {{textTransform:'capitalize'}}>{upvote}</Text>
          </Button>
        </Left>
      </CardItem>
    </Card>
    </ScrollView>
    );
       
}

  render() {   
    return (
    <Container>
      <Header>
          <Left>
            <Button transparent>
              <Icon name='menu' />
            </Button>
          </Left>
          <Body>
            <Title>Feed</Title>
          </Body>
          <Right>
            <Button transparent>
              <Icon name='search' />
            </Button>
            <Button transparent>
              <Icon name='share' />
            </Button>
            <Button transparent>
              <Icon name='settings' />
            </Button>
          </Right>
        </Header>
          <Content>
        <FlatList
        data={bloginfo}
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
            />
          )}
        keyExtractor={item => item.id}
        />
        </Content>
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