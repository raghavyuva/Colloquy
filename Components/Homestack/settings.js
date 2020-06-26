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
    icon:'airplane'
  },
  {
		id:'2',
    opname:"Dark mode",
    icon:'md-bulb',
  },
  {
		id:'3',
    opname:"Airoplane mode",
    icon:'wifi',
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
  value:[],
}

	Listrenderer=({opname,icon})=>{
		return(
			<Content>
			<ListItem icon>
			  <Left>
				<Button style={{ backgroundColor: "#FF9501" }}>
				  <Icon active name={icon} />
				</Button>
			  </Left>
			  <Body>
				<Text> {opname} </Text>
			  </Body>
			  <Right>
				<Switch value={false} onValueChange={()=>this.setState({value: !this.state.value})} />
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
      <Container>
<Headingbar/>
		<FlatList
        data={listofsettings}
     renderItem={({ item }) => ( 
            <this.Listrenderer
              id={item.id}
              opname={item.opname}
              icon ={item.icon}
            />
          )}
        keyExtractor={item => item.id}
        />
      </Container>
    );
  }
}