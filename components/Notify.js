import React from 'react';
import {  StyleSheet, } from 'react-native';
import { List, ListItem, Thumbnail, Text, Left, Body, } from 'native-base';
import { EvilIcons,} from '@expo/vector-icons';
import { ScrollView } from 'react-native-gesture-handler';
const Notify = (props) => {
    return (
        <ScrollView style={{backgroundColor:"#0E043B"}}>
            <List>
                <ListItem thumbnail>
                    <Left>
                        <Thumbnail square source={{ uri: props.item.postedBy.userphoto }} />
                                            <EvilIcons name={'heart' } size={14} color="green" />
                    </Left>
                    <Body>
                        <Text style={{color:"white"}}>
                        {props.item.Title}
                        </Text>
                        <Text note numberOfLines={2} style={{color:"white"}} >{props.item.caption}</Text>
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