import React, { Component } from 'react';
import { Image, StyleSheet, FlatList, ScrollView, Dimensions, Share } from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Drawer, View, ListItem, Right, Radio, List, Title, ActionSheet, Item, Input } from 'native-base';
import {
  Avatar,
  TouchableRipple,
  Switch
} from 'react-native-paper';
import { EvilIcons, AntDesign, FontAwesome5, Entypo } from '@expo/vector-icons';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import Headingbar from './Header';
const { width: screenWidth } = Dimensions.get('window');
const noteinfo = [
  {
    id: '1',
    sharedperson: 'daniel',
    sharednotes: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP.2cXlf0nckerE9yp0PNyfsAHaDZ%26pid%3DApi&f=1',
    notesname: 'javascript and its complete guide',
  },
  {
    id: '2',
    sharedperson: 'raghav',
    sharednotes: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimage.slidesharecdn.com%2Fstrategicchangeinterventionsv05-131023015437-phpapp01%2F95%2Fstrategic-change-interventions-12-638.jpg%3Fcb%3D1382493447&f=1&nofb=1',
    notesname: 'structures of networking',
  },
  {
    id: '3',
    sharedperson: 'rasif',
    sharednotes: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%3Fid%3DOIP.SyDN_Kx-lsZasFnhW9ZiGAHaEK%26pid%3DApi&f=1',
    notesname: 'working on machines',
  },
  {
    id: '4',
    sharedperson: 'harry',
    sharednotes: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP.oP6RsHt-5-iliHpCGFcGugHaE8%26pid%3DApi&f=1',
    notesname: 'structural engineering',
  },
  {
    id: '5',
    sharedperson: 'stephen',
    sharednotes: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%3Fid%3DOIP.4pWYz7vPYAP-iWWguvUQmgHaEi%26pid%3DApi&f=1',
    notesname: 'Semiconductors and light emitting diode',
  },
]
const shareOptions = {
  title: 'Title',
  message: 'Message to share', // Note that according to the documentation at least one of "message" or "url" fields is required
  url: 'www.example.com',
  subject: 'Subject'
};
export default class Notesshared extends React.Component {
  constructor(props) {
    super(props);
  }
  state = {
    loading: true,
    search_bar_enabled: false,
  }
  async componentDidMount() {
    await Font.loadAsync({
      'Roboto': require('native-base/Fonts/Roboto.ttf'),
      'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
      ...Ionicons.font,
    })
    this.setState({ loading: false })
  }
  toggling = () => {
    this.setState({ search_bar_enabled: !this.state.search_bar_enabled });
  }
  onSharePress = () => Share.share(shareOptions);
  Listrenderer = ({ sharednotes, sharedperson, notesname, id }) => {
    return (

      <Card style={Styles.card}>
        <CardItem>
          <Text style={Styles.title}>Notes Name: {notesname} </Text>
        </CardItem>
        <Image source={{ uri: sharednotes }} style={Styles.image} />
        <CardItem>
          <Text style={Styles.title}>shared by: {sharedperson} </Text>
          <Button transparent textStyle={{ color: '#87838B' }} onPress={this._Downloadfile}>
            <FontAwesome5 name="download" size={24} color="red" />
            <Text style={{ textTransform: 'capitalize' }}>Download</Text>
          </Button>
        </CardItem>
        <CardItem>
          <Button transparent textStyle={{ color: '#87838B' }}
            style={Styles.buttons} onPress={this.onSharePress}>
            <FontAwesome5 name="share" size={24} color="black" />
            <Text style={{ textTransform: 'capitalize' }}>share</Text>
          </Button>
          <Button transparent textStyle={{ color: '#87838B' }} style={Styles.buttons}>
            <FontAwesome5 name="heart" size={24} color="black" />
            <Text style={{ textTransform: 'capitalize' }}>like</Text>
          </Button>
          <Button transparent textStyle={{ color: '#87838B' }} style={Styles.buttons}>
            <FontAwesome5 name="eye" size={24} color="black" />
            <Text style={{ textTransform: 'capitalize' }}>View</Text>
          </Button>
        </CardItem>
      </Card>
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
          {this.state.search_bar_enabled == false ? (
            <>
              <Header>


                <Left>
                  <Button transparent onPress={() => { this.props.navigation.openDrawer() }}>
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
                  <Button transparent onPress={() => this.props.navigation.navigate('profile')}>
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

          ) : (
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
        <FlatList

          data={noteinfo}
          renderItem={({ item }) => (
            <this.Listrenderer
              id={item.id}
              sharedperson={item.sharedperson}
              notesname={item.notesname}
              sharednotes={item.sharednotes}
            />
          )}
          keyExtractor={item => item.id}
        />
      </Container>
    );
  }
}

const Styles = StyleSheet.create({
  text: {
    color: 'black',
    fontSize: 22,
    textAlign: 'center',
  },
  image: {
    width: 400,
    height: 200,
  },
  buttons: {
    marginRight: 40,
  },
  title: {
    textAlign: 'center',
    color: '#000',
    fontSize: 18,
    marginRight: 25
  },
})