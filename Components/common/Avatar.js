import React from 'react';
import { Dimensions, StyleSheet, View, FlatList, ScrollView, TouchableOpacity, AsyncStorage } from 'react-native';
import { Card, Image, Avatar } from 'react-native-elements';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { Text, CardItem, Button } from 'native-base';
import axios from 'axios';
import { URL } from '../../config';
const { width: screenWidth } = Dimensions.get('window');
export default class Avatarcommon extends React.Component {
  constructor(props) {
    super(props);
  }
  state = {
    data: '',
    loading: false,
    renderdata: {},
    fakeData: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  }

  fetching = async () => {
    try {
      this.setState({ loading: true });
      await AsyncStorage.getItem('userName').then(userName => {
        AsyncStorage.getItem('userToken').then(token => {
          const Listener = fetch(`${URL.url}` + `/allusers`, {
            headers: {
              'Authorization': 'Bearer ' + `${token}`,
            }
          }).then((response) => response.json())
            .then((responseJson) => {
              this.setState({ data: responseJson, loading: false });
            })
        })
      })
    } catch (e) {
      console.log(e);
    }
  }
  async componentDidMount() {
    await Font.loadAsync({
      'Roboto': require('native-base/Fonts/Roboto.ttf'),
      'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
      ...Ionicons.font,
    })
    this.fetching()
  }
  Listrenderer = ({ item, index }) => {
    return (
      <View >
        <TouchableOpacity onPress={()=>this.props.navigation.navigate('external',{screen:'userpro',params:{thread:item}})}>
          <Card>
            <Avatar rounded size='large' source={{ uri: item.userphoto }} />
            <View style={{ paddingTop: 10, }}>
            </View>
            <Text style={styles.title}>
              {item.username}
            </Text>
          </Card>
        </TouchableOpacity>

      </View>
    );
  }
  render() {
    if (this.state.loading) {
      return (
        <View></View>
      );
    }
    return (
      <View style={styles.screen}>
        <FlatList
          horizontal
          pagingEnabled={true}
          showsHorizontalScrollIndicator={false}
          data={this.state.loading ? this.state.fakeData : this.state.data}
          renderItem={this.Listrenderer}
          keyExtractor={item => item._id}
        />
      </View>
    );
  }
}



const styles = StyleSheet.create({

  carditem: {
    backgroundColor: '#0E043B'
  },
  follow: {
    backgroundColor: 'green',
    width: 80,
    justifyContent: 'center',
  },
  followtext: {
    color: '#FFF',
    textAlign: "center",
  },
  title: {
    color: 'black'
  }
}
);