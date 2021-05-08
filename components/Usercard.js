import React, { useState, useEffect } from 'react';
import { Image, StyleSheet } from 'react-native';
import { Thumbnail, Text, Button, Left, Body, ListItem, Right, List, View, } from 'native-base';
import { DataLayerValue } from '../Context/DataLayer';
import { Config } from '../config';
import { DefaultTheme, DarkTheme, useTheme } from '@react-navigation/native';

const Usercard = (props) => {
    const [{ userToken, }, dispatch] = DataLayerValue()
    const [name, setname] = useState('');
    const { colors } = useTheme();

    useEffect(() => {
        setname(props.name)
        return () => {
        }
    }, [])
    const followuser = (itm) => {
        console.log(itm._id)
        try {
            fetch(`${Config.url}` + `/follow`, {
                method: 'PUT',
                headers: {
                    'Authorization': 'Bearer ' + `${userToken}`,
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    followid: itm._id
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
        console.log(itm._id)
        try {
            fetch(`${Config.url}` + `/unfollow`, {
                method: 'PUT',
                headers: {
                    'Authorization': 'Bearer ' + `${userToken}`,
                    'Content-type': 'application/json'
                },

                body: JSON.stringify({
                    followid: itm._id
                })
            })
                .then((response) => response.json())
                .then((responseJson) => { console.log(responseJson) }).catch((err) => { alert(err); })
        } catch (error) {
            alert(error);
        }
    }
    const opencomp = (id) => {
        props.navigation.navigate('external', { screen: 'userpro', params: { thread: id } })
    }
    if (props.name == 'followers') {
        return (
            <List style={{ borderBottomWidth: 0, borderWidth: 2, borderColor:colors.border, borderBottomColor: colors.border,}}>
                <ListItem thumbnail onPress={() => opencomp(props.item._id)} >
                    <Left>
                        <Thumbnail source={{ uri: props.item.userphoto }} />
                    </Left>
                    <Body style={{ borderBottomWidth: 0, borderWidth: 0, borderColor: colors.border, borderBottomColor: colors.border,}} >
                        <Text style={{ color: colors.text }}>{props.item.username}</Text>
                        <Text note numberOfLines={1}>{props.item.tagline}</Text>
                    </Body>
                    <Right>
                        {props.item.followers.includes(props.user) ? (
                            <View style={{ borderBottomWidth: 0, borderWidth: 0, borderColor:colors.border,borderBottomColor: colors.border,}}>
                                <Button style={styles(colors).follow} onPress={() => unfollow(props.item)}>
                                    <Text>unfollow</Text>
                                </Button>
                            </View>

                        ) : (
                                <View style={{ borderBottomWidth: 0, borderWidth: 0, borderColor:colors.border, borderBottomColor: colors.border,}}>
                                    <Button style={styles(colors).follow} onPress={() => followuser(props.item)} >
                                        <Text>follow</Text>
                                    </Button>
                                </View>
                            )}
                    </Right>
                </ListItem>
            </List>
        )
    }
    else {
        return (
            <List style={{ borderBottomWidth: 0, borderWidth: 2, borderColor:colors.border, borderBottomColor: colors.border,}}>
                <ListItem thumbnail onPress={() => opencomp(props.item._id)}>
                    <Left>
                        <Thumbnail square source={{ uri: props.item.userphoto }} />
                    </Left>
                    <Body style={{ borderBottomWidth: 0, borderWidth: 0, borderColor: colors.border, borderBottomColor: colors.border,}}>
                        <Text style={{ color: colors.text }}>{props.item.username}</Text>
                        <Text note numberOfLines={1} style={{ color:colors.text}}>{props.item.tagline}</Text>
                    </Body>
                    <Right>
                        <View style={{ borderBottomWidth: 0, borderWidth: 0, borderColor:colors.border, borderBottomColor: colors.border,}}>
                            <Button style={styles(colors).follow} onPress={() => unfollow(props.item)}>
                                <Text>unfollow</Text>
                            </Button>
                        </View>
                    </Right>
                </ListItem>
            </List>
        )
    }
}

export default Usercard
const styles =(colors)=> StyleSheet.create({
    follow: {
        backgroundColor: colors.primary,
        borderBottomWidth: 0,
        borderWidth: 0,
        borderColor: colors.border,
        borderBottomColor: colors.border,
        borderRadius:50
    },
    search: {
        backgroundColor: colors.background,
    },
    following: {
        marginLeft: 20,
        fontSize: 25,
        fontWeight: '500'
    }
})
