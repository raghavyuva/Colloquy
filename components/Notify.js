import React from 'react';
import { StyleSheet, TouchableOpacity,Alert } from 'react-native';
import { List, ListItem, Thumbnail, Text, Left, Body, View, Right, } from 'native-base';
import { ScrollView } from 'react-native-gesture-handler';
import { DefaultTheme, DarkTheme, useTheme } from '@react-navigation/native';
import { MaterialIcons, AntDesign, MaterialCommunityIcons, Entypo } from '@expo/vector-icons';
import { useSelector, useDispatch } from 'react-redux';
import { Config } from '../config';
const Notify = (props) => {
  const { colors } = useTheme();
  const user = useSelector((state) => state.userDetails);

  const onNotifyDelete = (id) =>{
    Alert.alert(
      'Delete Post',
      'Are you sure you want to delete this post?,once deleted cannot be retrieved',
      [
          { text: 'Cancel' },
          {
              text: 'YES', onPress: () =>
                  fetch(`${Config.url}` + `/deletenotification/${id}`, {
                      method: 'Delete',
                      headers: {
                          'Authorization': 'Bearer ' + `${user.userToken}`,
                          'Content-Type': "application/json",
                      },
                  }).then(res => res.json()).then((resp) => {
                     console.log(resp);
                  })
          }
      ]
  );
  }

  return (
    <ScrollView style={{ 
      backgroundColor: colors.background,
      borderRadius: 10,
      marginBottom: 5,
      shadowColor: "#000",
      shadowOffset: {
          width: 0,
          height: 6,
      },
      shadowOpacity: 0.37,
      shadowRadius: 7.49,

      elevation: 12,
      margin:10
    }}>
      <List style={{  }}>
        <ListItem thumbnail>
          <Left>
            <Thumbnail source={{ uri: props.item.postedBy.userphoto }} square />
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
          <Right>
         <TouchableOpacity onPress={()=>onNotifyDelete(props.item._id)}>
         <MaterialIcons name="delete" size={24} color='red' />
         </TouchableOpacity>
          </Right>
        </ListItem>
      </List>
    </ScrollView>
  )
}

export default Notify
const styles = StyleSheet.create({

})