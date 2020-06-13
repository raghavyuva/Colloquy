import React, { Component } from 'react';
import { StyleSheet,FlatList,ScrollView} from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body,Title,Right, List,ListItem} from 'native-base';
import { EvilIcons,AntDesign,FontAwesome5,MaterialCommunityIcons} from '@expo/vector-icons';
import Blogpage from '../../Components/homescreen/feedscreen';
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
Listrenderer =({id,pic,user,tag,usn})=>{
  return(
<Content>
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
<Text>Recent Posts</Text>
<ScrollView>
<Blogpage/>
</ScrollView>
</Content>
  );
}
  render() {   
    return (
      <Container>
        <Header>
          <Left>
            <Button transparent>
              <Icon name='menu' />
            </Button>
          </Left>
          <Body>
            <Title>Profile</Title>
          </Body>
          <Right>
            <Button transparent>
              <Icon name='search' />
            </Button>
            <Button transparent>
              <Icon name='share' />
            </Button>
            <Button transparent>
              <Icon name='settings' />
            </Button>
          </Right>
        </Header>
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
}

})