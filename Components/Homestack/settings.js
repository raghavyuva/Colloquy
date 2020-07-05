import React, { Component } from 'react';
import { Image ,StyleSheet,FlatList,ScrollView,Dimensions} from 'react-native';
import { Container, Header, Content, Button, ListItem, Text, Icon, Left, Body, Right, Switch ,Title} from 'native-base';
import Headingbar from '../common/Header';
import * as Font from 'expo-font';
const { width: screenWidth } = Dimensions.get('window');
import { EvilIcons,AntDesign,FontAwesome5,MaterialCommunityIcons,Ionicons} from '@expo/vector-icons';
const listofsettings = [
	{
		id:'1',
    opname:"Airoplane mode",
    icon:'airplane',
    tagline:'Do not recieve notifications'
  },
  {
		id:'2',
    opname:"Dark mode",
    icon:'md-bulb',
    tagline:'Switch between themes',
  },
  {
		id:'3',
    opname:"Hide Recent Posts",
    icon:'md-eye',
    tagline:'This will hide recent posts from your profile'
  },
  {
		id:'4',
    opname:"Hide Recent Polls",
    icon:'ios-analytics',
    tagline:'This will hide recent polls from your profile'
  },
  {
		id:'5',
    opname:"Anonymous Poll",
    icon:'user-secret',
    tagline:'people wont come to know  '
	},

]
export default class Settings extends Component {
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
state={
  value:true,
}

	Listrenderer=({opname,icon,tagline})=>{
    
		return(
			<Content>
			<ListItem icon style={{marginTop:15}}>
			  <Left>
				<Button style={{ backgroundColor: "#FF9501" }}>
				  <Icon active name={icon} />
				</Button>
			  </Left>
			  <Body>
				<Text style={{color:'white'}}> {opname} </Text>
        <Text note> {tagline} </Text>
			  </Body>
			  <Right>
				<Switch value={this.state.value} onValueChange={()=>this.setState({value: !this.state.value})} style={{color:"red",backgroundColor:"#0E043B"}} trackColor='red'/>
			  </Right>
			</ListItem>
		   
		  </Content>
		);
	}
  render() {
    if (this.state.loading){
      return (
<Container></Container>
        );
  }  
    return (
      <Container style={{backgroundColor:'#0E043B'}}>
<Headingbar/>
		<FlatList
        data={listofsettings}
     renderItem={({ item }) => ( 
            <this.Listrenderer
              id={item.id}
              opname={item.opname}
              icon ={item.icon}
              tagline={item.tagline}
            />
          )}
        keyExtractor={item => item.id}
        />
      </Container>
    );
  }
}