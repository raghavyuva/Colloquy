import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, FlatList, StatusBar } from 'react-native'
import { firebase } from '../components/firebase'
import 'firebase/auth';
import 'firebase/firestore';
import { Button, Input, Card, CardItem, Label, Left, Right, Body, Thumbnail, Fab, Icon, Header, Item, List, ListItem } from 'native-base';
import { useTheme } from '@react-navigation/native';
import { Entypo, MaterialIcons } from '@expo/vector-icons';
import LottieView from 'lottie-react-native';
import Headerv from '../components/Header';
import { DataLayerValue } from '../Context/DataLayer';
import { Config } from '../config';
import Usercard from '../components/Usercard';
import {
    Avatar,
} from 'react-native-paper';
import LoadingComp from '../components/LoadingComp';
require('firebase/storage');
const ListOfChats = (props) => {



    const [roomName, setRoomName] = useState("");
    const { colors } = useTheme();
    const [threads, setThreads] = useState([]);
    const [active, setActive] = useState(false);
    const [searchText, setsearchText] = useState(null);
    const [filtered, setfiltered] = useState(null);
    const [loading, setloading] = useState(true);
    const [Notfound, setNotfound] = useState(false);
    const [AllUsers, setAllUsers] = useState(null);
    const [refresh, setrefresh] = useState(false);
    const [{ user, defdarktheme, searchactive, userToken, UserId }, dispatch] = DataLayerValue()



    useEffect(() => {
        setloading(true);

        FetchThreads();
        FetchAll();

    }, []);


    const FetchThreads = () => {
        setloading(true);
        firebase
            .firestore()
            .collection('chatrooms')
            .onSnapshot((querySnapshot) => {
                const threads = querySnapshot.docs.map((documentSnapshot) => {

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
                });
                setThreads(threads);
                setloading(false);
            });
    }
    const ActivateSearch = () => {
        // if (searchactive == true) {
        //     props.navigation.goBack();
        // }
        dispatch({ type: 'SEARCHCOMPONENT', data: !searchactive })
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
        fetch(`${Config.url}` + `/allusers`, {
            headers: {
                'Authorization': 'Bearer ' + `${userToken}`,
            },
            method: 'GET'
        })
            .then((response) => response.json())
            .then((responseJson) => {
                setAllUsers(responseJson)
                setloading(false);
            })
    }


    const MessageParticularguy = (guy) => {
        // const chatterID = user.user._id;
        // const chateeID = guy._id;
        // const chatIDpre = [];
        // chatIDpre.push(chatterID);
        // chatIDpre.push(chateeID);
        // chatIDpre.sort();
        // chatIDpre.join('_');
        //     firebase
        //         .firestore()
        //         .collection('THREADS')
        //         .add({
        //             name: guy.username,
        //             latestMessage: {
        //                 text: `Chat Enabled`,
        //                 createdAt: new Date().getTime(),
        //             },
        //             sentby:user.user.username
        //         })
        //         .then((docRef) => {
        //             docRef.collection(user.user.username).add({
        //                 text: `Chat Enabled`,
        //                 createdAt: new Date().getTime(),
        //                 system: true,
        //             });
        //             docRef.collection(guy.username).add({
        //                 text: `Chat Enabled`,
        //                 createdAt: new Date().getTime(),
        //                 system: true,
        //             });
        //             alert('done')
        //         });
        dispatch({ type: "CHATTINGUSER", data: guy })
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
                        {item.UserType.sentBy === user.user._id || item.UserType.sentTo === user.user._id
                            ? (
                                <>
                                    {item.UserType.sentBy === user.user._id ? (
                                        <TouchableOpacity onPress={() => { MessageParticularguy(item.latestMessage.user2) }}   >
                                            <Card style={{ borderWidth: 2, borderColor: colors.border, borderBottomColor: colors.border, }} >

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
                                                        <Text note style={{ color: colors.text }}>{new Date(item.latestMessage.createdAt).toDateString()}</Text>
                                                    </Right>
                                                </CardItem>
                                            </Card>
                                        </TouchableOpacity>
                                    ) : (
                                        <TouchableOpacity onPress={() => { MessageParticularguy(item.UserType.SentUserDetails) }}   >
                                            <Card style={{ borderWidth: 2, borderColor: colors.border, borderBottomColor: colors.border, }} >
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
                                                    <Right>
                                                        <Text note style={{ color: colors.text }}>{new Date(item.latestMessage.createdAt).toDateString()}</Text>
                                                    </Right>
                                                </CardItem>
                                            </Card>
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
    // const HeaderForChat = () => {
    //     return (


    //     )
    // }
    const ListOfUsers = () => {
        return (
            <FlatList
                renderItem={({ item }) => {
                    return (
                        <Usercard item={item} name={'chatscreen'} user={UserId} {...props} thread={threads} />
                    );
                }}
                keyExtractor={(item, index) => index.toString()}
                data={filtered && filtered.length > 0 ? filtered : AllUsers}
                onEndReached={FetchAll}
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
                                    <ChatSection />
                                    <Card style={{ backgroundColor: colors.background, borderWidth: 0, borderColor: colors.card }}>
                                        <Text style={{ color: colors.primary, fontSize: 16, fontStyle: 'italic' }}>Your Friends On Vtyuva</Text>
                                    </Card>
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
                                onSubmitEditing={()=>search(searchText)}
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
                        <ChatSection />
                        {/* <ListOfUsers /> */}
                        <FabComponent />
                    </View>
                </>
            )
            }
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
