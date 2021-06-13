import React from 'react'
import { Text, StyleSheet, View, Image, Dimensions, ImageBackground, TouchableOpacity, Alert, ToastAndroid } from 'react-native'
import Header from '../components/Header';
const { width, height } = Dimensions.get('window');
import { Button } from 'native-base';
import { DefaultTheme, DarkTheme, useTheme } from '@react-navigation/native';
import * as MediaLibrary from 'expo-media-library';
import * as FileSystem from 'expo-file-system';
const Eventcard = (props) => {
    const { colors } = useTheme();
    const downloadFile = (item) => {
        Alert.alert(
            'Download Post',
            'Do you want to download this Event Poster?,',
            [
                { text: 'Cancel' },
                {
                    text: 'YES', onPress: () => {
                        const uri = item.photo;
                        var randomstring = Math.random().toString(36).slice(-9);
                        let fileUri = FileSystem.documentDirectory + `${item.Title + randomstring}.jpg`;
                        FileSystem.downloadAsync(uri, fileUri)
                            .then(({ uri }) => {
                                saveFile(uri);
                                ToastAndroid.show("Event Poster Downloaded !", ToastAndroid.LONG);
                            })
                            .catch(error => {
                                console.error(error);
                            })
                    }
                }
            ]
        );
    }
    const saveFile = async (fileUri) => {
        const { status } = await MediaLibrary.requestPermissionsAsync();
        if (status === "granted") {
            const asset = await MediaLibrary.createAssetAsync(fileUri)
            await MediaLibrary.createAlbumAsync("Primish", asset, false)

        } else {
            alert('provide permission');
        }
    }
    return (
        <View style={{ width: width - 10, backgroundColor: colors.card, flexDirection: 'row', marginBottom: 8, borderWidth: 2, borderColor: colors.border, flex: 1, height: 150 }}>
            <TouchableOpacity onPress={() => downloadFile(props.item)}>
                <Image
                    source={{ uri: props.item.photo }}
                    style={{ width: 120, height: 120, }}

                />
            </TouchableOpacity>
            <View>
                <Text style={{ fontSize: 20, fontWeight: 'bold', color: colors.text, marginLeft: 10, width: width - 150 }} >{props.item.Title}</Text>
                <Text style={{ fontSize: 14, fontWeight: '400', color: colors.text, marginLeft: 10, marginTop: 10, opacity: 0.7, width: 200 }} numberOfLines={5}>{props.item.caption}</Text>
            </View>
            <View style={{ justifyContent: 'flex-end', position: 'absolute', alignSelf: 'flex-end', marginLeft: width - 120, marginBottom: 2 }}>
                <Button style={{ width: 100, backgroundColor: colors.primary, justifyContent: 'center', }} >
                    <Text style={{ textAlign: 'center', color: colors.text, fontWeight: 'bold' }}>Join</Text>
                </Button>
            </View>
        </View>
    )
}

export default Eventcard
const styles = StyleSheet.create({
    top: {
        height: '30%',
        marginBottom: 10
    }
})