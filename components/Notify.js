import React, { Component, useState } from 'react';
import { Image, StyleSheet, SafeAreaView, FlatList, Dimensions, Share } from 'react-native';
import { Container,Content, List, ListItem, Thumbnail, Text, Left, Body, Right, Button, TextInput, Item, Icon, Input, Title, View, } from 'native-base';
import { EvilIcons, AntDesign, FontAwesome5, Entypo } from '@expo/vector-icons';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { ScrollView } from 'react-native-gesture-handler';
const Notify = (props) => {
    return (
        <ScrollView>
            <List>
                <ListItem thumbnail>
                    <Left>
                        <Thumbnail square source={{ uri: props.item.postedBy.userphoto }} />
                                            <EvilIcons name={'heart' } size={14} color="green" />
                    </Left>
                    <Body>
                        <Text>
                        {props.item.Title}
                        </Text>
                        <Text note numberOfLines={2}>{props.item.caption}</Text>
                    </Body>
                </ListItem>
            </List>
        </ScrollView>
    )
}

export default Notify
const styles = StyleSheet.create({
    header: {
      backgroundColor: '#0E043B',
    },
    feeds: {
      color: "#FFF",
      fontSize: 26,
      marginTop: 10
    },
    follow: {
      backgroundColor: '#053e42'
    },
    view: {
      color: '#053e42'
    }
  })