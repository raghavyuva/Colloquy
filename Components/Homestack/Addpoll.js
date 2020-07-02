import React, { Component } from 'react';
import { Image ,StyleSheet,FlatList,ScrollView,Dimensions,TextInput,TouchableOpacity} from 'react-native';
import { EvilIcons,AntDesign,FontAwesome5,Entypo,Ionicons} from '@expo/vector-icons';
import * as Font from 'expo-font';
import { Actions } from 'react-native-router-flux';
import { Container, Header, Content, Card, CardItem, Thumbnail,Icon, Left, Body ,Title,Right,Form,Item,Label,Input,Textarea} from 'native-base';
import { LinearGradient } from 'expo-linear-gradient';
import { Modal, Portal, Text, Button, Provider,ToggleButton  } from 'react-native-paper';
import { View } from 'react-native-animatable';
import { ListItem,Avatar,Tooltip} from 'react-native-elements';
import {ColorPicker} from 'react-native-color-picker-light';
const { width: screenWidth,height:screenHeight } = Dimensions.get('window');
export default class Addpoll extends React.Component{
constructor(props){
    super(props);
    this.state={question:"",op1:"",op2:"",backgcolor:""};
}
state={
    loading:true,
    checked:false,
}
_upload=()=>{
  if (!this.state.question || !this.state.op1 || !this.state.op2 || !this.state.backgcolor ) {
    console.log('required fields cannot be null')
  }
  else{
console.log(this.state.question,this.state.op1,this.state.op2,this.state.backgcolor)
fetch("http://192.168.225.238:3001/polls",{
      method:"POST",
      headers:{
        'Content-Type': 'application/json'
      },
      body:JSON.stringify({
        "question":this.state.question,
        "op1":this.state.op1,
        "op2":this.state.op2,
        "backgcolor":this.state.backgcolor
      })
    })
    .then(res=>res.json())
    .then(async (data)=>{
      console.log(data)
    })
  }
}
  Toggler=(value)=>{
    this.setState(value === 'checked' ? 'unchecked' : 'checked');
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
<View style={styles.screen}>
<Card style={styles.card}>
<Text style={styles.logo}>New Poll</Text>
<CardItem style={{backgroundColor:'#0E043B',marginTop:screenHeight-700,flexDirection:'column'}}>
<Item stackedLabel>
                    <Label style={styles.fieldtitle} > TYPE QUESTION FOR YOUR POLL</Label>
                    <Input style={styles.fieldinput} onChangeText={(question) => this.setState({question})} value={this.state.question}  returnKeyType='next' editable={true} />

                  </Item>
                  <Item stackedLabel>
                    <Label style={styles.fieldtitle} > TYPE OPTION 1</Label>
                    <Input style={styles.fieldinput} onChangeText={(op1) => this.setState({op1})} value={this.state.op1} ref='op1' returnKeyType='next' editable={true} />

                  </Item>
                  <Item stackedLabel>
                    <Label style={styles.fieldtitle} > TYPE OPTION 2</Label>
                    <Input style={styles.fieldinput} onChangeText={(op2) => this.setState({op2})} value={this.state.op2} ref='op2' returnKeyType='next' editable={true} />

                  </Item>
                  <Item stackedLabel>
                    <Label style={styles.fieldtitle} > TYPE backgroundColor</Label>
                    <Input style={styles.fieldinput} placeholder="type dark colours for better experience" onChangeText={(backgcolor) => this.setState({backgcolor})} value={this.state.backgcolor} ref='usn' returnKeyType='next' editable={true} />

                  </Item>
                  <Item stackedLabel style={styles.submission}>
                    <Button style={styles.submit}  onPress={this._upload} ><Text style={styles.submittext}>Post</Text></Button>
                  </Item>
</CardItem>
<Item style={styles.fieldtitl} >
              <Label style={styles.fieldtitle}>Want to post a feed?  </Label>
              <TouchableOpacity><Text style={styles.signup} onPress={()=>Actions.blogadd()} >Click here</Text></TouchableOpacity>
              </Item>
<Text style={{color:'white',margin:25}}>Note: Enter colour name or colour code for example : 'black' or '#000'</Text>

 </Card>   

</View>
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
        fontSize:32,
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
      width:screenWidth-60,
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
  
  