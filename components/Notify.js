import React from 'react';
import { StyleSheet, } from 'react-native';
import { List, ListItem, Thumbnail, Text, Left, Body, } from 'native-base';
import { ScrollView } from 'react-native-gesture-handler';
import { DefaultTheme, DarkTheme, useTheme } from '@react-navigation/native';

const Notify = (props) => {
  const {colors} = useTheme();

  return (

    <ScrollView style={{ backgroundColor: colors.background }}>
      <List style={{ borderBottomWidth: 0, borderWidth: 2, borderColor: colors.border, borderBottomColor: colors.border }}>
        <ListItem thumbnail>
          <Left>
            <Thumbnail source={{ uri: props.item.postedBy.userphoto }} />
          </Left>
          <Body style={{ borderBottomWidth: 0, borderWidth: 0, borderColor: colors.border, borderBottomColor: colors.border }}>
            <Text style={{ color: colors.text }}>
              {props.item.Title}
            </Text>
            <Text note numberOfLines={2} style={{ color: colors.text }} >{props.item.caption}</Text>
          </Body>
        </ListItem>
      </List>
    </ScrollView>

  )
}

export default Notify
const styles = StyleSheet.create({

})