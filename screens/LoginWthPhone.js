import React, { useState, useEffect, useRef } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, Dimensions } from 'react-native'
import { CodeField, Cursor, useBlurOnFulfill, useClearByFocusCell, } from 'react-native-confirmation-code-field';
import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha';
import { useTheme } from '@react-navigation/native';
import { Item, Input, Label, Icon } from 'native-base';
import WaveComp from '../components/WaveComp';
import firebase from 'firebase';
import { Config } from '../config';
const { width: screenWidth, } = Dimensions.get('window');
import { LinearGradient } from 'expo-linear-gradient';

const LoginWthPhone = ({ navigation }) => {
    const recaptchaVerifier = useRef(null);
    const CELL_COUNT = 6;
    const [verificationId, setVerificationId] = useState(null);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [code, setCode] = useState('');
    const { colors } = useTheme();
    const [otpactive, setotpactive] = useState(false);
    const [loggingin, setloggingin] = useState(false);
    const refs = useBlurOnFulfill({ code, cellCount: CELL_COUNT });
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({
        code,
        setCode
    });
    const sendVerification = () => {
        const phoneProvider = new firebase.auth.PhoneAuthProvider();
        phoneProvider.verifyPhoneNumber("+91" + phoneNumber, recaptchaVerifier.current).then(setVerificationId).then(() => {
            alert('OTP has been sent to your phone number');
            setotpactive(true);
        });
    };
    const confirmCode = () => {
        setloggingin(true);

        try {
            const credential = firebase.auth.PhoneAuthProvider.credential(
                verificationId,
                code
            );
            firebase
                .auth()
                .signInWithCredential(credential)
                .then((result) => {
                    fetch(`${Config.url}` + `/login`, {
                        method: "POST",
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            email: email,
                            password: password
                        })
                    })
                        .then((response) => response.json())
                        .then((responseData) => {
                            if (responseData.message == 'Auth successfull') {
                                dispatch({
                                    type: 'LOGIN',
                                    token: responseData.token,
                                    id: responseData.user._id
                                })
                                SecureStore.setItemAsync('userToken', responseData.token);
                                SecureStore.setItemAsync('UserId', responseData.user._id)
                                setEmail(null);
                                setPassword(null);
                                setloggingin(false)
                            }
                        })
                });
            setloggingin(false)
        } catch (error) {
            alert(error)
            setloggingin(false);
        }
        setotpactive(false);
    };
    return (
        <View style={styles(colors).screen}>
            <WaveComp />
            <FirebaseRecaptchaVerifierModal
                ref={recaptchaVerifier}
                firebaseConfig={firebase.app().options}
                style={{ flex: 1, backgroundColor: colors.background }}

            />
            {
                otpactive ? (
                    <>
                        <SafeAreaView style={styles(colors).root}>
                            <Text style={styles(colors).title}>Enter Otp to Validate</Text>
                            <CodeField
                                ref={refs}
                                {...props}
                                value={code}
                                onChangeText={setCode}
                                cellCount={CELL_COUNT}
                                rootStyle={styles(colors).codeFieldRoot}
                                keyboardType="number-pad"
                                textContentType="oneTimeCode"
                                textInputStyle={{ color: colors.text }}
                                renderCell={({ index, symbol, isFocused }) => (
                                    <Text
                                        key={index}
                                        style={[styles(colors).cell, isFocused && styles(colors).focusCell]}
                                        onLayout={getCellOnLayoutHandler(index)}>
                                        {symbol || (isFocused ? <Cursor /> : null)}
                                    </Text>
                                )}
                            />
                            <View style={{ height: '20%', marginTop: 30 }}>
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
                        </SafeAreaView>

                    </>
                ) : (
                    <>
                        <View style={{ height: "60%" }}>
                            <Item style={styles(colors).phone}>
                                <Text style={{ color: colors.text }}>+91</Text>
                                <Input placeholder='Phone Number'
                                    onChangeText={setPhoneNumber}
                                    keyboardType="phone-pad"
                                    autoCompleteType="tel"
                                    placeholderTextColor='grey'
                                    autoFocus
                                    style={{ color: colors.text }}
                                />
                            </Item>
                            <View style={{ height: '25%', }}>
                                <TouchableOpacity
                                    style={{ width: "100%", paddingRight: "10%", }}
                                    onPress={sendVerification}
                                >
                                    <LinearGradient
                                        colors={[colors.card, colors.primary]}
                                        style={styles(colors).btn1}
                                        start={[0, 0]}
                                        end={[1, 1]}
                                    >
                                        <Text
                                            style={styles(colors).btntxt}>
                                            Sign Up
                                                </Text>
                                    </LinearGradient>
                                </TouchableOpacity>
                            </View>
                            <View style={{ height: '15%', }}>
                                <TouchableOpacity onPress={() => navigation.navigate('signup')}>
                                    <Text style={styles(colors).txtnav}>New Here? SignUp Instead! </Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{ height: '15%', }}>
                                <TouchableOpacity onPress={() => navigation.navigate('login')}>
                                    <Text style={styles(colors).txtnav}>Login With Email Address? </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </>
                )
            }
        </View>
    )
}

export default LoginWthPhone

const styles = (colors) => StyleSheet.create({
    screen: {
        backgroundColor: colors.background,
        flex: 1,
    },
    phone: {
        width: '90%',
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
    root: { flex: 1, padding: 20 },
    title: { textAlign: 'center', fontSize: 30, color: colors.text },
    codeFieldRoot: { marginTop: 20 },
    cell: {
        width: 40,
        height: 40,
        lineHeight: 38,
        fontSize: 24,
        borderWidth: 2,
        borderColor: colors.border,
        textAlign: 'center',
        color: colors.text
    },
    focusCell: {
        borderColor: colors.text,
        color: colors.text
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
    txtnav: {
        textAlign: 'center',
        color: colors.text
    },
})
