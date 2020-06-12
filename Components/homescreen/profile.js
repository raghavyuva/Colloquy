import React, { Component } from 'react';
import { Image ,StyleSheet} from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body } from 'native-base';
import { EvilIcons,AntDesign,FontAwesome5} from '@expo/vector-icons';


export default class blogpage extends Component {
  constructor(props){
    super(props);
}

  render() {   
    return (
      <Container>
        <Header style = {styles.header}>
          <Left>
          <Text style = {styles.feeds}>Feeds</Text>
          </Left>
        </Header>
        <Content>
          <Card style={styles.card}>
            <CardItem>
              <Body>
                <Image source={{uri: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Flerablog.org%2Fwp-content%2Fuploads%2F2018%2F01%2Fgtrgrtgfgfgs.jpg&f=1&nofb=1'}} style={{height: 400, width: 350, flex: 1}}/>
                <Text>
                  my first post gefgewgfgedfgedugd
                </Text>
              </Body>
            </CardItem>
            <CardItem>
              <Left>
                <Thumbnail source={{uri: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.q4eUNekkKecXzcmJNlUA1AHaHa%26pid%3DApi&f=1'}} />
                <Body>
                  <Text>hayley barnes</Text>
                  <Text note>April 15, 2048</Text>
                </Body>
                <Button style = {styles.follow}><Text>follow</Text></Button>
              </Left>
            </CardItem>
            <CardItem>
              
              <Left>
                <Button transparent textStyle={{color: '#87838B'}}>
                <EvilIcons name="comment" size={24} color="black" />
                  <Text style = {{textTransform:'capitalize'}}>20 Comments</Text>
                </Button>
                <Button transparent textStyle={{color: '#87838B'}}>
                <AntDesign name="heart" size={24} color="black" />
               <Text style = {{textTransform:'capitalize'}}>1k Likes</Text>
                </Button>
                <Button transparent textStyle={{color: '#87838B'}}>
                <FontAwesome5 name="share" size={24} color="black" />
               <Text style = {{textTransform:'capitalize'}}>share</Text>
                </Button>
              </Left>
            </CardItem>
          </Card>
          <Card style={styles.card}>
            <CardItem>
              <Body>
                <Image source={{uri: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Flerablog.org%2Fwp-content%2Fuploads%2F2018%2F01%2Fgtrgrtgfgfgs.jpg&f=1&nofb=1'}} style={{height: 400, width: 350, flex: 1}}/>
                <Text>
                  my first post gefgewgfgedfgedugd
                </Text>
              </Body>
            </CardItem>
            <CardItem>
              <Left>
                <Thumbnail source={{uri: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.q4eUNekkKecXzcmJNlUA1AHaHa%26pid%3DApi&f=1'}} />
                <Body>
                  <Text>hayley barnes</Text>
                  <Text note>April 15, 2048</Text>
                </Body>
                <Button style = {styles.follow}><Text>following</Text></Button>
              </Left>
            </CardItem>
            <CardItem>
              
              <Left>
                <Button transparent textStyle={{color: '#87838B'}}>
                <EvilIcons name="comment" size={24} color="black" />
                  <Text style = {{textTransform:'capitalize'}}>20 Comments</Text>
                </Button>
                <Button transparent textStyle={{color: '#87838B'}}>
                <AntDesign name="heart" size={24} color="black" />
               <Text style = {{textTransform:'capitalize'}}>1k Likes</Text>
                </Button>
                <Button transparent textStyle={{color: '#87838B'}}>
                <FontAwesome5 name="share" size={24} color="black" />
               <Text style = {{textTransform:'capitalize'}}>share</Text>
                </Button>
              </Left>
            </CardItem>
          </Card>
        </Content>
        
      </Container>
      
    );
  }
}

const styles = StyleSheet.create({
header:{
  backgroundColor:'#223343'
},
feeds:{
  color:"#FFF",
  fontSize:26,
},
card:{
  flex:0,
},
follow:{
  backgroundColor:'red'
},

})