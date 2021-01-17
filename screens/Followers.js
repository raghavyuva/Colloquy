import React, {useEffect } from 'react';
import {FlatList, Dimensions,  } from 'react-native';
import { Container, } from 'native-base';

import { Config } from '../config';
import { DataLayerValue } from '../Context/DataLayer';
import Usercard from '../components/Usercard';
import Header from '../components/Header';
const Followers = (props) => {
    const [{ userToken, followerslist ,UserId}, dispatch] = DataLayerValue()

  const  fetching = async () => {
        try {
              const Listener = fetch(`${Config.url}` + `/followerslist`, {
                headers: {
                  'Authorization': 'Bearer ' + `${userToken}`,
                }
              })
                .then((response) => response.json())
                .then((responseJson) => {
                  dispatch({
                      type:"FOLLOWERSLIST",
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
        <Container style={{backgroundColor:'#0b032b'}}>
        <Header {...props} />
        <FlatList
          data={followerslist}
          renderItem={({ item }) => {
            return (
                <Usercard item={item} name={'followers'} user={UserId} {...props} />
            );
        }}
          keyExtractor={item => item._id}
        />
      </Container>
    )
}

export default Followers
