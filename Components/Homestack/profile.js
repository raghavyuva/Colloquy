import React, { Component } from 'react';
import { StyleSheet,FlatList,ScrollView} from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body,Title,Right, List,ListItem,View} from 'native-base';
import { EvilIcons,AntDesign,FontAwesome5,MaterialCommunityIcons,Ionicons} from '@expo/vector-icons';
import FeedComponent from '../common/Feedscreencopy';
import * as Font from 'expo-font';
import Headingbar from '../common/Header';
const profiledetails =[
  {
id:'1',
username:'Tarest',
userpic:'https://randomuser.me/api/portraits/men/11.jpg',
tagline:'developer, Engineering student,pro skilled Programmer,indian  geek',
usn:'1cd15cs098'
  }
]

export default class profile extends Component {
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
logoutpress=()=>{
  
}
Listrenderer =({id,pic,user,tag,usn})=>{
  return(
<Content>
  <ScrollView>
<Card style ={styles.card}>
<List>
  <ListItem>
  <Thumbnail source ={{uri:pic}} large style={{width:200,height:160}}/>
  </ListItem>
  <ListItem>
  <Left>
  <Text style={styles.text}>{user}</Text> 
  </Left>
  </ListItem>
  <ListItem>

  <Text  style={styles.text}>{tag}</Text>
  
  </ListItem>
  <ListItem>

  <Text  style={styles.text}>{usn}</Text>
  </ListItem>
  </List>
</Card>
<Button style={styles.edit}><Text>Edit profile</Text></Button>


<Text style ={styles.recent}>Recent Posts</Text>

<FeedComponent/>
</ScrollView>
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
                pagingEnabled={true}
                showsHorizontalScrollIndicator={false}
                data={profiledetails}
                renderItem={({item})=>
                <this.Listrenderer
                id={item.id}
                user={item.username}
				tag={item.tagline}
                pic={item.userpic}
                usn={item.usn}
              />
            }
          keyExtractor={item => item.id}
              />
           
         
      </Container>
      
    );
  }
}

const styles = StyleSheet.create({
header:{
  backgroundColor:'#223343'
},
feeds:{
  color:"#FFF",
  fontSize:26,
},
card:{
 justifyContent:'center',
 alignSelf:'center',
 width:400,
 height:400,
 alignItems:'center',
 backgroundColor:'#0E043B',
},
follow:{
  backgroundColor:'red'
},
text:{
  color:"#FFF"
},
edit:{
  borderRadius:2,
  justifyContent:'center',
  backgroundColor:'black',
  width:400,
  alignSelf:'center'
},
recent:{
  fontSize:26,
  backgroundColor:'#0E043B',
  marginTop:10,
  color:"#FFF"
}

})