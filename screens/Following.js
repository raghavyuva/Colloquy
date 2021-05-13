import React, { useEffect, useState } from 'react';
import { FlatList, Image, View ,Dimensions} from 'react-native';
import { Container, } from 'native-base';
import LottieView from 'lottie-react-native';
import { Config } from '../config';
import { DataLayerValue } from '../Context/DataLayer';
import Usercard from '../components/Usercard';
import Header from '../components/Header';
const { width, height } = Dimensions.get('window');
import { DefaultTheme, DarkTheme, useTheme } from '@react-navigation/native';

const Following = (props) => {
  const [{ userToken, followinglist }, dispatch] = DataLayerValue()
  const [load, setload] = useState(true);
  const {colors} = useTheme();

  const fetching = async () => {
    try {
      const Listener = fetch(`${Config.url}` + `/followinglist`, {
        headers: {
          'Authorization': 'Bearer ' + `${userToken}`,
        }
      })
        .then((response) => response.json())
        .then((responseJson) => {
          dispatch({
            type: "FOLLOWINGLIST",
            data: responseJson
          })
          setload(false);
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
  if (followinglist == 0 || followinglist == null) {
    return(
      <View style={{ flex: 1, backgroundColor: colors.background,}}>
                <Header {...props} />
                <View style={{ justifyContent: 'center',alignSelf: 'center',flex: 1}}>
                <Image
                    source={{uri:'https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fcdn.onlinewebfonts.com%2Fsvg%2Fimg_412721.png&f=1&nofb=1'}}
                    style={{ width: width, height: 400, alignSelf: 'center', marginLeft: 2,justifyContent: 'center', }}
                />
                </View>
              
            </View>
    )
  }
  if (load) { 
    return (
      <View style={{ justifyContent: "center", flex: 1, backgroundColor:colors.background }}>
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
    <Container style={{ backgroundColor: colors.background}}>
      <Header {...props} />
      {
        followinglist[0] != null ? (
          <FlatList
            data={followinglist}
            renderItem={({ item }) => {
              return (
                <Usercard item={item} {...props} />
              );
            }}
            keyExtractor={item => item._id}
          />
        ) : (
            <Image
              source={require('../assets/emptyy.png')}
              style={{ width: width, height: height , alignSelf: 'center',justifyContent:'center',}}
            />
          )
      }

    </Container>
  )
}

export default Following
