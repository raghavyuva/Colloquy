import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native'
import Header from '../components/Header';
import { Config } from '../config';
import { DataLayerValue } from '../Context/DataLayer';
import { Thumbnail, Button, Left, Body, ListItem, Right, List, } from 'native-base';
import { useTheme } from '@react-navigation/native';

const WhoLiked = (props) => {
    const [data, setdata] = useState(props.route.params.item);
    const [{ userToken, user, otherprofile }, dispatch] = DataLayerValue()
    const [Users, setUsers] = useState([]);
    const { colors } = useTheme();

    useEffect(() => {
        let IsMounted = true;
        getuser()
        return () => {

            IsMounted = false;

        }
    }, [])
    const getuser = () => {
        data.likes.map((ele) => {
            try {
                fetch(`${Config.url}` + `/user/${ele}`, {
                    headers: {
                        'Authorization': 'Bearer ' + `${userToken}`,
                    }
                })
                    .then((response) => response.json())
                    .then((responseJson) => {
                        let user = [];
                        user.push(responseJson)
                        setUsers(user)
                        console.log(user.user);
                    })
            } catch (e) {
                console.log(e);
            }
        })
    }
    const followuser = (itm) => {
        try {
            fetch(`${Config.url}` + `/follow`, {
                method: 'PUT',
                headers: {
                    'Authorization': 'Bearer ' + `${userToken}`,
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    followid: itm.user._id
                })
            }).then(res => res.json()).then((resp) => {
                console.log(resp);
            })
        }
        catch (error) {
            console.log('error', error)
        }
    }
    const unfollow = (itm) => {
        try {
            fetch(`${Config.url}` + `/unfollow`, {
                method: 'PUT',
                headers: {
                    'Authorization': 'Bearer ' + `${userToken}`,
                    'Content-type': 'application/json'
                },

                body: JSON.stringify({
                    followid: itm.user._id
                })
            })
                .then((response) => response.json())
                .then((responseJson) => { console.log(responseJson) }).catch((err) => { alert(err); })
        } catch (error) {
            alert(error);
        }
    }
    const opencomp = (id) => {
        if (id == user.user.id) {
            props.navigation.navigate('external', { screen: 'profile' })
        }
        else {
            props.navigation.navigate('external', { screen: 'userpro', params: { thread: id } })
        }
    }
    return (
        <View style={{ flex: 1, backgroundColor: colors.background }}>
            <Header {...props} />
            <FlatList
                renderItem={({ item }) => {
                    console.log(item)
                    return (
                        <List>
                            <ListItem thumbnail onPress={() => opencomp(item.user._id)} >
                                <Left>
                                    <Thumbnail source={{ uri: item.user.userphoto }} />
                                </Left>
                                <Body style={{ borderBottomWidth: 0, borderWidth: 0 }} >
                                    <Text style={{ color: colors.text }}>{item.user.username}</Text>
                                    <Text note numberOfLines={1} style={{ color: colors.text }}>{item.user.tagline}</Text>
                                </Body>
                                <Right>
                                    {
                                        item.user._id == user.user._id ? (
                                            <View>

                                            </View>
                                        ) : (
                                            <>
                                                {item.user.followers.includes(user.user._id) ? (
                                                    <View style={{ borderBottomWidth: 0, borderWidth: 0, borderColor: '#0E043B', borderBottomColor: "#0E043B" }}>
                                                        <Button style={styles.follow} onPress={() => unfollow(item)}>
                                                            <Text style={{ color: 'white' }}>unfollow  </Text>
                                                        </Button>
                                                    </View>
                                                ) : (
                                                    <View style={{ borderBottomWidth: 0, borderWidth: 0, borderColor: '#0E043B', borderBottomColor: "#0E043B" }}>
                                                        <Button style={styles.follow} onPress={() => followuser(item)} >
                                                            <Text style={{ color: 'white' }}>follow </Text>
                                                        </Button>
                                                    </View>
                                                )
                                                }
                                            </>
                                        )
                                    }

                                </Right>
                            </ListItem>
                        </List>
                    );
                }}
                keyExtractor={(item, index) => index.toString()}
                data={Users}

            />
        </View>
    )
}

export default WhoLiked;
const styles = StyleSheet.create({
    follow: {
        backgroundColor: 'black',
        borderBottomWidth: 0,
        borderWidth: 0,
        borderColor: '#0E043B',
        borderBottomColor: "#0E043B",
        width: 80,
        justifyContent: 'center'
    },
    search: {
        backgroundColor: '#053e42'
    },
    following: {
        marginLeft: 20,
        fontSize: 25,
        fontWeight: '500'
    }
})
