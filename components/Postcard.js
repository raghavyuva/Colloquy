import React, { useEffect, useState } from 'react'
import { StyleSheet, TouchableOpacity, Dimensions, Share, Alert, ToastAndroid, Modal, Pressable } from 'react-native';
import { CardItem, Text, Button, Left, View, Right, Body, Item, Input, Card } from 'native-base';
import { MaterialIcons, AntDesign, MaterialCommunityIcons, Entypo } from '@expo/vector-icons';
import * as MediaLibrary from 'expo-media-library';
import * as FileSystem from 'expo-file-system';
import Image from 'react-native-image-progress';
import { Config } from '../config';
const { width, height } = Dimensions.get('window');
import { DataLayerValue } from '../Context/DataLayer';
import { useTheme } from '@react-navigation/native';
import { Menu, Provider } from 'react-native-paper';
import * as Progress from 'react-native-progress';

const Postcard = (props) => {
    const [{ userToken, UserId }, dispatch] = DataLayerValue();
    const [active, setactive] = useState(false);
    const [commenttext, setcommenttext] = useState('');
    const [visible, setVisible] = React.useState(false);

    const [modalVisible, setModalVisible] = useState(false);

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
    const comment = async (item) => {
        try {
            fetch(`${Config.url}` + `/posts/comments/${item._id}`, {
                method: 'PUT',
                headers: {
                    'Authorization': 'Bearer ' + `${userToken}`,
                    'Content-Type': "application/json",
                },
                body: JSON.stringify({
                    text: commenttext
                })
            }).then(res => res.json()).then(async (resp) => {
                try {
                    let val = 'message';
                    setcommenttext('')
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
        props.navigation.navigate('external', { screen: 'wholiked', params: { item: item } })
    }
    const CardLayout = () => {
        return (

            <CardItem style={{ backgroundColor: colors.card, }} >
                <Left style={{ flexDirection: "row", justifyContent: 'space-between' }}>
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
                <Right>
                    <Button transparent onPress={() => {
                        Alert.alert(
                            "Details",
                            `Caption:\n${props.item.caption}\n\nPostedAt:${props.item.createdAt}\n\nCategory:${props.item.category}\n\nLocation:${props.item.location}`,
                            [
                                {
                                    text: "Cancel",
                                    style: "cancel",
                                },
                            ],
                            {
                                cancelable: true,
                            }
                        );
                    }}>
                        <MaterialIcons name="details" size={24} color={colors.text} />
                    </Button>
                </Right>
            </CardItem>

        )
    }
    const RightTopCont = () => {
        return (

            <Right>
                <View style={{ backgroundColor: colors.card }}>
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
                        <Menu.Item onPress={() => { downloadFile(props.item) }} title="Download Image" />
                        <Menu.Item onPress={() => { downloadFile(props.item) }} title="Report" />
                        {props.item.postedBy._id == UserId ? (
                            <Menu.Item onPress={() => DeletePost(props.item)} title="Delete" />
                        ) : (
                            <View></View>
                        )}
                    </Menu>
                </View>
            </Right>
        )
    }
    const ModalLayOut = () => {
        return (
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles(colors).centeredView}>
                    <View style={styles(colors).modalView}>
                        <Image
                            source={{ uri: props.item.photo }}
                            style={styles(colors).modalimage}
                        />
                        <Pressable
                            style={[styles(colors).button, styles(colors).buttonClose]}
                            onPress={() => setModalVisible(!modalVisible)}
                        >
                            <Text style={styles(colors).textStyle}>Hide Modal</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
        )
    }

    const ImageCard = () => {
        return (
            <Card style={styles(colors).cardcontainer}>
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
                <Body style={{ margin: 0 }}>
                    <Text style={styles(colors).top} numberOfLines={1}>{props.item.postedBy.username}</Text>
                    <Text style={styles(colors).capt} numberOfLines={1}>{props.item.createdAt.substring(0, 10)} </Text>
                </Body>
                <RightTopCont />
            </Card>
        )
    }
    if (props.item == null || undefined) {
        return (
            <View style={{ justifyContent: "center", flex: 1, backgroundColor: colors.background }}>
                <Image
                    source={{ uri: 'https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fcdn.onlinewebfonts.com%2Fsvg%2Fimg_412721.png&f=1&nofb=1' }}
                    style={{ width: width, height: height, alignSelf: 'center' }}
                />
            </View>
        )
    }
    if (props.item.length <= 0) {
        return (
            <View style={{ justifyContent: "center", flex: 1, backgroundColor: colors.background }}>
                <Image
                    source={{ uri: 'https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fcdn.onlinewebfonts.com%2Fsvg%2Fimg_412721.png&f=1&nofb=1' }}
                    style={{ width: width, height: height, alignSelf: 'center' }}
                />
            </View>
        )
    }
    return (
        <Provider>
            {
                props.name === 'NormalView' ? (
                    <>
                        <View style={styles(colors).centeredView}>
                            <ModalLayOut />
                        </View>
                        <TouchableOpacity
                            activeOpacity={1}
                            style={styles(colors).item}
                            onPress={() => NavigateFull(props.item)}
                            onLongPress={() => { downloadFile(props.item) }}
                        >
                            <ImageCard />
                            <TouchableOpacity onPress={() => NavigateFull(props.item)}>
                                <Image
                                    source={{ uri: props.item.photo }}
                                    style={styles(colors).imageBackground}
                                    indicator={Progress.Pie}

                                    indicatorProps={{
                                        size: 180,
                                        borderWidth: 0,
                                        color: 'rgba(150, 150, 150, 1)',
                                        unfilledColor: 'rgba(200, 200, 200, 0.2)'
                                    }}
                                >
                                </Image>
                            </TouchableOpacity>
                            <View style={styles(colors).lowerContainer}>
                                <Text style={styles(colors).contentText} numberOfLines={2}>{props.item.caption} </Text>
                                    <CardLayout />

                                {
                                    active ? (
                                        <Item style={{}}>
                                            <Input style={styles(colors).fieldinpu}
                                                value={commenttext}
                                                onChangeText={(t) => setcommenttext(t)}
                                                placeholder='Add a comment' placeholderTextColor='#bababa'

                                            />
                                            <Button transparent style={{ borderRadius: 8 }} onPress={() => comment(props.item)}>
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
                    </>
                ) : (
                    <>
                        {props.item.postedBy._id == UserId ? (
                            <>
                            </>
                        ) : (
                            <>
                                <View style={styles(colors).centeredView}>
                                    <ModalLayOut />
                                </View>
                                <ImageCard />
                                <TouchableOpacity
                                    activeOpacity={1}
                                    style={styles(colors).item}
                                    onPress={() => NavigateFull(props.item)}
                                    onLongPress={() => { downloadFile(props.item) }}
                                >
                                    <TouchableOpacity onPress={() => NavigateFull(props.item)}>
                                        <Image
                                            source={{ uri: props.item.photo }}
                                            style={styles(colors).imageBackground}
                                        >
                                        </Image>
                                    </TouchableOpacity>
                                    <View style={styles(colors).lowerContainer}>
                                        <Text style={styles(colors).contentText} numberOfLines={2}>{props.item.caption} </Text>
                                            <CardLayout />
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
                            </>
                        )}
                    </>
                )
            }
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

    item: {
        shadowColor: color.text,
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 1,
        shadowRadius: 3,
        elevation: 3,
        margin: 0.2
    },
    imageBackground: {
        width: width,
        height: height / 2.5,
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
        backgroundColor: color.card,
        justifyContent: 'space-evenly'
    },
    capt: { color: color.text, fontWeight: "500", fontSize: 10, },
    Image: { width: 60, height: 60, borderRadius: 24, marginLeft: 5 },
    likecomtext: { textTransform: 'capitalize', color: color.text },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 2
    },
    modalView: {
        margin: 20,
        backgroundColor: color.card,
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    },
    modalimage: {
        width: width - 20,
        height: height / 1.2,
        aspectRatio: 0.5,
        resizeMode: 'contain',

    },
    ImageSection: {
        backgroundColor: color.card,
        marginRight: 2,
        flexDirection: 'column'
    },


})
// const styles = (colors) => StyleSheet.create({
//     MainCard: {
//         backgroundColor: colors.card,
//         flex: 1,
//         borderColor: colors.border
//     },
//     TopSection: {
//         backgroundColor: colors.card,
//         marginRight: 2
//     },
//     ImageSection: {
//         backgroundColor: colors.card,
//         marginRight: 2,
//         flexDirection: 'column'
//     },
//     Imagebackg: {
//         width: width - 40,
//         height: height / 2.8,
//         marginRight: 2,
//         flex: 1
//     },
//     BottomSection: {
//         backgroundColor: colors.card,
//         marginRight: 2,

//     },
//     Imageuser: {
//         height: 50,
//         width: 50,
//         borderRadius: 26
//     },
//     userName: {
//         color: colors.text,
//         fontSize: 22,
//         fontWeight: 'bold'
//     },
//     capt: { color: colors.text, fontWeight: "500", fontSize: 10, },
//     contentText: {
//         fontSize: 14,
//         color: colors.text,
//         marginLeft: 5,
//         marginRight: 5
//     },
//     likecomsection: {
//         backgroundColor: colors.card,
//         marginRight: 2,
//     }
// })







{/**/ }

// <Provider>

// <Card style={styles(colors).MainCard}>
//     <CardItem style={styles(colors).TopSection}>
//         <Left>
//             <Image source={{ uri: props.item.postedBy.userphoto }} style={styles(colors).Imageuser} />
//             <Body>
//                 <Text style={styles(colors).userName}>{props.item.postedBy.username} </Text>
//             </Body>
//         </Left>
//         <Right>
//             {props.item.postedBy._id == UserId ? (
//                 <>
//                     <Menu
//                         visible={visible}
//                         onDismiss={closeMenu}
//                         style={{ backgroundColor: colors.card, }}
//                         contentStyle={{ backgroundColor: colors.card, }}
//                         anchor={<Button onPress={openMenu} transparent><MaterialCommunityIcons name="dots-vertical" size={24} color={colors.text} /></Button>}>
//                         <Menu.Item title="Edit" titleStyle={{ color: colors.text }} />
//                         <Menu.Item onPress={() => DeletePost(props.item)} title="Delete" titleStyle={{ color: colors.text }} />
//                         <Divider />
//                     </Menu>
//                 </>
//             )
//                 : (
//                     <>
//                     </>
//                 )}
//         </Right>
//     </CardItem>
//     <CardItem style={styles(colors).ImageSection}>
//         <Image source={{ uri: props.item.photo }} style={styles(colors).Imagebackg} />

//     </CardItem>
//     <Text style={styles(colors).contentText} numberOfLines={2}>{props.item.caption} </Text>
//     <CardItem style={styles(colors).BottomSection}>
//         <Left>
//         <Button transparent>
//             {props.item.votes.includes(UserId) ?
//                 (<TouchableOpacity onPress={() => {
//                     onVotecancell(props.item)
//                 }}>
//                     <MaterialIcons name="thumb-up-alt" size={24} color={colors.text} />
//                 </TouchableOpacity>
//                 ) : (
//                     <TouchableOpacity onPress={() => {
//                         onVote(props.item);
//                     }}>
//                         <MaterialIcons name="thumb-down-alt" size={24} color={colors.text} />
//                     </TouchableOpacity>
//                 )
//             }
//             <Text style={styles(colors).likecomtext}>{props.item.votes.length} vote</Text>
//         </Button>
//             <Button transparent  >
//                 {props.item.likes.includes(UserId) ?
//                     (<TouchableOpacity onPress={() => {
//                         onUnlIKE(props.item);
//                     }}>
//                         <MaterialCommunityIcons name="cards-heart" size={24} color='red' />
//                     </TouchableOpacity>
//                     ) : (
//                         <TouchableOpacity onPress={() => {
//                             onlIKE(props.item);
//                         }}>
//                             <MaterialCommunityIcons name="heart-outline" size={28} color={colors.text} />
//                         </TouchableOpacity>
//                     )
//                 }
//                 <Text style={{ textTransform: 'capitalize', color: colors.text }}
//                     onPress={() => onGotoWhodid(props.item)}
//                 >{props.item.likes.length} {props.item.likes.length > 1 ? 'likes' : 'like'}</Text>
//             </Button>
//             <Button transparent onPress={() => {
//                 setactive(!active)
//                 setcommenttext('');
//             }}>
//                 <MaterialIcons name="comment" size={24} color={colors.text} />
//                 <Text style={{ textTransform: 'capitalize', color: colors.text }}>{props.item.comments.length} </Text>
//             </Button>
//             <Button transparent onPress={() => {
//                 Share.share({
//                     url: `${props.item.photo}`,
//                     title: `${props.item.postedBy.userName}`,
//                     message: `${props.item.caption}`,
//                 })
//             }}>
//                 <MaterialIcons name="share" size={24} color={colors.text} />
//             </Button>
//         </Left>
//         <Right>
//             <Button transparent onPress={() => {
//                 Alert.alert(
//                     "Details",
//                     `Caption:\n${props.item.caption}\n\nPostedAt:${props.item.createdAt}\n\nCategory:${props.item.category}\n\nSubCategory:${props.item.subcategory}`,
//                     [
//                         {
//                             text: "Cancel",
//                             style: "cancel",
//                         },
//                     ],
//                     {
//                         cancelable: true,
//                     }
//                 );
//             }}>
//                 <MaterialIcons name="details" size={24} color="white" />
//             </Button>
//         </Right>
//     </CardItem>
// </Card>
// </Provider>