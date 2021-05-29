import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, FlatList } from 'react-native'
import { firebase } from '../components/firebase'
import 'firebase/auth';
import 'firebase/firestore';
import { Button, Input, Card, CardItem, Label, Left, Right, Body, Thumbnail, Fab, Icon, Header, Item } from 'native-base';
import { useTheme } from '@react-navigation/native';
import { Entypo, MaterialIcons } from '@expo/vector-icons';
import LottieView from 'lottie-react-native';
import Headerv from '../components/Header';
import { DataLayerValue } from '../Context/DataLayer';
import { Config } from '../config';
import Usercard from '../components/Usercard';
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

    const [{ user, defdarktheme, searchactive,userToken,UserId }, dispatch] = DataLayerValue()
    const handleButtonPress = () => {
     
    };

  

    useEffect(() => {
        setloading(true);

        const unsubscribe = firebase
            .firestore()
            .collection('THREADS')
            .onSnapshot((querySnapshot) => {
                const threads = querySnapshot.docs.map((documentSnapshot) => {

                    return {
                        _id: documentSnapshot.id,
                        name: "",
                        avatar: '', 
                        latestMessage: {
                            text: "",
                            createdAt: ''
                        },
                        ...documentSnapshot.data(),
                    };
                }); 
                setThreads(threads);
                setloading(false);
            });
            FetchAll();
        return () => unsubscribe();
    }, []);
    const ActivateSearch = () => {
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
            })
    }
    const ChatSection = () => {
        return (
            <FlatList
                data={threads}
                keyExtractor={(item) => item._id}
                renderItem={({ item, index }) => (
                    <TouchableOpacity
                        onPress={() => {
                            props.navigation.navigate('external', {
                                screen: 'chat', params: {
                                    thread: item
                                }
                            })
                        }
                        }
                    >
                        <Card style={{ backgroundColor: colors.card, borderRadius: null, borderWidth: 0, borderColor: colors.background }}
                        >
                            <CardItem avatar style={{ backgroundColor: colors.card, borderRadius: null, borderWidth: 0, }}>
                                <Left>
                                    <Body>
                                        <Text style={styles(colors).listTitle} numberOfLines={1}>{item.name}</Text>
                                        <Text note style={styles(colors).listDescription} numberOfLines={3}>{item.latestMessage.messagebyemail}: {item.latestMessage.text}</Text>
                                    </Body>
                                </Left>
                                <Right>
                                    <Text note style={{ color: colors.text }}>{new Date(item.latestMessage.createdAt).toDateString()}</Text>
                                </Right>
                            </CardItem>
                        </Card>
                    </TouchableOpacity>
                )}
            />
        )
    }
    if (loading) {
        return (
            <View style={{ justifyContent: "center", flex: 1, backgroundColor: colors.background }}>
                <LottieView
                    loop={true}
                    autoPlay={true}
                    source={require('../animation/8370-loading.json')}
                />
            </View>
        )
    }
    return (
        <View style={{ flex: 1 }}>
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
                  <FlatList
                  renderItem={({ item }) => {
                      return (
                          <Usercard item={item} name={'chatscreen'} user={UserId} {...props} />
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


              />
              </>
            ) : (
                <>
                <View style={{flex:1}} >
                    <Headerv {...props} />
                    <ChatSection />
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
