import React, { Component, useState } from 'react';
import { Image, StyleSheet, SafeAreaView, FlatList, Dimensions, Share, AsyncStorage } from 'react-native';
import { Container, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Drawer, View, ListItem, Right, Radio, List, } from 'native-base';
import Header from '../Homestack/Header';
import { URL } from '../../config';
const { width: screenWidth } = Dimensions.get('window');
export default class Following extends React.Component {
  constructor(props) {
    super(props);
  }
  state = {
    loading: true,
    Data: ""
  }
  Listrenderer({ item, index }) {
    return (
      <List>
        <ListItem thumbnail>
          <Left>
            <Thumbnail square source={{ uri: item.userphoto }} />
          </Left>
          <Body>
            <Text>{item.username}</Text>
            <Text note numberOfLines={1}>{item.tagline}</Text>
          </Body>
          <Right>
            <Button style={styles.follow}>
              <Text>Unfollow</Text>
            </Button>
          </Right>
        </ListItem>
      </List>
    );
  }

  async componentDidMount() {
    this.fetching()
    setTimeout(() => {
      this.setState({ loading: false });
    }, 2000);
  }
  fetching = async () => {
    try {
      await AsyncStorage.getItem('userName').then(userName => {
        AsyncStorage.getItem('userToken').then(token => {
          const Listener = fetch(`${URL.url}` + `/followinglist`, {
            headers: {
              'Authorization': 'Bearer ' + `${token}`,
            }
          })
            .then((response) => response.json())
            .then((responseJson) => {
              this.setState({ Data: responseJson });
              //console.log(this.state.Data)
            })
        })
      })
    } catch (e) {
      console.log(e);
    }
  }
  render() {
    if (this.state.loading) {
      return (
        <Container></Container>
      );
    }


    return (
      <Container>
        <Header {...this.props} />
        <FlatList
          data={this.state.Data}
          renderItem={this.Listrenderer}
          keyExtractor={item => item._id}
        />
      </Container>

    );
  }
}




const styles = StyleSheet.create({
  follow: {
    backgroundColor: '#053e42'
  },
  search: {
    backgroundColor: '#053e42'  
  },
  following: {
    marginLeft: 20, 
    fontSize: 25,
    fontWeight: '500'
  }
})
