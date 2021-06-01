
import React, { useState } from 'react'
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Dimensions,
    ImageBackground,
    Alert
} from 'react-native'
import { CardItem, Left, Button, } from 'native-base';
import { EvilIcons, AntDesign, FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import { DataLayerValue } from '../Context/DataLayer';
import { Config } from '../config';
const Pcarsl = (props) => {
    const [{ userToken, UserId, user }, dispatch] = DataLayerValue()
    const [from, setfrom] = useState(props.frompro);
    const DeletePost = async (item) => {
        Alert.alert(
            'Delete Post',
            'Are you sure you want to delete this post?,once deleted cannot be retrieved',
            [
                { text: 'Cancel', onPress: () => console.warn('NO Pressed'), style: 'cancel' },
                {
                    text: 'YES', onPress: () =>
                        fetch(`${Config.url}` + `/post/${item._id}`, {
                            method: 'Delete',
                            headers: {
                                'Authorization': 'Bearer ' + `${userToken}`,
                                'Content-Type': "application/json",
                            },
                        }).then(res => res.json()).then((resp) => {
                            fetching();
                        })
                }
            ]
        );
    }
    const fetching = async () => {
        try {
            await fetch(`${Config.url}` + `/user/${UserId}`, {
                headers: {
                    'Authorization': 'Bearer ' + `${userToken}`,
                }
            })
                .then((response) => response.json())
                .then((responseJson) => {
                    dispatch({
                        type: "USERPROFILE",
                        data: responseJson
                    })
                })
        } catch (e) {
            console.log(e);
        }
    }
    const NavigateFull = (item) => {
        dispatch({
            type: 'FULLVIEW',
            data: item
        })
        props.navigation.navigate('external', { screen: 'view' })
    }
    return (
        <TouchableOpacity
            activeOpacity={1}
            style={styles.item}
            onPress={() => NavigateFull(props.item)}
        >
            <ImageBackground
                source={{ uri: props.item.photo }}
                style={styles.imageBackground}
            >
                {from ? (
                    <View style={styles.rightTextContainer}>
                        <TouchableOpacity onPress={() => DeletePost(props.item)}>
                            <MaterialIcons name="delete" size={24} color="white" />
                        </TouchableOpacity>
                    </View>
                ) : (
                    <View>
                    </View>
                )}
            </ImageBackground>
            <View style={styles.lowerContainer}>
                <Text style={styles.titleText}>{props.item.caption}</Text>
                <Text style={styles.contentText}></Text>
                <CardItem style={{ backgroundColor: "#fc5185" }} >
                    <Left>
                        <Button transparent textStyle={{ color: '#87838B' }}>
                            <EvilIcons name="comment" size={28} color="black" />
                            <Text style={{ textTransform: 'capitalize' }}>  </Text>
                        </Button>
                        <Button transparent textStyle={{ color: '#87838B' }} >
                            <AntDesign name="heart" size={28} color="black" />
                            <Text style={{ textTransform: 'capitalize' }}> likes</Text>
                        </Button>
                        <Button transparent>
                            <FontAwesome5 name="hand-point-up" size={28} color="black" />
                            <Text style={{ textTransform: 'capitalize' }}>50</Text>
                        </Button>
                    </Left>
                </CardItem>
            </View>
        </TouchableOpacity>
    )
}

export default Pcarsl
const styles = StyleSheet.create({
    mainscreen: {
        height: "40%",
        backgroundColor: "#000",
        borderBottomLeftRadius: 50,
        borderBottomRightRadius: 50,
        paddingHorizontal: 40,
    },
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
        backgroundColor: '#fc5185',
        borderRadius: 5,
        borderColor: '#fc5185',
        elevation: 3,
        flex: 2
    },
    imageBackground: {
        backgroundColor: '#fc5185',
        borderWidth: 5,
        borderColor: '#fc5185',
        flex: 1
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