import React, { useState, useEffect } from 'react'
import { SafeAreaView, FlatList, View, Dimensions, Image } from 'react-native'
import Header from '../components/Header';
import Postcard from '../components/Postcard';
import { Config } from '../config';
import LottieView from 'lottie-react-native';
import { DefaultTheme, DarkTheme, useTheme } from '@react-navigation/native';
import LoadingComp from '../components/LoadingComp';
const { width, height } = Dimensions.get('window');
import { useSelector, useDispatch } from 'react-redux';
import { setSubscribedFeeds } from '../redux/actions/FeedAction';
import NotFoundComp from '../components/NotFoundComp';

const Home = (props) => {
    const [refresh, setrefresh] = useState(false);
    const [load, setload] = useState(true);
    const dispatch = useDispatch();
    const subscribeddata = useSelector(state => state.allfeeds.subscribedfeeds)
    const user = useSelector((state) => state.userDetails);

    const fetching = () => {
        setrefresh(true);
        fetch(`${Config.url}` + `/subscription`, {
            headers: {
                'Authorization': 'Bearer ' + `${user.userToken}`,
            },
            method: 'GET'
        })
            .then((response) => response.json())
            .then((responseJson) => {
                dispatch(setSubscribedFeeds(responseJson));
                setrefresh(false)
                setload(false);
            })
    }
    useEffect(() => {
        fetching();
        return () => {
        }
    }, [])
    const { colors } = useTheme();
    const GoTo_top_function = () => {
        flatListRef.scrollToOffset({ animated: true, offset: 0 });
    }
    if (load) {
        return (
            <LoadingComp />
        ); 
    } 

    return (
        <SafeAreaView >
            <Header {...props} />
            <FlatList
                renderItem={({ item }) => {
                    return (
                        <Postcard item={item} {...props} />
                    );
                }}
                keyExtractor={(item, index) => index.toString()}
                data={subscribeddata}
                onEndReached={fetching && GoTo_top_function}
                scrollEnabled
                onScrollAnimationEnd
                scrollToOverflowEnabled
                onEndReachedThreshold={0}
                style={{ marginBottom: 50 }}
                refreshing={refresh}
                onRefresh={fetching}
                ListEmptyComponent={
                    <NotFoundComp />
                }
            />
        </SafeAreaView>
    )
}

export default Home
