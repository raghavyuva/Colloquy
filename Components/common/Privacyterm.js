import React, { Component } from 'react';
import { Image ,StyleSheet,FlatList,ScrollView,Dimensions} from 'react-native';
import { Container, Header, Tab, Tabs, TabHeading, Icon, Text } from 'native-base';
import { EvilIcons,AntDesign,FontAwesome5,Entypo,Ionicons} from '@expo/vector-icons';
import * as Font from 'expo-font';
import Headingbar from '../Homestack/Header';
import Terms from '../common/Termscondition';
import Privacy from './privacy';
const { width: screenWidth } = Dimensions.get('window');
const downloadablefile = [
    {
        id:'1',
        source:''
    }
]
export default class Privacytermsegment extends React.Component{
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
     
        <Tabs >
          <Tab heading={ <TabHeading style={{backgroundColor:"red"}}><FontAwesome5 name="readme" size={28} color="white" /><Text>Terms & conditions</Text></TabHeading>}>
            <Terms/>
          </Tab>
          <Tab heading={ <TabHeading style={{backgroundColor:"green"}}><FontAwesome5 name="user-lock" size={28} color="white" /><Text>Privacy-policy</Text></TabHeading>}>
            <Privacy/>
          </Tab>
        </Tabs>
   
            </Container>
        );
    }
}