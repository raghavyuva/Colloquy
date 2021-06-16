import React, { useState, useEffect } from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { DataLayerValue } from '../Context/DataLayer'
import { Thumbnail, Text, Button, Left, Body, ListItem, Right, List, View, Card, CardItem } from 'native-base';
import { useTheme } from '@react-navigation/native'
const StatusCard = (props) => {
    const [{ userToken, user }, dispatch] = DataLayerValue()
    const { colors } = useTheme();
    const opencomp = (id) => {
        if (id == user.user._id) {
            props.navigation.navigate('external', { screen: "StatusView", params: { item: props.item.Image } })
        }
        else {
            props.navigation.navigate('external', { screen: "StatusView", params: { item: props.item } })
        }
    }
    // console.log(props.item);
    return (
        <TouchableOpacity onPress={() => opencomp(props.item._id)}   >
            <Card style={{ borderWidth: 2, borderColor: colors.border, borderBottomColor: colors.border, }} >
                <CardItem avatar style={{ backgroundColor: colors.background, borderRadius: null, borderWidth: 0, margin: 0 }} onPress={() => opencomp(props.item._id)}>
                    <Thumbnail
                        source={{
                            uri: props.item.postedBy.userphoto
                        }}
                        size={50}
                        square
                        style={{ borderRadius: 5 }}
                    />
                    <Left>
                        <Body>
                            <Text style={styles(colors).listTitle} numberOfLines={1}>{props.item.postedBy.username}</Text>
                            <Text note style={styles(colors).listDescription} numberOfLines={1}> {props.item.tagline}</Text>
                        </Body>
                    </Left>
                    <Right>
                        {/* <Button style={styles(colors).follow} >
                                        <Text style={{ textTransform: 'capitalize', color: colors.text }}>message </Text>
                                    </Button> */}
                    </Right>
                </CardItem>
            </Card>
        </TouchableOpacity>
    )
}

export default StatusCard

const styles = (colors) => StyleSheet.create({
    follow: {
        backgroundColor: colors.card,
        borderBottomWidth: 0,
        borderWidth: 0,
        borderColor: colors.border,
        borderBottomColor: 'grey',
    },
    search: {
        backgroundColor: colors.background,
    },
    following: {
        marginLeft: 20,
        fontSize: 25,
        fontWeight: '500'
    },
    listTitle: {
        color: colors.text,
        fontSize: 18,
    },
    listDescription: {
        color: colors.text
    }
})
