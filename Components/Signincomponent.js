import React,{Component} from 'react';
import {
  ImageBackground,
  SafeAreaView,StyleSheet,Dimensions,FlatList,TextInput } from 'react-native';
  import { Container, Header, Content, Item, Input, Button,Text, View,Thumbnail, Card,Form,Label,CardItem} from 'native-base';
  import * as Font from 'expo-font';
  import ValidationComponent from 'react-native-form-validator';
  import { Ionicons } from '@expo/vector-icons';
export default class Signinpage extends ValidationComponent {
    static navigationOptions = {
        title: 'Sign in',
        headerStyle: { backgroundColor: 'white' },
        headerTitleStyle: { color: 'black',textAlign:'center' },
      };
    constructor(props){
        super(props);
      this.state = {email:"",pass:''};
    }  

    state = {
      loading: true,
    }
onLoginPress=()=>{
  this.validate({
    email: {email: true,required:true},
    pass:{minlength:8,required: true,},
  });

}
showData = async()=>{
  let loginDetails = await AsyncStorage.getItem('loginDetails');
  let ld = JSON.parse(loginDetails);
  alert('email: '+ ld.email + ' ' + 'password: ' + ld.password);
}
      async componentDidMount() {
        await Font.loadAsync({
          'Roboto': require('native-base/Fonts/Roboto.ttf'),
          'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
          ...Ionicons.font,
        })
        this.setState({ loading: false })
      }
    render(){
    if (this.state.loading){
        return (
            <View></View>
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
                    <Label style={styles.fieldtitle} >Username or email</Label>
                    <Input style={styles.fieldinput} onChangeText={(email) => this.setState({email})} value={this.state.email}  />
                    {this.isFieldInError('email') && this.getErrorsInField('email').map(errorMessage => <Text>{errorMessage}</Text>) }
                  </Item>
                  <Item  floatingLabel>
                    <Label style={styles.fieldtitle}>Password</Label>
                    <Input style={styles.fieldinput}onChangeText={(pass) => this.setState({pass})} value={this.state.pass}  />
                    {this.isFieldInError('pass') && this.getErrorsInField('pass').map(errorMessage => <Text>{errorMessage}</Text>) }
                  </Item>
                  <Text style={styles.fieldinput}>
            {this.getErrorMessages()}
          </Text>
                  <Item stackedLabel style={styles.submission}>
                    <Button style={styles.submit}  onPress={this.onLoginPress} ><Text style={styles.submittext}>SIGN IN</Text></Button>
                  </Item>
              </Form>
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
  }
});

