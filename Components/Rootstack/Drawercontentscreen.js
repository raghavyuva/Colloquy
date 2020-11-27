import {
  DrawerContentScrollView,
  DrawerItem
} from '@react-navigation/drawer';
import React, { Component, useContext, useEffect, useState } from 'react';
import { Image, StyleSheet, FlatList, ScrollView, View, Linking, AsyncStorage, Alert, Dimensions } from 'react-native';
import { Container, Header, Content, Button, ListItem, Icon, Left, Body, Right, Card, CardItem, List, ActionSheet } from 'native-base';
import * as Font from 'expo-font';
import { Ionicons, FontAwesome5, MaterialCommunityIcons, Feather, SimpleLineIcons, Octicons, Fontisto, FontAwesome, MaterialIcons } from '@expo/vector-icons';
//import {Actions} from 'react-native-router-flux';
const { width: screenWidth } = Dimensions.get('window');
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
import { AuthContext } from '../../Auth/AuthContext';

export function DrawerContent(props) {
  const [users, setUsers] = useState([]);
  const { signOut } = React.useContext(AuthContext);


  return (
    <View style={{ flex: 1, backgroundColor: '#0E043B' }}>
      <View style={styles.drawerContent}>
        <View style={styles.userInfoSection}>
          <View style={{ flexDirection: 'row', marginTop: 15 }}>
           
            <View style={{ marginLeft: 15, flexDirection: 'column' }}>
              <Title style={styles.title}>Primish</Title>
              <Caption style={styles.caption}>Unleash your potential</Caption>
            </View>
          </View>


        </View>
        <DrawerContentScrollView {...props}>
          <Drawer.Section style={styles.drawerSection}>
            <DrawerItem
              icon={({ color, size }) => (
                <Fontisto name="room" size={24} color="white" />)}
              labelStyle={{ color: 'white' }}
              label="Classroom"
              style={{ backgroundColor: 'black', marginTop: 20 }}
              //onPress={() => Actions.classroom()}
              onPress={() => props.navigation.navigate('external', { screen: 'classroom' })}
            />
            <DrawerItem
              icon={({ color, size }) => (
                <SimpleLineIcons name="user-follow" size={24} color="white" />)}
              labelStyle={{ color: 'white' }}
              label="Followers"
              style={{ backgroundColor: 'black', marginTop: 20 }}
              //onPress={()=>{Actions.follow()}}
              onPress={() => props.navigation.navigate('external', { screen: 'follower' })}
            />
            <DrawerItem
              icon={({ color, size }) => (
                <SimpleLineIcons name="user-following" size={24} color="white" />)}
              labelStyle={{ color: 'white' }}
              label="Following"
              style={{ backgroundColor: 'black', marginTop: 20 }}
              // onPress={()=>Actions.following()}
              onPress={() => props.navigation.navigate('external', { screen: 'following' })}
            />
            <DrawerItem
              icon={({ color, size }) => (
                <FontAwesome5 name="poll" size={24} color="white" />)}
              labelStyle={{ color: 'white' }}
              label='Polling'
              style={{ backgroundColor: 'black', marginTop: 20 }}
              // onPress={()=>Actions.poll()}
              onPress={() => props.navigation.navigate('external', { screen: 'poll' })}
            />
            <DrawerItem
              icon={({ color, size }) => (
                <MaterialCommunityIcons name="feature-search" size={24} color="white" />
              )}
              label="Upcoming events"
              labelStyle={{ color: 'white' }}
              style={{ backgroundColor: 'black', marginTop: 20 }}
              // onPress={()=>Actions.upcoming()}
              onPress={() => props.navigation.navigate('external', { screen: 'upcoming' })}
            />
            <DrawerItem
              icon={({ color, size }) => (
                <MaterialCommunityIcons name="notebook" size={24} color="white" />
              )}
              label="shared notes"
              style={{ backgroundColor: 'black', marginTop: 20 }}
              labelStyle={{ color: 'white' }}
              // onPress={()=>Actions.note()}
              onPress={() => props.navigation.navigate('external', { screen: 'note' })}
            />
            <DrawerItem
              icon={({ color, size }) => (

                <MaterialCommunityIcons name="download" size={24} color="white" />
              )}
              labelStyle={{ color: 'white' }}
              style={{ backgroundColor: 'black', marginTop: 20 }}
              label="Downloads"
              // onPress={()=>Actions.download()}
              onPress={() => props.navigation.navigate('external', { screen: 'download' })}
            />
            <DrawerItem
              icon={({ color, size }) => (
                <Feather name="settings" size={24} color="white" />
              )}
              labelStyle={{ color: 'white' }}
              label="Settings"
              style={{ backgroundColor: 'black', marginTop: 20 }}
              // onPress={()=>Actions.setting()}
              onPress={() => props.navigation.navigate('external', { screen: 'setting' })}
            />
            <DrawerItem
              icon={({ color, size }) => (
                <SimpleLineIcons name="support" size={24} color="white" />
              )}
              labelStyle={{ color: 'white' }}
              label="Support"
              style={{ backgroundColor: 'black', marginTop: 20 }}
              onPress={() => Linking.openURL('https://cambridge.edu.in')}

            />
            <DrawerItem
              icon={({ color, size }) => (
                <Octicons name="mail-read" size={24} color="white" />
              )}
              labelStyle={{ color: 'white' }}
              label="privacy policy and terms"
              style={{ backgroundColor: 'black', marginTop: 20 }}
              // onPress={() => Actions.segment()}
              onPress={() => props.navigation.navigate('external', { screen: 'segment' })}
            />
            <DrawerItem
              icon={({ color, size }) => (
                <FontAwesome5 name="hire-a-helper" size={24} color="white" />
              )}
              labelStyle={{ color: 'white' }}
              label="Hire-Helper"
              style={{ backgroundColor: 'black', marginTop: 20 }}
              onPress={() => Linking.openURL('https://raghav.orak.in/')}

            />
            <DrawerItem
              icon={({ color, size }) => (
                <FontAwesome name="telegram" size={24} color="white" />
              )}
              labelStyle={{ color: 'white' }}
              label="join official channel"
              style={{ backgroundColor: 'black', marginTop: 20 }}
              onPress={() => Linking.openURL('https://t.me/orakin')}

            />
            <DrawerItem
              icon={({ color, size }) => (
                <MaterialIcons name="feedback" size={24} color="white" />
              )}
              labelStyle={{ color: 'white' }}
              label="feedback"
              style={{ backgroundColor: 'black', marginTop: 20 }}
              // onPress={() => Actions.report()}
              onPress={() => props.navigation.navigate('external', { screen: 'feedback' })}
            />
          </Drawer.Section>
        </DrawerContentScrollView>
        <Drawer.Section style={styles.bottomDrawerSection}>
          <DrawerItem
            icon={({ color, size }) => (
              <MaterialCommunityIcons name="exit-to-app" size={24} color="white" />
            )}
            label="Sign Out"
            labelStyle={{ color: 'white' }}
            onPress={()=>signOut()}
          />
        </Drawer.Section>
      </View>

    </View>
  );
}
const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  title: {
    fontSize: 28,
    marginTop: 15,
    fontWeight: 'bold',
    color: '#f3f169',
  },
  caption: {
    fontSize: 14,
    color: '#f3f',
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
  label: {
    color: "white"
  }
})