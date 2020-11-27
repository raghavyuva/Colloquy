import React, { Component } from 'react';
import { Image, StyleSheet, FlatList, ScrollView, Dimensions, AsyncStorage } from 'react-native';
import { EvilIcons, AntDesign, FontAwesome5, Entypo, Ionicons } from '@expo/vector-icons';
import * as Font from 'expo-font';
//import { Actions } from 'react-native-router-flux';
import { Container, Header, Content, Card, CardItem, Thumbnail, Icon, Left, Body, Title, Right, Form, Item, Label, Input, Textarea, Button, Text, View } from 'native-base';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import { URL } from '../../config';
const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
export default class Addblog extends React.Component {
  constructor(props) {
    super(props);
    this.state = { postimage: null, description: "", email: "", displayName: "" };
  }
  state = {
    loading: true,
    checked: false,
    visible: false,
    body: '',
    image: null
  }
  componentDidMount = () => {
    this.getPermissionAsync();
  }
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
        fetch(`${URL.url}` + `/post`, {
          method: 'POST',
          headers: {
            'Authorization': 'Bearer ' + `${token}`,
            'Content-Type': "application/json",
          },
          body: JSON.stringify({
            caption: this.state.body,
            photo: da.secure_url
          })
        }).then(res => res.json()).then((resp) => {
          console.log(resp);
        })
      })
    }).catch(err => {
      Alert.alert(err);
    })
  }
  _toggleBottomNavigationView = () => {
    //Toggling the visibility state of the bottom sheet
    this.setState({ visible: !this.state.visible });
  };
  _pickImagefromCamera = async () => {
    try {
      let result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        quality: 1,
        base64: true,
        aspect: [4, 3],
      });

      if (!result.cancelled) {
        const { uri, base64 } = result
        this.setState({ postimage: uri });
        this.setState({ image: base64 })
      }
      console.log(result);
    } catch (E) {
      console.log(E);
    }
  };
  _pickImagefromGallery = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        quality: 1,
        base64: true,
        aspect: [4, 3],
      });
      if (!result.cancelled) {
        const { uri, base64 } = result
        this.setState({ postimage: uri });
        this.setState({ image: base64 })
      }

      console.log(result);
    } catch (E) {
      console.log(E);
    }
  }
  getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }
  };
  componentDidMount() {
    this.getPermissionAsync();
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
        <View></View>
      );
    }

    return (
      <View>
        <Header style={styles.Header}>
          <Right>
            <Button onPress={this._upload}>
              <Text style={styles.fieldtitle}>Post</Text>
            </Button>
          </Right>
        </Header>
        <View style={styles.card}>
          <Image source={{ uri: this.state.postimage }} style={{ width: 300, height: 300 }} />
        </View>
        <View style={styles.choose}>
          <Button style={styles.fieldinput} onPress={this._pickImagefromCamera}>
            <Text>Take photo</Text>
          </Button>
          <Button style={styles.fieldinput} onPress={this._pickImagefromGallery}>
            <Text>Pick from gallery</Text>
          </Button>

        </View>
        <View style={styles.fieldtit}>
          <Item floatingLabel>
            <Label style={styles.fieldtitle} >Write Something Here</Label>
            <Input style={styles.fieldinpu} onChangeText={(body) => this.setState({ body })} value={this.state.body} />

          </Item>
        </View>
      </View>
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
  logo: {
    fontSize: 24,
    textAlign: 'center',
    color: 'yellow',
  },
  card: {
    backgroundColor: '#0E04',
    width: screenWidth - 100,
    marginLeft: 50,
    marginTop: 50
  },
  fieldtitle: {
    color: 'black',
  },
  Header: {
    backgroundColor: "#15054648"
  },
  fieldinput: {
    marginRight: 10,
    backgroundColor: "#15054648",

  },
  fieldinpu: {
    color: 'black',
    width: screenWidth - 60,
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
    flexDirection: "column",
    color: "white",
    paddingTop: 30
  },
  choose: {
    marginLeft: 45,
    flexDirection: "row"
  },
  fieldtit: {
    flexDirection: "column",
    color: "white",
    paddingTop: 5
  },
});

