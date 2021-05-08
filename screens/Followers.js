import React, { useEffect, useState } from 'react';
import { FlatList, Dimensions, Image, View, } from 'react-native';
import { Container, } from 'native-base';
import LottieView from 'lottie-react-native';
import { Config } from '../config';
import { DataLayerValue } from '../Context/DataLayer';
import Usercard from '../components/Usercard';
import Header from '../components/Header';
const { width, height } = Dimensions.get('window');
import { DefaultTheme, DarkTheme, useTheme } from '@react-navigation/native';

const Followers = (props) => {
  const [{ userToken, followerslist, UserId }, dispatch] = DataLayerValue()
  const [load, setload] = useState(true);
  const {colors} = useTheme();
  const fetching = async () => {
    try {
      const Listener = fetch(`${Config.url}` + `/followerslist`, {
        headers: {
          'Authorization': 'Bearer ' + `${userToken}`,
        }
      })
        .then((response) => response.json())
        .then((responseJson) => {
          dispatch({
            type: "FOLLOWERSLIST",
            data: responseJson
          })
        })
    } catch (e) {
      console.log(e);
    }
  }
  useEffect(() => {
    fetching();
    setTimeout(() => {
      setload(false);
    }, 2000);
    return () => {

    }
  }, [])
  if (load) {
    return (
      <View style={{ justifyContent: "center", flex: 1, backgroundColor:colors.card }}>
        <LottieView
          loop={true}
          autoPlay={true}
          source={require('../animation/5328-loading-11.json')}
          style={{ width: 400, height: 400 }}
        />
      </View>
    )
  }
  return (
    <Container style={{ backgroundColor:colors.background}}>
      <Header {...props} />
      {followerslist[0] != null ? (
        <FlatList
          data={followerslist}
          renderItem={({ item }) => {
            return (
              <Usercard item={item} name={'followers'} user={UserId} {...props} />
            );
          }}
          keyExtractor={item => item._id}
        />
      ) : (
          <Image
            source={require('../assets/emptyy.png')}
            style={{ width: width, height: height, alignSelf: 'center' }}
          />
        )}


    </Container>
  )
}

export default Followers
