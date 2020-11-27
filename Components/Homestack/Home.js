import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity, Image, FlatList, ImageBackground, Dimensions, Modal, SafeAreaView, Share, Alert, ToastAndroid } from 'react-native';
import { AsyncStorage } from 'react-native';
import { CardItem, Text, Button, Left, View, Right, Body, } from 'native-base';
import { EvilIcons, AntDesign, FontAwesome5, Ionicons, Entypo, FontAwesome, Feather } from '@expo/vector-icons';
import * as MediaLibrary from 'expo-media-library';
import * as FileSystem from 'expo-file-system';
import * as Permissions from 'expo-permissions';
import * as Font from 'expo-font';
import Header from './Header';
import { URL } from '../../config';
const { width } = Dimensions.get('window');
import * as Notifications from 'expo-notifications';
import Avatar from '../common/Avatar';
Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true,
    }),
});
export default class Home extends Component {
    state = {
        Data: '',
        modalVisible: false,
        id: "",
        notifytoken: '',
        notification: {}
    }
    _handleNotification = notification => {
        this.setState({ notification: notification });
    };
    _handleNotificationResponse = response => {

    };
    async componentDidMount() {
        await Font.loadAsync({
            'Roboto': require('native-base/Fonts/Roboto.ttf'),
            'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
            ...Ionicons.font,
        })
        await this.requestUserPermission();
        await this.registerForPushNotifications();
        Notifications.addNotificationReceivedListener(this._handleNotification);
        Notifications.addNotificationResponseReceivedListener(this._handleNotificationResponse);
        this.sendToken();
        this.setState({ loading: false })
        this.fetching();
    }
    _renderItem({ item, index }) {
        return (
            <View >
                <ImageBackground style={{ width: 400, height: 200, alignSelf: "center", }} source={{ uri: item.img }} />
            </View>
        );
    }
    fetching = async () => {
        try {
            await AsyncStorage.getItem('userName').then(userName => {
                this.setState({ id: userName })
                // console.log(this.state.id)
                AsyncStorage.getItem('userToken').then(token => {
                    const Listener = fetch(`${URL.url}` + `/post`, {
                        headers: {
                            'Authorization': 'Bearer ' + `${token}`,
                        },
                        method: 'GET'
                    })
                        .then((response) => response.json())
                        .then((responseJson) => {
                            this.setState({ Data: responseJson })

                        })
                })
            })
        } catch (e) {
            alert(e);
        }
    }
    sendToken = () => {
        try {
            AsyncStorage.getItem('userToken').then((token) => {
                fetch(`${URL.url}` + `/notifytoken`, {
                    method: 'PUT',
                    headers: {
                        'Authorization': 'Bearer ' + `${token}`,
                        'Content-Type': "application/json",
                    },
                    body: JSON.stringify({
                        notifytoken: this.state.notifytoken
                    })
                }).then(res => res.json()).then((resp) => {
                })
                console.log('token sent');
            })
        } catch (error) {
            alert(error);
            console.log(error);
        }
    }
    requestUserPermission = async () => {
        const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
        let finalStatus = existingStatus;
        // only ask if permissions have not already been determined, because
        // iOS won't necessarily prompt the user a second time.
        if (existingStatus !== 'granted') {
            // Android remote notification permissions are granted during the app
            // install, so this will only ask on iOS
            const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
            finalStatus = status;
        }
        // Stop here if the user did not grant permissions
        if (finalStatus !== 'granted') {
            return;
        }
        console.log(finalStatus);
    }
    registerForPushNotifications = async () => {
        const token = await Notifications.getExpoPushTokenAsync();
        this.setState({ notifytoken: token.data })
        console.log(this.state.notifytoken);
    };
    downloadFile(item) {
        Alert.alert(
            'Download Post',
            'Do you want to download this post?,',
            [
                { text: 'Cancel', onPress: () => console.warn('NO Pressed'), style: 'cancel' },
                {
                    text: 'YES', onPress: () => {
                        const uri = item.photo;
                        let fileUri = FileSystem.documentDirectory + `${item.postedBy.username}.jpg`;
                        FileSystem.downloadAsync(uri, fileUri)
                            .then(({ uri }) => {
                                this.saveFile(uri);
                                ToastAndroid.show("Post Image Downloaded !", ToastAndroid.LONG);
                            })
                            .catch(error => {
                                console.error(error);
                            })
                    }
                }
            ]
        );

    }
    saveFile = async (fileUri) => {
        const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        if (status === "granted") {
            const asset = await MediaLibrary.createAssetAsync(fileUri)
            await MediaLibrary.createAlbumAsync("Primish", asset, false)
        }
    }
    onlIKE = async (item) => {
        try {
            AsyncStorage.getItem('userToken').then(token => {
                fetch(`${URL.url}` + `/posts/like/${item._id}`, {
                    method: 'PUT',
                    headers: {
                        'Authorization': 'Bearer ' + `${token}`,
                        'Content-Type': "application/json",
                    },
                }).then(res => res.json()).then((resp) => {
                })
            })
        } catch (error) {
            alert(error);
        }
    }
    onUnlIKE = (item) => {
        try {
            AsyncStorage.getItem('userToken').then(token => {
                fetch(`${URL.url}` + `/posts/unlike/${item._id}`, {
                    method: 'PUT',
                    headers: {
                        'Authorization': 'Bearer ' + `${token}`,
                        'Content-Type': "application/json",
                    },
                }).then(res => res.json()).then((resp) => {
                    console.log(resp);
                })
            })
        } catch (error) {
            alert(error);
        }
    }

