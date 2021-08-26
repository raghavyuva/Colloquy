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
import LoadingComp from '../components/LoadingComp';
import { useSelector, useDispatch } from 'react-redux';
import { setUserFollowers } from '../redux/actions/UserAction';
import NotFoundComp from '../components/NotFoundComp';

const Followers = (props) => {
  const [load, setload] = useState(true);
  const { colors } = useTheme();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userDetails);
  const followers = useSelector((state) => state.userDetails.followers);

  const fetching = async () => {
    try {
      const Listener = fetch(`${Config.url}` + `/followerslist`, {
        headers: {
          'Authorization': 'Bearer ' + `${user.userToken}`,
        }
      })
        .then((response) => response.json())
        .then((responseJson) => {
          dispatch(setUserFollowers(responseJson));
          setload(false);
        }) 
    } catch (e) {
      console.log(e);
    }
  }
  useEffect(() => {
    let IsMounted = true;
    fetching();
    return () => {
      IsMounted = false;
    }
  }, [])

  if (load) {
    return (
      <LoadingComp />
    )
  }
  return (
    <Container style={{ backgroundColor: colors.background }}>
      <Header {...props} />
    
        <FlatList
          data={followers}
          renderItem={({ item }) => {
            return (
              <Usercard item={item} name={'followers'} user={UserId} {...props} />
            );
          }}
          keyExtractor={item => item._id}
          ListEmptyComponent={
         <NotFoundComp />
          }
        />
    </Container>
  )
}

export default Followers
