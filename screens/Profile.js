
import React, { useState, useEffect } from 'react'
import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    Image,
    FlatList
} from 'react-native'
import {  Fab, } from 'native-base';
const { width, height } = Dimensions.get('window');
import { MaterialIcons } from '@expo/vector-icons';
import { DataLayerValue } from '../Context/DataLayer';
import { Config } from '../config'
import LottieView from 'lottie-react-native';
import Postcard from '../components/Postcard';
import Headingbar from '../components/Header';

const Profile = (props) => {
    const [{ userToken, UserId, user }, dispatch] = DataLayerValue()
    const [load, setload] = useState(true);
    const [active, setactive] = useState(false)
    const [refresh, setrefresh] = useState(false)
    const GoTo_top_function = () => {

        flatListRef.scrollToOffset({ animated: true, offset: 0 });

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
                    setload(false)
                })
        } catch (e) {
            console.log(e);
        }
    }
    useEffect(() => {
        fetching()
        setTimeout(() => {
            setload(false)
        }, 2000);
    }, [])
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
                                source={{ uri: user.user.userphoto }}
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
                                        {user.user.username}
                                    </Text>
                                </View>
                                <View style={{ width: 250, marginRight: 10 }}>
                                    {user.user.tagline == null ? (
                                        <Text style={styles.txt2}>
                                            {user.user.email}
                                        </Text>
                                    ) : (
                                            <Text style={styles.txt2}>
                                                {user.user.tagline}
                                            </Text>
                                        )}
                                </View>
                            </View>
                        </View>
                        <View style={{ position: 'absolute', bottom: 60, marginHorizontal: 20 }}>
                            <Text style={styles.txt2}>
                                {user.user.email}
                            </Text>
                        </View>
                        <View style={{ flexDirection: 'row', position: 'absolute', bottom: 30, marginHorizontal: 20 }}>
                            <View style={{ marginRight: 5 }}>
                                <Text style={{
                                    fontWeight: "bold",
                                    fontSize: 15,
                                    color: "#f0f0f0",
                                }}>{user.userposts.length} Posts</Text>
                            </View>
                            <View style={{ marginRight: 5 }}>
                                <Text style={{
                                    fontWeight: "bold",
                                    fontSize: 15,
                                    color: "#f0f0f0",
                                }}>{user.user.followers.length} Followers</Text>

                            </View>

                            <View style={{ marginRight: 5 }}>
                                <Text style={{
                                    fontWeight: "bold",
                                    fontSize: 15,
                                    color: "#f0f0f0",
                                }}>{user.user.following.length} Following</Text>
                            </View>
                        </View>
                        <Fab
                            active={active}
                            direction="up"
                            containerStyle={{}}
                            style={{ backgroundColor: '#5067FF', }}
                            position="bottomRight"
                            onPress={() => props.navigation.navigate('edit')}>
                            <MaterialIcons name="settings" size={24} color="black" />
                        </Fab>
                    </View>
                }
                renderItem={({ item }) => {
                    return (
                        <Postcard item={item} {...props} />
                    )
                }}
                keyExtractor={(item, index) => index.toString()}
                data={user.userposts}
                onEndReached={fetching && GoTo_top_function}
                scrollEnabled
                onScrollAnimationEnd
                scrollToOverflowEnabled
                onEndReachedThreshold={0}
                refreshing={refresh}
                onRefresh={fetching}
                style={{ marginBottom: 50 }}
            />
        </View>
    )
}

export default Profile
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