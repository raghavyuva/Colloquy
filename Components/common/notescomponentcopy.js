import React, { Component,useState } from 'react';
import { Image ,StyleSheet,SafeAreaView,FlatList,View,Dimensions,Share} from 'react-native';
import { Container, Header, Content, List, ListItem, Thumbnail, Text, Left, Body, Right, Button ,TextInput,Item,Icon,Input,Card,CardItem,ActionSheet} from 'native-base';
import { EvilIcons,AntDesign,FontAwesome5,Entypo} from '@expo/vector-icons';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { ScrollView } from 'react-native-gesture-handler';
const { width: screenWidth } = Dimensions.get('window');
const noteinfo =[
    {
        id:'1',
        sharedperson:'daniel',
        sharednotes:'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP.2cXlf0nckerE9yp0PNyfsAHaDZ%26pid%3DApi&f=1',
        notesname:'javascript and its complete guide',
    },
    {
        id:'2',
        sharedperson:'raghav',
        sharednotes:'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimage.slidesharecdn.com%2Fstrategicchangeinterventionsv05-131023015437-phpapp01%2F95%2Fstrategic-change-interventions-12-638.jpg%3Fcb%3D1382493447&f=1&nofb=1',
        notesname:'structures of networking',
    },
    {
        id:'3',
        sharedperson:'rasif',
        sharednotes:'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%3Fid%3DOIP.SyDN_Kx-lsZasFnhW9ZiGAHaEK%26pid%3DApi&f=1',
        notesname:'working on machines',
    },
    {
        id:'4',
        sharedperson:'harry',
        sharednotes:'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP.oP6RsHt-5-iliHpCGFcGugHaE8%26pid%3DApi&f=1',
        notesname:'structural engineering',
    },
    {
        id:'5',
        sharedperson:'stephen',
        sharednotes:'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%3Fid%3DOIP.4pWYz7vPYAP-iWWguvUQmgHaEi%26pid%3DApi&f=1',
        notesname:'Semiconductors and light emitting diode',
    },
]
const shareOptions = {
  title: 'Title',
  message: 'Message to share', // Note that according to the documentation at least one of "message" or "url" fields is required
  url: 'www.example.com',
  subject: 'Subject'
};
  
export default class Notescomponent extends React.Component{
    constructor(props){
        super(props);
        this.state = {};
    }
    state = {
        loading: true
      }
      async componentDidMount() {
        await Font.loadAsync({
          'Roboto': require('native-base/Fonts/Roboto.ttf'),
          'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
          ...Ionicons.font,
        })
        this.setState({ loading: false })
      }
      onSharePress = () => Share.share(shareOptions);
_Downloadfile=()=>{
  
        



}

    Listrenderer=({id,sharednotes,sharedperson,notesname})=>{
        return(
       
<Card style={Styles.card}>
    <CardItem>
<Text style={Styles.title}>Notes Name: {notesname} </Text>
</CardItem>
<Image source={{uri:sharednotes}} style={Styles.image}/>
<CardItem>
<Text style={Styles.title}>shared by: {sharedperson} </Text>
<Button transparent textStyle={{color: '#87838B'}} onPress ={this._Downloadfile}>
          <FontAwesome5 name="download" size={24} color="red" />
         <Text style = {{textTransform:'capitalize'}}>Download</Text>
          </Button>
</CardItem>
<CardItem>
<Button transparent textStyle={{color: '#87838B'}}

onPress={this.onSharePress}
>
          <FontAwesome5 name="share" size={24} color="black" />
         <Text style = {{textTransform:'capitalize'}}>share</Text>
          </Button>
          <Button transparent textStyle={{color: '#87838B'}}>
          <FontAwesome5 name="heart" size={24} color="black" />
         <Text style = {{textTransform:'capitalize'}}>like</Text>
          </Button>
          <Button transparent textStyle={{color: '#87838B'}}>
          <FontAwesome5 name="eye" size={24} color="black" />
         <Text style = {{textTransform:'capitalize'}}>View</Text>
          </Button>
</CardItem>
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
<View style={{backgroundColor:'#0E043B'}}>
    <ScrollView>
     <FlatList
                horizontal
                pagingEnabled={true}
                showsHorizontalScrollIndicator={false}
                data={noteinfo}
                renderItem={({item})=>
                <this.Listrenderer
                id={item.id}
                sharedperson={item.sharedperson}
                notesname={item.notesname}
                sharednotes={item.sharednotes}
              />
            }
          keyExtractor={item => item.id}
              />

</ScrollView>
</View>
        );
    }
}
const Styles = StyleSheet.create({
title:{
textAlign:'center',
color:'#000',
fontSize:18,
marginRight:15
},
card:{
width:300,
height:500,
},
image:{
    width:300,
    height:250
},
tagline:{

}
});