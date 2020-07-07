import React, { Component,useState } from 'react';
import { Image ,StyleSheet,SafeAreaView,FlatList,TouchableOpacity,Dimensions} from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body,Drawer,View,ListItem,Right,Radio, List,Title,Fab} from 'native-base';
import { EvilIcons,AntDesign,FontAwesome5,Entypo} from '@expo/vector-icons';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { ScrollView } from 'react-native-gesture-handler';
import Headingbar from '../common/Header';
//import { Actions } from 'react-native-router-flux';
const { width: screenWidth } = Dimensions.get('window');
export default class ChatTab extends React.Component{
	constructor(props){
		super(props);
	}
	state={
		active:false,
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
	Listrenderer=({id,user,tag,time,message,pic})=>{
		return(

		
			<List>
			<TouchableOpacity /*onPress={()=>Actions.report()}*/ onPress={this.props.navigation.navigate('feedback')}>
            <ListItem avatar>
              <Left>
                <Thumbnail source={{ uri: pic}} />
              </Left>
              <Body>
				 
                <Text>{user} </Text>
                <Text note>{tag} </Text>

              </Body>
			 
              <Right>
			  <Text note style={{color:'green',fontSize:15,fontWeight:'bold'}}>{message}</Text>	  
		<Text note>{time}</Text>
              </Right>
            </ListItem>
			</TouchableOpacity>
          </List>

		);
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
		<Content>
<FlatList
                pagingEnabled={true}
                showsHorizontalScrollIndicator={false}
                data={listofchats}
                renderItem={({item})=>
                <this.Listrenderer
                id={item.id}
                user={item.username}
				tag={item.recent}
				time={item.time}
				message={item.numberofmessage}
                pic={item.userpic}
              />
            }
          keyExtractor={item => item.id}
              />
			 </Content>
			  <Fab
            active={this.state.active}
            direction="up"
            containerStyle={{ }}
            style={{ backgroundColor: '#5067FF' }}
            position="bottomRight"
            onPress={() => this.setState({ active: !this.state.active })}>
          <AntDesign name="pluscircleo" size={24} color="black" />
            <Button style={{ backgroundColor: '#34A34F' }}>
              <Icon name="logo-whatsapp" />
            </Button>
            <Button style={{ backgroundColor: '#3B5998' }}>
              <Icon name="logo-facebook" />
            </Button>
            <Button  style={{ backgroundColor: '#DD5144' }}>
              <Icon name="mail" />
            </Button>
          </Fab>

</Container>
		);
	}
}
const Styles = StyleSheet.create({

});

const listofchats =[
	{
		id:'1',
		username:'Helium',
		userpic:'https://randomuser.me/api/portraits/women/87.jpg',
		time:'10.40 pm',
		numberofmessage:'3',
		recent:'Call me,lets have a party',
	},
	{
		id:'2',
		username:'Cadmium',
		userpic:'https://randomuser.me/api/portraits/men/21.jpg',
		time:'8.30 pm',
		numberofmessage:'9',
		recent:'Hey raghav',
	},
	{
		id:'3',
		username:'john ',
		userpic:'https://randomuser.me/api/portraits/women/8.jpg',
		time:'6.50 pm',
		numberofmessage:'7',
		recent:'call me its urgent',
	},
	{
		id:'4',
		username:'Tarest',
		userpic:'https://randomuser.me/api/portraits/men/11.jpg',
		time:'6.10',
		numberofmessage:'2',
		recent:'Thanks for the treat',
	},
	{
		id:'5',
		username:'Owela Enizuela',
		userpic:'https://randomuser.me/api/portraits/men/50.jpg',
		time:'5.00 pm',
		numberofmessage:'8',
		recent:'i saw you there',
	},
	{
		id:'6',
		username:'Heaster',
		userpic:'https://randomuser.me/api/portraits/women/77.jpg',
		time:'4.15 pm',
		numberofmessage:'6',
		recent:'please help me out',
	},
	{
		id:'7',
		username:'Balrace',
		userpic:'https://randomuser.me/api/portraits/men/63.jpg',
		time:'3.0 pm',
		numberofmessage:'4',
		recent:'myself Balrance',
	},
	{
		id:'8',
		username:'Christopher',
		userpic:'https://randomuser.me/api/portraits/men/27.jpg',
		time:'2.50 pm',
		numberofmessage:'3',
		recent:'meet me tomorrow',
	},
	{
		id:'9',
		username:'Kallius',
		userpic:'https://randomuser.me/api/portraits/men/44.jpg',
		time:'1.08 pm',
		numberofmessage:'6',
		recent:'ok,fine no probs',
	},
	{
		id:'10',
		username:'Sherry',
		userpic:'https://randomuser.me/api/portraits/men/3.jpg',
		time:'12.00 am',
		numberofmessage:'8',
		recent:'pop up notification',
	},
	{
		id:'11',
		username:'Helium',
		userpic:'https://randomuser.me/api/portraits/women/87.jpg',
		time:'10.40 am',
		numberofmessage:'3',
		recent:'Call me,lets have a party',
	},
	{
		id:'12',
		username:'Cadmium',
		userpic:'https://randomuser.me/api/portraits/men/21.jpg',
		time:'8.30 am',
		numberofmessage:'9',
		recent:'Hey raghav',
	},
	{
		id:'13',
		username:'john ',
		userpic:'https://randomuser.me/api/portraits/women/8.jpg',
		time:'6.50 am',
		numberofmessage:'7',
		recent:'call me its urgent',
	},

]
