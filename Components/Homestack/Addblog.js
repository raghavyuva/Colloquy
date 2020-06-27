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
const { width: screenWidth,height:screenHeight } = Dimensions.get('window');
const downloadablefile = [
    {
        id:'1',
        source:''
    }
]
export default class Addblog extends React.Component{
constructor(props){
    super(props);
}
state={
    loading:true,
    checked:false,
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
<View>
    <ScrollView>
<Card style={styles.card}>
       <CardItem style={{backgroundColor:'#0E043B'}}></CardItem>
       <Text style={styles.logo}>New Post</Text>
        <Form>
        <Avatar
  
  size={300}
  showAccessory
  containerStyle={{alignSelf:'center',backgroundColor:'white'}}
 title="Pic"
  titleStyle={{color:'black'}}
/>
<Text note style={{color:'white',textAlign:'center'}}>change the post picture by pressing accessary </Text>
              <Item stackedLabel style={{ marginTop:25,}}>
             <Text style={{color:'white',}}>Type some content for your post here</Text>
                  <CardItem style={{    
     backgroundColor:'#0E043B'}}>
                  
                    <Textarea style={styles.fieldinput} rowSpan={8} bordered  />
                    </CardItem>
                    </Item>
                
                  <Item stackedLabel style={styles.submission}>
                    <Button style={styles.submit}   ><Text style={styles.submittext}>Next</Text></Button>
                  </Item>
                  </Form>
                  <Item style={styles.fieldtitl} >
              <Label style={styles.fieldtitle}>Want to post a poll?  </Label>
              <TouchableOpacity><Text style={styles.signup} onPress={()=>Actions.polladd()} >Click here</Text></TouchableOpacity>
              </Item>
              </Card>

    </ScrollView>
    <CardItem style={{position:'absolute',bottom:0}}>
              <ToggleButton.Row onValueChange={this.Toggler} value={this.state.checked}>
      <ToggleButton icon="format-align-left" value="left" />
      <ToggleButton icon="format-align-right" value="right" />
      <ToggleButton icon="format-align-center" value="right" />
      <ToggleButton icon="format-bold" value="right" />
      <ToggleButton icon="format-italic" value="right" />
      <ToggleButton icon="format-size" value="right" />
      <ToggleButton icon="format-color-highlight" value="right" />
      <ToggleButton icon="format-strikethrough" value="right" />
      <ToggleButton icon="format-underline" value="right" />
    </ToggleButton.Row>
    </CardItem>
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
  
  