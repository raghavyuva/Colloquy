import { FontAwesome5, Ionicons,Entypo } from '@expo/vector-icons';
import axios from 'axios';
import * as Font from 'expo-font';
import { Button, Card, CardItem, Container, Left, List, ListItem, Text } from 'native-base';
import React from 'react';
import { Dimensions, FlatList } from 'react-native';
import Headingbar from '../common/Header';
const { width: screenWidth } = Dimensions.get('window');
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
                <Headingbar />
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
