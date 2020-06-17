import React, { Component,useState } from 'react';
import { Image ,StyleSheet,SafeAreaView,FlatList,View,Dimensions} from 'react-native';
import { Container, Header, Content, List, ListItem, Thumbnail, Text, Left, Body, Right, Button ,TextInput,Item,Icon,Input,Card,CardItem} from 'native-base';
import { EvilIcons,AntDesign,FontAwesome5,Entypo} from '@expo/vector-icons';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { ScrollView } from 'react-native-gesture-handler';

const noteinfo =[
    {
        id:'1',
        sharedperson:'daniel',
        sharednotes:'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.ytimg.com%2Fvi%2F0bXVRPzqUTE%2Fmaxresdefault.jpg&f=1&nofb=1',
        notesname:'javascript and its complete guide',
    },
    {
        id:'2',
        sharedperson:'raghav',
        sharednotes:'http://rsquare2014.com/wp-content/uploads/2017/02/External-Events-banner_2.png',
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
export default class Upcoming_events extends React.Component{
    constructor(props){
        super(props);
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
<Button transparent textStyle={{color: '#87838B'}}>
          <FontAwesome5 name="save" size={24} color="red" />
         <Text style = {{textTransform:'capitalize'}}>save notes</Text>
          </Button>
</CardItem>
<CardItem>
<Button transparent textStyle={{color: '#87838B'}}>
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