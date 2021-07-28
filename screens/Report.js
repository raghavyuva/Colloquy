import { Button, Accordion, Textarea } from 'native-base';
import React, { useState, useEffect } from 'react';
import { View, Text, Image, Dimensions, TextInput, KeyboardAvoidingView, FlatList, ScrollView, Alert } from 'react-native';
import Headingbar from '../components/Header';
const { width, height } = Dimensions.get('window');
import { MaterialIcons } from '@expo/vector-icons';
import { DefaultTheme, DarkTheme, useTheme } from '@react-navigation/native';
import { Searchbar, List } from 'react-native-paper';
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as ImagePicker from 'expo-image-picker';
import { Config } from '../config'
import { firebase } from '../components/firebase'
import 'firebase/auth';
import 'firebase/firestore';
import { DataLayerValue } from '../Context/DataLayer';
import LoadingComp from '../components/LoadingComp';
require('firebase/storage');
var _ = require('lodash');
import { useSelector, useDispatch } from 'react-redux';

const Report = (props) => {
    const [Input, setInput] = useState('');

    const [attached, setattached] = useState(false);
    const { colors } = useTheme();
    const [status, setstatus] = useState(null);
    const [expanded, setExpanded] = React.useState(true);
    const [file, setfile] = useState(null);
    const [Data, setData] = useState(null);
    const [load, setload] = useState(true);
    const [filtered, setfiltered] = useState(null);
    const [submitting, setsubmitting] = useState(false);
    const [storagestatus, setstoragestatus] = useState(null);
    const handlePress = () => setExpanded(!expanded);
    const user = useSelector((state) => state.userDetails);

    const _pickImagefromGallery = async () => {
        const { status } = await MediaLibrary.getPermissionsAsync()
        console.log(status);
        if (status == 'granted') {
            setstoragestatus('granted')
            try {
                let result = await ImagePicker.launchImageLibraryAsync({
                    mediaTypes: ImagePicker.MediaTypeOptions.All,
                    allowsEditing: true,
                    quality: 1,
                    aspect: [4, 3],
                });
                if (!result.cancelled) {
                    setfile(result.uri);
                    setattached(true);
                }
            } catch (E) {
                alert(E);
            }
        } else {
            const { status } = await MediaLibrary.getPermissionsAsync()
            if (status == 'granted') {
                setstoragestatus('granted')
                try {
                    let result = await ImagePicker.launchImageLibraryAsync({
                        mediaTypes: ImagePicker.MediaTypeOptions.All,
                        allowsEditing: true,
                        quality: 1,
                        aspect: [4, 3],
                    });
                    if (!result.cancelled) {
                        setfile(result.uri);
                        setattached(true);
                    }
                } catch (E) {
                    alert(E);
                }
            } else {
                setstoragestatus('notgranted')
                alert(' storage permission error')

            }
        }
    }
    const uploadImage = async (messages) => {
        return new Promise(async (res, rej) => {
            setsubmitting(true);
            const response = await fetch(file);
            const blob = await response.blob();
            let upload = firebase.storage().ref(`images/${user.user.username}/${Date.now()}/reports`).put(blob)
            upload.on(
                "state_changed",
                snapshot => {
                    // setImagePicked(uri);
                },
                err => {
                    rej(err);
                },
                async () => {
                    const url = await upload.snapshot.ref.getDownloadURL();
                    res(url);
                    fetch(`${Config.url}` + `/report`, {
                        method: 'POST',
                        headers: {
                            'Authorization': 'Bearer ' + `${user.userToken}`,
                            'Content-Type': "application/json",
                        },
                        body: JSON.stringify({
                            description: `bug` + Input,
                            errscreenshot: url
                        })
                    }).then(res => res.json()).then((resp) => {
                        // console.log(resp); 
                        alert('submitted');
                        setInput('');
                        setattached(false);
                        setfile(null);
                    })
                    setsubmitting(false);
                })
        })

    }
    useEffect(() => {
        let IsMounted = true;
        setload(true);
        GetPermofStorage();
        Fetching()
        return () => {
            GetPermofStorage();
            Fetching()
            IsMounted = false;
        }
    }, [])

    const search = (searchText) => {
        let filteredData = Data.filter(function (item) {
            return item.Question.toLowerCase().includes(searchText.toLowerCase());
        });
        setfiltered(filteredData);
    };

    function Fetching() {
        setload(true);
        try {
            fetch(`${Config.url}` + `/faq`, {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + `${user.userToken}`,
                    'Content-Type': 'application/json',
                },
            })
                .then(response => response.json())
                .then(data => {
                    var shuffled = _.shuffle(data);
                    setData(shuffled);
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
        } catch (error) {
            alert(error)
        }
        setload(false);
    }
    const GetPermofStorage = async () => {
        setload(true);
        const { status } = await ImagePicker.getMediaLibraryPermissionsAsync()
        console.log(status);
        if (status == 'granted') {
            setstoragestatus('granted')
        } else {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            console.log(status)
            if (status == 'granted') {
                setstoragestatus('granted')
            } else {
                setstoragestatus('notgranted')
            }
        }
        setload(false);
    }
    const submitfile = () => {
        setsubmitting(true)
        try {
            if (!attached) {
                alert('please attach a file');
                setsubmitting(false);
            } else {
                uploadImage();
            }
        } catch (error) {
            alert(error);
            setsubmitting(false);
        }
    }
    if (submitting == true) {
        return (
            <LoadingComp />
        )
    }
    if (load == true) {
        <LoadingComp />
    }
    return (
        <View style={{ flex: 1, backgroundColor: colors.background }}>
            <Headingbar {...props} />
            <View style={{ margin: 15 }}>
                <Searchbar style={{ backgroundColor: colors.card, color: colors.text }} iconColor='grey' inputStyle={{ color: colors.text }}
                    placeholder="Describe Your Issue"
                    placeholderTextColor='grey'
                    // onIconPress={search}
                    onChangeText={search}
                />
            </View>
            <ScrollView keyboardShouldPersistTaps='always'>
                <List.Section title="FAQs" style={{ backgroundColor: colors.background }} titleStyle={{ color: colors.text }} >
                    <FlatList
                        renderItem={({ item }) => {
                            return (
                                <List.Accordion
                                    title={item.Question}
                                    left={props => <MaterialIcons name="article" size={24} color='grey' />}
                                    titleStyle={{ color: colors.text }}
                                    style={{ backgroundColor: colors.card }}
                                >
                                    <Text style={{ color: 'grey' }}>{item.Answer}</Text>
                                </List.Accordion>
                            );
                        }}
                        keyExtractor={(item, index) => index.toString()}
                        data={filtered && filtered.length > 0 ? filtered : Data}
                        scrollEnabled
                    />
                </List.Section>
            </ScrollView>
            <View style={{ backgroundColor: colors.card, height: '30%', borderTopColor: colors.border, justifyContent: "center" }}>
                <View>
                    {
                        attached == true ? (
                            <>
                                <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                                    <Text style={{ color: colors.text, textAlign: 'center', }}>File Attached</Text>
                                    <View style={{ flexDirection: 'row' }}>
                                        <MaterialIcons name="file-present" size={24} color={colors.primary} style={{ marginTop: 5 }} />
                                        <TouchableOpacity onPress={() => {
                                            setattached(false);
                                            setfile(null);
                                        }}>
                                            <MaterialIcons name="cancel" size={18} color={colors.primary} />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </>
                        ) : (
                            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                                <Text style={{ color: colors.text, textAlign: 'center', }}>Attach Bug File</Text>
                                <TouchableOpacity onPress={_pickImagefromGallery}>
                                    <MaterialIcons name="attach-file" size={24} color={colors.primary} />
                                </TouchableOpacity>
                            </View>
                        )
                    }
                    <Textarea
                        value={Input}
                        onChangeText={(e) => setInput(e)}
                        style={{ borderWidth: 1, borderColor: 'grey', margin: 15, color: colors.text, justifyContent: 'center', }}
                        placeholder='We would love to hear from you,paste crash log here'
                        placeholderTextColor='grey'
                    />
                    <Button
                        onPress={submitfile}
                        style={{ justifyContent: 'center', alignSelf: 'center', width: 200, backgroundColor: colors.background, borderColor: 'grey', borderWidth: 0.2 }}>
                        <Text style={{ color: colors.text }}>Submit Report</Text>
                    </Button>
                </View>
            </View>
        </View>
    );
}
export default Report;