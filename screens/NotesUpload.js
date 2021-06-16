import { StyleSheet, Text, TouchableOpacity, View, Image, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import * as DocumentPicker from 'expo-document-picker';
import { useTheme } from '@react-navigation/native';
import { Button, Card } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';
import Headingbar from '../components/Header';
const { width, height } = Dimensions.get('window');
import "firebase/auth";
import "firebase/firestore";
import 'firebase/storage';

const NotesUpload = (props) => {
    const { colors } = useTheme();
    const [document, setdocument] = useState('');
    const [docname, setdocname] = useState(null);
    const [first, setfirst] = useState(null)
    const PickDocument = async () => {
        const response = await DocumentPicker.getDocumentAsync({})
        if (response.type === 'success') {
            setdocname(response.name);
            setfirst(response.uri);
        }
    }
    const uriToBlob = () => {

    }

    const UploadNotes = async () => {
      
    }
 
    return (
        <View style={{ flex: 1, }}>
            <Headingbar {...props} />
            <Text style={{ color: colors.text, textTransform: 'capitalize', fontWeight: 'bold', fontSize: 24, fontStyle: 'italic' }}>Do You Have Notes Related to  syallabus?</Text>
            <Image source={{ uri: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fupload.wikimedia.org%2Fwikipedia%2Fcommons%2Fthumb%2F4%2F4f%2FDocument-open.svg%2F768px-Document-open.svg.png&f=1&nofb=1' }} style={{ width: width / 1, height: height / 2, alignSelf: 'center', backgroundColor: colors.background }} />
            <View style={{}}>
                <Text style={{ color: 'grey', textTransform: 'capitalize', fontWeight: 'bold', fontSize: 18, textAlign: "center" }}>Upload Notes and share some knowledge with your friends</Text>
            </View>
            {first != null ? (
                <View style={{ justifyContent: 'center', }}>
                    <Card style={{ backgroundColor: colors.card, justifyContent: 'center', height: 100, }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'center', }}>
                            <Text style={{ color: colors.text, textAlign: 'center', margin: 10 }}>File Attached</Text>
                            <MaterialIcons name="file-present" size={24} color={colors.primary} style={{ marginTop: 5 }} />
                            <TouchableOpacity onPress={() => { setfirst(null) }} style={{}}>
                                <MaterialIcons name="cancel" size={18} color={colors.primary} />
                            </TouchableOpacity>
                        </View>
                        <Text style={{ color: colors.text, textAlign: 'center', }} numberOfLines={2}>{docname}</Text>
                    </Card>
                    <Button style={{ width: 200, backgroundColor: colors.card, justifyContent: 'center', alignSelf: 'center', marginTop: 20 }}
                        onPress={UploadNotes}
                    >
                        <Text style={{ color: colors.text }}>
                            upload Now
                        </Text>
                    </Button>
                  
                </View>
            ) : (
                <View style={{ justifyContent: 'center' }}>
                    <Card style={{ backgroundColor: colors.card, justifyContent: 'center', height: 100, }}>
                        <View style={{ flexDirection: "row", justifyContent: 'center' }}>
                            <Text style={{ color: colors.text, textAlign: 'center', marginRight: 5 }}>Attach Notes</Text>
                            <TouchableOpacity onPress={PickDocument}>
                                <MaterialIcons name="attachment" size={24} color={colors.primary} style={{ alignSelf: 'center' }} />
                            </TouchableOpacity>
                        </View>
                    </Card>

                </View>
            )}
        </View>
    )
}
export default NotesUpload;


const styles = StyleSheet.create({})
