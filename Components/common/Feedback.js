import React, { Component } from 'react';
import { Image ,StyleSheet,FlatList,ScrollView,Dimensions,Share} from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Drawer, View, ListItem, Right, Radio, List, Title, ActionSheet, Item, Input,Form,Label } from 'native-base';
import {
  Avatar,
  TouchableRipple,
  Switch
} from 'react-native-paper';
import { EvilIcons,AntDesign,FontAwesome5,Entypo,Ionicons} from '@expo/vector-icons';
import * as Font from 'expo-font';
import Headingbar from '../Homestack/Header';
import Terms from '../common/Termscondition';
import Privacy from './privacy';
const { width: screenWidth } = Dimensions.get('window');
const shareOptions = {
  title: 'Title',
  message: 'Message to share', // here you can send app link to playstore.
  url: 'www.example.com',
  subject: 'Subject'
};

export default class Feedback extends React.Component{
constructor(props){
    super(props);
}
state={
    loading:true,
    search_bar_enabled:false
}
onSharePress = () => Share.share(shareOptions);
    toggling=()=>{
      this.setState({search_bar_enabled:!this.state.search_bar_enabled});
    }
    async componentDidMount() {
        await Font.loadAsync({
          'Roboto': require('native-base/Fonts/Roboto.ttf'),
          'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
          ...Ionicons.font,
        })
        this.setState({ loading: false })
      }
    render(){
        if (this.state.loading){
            return (
                <Container></Container>
              );
        }
        return(
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
        <Content>
        <Text style={{fontSize:24,fontWeight:'bold',textAlign:'center',backgroundColor:'yellow'}}>Give your feedback</Text>
          <Form>
            <Item floatingLabel>
              <Label>How's Mess food?</Label>
              <Input />
            </Item>
            <Item floatingLabel last>
              <Label>Are you satisfied with the quality of teaching?</Label>
              <Input />
            </Item>
            <Item floatingLabel last>
              <Label>teachers are available after the class?</Label>
              <Input />
            </Item>
            <Item stackedLabel style={styles.submission}>
                    <Button style={styles.submit} onPress={this.onloginpress}  ><Text style={styles.submittext}>Submit</Text></Button>
                  </Item>
          </Form>
        </Content>
            </Container>
        );
    }
}
const styles = StyleSheet.create({
    submission:{
        marginTop:15,
        borderColor:null,
      },
      submit:{
    backgroundColor:'#5F7',
    borderRadius:26,
    width:170,
    justifyContent:'center'
      },
      submittext:{
    color:'black',
    textTransform:'capitalize',
      }
});