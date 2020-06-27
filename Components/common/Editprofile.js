import React, { Component } from 'react';
import { Image ,StyleSheet,FlatList,ScrollView,Dimensions} from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body ,Title,Right,Form,Item,Label,Input} from 'native-base';
import { EvilIcons,AntDesign,FontAwesome5,Entypo,Ionicons} from '@expo/vector-icons';
import * as Font from 'expo-font';
import Headingbar from '../common/Header';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import { ListItem,Avatar,Tooltip} from 'react-native-elements';
const { width: screenWidth,height:screenHeight } = Dimensions.get('window');
const downloadablefile = [
    {
        id:'1',
        source:''
    }
]
export default class Edition extends React.Component{
constructor(props){
    super(props);
}
state={
    loading:true,
    image: null,
}
componentDidMount() {
  this.getPermissionAsync();
}

getPermissionAsync = async () => {
  if (Constants.platform.ios) {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (status !== 'granted') {
      alert('Sorry, we need camera roll permissions to make this work!');
    }
  }
};

_pickImage = async () => {
  try {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [5, 3],
      quality: 1,
    });
    if (!result.cancelled) {
      this.setState({ image: result.uri });
    }

    console.log(result);
  } catch (E) {
    console.log(E);
  }
};
    async componentDidMount() {
        await Font.loadAsync({
          'Roboto': require('native-base/Fonts/Roboto.ttf'),
          'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
          ...Ionicons.font,
        })
        this.setState({ loading: false })
      }
    render(){
      let { image } = this.state;
        if (this.state.loading){
            return (
                <Container></Container>
              );
        }
        return(
            <Container>
                <Card style={styles.card}>
       <CardItem style={{backgroundColor:'#0E043B'}}></CardItem>
       <Text style={styles.logo}>Edit your profile</Text>
        <Form>
        <Avatar
  rounded
  size='xlarge'
  showAccessory
  containerStyle={{alignSelf:'center',backgroundColor:'white'}}
  source={{
    uri:this.state.image
  }}
  onAccessoryPress={this._pickImage}
  
/>
              <Item floatingLabel>
                    <Label style={styles.fieldtitle} >University seat number</Label>
                    <Input style={styles.fieldinput}  />

                  </Item>
                  <Item floatingLabel>
                    <Label style={styles.fieldtitle} >User Name</Label>
                    <Input style={styles.fieldinput}  />

                  </Item>
                  <Item floatingLabel>
                    <Label style={styles.fieldtitle} >Tagline</Label>
                    <Input style={styles.fieldinput}  />

                  </Item>
                  <Item stackedLabel style={styles.submission}>
                    <Button style={styles.submit}   ><Text style={styles.submittext}>Submit</Text></Button>
                  </Item>
                  </Form>
              </Card>
            </Container>
        );
    }
}
const styles = StyleSheet.create({
    screen: {
    flex:1,
    justifyContent:'center',
    backgroundColor:'#0E043B',
    textAlign:'center',
    },
    logo:{
        fontSize:24,
        textAlign:'center',
        color:'yellow',
    },
    card:{
      backgroundColor:'#0E043B',
      height:screenHeight
    },
    fieldtitle:{
      color:'white',
    },
    fieldinput:{
      color:'yellow',

    },
    submission:{
      marginTop:15,
      borderColor:null,
    },
    submit:{
  backgroundColor:'#5F7',
  borderRadius:26,
  width:170,
  justifyContent:'center'
    },
    submittext:{
  color:'black',
  textTransform:'capitalize',
    },
    signup:{
      color:'red',
      fontSize:20
    },
    fieldtitl:{
      color:'#FFF',
      borderColor:null,
    }
  });
  
  