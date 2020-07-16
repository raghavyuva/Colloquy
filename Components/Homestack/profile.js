import React, { Component } from 'react';
import { StyleSheet, FlatList, ScrollView, Dimensions,Share} from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Drawer, View, Right, Radio, List, Title, ActionSheet, Item, Input,Form,Label } from 'native-base';
import { EvilIcons, AntDesign, FontAwesome5, MaterialCommunityIcons, Ionicons ,Entypo} from '@expo/vector-icons';
import FeedComponent from '../common/Feedscreencopy';
import * as Font from 'expo-font';
import { ListItem, Avatar as Avatarr, Tooltip, Paragraph, Caption } from 'react-native-elements';
import {
  Avatar,
  TouchableRipple,
  Switch
} from 'react-native-paper';
const { width: screenWidth } = Dimensions.get('window');
import Headingbar from './Header';
//import { Actions } from 'react-native-router-flux';
const profiledetails = [
  {
    id: '1',
    username: 'John Dev',
    userpic: 'https://randomuser.me/api/portraits/men/11.jpg',
    tagline: 'developer, Engineering student,pro skilled Programmer,indian  geek',
    usn: '1cd15cs098'
  }
]
const shareOptions = {
  title: 'Title',
  message: 'Message to share', // here you can send app link to playstore.
  url: 'www.example.com',
  subject: 'Subject'
};

export default class profile extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    loading: true,
    image: null,
    search_bar_enabled:false,
  }
  async componentDidMount() {
    await Font.loadAsync({
      'Roboto': require('native-base/Fonts/Roboto.ttf'),
      'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
      ...Ionicons.font,
    })
    this.setState({ loading: false })
  }
  logoutpress = () => {

  }
  toggling=()=>{
    this.setState({search_bar_enabled:!this.state.search_bar_enabled});
  }
  onSharePress = () => Share.share(shareOptions);
  Listrenderer = ({ id, pic, user, tag, usn }) => {
    return (
      <ScrollView>
        <Card style={{ backgroundColor: '#0E043B' }}>
          <CardItem style={{ backgroundColor: '#0E043B' }}>
            <Left>
              <Avatarr
                rounded
                size='xlarge'
                //onAccessoryPress={()=>Actions.edit()}
                onAccessoryPress={()=>this.props.navigation.navigate('external', { screen: 'edit' })}
                showAccessory
                source={{
                  uri: pic
                }}

              />
              <Body>
                <Text style={{ color: 'white', fontSize: 28, fontWeight: 'bold', }}>{user} </Text>
                <Text note> {tag} </Text>
              </Body>
            </Left>

          </CardItem>
          <CardItem style={{ backgroundColor: "yellow" }}>
            <Text style={{ marginRight: 20, fontWeight: 'bold' }}>80 following</Text>
            <Text style={{ marginRight: 20, fontWeight: 'bold' }}>100 followers</Text>
            <Text style={{ marginRight: 20, fontWeight: 'bold' }}> {usn} </Text>
          </CardItem>

        </Card>
        <Text style={styles.recent}>Recent Posts</Text>

        <FeedComponent />
      </ScrollView>
    );
  }
  render() {
    if (this.state.loading) {
      return (
        <Container></Container>
      );
    }
    return (
      <Container>

<View>
        {this.state.search_bar_enabled==false?(
           <>
      <Header>
      
     
      <Left>
        <Button transparent  onPress={() => { this.props.navigation.openDrawer() }}>
          <Icon name='menu' />
        </Button>
      </Left>
      <Body>
        <Title>CITECH (b'lore)</Title>
      </Body>
      <Right>
        <Button transparent onPress={this.toggling} >
          <Icon name='search' />
        </Button>
        <Button transparent onPress={this.onSharePress}>
          <Icon name='share' />
        </Button>
        <Button transparent onPress={()=>this.props.navigation.navigate('profile')}>
          <Avatar.Image
            source={{
              uri: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn4.iconfinder.com%2Fdata%2Ficons%2Fuser-avatar-flat-icons%2F512%2FUser_Avatar-31-512.png&f=1&nofb=1'
            }}
            size={30}

          />
        </Button>
      </Right>
      </Header>
      </>
     
      ):(
        <Header searchBar rounded >
        <Item>
          <Icon name="ios-search" />
          <Input placeholder="What you are looking for?" />
          <Button transparent style={{ marginRight: 10 }} >
            <AntDesign name="filter" size={26} color="black" />
          </Button>
          <Button transparent enable={this.state.enable} onPress={this.toggling}>
            <Entypo name="cross" size={26} color="black" />
          </Button>
        </Item>
        <Button transparent>
          <Text>Search</Text>
        </Button>
      </Header>
      ) 
  }
    </View>    
        <Content>
          <FlatList
            pagingEnabled={true}
            showsHorizontalScrollIndicator={false}
            data={profiledetails}
            renderItem={({ item }) =>
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
  header: {
    backgroundColor: '#223343'
  },
  feeds: {
    color: "#FFF",
    fontSize: 26,
  },
  card: {
    justifyContent: 'center',
    alignSelf: 'center',
    width: 400,
    height: 400,
    alignItems: 'center',
    backgroundColor: '#0E043B',
  },
  follow: {
    backgroundColor: 'red'
  },
  text: {
    color: "#FFF"
  },
  edit: {
    borderRadius: 2,
    justifyContent: 'center',
    backgroundColor: 'black',
    width: 400,
    alignSelf: 'center'
  },
  recent: {
    fontSize: 26,
    backgroundColor: '#0E043B',
    marginTop: 10,
    color: "#FFF"
  }

})