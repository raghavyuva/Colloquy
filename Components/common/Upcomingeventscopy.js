import React, { Component,useState } from 'react';
import { Image ,StyleSheet,SafeAreaView,FlatList,View,Dimensions,Share} from 'react-native';
import { Container, Header, Content, List, ListItem, Thumbnail, Text, Left, Body, Right, Button ,TextInput,Item,Icon,Input,Card,CardItem,ActionSheet} from 'native-base';
import { EvilIcons,AntDesign,FontAwesome5,Entypo} from '@expo/vector-icons';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { ScrollView } from 'react-native-gesture-handler';
const { width: screenWidth } = Dimensions.get('window');
import Headingbar from './Header';
const eventlist =[
    {
        id:'1',
        title:'chiguru',
        image:'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.ytimg.com%2Fvi%2F0bXVRPzqUTE%2Fmaxresdefault.jpg&f=1&nofb=1',
        description:' time when students get bonded in very special ways and the true essence of being a CAMBRIAN comes into form',
        date:'12-03-2018'
    },
    {
        id:'2',
        title:'Event',
        image:'http://rsquare2014.com/wp-content/uploads/2017/02/External-Events-banner_2.png',
        description:' time when students get bonded in very special ways and the true essence of being a CAMBRIAN comes into form',
        date:'12-03-2018'
    },
    {
        id:'3',
        title:'Intuit',
        image:'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%3Fid%3DOIP.SyDN_Kx-lsZasFnhW9ZiGAHaEK%26pid%3DApi&f=1',
        description:' time when students get bonded in very special ways and the true essence of being a CAMBRIAN comes into form',
        date:'12-03-2018'
    },
    {
        id:'4',
        title:'Get together',
        image:'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP.oP6RsHt-5-iliHpCGFcGugHaE8%26pid%3DApi&f=1',
        description:' time when students get bonded in very special ways and the true essence of being a CAMBRIAN comes into form',
        date:'12-03-2018'
    },
    {
        id:'5',
        title:'Night party',
        image:'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%3Fid%3DOIP.4pWYz7vPYAP-iWWguvUQmgHaEi%26pid%3DApi&f=1',
        description:' time when students get bonded in very special ways and the true essence of being a CAMBRIAN comes into form',
        date:'12-03-2018'
    }

]
const shareOptions = {
  title: 'Title',
  message: 'Message to share', // Note that according to the documentation at least one of "message" or "url" fields is required
  url: 'www.example.com',
  subject: 'Subject'
};

export default class Upcoming_events_copy extends React.Component{
    constructor(props){
        super(props);
        this.state={};
    }
    state = {
        loading: true
      }
      onSharePress = () => Share.share(shareOptions);
      async componentDidMount() {
        await Font.loadAsync({
          'Roboto': require('native-base/Fonts/Roboto.ttf'),
          'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
          ...Ionicons.font,
        })
        this.setState({ loading: false })
      }
    Listrenderer=({id,title,icon,tagline,date})=>{
        return(
       
<Card style={Styles.card}>
    <CardItem>
<Text style={Styles.title}>Event Name: {title} </Text>
</CardItem>
<Image source={{uri:icon}} style={Styles.image}/>
<CardItem>
<Text style={Styles.title} note numberOfLines={2} >description: {tagline} </Text>  
</CardItem>
<CardItem>
<Text style={Styles.title}>date: {date} </Text>
<Button transparent textStyle={{color: '#87838B'}}>
          <FontAwesome5 name="save" size={24} color="red" />
         <Text style = {{textTransform:'capitalize'}}>save post</Text>
          </Button>
</CardItem>
<CardItem>
<Button transparent textStyle={{color: '#87838B'}}
 style={Styles.buttons} onPress={this.onSharePress}>
          <FontAwesome5 name="share" size={24} color="black" />
         <Text style = {{textTransform:'capitalize'}}>share</Text>
          </Button>
          <Button transparent textStyle={{color: '#87838B'}}  style={Styles.buttons}>
          <FontAwesome5 name="heart" size={24} color="black" />
         <Text style = {{textTransform:'capitalize'}}>like</Text>
          </Button>
          <Button transparent textStyle={{color: '#87838B'}}  style={Styles.buttons}>
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
    <Headingbar/>
     <FlatList
                pagingEnabled={true}
                showsHorizontalScrollIndicator={false}
                data={eventlist}
                renderItem={({item})=>
                <this.Listrenderer
                id={item.id}
                title={item.title}
                tagline={item.description}
                icon={item.image}
                date={item.date}
              />
            }
          keyExtractor={item => item.id}
              />


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
width:400,
height:500,
},
image:{
    width:400,
    height:250
},
tagline:{

},
buttons:{
    marginRight:35,
}
});