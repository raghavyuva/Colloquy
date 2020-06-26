import React, { Component } from 'react';
import { Image ,StyleSheet,FlatList,ScrollView,Dimensions} from 'react-native';
import { Container, Header, Tab, Tabs, TabHeading, Icon, Text ,Content,Form,Input,Item,Label,Button} from 'native-base';
import { EvilIcons,AntDesign,FontAwesome5,Entypo,Ionicons} from '@expo/vector-icons';
import * as Font from 'expo-font';
import Headingbar from '../common/Header';
import Terms from '../common/Termscondition';
import Privacy from './privacy';
const { width: screenWidth } = Dimensions.get('window');
export default class Feedback extends React.Component{
constructor(props){
    super(props);
}
state={
    loading:true,
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
                <Container></Container>
              );
        }
        return(
            <Container>
                <Headingbar/>
        <Content>
        <Text style={{fontSize:24,fontWeight:'bold',textAlign:'center',backgroundColor:'yellow'}}>Give your feedback</Text>
          <Form>
            <Item floatingLabel>
              <Label>How's Mess food?</Label>
              <Input />
            </Item>
            <Item floatingLabel last>
              <Label>Are you satisfied with the quality of teaching?</Label>
              <Input />
            </Item>
            <Item floatingLabel last>
              <Label>teachers are available after the class?</Label>
              <Input />
            </Item>
            <Item stackedLabel style={styles.submission}>
                    <Button style={styles.submit} onPress={this.onloginpress}  ><Text style={styles.submittext}>Submit</Text></Button>
                  </Item>
          </Form>
        </Content>
            </Container>
        );
    }
}
const styles = StyleSheet.create({
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