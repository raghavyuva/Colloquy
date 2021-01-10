import React, {  useState, } from 'react'
import { StyleSheet,Image, FlatList, KeyboardAvoidingView, } from 'react-native'
import { CardItem, Text, Button, Left, View, Input, Item, Label, Body, Right, } from 'native-base';
import { DataLayerValue } from '../Context/DataLayer';
import Postcard from '../components/Postcard';
import { Config } from '../config';
import Headingbar from '../components/Header';
const PostfullView = (props) => {
    const [{ userToken, fullview }, dispatch] = DataLayerValue();
    const [commenttext, setcommenttext] = useState('');
    const commentui = ({ item, index }) => {
        return (
            <CardItem style={{ backgroundColor: "#000", borderBottomWidth: 0.2, borderBottomColor: 'grey' }}>
                <Left>
                    <Body>
                        <Text style={{ color: 'grey' }} >{item.postedBy.username}</Text>
                        <Text style={{ fontSize: 18, color: "white", }}>{item.text}</Text>
                    </Body>
                    <Image
                        source={{ uri: fullview.postedBy.userphoto }}
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
                    'Authorization': 'Bearer ' + `${userToken}`,
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
            fetch(`${Config.url}` + `/posts/comments/${fullview._id}`, {
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
                    await Notifyy();
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
    return (
        <KeyboardAvoidingView style={styles.screen}>
            <Headingbar {...props}/>
            <FlatList
                ListHeaderComponent={
                    <Postcard item={fullview} {...props} />
                }
                renderItem={commentui}
                keyExtractor={(item) => item._id}
                data={fullview.comments}
            />
            <Item style={{ backgroundColor: '#4c4c4c' }}>
                <Input style={styles.fieldinpu}
                    value={commenttext}
                    onChangeText={(t) => setcommenttext(t)}
                    placeholder='Add a comment' placeholderTextColor='#bababa' />
                <Button transparent style={{ borderRadius: 8 }} onPress={comment}>
                    <Text style={{ textTransform: 'capitalize', color: '#fff' }}>comment</Text>
                </Button>
            </Item>
        </KeyboardAvoidingView>

    )
}

export default PostfullView
const styles = StyleSheet.create({
    screen: {
        justifyContent: 'center',
        backgroundColor: 'black',
        flex: 1
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
        fontWeight: '800'
    },
    carousel: {
        backgroundColor: "#f0f0f0",
        paddingTop: 30,
    },
    item: {
        borderWidth: 2,
        backgroundColor: '#000',
        borderRadius: 1,
        borderColor: 'grey',
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
    },
    fieldinpu: {
        color: '#fff'
    }
})
