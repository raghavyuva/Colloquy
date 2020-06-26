import React, { Component,useState } from 'react';
import { Image ,StyleSheet,SafeAreaView,FlatList,View,Dimensions} from 'react-native';
import { Container, Header,Text, Left, Body, Right, Button ,TextInput,Item,Icon,Input,CardItem,Title,Footer} from 'native-base';
import { EvilIcons,AntDesign,FontAwesome5,Entypo,MaterialCommunityIcons} from '@expo/vector-icons';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import Carousel from '../common/carousel';
import Avatarcommon from '../common/Avatar';
import Upcoming_events from '../common/upcomingevents';
const { width: screenWidth } = Dimensions.get('window');
import Notessharedcopy from '../common/notescomponentcopy';
import Headingbar from '../common/Header';
import { Actions } from 'react-native-router-flux';
import Classroomcopy from '../common/classroomcopy';
import Pollingcopy from '../common/Pollingcopy';
export default class homescreen extends React.Component{
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
         <View></View>
        );
  }
    return(
<View >
 
<Headingbar />

    <ScrollView style={{backgroundColor:'#0E043B'}}>
    <CardItem style={Styles.carditem}> 
    <Left>
<Text style={Styles.notificationtop} note numberOfLines={2}>Howdy Raghav, There's  upcoming event waiting for you take a look at it once,</Text>
</Left>

<Button onPress={()=>Actions.notification()}>
  <Text>view</Text>
</Button>
</CardItem>
  <View>
    <Text style ={Styles.heading}>Trending Feeds</Text>
<Carousel/>
</View>

<View>
  <Text style ={Styles.heading}>Follow Cambrian</Text>
<Avatarcommon />
</View>
<View>
<Text style ={Styles.heading}>Upcoming Events</Text>
  <Upcoming_events/>
</View>
<View>
<Text style ={Styles.heading}>Shared Notes</Text>
<Notessharedcopy/>
</View>
<View>
<Text style ={Styles.heading}>Branch People</Text>
<Classroomcopy/>
</View>
<View>
  <Text style ={Styles.heading}>Trending Polls</Text>
  <Pollingcopy/>
</View>
</ScrollView>
</View>
    );
    
  }
}
const Styles =StyleSheet.create({
heading:{
fontSize:24,
backgroundColor:'#053e42',
color:'white',
paddingLeft:20,
},
carditem:{
  backgroundColor:'black',
  height:100,
},
notificationtop:{
  color:'white',
  fontSize:15,
  marginLeft:10,
},
Header:{
  backgroundColor:'#0E043B',
},
headercarditem:{
  backgroundColor:'#0E043B',
  color:'white',
}
});
