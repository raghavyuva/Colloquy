import React, { Component } from 'react';
import { Image ,StyleSheet,FlatList,ScrollView} from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body ,Title,Right} from 'native-base';
import { EvilIcons,AntDesign,FontAwesome5,Entypo,Ionicons} from '@expo/vector-icons';
import * as Font from 'expo-font';
import Headingbar from '../common/Header';

const downloadablefile = [
    {
        id:'1',
        source:''
    }
]
export default class Downloadpage extends React.Component{
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
    render(){
        if (this.state.loading){
            return (
                <Container></Container>
              );
        }
        return(
            <Container>
                <Headingbar/>
<Card>
            <CardItem style={{backgroundColor:'red'}}>
              <Body>
                <Text style={{color:'white',fontSize:24,fontWeight:'bold'}}>
                 Downloads
                </Text>
              </Body>
            </CardItem>
                <Text style={{color:'black',fontSize:18,fontWeight:'400'}}>Finished</Text>
        
            <Card style={{backgroundColor:'red',height:200,width:200}}>

            </Card>
          </Card>
            </Container>
        );
    }
}