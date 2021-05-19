import React, { useState, useEffect } from 'react'
import { View, Text, SafeAreaView, FlatList, TouchableOpacity, StyleSheet } from 'react-native'
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

const Home = (props) => {
    const [{ userToken, postData, searchactive, UserId }, dispatch] = DataLayerValue();
    const [Notify, setNotify] = useState('');
    const [refresh, setrefresh] = useState(false);
    const [loading, setloading] = useState(true);
    const [searchText, setsearchText] = useState(null);
    const [filtered, setfiltered] = useState(null);
    const [active, setactive] = useState('Post');
    const [AllUsers, setAllUsers] = useState(null);
    const [dataforfilter, setdataforfilter] = useState(null);
    const [itemforfilter, setitemforfilter] = useState(null);
    const fetching = () => {
        setrefresh(true);
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
                setrefresh(false)
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
                setAllUsers(responseJson)
            })
    }
    const { colors } = useTheme();
    useEffect(() => {
        let IsMounted = true;
        requestUserPermission();
        dispatch({ type: 'ROUTEPROP', data: 'Home' })
        registerForPushNotifications();
        Notifications.addNotificationReceivedListener(_handleNotification);
        fetching();
        FetchAll();
        return () => {
            IsMounted = false;
        }
    }, [])
    const _handleNotification = notification => {
        setNotify(notification)
    };
    const ActivateSearch = () => {
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
            });
        } 

        return token;
    }
    const registerForPushNotifications = async () => {
        const token = await Notifications.getExpoPushTokenAsync();
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

        flatListRef.scrollToOffset({ animated: true, offset: 0 });

    }
    const changedata = () => {
        switch (active) {
            case 'People':
                setdataforfilter(AllUsers);
                setitemforfilter('username')
                break;
            case 'Post':
                setdataforfilter(postData);
                setitemforfilter('caption')
                break;
            default:
                break;
        }
        console.log(dataforfilter);
    }
    const search = (searchTex,) => {
        setsearchText(searchTex)
        switch (active) {
            case 'People':
                setdataforfilter(AllUsers);
                setitemforfilter('username')
                break;
            case 'Post':
                setdataforfilter(postData);
                setitemforfilter('caption')
                break;
            default:
                break;
        }
        let filteredData = dataforfilter.filter(function (item) {
            return item[`${itemforfilter}`].toLowerCase().includes(searchTex);

        });
        setfiltered(filteredData);

    };

    if (loading) {
        return (
            <View style={{ justifyContent: "center", flex: 1, backgroundColor: colors.background }}>
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
        <SafeAreaView >

            {searchactive ? (
                <>
                    <View>
                        <Header searchBar rounded style={{ backgroundColor: colors.background, }}>
                            <Item style={{ backgroundColor: colors.background }}>
                                <TouchableOpacity onPress={ActivateSearch}>
                                    <Icon name="arrow-back" style={{ backgroundColor: colors.background }} />
                                </TouchableOpacity>
                                <Input placeholder="Search" style={{ backgroundColor: colors.card, borderRadius: 15, color: colors.text }}
                                    onChangeText={search}
                                    value={searchText}
                                />
                                <TouchableOpacity >
                                    <Icon name="ios-search" style={{ backgroundColor: colors.background }} />
                                </TouchableOpacity>
                            </Item>
                            <Button transparent>
                                <Text>Search</Text>
                            </Button>
                        </Header>
                        <Card style={styles(colors).cardoff}>
                            <FlatList
                                ref={(ref) => { flatListRef = ref; }}
                                renderItem={({ item }) => {
                                    return (
                                        <CardItem style={styles(colors).cardof}>
                                            <TouchableOpacity onPress={() => {
                                                setactive(item.name)
                                                changedata();
                                            }}
                                                style={{ flexDirection: 'row' }}>
                                                <Text style={{ color: colors.text }}>{item.name} </Text>
                                                {active == item.name ?
                                                    (<MaterialIcons name="done" size={18} color={colors.primary} />) : (
                                                        <>
                                                        </>
                                                    )
                                                }
                                            </TouchableOpacity>
                                        </CardItem>
                                    );
                                }}
                                keyExtractor={(item, index) => index.toString()}
                                data={Filter}
                                horizontal
                            />
                        </Card>
                        {active == 'Post' ? (
                            <FlatList
                                renderItem={({ item }) => {
                                    return (
                                        <Postcard item={item} {...props} />
                                    );
                                }}
                                keyExtractor={(item, index) => index.toString()}
                                data={filtered && filtered.length > 0 ? filtered : postData}
                                onEndReached={fetching && GoTo_top_function}
                                scrollEnabled
                                onScrollAnimationEnd
                                scrollToOverflowEnabled
                                onEndReachedThreshold={0}
                                style={{ marginBottom: 50 }}
                                refreshing={refresh}
                                onRefresh={fetching}
                            />
                        ) : (
                            <>
                                {active == 'People' ? (
                                    <>
                                        <FlatList

                                            renderItem={({ item }) => {
                                                return (
                                                    <Usercard item={item} name={'followers'} user={UserId} {...props} />
                                                );
                                            }}
                                            keyExtractor={(item, index) => index.toString()}
                                            data={filtered && filtered.length > 0 ? filtered : AllUsers}
                                            onEndReached={FetchAll && GoTo_top_function}
                                            scrollEnabled
                                            onScrollAnimationEnd
                                            scrollToOverflowEnabled
                                            onEndReachedThreshold={0}
                                            style={{ marginBottom: 50 }}
                                            refreshing={refresh}
                                            onRefresh={FetchAll}


                                        />
                                    </>
                                ) : (
                                    <>
                                    </>
                                )}
                            </>
                        )}
                    </View>
                </>
            ) : (
                <>
                    <Headerv {...props} />
                    <FlatList

                        renderItem={({ item }) => {
                            return (
                                <Postcard item={item} {...props} />
                            );
                        }}
                        keyExtractor={(item, index) => index.toString()}
                        data={postData}
                        onEndReached={fetching && GoTo_top_function}
                        scrollEnabled
                        onScrollAnimationEnd
                        scrollToOverflowEnabled
                        onEndReachedThreshold={0}
                        style={{ marginBottom: 50 }}
                        refreshing={refresh}
                        onRefresh={fetching}
                    />
                </>
            )}

        </SafeAreaView>
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
    {
        "name": 'Tag',
        "id": 3
    },
    {
        "name": 'Category',
        "id": 74
    },
    {
        "name": 'Location',
        "id": 75
    },
]
const styles = (colors) => StyleSheet.create({
    cardoff: {
        backgroundColor: colors.background,
        borderWidth: 0,
        borderColor: colors.background
    },
    cardof: {
        backgroundColor: colors.background,
        margin: 2,
        backgroundColor: colors.card,
    }
});
