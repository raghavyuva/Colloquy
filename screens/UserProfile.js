
import React, { Component, useState, useEffect } from 'react'
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Dimensions,
    ImageBackground,
    Image,
    FlatList
} from 'react-native'
import { Container, CardItem, Left, Button, Fab, Icon } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import Carousel from 'react-native-snap-carousel';
const { width, height } = Dimensions.get('window');
import { EvilIcons, AntDesign, FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import Pcarsl from '../components/Pcarsl';
import { DataLayerValue } from '../Context/DataLayer';
import Header from '../components/Header';
import { Config } from '../config'
import LottieView from 'lottie-react-native';
import Postcard from '../components/Postcard';
import { ScrollView } from 'react-native-gesture-handler';
import Headingbar from '../components/Header';

const UserProfile = (props) => {
    const [{ userToken, UserId, user, otherprofile }, dispatch] = DataLayerValue()
    const [load, setload] = useState(true);
    const [active, setactive] = useState(false)
    const [refresh, setrefresh] = useState(false)
    const GoTo_top_function = () => {

        flatListRef.scrollToOffset({ animated: true, offset: 0 });

    }
    const fetching = async (id) => {
        try {
            await fetch(`${Config.url}` + `/user/${id}`, {
                headers: {
                    'Authorization': 'Bearer ' + `${userToken}`,
                }
            })
                .then((response) => response.json())
                .then((responseJson) => {

                    dispatch({
                        type: "PROFILEOFOTHER",
                        data: responseJson
                    })
                    setload(false)
                })
        } catch (e) {
            console.log(e);
        }
    }
    useEffect(() => {
        fetching(props.route.params.thread)
    }, [otherprofile])
    if (load) {
        return (
            <View style={{ justifyContent: "center", flex: 1, backgroundColor: '#0E043B' }}>
                <LottieView
                    loop={true}
                    autoPlay={true}
                    source={require('../animation/5328-loading-11.json')}
                    style={{ width: 400, height: 400 }}
                />
            </View>
        );
    }
    return (
        <View style={{ backgroundColor: "#0b032b", }}>
            <Headingbar {...props} />
            <FlatList
                ListHeaderComponent={
                    <View style={styles.mainscreen}>
                        <View style={{ flexDirection: 'row' }}>
                            <Image
                                source={{ uri: otherprofile.user.userphoto }}
                                style={{
                                    height: 150,
                                    width: 150,
                                    borderRadius: 20,
                                    marginVertical: 30,
                                    marginHorizontal: 10
                                }}
                            />
                            <View>
                                <View style={{ marginTop: 50 }}>
                                    <Text style={styles.txt1}>
                                        {otherprofile.user.username}
                                    </Text>
                                </View>
                                <View style={{ width: 250, marginRight: 10 }}>
                                    {otherprofile.user.tagline == null ? (
                                        <Text style={styles.txt2}>
                                            {otherprofile.user.email}
                                        </Text>
                                    ) : (
                                            <Text style={styles.txt2}>
                                                {otherprofile.user.tagline}
                                            </Text>
                                        )}
                                </View>
                            </View>
                        </View>
                        <View style={{ position: 'absolute', bottom: 60, marginHorizontal: 20 }}>
                            <Text style={styles.txt2}>
                                {otherprofile.user.email}
                            </Text>
                        </View>
                        <View style={{ flexDirection: 'row', position: 'absolute', bottom: 30, marginHorizontal: 20 }}>
                            <View style={{ marginRight: 5 }}>
                                <Text style={{
                                    fontWeight: "bold",
                                    fontSize: 15,
                                    color: "#f0f0f0",
                                }}>{otherprofile.userposts.length} Posts</Text>
                            </View>
                            <View style={{ marginRight: 5 }}>
                                <Text style={{
                                    fontWeight: "bold",
                                    fontSize: 15,
                                    color: "#f0f0f0",
                                }}>{otherprofile.user.followers.length} Followers</Text>

                            </View>

                            <View style={{ marginRight: 5 }}>
                                <Text style={{
                                    fontWeight: "bold",
                                    fontSize: 15,
                                    color: "#f0f0f0",
                                }}>{otherprofile.user.following.length} Following</Text>
                            </View>
                        </View>
                    </View>
                }
                ref={(ref) => { flatListRef = ref; }}
                renderItem={({ item }) => {
                    return (
                        <Postcard item={item} {...props} />
                    );
                }}
                keyExtractor={(item, index) => index.toString()}
                data={otherprofile.userposts}
                onEndReached={fetching && GoTo_top_function}
                scrollEnabled
                onScrollAnimationEnd
                scrollToOverflowEnabled
                onEndReachedThreshold={0}
                style={{ marginBottom: 50 }}
            />
        </View>
    )
}

export default UserProfile;
const styles = StyleSheet.create({
    mainscreen: {
        height: height / 3,
        backgroundColor: "#0b032b",
        flexDirection: 'row'
    },
    row1: {
        marginTop: 50,
        marginLeft: 10,
        marginBottom: 10
    },
    txt1: {
        fontSize: 25,
        color: "#f0f0f0",
        fontWeight: 'bold'
    },
    txt2: {
        fontSize: 16,
        color: "#fff",
        alignSelf: 'flex-start'
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