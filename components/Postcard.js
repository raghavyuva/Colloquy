import React, { useEffect, useState } from 'react'
import { StyleSheet, TouchableOpacity, Dimensions, Share, Alert, ToastAndroid, Modal, Pressable, TouchableHighlight, Clipboard } from 'react-native';
import { CardItem, Text, Button, Left, View, Right, Body, Item, Input, Card } from 'native-base';
import { MaterialIcons, AntDesign, MaterialCommunityIcons, Entypo } from '@expo/vector-icons';
import * as MediaLibrary from 'expo-media-library';
import * as FileSystem from 'expo-file-system';
import Image from 'react-native-image-progress';
import { Config } from '../config';
const { width, height } = Dimensions.get('window');
import { useTheme } from '@react-navigation/native';
import * as Progress from 'react-native-progress';
import { useSelector, useDispatch } from 'react-redux';
var _ = require('lodash');

const Postcard = ({ item, navigation, name, route }) => {
    const [active, setactive] = useState(false);
    const [commenttext, setcommenttext] = useState('');
    const [visible, setVisible] = React.useState(false);
    const user = useSelector((state) => state.userDetails);
    const [likes, setlikes] = useState(0);
    const [modalVisible, setModalVisible] = useState(false);
    const [liked, setliked] = useState(null)
    const [voted, setvoted] = useState(null)
    const [votes, setvotes] = useState(0);
    const userslist = useSelector((state) => state.userDetails.Allusers);
    const openMenu = () => setVisible(true);
    const closeMenu = () => setVisible(false);
    const [haveliked, sethaveliked] = useState(null);
    const [imgwidth, setimgwidth] = useState(null);
    const [imgheight, setimgheight] = useState(null);

    const { colors } = useTheme();
    useEffect(() => {
        let IsMounted = true;
        setlikes(item.likes.length);
        if (item.likes.includes(user.userId)) {
            setliked(true)
        }
        setvotes(item.votes.length)
        if (item.votes.includes(user.UserId)) {
            setvoted(true);
        }
        Postcommentfollowers(item)
        return () => {
            setlikes(item.likes.length);
            if (item.likes.includes(user.UserId)) {
                setliked(true)
            }
            setvotes(item.votes.length)
            if (item.votes.includes(user.UserId)) {
                setvoted(true);
            }
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
                        let fileUri = FileSystem.documentDirectory + `${item.postedBy.username + randomstring}.jpg`;
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
        const { status } = await MediaLibrary.requestPermissionsAsync();
        if (status === "granted") {
            const asset = await MediaLibrary.createAssetAsync(fileUri)
            await MediaLibrary.createAlbumAsync("Primish", asset, false)

        } else {
            alert('provide permission');
        }
    }

    const PostInfo = async (item) => {
        Alert.alert(
            'Post Information',
            `created At : ${item.createdAt} \n\ncaption : ${item.caption} \n\nCategory : ${item.category[0]}`,
            [
                { text: 'Cancel' },
                {
                    text: 'Copy', onPress: () => {
                        Clipboard.setString(item.caption)
                        ToastAndroid.show("copied caption to clipboard", ToastAndroid.SHORT);
                    }
                }
            ]
        );
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
                                'Authorization': 'Bearer ' + `${user.userToken}`,
                                'Content-Type': "application/json",
                            },
                        }).then(res => res.json()).then((resp) => {
                            // updatestore();
                        })
                }
            ]
        );
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
                    'Authorization': 'Bearer ' + `${user.userToken}`,
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
            setlikes(likes + 1)
            setliked(true);
            fetch(`${Config.url}` + `/posts/like/${item._id}`, {
                method: 'PUT',
                headers: {
                    'Authorization': 'Bearer ' + `${user.userToken}`,
                    'Content-Type': "application/json",
                },
            }).then(res => res.json()).then(async (resp) => {
                let val = 'like';               
                Notifyy(val, item);
            })
        } catch (error) {
            alert(error);
        }
    }
    const onUnlIKE = (item) => {
        try {
            setlikes(likes - 1)
            setliked(false);
            fetch(`${Config.url}` + `/posts/unlike/${item._id}`, {
                method: 'PUT',
                headers: {
                    'Authorization': 'Bearer ' + `${user.userToken}`,
                    'Content-Type': "application/json",
                },
            }).then(res => res.json()).then(async (resp) => {
                console.log(resp);
                // await updatestore();
            })
        } catch (error) {
            alert(error);
        }
    }
    const NavigateFull = (item) => {
        navigation.navigate('external', { screen: 'view', params: { fullview: item._id } })
    }


    const Postcommentfollowers = (item) => {
        setTimeout(() => {
            let y = item.likes.filter((ele) => {
                return user.user.user.following.includes(ele)
            })
            let xy=[]
            for (let index = 0; index < y.length; index++) {
                const element = y[index];
                userslist.forEach(user => {
                    if (user._id == element) {
                        xy.push(user);
                    }
                });

            let r=_.random(xy.length)
            sethaveliked(xy[r]?.username)
            }
        }, 1000);
        Image.getSize(item.photo, (widthof, heightof) => {
            const ratio = Math.min(width / widthof, height / heightof);
            setimgheight(heightof * ratio);
            setimgwidth(widthof * ratio);
        })
 
    }
    const comment = async (item) => {
        try {
            fetch(`${Config.url}` + `/posts/comments/${item._id}`, {
                method: 'PUT',
                headers: {
                    'Authorization': 'Bearer ' + `${user.userToken}`,
                    'Content-Type': "application/json",
                },
                body: JSON.stringify({
                    text: commenttext
                })
            }).then(res => res.json()).then(async (resp) => {
                try {
                    let val = 'message';
                    setcommenttext('')
                    updatestore();
                } catch (error) {
                    alert(error)
                    console.log(error)
                }
            })
        } catch (error) {
            alert(error);
        }
    }

    const onGotoWhodid = (item) => {
        navigation.navigate('external', { screen: 'wholiked', params: { item: item } })
    }


    const ReportTheUser = (item) => {
        Alert.alert(
            'Report the Post',
            'Do you want to report this post and user?',
            [
                { text: 'Cancel' },
                {
                    text: 'YES', onPress: () => {
                        fetch(`${Config.url}` + `/report`, {
                            method: 'POST',
                            headers: {
                                'Authorization': 'Bearer ' + `${user.userToken}`,
                                'Content-Type': "application/json",
                            },
                            body: JSON.stringify({
                                description: `post` + item.postedBy.username,
                                errscreenshot: item.photo
                            })
                        }).then(res => res.json()).then((resp) => {
                            console.log(resp)
                            alert('reported this post and user')
                        })
                    }
                }
            ]
        );
    }

    const renderBottomPart = () => (
        <View
            style={{
                paddingBottom: 10
            }}
        >

            <View
                style={{
                    marginLeft: 15,
                    marginTop: 5,
                }}
            >
                <Text
                    style={{
                        color: colors.text,
                        fontSize: 16,
                        opacity: 0.8,
                        width: width - 50,
                        overflow: 'hidden',

                    }}
                    numberOfLines={name == 'NormalView' ? 2 : 50}
                >
                    {item.caption}
                </Text>
            </View>
            <View
                style={{
                    alignItems: "center",
                    marginLeft: 20,
                    flexDirection: 'row',
                    marginTop: 10,

                }}
            >
                <View
                    style={{
                        flexDirection: 'row',
                        marginRight: 20
                    }}
                >
                    {
                        liked ? (
                            <TouchableOpacity onPress={() => {
                                onUnlIKE(item);
                            }}>
                                <MaterialIcons name='thumb-down' color={colors.primary} size={26}
                                    style={{
                                        marginRight: 5
                                    }}
                                />

                            </TouchableOpacity>
                        ) : (
                            <TouchableOpacity onPress={() => {
                                onlIKE(item);
                            }}>
                                <MaterialIcons name='thumb-up' color={colors.primary} size={26}
                                    style={{
                                        marginRight: 5
                                    }}
                                />
                            </TouchableOpacity>
                        )
                    }
                    <TouchableOpacity onPress={()=>onGotoWhodid(item)}>
                    <Text
                        style={{
                            color: colors.text,
                            fontSize: 16,
                            opacity: 0.8,
                            overflow: 'hidden',
                        }}
                    >
                        {likes}
                    </Text>
                    </TouchableOpacity>
                </View>
                <View
                    style={{
                        flexDirection: 'row',
                        marginRight: 20
                    }}
                >
                    <TouchableOpacity onPress={() => {
                        setactive(!active)
                        setcommenttext('');
                    }}>
                        <MaterialIcons name='comment' color={colors.primary} size={26}
                            style={{
                                marginRight: 5
                            }}
                        />
                    </TouchableOpacity>

                    <Text
                        style={{
                            color: colors.text,
                            fontSize: 16,
                            opacity: 0.8,
                            overflow: 'hidden',
                        }}
                    >
                        {item.comments.length}
                    </Text>
                </View>

                <View
                    style={{
                        position: 'absolute',
                        right: 20,
                        flexDirection: 'row',

                    }}
                >

                    <TouchableOpacity onPress={() => {
                        Share.share({
                            url: `${item.photo}`,
                            title: `${item.postedBy.userName}`,
                            message: `${item.caption}`,
                        })
                    }} >
                        <MaterialIcons name='share' color={colors.primary} size={26} />
                    </TouchableOpacity>
                    {
                        item.postedBy._id === user.userId ? (
                            <>
                                <TouchableOpacity style={{
                                    marginLeft: 15
                                }}
                                    onPress={() => DeletePost(item)}
                                >
                                    <MaterialIcons name='delete' color={colors.primary} size={26} />
                                </TouchableOpacity>
                            </>
                        ) : (
                            <>
                                <TouchableOpacity style={{
                                    marginLeft: 15
                                }}
                                    onPress={() => ReportTheUser(item)}
                                >
                                    <MaterialIcons name='report' color={colors.primary} size={26} />
                                </TouchableOpacity>
                            </>
                        )
                    }
                </View>

            </View>
            <View
                style={{
                    marginLeft: 15,
                    marginTop: 5,
                }}
            >
                {
                    haveliked &&
                    <View style={{
                        flexDirection: 'row',

                    }}>
                        <TouchableOpacity>
                            <Text
                                style={{
                                    color: colors.primary,
                                }}
                            >
                                @{haveliked}
                            </Text>
                        </TouchableOpacity>
                        <Text
                            style={{
                                color: colors.text,
                                fontSize: 16,
                                opacity: 0.8,
                                overflow: 'hidden',
                                marginLeft: 5
                            }}
                            numberOfLines={name == 'NormalView' ? 50 : 2}
                        >
                            also liked this post
                             </Text>
                    </View>
                }
            </View>
        </View>
    )
    const videoBuffer = (isBuffer) => {


        // console.log(isBuffer)
        //here you could set the isBuffer value to the state and then do something with it
        //such as show a loading icon
    }




    const renderTopPart = () => (
        <View
            style={{
                display: 'flex',
                margin: 10,
                // backgroundColor:'#b4bade',
                flexDirection: 'row',
                alignItems: 'center',
            }}
        >
            <TouchableOpacity onPress={() => {
                if (item.postedBy._id == user.user.user._id) {
                    navigation.navigate('external', { screen: 'profile' })
                } else {
                    navigation.navigate('external', { screen: 'userpro', params: { thread: item.postedBy._id } })
                }
            }}>
                <Image
                    source={{ uri: item.postedBy.userphoto }}
                    style={{ width: 50, height: 50, alignSelf: 'center', margin: 5, }}
                />
            </TouchableOpacity>
            <View
                style={{
                    flexDirection: 'column',
                    margin: 5
                }}
            >
                <Text
                    style={{
                        color: colors.text,
                        fontSize: 20,
                    }}
                >
                    {item.postedBy.username}
                </Text>
                <View
                    style={{
                        flexDirection: "row"
                    }}
                >
                    <Text
                        style={{
                            color: 'grey',
                            fontSize: 18,
                        }}
                    >
                        @raghavyuva
                    </Text>
                </View>
            </View>
            <View
                style={{
                    position: 'absolute',
                    right: 10,
                    flexDirection: 'row'
                }}
            >
                <TouchableOpacity
                    style={{
                        marginRight: 15,
                    }}
                    onPress={() => PostInfo(item)}
                >
                    <MaterialIcons name='info-outline' color={colors.primary} size={26} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {
                    item.photo && downloadFile(item);
                    item.video && downloadFile(item.video);
                }}>
                    <MaterialIcons name='bookmark-outline' color={colors.primary} size={26} />
                </TouchableOpacity>
            </View>
        </View>
    )

    return (
        <View
            style={{
                backgroundColor: colors.background,
                borderRadius: 10,
                flex: 1,
                marginBottom: 5,
                shadowColor: "#000",
                shadowOffset: {
                    width: 0,
                    height: 6,
                },
                shadowOpacity: 0.37,
                shadowRadius: 7.49,

                elevation: 12,
                margin: name == 'NormalView' ? 10 : 0
            }}
        >
            {renderTopPart()}

            <View>
                <TouchableOpacity onPress={() => {
                    if (route.name != 'view') {
                        NavigateFull(item)
                    }
                }}
                >
                    {
                        item.photo && <Image
                            source={{ uri: item.photo }}
                            style={{ width: name == 'NormalView' ? width - 50 : imgwidth, height: name == 'NormalView' ? 200 : imgheight, alignSelf: 'center', resizeMode: name == 'NormalView' ? 'cover' : "contain", borderRadius: 10 }}
                            indicator={Progress.Pie}
                            indicatorProps={{
                                size: 180,
                                borderWidth: 0,
                                color: 'rgba(150, 150, 150, 1)',
                                unfilledColor: 'rgba(200, 200, 200, 0.2)'
                            }}
                        />
                    }
                    {/* {
                    item.video &&
                    (

                        <Video
                            source={{ uri: item.video }}
                            style={{ width: width - 50, height: 200, alignSelf: 'center', borderRadius: 10 }}
                            controls={true}
                            onBuffer={(s) => {
                                setbuffer(s.isBuffering)
                                console.log(s.isBuffering)
                                if (s.isBuffering) {
                                    return (
                                        <View

                                        >
                                            <ActivityIndicator size={50} color='red' />
                                        </View>
                                    )
                                }
                            }
                            }
                            onError={(e) => alert(e)}
                            repeat={true}
                        />
                    )

                } */}
                </TouchableOpacity>
                {renderBottomPart()}
            </View>
            {
                active ? (
                    <Item style={{ borderBottomWidth: 0 }}>
                        <Input style={styles(colors).fieldinpu}
                            value={commenttext}
                            onChangeText={(t) => setcommenttext(t)}
                            placeholder='Add a comment' placeholderTextColor='#bababa'

                        />
                        <TouchableHighlight style={{ padding: 5, borderWidth: 1, marginRight: 10, borderRadius: 8 }} onPress={() => comment(item)}>
                            <Text style={{ color: colors.primary }}>comment</Text>
                        </TouchableHighlight>
                    </Item>
                ) : (
                    <View>
                    </View>
                )
            }

        </View >

    )
}
export default Postcard
const styles = (colors) => StyleSheet.create({
    MainCard: {
        backgroundColor: colors.card,
        flex: 1,
        borderColor: colors.border
    },
    TopSection: {
        backgroundColor: colors.card,
        marginRight: 2
    },
    ImageSection: {
        backgroundColor: colors.card,
        marginRight: 2,
        flexDirection: 'column'
    },
    Imagebackg: {
        width: width - 40,
        height: height / 2.8,
        marginRight: 2,
        flex: 1
    },
    BottomSection: {
        backgroundColor: colors.card,
        marginRight: 2,

    },
    Imageuser: {
        height: 50,
        width: 50,
        borderRadius: 26
    },
    userName: {
        color: colors.text,
        fontSize: 22,
        fontWeight: 'bold'
    },
    capt: { color: colors.text, fontWeight: "500", fontSize: 10, },
    contentText: {
        fontSize: 14,
        color: colors.text,
        marginLeft: 5,
        marginRight: 5
    },
    likecomsection: {
        backgroundColor: colors.card,
        marginRight: 2,
    },
    fieldinpu: {
        color: colors.text
    },
})