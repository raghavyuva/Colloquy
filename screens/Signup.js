import React, { useState, useRef } from 'react'
import { StyleSheet, View, TouchableOpacity, Dimensions, SafeAreaView } from 'react-native'
import { useFonts } from 'expo-font';
import Svg, { Circle, Rect, Stop, Path, Defs, LinearGradient as Fgrad, } from 'react-native-svg';
import { StatusBar } from 'expo-status-bar';
import { Item, Input, Label, Icon } from 'native-base';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '@react-navigation/native';
import { Button, Text } from "native-base";
import * as Google from "expo-google-app-auth";
import { Config } from '../config';
import { DataLayerValue } from '../Context/DataLayer';
import * as SecureStore from 'expo-secure-store';
import LoadingComp from '../components/LoadingComp';
import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha';
import firebase from 'firebase';
const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
import {
    CodeField,
    Cursor,
    useBlurOnFulfill,
    useClearByFocusCell,
} from 'react-native-confirmation-code-field';
const Signup = ({ navigation }) => {
    const [{ userToken }, dispatch] = DataLayerValue()
    const recaptchaVerifier = useRef(null);

    const [selected, setselected] = useState('key3');
    const [age, setAge] = useState("");
    const [username, setUsername] = useState("");
    const [userphoto, setuserphoto] = useState('');
    const [email, setEmail] = useState("");
    const [loggingin, setloggingin] = useState(false);
    const [password, setPassword] = useState("");
    const [verificationId, setVerificationId] = useState(null);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [code, setCode] = useState('');
    const [otpactive, setotpactive] = useState(false);
    const { colors } = useTheme();
    const [Id, setId] = useState(null);
    const [token, settoken] = useState(null);
    const refs = useBlurOnFulfill({ code, cellCount: CELL_COUNT });
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({
        code,
        setCode
    });
    const [loaded] = useFonts({
        Montserrat: require('../assets/Pacifico/Pacifico-Regular.ttf'),
    });
    if (!loaded) {
        return null;
    }

    const setDate = () => {
        setselected()
    }
    const onValueChange = (f) => {
        setselected(f)
    }
    const onsignup = async () => {

        if (!email || !password || !age || !username) {
            alert("input fields cannot be as empty as like that")
        }
        else {
            setloggingin(true);
            fetch(`${Config.url}` + `/signup`, {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                    age: age,
                    username: username,
                    userphoto: userphoto
                })
            })
                .then((response) => response.json())
                .then(async (responseData) => {
                    console.log(responseData);
                    if (responseData.message == 'signed up successfully') {
                        setloggingin(false);
                        await sendVerification();
                        setEmail(null);
                        setPassword(null);
                        setAge(null);
                        setUsername(null);
                        setuserphoto(null);
                        setId(responseData.user._id);
                        settoken(responseData.token)
                        setloggingin(false)
                    } else {
                        alert(responseData.message);
                        setloggingin(false);
                    }
                })
                .done();
        }
    }
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
                    fetch(`${Config.url}` + `/updateuser/${Id}`, {
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
                            dispatch({
                                type: 'REGISTER',
                                token: token,
                                id: Id
                            })
                            SecureStore.setItemAsync('userToken', token);
                            SecureStore.setItemAsync('UserId', Id)
                        })
                        .done();
                    console.log(result);
                });
            setloggingin(false)
        } catch (error) {
            alert(error)
            setloggingin(false);
        }
        setotpactive(false);
    };
    const generatepass = () => {
        var randomstring = Math.random().toString(36).slice(-9);
        setPassword(randomstring);
    }
    const Registerwith = () => {
        try {
            setloggingin(true)
            fetch(`${Config.url}` + `/signup`, {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                    age: age,
                    username: username,
                    userphoto: userphoto
                })
            })
                .then((response) => response.json())
                .then((responseData) => {
                    console.log(responseData);
                    if (responseData.message == 'signed up successfully') {
                        dispatch({
                            type: 'REGISTER',
                            token: responseData.token,
                            id: responseData.user._id
                        })
                        SecureStore.setItemAsync('userToken', responseData.token);
                        SecureStore.setItemAsync('UserId', responseData.user._id)
                        setEmail(null);
                        setPassword(null);
                        setAge(null);
                        setUsername(null);
                        setuserphoto(null);
                        setloggingin(false)
                    } else {
                        alert(responseData.message);
                        setloggingin(false);
                    }
                })
                .done();
        } catch (error) {
            alert(error)
        }
    }
    const sendVerification = () => {
        const phoneProvider = new firebase.auth.PhoneAuthProvider();
        phoneProvider.verifyPhoneNumber(phoneNumber, recaptchaVerifier.current).then(setVerificationId).then(() => {
            alert('OTP has been sent to your phone number');
            setotpactive(true);
        });
    };
    const Googlesignup = async () => {
        try {
            const result = await Google.logInAsync({
                androidClientId: Config.Android,
                iosClientId: Config.IOS,
                scopes: ["profile", "email"],
            });
            if (result.type === "success") {
                setEmail(result.user.email);
                setPassword(result.user.id);
                setAge(25);
                setuserphoto(result.user.photoUrl);
                setUsername(result.user.name);
                Registerwith();
                return result.accessToken;
            } else {
                return { cancelled: true };
            }
        } catch (e) {
            alert(e.message);
            return { error: true };
        }
    }


    const CELL_COUNT = 6;

    if (loggingin) {
        return (
            <LoadingComp />
        )
    }
    return (
        <View style={styles(colors).screen}>
            <View style={{ height: '30%' }}>
                <Svg height="45%" width="100%" id="svg" viewBox="0 0 1440 400"
                    xmlns="http://www.w3.org/2000/svg" class="transition duration-300 ease-in-out delay-150">
                    <Defs><Fgrad id="gradient">
                        <Stop offset="20%" stopColor={colors.card}>
                        </Stop><Stop offset="80%"
                            stopColor={colors.primary}></Stop>
                    </Fgrad></Defs>
                    <Path d="M 0,400 C 0,400 0,200 0,200 C 80.54545454545456,234.19138755980862 
                161.09090909090912,268.38277511961724 252,260 C 342.9090909090909,251.61722488038276 
                444.18181818181813,200.66028708133967 548,177 C 651.8181818181819,153.33971291866033 
                758.1818181818182,156.97607655502395 872,180 C 985.8181818181818,203.02392344497605 1107.090909090909,245.43540669856458 1203,252 
                C 1298.909090909091,258.5645933014354 1369.4545454545455,229.2822966507177 1440,200 C 1440,200 1440,400 1440,400 Z"
                        stroke="none" stroke-width="0" fill="url(#gradient)"
                        class="transition-all duration-300 ease-in-out delay-150" transform="rotate(-180 720 200)">
                    </Path></Svg>
                <Text style={styles(colors).header}>
                    Get On the Board
        </Text>
                <FirebaseRecaptchaVerifierModal
                    ref={recaptchaVerifier}
                    firebaseConfig={firebase.app().options}
                    style={{ flex: 1 }}
                />
            </View>
            {
                otpactive ? (
                    <>
                        <SafeAreaView style={styles(colors).root}>
                            <Text style={styles(colors).title}>Enter Otp to Validate</Text>
                            <CodeField
                                ref={refs}
                                {...props}
                                // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
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
                    <View>
                        <View style={{}}>

                            <View>
                                <Item stackedLabel style={styles(colors).txtitm} >
                                    <Label style={styles(colors).txtinput}>Email</Label>
                                    <Input
                                        value={email}
                                        onChangeText={(useremail) => setEmail(useremail)}
                                        style={{ color: colors.text }}
                                    />
                                </Item>
                            </View>
                            <View>
                                <Item stackedLabel style={styles(colors).txtitm} >
                                    <Label style={styles(colors).txtinput}>Password</Label>
                                    <Input
                                        style={{ color: colors.text }}
                                        value={password}
                                        onChangeText={(userPassword) => setPassword(userPassword)}
                                    />
                                </Item>
                            </View>
                            <TouchableOpacity style={{ marginTop: 5, alignItems: "center" }} onPress={generatepass}><Text style={{ color: "#b3b3b3" }}>Generate Password ? </Text></TouchableOpacity>
                            <View>
                                <Item stackedLabel style={styles(colors).txtitm} >
                                    <Label style={styles(colors).txtinput}>User Name</Label>
                                    <Input
                                        style={{ color: colors.text }}
                                        value={username}
                                        onChangeText={(username) => setUsername(username)}
                                    />
                                </Item>
                            </View>
                            <View >
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
                            </View>
                            <View style={{ marginLeft: 10, }}>
                                <View>
                                    <Item stackedLabel style={styles(colors).txtitm} >
                                        <Label style={styles(colors).txtinput}>Age </Label>
                                        <Input
                                            value={age}
                                            onChangeText={(age) => setAge(age)}
                                            style={{ color: colors.text }}
                                            keyboardType='number-pad'
                                        />
                                    </Item>
                                </View>
                                <View style={{ marginTop: 0 }}>
                                    <Button style={{
                                        backgroundColor: colors.card,
                                        justifyContent: 'center',
                                        alignSelf: "center",
                                        width: 210,
                                        marginTop: 10
                                    }}
                                        onPress={Googlesignup}
                                    >
                                        <Text style={{ color: colors.text }}>Sign Up With Google</Text>
                                    </Button>
                                </View>

                            </View>
                        </View>
                        <View >

                            <View >
                                <TouchableOpacity>
                                    <Text style={styles(colors).txtnav}>By creating an account  you agree to the{'\n'} Terms of use and Privacy Policy</Text>
                                </TouchableOpacity>
                            </View>
                            <View >
                                <TouchableOpacity
                                    style={{ width: "100%", paddingRight: "10%", }} onPress={onsignup} >
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
                                <TouchableOpacity onPress={() => navigation.navigate('login')}>
                                    <Text style={styles(colors).txtnav}>Already a User? SignIn Instead! </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                )
            }

        </View>
    )
}

export default Signup

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
})

