import React,{Component} from 'react';
import {
  ImageBackground,
  SafeAreaView,StyleSheet,Dimensions } from 'react-native';
  import { Container, Header, Content, Item, Input, Button,Text, View ,CheckBox,ListItem,Body,AppLoading} from 'native-base';
  import * as Font from 'expo-font';
  import { Ionicons } from '@expo/vector-icons';
  import {Actions} from 'react-native-router-flux';
  const { width: screenWidth } = Dimensions.get('window');
export default class Welcomepage extends React.Component{
    static navigationOptions = {
        title: 'Cambridge welcomes you',
        headerStyle: { backgroundColor: 'white' },
        headerTitleStyle: { color: 'black',justifyContent:'center',textAlign:'center' },
      };
    constructor(props){
        super(props);
    };
    state = {
        loading: true
      }
      async componentDidMount() {
        await Font.loadAsync({
          'Roboto': require('native-base/Fonts/Roboto.ttf'),
          'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
          ...Ionicons.font,
        })
        this.setState({ loading: false })
      }
         onstepinpress=()=>{
          Actions.Authentication();
         }
    render(){
    if (this.state.loading){
        return (
            <View></View>
          );
    }
        return(
<View style = {styles.screen}>
<ImageBackground source={require('../../assets/citech.jpg')} style={styles.background}/>
<Button style = {styles.button} ><Text style = {styles.texts}onPress={this.onstepinpress}>step in</Text></Button>
</View>
        );
    }
}

const styles = StyleSheet.create({
    screen: {
    flex:1,
    justifyContent:'center',
    backgroundColor:'#0E043B'
    },
    background:{
        width:'100%',
        height:'100%',
        flex:0.6,
        
    },
    button:{
        backgroundColor:'black',
justifyContent:'center',
        width:"100%",
        position:'absolute',
        bottom:0,
        borderRadius:3
    },
    texts:{
        textAlign:'center'
    }
});

