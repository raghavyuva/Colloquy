import React, { useEffect } from 'react';
import {  FlatList, } from 'react-native';
import { Container, } from 'native-base';

import { Config } from '../config';
import { DataLayerValue } from '../Context/DataLayer';
import Usercard from '../components/Usercard';
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
