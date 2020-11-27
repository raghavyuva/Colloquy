import React, { Component } from 'react';
import { Image, StyleSheet, FlatList, ScrollView, Dimensions, View, Alert, AsyncStorage } from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Title, Right, Form, Item, Label, Input } from 'native-base';
import { EvilIcons, AntDesign, FontAwesome5, Entypo, Ionicons } from '@expo/vector-icons';
import * as Font from 'expo-font';
import Headingbar from '../Homestack/Header';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import { Avatar } from 'react-native-paper';
import { BottomSheet } from 'react-native-btr';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { URL } from '../../config';
const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
export default class Edition extends React.Component {
  constructor(props) {
    super(props);
    this.state = { username: "", tagline: "", postimage: null };
  }
  state = {
    loading: true,
    image: null,
    visible: false,
    data: [],
  }
  componentDidMount() {
    this.getPermissionAsync();
  }
  componentDidMount() {
  }
  _pickImagefromCamera = async () => {
    try {
      let result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
        base64: true
      });
      if (!result.cancelled) {
        this.setState({ postimage: result.uri });
      }
      console.log(result);
    } catch (E) {
      console.log(E);
    }
  };
  _toggleBottomNavigationView = () => {
    //Toggling the visibility state of the bottom sheet
    this.setState({ visible: !this.state.visible });
  };
  _pickImagefromGallery = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
        base64: true
      });
      if (!result.cancelled) {
        const { uri, base64 } = result
        //  console.log(base64)
        this.setState({ postimage: uri });
        this.setState({ image: base64 })
      }
      // console.log(result);
    } catch (E) {
      console.log(E);
    }
  }
  getPermissionAsync = async () => {
    if (Constants.platform.android) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }
  };

  _upload = async () => {
    const uriArr = this.state.postimage.split('.');
    const fileType = uriArr[uriArr.length - 1]
    const file = `data:${fileType};base64,${this.state.image}`
    const data = new FormData()
    data.append("file", file)
    data.append("upload_preset", 'primish');
    data.append("cloud_name", "raghavyuva");
    fetch("https://api.cloudinary.com/v1_1/raghavyuva/image/upload", {
      method: "POST",
      body: data,
    }).then(res => res.json()).then((da) => {
      AsyncStorage.getItem('userToken').then(token => {
        fetch(`${URL.url}`+`/user/update`, {
          method: 'PUT',
          headers: {
            'Authorization': 'Bearer ' + `${token}`,
            'Content-Type': "application/json",
          },
          body: JSON.stringify({
            tagline: this.state.tagline,
            username: this.state.username,
            userphoto: da.secure_url
          })
        }).then(res => res.json()).then((resp) => {
          console.log(resp);
        })
      })
    }).catch(err => {
      Alert.alert(err);
    })
  }
  async componentDidMount() {
    await Font.loadAsync({
      'Roboto': require('native-base/Fonts/Roboto.ttf'),
      'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
      ...Ionicons.font,
    })
    this.setState({ loading: false })
  }
  render() {
    if (this.state.loading) {
      return (
        <Container></Container>
      );
    }
    return (
      <Container>
        <Card style={styles.card}>
          <CardItem style={{ backgroundColor: '#0E043B' }}></CardItem>
          <Text style={styles.logo}>Edit your profile</Text>
          <Form>
            <TouchableOpacity onPress={this._toggleBottomNavigationView}>
              <Avatar.Image
                source={{ uri: this.state.postimage }}
                size={100}
                style={{ alignSelf: "center" }}
              />
            </TouchableOpacity>

            <BottomSheet
              visible={this.state.visible}
              //setting the visibility state of the bottom sheet
              onBackButtonPress={this._toggleBottomNavigationView}
              //Toggling the visibility state on the click of the back botton
              onBackdropPress={this._toggleBottomNavigationView}
            //Toggling the visibility state on the clicking out side of the sheet
            >
              <CardItem style={styles.bottomNavigationView}>
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                  }}>
                  <Text style={{ padding: 20, fontSize: 25, color: "white", fontWeight: 'bold' }}>
                    Select one
              </Text>
                  <Button onPress={this._pickImagefromCamera} style={{ backgroundColor: 'red', }}>
                    <Text style={{ color: 'white', textAlign: 'center' }}>turn on camera</Text>
                  </Button >

                  <Button onPress={this._pickImagefromGallery} style={{ backgroundColor: 'red', marginTop: 20 }}>
                    <Text style={{ color: 'white', textAlign: 'center' }}>open gallery</Text>
                  </Button>
                </View>
              </CardItem>
            </BottomSheet>
            <Item floatingLabel>
              <Label style={styles.fieldtitle} >User Name</Label>
              <Input style={styles.fieldinput} onChangeText={(username) => this.setState({ username })} value={this.state.username} returnKeyType='next' editable={true} />

            </Item>
            <Item floatingLabel>
              <Label style={styles.fieldtitle} >Tagline</Label>
              <Input style={styles.fieldinput} onChangeText={(tagline) => this.setState({ tagline })} value={this.state.tagline} returnKeyType='next' editable={true} />

            </Item>
            <Item stackedLabel style={styles.submission}>
              <Button style={styles.submit} onPress={this._upload} ><Text style={styles.submittext}>Submit</Text></Button>
            </Item>
          </Form>
        </Card>
      </Container>
    );
  }
}
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#0E043B',
    textAlign: 'center',
  },
  logo: {
    fontSize: 24,
    textAlign: 'center',
    color: 'yellow',
  },
  card: {
    backgroundColor: '#0E043B',
    height: screenHeight
  },
  fieldtitle: {
    color: 'white',
  },
  fieldinput: {
    color: 'yellow',

  },
  submission: {
    marginTop: 15,
    borderColor: null,
  },
  submit: {
    backgroundColor: '#5F7',
    borderRadius: 26,
    width: 170,
    justifyContent: 'center'
  },
  submittext: {
    color: 'black',
    textTransform: 'capitalize',
  },
  signup: {
    color: 'red',
    fontSize: 20
  },
  fieldtitl: {
    color: '#FFF',
    borderColor: null,
  },
  MainContainer: {
    flex: 1,
    margin: 2,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: Platform.OS === 'ios' ? 20 : 0,
    backgroundColor: '#E0F7FA',
  },
  bottomNavigationView: {
    backgroundColor: '#0E043B',
    width: '100%',
    height: 250,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 23
  },
});

