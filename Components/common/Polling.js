
import axios from 'axios';
import * as Font from 'expo-font';
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
import React from 'react';
import { Dimensions, FlatList,Share} from 'react-native';
import Headingbar from '../Homestack/Header';
const { width: screenWidth } = Dimensions.get('window');
import { EvilIcons,AntDesign,FontAwesome5,Entypo,Ionicons} from '@expo/vector-icons';

import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
  } from 'react-native-popup-menu';
export default class Polling extends React.Component {
    constructor(props) {
        super(props);
    }

    state = {
        loading: true,
        renderdata:{},
        dataloaded:false,
        votecount:0,
        isPressed:false,
search_bar_enabled:false
    }
    _datafetch = () => {
        axios.get('http://192.168.225.238:3001/poll')
            .then((response) => {
            JSON.stringify(this.setState(this.state.renderdata=response.data))
                console.log('data has been recieved');
            })
            .catch(() => {
                alert('error in recieving data')
            })

    }
    _upload = () => {
        if (!this.state.votecount) {
          console.log('required fields cannot be null')
        }
        else {
        
          fetch("http://192.168.225.238:3001/polls", {
            method: "POST",
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "votecount":this.state.votecount
            })
          })
            .then(res => res.json())
            .then(async (data) => {
              console.log(data)
            })
            alert('success')
        }
      }
    componentDidMount() {
        console.log(data);
    }
    toggling=()=>{
        this.setState({search_bar_enabled:!this.state.search_bar_enabled});
      }
      onSharePress = () => Share.share(shareOptions);
    _votehandler=()=>{
        var STORAGE_KEY = 'token';
        if (STORAGE_KEY=this.state.votecount) {
            return;
          }
          else{
          this.setState({votecount: this.state.votecount +1});
          this.setState({isPressed:!this.state.isPressed});
          }
    }
    _votedecreasor=()=>{
        if (this.state.votecount==0) {
            return;
          } else {
           this.setState({votecount: this.state.votecount -1});
           this.setState({isPressed:!this.state.isPressed});
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
    Listrenderer = ({ id, op1, op2, num1, num2, question, color,opcolor}) => {

        return (
            <Card style={{ backgroundColor: color }}>
                <CardItem style={{ backgroundColor: color,justifyContent:'space-between'}}>
                    <FontAwesome5 name="poll" size={40} color="white"  />
                    <Text style={{ color: 'white' }}> user name </Text>
<Button transparent>
<Menu>
      <MenuTrigger  customStyles={{color:'white',backgroundColor:'red'}} >
      
          <Entypo name="dots-three-vertical" size={24} color="white" />
     </MenuTrigger>
          <MenuOptions>
        <MenuOption onSelect={() => alert(`Save`)}  >
          <CardItem style={{flexDirection:'row'}}>
        <Entypo name="share" size={24} color="red" style={{marginRight:8}}/>
        <Text>share</Text>
        </CardItem>
          </MenuOption>
          </MenuOptions>
    </Menu>
                    </Button>
                    </CardItem>
                    <Text style={{ fontSize: 24, color: 'white' }} note>{question}</Text>
                <CardItem style={{ backgroundColor: color, marginLeft: 50 }}>
                    <Left>
                        <Button style={{ marginRight: 20,backgroundColor:opcolor}} onPress={this._votehandler} onPressIn={this._votedecreasor}>
                            <Text style={{ color: 'white' }} >{op1}</Text>
                        </Button>
                        <Button style={{backgroundColor:opcolor}}>
                            <Text style={{ color: 'white' }} >{op2} </Text>
                        </Button>
                    </Left>
                </CardItem>
                <List style={{ backgroundColor: color }}>
                    <ListItem>
                        <Text style={{ color: 'white' }}> 100 voted for option one </Text>
                    </ListItem>
                    <ListItem>
                        <Text style={{ color: 'white' }}> 200 voted for option two </Text>
                    </ListItem>
                </List>
            </Card>
        );
    }
    render() {
        if (this.state.loading) {
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
                <Button onPress={this._datafetch} transparent style={{flexDirection:'row',justifyContent:'flex-start',backgroundColor:"yellow"}}>
                <Ionicons name="md-refresh-circle" size={32} color="black" />
                    <Text style={{textTransform:'capitalize'}}>refresh</Text>
                    </Button>
                <FlatList

                    data={Object.values(this.state.renderdata)}
                    renderItem={({ item }) => (
                        <this.Listrenderer
                            id={item.id}
                            question={item.question}
                            op1={item.op1}
                            op2={item.op2}
                            num1={item.num1}
                            num2={item.num2}
                            color={item.backgcolor}
                            opcolor={item.opcolor}
                        />
                    )}
                    keyExtractor={item => item.id}
                />
                    
            </Container>
        );
    }
}
