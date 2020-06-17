import React from 'react';
import { Dimensions,StyleSheet,View,FlatList,ScrollView,TouchableOpacity,} from 'react-native';
import { Card, Image, Avatar } from 'react-native-elements';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import {Text, CardItem} from 'native-base';

const { width: screenWidth } = Dimensions.get('window');

const followerslist =[
    {
     iconname:'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn0.iconfinder.com%2Fdata%2Ficons%2Fuser-pictures%2F100%2Fmaturewoman-3-512.png&f=1&nofb=1',
     username:'Robert',
     tagline:'user tagline here',
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
  
    },
    {
     iconname:'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn3.iconfinder.com%2Fdata%2Ficons%2Favatars-15%2F64%2F_Ninja-2-512.png&f=1&nofb=1',
     username:'Hellen vestr',
     tagline:'user tagline here',
     id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    },
    {
     iconname:'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn1.iconfinder.com%2Fdata%2Ficons%2Favatar-3%2F512%2FPolice-512.png&f=1&nofb=1',
     username:'David',
     tagline:'user tagline here',
     id: '3ac68afc-c605-48d3-a4f8-fbd91aa97ffh',
    },
    {
     iconname:'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.q4eUNekkKecXzcmJNlUA1AHaHa%26pid%3DApi&f=1',
     username:'Ricky ras',
     tagline:'user tagline here',
     id: '3ac68afc-c605-48d3-a4f8-fbd91aa97sdf',
    },
    {
     iconname:'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn4.iconfinder.com%2Fdata%2Ficons%2Fuser-avatar-flat-icons%2F512%2FUser_Avatar-04-512.png&f=1&nofb=1',
     username:'Venom catre',
     tagline:'user tagline here',
     id: '3ac68afc-c605-48d3-a4f8-fbd91aa94fegfvef',
    },
    {
      iconname:'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn0.iconfinder.com%2Fdata%2Ficons%2Fuser-pictures%2F100%2Fmaturewoman-3-512.png&f=1&nofb=1',
      username:'Rober',
      tagline:'user tagline here',
       id: 'bd7acbea-c1b1-46c2-aed5-3ad5vhji',
   
     },
     {
      iconname:'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn3.iconfinder.com%2Fdata%2Ficons%2Favatars-15%2F64%2F_Ninja-2-512.png&f=1&nofb=1',
      username:'Hellen vestr',
      tagline:'user tagline here',
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97frs3',
     },
     {
      iconname:'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn1.iconfinder.com%2Fdata%2Ficons%2Favatar-3%2F512%2FPolice-512.png&f=1&nofb=1',
      username:'David',
      tagline:'user tagline here',
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97ssh',
     },
     {
      iconname:'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.q4eUNekkKecXzcmJNlUA1AHaHa%26pid%3DApi&f=1',
      username:'Ricky ras',
      tagline:'user tagline here',
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97yuf',
     },
     {
      iconname:'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn4.iconfinder.com%2Fdata%2Ficons%2Fuser-avatar-flat-icons%2F512%2FUser_Avatar-04-512.png&f=1&nofb=1',
      username:'Venom catre',
      tagline:'user tagline here',
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa94fklh',
     }
  
  ];

export default class Avatarcommon  extends React.Component{
  constructor(props){
    super(props);
  }
  
  state = {
    data: {},
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
Listrenderer=({id,user,tag,icon})=>{
    return(
    <CardItem style={styles.carditem}>
        <Card style={{backgroundColor:'yellow'}}>
    <View style={{ justifyContent: 'center', alignContent: 'center', alignItems: 'center', width: 100,backgroundColor:'#0E043B'}}>
        <Avatar rounded size='large' source={{uri:icon}} /> 
        <View style={{paddingTop: 10,}}>
        <TouchableOpacity
          style={styles.follow}
          activeOpacity={0.5}
          >
          <Text style={styles.followtext} >
            Follow
          </Text>
        </TouchableOpacity>
        </View>
        <Text style={styles.title}>
        {user} 
        </Text>
    </View>
    </Card>
  </CardItem> 
    );  
}
  render(){
    if (this.state.loading) {
      return (
        <View></View>
      );
    }
        return(
            <View style={styles.screen}>
              <FlatList
                horizontal
                pagingEnabled={true}
                showsHorizontalScrollIndicator={false}
                data={followerslist}
                renderItem={({item})=>
                <this.Listrenderer
                id={item.id}
                user={item.username}
                tag={item.tagline}
                icon={item.iconname}
              />
            }
          keyExtractor={item => item.id}
              />

            </View>

         
        );
    }
  }



const styles = StyleSheet.create({
screen: {
    flex:1,
    flexDirection: 'column',
},
carditem:{
    backgroundColor:'#0E043B'
},
follow:{
    backgroundColor:'green',
    width:80,
    justifyContent:'center',
},
followtext:{
    color:'#FFF',
    textAlign:"center",
},
title:{
    color:'white'
}
}
);