import React, { useEffect, useState } from 'react';
import { FlatList, Image, View, Dimensions } from 'react-native';
import { Container, } from 'native-base';
import LottieView from 'lottie-react-native';
import { Config } from '../config';
import { DataLayerValue } from '../Context/DataLayer';
import Usercard from '../components/Usercard';
import Header from '../components/Header';
const { width, height } = Dimensions.get('window');
import { DefaultTheme, DarkTheme, useTheme } from '@react-navigation/native';
import LoadingComp from '../components/LoadingComp';
import { useSelector, useDispatch } from 'react-redux';
import { setUserFollowings } from '../redux/actions/UserAction';

const Following = (props) => {
  const [load, setload] = useState(true);
  const { colors } = useTheme();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userDetails);
  const followinglist = useSelector((state) => state.userDetails.following);
  const fetching = async () => {
    try {
      const Listener = fetch(`${Config.url}` + `/followinglist`, {
        headers: {
          'Authorization': 'Bearer ' + `${user.userToken}`,
        }
      })
        .then((response) => response.json())
        .then((responseJson) => {
          dispatch(setUserFollowings(responseJson));
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
    return (
      <View style={{ flex: 1, backgroundColor: colors.background, }}>
        <Header {...props} />
        <View style={{ justifyContent: 'center', alignSelf: 'center', flex: 1 }}>
          <Image
            source={{ uri: 'https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fcdn.onlinewebfonts.com%2Fsvg%2Fimg_412721.png&f=1&nofb=1' }}
            style={{ width: width, height: 400, alignSelf: 'center', marginLeft: 2, justifyContent: 'center', }}
          />
        </View>

      </View>
    )
  }
  if (load) {
    return (
      <LoadingComp />
    )
  }
  return (
    <Container style={{ backgroundColor: colors.background }}>
      <Header {...props} />
      {
        followinglist[0] != null ? (
          <FlatList
            data={followinglist}
            renderItem={({ item }) => {
              return (
                <Usercard item={item} {...props} name={'following'} user={user.userId} />
              );
            }}
            keyExtractor={item => item._id}
          />
        ) : (
          <Image
            source={{ uri: 'https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fcdn.onlinewebfonts.com%2Fsvg%2Fimg_412721.png&f=1&nofb=1' }}
            style={{ width: width, height: height, alignSelf: 'center', justifyContent: 'center', }}
          />
        )
      }

    </Container>
  )
}

export default Following
