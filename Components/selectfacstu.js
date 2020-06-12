import React,{Component} from 'react';
import {
  ImageBackground,
  SafeAreaView,StyleSheet,Dimensions,TouchableOpacity} from 'react-native';
  import {Button,Text, View,List,ListItem} from 'native-base';
  import * as Font from 'expo-font';
  import { Ionicons } from '@expo/vector-icons';
  import { LinearGradient } from 'expo-linear-gradient';
  export default class Whoyouare extends React.Component{
    static navigationOptions = {
        title: 'position',
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
         
    render(){
    if (this.state.loading){
        return (
            <View></View>
          );
    }
        return(
<View style = {styles.screen}>
    <View>
    </View>
<ImageBackground source={require('../assets/CITLogo-800x142.png')} style={styles.background}/>
<List style={styles.list}>
    <Text style={styles.selection}>select who you are</Text>
    <ListItem>
    
<TouchableOpacity style = {styles.button} onPress={()=>this.props.navigation.navigate('tab') }>
<LinearGradient
          colors={['#4B480F', '#EE2EB9',]}
          style={{ padding: 15, alignItems: 'center', borderRadius: 5 }}>

    <Text style = {styles.texts}>Faculty</Text>
    </LinearGradient>
    </TouchableOpacity>
</ListItem>
<ListItem>

<TouchableOpacity style = {styles.button} onPress={()=>this.props.navigation.navigate('signup') }><LinearGradient
          colors={['#4B480F', '#EE2EB9',]}
          style={{ padding: 15, alignItems: 'center', borderRadius: 5 }}><Text style = {styles.texts}>Student</Text></LinearGradient></TouchableOpacity>
</ListItem>
</List>
</View>
        );
    }
}

const styles = StyleSheet.create({
    screen: {
    flex:1,
    backgroundColor:'#12D259'
    },
    background:{
        width:'100%',
        height:'100%',
        flex:0.18,
        
        
    },
    button:{
         justifyContent:'center',
         backgroundColor:'black',
         width:200,
         alignSelf:'center',
         marginLeft:'12%'
    },
    texts:{
        textAlign:'center',
        fontSize:20,
        color:'white',
    },
    list:{
        alignSelf:'center',
        justifyContent:'center',
    },
    selection:{
        fontSize:40,
        color:'black',
        textAlign:'center',
        marginBottom:10,
        paddingTop:140,
    }
});

