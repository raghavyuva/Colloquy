import React, { Component } from 'react';
import { Image ,StyleSheet,FlatList,ScrollView,Dimensions} from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body ,Title,Right, List, ListItem} from 'native-base';
import { EvilIcons,AntDesign,FontAwesome5,Entypo,Ionicons} from '@expo/vector-icons';
import * as Font from 'expo-font';
import Headingbar from '../common/Header';
import { View } from 'react-native-animatable';
const { width: screenWidth } = Dimensions.get('window');
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
export default class Pollingcopy extends React.Component{
constructor(props){
    super(props);
}
state={
    loading:true,
}
    async componentDidMount() {
        await Font.loadAsync({
          'Roboto': require('native-base/Fonts/Roboto.ttf'),
          'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
          ...Ionicons.font,
        })
        this.setState({ loading: false })
      }
      Listrenderer=({id,op1,op2,num1,num2,question,color})=>{
          return(
            <Card style={{backgroundColor:color,borderColor:'red',height:340,width:screenWidth-20}}>
            <CardItem style={{backgroundColor:color}}>
                <FontAwesome5 name="poll" size={80} color="white" style={{marginRight:10}} />   
                 
          <Text style={{fontSize:24,color:'white'}} numberOfLines={3}>{question}</Text>
               
            </CardItem>
            <CardItem style={{backgroundColor:color,marginLeft:50}}>
                <Left>
                    <Button style={{marginRight:20}}>
          <Text style={{color:'white'}}>{op1}</Text>
                    </Button>
                    <Button>
                        <Text style={{color:'white'}}>{op2} </Text>
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
    render(){
        if (this.state.loading){
            return (
              <View></View>
              );
        }
        return(
            <View>
 <FlatList
         horizontal
         data={polloptions}
      renderItem={({ item }) => ( 
             <this.Listrenderer
               id={item.id}
               question={item.question}
               op1={item.option1}
               op2={item.option2}
               num1={item.num1}
               num2={item.num2}
               color={item.color}
             />
           )}
         keyExtractor={item => item.id}
         />
          </View>
        );
    }
}
