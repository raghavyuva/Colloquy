import { StyleSheet, Text, TouchableOpacity, View, Image, Dimensions, ScrollView, KeyboardAvoidingView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useTheme } from '@react-navigation/native';
import { Button, Card, Item, Label, Input } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';
import Headingbar from '../components/Header';
const { width, height } = Dimensions.get('window');
import "firebase/auth";
import "firebase/firestore";
import 'firebase/storage';
import DocumentPicker from 'react-native-document-picker';
import RNFetchBlob from 'rn-fetch-blob'
import { Config } from '../config';
import UploadingComp from '../components/UploadingComp';
import { useSelector, useDispatch } from 'react-redux';

const NotesUpload = (props) => {
    const user = useSelector((state) => state.userDetails);

    const { colors } = useTheme();
    const [document, setdocument] = useState('');
    const [docname, setdocname] = useState(null);
    const [first, setfirst] = useState(null)
    const [title, settitle] = useState('');
    const [year, setyear] = useState('');
    const [branch, setbranch] = useState('');
    const [uploading, setuploading] = useState(null);
    const PickDocument = async () => {
        const res = await DocumentPicker.pick({
            type: [DocumentPicker.types.allFiles],
        });
        RNFetchBlob.fs
            .readFile(res.uri, 'base64')
            .then((data) => {
                setfirst(data)
                setdocument(res.type)
                setdocname(res.name)
            })
            .catch((err) => {
                alert(err)
            });
    }
    const UploadNotes = async () => {
        setuploading(true);
        let base64Aud = `data:${document};base64,${first}`;
        let fd = new FormData();
        fd.append("file", `${base64Aud}`);
        fd.append("upload_preset", 'raghav');
        fd.append("resource_type", "video")
        fetch('https://api.cloudinary.com/v1_1/raghavyuva/upload', {
            method: 'POST',
            body: fd,
        })
            .then(async (response) => {
                let recordingURL = await response.json();
                fetch(`${Config.url}/upload_notes`, {
                    method: 'POST',
                    headers: {
                        'Authorization': 'Bearer ' + `${user.userToken}`,
                        'Content-Type': "application/json",
                    },
                    body: JSON.stringify({
                        notesurl: recordingURL.secure_url,
                        type: document,
                        title: title,
                        branch: branch,
                        year: year
                    })
                }).then(res => res.json()).then((resp) => {
                    setuploading(false);
                    console.log(resp);
                })
            })
            .catch(err => alert('cloudinary err', err))
        setuploading(false)
    }
    if (uploading) {
        return (
            <View style={{ flex: 1, backgroundColor: colors.background }}>
                <Headingbar {...props} />
                <UploadingComp />
            </View>
        )
    }
    return (
        <View style={styles(colors).Main}>
            <Headingbar {...props} />
            <View style={styles(colors).scond}>
                <View style={styles(colors).part}>
                    <Image source={{ uri: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fdataqualitycampaign.org%2Fwp-content%2Fuploads%2F2016%2F03%2Fwhy-education-data-illustration-3.png&f=1&nofb=1" }}
                        style={{ height: "100%", width: 400, }} />
                </View>
            </View>
            <KeyboardAvoidingView style={styles(colors).bottompart}>
                <Text style={styles(colors).header}>
                    Upload Notes
                 </Text>
                <ScrollView style={{ height: '100%', marginTop: 20 }}>
                    <View>
                        <Item stackedLabel style={styles(colors).txtitm} >
                            <Label style={styles(colors).txtinput}>Title for Notes</Label>
                            <Input
                                onChangeText={(e) => settitle(e)}
                                value={title}
                            />
                        </Item>
                    </View>
                    <View>
                        <Item stackedLabel style={styles(colors).txtitm} >
                            <Label style={styles(colors).txtinput}>Notes for Branch</Label>
                            <Input
                                onChangeText={(e) => setbranch(e)}
                                value={branch}
                            />
                        </Item>
                    </View>
                    <View>
                        <Item stackedLabel style={styles(colors).txtitm} >
                            <Label style={styles(colors).txtinput}>Notes for Semester</Label>
                            <Input
                                onChangeText={(e) => setyear(e)}
                                keyboardType='number-pad'
                                value={year}
                            />
                        </Item>
                    </View>
                </ScrollView>
                {first != null ? (
                    <View style={{ justifyContent: 'center', }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'center', }}>
                            <Text style={{ color: colors.text, textAlign: 'center', margin: 10 }}>File Attached</Text>
                            <MaterialIcons name="file-present" size={24} color={colors.primary} style={{ marginTop: 5 }} />
                            <TouchableOpacity onPress={() => { setfirst(null) }} style={{}}>
                                <MaterialIcons name="cancel" size={18} color={colors.primary} />
                            </TouchableOpacity>
                        </View>
                        <Text style={{ color: colors.text, textAlign: 'center', }} numberOfLines={2}>{docname}</Text>
                    </View>
                ) : (
                    <View style={{ justifyContent: 'center' }}>
                        <View style={{ flexDirection: "row", justifyContent: 'center' }}>
                            <Text style={{ color: colors.text, textAlign: 'center', marginRight: 5 }}>Attach Notes</Text>
                            <TouchableOpacity onPress={PickDocument}>
                                <MaterialIcons name="attachment" size={24} color={colors.primary} style={{ alignSelf: 'center' }} />
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            </KeyboardAvoidingView>

            <Button style={styles(colors).btn} onPress={UploadNotes}>
                <Text style={{ color: 'white' }}>Submit</Text>
            </Button>
        </View>
    )
}
export default NotesUpload;


const styles = (colors) => StyleSheet.create({
    Main: {
        flex: 1,
    },
    scond: {
        backgroundColor: colors.background,
        flex: 0.5

    },
    header: {
        fontSize: 35,
        color: colors.text,
        textAlign: 'center',
    },
    part: {
        justifyContent: 'center',
        padding: 10,
        alignSelf: 'center'
    },
    bottompart: {
        borderWidth: 1,
        margin: 10,
        borderColor: 'grey',
        flex: 0.49,
        justifyContent: 'center',
        padding: 5
    },
    txtinput: {
        color: colors.text,

    },
    txtitm: {
        width: '90%',
        alignSelf: 'center',
        borderBottomColor: 'grey'
    },
    send: {
        justifyContent: "center",
        alignSelf: 'center'
    },
    btn: {
        width: 200,
        justifyContent: 'center',
        marginTop: 20,
        backgroundColor: colors.primary,
        alignSelf: 'center',
        borderRadius: 26
    },
})
