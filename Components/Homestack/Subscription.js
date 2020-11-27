import React, { Component } from 'react'
import { StyleSheet, TouchableOpacity, Image, FlatList, ImageBackground, Dimensions, Modal, SafeAreaView, Share, Alert, ToastAndroid } from 'react-native'
import { AsyncStorage } from 'react-native';
import { CardItem, Text, Button, Left, View, } from 'native-base';
import { EvilIcons, AntDesign, FontAwesome5, Ionicons, Entypo, FontAwesome } from '@expo/vector-icons';
import * as MediaLibrary from 'expo-media-library';
import * as FileSystem from 'expo-file-system';
import * as Permissions from 'expo-permissions';
import * as Font from 'expo-font';
import Header from './Header';
import { URL } from '../../config';
const { width } = Dimensions.get('window');
export default class Subscription extends Component {
    state = {
        Data: '',
        modalVisible: false,
        id: ""
    }
    async componentDidMount() {
        await Font.loadAsync({
            'Roboto': require('native-base/Fonts/Roboto.ttf'),
            'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
            ...Ionicons.font,
        })
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
    onSharePress = () => Share.share(this.shareOptions);
    shareOptions = {
        title: 'Title',
        message: 'Message to share',
        url: 'www.example.com',
        subject: 'Subject',
        uri: ""
    };
    fetching = async () => {
        try {
            await AsyncStorage.getItem('userName').then(userName => {
                this.setState({ id: userName })
                AsyncStorage.getItem('userToken').then(token => {
                    const Listener = fetch(`${URL.url}` + `/subscription`, {
                        headers: {
                            'Authorization': 'Bearer ' + `${token}`,
                        },
                        method: 'GET'
                    })
                        .then((response) => response.json())
                        .then((responseJson) => {
                            this.setState({ Data: responseJson })
                            //console.log(this.state.Data)
                        })
                })
            })
        } catch (e) {
            alert(e);
        }
    }
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
                    console.log(resp);

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
                <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
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
                            style={{ width: 40, height: 40, borderRadius: 100, margin: 15 }}
                        />
                    </TouchableOpacity>
                    <Text style={{ color: "white", fontWeight: "500", fontSize: 18, textAlign: "center", margin: 15 }} numberOfLines={1}>{item.postedBy.username}</Text>
                    <View >
                        <TouchableOpacity onPress={() => {
                            Share.share({
                                url: `${item.photo}`,
                                title: `${item.postedBy.userName}`,
                                message: `${item.caption}`,

                            })
                        }}>
                            <FontAwesome name="share" size={26} color="white" style={{ alignSelf: 'flex-end', marginTop: 15, justifyContent: 'flex-end' }} />
                        </TouchableOpacity>
                    </View>
                </View>
                <Image
                    source={{ uri: item.photo }}
                    style={styles.imageBackground}
                >
                </Image>
                <View style={styles.lowerContainer}>
                    <Text style={styles.titleText}></Text>
                    <Text style={styles.contentText} numberOfLines={2}>{item.caption} </Text>
                    <CardItem style={{ backgroundColor: "#482ff7" }} >
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
                                        <AntDesign name="heart" size={28} color="#f3f169" />
                                    </TouchableOpacity>
                                    ) : (
                                        <TouchableOpacity onPress={() => {
                                            this.onlIKE(item);
                                        }}>
                                            <Entypo name="heart-outlined" size={28} color="#f3f169" />
                                        </TouchableOpacity>
                                    )
                                }
                                <Text style={{ textTransform: 'capitalize', color: 'white' }}>{item.likes.length} likes</Text>
                            </Button>
                            <Button transparent>
                                <FontAwesome name="smile-o" size={28} color="#f3f169" />
                                <Text style={{ textTransform: 'capitalize', color: 'white' }}>50</Text>
                            </Button>
                        </Left>
                    </CardItem>
                </View>
            </TouchableOpacity>
        )
    }
    render() {
        return (
            <SafeAreaView>
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
    row1: {
        marginTop: 100,
        alignSelf: 'center'
    },
    row2: {
        marginTop: 40,
        alignSelf: "center"
    },
    row3: {
        marginTop: -20,
        alignSelf: "center"
    },
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
        fontWeight: '500'
    },
    carousel: {
        height: '50%',
        backgroundColor: "#f0f0f0",
        paddingTop: 30,
    },
    item: {
        borderWidth: 2,
        backgroundColor: '#482ff7',
        borderRadius: 5,
        borderColor: '#f3f169',
        elevation: 3,
        margin: 20
    },
    imageBackground: {
        backgroundColor: '#482ff7',
        borderWidth: 1,
        borderColor: '#f3f169',
        width: 300,
        height: 300,
        alignSelf: "center",
        marginTop: 20,
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
        margin: 10
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
