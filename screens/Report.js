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
const Report = (props) => {
    const [Input, setInput] = useState('');
    const [{ userToken, user }, dispatch] = DataLayerValue();
    const [attached, setattached] = useState(false);
    const { colors } = useTheme();
    const [status, setstatus] = useState(null);
    const [expanded, setExpanded] = React.useState(true);
    const [file, setfile] = useState(null);
    const [Data, setData] = useState(null);
    const [filtered, setfiltered] = useState(null);
    const [submitting, setsubmitting] = useState(false);
    const handlePress = () => setExpanded(!expanded);
    const attachFile = () => {
        if (status === 'granted') {
            _pickImagefromGallery();
        } else {
            alert('we need camera permission to attach file')
        }
    }
    const _pickImagefromGallery = async () => {
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
            console.log(E);
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
                            'Authorization': 'Bearer ' + `${userToken}`,
                            'Content-Type': "application/json",
                        },
                        body: JSON.stringify({
                            description: `bug` + Input,
                            errscreenshot: url
                        })
                    }).then(res => res.json()).then((resp) => {
                        console.log(resp);
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
        getPermissionAsync();
        Fetching()
        return () => {
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
        try {
            fetch(`${Config.url}` + `/faq`, {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + `${userToken}`,
                    'Content-Type': 'application/json',
                },
            })
                .then(response => response.json())
                .then(data => {
                    setData(data);
                    console.log(Data)
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
        } catch (error) {
            alert(error)
        }
    }
    const getPermissionAsync = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            alert('Sorry, we need camera roll permissions to make this work!');
            setstatus('notgranted')
        } else {
            setstatus('granted');

        }
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
                <List.Section title="Articles" style={{ backgroundColor: colors.background }} titleStyle={{ color: colors.text }} >
                    <FlatList
                        renderItem={({ item }) => {
                            return (
                                <List.Accordion
                                    title={item.Question}
                                    left={props => <MaterialIcons name="article" size={24} color='grey' />}
                                    titleStyle={{ color: colors.text }}
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
                                <TouchableOpacity onPress={attachFile}>
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
const menu = [
    {
        title: 'How to Send Messages in Vtyuva?',
        data: 'Biryani also known as biriyani, biriani, birani or briyani, is a mixed rice dish with its origins among the Muslims of the Indian subcontinent. This dish is especially popular throughout the Indian subcontinent, as well as among the diaspora from the region. It is also prepared in other regions such as Iraqi Kurdistan.',
    },
    {
        title: 'Is My data protected in Vtyuva?',
        data: 'Pizza is a savory dish of Italian origin, consisting of a usually round, flattened base of leavened wheat-based dough topped with tomatoes, cheese, and various other ingredients (anchovies, olives, meat, etc.) baked at a high temperature, traditionally in a wood-fired oven. In formal settings, like a restaurant, pizza is eaten with knife and fork, but in casual settings it is cut into wedges to be eaten while held in the hand. Small pizzas are sometimes called pizzettas.'
    },
    {
        title: 'Are The chats E2E encrypted? ',
        data: 'A drink (or beverage) is a liquid intended for human consumption. In addition to their basic function of satisfying thirst, drinks play important roles in human culture. Common types of drinks include plain drinking water, milk, coffee, tea, hot chocolate, juice and soft drinks. In addition, alcoholic drinks such as wine, beer, and liquor, which contain the drug ethanol, have been part of human culture for more than 8,000 years.'
    },
    {
        title: 'How can i change the password?',
        data: 'you can go to your profile and click pencil icon,once clicked the modal will be popped and you can see reset password via email option,click that to get an email,then verify your present password and submit new password to get it changed,thats all you should do.'
    },
]
