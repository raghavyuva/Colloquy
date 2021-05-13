import React, { useEffect, useState } from 'react'
import { StyleSheet, TouchableOpacity, Image, Dimensions,Share, Alert, ToastAndroid, } from 'react-native';
import { CardItem, Text, Button, Left, View, Right, Body, Item, Input } from 'native-base';
import { MaterialIcons, AntDesign, MaterialCommunityIcons, Entypo } from '@expo/vector-icons';
import * as MediaLibrary from 'expo-media-library';
import * as FileSystem from 'expo-file-system';
import * as Permissions from 'expo-permissions';
import { Config } from '../config';
const { width, height } = Dimensions.get('window');
import { DataLayerValue } from '../Context/DataLayer';
import { useTheme } from '@react-navigation/native';
import { Menu, Divider, Provider } from 'react-native-paper';

const Postcard = (props) => {
    const [{ userToken, UserId }, dispatch] = DataLayerValue();
    const [active, setactive] = useState(false);
    const [commenttext, setcommenttext] = useState('');
    const [selectedImage, setSelectedImage] = React.useState(null);
    const [votecount, setvotecount] = useState([]);
    const [visible, setVisible] = React.useState(false);

    const openMenu = () => setVisible(true);

    const closeMenu = () => setVisible(false);
    const { colors } = useTheme();
    styles(colors)
    useEffect(() => {
        let IsMounted = true;
        return () => {
            IsMounted = false;
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
                        var randomstring = Math.random().toString(36).slice(-9);
                        let fileUri = FileSystem.documentDirectory + `${item.postedBy.username+ randomstring}.jpg`;
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
    const saveFile = async (fileUri) => {
        const { status } = await Permissions.askAsync(Permissions.MEDIA_LIBRARY);
        if (status === "granted") {
            const asset = await MediaLibrary.createAssetAsync(fileUri)
            await MediaLibrary.createAlbumAsync("Primish", asset, false)
           
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
    const onGotoWhodid = (item) => {
        props.navigation.navigate('external', { screen: 'wholiked', params: { item: item } })
    }
    if (props.item == null || undefined) {
        return (
            <View style={{ justifyContent: "center", flex: 1, backgroundColor: colors.background }}>
                <Image
                    source={require('../assets/emptyy.png')}
                    style={{ width: width, height: height, alignSelf: 'center' }}
                />
            </View>
        )
    }
    if (props.item.length <= 0) {
        return (
            <View style={{ justifyContent: "center", flex: 1, backgroundColor: colors.background }}>
                <Image
                    source={require('../assets/emptyy.png')}
                    style={{ width: width, height: height, alignSelf: 'center' }}
                />
            </View>
        )
    }
    return (
        <Provider>

            <TouchableOpacity
                activeOpacity={1}
                style={styles(colors).item}
                onPress={() => NavigateFull(props.item)}
                onLongPress={() => { downloadFile(props.item) }}
            >
                <CardItem style={styles(colors).cardcontainer}>
                    <TouchableOpacity onPress={() => {
                        if (props.item.postedBy._id == UserId) {
                            props.navigation.navigate('external', { screen: 'profile' })
                        } else {
                            props.navigation.navigate('external', { screen: 'userpro', params: { thread: props.item.postedBy._id } })
                        }
                    }}>
                        <Image
                            source={{ uri: props.item.postedBy.userphoto }}
                            style={styles(colors).Image}
                        />
                    </TouchableOpacity>
                    <Body style={{ margin: 10 }}>
                        <Text style={styles(colors).top} numberOfLines={1}>{props.item.postedBy.username}</Text>
                        <Text style={styles(colors).capt} numberOfLines={1}>{props.item.createdAt.substring(0, 10)}</Text>
                    </Body>
                    <Right>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', backgroundColor: colors.card }}>
                            <TouchableOpacity >
                               
                            </TouchableOpacity>
                            <Menu
                                visible={visible}
                                onDismiss={closeMenu}
                                anchor={<Button onPress={openMenu} transparent><MaterialCommunityIcons name="dots-vertical" size={24} color={colors.text} /></Button>}>
                                <Menu.Item onPress={() => {
                                Share.share({
                                    url: `${props.item.photo}`,
                                    title: `${props.item.postedBy.userName}`,
                                    message: `${props.item.caption}`,
                                })
                            }} title="share" />
                                    <Menu.Item onPress={() => { downloadFile(props.item) }}  title="Download Image" />

                             {props.item.postedBy._id == UserId ? (
                                    <Menu.Item onPress={() => DeletePost(props.item)} title="Delete" />
                                ) : (
                                    <View></View>
                                )}
                              
                                <Divider />
                            </Menu>
                        </View>
                    </Right>
                </CardItem>
                <Image
                    source={{ uri: props.item.photo }}
                    style={styles(colors).imageBackground}
                >
                </Image>
                <View style={styles(colors).lowerContainer}>
                    <CardItem style={{ backgroundColor: colors.card, padding: 0, margin: 0, flexDirection:'column'}} >
                    <Text style={styles(colors).contentText} numberOfLines={2}>{props.item.caption} </Text>
                        <Left>
                            <Button transparent>
                                {props.item.votes.includes(UserId) ?
                                    (<TouchableOpacity onPress={() => {
                                        onVotecancell(props.item)
                                    }}>
                                        <MaterialIcons name="thumb-up-alt" size={24} color={colors.text} />
                                    </TouchableOpacity>
                                    ) : (
                                        <TouchableOpacity onPress={() => {
                                            onVote(props.item);
                                        }}>
                                            <MaterialIcons name="thumb-down-alt" size={24} color={colors.text} />
                                        </TouchableOpacity>
                                    )
                                }
                                <Text style={styles(colors).likecomtext}>{props.item.votes.length} vote</Text>
                            </Button>
                            <Button transparent  >
                                {props.item.likes.includes(UserId) ?
                                    (<TouchableOpacity onPress={() => {
                                        onUnlIKE(props.item);
                                    }}>
                                        <MaterialCommunityIcons name="cards-heart" size={24} color='#ff1493' />
                                    </TouchableOpacity>
                                    ) : (
                                        <TouchableOpacity onPress={() => {
                                            onlIKE(props.item);
                                        }}>
                                            <MaterialCommunityIcons name="heart-outline" size={28} color={colors.text} />
                                        </TouchableOpacity>
                                    )
                                }
                                <Text style={{ textTransform: 'capitalize', color: colors.text }}
                                    onPress={() => onGotoWhodid(props.item)}
                                >{props.item.likes.length} {props.item.likes.length > 1 ? 'likes' : "like"}</Text>
                            </Button>
                            <Button transparent onPress={() => {
                                setactive(!active)
                                setcommenttext('');
                            }}>
                                <MaterialIcons name="comment" size={24} color={colors.text} />
                                <Text style={{ textTransform: 'capitalize', color: colors.text }}>{props.item.comments.length} </Text>
                            </Button>
                        </Left>
                    </CardItem>
                   
                    {
                        active ? (
                            <Item style={{}}>
                                <Input style={styles(colors).fieldinpu}
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
        </Provider>
    )
}
export default Postcard
const styles = (color) => StyleSheet.create({
    txt1: {
        fontSize: 22,
        color: color.primarytext,
        alignSelf: "center",
        fontWeight: 'bold'
    },
    txt2: {
        fontSize: 18,
        color: color.text,
        alignSelf: "center",
        fontWeight: '800'
    },
    top: { color: color.text, fontWeight: "bold", fontSize: 15, },
    carousel: {
        height: '50%',
        paddingTop: 0,
    },
    item: {
        marginBottom: 5,
        shadowColor: color.text,
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 1,
        shadowRadius: 3,
        elevation: 3,
        margin: 0.2
    },
    imageBackground: {
        width: "100%",
        height: height / 2.6,
        alignSelf: "center",
        marginTop: 0,
    },
    rightTextContainer: {
        marginLeft: 'auto',
        marginRight: -2,
        padding: 3,
        marginTop: 3,
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5
    },
    rightText: { color: 'white' },
    lowerContainer: {
        backgroundColor: color.card,
    },
    titleText: {
    },
    contentText: {
        fontSize: 14,
        color: color.text,
        marginLeft: 1,
        marginTop: 0,
        paddingTop: 0
    },
    animation: {

        width: 100,
        height: 100,
        borderRadius: 50,
    },
    fieldinpu: {
        color: '#fff'
    },
    cardcontainer: {
        flexDirection: 'row',
        margin: 0,
        padding: 0,
        borderWidth: 1,
        borderColor: color.border,
        backgroundColor: color.card
    },
    capt: { color: color.text, fontWeight: "500", fontSize: 10, },
    Image: { width: 60, height: 60, borderRadius: 14, margin: 5 },
    likecomtext: { textTransform: 'capitalize', color: color.text }
})
