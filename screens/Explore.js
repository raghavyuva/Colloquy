import React, { Component, useState, useEffect } from 'react'
import { Text, StyleSheet, View, TouchableOpacity, ImageBackground, Dimensions,  } from 'react-native'
import Carousel from 'react-native-snap-carousel';
import { Config } from '../config';
const { width, height } = Dimensions.get('window');
import { Container, CardItem, Left, Button, Fab, Icon, Right } from 'native-base';

import { MaterialCommunityIcons, SimpleLineIcons } from '@expo/vector-icons';
import { DataLayerValue } from '../Context/DataLayer';
const Explore = () => {
    const [{ userToken, ExploreData }, dispatch] = DataLayerValue()

    const fetching = async () => {
        try {
            const Listener = fetch(`${Config.url}` + `/allusers`, {
                headers: {
                    'Authorization': 'Bearer ' + `${userToken}`,
                }
            }).then((response) => response.json())
                .then((responseJson) => {
                    dispatch({
                        type: "EXPLOREDATA",
                        data: responseJson
                    })
                })
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        fetching();
        return () => {
        }
    }, [])
    const _renderItem = ({ item, index }) => {
        return (
            <View style={{ flex: 1 }}>
                <ImageBackground source={{ uri: item.userphoto }} style={{ width: width, height: height, flex: 0.9 }} >
                    <View style={{ margin: 20, flexDirection: 'row', justifyContent: 'space-between' }}>
                        <TouchableOpacity>
                            <SimpleLineIcons name="user" size={30} color="blue" />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <MaterialCommunityIcons name="dots-vertical" size={30} color="blue" />
                        </TouchableOpacity>
                    </View>
                    <View style={{ justifyContent: 'space-between', position: 'absolute', bottom: 10, flexDirection: 'row' }}>

                    </View>
                </ImageBackground>
                <View style={styles.mainscreen}>
                    <View style={{ margin: 30 }}>
                        <Text style={{ fontSize: 24, fontWeight: 'bold', }}>{item.username}</Text>
                        <Text style={{ fontSize: 18, fontWeight: '100', }}>{item.tagline}</Text>
                    </View>
                    <Button style={{
                        marginTop: 30, marginRight: 30, width: 100,
                        justifyContent: 'center', borderWidth: 2, borderColor: 'red',
                        borderRadius: 15
                    }}
                        transparent
                    >
                        <Text style={{ textAlign: 'center', color: 'red' }}>Follow</Text>
                    </Button>
                    <View style={{ position: 'absolute', bottom: 10, }}>
                        <View style={{ flexDirection: "row", justifyContent: 'space-between' }}>
                            <View style={{ marginRight: 100, marginLeft: 10 }}>
                                <Text style={styles.titleText}>{item.followers.length}</Text>
                                <Text style={styles.txt1}>followers</Text>
                            </View>
                            <View style={{ marginRight: 70, }}>
                                <Text style={styles.titleText}>28 </Text>
                                <Text style={styles.txt1}>posts</Text>
                            </View>
                            <View style={{ marginRight: 0 }}>
                                <Text style={styles.titleText}>{item.following.length} </Text>
                                <Text style={styles.txt1}>following</Text>
                            </View>
                        </View>

                    </View>
                </View>
            </View>
        );
    }
    return (
        <View style={{ flex: 1 }}>
            <Carousel
                ref={(c) => { _carousel = c; }}
                data={ExploreData}
                renderItem={_renderItem}
                sliderWidth={400}
                itemWidth={400}
            />
        </View>
    )
}

export default Explore
const styles = StyleSheet.create({
    mainscreen: {
        backgroundColor: "#fff",
        flex: 0.3,
        width: width,
        borderTopStartRadius: 50,
        borderTopEndRadius: 50,
        flexDirection: "row",
        justifyContent: 'space-between'
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
        fontSize: 18,
        color: "#000",
        alignSelf: "center",
        fontWeight: '500'
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
        backgroundColor: '#000',
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
        color: "#000",
        textAlign: "center",
        alignSelf: 'center'
    },
    contentText: {
        fontSize: 12,
        color: "#fff"
    }
})