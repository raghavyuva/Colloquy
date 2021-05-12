
import React, { useState, useEffect } from 'react'
import {
    StyleSheet,
    View,
    Dimensions,
    Image,
    FlatList
} from 'react-native'
import { Button,Text } from 'native-base';
const { height, width } = Dimensions.get('window');
import { DataLayerValue } from '../Context/DataLayer';
import { Config } from '../config'
import LottieView from 'lottie-react-native';
import Postcard from '../components/Postcard';
import Headingbar from '../components/Header';
import { DefaultTheme, DarkTheme, useTheme } from '@react-navigation/native';

const UserProfile = (props) => {
    const [{ userToken, user, otherprofile }, dispatch] = DataLayerValue()
    const [load, setload] = useState(true);
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
    }, [])
    const { colors } = useTheme();

    const followuser = () => {
        try {
            fetch(`${Config.url}` + `/follow`, {
                method: 'PUT',
                headers: {
                    'Authorization': 'Bearer ' + `${userToken}`,
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    followid: otherprofile.user._id
                })
            }).then(res => res.json()).then((resp) => {
                fetching(otherprofile.user._id)
            })
        }
        catch (error) {
            console.log('error', error)
        }
    }
    const unfollow = () => {

        try {
            fetch(`${Config.url}` + `/unfollow`, {
                method: 'PUT',
                headers: {
                    'Authorization': 'Bearer ' + `${userToken}`,
                    'Content-type': 'application/json'
                },

                body: JSON.stringify({
                    followid: otherprofile.user._id
                })
            })
                .then((response) => response.json())
                .then((responseJson) => {
                    fetching(otherprofile.user._id);
                }).catch((err) => { alert(err); })
        } catch (error) {
            alert(error);
        }
    }

    if (load) {
        return (
            <View style={{ justifyContent: "center", flex: 1, backgroundColor: colors.background }}>
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
        <View style={{ backgroundColor: colors.background, }}>
            <Headingbar {...props} />
            {otherprofile.userposts[0] == null ? (
                <View style={{ flex: 1, backgroundColor: colors.background }}>
                    <View style={styles(colors).mainscreen}>
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
                                    <Text style={styles(colors).txt1}>
                                        {otherprofile.user.username}
                                    </Text>
                                </View>
                                <View style={{ width: 250, marginRight: 10 }}>
                                    {otherprofile.user.tagline == null ? (
                                        <Text style={styles(colors).txt2}>
                                            {otherprofile.user.email}
                                        </Text>
                                    ) : (
                                        <Text style={styles(colors).txt2}>
                                            {otherprofile.user.tagline}
                                        </Text>
                                    )}
                                </View>
                            </View>
                        </View>
                        <View style={{ position: 'absolute', bottom: 60, marginHorizontal: 20 }}>
                            <Text style={styles(colors).txt2}>
                                {otherprofile.user.email}
                            </Text>
                        </View>
                        <View style={{ flexDirection: 'row', position: 'absolute', bottom: 30, marginHorizontal: 20 }}>
                            <View style={{ marginRight: 5 }}>
                                <Text style={{
                                    fontWeight: "bold",
                                    fontSize: 15,
                                    color: colors.text,
                                }}>{otherprofile.userposts.length} Posts</Text>
                            </View>
                            <View style={{ marginRight: 5 }}>
                                <Text style={{
                                    fontWeight: "bold",
                                    fontSize: 15,
                                    color: colors.text,
                                }}>{otherprofile.user.followers.length} Followers</Text>

                            </View>

                            <View style={{ marginRight: 5 }}>
                                <Text style={{
                                    fontWeight: "bold",
                                    fontSize: 15,
                                    color: colors.text,
                                }}>{otherprofile.user.following.length} Following</Text>
                            </View>

                        </View>
                        {user.user.following.includes(otherprofile.user._id) ? (
                            <View style={{ position: 'absolute', bottom: 30, marginHorizontal: 20, right: 10 }}>
                                <Button style={styles(colors).follow} onPress={unfollow}>
                                    <Text style={{ justifyContent: 'center', alignSelf: 'center', color: colors.text }}>Un Friend</Text>
                                </Button>
                            </View>
                        ) : (
                            <View style={{ position: 'absolute', bottom: 30, marginHorizontal: 20, right: 10 }}>
                                <Button style={styles(colors).follow} onPress={followuser} >
                                    <Text style={{ justifyContent: 'center', alignSelf: 'center', color: colors.text }}>Be Friend</Text>
                                </Button>
                            </View>
                        )}

                    </View>
                    <Image
                        source={require('../assets/emptyy.png')}
                        style={{ width: width, height: height / 1.7, alignSelf: 'center', }}
                    />
                </View>
            ) : (
                <FlatList
                    ListHeaderComponent={
                        <View style={styles(colors).mainscreen}>
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
                                        <Text style={styles(colors).txt1}>
                                            {otherprofile.user.username}
                                        </Text>
                                    </View>
                                    <View style={{ width: 250, marginRight: 10 }}>
                                        {otherprofile.user.tagline == null ? (
                                            <Text style={styles(colors).txt2}>
                                                {otherprofile.user.email}
                                            </Text>
                                        ) : (
                                            <Text style={styles(colors).txt2}>
                                                {otherprofile.user.tagline}
                                            </Text>
                                        )}
                                    </View>
                                </View>
                            </View>
                            <View style={{ position: 'absolute', bottom: 60, marginHorizontal: 20 }}>
                                <Text style={styles(colors).txt2}>
                                    {otherprofile.user.email}
                                </Text>
                            </View>
                            <View style={{ flexDirection: 'row', position: 'absolute', bottom: 30, marginHorizontal: 20 }}>
                                <View style={{ marginRight: 5 }}>
                                    <Text style={{
                                        fontWeight: "bold",
                                        fontSize: 15,
                                        color: colors.text,
                                    }}>{otherprofile.userposts.length} Posts</Text>
                                </View>
                                <View style={{ marginRight: 5 }}>
                                    <Text style={{
                                        fontWeight: "bold",
                                        fontSize: 15,
                                        color: colors.text,
                                    }}>{otherprofile.user.followers.length} Followers</Text>

                                </View>

                                <View style={{ marginRight: 5 }}>
                                    <Text style={{
                                        fontWeight: "bold",
                                        fontSize: 15,
                                        color: colors.text,
                                    }}>{otherprofile.user.following.length} Following</Text>
                                </View>

                            </View>
                            {user.user.following.includes(otherprofile.user._id) ? (
                                <View style={{ position: 'absolute', bottom: 30, marginHorizontal: 20, right: 10 }}>
                                    <Button style={styles(colors).follow} onPress={unfollow}>
                                        <Text style={{ justifyContent: 'center', alignSelf: 'center', color: colors.text, }}>Un Friend</Text>
                                    </Button>
                                </View>
                            ) : (
                                <View style={{ position: 'absolute', bottom: 30, marginHorizontal: 20, right: 10 }}>
                                    <Button style={styles(colors).follow} onPress={followuser} >
                                        <Text style={{ justifyContent: 'center', alignSelf: 'center', color: colors.text }}>Be Friend</Text>
                                    </Button>
                                </View>
                            )}
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
            )}

        </View>
    )
}

export default UserProfile;
const styles = (colors) => StyleSheet.create({
    mainscreen: {
        height: height / 3,
        backgroundColor: colors.card,
        flexDirection: 'row',
        borderBottomStartRadius: 20,
        borderBottomEndRadius: 20,
        marginBottom: 20
    },
    row1: {
        marginTop: 50,
        marginLeft: 10,
        marginBottom: 10
    },
    txt1: {
        fontSize: 25,
        color: colors.text,
        fontWeight: 'bold'
    },
    txt2: {
        fontSize: 16,
        color: colors.text,
        alignSelf: 'flex-start'
    },
    carousel: {
        height: '50%',
        backgroundColor: colors.background,
        paddingTop: 30,
    },
    item: {
        borderWidth: 2,
        backgroundColor: colors.background,
        borderRadius: 5,
        borderColor: colors.border,
        elevation: 3,
        flex: 2
    },
    imageBackground: {
        backgroundColor: colors.background,
        borderWidth: 5,
        borderColor: colors.border,
        flex: 1
    },
    rightTextContainer: {
        marginLeft: 'auto',
        marginRight: -2,
        backgroundColor: colors.background,
        padding: 3,
        marginTop: 3,
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5
    },
    rightText: { color: colors.text },
    lowerContainer: {
        margin: 10
    },
    titleText: {
        fontWeight: 'bold',
        fontSize: 18,
        color: colors.text
    },
    contentText: {
        fontSize: 12,
        color: colors.text
    },
    follow: {
        backgroundColor: colors.primary,
        width: 110,
        justifyContent: 'center',
        alignSelf: 'center',
        borderRadius:25
    },
})