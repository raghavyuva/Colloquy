import React, { useState } from 'react'
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Dimensions, TextInput } from 'react-native'
import { DefaultTheme, DarkTheme, useTheme } from '@react-navigation/native';
import Headingbar from '../components/Header';
import DatePicker from 'react-native-datepicker';
const { width, height } = Dimensions.get('window');
import { Button, Textarea, } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';
import { Config } from '../config';
import { DataLayerValue } from '../Context/DataLayer';

const SlotSelection = (props) => {
    const { colors } = useTheme();
    const [date, setDate] = useState('09-10-2020');
    const [Input, setInput] = useState(null);
    const [uploading, setuploading] = useState(false);
    const [slotavailable, setslotavailable] = useState(null);
    const [attachment, setattachment] = useState(false)
    const [{ userToken, user }, dispatch] = DataLayerValue();
    console.log(props.route.params.thread);
    const VerifyTheSlot = (ele) => {
        fetch(`${Config.url}` + `/Interview`, {
            headers: {
                'Authorization': 'Bearer ' + `${userToken}`,
            },
            method: 'GET'
        })
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson)
            })
    }
    const _upload = async () => {
        if (!attachment) {
            alert('no photo selected to post');
        }
        else {
            setuploading(true);
            uploadPhotoAsync()
        }
    }
    const uploadPhotoAsync = async () => {
        try {
            return new Promise(async (res, rej) => {
                const response = await fetch(attachment);
                const file = await response.blob();
                let upload = firebase.storage().ref(`images/${user.user.username}/${Date.now()}/interview`).put(file)
                upload.on(
                    "state_changed",
                    snapshot => { },
                    err => {
                        rej(err);
                    },
                    async () => {
                        const url = await upload.snapshot.ref.getDownloadURL();
                        res(url);
                        console.log(url)
                        mongoupload(url);
                    }
                );
            });
        } catch (error) {
            alert(error);
            setuploading(false);
        }
    };
    const _pickImagefromGallery = async () => {
        try {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true,
                quality: 1,
                aspect: [4, 3],
            });
            if (!result.cancelled) {
                setattachment(result.uri)
            }
        } catch (E) {
            console.log(E);
        }
    }
    const mongoupload = (url) => {
        try {
            fetch(`${Config.url}` + `/post`, {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + `${userToken}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    InterviewDate: date,
                    InterviewTime: ele,
                    Branch: props.route.params.thread,
                    paymentrefid: Input,
                    paymentattachment: attachment
                })
            }).then(res => res.json()).then((resp) => {
                setuploading(false);
            })
        } catch (error) {
            alert(error);
            setuploading(false);
        }
    }

    return (
        <View style={{ flex: 1, backgroundColor: colors.background }}>
            <Headingbar {...props} />
            <Text style={{ color: colors.text, fontSize: 24, fontWeight: 'bold', marginLeft: 10 }}>
                Select a Slot
            </Text>
            <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 30 }}>
                <Text style={{ color: colors.text, }}>Pick a Date for Interview</Text>
                <DatePicker
                    style={styles(colors).datePickerStyle}
                    date={date} //initial date from state
                    mode="date" //The enum of date, datetime and time
                    placeholder="select date"
                    format="DD-MM-YYYY"
                    minDate='01-01-2021'
                    maxDate="01-01-2022"
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    customStyles={{
                        dateIcon: {
                            //display: 'none',
                            position: 'absolute',
                            left: 0,
                            top: 4,
                            marginLeft: 0,
                        },
                        dateInput: {
                            marginLeft: 36,
                            color: colors.text
                        },
                        placeholderText: {
                            color: colors.text
                        },
                        dateText: {
                            color: colors.text
                        }
                    }}
                    onDateChange={(date) => {
                        setDate(date);
                    }}
                />
            </View>
            <View style={{ marginTop: 20 }}>
                <Text style={{ color: colors.text, marginLeft: 15 }}>Select a Time</Text>
                <FlatList
                    ref={(ref) => { flatListRef = ref; }}
                    renderItem={({ item }) => {
                        let ele = item
                        return (
                            <TouchableOpacity style={{
                                width: width / 2, height: 100, backgroundColor: colors.background, flexDirection: 'row',
                                marginLeft: 0, marginBottom: 8, borderWidth: 2, borderColor: colors.border, justifyContent: 'center',
                                borderRadius: 10, marginRight: 0
                            }}
                            // onPress={() => {
                            //     props.navigation.navigate('external', { screen: 'slot', params: { thread: ele.course } })
                            // }}
                            >
                                <View style={{ justifyContent: 'center', alignSelf: 'center' }}>
                                    <Text style={{ fontSize: 20, fontWeight: 'bold', color: colors.text, textAlign: "center" }} >{ele.time} </Text>
                                </View>
                            </TouchableOpacity>
                        );
                    }}
                    keyExtractor={(item, index) => index.toString()}
                    data={Data}
                    style={{ margin: 2 }}
                    numColumns={2}
                />
                <Button style={{ borderWidth: 0.5, borderColor: 'grey', width: 200, backgroundColor: colors.card, justifyContent: "center", alignSelf: 'center' }} onPress={VerifyTheSlot}>
                    <Text style={{ color: colors.text, textAlign: "center" }}>Verify Slot Availability</Text>
                </Button>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                <Text style={{ color: colors.text, textAlign: 'center', }}>Attach Bug File</Text>
                <TouchableOpacity onPress={_pickImagefromGallery}>
                    <MaterialIcons name="attach-file" size={24} color={colors.primary} />
                </TouchableOpacity>
            </View>
            <View >
                <Text style={{ fontSize: 18, color: colors.primary, textAlign: "center", marginBottom: 10, marginTop: 20 }}>Pay INR 300 to upi id: raghav@kotak</Text>
                <TextInput
                    value={Input}
                    onChangeText={(e) => setInput(e)}
                    style={{ borderWidth: 1, borderColor: 'grey', color: colors.text, marginLeft: 15, padding: 10, marginTop: 25, marginRight: 15 }}
                    placeholder='Payment Ref Id'
                    placeholderTextColor='grey'
                />
                <Button
                    onPress={_upload}
                    style={{ justifyContent: 'center', alignSelf: 'center', width: 200, backgroundColor: colors.card, borderColor: 'grey', borderWidth: 0.2, marginTop: 15 }}>
                    <Text style={{ color: colors.text }}>Apply For Interview</Text>
                </Button>
            </View>
        </View>
    )
}

export default SlotSelection

const styles = (colors) => StyleSheet.create({
    datePickerStyle: {
        width: 200,
        marginTop: 0,
        color: colors.text,
        marginBottom: 10
    },
})
const Data = [{
    "time": "10.00",
    "id": "1"
},
{
    "time": "12.00",
    "id": "2"
}, {
    "time": "16.00",
    "id": "3"
}, {
    "time": "18.00",
    "id": "4"
}, {
    "time": "20.00",
    "id": "5"
}, {
    "time": "22.00",
    "id": "6"
}]