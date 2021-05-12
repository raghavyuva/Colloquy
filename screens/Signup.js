import React, { useState } from 'react'
import { StyleSheet, View, TouchableOpacity } from 'react-native'
import { useFonts } from 'expo-font';
import Svg, { Circle, Rect, Stop, Path, Defs, LinearGradient as Fgrad, } from 'react-native-svg';
import { StatusBar } from 'expo-status-bar';
import { Item, Input, Label, Icon } from 'native-base';
import { LinearGradient } from 'expo-linear-gradient';
import { Picker } from '@react-native-picker/picker';
import { DefaultTheme, DarkTheme, useTheme } from '@react-navigation/native';
import { Button, Text } from "native-base";
import * as Google from "expo-google-app-auth";
import { Config } from '../config';
import { DataLayerValue } from '../Context/DataLayer';
import * as SecureStore from 'expo-secure-store';

const Signup = (props) => {
    const [selected, setselected] = useState('key3');
    const [age, setAge] = useState("");
    const [username, setUsername] = useState("");
    const [userphoto, setuserphoto] = useState('');
    const [email, setEmail] = useState("");
    const [{ userToken }, dispatch] = DataLayerValue()

    const [password, setPassword] = useState("");
    const [loaded] = useFonts({
        Montserrat: require('../assets/Pacifico/Pacifico-Regular.ttf'),
    });
    if (!loaded) {
        return null;
    }
    const { colors } = useTheme();

    const setDate = () => {
        setselected()
    }
    const onValueChange = (f) => {
        setselected(f)
    }
    const onsignup = () => {
        if (!email || !password || !age || !username) {
            alert("input fields cannot be as empty as like that")
        }
        else {
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
                    } else {
                        alert(responseData.message);
                    }
                })
                .done();
        }
    }

    const generatepass = () => {
        var randomstring = Math.random().toString(36).slice(-9);
        setPassword(randomstring);
    }
    const Registerwith = () => {
        try {
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
                    } else {
                        alert(responseData.message);
                    }
                })
                .done();
        } catch (error) {
            alert(error)
        }
    }
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
    return (
        <View style={styles(colors).screen}>
            <StatusBar hidden />
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
            </View>
            <View style={{ height: '50%' }}>

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
                <View style={{ marginLeft: 10, }}>
                    <TouchableOpacity style={{ marginTop: 10, alignItems: "center" }} onPress={generatepass}><Text style={{ color: "#b3b3b3" }}>Generate Password ? </Text></TouchableOpacity>
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
                    <View style={{ height: "20%", marginTop: 20 }}>
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
            <View style={{ height: '20%' }}>

                <View style={{ height: '40%' }}>
                    <TouchableOpacity>
                        <Text style={styles(colors).txtnav}>By creating an account  you agree to the{'\n'} Terms of use and Privacy Policy</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ height: '40%' }}>
                    <TouchableOpacity
                        style={{ width: "100%", paddingRight: "10%", }}  onPress={onsignup} >
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
                    <TouchableOpacity onPress={() => props.navigation.navigate('login')}>
                        <Text style={styles(colors).txtnav}>Already a User? SignIn Instead! </Text>
                    </TouchableOpacity>
                </View>
            </View>

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
        fontSize: 15, color: colors.text,
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
    }

})

