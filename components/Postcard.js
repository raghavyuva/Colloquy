import React, { useEffect, useState } from 'react'
import { StyleSheet, TouchableOpacity, Image, FlatList, ImageBackground, Dimensions, Modal, SafeAreaView, Share, Alert, ToastAndroid, Platform } from 'react-native';
import { CardItem, Text, Button, Left, View, Right, Body, Item, Input } from 'native-base';
import { MaterialIcons, AntDesign, MaterialCommunityIcons, Entypo } from '@expo/vector-icons';
import * as MediaLibrary from 'expo-media-library';
import * as FileSystem from 'expo-file-system';
import * as Permissions from 'expo-permissions';
import { Config } from '../config';
const { width, height } = Dimensions.get('window');
import { DataLayerValue } from '../Context/DataLayer';
import LottieView from 'lottie-react-native';
const Postcard = (props) => {
    const [{ userToken, UserId }, dispatch] = DataLayerValue();
    const [active, setactive] = useState(false);
    const [commenttext, setcommenttext] = useState('');

    useEffect(() => {
        return () => {
        }
    }, [])
    const downloadFile = (item) => {
        Alert.alert(
            'Download Post',
            'Do you want to download this post?,',
            [
                { text: 'Cancel' },
                {
                    text: 'YES', onPress: () => {
                        const uri = item.photo;
                        let fileUri = FileSystem.documentDirectory + `${item.postedBy.username}.jpg`;
                        FileSystem.downloadAsync(uri, fileUri)
                            .then(({ uri }) => {
                                saveFile(uri);
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
    const openPhotos = (uri) => {
        switch (Platform.OS) {
            case "ios":
                Linking.openURL("photos-redirect://");
                break;
            case "android":
                Linking.openURL("content://media/internal/images/media");
                break;
            default:
                console.log("Could not open gallery app");
        }
    }
    const saveFile = async (fileUri) => {
        const { status } = await Permissions.askAsync(Permissions.MEDIA_LIBRARY);
        if (status === "granted") {
            const asset = await MediaLibrary.createAssetAsync(fileUri)
            await MediaLibrary.createAlbumAsync("Primish", asset, false)
            openPhotos(fileUri)
        } else {
            alert('provide permission');
        }
    }
    const DeletePost = async (item) => {
        Alert.alert(
            'Delete Post',
            'Are you sure you want to delete this post?,once deleted cannot be retrieved',
            [
                { text: 'Cancel' },
                {
                    text: 'YES', onPress: () =>
                        fetch(`${Config.url}` + `/post/${item._id}`, {
                            method: 'Delete',
                            headers: {
                                'Authorization': 'Bearer ' + `${userToken}`,
                                'Content-Type': "application/json",
                            },
                        }).then(res => res.json()).then((resp) => {
                            updatestore();
                        })
                }
            ]
        );
    }
    const updatestore = () => {
        fetch(`${Config.url}` + `/subscription`, {
            headers: {
                'Authorization': 'Bearer ' + `${userToken}`,
            },
            method: 'GET'
        })
            .then((response) => response.json())
            .then((responseJson) => {
                dispatch({
                    type: "SUBSCRIPTION",
                    data: responseJson
                })
            })
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
            })
        fetch(`${Config.url}` + `/savednotification`, {
            headers: {
                'Authorization': 'Bearer ' + `${userToken}`,
            }
        })
            .then((response) => response.json())
            .then((responseJson) => {
                dispatch({
                    type: "NOTIFYLIST",
                    data: responseJson
                })
            })
    }
    const Notifyy = (val, item) => {
        fetch("https://exp.host/--/api/v2/push/send",
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: "POST",
                body: JSON.stringify({
                    to: item.postedBy.notifytoken,
                    sound: 'default',
                    vibrationPattern: [0, 250, 250, 250],
                    lightColor: '#FF231F7C',
                    body: `  "${val}" on your post`,
                    title: ` on post ${item.caption}`
                })
            })
        fetch(`${Config.url}` + `/savenotification/${item.postedBy._id}`,
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + `${userToken}`,
                },
                method: "POST",
                body: JSON.stringify({
                    caption: `like`,
                    Title: `${val} on post ${item.caption}`,
                    url: "wfhahws"
                })
            })
    }
    const onlIKE = async (item) => {
        try {
            fetch(`${Config.url}` + `/posts/like/${item._id}`, {
                method: 'PUT',
                headers: {
                    'Authorization': 'Bearer ' + `${userToken}`,
                    'Content-Type': "application/json",
                },
            }).then(res => res.json()).then(async (resp) => {
                let val = 'like';
                await updatestore();
                await Notifyy(val, item);
            })
        } catch (error) {
            alert(error);
        }
    }
    const onUnlIKE = (item) => {
        try {
            fetch(`${Config.url}` + `/posts/unlike/${item._id}`, {
                method: 'PUT',
                headers: {
                    'Authorization': 'Bearer ' + `${userToken}`,
                    'Content-Type': "application/json",
                },
            }).then(res => res.json()).then(async (resp) => {
                await updatestore();
            })
        } catch (error) {
            alert(error);
        }
    }
    const NavigateFull = (item) => {
        dispatch({
            type: 'FULLVIEW',
            data: item
        })
        props.navigation.navigate('external', { screen: 'view' })
    }
    const onVote = async (item) => {
        try {
            fetch(`${Config.url}` + `/posts/vote/${item._id}`, {
                method: 'PUT',
                headers: {
                    'Authorization': 'Bearer ' + `${userToken}`,
                    'Content-Type': "application/json",
                },
            }).then(res => res.json()).then(async (resp) => {
                await updatestore();
            })
        } catch (error) {
            alert(error);
        }
    }
    const onVotecancell = (item) => {
        try {
            fetch(`${Config.url}` + `/posts/votecancell/${item._id}`, {
                method: 'PUT',
                headers: {
                    'Authorization': 'Bearer ' + `${userToken}`,
                    'Content-Type': "application/json",
                },
            }).then(res => res.json()).then(async (resp) => {
                await updatestore();
            })
        } catch (error) {
            alert(error);
        }
    }

    return (
        <TouchableOpacity
            activeOpacity={1}
            style={styles.item}
            onPress={() => NavigateFull(props.item)}
            onLongPress={() => { downloadFile(props.item) }}
        >
            <CardItem style={{ flexDirection: 'row', backgroundColor: '#0e072b', margin: 0, padding: 0 }}>
                <TouchableOpacity onPress={() => {
                    if (props.item.postedBy._id == UserId) {
                        props.navigation.navigate('external', { screen: 'profile' })
                    } else {
                        props.navigation.navigate('external', { screen: 'userpro', params: { thread: props.item.postedBy._id } })
                    }
                }}>
                    <Image
                        source={{ uri: props.item.postedBy.userphoto }}
                        style={{ width: 60, height: 60, borderRadius: 100, margin: 5, borderWidth: 2, borderColor: "#17b978" }}
                    />
                </TouchableOpacity>
                <Body style={{ margin: 10 }}>
                    <Text style={{ color: "white", fontWeight: "500", fontSize: 18, }} numberOfLines={1}>{props.item.postedBy.username}</Text>
                    <Text style={{ color: "white", fontWeight: "500", fontSize: 10, }} numberOfLines={1}>{props.item.createdAt.substring(0, 10)}</Text>
                </Body>
                <Right>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                        <TouchableOpacity onPress={() => {
                            Share.share({
                                url: `${props.item.photo}`,
                                title: `${props.item.postedBy.userName}`,
                                message: `${props.item.caption}`,
                            })
                        }}>
                            <MaterialCommunityIcons name="share-outline" size={28} color="white" />
                        </TouchableOpacity>
                        {props.item.postedBy._id == UserId ? (
                            <MaterialIcons name="delete" size={24} color="white" />
                        ) : (
                                <View></View>
                            )}
                    </View>
                </Right>

            </CardItem>
            <Image
                source={{ uri: props.item.photo }}
                style={styles.imageBackground}
            >
            </Image>
            <View style={styles.lowerContainer}>
                <Text style={styles.titleText}></Text>
                <Text style={styles.contentText} numberOfLines={2}>{props.item.caption} </Text>
                <CardItem style={{ backgroundColor: "#0e072b", margin: 0, padding: 0 }} >
                    <Left>
                        <Button transparent>
                            {props.item.votes.includes(UserId) ?
                                (<TouchableOpacity onPress={() => {
                                    onVotecancell(props.item)
                                }}>
                                    <LottieView
                                        loop={false}
                                        autoPlay={true}
                                        autoSize
                                        source={require('../animation/3982-thumbs-up.json')}
                                    />
                                </TouchableOpacity>
                                ) : (
                                    <TouchableOpacity onPress={() => {
                                        onVote(props.item);
                                    }}>
                                        <LottieView
                                            loop={false}
                                            autoPlay={true}
                                            autoSize
                                            source={require('../animation/3983-thumbs-down.json')}
                                        />
                                    </TouchableOpacity>
                                )
                            }
                            <Text style={{ textTransform: 'capitalize', color: 'white' }}>{props.item.votes.length} vote</Text>
                        </Button>
                        <Button transparent textStyle={{ color: '#87838B' }} >
                            {props.item.likes.includes(UserId) ?
                                (<TouchableOpacity onPress={() => {
                                    onUnlIKE(props.item);
                                }}>
                                    <LottieView
                                        loop={false}
                                        autoPlay={true}
                                        autoSize
                                        source={require('../animation/4607-like-animation.json')}
                                    />
                                </TouchableOpacity>
                                ) : (
                                    <TouchableOpacity onPress={() => {
                                        onlIKE(props.item);
                                    }}>
                                        <MaterialCommunityIcons name="heart-outline" size={28} color="red" />
                                    </TouchableOpacity>
                                )
                            }
                            <Text style={{ textTransform: 'capitalize', color: 'white' }}>{props.item.likes.length} {props.item.likes.length > 1 ? 'likes' : "like"}</Text>
                        </Button>
                        <Button transparent textStyle={{ color: '#87838B' }} onPress={() => {
                            setactive(!active)
                            setcommenttext('');
                        }}>
                            <LottieView
                                loop={false}
                                autoPlay={true}
                                style={{ width: 50, height: 50 }}
                                source={require('../animation/3070-loader-design-for-messages.json')}
                            />
                            <Text style={{ textTransform: 'capitalize', color: 'white' }}>{props.item.comments.length} </Text>
                        </Button>
                        <Button style={{}} onPress={() => { downloadFile(props.item) }} transparent>
                            <AntDesign name="download" size={24} color="white" style={{ textAlign: 'right' }} />
                        </Button>
                    </Left>
                </CardItem>
                {
                    active ? (
                        <Item style={{ backgroundColor: '#0e072b' }}>
                            <Input style={styles.fieldinpu}
                                value={commenttext}
                                onChangeText={(t) => setcommenttext(t)}
                                placeholder='Add a comment' placeholderTextColor='#bababa'

                            />
                            <Button transparent style={{ borderRadius: 8 }} >
                                <Text style={{ textTransform: 'capitalize', color: '#fff' }}>comment</Text>
                            </Button>
                        </Item>
                    ) : (
                            <View>
                            </View>
                        )
                }
            </View>
        </TouchableOpacity>
    )
}

export default Postcard
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
        backgroundColor: '#0e072b',
        borderColor: '#251661',
        margin: 1,
        marginBottom: 10
    },
    imageBackground: {
        backgroundColor: '#0e072b',
        width: "100%",
        height: 350,
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
    },
    contentText: {
        fontSize: 12,
        color: "#b0b0b0",
        marginLeft: 10
    },
    animation: {
        backgroundColor: "red",
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    fieldinpu: {
        color: '#fff'
    }
})