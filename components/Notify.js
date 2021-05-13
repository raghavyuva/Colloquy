import React from 'react';
import { StyleSheet, } from 'react-native';
import { List, ListItem, Thumbnail, Text, Left, Body, View, } from 'native-base';
import { ScrollView } from 'react-native-gesture-handler';
import { DefaultTheme, DarkTheme, useTheme } from '@react-navigation/native';
import { MaterialIcons, AntDesign, MaterialCommunityIcons, Entypo } from '@expo/vector-icons';

const Notify = (props) => {
  const { colors } = useTheme();
  return (
    <ScrollView style={{ backgroundColor: colors.background }}>
      <List style={{ borderBottomWidth: 0, borderWidth: 2, borderColor: colors.border, borderBottomColor: colors.border }}>
        <ListItem thumbnail>
          <Left>
            <Thumbnail source={{ uri: props.item.postedBy.userphoto }} />
          </Left>
          <Body style={{ borderBottomWidth: 0, borderWidth: 0, borderColor: colors.border, borderBottomColor: colors.border }}>
            <Text style={{ color: colors.text }} note numberOfLines={2}>
              {props.item.Title}
            </Text>
            <View style={{ flexDirection: 'row' }}>
              <Text note numberOfLines={1} style={{ color: colors.primary }}>{props.item.caption}</Text>
              {props.item.caption == 'like' ? (
                <MaterialCommunityIcons name="cards-heart" size={24} color='#ff1493' />
              ) : (
                <MaterialIcons name="comment" size={24} color='red' />
              )}
            </View>
          </Body>
        </ListItem>
      </List>
    </ScrollView>
  )
}

export default Notify
const styles = StyleSheet.create({

})