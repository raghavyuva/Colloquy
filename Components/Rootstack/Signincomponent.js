import React,{Component} from 'react';
import {
  ImageBackground,
  SafeAreaView,StyleSheet,Dimensions,FlatList,TextInput, Linking,AsyncStorage,Alert} from 'react-native';
  import { WebView } from 'react-native-webview';
  import { Container, Header, Content, Item, Input, Button,Text, View,Thumbnail, Card,Form,Label,CardItem, Left, Right} from 'native-base';
  import * as Font from 'expo-font';
  import ValidationComponent from 'react-native-form-validator';
  import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {Actions} from 'react-native-router-flux';
const { width: screenWidth } = Dimensions.get('window');
var STORAGE_KEY = 'id_token';

export default class Signinpage extends ValidationComponent {
    constructor(props){
        super(props);
      this.state = {usn:"",pass:""};
    }  

    state = {
      loading: true,
    }
onLoginPress=()=>{
 var checkedforvalidation= this.validate({
    usn: {usn: true,required:true,maxlength:10,minlength:10},
    pass:{minlength:8,required: true,},
  });
  this.setState({validate:checkedforvalidation})
if(checkedforvalidation) {
      fetch("http://192.168.225.238:3001/sessions/create", {
          method: "POST", 
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({
              username: this.state.usn, 
              password: this.state.pass, 
          })
      })
      .then((response) => response.json())
      .then((responseData) => {
          Actions.drawer();
          this._onValueChange(STORAGE_KEY, responseData.id_token);
      })
      .done();
  }
}

      async componentDidMount() {
        await Font.loadAsync({
          'Roboto': require('native-base/Fonts/Roboto.ttf'),
          'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
          ...Ionicons.font,
        })
        this.setState({ loading: false })
      }


      async _onValueChange(item, selectedValue) {
        try {
          await AsyncStorage.setItem(item, selectedValue);
        } catch (error) {
          console.log('AsyncStorage error: ' + error.message);
        }
      }

      onsignuppress=()=>{
        Actions.Signup();
      }
    render(){
    if (this.state.loading){
        return (
            <Container></Container>
          );
    }
        return(
            <Container style={styles.screen}>
              <Content>
      <Card style={styles.card}>
       <CardItem style={{backgroundColor:'#0E043B'}}></CardItem>
        <Thumbnail  source={{uri: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fs.cdpn.io%2F69263%2Fprofile%2Fprofile-512.jpg%3F2&f=1&nofb=1' }} style={styles.logo} circular/>
        <Form>
              <Item floatingLabel>
                    <Label style={styles.fieldtitle} >University seat number</Label>
                    <Input style={styles.fieldinput} onChangeText={(usn) => this.setState({usn})} value={this.state.usn} ref='usn' returnKeyType='next' editable={true} />
                    {this.isFieldInError('usn') && this.getErrorsInField('usn').map(errorMessage => <Text>{errorMessage}</Text>) }
                  </Item>
                  <Item  floatingLabel>
                    <Label style={styles.fieldtitle}>Password</Label>
                    <Input style={styles.fieldinput}onChangeText={(pass) => this.setState({pass})} value={this.state.pass} secureTextEntry={true} editable={true} ref='pass' returnKeyType='next' />
                    {this.isFieldInError('pass') && this.getErrorsInField('pass').map(errorMessage => <Text>{errorMessage}</Text>) }
   
                  </Item>
                  <Text style={styles.fieldinput}>
            {this.getErrorMessages()}
          </Text>
                  <Item stackedLabel style={styles.submission}>
                    <Button style={styles.submit}  onPress={this.onLoginPress} ><Text style={styles.submittext}>SIGN IN</Text></Button>
                  </Item>
                  
              </Form>
              <Item style={styles.fieldtitl} >
              <Label style={styles.fieldtitle}>Don't have an account?  </Label>
              <TouchableOpacity><Text style={styles.signup} onPress={this.onsignuppress} >Sign up</Text></TouchableOpacity>
              </Item>
              <Item>
              <Right>
              <TouchableOpacity><Text style={styles.signup}>forgot password?</Text></TouchableOpacity>
</Right>
              </Item>
              </Card>
              </Content>
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
      width:200,
      height:200,
      alignSelf:"center",
  },
  card:{
    marginTop:160,
    backgroundColor:'#0E043B'
  },
  fieldtitle:{
    color:'white',
  },
  fieldinput:{
    color:'white'
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

