import React, { useState, useEffect } from 'react'
import { View, Text, SafeAreaView, FlatList, TouchableOpacity, StyleSheet, Platform, StatusBar } from 'react-native'
import Headerv from '../components/Header';
import Postcard from '../components/Postcard';
import { DataLayerValue } from '../Context/DataLayer';
import { Config } from '../config';
import * as Notifications from 'expo-notifications';
import { useTheme } from '@react-navigation/native';
import { Icon, Item, Header, CardItem, } from 'native-base';
import Usercard from '../components/Usercard';
import * as Device from 'expo-device';
import NotFoundComp from '../components/NotFoundComp';
import LoadingComp from '../components/LoadingComp';
import { Searchbar, } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux'; 
import { setFeeds } from '../redux/actions/FeedAction';
  
const Home = (props) => { 
    const feeds = useSelector((state) => state.allfeeds.feeds);
    const user = useSelector((state) => state.userDetails); 
    const load = useSelector((state) => state.loadingDetails.loading);
    const [Notify, setNotify] = useState('');
    const [refresh, setrefresh] = useState(false);
    const [searchText, setsearchText] = useState(null);
    const [filtered, setfiltered] = useState(null);
    const [active, setactive] = useState('Post');
    const [AllUsers, setAllUsers] = useState(null);
    const [dataforfilter, setdataforfilter] = useState(null);
    const [Notfound, setNotfound] = useState(false);
    const { colors } = useTheme();
    const dispatch = useDispatch();

    const fetchFeeds = async () => {
        const respo = await fetch(`${Config.url}/post`, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + `${user.userToken}`,
            },
        }).then(resp => resp.json()).then((d) => {
            dispatch(setFeeds(d))
        })
    }

    useEffect(() => {
        let IsMounted = true
        fetchFeeds();
        return () => {
            IsMounted = false;
        }
    }, [])

    const PostCardComp = (props) => {
        return (
            <FlatList
                renderItem={({ item, index }) => {
                    return (
                        <Postcard item={item} {...props} name={props.section} />
                    );
                }}
                keyExtractor={(item, index) => index.toString()}
                data={props.section === 'NormalView' ? feeds : filtered && filtered.length > 0 ? filtered : feeds}
                // onEndReached={fetching && GoTo_top_function}
                scrollEnabled
                onScrollAnimationEnd
                scrollToOverflowEnabled
                onEndReachedThreshold={0}
                refreshing={refresh}
                onRefresh={fetchFeeds}
                style={{ marginBottom: 0, marginTop: 10 }}
            />
 
        )
    }

    const FetchAll = () => {
        fetch(`${Config.url}` + `/allusers`, {
            headers: {
                'Authorization': 'Bearer ' + `${userToken}`,
            },
            method: 'GET'
        })
            .then((response) => response.json())
            .then((responseJson) => {

            })
    }







    return (
        <SafeAreaView
            style={{
                backgroundColor: colors.card
            }}
        >

            <>
                <Headerv {...props} />
                <PostCardComp {...props} section='NormalView' />

            </>


        </SafeAreaView >
    )
}
export default Home;