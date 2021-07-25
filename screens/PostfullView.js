import React, { useState, useEffect } from 'react'
import { StyleSheet, Image, FlatList, KeyboardAvoidingView, } from 'react-native'
import { CardItem, Text, Button, Left, View, Input, Item, Label, Body, Right, } from 'native-base';
import { DataLayerValue } from '../Context/DataLayer';
import Postcard from '../components/Postcard';
import { Config } from '../config';
import Headingbar from '../components/Header';
import { useTheme } from '@react-navigation/native';
import { color } from 'react-native-reanimated';
import LoadingComp from '../components/LoadingComp';
import { useSelector, useDispatch } from 'react-redux';

const PostfullView = (props) => {
    const user = useSelector((state) => state.userDetails);
    const [commenttext, setcommenttext] = useState('');
    const [Data, setData] = useState(null);
    const { colors } = useTheme();
    const [loading, setloading] = useState(true)
    let fullview = props.route.params.fullview;
    const fetching = (first) => {
        if (first) {
            setloading(true);
        }
        fetch(`${Config.url}` + `/post/${fullview}`, {
            headers: {
                'Authorization': 'Bearer ' + `${user.userToken}`,
            },
            method: 'GET'
        })
            .then((response) => response.json())
            .then((responseJson) => {
                setData(responseJson);
                setloading(false);
            })
    }
    useEffect(() => {
        let first = true
        fetching(first);
        return () => {
        }
    }, [])
    const commentui = ({ item, index }) => {
        return (
            <CardItem style={{ backgroundColor: colors.card, borderBottomWidth: 0.2, borderBottomColor: colors.border }}>
                <Left>
                    <Body>
                        <Text style={{ color: colors.text }} >{item.postedBy.username}</Text>
                        <Text style={{ fontSize: 18, color: colors.text, }}>{item.text}</Text>
                    </Body>
                    <Image
                        source={{ uri: item.postedBy.userphoto }}
                        style={{ width: 30, height: 30, borderRadius: 100, margin: 5 }}
                    />
                </Left>
            </CardItem>
        )
    }

    const Notifyy = () => {
        fetch("https://exp.host/--/api/v2/push/send",
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: "POST",
                body: JSON.stringify({
                    to: fullview.postedBy.notifytoken,
                    sound: 'default',
                    vibrationPattern: [0, 250, 250, 250],
                    lightColor: '#FF231F7C',
                    body: `  "${commenttext}" on your post`,
                    title: ` on post ${fullview.caption}`
                })
            })
        fetch(`${Config.url}` + `/savenotification/${fullview.postedBy._id}`,
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + `${user.userToken}`,
                },
                method: "POST",
                body: JSON.stringify({
                    caption: `comment`,
                    Title: `comment on post ${fullview.caption}`,
                    url: "wfhahws"
                })
            })

    }
    const comment = async () => {
        try {
            fetch(`${Config.url}` + `/posts/comments/${fullview}`, {
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
                    // await Notifyy();
                    fetching();
                    setcommenttext('')
                    console.log(resp)
                } catch (error) {
                    alert(error)
                    console.log(error)
                }
            })
        } catch (error) {
            alert(error);
        }
    }
    if (loading) {
        return (
            <LoadingComp />
        )
    }

    return (
        <KeyboardAvoidingView style={styles(colors).screen}>
            <Headingbar {...props} />
            <FlatList
                ListHeaderComponent={
                    <Postcard item={Data[0]} {...props} name='NormalView' />
                }
                renderItem={commentui}
                keyExtractor={(item) => item._id}
                data={Data[0].comments}
            />
            <Item style={{ backgroundColor: colors.border }}>
                <Input style={styles(colors).fieldinpu}
                    value={commenttext}
                    onChangeText={(t) => setcommenttext(t)}
                    placeholder='Add a comment' placeholderTextColor={colors.text} />
                <Button transparent style={{ borderRadius: 8 }} onPress={comment}>
                    <Text style={{ textTransform: 'capitalize', color: colors.text }}>comment</Text>
                </Button>
            </Item>
        </KeyboardAvoidingView>

    )
}

export default PostfullView
const styles = (color) => StyleSheet.create({
    screen: {
        justifyContent: 'center',
        backgroundColor: color.card,
        flex: 1
    },
    txt1: {
        fontSize: 22,
        color: color.text,
        alignSelf: "center",
        fontWeight: 'bold'
    },
    txt2: {
        fontSize: 18,
        color: color.text,
        alignSelf: "center",
        fontWeight: '800'
    },
    carousel: {
        backgroundColor: color.card,
        paddingTop: 30,
    },
    item: {
        borderWidth: 2,
        backgroundColor: color.card,
        borderRadius: 1,
        borderColor: color.border,
    },
    imageBackground: {
        backgroundColor: color.secondary,
        width: 300,
        height: 300,
        alignSelf: "center",
        marginTop: 0,
    },
    rightTextContainer: {
        marginLeft: 'auto',
        marginRight: -2,
        backgroundColor: color.card,
        padding: 3,
        marginTop: 3,
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5
    },
    rightText: { color: color.text },
    lowerContainer: {
        margin: 0
    },
    titleText: {
        fontWeight: 'bold',
        fontSize: 18,
        color: color.text,
    },
    contentText: {
        fontSize: 12,
        color: color.text
    },
    fieldinpu: {
        color: color.text
    }
})
