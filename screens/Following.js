import React, { Component, useState,useEffect } from 'react';
import { Image, StyleSheet, SafeAreaView, FlatList, Dimensions, Share, } from 'react-native';
import { Container, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Drawer, View, ListItem, Right, Radio, List, Title, ActionSheet, Item, Input } from 'native-base';
import { EvilIcons, AntDesign, FontAwesome5, Entypo } from '@expo/vector-icons';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { ScrollView } from 'react-native-gesture-handler';
import { Config } from '../config';
import { DataLayerValue } from '../Context/DataLayer';
import Usercard from '../components/Usercard';
const { width: screenWidth } = Dimensions.get('window');
import Header from '../components/Header';
const Following = (props) => {
    const [{ userToken, followinglist }, dispatch] = DataLayerValue()

  const  fetching = async () => {
        try {
              const Listener = fetch(`${Config.url}` + `/followinglist`, {
                headers: {
                  'Authorization': 'Bearer ' + `${userToken}`,
                }
              })
                .then((response) => response.json())
                .then((responseJson) => {
                  dispatch({
                      type:"FOLLOWINGLIST",
                      data:responseJson
                  })
                })
        } catch (e) {
          console.log(e);
        }
      }
useEffect(() => {
    fetching();
    return () => {
        
    }
}, [])
    return (
        <Container>
        <Header {...props} />
        <FlatList
          data={followinglist}
          renderItem={({ item }) => {
            return (
                <Usercard item={item} {...props} />
            );
        }}
          keyExtractor={item => item._id}
        />
      </Container>
    )
}

export default Following
