import React, { Component } from 'react';
import { Image ,StyleSheet,FlatList,ScrollView} from 'react-native';
import { Container, Header, Content, Button, ListItem, Text, Icon, Left, Body, Right, Switch ,Title} from 'native-base';
import Headingbar from '../common/Header';
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