    renderer = ({ item, index }) => {
        return (
            <TouchableOpacity
                activeOpacity={1}
                style={styles.item}
                onPress={() => this.props.navigation.navigate('external', { screen: 'view', params: { item: item } })}
                onLongPress={() => { this.downloadFile(item) }}
            >
                <CardItem style={{ flexDirection: 'row', backgroundColor: '#000' }}>
                    <TouchableOpacity onPress={() => {
                        AsyncStorage.getItem('userName').then(idd => {
                            if (item.postedBy._id == idd) {
                                this.props.navigation.navigate('external', { screen: 'profile' })
                            } else {
                                this.props.navigation.navigate('external', { screen: 'userpro', params: { thread: item.postedBy._id } })
                            }
                        })

                    }}>
                        <Image
                            source={{ uri: item.postedBy.userphoto }}
                            style={{ width: 60, height: 60, borderRadius: 100, margin: 15, borderWidth: 2, borderColor: "#17b978" }}
                        />
                    </TouchableOpacity>
                    <Body style={{ margin: 20 }}>
                        <Text style={{ color: "white", fontWeight: "500", fontSize: 18, }} numberOfLines={1}>{item.postedBy.username}</Text>
                        <Text style={{ color: "white", fontWeight: "500", fontSize: 10, }} numberOfLines={1}>1 day ago</Text>
                    </Body>
                    <Right>
                        <View >
                            <TouchableOpacity style={{}} onPress={() => { this.downloadFile(item) }}>
                                <Feather name="bookmark" size={28} color="white" style={{ textAlign: "right" }} />
                            </TouchableOpacity>
                        </View>
                    </Right>

                </CardItem>
                <Image
                    source={{ uri: item.photo }}
                    style={styles.imageBackground}
                >
                </Image>
                <View style={styles.lowerContainer}>
                    <Text style={styles.titleText}></Text>
                    <Text style={styles.contentText} numberOfLines={2}>{item.caption} </Text>
                    <CardItem style={{ backgroundColor: "#000", }} >
                        <Left>
                            <Button transparent textStyle={{ color: '#87838B' }}>
                                <EvilIcons name="comment" size={28} color="white" />
                                <Text style={{ textTransform: 'capitalize', color: 'white' }}>{item.comments.length}  </Text>
                            </Button>
                            <Button transparent textStyle={{ color: '#87838B' }} >
                                {item.likes.includes(this.state.id) ?
                                    (<TouchableOpacity onPress={() => {
                                        this.onUnlIKE(item);
                                    }}>
                                        <AntDesign name="heart" size={28} color="#fff" />
                                    </TouchableOpacity>
                                    ) : (
                                        <TouchableOpacity onPress={() => {
                                            this.onlIKE(item);
                                        }}>
                                            <Entypo name="heart-outlined" size={28} color="#fff" />
                                        </TouchableOpacity>
                                    )
                                }
                                <Text style={{ textTransform: 'capitalize', color: 'white' }}>{item.likes.length} likes</Text>
                            </Button>
                            <Button transparent>
                                <FontAwesome name="smile-o" size={28} color="#fff" />
                                <Text style={{ textTransform: 'capitalize', color: 'white' }}>50</Text>
                            </Button>
                            <Button transparent onPress={() => {
                                Share.share({
                                    url: `${item.photo}`,
                                    title: `${item.postedBy.userName}`,
                                    message: `${item.caption}`,

                                })
                            }} >
                                <Ionicons name="md-share-alt" size={24} color="white" />
                            </Button>
                        </Left>
                    </CardItem>
                </View>
            </TouchableOpacity>
        )
    }
    render() {
        return (
            <SafeAreaView style={{ backgroundColor: '#000' }}>
                <View >
                    <Header {...this.props} />



                    <View>
                        <FlatList
                            renderItem={this.renderer}
                            keyExtractor={(item, index) => index.toString()}
                            data={this.state.Data}
                        />
                    </View>
                </View>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    txt1: {
        fontSize: 22,
        color: "#f0f0f0",
        alignSelf: "center",
        fontWeight: 'bold'
    },
    txt2: {
        fontSize: 18,
        color: "#f0f0f0",
        alignSelf: "center",
        fontWeight: '800'
    },
    carousel: {
        height: '50%',
        backgroundColor: "#f0f0f0",
        paddingTop: 30,
    },
    item: {
        borderWidth: 2,
        backgroundColor: '#000',
        borderRadius: 1,
        borderColor: 'grey',
        elevation: 3,
        margin: 10
    },
    imageBackground: {
        backgroundColor: '#482ff7',
        width: 300,
        height: 300,
        alignSelf: "center",
        marginTop: 0,
    },
    rightTextContainer: {
        marginLeft: 'auto',
        marginRight: -2,
        backgroundColor: 'rgba(49, 49, 51,0.5)',
        padding: 3,
        marginTop: 3,
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5
    },
    rightText: { color: 'white' },
    lowerContainer: {
        margin: 0
    },
    titleText: {
        fontWeight: 'bold',
        fontSize: 18,
        color: "#fff"
    },
    contentText: {
        fontSize: 12,
        color: "#fff"
    }
})