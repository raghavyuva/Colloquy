import React, { Component, useEffect, useState } from 'react';
import { Image, StyleSheet, FlatList, ScrollView, Dimensions, TextInput, KeyboardAvoidingView, Linking, Modal, TouchableHighlight } from 'react-native';
import { EvilIcons, Ionicons, FontAwesome, AntDesign } from '@expo/vector-icons';
import * as Font from 'expo-font';
import { Header, Right, Button, Text, View, Fab, Icon, Left, Container } from 'native-base';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import { Config } from '../config';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { DataLayerValue } from '../Context/DataLayer';
const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
import * as MediaLibrary from 'expo-media-library';

const Uploadpost = (props) => {
    const [image, setimage] = useState('');
    const [body, setbody] = useState('');
    const [postimage, setpostimage] = useState('https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%3Fid%3DOIP.rZ6B0kNwWbL9IIbN90iAvgHaEK%26pid%3DApi&f=1')
    const [{ userToken, EventData }, dispatch] = DataLayerValue()
    const [active, setactive] = useState(false);
    const [loaclimages, setloaclimages] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [first, setfirst] = useState('https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%3Fid%3DOIP.rZ6B0kNwWbL9IIbN90iAvgHaEK%26pid%3DApi&f=1')
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
    const _pickImagefromCamera = async () => {
        try {
            let result = await ImagePicker.launchCameraAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true,
                quality: 1,
                base64: true,
                aspect: [4, 3],
            });

            if (!result.cancelled) {
                const { uri, base64 } = result
                setpostimage(uri);
                setimage(base64)
            }
        } catch (E) {
            console.log(E);
        }
    };
    const _pickImagefromGallery = async () => {
        try {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true,
                quality: 1,
                base64: true,
                aspect: [4, 3],
            });
            if (!result.cancelled) {
                const { uri, base64 } = result
                setpostimage(uri);
                setimage(base64)
            }
        } catch (E) {
            console.log(E);
        }
    }
    const getPermissionAsync = async () => {
        const media = await MediaLibrary.getAssetsAsync({
            mediaType: MediaLibrary.MediaType.photo,
        });
        setloaclimages(media.assets)
        setfirst(media.assets[0]);
        if (Constants.platform.ios) {
            const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
            if (status !== 'granted') {
                alert('Sorry, we need camera roll permissions to make this work!');
            }
            const { stt } = await MediaLibrary.requestPermissionsAsync(Permissions.CAMERA);
            if (stt !== 'granted') {
                alert('Sorry, we need camera permissions to make this work!');
            }
        }

    }
    useEffect(() => {
        getPermissionAsync();
        return () => {

        }
    }, [])
    const openPhotos = (uri) => {
        switch (Platform.OS) {
            case "ios":
                Linking.openURL("photos-redirect://");
                break;
            case "android":
                Linking.openURL("content://media/internal/images/media");
                break;
            default:
                console.log("Could not open gallery app");
        }
    }
    return (
        <View style={styles.screen}>
            <Header style={styles.Header}>
                <Button onPress={() => props.navigation.navigate('external', { screen: 'polladd' })} transparent>
                    <Text style={styles.fieldtitle}>Create Poll ?</Text>
                </Button>
                <Right>
                    <Button onPress={_upload} transparent>
                        <Text>Post</Text>
                    </Button>
                </Right>
            </Header>
            <View style={{ justifyContent: "center", }}>
                <Image
                    source={{
                        uri:
                            first.uri
                    }}
                    style={styles.logo}
                />
                <Fab
                    active={active}
                    direction="up"
                    containerStyle={{}}
                    style={{ backgroundColor: '#974455' }}
                    position="bottomRight"
                    onPress={() => setModalVisible(true)}>
                    <EvilIcons name="pencil" size={24} />

                </Fab>
            </View>
            <FlatList
                ref={(ref) => { flatListRef = ref; }}
                renderItem={({ item }) => {
                    return (
                        <TouchableOpacity onPress={() => setfirst(item)}>
                            <Image style={{ width: 200, height: 200 }} source={{ uri: item.uri }} />
                        </TouchableOpacity>
                    );
                }}
                keyExtractor={(item, index) => index.toString()}
                data={loaclimages}
                numColumns={2}
                style={{ margin: 5, marginRight: 10, marginBottom: 80 }}
            />
            <View style={styles.centeredView}>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        Alert.alert("Modal has been closed.");
                    }}
                  
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                        <TextInput style={styles.input} placeholder='Write some content here' placeholderTextColor='red'
            onChangeText={(body) => setbody(body)} value={body} />
                        </View>
                        <TouchableHighlight
                                style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
                                onPress={() => {
                                    setModalVisible(!modalVisible);
                                }}
                            >
                                <Text style={styles.textStyle}>Hide Modal</Text>
                            </TouchableHighlight>
                    </View>
                </Modal>
                <TouchableHighlight
                    style={styles.openButton}
                    onPress={() => {
                        setModalVisible(true);
                    }}
                >
                    <Text style={styles.textStyle}>Show Modal</Text>
                </TouchableHighlight>
            </View>
        </View>
    )
}

export default Uploadpost
const styles = StyleSheet.create({
    screen: {
        backgroundColor: '#0b032b',
        height: screenHeight
    },
    logo: {
        width: 400,
        height: 300,
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
        borderColor: "#c5c5c5"
    },
    input: {
        width: 200,
        height: 51,
        paddingLeft: 5,
        alignSelf: "center"
    },
    fieldtitle: {
        color: 'white',
        borderBottomWidth: 2,
        borderBottomColor: 'red',
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
        backgroundColor:'#1e2a78'
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "green",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.5,
        shadowRadius: 3.84,
        elevation: 5,
        height:300,
        width:300,
        backgroundColor:'#1e2a78'
    },
    openButton: {
        backgroundColor: "#F194FF",
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    }
});

