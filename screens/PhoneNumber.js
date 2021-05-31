import React, { useState, useRef } from 'react';
import { TextInput, TouchableOpacity, StyleSheet, View, Dimensions } from 'react-native';
import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha';
import firebase from '../components/firebase';
import { Config } from '../config';
import { DataLayerValue } from '../Context/DataLayer';
import * as SecureStore from 'expo-secure-store';
import { useTheme } from '@react-navigation/native';
import { Item, Input, Label, Icon } from 'native-base';
const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
import { LinearGradient } from 'expo-linear-gradient';
import { Button, Text } from "native-base";

const PhoneNumber = (props) => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [code, setCode] = useState('');
    const [{ userToken }, dispatch] = DataLayerValue()

    const [verificationId, setVerificationId] = useState(null);
    const { colors } = useTheme();
    const recaptchaVerifier = useRef(null);

    const sendVerification = () => {
        const phoneProvider = new firebase.auth.PhoneAuthProvider();
        phoneProvider
            .verifyPhoneNumber(phoneNumber, recaptchaVerifier.current)
            .then(setVerificationId);
    };
    const confirmCode = () => {
        console.log(props)
        try {
            const credential = firebase.auth.PhoneAuthProvider.credential(
                verificationId,
                code
            );
            firebase
                .auth()
                .signInWithCredential(credential)
                .then((result) => {
                    fetch(`${Config.url}` + `/updateuser/${props.route.params.id}`, {
                        method: "PUT",
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            number: phoneNumber,
                        })
                    })
                        .then((response) => response.json())
                        .then((responseData) => {
                            console.log(responseData);
                            dispatch({
                                type: 'REGISTER',
                                token: props.route.params.token,
                                id: props.route.params.id
                            })
                            SecureStore.setItemAsync('userToken', props.route.params.token);
                            SecureStore.setItemAsync('UserId', props.route.params.id)
                        })
                        .done();

                    console.log(result);
                });
        } catch (error) {
            alert(error)
        }
    };
    return (
        <View style={{ backgroundColor: colors.background, flex: 1, justifyContent: "center" }}>
            <View style={styles(colors).contain}>
                <TouchableOpacity style={styles(colors).opacity}>
                    <Text style={styles(colors).num}>+91</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles(colors).opacity}>
                </TouchableOpacity>
                <TextInput style={styles(colors).input} placeholder='Phone Number'
                    onChangeText={setPhoneNumber}
                    keyboardType="phone-pad"
                    autoCompleteType="tel"
                    placeholderTextColor='white'
                    autoFocus
                />
            </View>
            <View style={{ height: '20%' }}>
                <TouchableOpacity
                    style={{ width: "100%", paddingRight: "10%", }} onPress={sendVerification} >
                    <LinearGradient
                        colors={[colors.card, colors.primary]}
                        style={styles(colors).btn1}
                        start={[0, 0]}
                        end={[1, 1]}
                    >
                        <Text
                            style={styles(colors).btntxt}>
                            Send OTP
                    </Text>
                    </LinearGradient>
                </TouchableOpacity>
            </View>
            <View style={styles(colors).contain}>
                <TextInput style={styles(colors).input} placeholder='Enter OTP'
                    onChangeText={setCode}
                    keyboardType="phone-pad"
                    placeholderTextColor='white'
                    autoCompleteType='off'
                    autoFocus
                />
            </View>
            <View style={{ height: '20%' }}>
                <TouchableOpacity
                    style={{ width: "100%", paddingRight: "10%", }} onPress={confirmCode} >
                    <LinearGradient
                        colors={[colors.card, colors.primary]}
                        style={styles(colors).btn1}
                        start={[0, 0]}
                        end={[1, 1]}
                    >
                        <Text
                            style={styles(colors).btntxt}>
                           Verify OTP
                    </Text>
                    </LinearGradient>
                </TouchableOpacity>
            </View>
            <FirebaseRecaptchaVerifierModal
                ref={recaptchaVerifier}
                firebaseConfig={firebase.app().options}
            />
        </View>
    )
}

export default PhoneNumber

const styles = (colors) => StyleSheet.create({
    screen: {
        backgroundColor: colors.background,
        flex: 1,
    },
    btn1: {
        width: "100%",
        padding: 15,
        borderRadius: 5,
        marginLeft: 20,
    },
    btntxt: {
        backgroundColor: 'transparent',
        fontSize: 15,
        color: colors.text,
        textAlign: 'center',
        fontFamily: 'Montserrat'
    },
    txtinput: {
        color: colors.text,
        alignSelf: 'flex-start'
    },
    txtitm: {
        width: '90%',
        alignSelf: 'center',
        borderBottomColor: colors.border
    },
    header: {
        fontFamily: 'Montserrat',
        fontSize: 40,
        color: colors.text
    },
    txtnav: {
        textAlign: 'center',
        color: colors.text
    },
    picker1: {
        height: "40%",
        margin: 0,
        flexDirection: 'row'
    },
    picker2: {
        flexDirection: 'row',
        height: "10%",
        margin: 0,
    },
    picker: {
        width: "50%",
        color: colors.text
    },
    phone: {
        width: '94%',
        alignSelf: 'center',
        borderBottomColor: colors.border
    },
    input: {
        width: 200,
        height: 31,
        paddingLeft: 15,
        alignSelf: "center",
        marginLeft: 15,
        borderLeftWidth: 1,
        color: colors.text
    },
    num: {
        fontSize: 20,
        color: colors.text,
        marginLeft: 10,
        fontWeight: 'bold',

    },
    opacity: {
        alignSelf: "center"
    },
    contain: {
        flexDirection: "row",
        width: screenWidth - 100,
        height: 60,
        alignSelf: "center",
        marginBottom: 25,
        borderWidth: 0.4,
        borderColor: colors.text,
        borderRadius: 2,
        
    },
})
