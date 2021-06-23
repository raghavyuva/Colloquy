import React, { useState, useEffect, useRef } from 'react'
import { View, Text, SafeAreaView, FlatList, TouchableOpacity, StyleSheet, Platform } from 'react-native'
import Headerv from '../components/Header';
import Postcard from '../components/Postcard';
import { DataLayerValue } from '../Context/DataLayer';
import { Config } from '../config';
import * as Notifications from 'expo-notifications';
import { useTheme } from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import Constants from 'expo-constants';
import { Button, Icon, Item, Input, Header, Card, CardItem, List, ListItem, Left, Body, Thumbnail, Right } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';
import Usercard from '../components/Usercard';
import * as Device from 'expo-device';
import NotFoundComp from '../components/NotFoundComp';
import LoadingComp from '../components/LoadingComp';
import * as ImagePicker from 'expo-image-picker';
import {
    AdMobBanner,
    AdMobInterstitial,
    PublisherBanner,
    AdMobRewarded,
    setTestDeviceIDAsync,

} from 'expo-ads-admob';
import WaveComp from '../components/WaveComp';

const Home = (props) => {

    const [{ userToken, postData, searchactive, UserId, allusers, isOnline, }, dispatch] = DataLayerValue();
    const [Notify, setNotify] = useState('');
    const [refresh, setrefresh] = useState(false);
    const [loading, setloading] = useState(true);
    const [searchText, setsearchText] = useState(null);
    const [filtered, setfiltered] = useState(null);
    const [active, setactive] = useState('Post');
    const [AllUsers, setAllUsers] = useState(null);
    const [dataforfilter, setdataforfilter] = useState(null);
    const [Notfound, setNotfound] = useState(false);
    const [reward, setreward] = useState(false);
    const [disableinter, setdisableinter] = useState(false);

    const { colors } = useTheme();
    AdMobRewarded.setAdUnitID("ca-app-pub-1751328492898824/8806464007")
    useEffect(() => {
        let IsMounted = true
        requestUserPermission();
        AdMobInterstitial.setAdUnitID('ca-app-pub-3940256099942544/1033173712')
        _openInterstitial()

        // setTestDeviceIDAsync('EMULATOR');
        // _openRewarded()
        registerForPushNotifications();
        Notifications.addNotificationReceivedListener(_handleNotification);
        fetching();
        FetchAll();
        return () => {
            IsMounted = false;
        }
    }, [])


    const fetching = () => {
        setrefresh(true)
        fetch(`${Config.url}` + `/post`, {
            headers: {
                'Authorization': 'Bearer ' + `${userToken}`,
            },
            method: 'GET'
        })
            .then((response) => response.json())
            .then((responseJson) => {
                dispatch({
                    type: "POSTDATA",
                    postData: responseJson
                })
                setrefresh(false);
                setloading(false)
            })
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
                dispatch({ type: 'RETRIEVEALLUSERS', data: responseJson })
            })
    }







    const _handleNotification = notification => {
        setNotify(notification)
    };




    const ActivateSearch = () => {
        // if (searchactive == true) {
        //     props.navigation.goBack();
        // }
        dispatch({ type: 'SEARCHCOMPONENT', data: !searchactive })
    }





    async function requestUserPermission() {
        let token;
        if (Device.osName == 'Android') {
            const { status: existingStatus } = await Notifications.getPermissionsAsync();
            let finalStatus = existingStatus;
            if (existingStatus !== 'granted') {
                const { status } = await Notifications.requestPermissionsAsync();
                finalStatus = status;
            }
            if (finalStatus !== 'granted') {
                alert('Failed to get push token for push notification!');
                return;
            }
            token = (await Notifications.getExpoPushTokenAsync()).data;
        } else {
            alert('Must use physical device for Push Notifications');
        }
        if (Platform.OS === 'android') {
            Notifications.setNotificationChannelAsync('default', {
                name: 'default',
                importance: Notifications.AndroidImportance.MAX,
                vibrationPattern: [0, 250, 250, 250],
                lightColor: '#FF231F7C',
                showBadge: true,
                sound: true,
                lockscreenVisibility: true,
                enableVibrate: true,
                description: 'check now'
            });
        }
        return token;
    }










    const registerForPushNotifications = async () => {
        const token = await Notifications.getExpoPushTokenAsync();
        console.log(token.data);
        try {
            fetch(`${Config.url}` + `/notifytoken`, {
                method: 'PUT',
                headers: {
                    'Authorization': 'Bearer ' + `${userToken}`,
                    'Content-Type': "application/json",
                },
                body: JSON.stringify({
                    notifytoken: token.data
                })
            }).then(res => res.json()).then((resp) => {
            })
        } catch (error) {
            alert(error);
            console.log(error);
        }
    };

    const GoTo_top_function = () => {



    }












    const changedata = () => {
        switch (active) {
            case 'People':
                setdataforfilter(AllUsers);
                setfiltered([])
                setsearchText('')
                setNotfound(false);
                break;
            case 'Post':
                setdataforfilter(postData);
                setfiltered([])
                setsearchText('')
                setNotfound(false);
                break;
            default:
                break;
        }
    }





    const search = () => {
        console.log(active)
        switch (active) {
            case 'People':
                let filteredData = allusers.filter(function (item) {
                    setNotfound(false)
                    return item.username.toLowerCase().includes(searchText.toLowerCase());
                });
                setfiltered(filteredData);
                if (filteredData.length === 0) {
                    setNotfound(true)
                }
                break;
            case 'Post':
                let filteredDatas = postData.filter(function (item) {
                    setNotfound(false)
                    return item.caption.toLowerCase().includes(searchText.toLowerCase());

                });
                if (filteredDatas.length === 0) {
                    setNotfound(true)
                }
                setfiltered(filteredDatas);
                break;
            default:
                break;
        }

    };


    const PostCardComp = (props) => {
        return (
            <FlatList
                renderItem={({ item, index }) => {
                    return (
                        <Postcard item={item} {...props} name={props.section} />
                    );
                }}
                keyExtractor={(item, index) => index.toString()}
                data={props.section === 'NormalView' ? postData : filtered && filtered.length > 0 ? filtered : postData}
                onEndReached={fetching && GoTo_top_function}
                scrollEnabled
                onScrollAnimationEnd
                scrollToOverflowEnabled
                onEndReachedThreshold={0}
                refreshing={refresh}
                onRefresh={fetching}
                style={{ marginBottom: 100 }}
            />

        )
    }
    const _openInterstitial = async () => {
        try {
            setdisableinter(true)
            await AdMobInterstitial.requestAdAsync()
            await AdMobInterstitial.showAdAsync().then((d) => {
                alert(d)
            })

        } catch (error) {
            console.error(error)
            alert(error);
        } finally {
            setdisableinter(false);
        }
    }
    const _openRewarded = async () => {
        try {
            setreward(true)
            await AdMobRewarded.requestAdAsync()
            await AdMobRewarded.showAdAsync()
        } catch (error) {
            console.error(error)
        } finally {
            setreward(false);
        }
    }
    const PeopLeComp = () => {
        return (
            <FlatList

                renderItem={({ item }) => {
                    return (
                        <Usercard item={item} name={'followers'} user={UserId} {...props} />
                    );
                }}
                keyExtractor={(item, index) => index.toString()}
                data={filtered && filtered.length > 0 ? filtered : allusers}
                onEndReached={FetchAll && GoTo_top_function}
                scrollEnabled
                onScrollAnimationEnd
                scrollToOverflowEnabled
                onEndReachedThreshold={0}
                refreshing={refresh}
                onRefresh={FetchAll}


            />
        )
    }
    const FilterCardComp = () => {
        return (
            <FlatList
                renderItem={({ item }) => {
                    return (
                        <CardItem style={active == item.name ? styles(colors).cardofactive : styles(colors).cardof}>
                            <TouchableOpacity onPress={() => {
                                setactive(item.name)
                                changedata();
                            }}
                                style={{ flexDirection: 'row' }}>
                                <Text style={{ color: colors.text }}>{item.name} </Text>

                            </TouchableOpacity>
                        </CardItem>
                    );
                }}
                keyExtractor={(item, index) => index.toString()}
                data={Filter}
                horizontal
            />
        )
    }

    // const HeaderComp = () => {
    //     return (

    //     )
    // }


    const ActiveRenderer = () => {
        return (
            <>
                {active == 'Post' ? (
                    <PostCardComp  {...props} section='FilterView' />
                ) : (
                    <>
                        {active == 'People' ? (
                            <>
                                <PeopLeComp />
                            </>
                        ) : (
                            <>

                            </>
                        )}
                    </>
                )}
            </>
        )
    }



    if (loading) {
        return (
            <LoadingComp />
        )
    }


    return (
        <SafeAreaView >

            {searchactive ? (
                <>
                    <View>
                        <Header searchBar rounded style={{ backgroundColor: colors.background, }}>
                            <Item style={{ backgroundColor: colors.background }}>
                                <TouchableOpacity onPress={ActivateSearch}>
                                    <Icon name="arrow-back" style={{ backgroundColor: colors.background }} />
                                </TouchableOpacity>
                                <Input placeholder="Search" style={{ backgroundColor: colors.card, borderRadius: 25, color: colors.text, justifyContent: 'flex-end' }}
                                    onChangeText={(bo) => setsearchText(bo)}
                                    value={searchText}
                                    clearButtonMode='while-editing'
                                    multiline={false}
                                    keyboardAppearance='dark'
                                    keyboardType='web-search'
                                    onSubmitEditing={() => search(searchText)}
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
                        <Card style={styles(colors).cardoff}>
                            <FilterCardComp />
                        </Card>
                        {
                            Notfound == false ? (
                                <>

                                    <ActiveRenderer />

                                </>
                            ) : (
                                <>
                                    <NotFoundComp />
                                </>
                            )
                        }

                    </View>
                </>
            ) : (
                <>
                    <Headerv {...props} />

                    <AdMobBanner
                        bannerSize='fullBanner'
                        adUnitID={Platform.OS == 'android' ? "ca-app-pub-3940256099942544/6300978111" : "ca-app-pub-1751328492898824/7396129668"}
                        // servePersonalizedAds={true} // true or false
                        // style={{ backgroundColor: colors.background, color: colors.text }}
                        onAdFailedToLoad={error => console.error(error)}
                    />
                    <PostCardComp {...props} section='NormalView' />

                </>
            )
            }
        </SafeAreaView >
    )
}

export default Home
const Filter = [
    {
        "name": 'People',
        "id": 1
    },
    {
        "name": 'Post',
        "id": 2
    },
    // {
    //     "name": 'Tag',
    //     "id": 3
    // },
    // {
    //     "name": 'Category',
    //     "id": 74
    // },
    // {
    //     "name": 'Location',
    //     "id": 75
    // },
]
const styles = (colors) => StyleSheet.create({
    cardoff: {
        backgroundColor: colors.background,
        borderWidth: 0,
        borderColor: colors.background
    },
    cardof: {
        margin: 4,
        backgroundColor: colors.background,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: colors.border
    },
    cardofactive: {
        backgroundColor: colors.card,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: colors.primary,
        margin: 4
    }
});
