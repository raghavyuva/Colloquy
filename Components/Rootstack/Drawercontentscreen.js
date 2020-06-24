import {
    DrawerContentScrollView,
    DrawerItem
} from '@react-navigation/drawer';
import React, { Component } from 'react';
import { Image ,StyleSheet,FlatList,ScrollView,View,Linking} from 'react-native';
import { Container, Header, Content, Button, ListItem, Icon, Left, Body, Right,Card,CardItem, List,ActionSheet} from 'native-base';
import * as Font from 'expo-font';
import { Ionicons,FontAwesome5,MaterialCommunityIcons,Feather,SimpleLineIcons,Octicons,Fontisto,FontAwesome} from '@expo/vector-icons';
import {Actions} from 'react-native-router-flux';
import {
    Avatar,
    Text,
    Title,
    Caption,
    Paragraph,
    Drawer,
    TouchableRipple,
    Switch
} from 'react-native-paper';
export default class  DrawerContent extends Component{
    constructor(props){
        super(props);
    }
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
      nav =()=>{
          Actions.note();
      }
      nav2 =()=>{
          Actions.upcoming();
      }
      nav3=()=>{
          Actions.setting();
      }
      nav4=()=>{
          Actions.download();
      }
    render(){
        if (this.state.loading){
            return (
                <Container></Container>
              );
        }    
    return(
        <View style={{flex:1,backgroundColor:'#0E043B'}}>
             <View style={styles.drawerContent}>
               <View style={styles.userInfoSection}>
              <View style={{flexDirection:'row',marginTop: 15}}>
<Avatar.Image 
                                source={{
                                    uri: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn4.iconfinder.com%2Fdata%2Ficons%2Fuser-avatar-flat-icons%2F512%2FUser_Avatar-31-512.png&f=1&nofb=1'
                                }}
                                size={80}
                                style={styles.image}
                            />
                             <View style={{marginLeft:15, flexDirection:'column'}}>
                                <Title style={styles.title}>John Dev</Title>
                                <Caption style={styles.caption}>@1cd12cs089</Caption>
                            </View>
                            </View>
                            <View style={styles.row}>
                            <View style={styles.section}>
                                <Paragraph style={[styles.paragraph, styles.caption]}>80</Paragraph>
                                <Caption style={styles.caption}>Following</Caption>
                            </View>
                            <View style={styles.section}>
                                <Paragraph style={[styles.paragraph, styles.caption]}>100</Paragraph>
                                <Caption style={styles.caption}>Followers</Caption>
                            </View>
                            
                        </View>

                        </View>
                        <DrawerContentScrollView>
                        <Drawer.Section style={styles.drawerSection}>
                        <DrawerItem 
                            icon={({color, size}) => (
<Fontisto name="room" size={24} color="white" />                            )}
                            labelStyle={{color:'white'}}
                            label="Classroom"
                            style={{backgroundColor:'black',marginTop:20}}
                            onPress={() => Linking.openURL('https://raghav.orak.in/')}
                        />
                                                  <DrawerItem 
                            icon={({color, size}) => (
<SimpleLineIcons name="user-follow" size={24} color="white" />                            )}
                            labelStyle={{color:'white'}}
                            label="Followers"
                            style={{backgroundColor:'black',marginTop:20}}
                            onPress={()=>Actions.follow()}
/>
                                                                          <DrawerItem 
                            icon={({color, size}) => (
<SimpleLineIcons name="user-following" size={24} color="white" />                            )}
                            labelStyle={{color:'white'}}
                            label="Following"
                            style={{backgroundColor:'black',marginTop:20}}
                            onPress={()=>Actions.following()}
                        />
                        <DrawerItem 
                         icon={({color, size}) => (
<MaterialCommunityIcons name="feature-search" size={24} color="white" />                            
                                                        )}
                             label="Upcoming events"
                             labelStyle={{color:'white'}}
                             style={{backgroundColor:'black',marginTop:20}}
                             onPress={this.nav2}
                        />
                        <DrawerItem 
                            icon={({color, size}) => (
<MaterialCommunityIcons name="notebook" size={24} color="white" />
                            )}
                            label="shared notes"
                            style={{backgroundColor:'black',marginTop:20}}
                            labelStyle={{color:'white'}}
                            onPress={this.nav}
                        />
                        <DrawerItem 
                            icon={({color, size}) => (

<MaterialCommunityIcons name="download" size={24} color="white" />
                                )}
                            labelStyle={{color:'white'}}
                            style={{backgroundColor:'black',marginTop:20}}
                            label="Downloads"
                            onPress={this.nav4}
                        />
                        <DrawerItem 
                            icon={({color, size}) => (
<Feather name="settings" size={24} color="white" />
                            )}
                            labelStyle={{color:'white'}}
                            label="Settings"
                            style={{backgroundColor:'black',marginTop:20}}
                            onPress={this.nav3}
                        />
                        <DrawerItem 
                            icon={({color, size}) => (
<SimpleLineIcons name="support" size={24} color="white" />
                            )}
                            labelStyle={{color:'white'}}
                            label="Support"
                            style={{backgroundColor:'black',marginTop:20}}
                            onPress={() => Linking.openURL('https://cambridge.edu.in')}
                        />
                                                <DrawerItem 
                            icon={({color, size}) => (
<Octicons name="mail-read" size={24} color="white" />
                            )}
                            labelStyle={{color:'white'}}
                            label="privacy-policy"
                            style={{backgroundColor:'black',marginTop:20}}
                            onPress={() => {props.navigation.navigate('SupportScreen')}}
                        />
                          <DrawerItem 
                            icon={({color, size}) => (
<FontAwesome5 name="hire-a-helper" size={24} color="white" />
                            )}
                            labelStyle={{color:'white'}}
                            label="Hire-Helper"
                            style={{backgroundColor:'black',marginTop:20}}
                            onPress={() => Linking.openURL('https://raghav.orak.in/')}
                        />
                          <DrawerItem 
                            icon={({color, size}) => (
<FontAwesome name="resistance" size={24} color="white" />
                            )}
                            labelStyle={{color:'white'}}
                            label="Terms & Conditions"
                            style={{backgroundColor:'black',marginTop:20}}
                            onPress={() => Linking.openURL('https://raghav.orak.in/')}
                        />
                                                  <DrawerItem 
                            icon={({color, size}) => (
<FontAwesome name="telegram" size={24} color="white" />
                            )}
                            labelStyle={{color:'white'}}
                            label="join official channel"
                            style={{backgroundColor:'black',marginTop:20}}
                            onPress={() => Linking.openURL('https://t.me/orakin')}
                        />
                    </Drawer.Section>
                    </DrawerContentScrollView>   
                    <Drawer.Section style={styles.bottomDrawerSection}>
                <DrawerItem 
                    icon={({color, size}) => (
<MaterialCommunityIcons name="exit-to-app" size={24} color="white" />
                    )}
                    label="Sign Out"
                    labelStyle={{color:'white'}}
                    onPress={() => {signOut()}}
                />
            </Drawer.Section>
                        </View>

    </View>
    );
    }
}
const styles = StyleSheet.create({
    drawerContent: {
        flex: 1,
      },
title: {
    fontSize: 26,
    marginTop: 15,
    fontWeight: 'bold',
    color:'white',
  },
  caption: {
    fontSize: 14,
    color:'white',
  },
  userInfoSection: {
    paddingLeft: 20,
  },
  row: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  paragraph: {
    fontWeight: 'bold',
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 3,
  },
  bottomDrawerSection: {
      marginBottom: 15,
      borderTopColor: 'yellow',
      borderTopWidth: 3
  },
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  label:{
      color:"white"
  }
})