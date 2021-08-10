import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, FlatList, StatusBar } from 'react-native'
import 'firebase/auth';
import 'firebase/firestore';
import { Button, Input, Card, CardItem, Label, Left, Right, Body, Thumbnail, Fab, Icon, Header, Item, List, ListItem } from 'native-base';
import { useTheme } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import Headerv from '../components/Header';
import { DataLayerValue } from '../Context/DataLayer';
import { Config } from '../config';
import Usercard from '../components/Usercard';
import LoadingComp from '../components/LoadingComp';
var _ = require('lodash');
import { useSelector, useDispatch } from 'react-redux';
import * as firebase from 'firebase'
require('firebase/storage');

import {
    AdMobBanner,
    AdMobInterstitial,
    PublisherBanner,
    AdMobRewarded,
    setTestDeviceIDAsync,

} from 'expo-ads-admob';
const ListOfChats = (props) => {
    const { colors } = useTheme();
    const [threads, setThreads] = useState([]);
    const [active, setActive] = useState(false);
    const [searchText, setsearchText] = useState(null);
    const [filtered, setfiltered] = useState(null);
    const [loading, setloading] = useState(true);
    const [Notfound, setNotfound] = useState(false);
    const [AllUsers, setAllUsers] = useState(null);
    const [refresh, setrefresh] = useState(false);
    const user = useSelector((state) => state.userDetails);
    const searchactive = false;
    useEffect(() => {
        let IsMounted = true;
        setloading(true);
        // _openInterstitial(); 
        FetchThreads();
        FetchAll();
        ExcludealreadySpokenUser()
        return () => {
            IsMounted = false;
        }
    }, []); 
    // AdMobInterstitial.setAdUnitID('ca-app-pub-6850525676679466/9071881837')

    // const _openInterstitial = async () => {
    //     try {
    //         setdisableinter(true)
    //         await AdMobInterstitial.requestAdAsync()
    //         await AdMobInterstitial.showAdAsync()
    //         FetchThreads();
    //         FetchAll();
    //     } catch (error) {
    //         console.error(error)
    //     } finally {
    //         setdisableinter(false);
    //     }
    // }
 

    const FetchThreads = () => {
        setloading(true);
        firebase
            .firestore()
            .collection('chatrooms').orderBy("latestMessage", "desc")
            .onSnapshot((querySnapshot) => {
                const threads = querySnapshot.docs.map((documentSnapshot) => {
                    if (documentSnapshot.data().UserType.sentBy === user.user._id || documentSnapshot.data().UserType.sentTo === user.user._id) {
                        // console.log('hey')
                        // setAllUsers(AllUsers - documentSnapshot.data().UserType.sentTo )
                    }
                    return { 
                        _id: documentSnapshot.id,
                        name: "",
                        avatar: '',
                        user2: [],
                        latestMessage: {
                            text: "",
                            createdAt: ''
                        },
                        UserType: {
                            sentBy: '',
                            sentTo: ''
                        },
                        ...documentSnapshot.data(),
                    };
                })
                setThreads(threads);
                setloading(false);
            });

    }
    const ActivateSearch = () => {

    }

    const search = () => {
        let filteredData = AllUsers.filter(function (item) {
            setNotfound(false)
            return item.username.toLowerCase().includes(searchText.toLowerCase());
        });
        setfiltered(filteredData);
        if (filteredData.length === 0) {
            setNotfound(true)
        }
    }

    const FetchAll = () => {
        fetch(`${Config.url}` + `/AllUsers`, {
            headers: {
                'Authorization': 'Bearer ' + `${user.userToken}`,
            },
            method: 'GET'
        })
            .then((response) => response.json())
            .then((responseJson) => {
                var som = _.shuffle(responseJson)
                setAllUsers(som);
                setloading(false);
            })
    }
   const ExcludealreadySpokenUser = () =>{

   }  
    const MessageParticularguy = (guy) => {
        props.navigation.navigate('external', {
            screen: 'message', params: { 
                anotheruser: guy
            }
        })
    }
    const ChatSection = () => {
        return (
            <FlatList
                data={threads}
                keyExtractor={(item) => item._id}
                renderItem={({ item, index }) =>
                (
                    <>
                        {item.UserType.sentBy === user.user.user._id || item.UserType.sentTo === user.user.user._id
                            ? (
                                <>
                                    {item.UserType.sentBy === user.user.user._id ? (
                                        <TouchableOpacity onPress={() => { MessageParticularguy(item.latestMessage.user2) }}   >
                                            <View style={{
                                                 backgroundColor: colors.background,
                                                 borderRadius: 15,
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
                                            }} >
                                                <CardItem avatar style={{ backgroundColor: colors.background, borderRadius: null, borderWidth: 0, margin: 0 }}>
                                                    <Thumbnail
                                                        source={{
                                                            uri: item.latestMessage.user2.userphoto
                                                        }}
                                                        size={50}
                                                        square
                                                        style={{ borderRadius: 5 }}
                                                    />
                                                    <Left>
                                                        <Body>
                                                            <Text style={styles(colors).listTitle} numberOfLines={1}>{item.latestMessage.user2.username}</Text>
                                                            <Text note style={styles(colors).listDescription} numberOfLines={3}> {item.latestMessage.text}</Text>
                                                        </Body>
                                                    </Left>
                                                    <Right>
                                                        <Body style={{ justifyContent: "flex-end" }}>
                                                            <Text note style={{ color: colors.text }}>{new Date(item.latestMessage.createdAt).toDateString().slice(4)}</Text>
                                                            <Text note style={{ color: colors.primary, }}>{new Date(item.latestMessage.createdAt).toTimeString().split("GMT+0530 (IST)")}</Text>
                                                        </Body>
                                                    </Right>
                                                </CardItem>
                                            </View>
                                        </TouchableOpacity>
                                    ) : (
                                        <TouchableOpacity onPress={() => { MessageParticularguy(item.UserType.SentUserDetails) }}   >
                                            <View style={{

                                                    backgroundColor: colors.background,
                                                    borderRadius: 15,
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
                                            }} >
                                                <CardItem avatar style={{ backgroundColor: colors.background, borderRadius: null, borderWidth: 0, margin: 0 }}>
                                                    <Thumbnail
                                                        source={{
                                                            uri: item.UserType.SentUserDetails.userphoto
                                                        }}
                                                        size={50}
                                                        square
                                                        style={{ borderRadius: 5 }}
                                                    />
                                                    <Left>
                                                        <Body>
                                                            <Text style={styles(colors).listTitle} numberOfLines={1}>{item.UserType.SentUserDetails.username}</Text>
                                                            <Text note style={styles(colors).listDescription} numberOfLines={3}> {item.latestMessage.text}</Text>
                                                        </Body>
                                                    </Left>
                                                    <Right >
                                                        <Body style={{ justifyContent: "flex-end" }}>
                                                            <Text note style={{ color: colors.text }}>{new Date(item.latestMessage.createdAt).toDateString().slice(4)}</Text>
                                                            <Text note style={{ color: colors.primary, }}>{new Date(item.latestMessage.createdAt).toTimeString().split("GMT+0530 (IST)")}</Text>
                                                        </Body>
                                                    </Right>
                                                </CardItem>
                                            </View>
                                        </TouchableOpacity>
                                    )}
                                </>
                            ) : (
                                <>

                                </>
                            )
                        }
                    </>

                )}

            />
        )
    }
    const ListOfUsers = () => {
        return (
            <FlatList
                renderItem={({ item }) => {
                    return (
                        <Usercard item={item} name={'chatscreen'} user={user.UserId} {...props} thread={threads} />
                    )
                }}
                keyExtractor={(item, index) => index.toString()}
                data={filtered && filtered.length > 0 ? filtered : AllUsers}
                // onEndReached={FetchAll}
                scrollEnabled
                onScrollAnimationEnd
                scrollToOverflowEnabled
                onEndReachedThreshold={0}
                refreshing={refresh}
                onRefresh={FetchAll}
                ListHeaderComponent={() => {
                    return (
                        <>
                            {searchactive ? (
                                <>
                                </>
                            ) : (
                                <>
                                    <Text style={{ color: colors.primary, fontSize: 20, marginLeft: 15 }}>Recent chats</Text>
                                    <ChatSection />
                                    <Text style={{ color: colors.primary, fontSize: 18, marginLeft: 15 }}>Your Friends On Vtyuva</Text>
                                </>
                            )}
                        </>
                    )
                }}
            />
        )
    }

    const FabComponent = () => {
        return (
            <Fab
                active={active}
                direction="up"
                containerStyle={{}}
                style={{ backgroundColor: colors.primary, }}
                position="bottomRight"
                onPress={() => setActive(!active)}>
                <Icon name="plus" type='Entypo' />

                <Button style={{ backgroundColor: 'green', marginBottom: 40 }} onPress={() => {
                    navigation.navigate('SuperAdmin');
                }}  >
                    <Icon name="new-message" type='Entypo' />
                </Button>
                <Button style={{ backgroundColor: '#3B5998', marginBottom: 40 }}>
                    <Icon name="share" />
                </Button>
                <Button style={{ backgroundColor: '#DD5', marginBottom: 40 }} onPress={() => Linking.openURL('https://raghav.orak.in/releases')}>
                    <MaterialIcons name="new-releases" size={24} color="black" />
                </Button>
            </Fab>
        )
    }

    if (loading) {
        return (
            <LoadingComp />
        )
    }

    return (
        <View style={{ flex: 1 }}>
            <StatusBar backgroundColor={colors.card} />
            {searchactive ? (
                <>
                    <Header searchBar rounded style={{ backgroundColor: colors.background, }}>
                        <StatusBar backgroundColor={colors.card} />
                        <Item style={{ backgroundColor: colors.background }}>
                            <TouchableOpacity onPress={ActivateSearch}>
                                <Icon name="arrow-back" style={{ backgroundColor: colors.background }} />
                            </TouchableOpacity>
                            <Input placeholder="Find People to text" style={{ backgroundColor: colors.card, borderRadius: 5, color: colors.text, justifyContent: 'flex-end' }}
                                onChangeText={(bo) => setsearchText(bo)}
                                value={searchText}
                                clearButtonMode='while-editing'
                                keyboardAppearance='dark'
                                keyboardType='web-search'
                                onSubmitEditing={() => search(searchText)}
                                multiline={false}
                            >
                            </Input>
                            <TouchableOpacity onPress={() => search(searchText)}>
                                <Icon name="ios-search" style={{ backgroundColor: colors.background, color: colors.primary }} />
                            </TouchableOpacity>
                        </Item>
                        <Button transparent>
                            <Text>Search</Text>
                        </Button>
                    </Header>
                    <ListOfUsers />
                </>
            ) : (
                <>
                    <View style={{ flex: 1 }} >
                        <StatusBar backgroundColor={colors.card} />
                        <Headerv {...props} />
                        {/* <ChatSection /> */}
                        <ListOfUsers />
                        {/* <FabComponent /> */}

                    </View>
                </>
            )
            }
            {/* <AdMobBanner
                bannerSize="fullBanner"
                adUnitID="ca-app-pub-3940256099942544/6300978111" // Test ID, Replace with your-admob-unit-id
                servePersonalizedAds // true or false
            /> */}
        </View>
    )
} 

export default ListOfChats

const styles = (colors) => StyleSheet.create({
    listTitle: {
        color: colors.text,
        fontSize: 18,
        fontWeight: 'bold'
    },
    listDescription: {
        color: colors.text
    }
})
