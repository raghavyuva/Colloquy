import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, FlatList, Dimensions, SafeAreaView, Text } from 'react-native';
import { Card, Input, Fab, CardItem } from 'native-base';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import { Config } from '../config';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { DataLayerValue } from '../Context/DataLayer';
const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
import * as MediaLibrary from 'expo-media-library';
import Header from '../components/Header';
import Base64 from 'Base64';
import { DefaultTheme, DarkTheme, useTheme } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import MultiSelect from 'react-native-multiple-select';

const Uploadpost = (props) => {
    const [image, setimage] = useState('');
    const [body, setbody] = useState('');
    const [postimage, setpostimage] = useState('https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%3Fid%3DOIP.rZ6B0kNwWbL9IIbN90iAvgHaEK%26pid%3DApi&f=1')
    const [{ userToken, EventData }, dispatch] = DataLayerValue()
    const [activepermission, setactivepermission] = useState(false);
    const [loaclimages, setloaclimages] = useState('');
    const [active, setactive] = useState(false)
    const [selectedItems, setselectedItems] = useState([]);
    const { colors } = useTheme();
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
    const onSelectedItemsChange = selectedItems => {
        setselectedItems(selectedItems)
    };
    useEffect(() => {
        getPermissionAsync();
        return () => {
        }
    }, [])
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Header {...props} />
            <ScrollView keyboardShouldPersistTaps>

                <Card style={{ backgroundColor: colors.card, padding: 0, margin: 5, height: screenHeight / 5, borderColor: colors.border }}>
                    <Input style={{ color: colors.text }} placeholder="Type Description" />
                </Card>
                <Card style={{ backgroundColor: colors.card, padding: 0, margin: 5, height: screenHeight / 4, borderColor: colors.border }}>
                    <FlatList
                        ref={(ref) => { flatListRef = ref; }}
                        renderItem={({ item }) => {
                            return (
                                <TouchableOpacity>
                                    <Card style={{ backgroundColor: colors.card, padding: 0, borderColor: colors.border }}>
                                        <Image style={{ width: 200, height: screenHeight / 4, }} source={{ uri: item.uri }} />
                                    </Card>
                                </TouchableOpacity>
                            );
                        }}
                        keyExtractor={(item, index) => index.toString()}
                        data={loaclimages}
                        horizontal
                    />
                </Card>

                <Card style={{ backgroundColor: colors.card, padding: 0, margin: 5, borderColor: colors.border }}>
                    <TouchableOpacity>
                        <CardItem style={{ backgroundColor: colors.background, justifyContent: 'space-between' }}>
                            <Text style={{ color: colors.text, fontSize: 18, fontWeight: 'bold', }}>
                                Location  .
                </Text>
                            <MaterialIcons name="add-location" size={24} color={colors.primary} />
                        </CardItem>
                    </TouchableOpacity>
                </Card>

                <Card style={{ backgroundColor: colors.card, padding: 0, margin: 5, borderColor: colors.border }}>
                    <TouchableOpacity>
                        <CardItem style={{ backgroundColor: colors.background, justifyContent: 'space-between' }}>
                            <Text style={{ color: colors.text, fontSize: 18, fontWeight: 'bold', }}>
                                Category   .
                </Text>
                            <MaterialIcons name="category" size={24} color={colors.primary} />
                        </CardItem>
                    </TouchableOpacity>
                </Card>
                <Card style={{ backgroundColor: colors.card, padding: 0, }} keyboardShouldPersistTaps>
                    <MultiSelect
                        items={items}
                        uniqueKey="id"
                        onSelectedItemsChange={onSelectedItemsChange}
                        selectedItems={selectedItems}
                        selectText="Select Tags"
                        tagRemoveIconColor="#CCC"
                        tagBorderColor={colors.primary}
                        tagTextColor={colors.text}
                        selectedItemTextColor="#CCC"
                        selectedItemIconColor="#CCC"
                        itemTextColor="#000"
                        displayKey="name"
                        style={{backgroundColor:"#000", }}
                        hideSubmitButton
                        hideDropdown
                        searchIcon={false}
                        styleSelectorContainer={{ backgroundColor: colors.background}}
                        onAddItem={()=>{}}
                        keyboardShouldPersistTaps
                    />
                </Card>
            </ScrollView>
            <Fab
                active={active}
                direction="up"
                style={{ backgroundColor: colors.primary, }}
                position='bottomRight'
            >
                <MaterialIcons name="done" size={24} color={colors.primary} />
            </Fab>
        </SafeAreaView>
    )
}

export default Uploadpost;
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

const items = [{
    id: '92iijs7yta',
    name: 'Love'
}, {
    id: 'a0s0a8ssbsd',
    name: 'Education'
}, {
    id: '16hbajsabsd',
    name: 'College'
}, {
    id: 'nahs75a5sg',
    name: 'Friends'
}, {
    id: '667atsas',
    name: 'Vtu'
}, {
    id: 'hsyasajs',
    name: 'Exam'
}, {
    id: 'djsjudksjd',
    name: 'Results'
}, {
    id: 'sdhyaysdj',
    name: 'Events'
}, {
    id: 'suudydjsjd',
    name: 'Engineering life'
}
];