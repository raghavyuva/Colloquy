import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, FlatList, Dimensions, TextInput, Linking, KeyboardAvoidingView, } from 'react-native';
import { Header, Right, Button, Text, View, } from 'native-base';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import { Config } from '../config';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { DataLayerValue } from '../Context/DataLayer';
const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
import * as MediaLibrary from 'expo-media-library';
import Base64 from 'Base64';
const Uploadpost = (props) => {
    const [image, setimage] = useState('');
    const [body, setbody] = useState('');
    const [postimage, setpostimage] = useState('https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%3Fid%3DOIP.rZ6B0kNwWbL9IIbN90iAvgHaEK%26pid%3DApi&f=1')
    const [{ userToken, EventData }, dispatch] = DataLayerValue()
    const [activepermission, setactivepermission] = useState(false);
    const [loaclimages, setloaclimages] = useState('');
    const [first, setfirst] = useState('https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%3Fid%3DOIP.rZ6B0kNwWbL9IIbN90iAvgHaEK%26pid%3DApi&f=1')
    const getPermissionAsync = async () => {
        if (Constants.platform.android || Constants.platform.ios) {
            const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
            setactivepermission(status)
            if (status !== 'granted') {
                alert('Sorry, we need camera roll permissions to make this work!');
                console.log(status)
            }
        }
        const media = await MediaLibrary.getAssetsAsync({
            mediaType: MediaLibrary.MediaType.photo,
        });
        setloaclimages(media.assets)
        setfirst(media.assets[0].uri);
        encode();
    }
    const encode = () => {
        const encoded = Base64.btoa(first);
        console.log(encoded)
        setpostimage(encoded);
    }
    const _upload = async () => {
        if (!postimage) {
            alert('no photo selected to post');
        }
        else {
            const uriArr = postimage.split('.');
            const fileType = uriArr[uriArr.length - 1]
            const file = `data:${fileType};base64,${image}`
            const data = new FormData()
            data.append("file", file)
            data.append("upload_preset", 'primish');
            data.append("cloud_name", "raghavyuva");
            fetch("https://api.cloudinary.com/v1_1/raghavyuva/image/upload", {
                method: "POST",
                body: data,
            }).then(res => res.json()).then((da) => {
                fetch(`${Config.url}` + `/post`, {
                    method: 'POST',
                    headers: {
                        'Authorization': 'Bearer ' + `${userToken}`,
                        'Content-Type': "application/json",
                    },
                    body: JSON.stringify({
                        caption: body,
                        photo: da.secure_url
                    })
                }).then(res => res.json()).then((resp) => {
                    console.log(resp);
                })
            }).catch(err => {
                Alert.alert(err);
            })
        }
    }
    useEffect(() => {
        getPermissionAsync();
        return () => {
        }
    }, [])
    return (
        <KeyboardAvoidingView style={styles.screen}>
            <Header style={styles.Header}>
                <Right>
                    <Button transparent onPress={_upload}>
                        <Text>Post</Text>
                    </Button>
                </Right>
            </Header>
            {activepermission == 'granted' ? (
                <>
                    <View>
                        <Image
                            source={{
                                uri:
                                    first
                            }}
                            style={styles.logo}
                        />
                        <TextInput style={styles.inputonblur} placeholder='Write some content here' placeholderTextColor='#bcbcbc'
                            onChangeText={(body) => setbody(body)} value={body}

                        />
                    </View>
                    <View style={{ borderTopLeftRadius: 30, borderTopRightRadius: 30, borderWidth: 2, borderColor: 'grey', }}>
                        <FlatList
                            ref={(ref) => { flatListRef = ref; }}
                            renderItem={({ item }) => {
                                return (
                                    <TouchableOpacity onPress={() => {
                                        setfirst(item.uri)
                                        encode();
                                    }} style={{ borderRadius: 5, borderColor: 'grey', margin: 2 }}>
                                        <Image style={{ width: 200, height: 200, borderRadius: 5 }} source={{ uri: item.uri }} />
                                    </TouchableOpacity>
                                );
                            }}
                            keyExtractor={(item, index) => index.toString()}
                            data={loaclimages}
                            numColumns={2}
                            style={{ marginBottom: 500, marginTop: 18, margin: 10, borderRadius: 5 }}
                        />
                    </View>
                </>
            ) : (
                    <>
                        <View style={{ justifyContent: "center", flex: 1, backgroundColor: 'black' }}>
                            <Text style={{ color: "white" }}>We Need Camera Roll Permissions To Make this work</Text>
                        </View>
                    </>
                )}
        </KeyboardAvoidingView>
    )
}

export default Uploadpost
const styles = StyleSheet.create({
    screen: {
        backgroundColor: '#0b032b',
        height: screenHeight
    },
    logo: {
        width: screenWidth,
        height: screenHeight / 2.4,
        alignSelf: 'center',
    },
    Header: {
        backgroundColor: "#1e2a78"
    },
    opacity: {
        alignSelf: "center",
        marginLeft: 5
    },
    contain: {
        flexDirection: "row",
        backgroundColor: '#5775a5',
        marginTop: 40,
        width: screenWidth - 100,
        height: 60,
        alignSelf: "center",
        borderRadius: 10,
        marginBottom: 10,
        borderWidth: 0.3,
        borderColor: "grey"
    },
    inputonblur: {
        width: screenWidth,
        height: 51,
        paddingLeft: 15,
        alignSelf: "center",
        color: 'white'
    },
    fieldtitle: {
        color: 'white',
        borderBottomWidth: 2,
        borderBottomColor: 'red',
    },
    focused: {
        height: screenHeight / 2
    },
    blurred: {
        height: screenHeight / 2,
    }
});

