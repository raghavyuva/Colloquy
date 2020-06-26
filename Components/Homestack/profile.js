import React, { Component } from 'react';
import { StyleSheet,FlatList,ScrollView,Dimensions,View} from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Left,Body } from 'native-base';
import { EvilIcons,AntDesign,FontAwesome5,MaterialCommunityIcons,Ionicons} from '@expo/vector-icons';
import FeedComponent from '../common/Feedscreencopy';
import * as Font from 'expo-font';
import { ListItem,Avatar,Tooltip} from 'react-native-elements';
const { width: screenWidth } = Dimensions.get('window');
import Headingbar from '../common/Header';
import { Actions } from 'react-native-router-flux';
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
<ScrollView>
    <Card style={{backgroundColor:'#0E043B'}}>
      <CardItem style={{backgroundColor:'#0E043B'}}> 
        <Left>
  <Avatar
  rounded
  size='xlarge'
  onAccessoryPress={()=>Actions.edit()}
  showAccessory
  source={{
    uri:pic
  }}
  
/>
<Body>
  <Text style={{color:'white',fontSize:28,fontWeight:'bold',}}>{user} </Text>
  <Text note> {tag} </Text>
  <Text note> {usn} </Text>
  </Body>
</Left>
</CardItem>


</Card>
<Text style ={styles.recent}>Recent Posts</Text>

<FeedComponent/>
</ScrollView>
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
     <Content>
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
</Content>

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