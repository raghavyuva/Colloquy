import React, { useState, } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Config } from '../config';
import { DataLayerValue } from "../Context/DataLayer";
import * as SecureStore from 'expo-secure-store';
import Svg, { Stop, Path, Defs, LinearGradient as Fgrad } from 'react-native-svg';
import { useTheme } from '@react-navigation/native';
import { Item, Input, Label, Right } from 'native-base';
import { useFonts } from 'expo-font';
import LoadingComp from "../components/LoadingComp";
import { MaterialIcons } from '@expo/vector-icons';
const Login = ({ navigation }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [{ userToken }, dispatch] = DataLayerValue()
    const { colors } = useTheme();
    const [loggingin, setloggingin] = useState(false);
    const [passvisibility, setpassvisibility] = useState(true);
    const [loaded] = useFonts({
        Montserrat: require('../assets/Pacifico/Pacifico-Regular.ttf'),
    });
    if (!loaded) {
        return null;
    }
    const onsignin = () => {
        if (!email || !password) {
            alert("input fields cannot be as empty as like that")
        } else {
            setloggingin(true);
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
                    else {
                        alert(responseData.message);
                        setloggingin(false)
                    }
                })
                .done();
        }
    }

    if (loggingin) {
        return (
            <LoadingComp />
        )
    }
    return (
        <View style={styles(colors).screen}>
            <View style={{ height: '40%' }}>
                <Svg height="35%" width="100%" id="svg" viewBox="0 0 1440 400"
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
                    Hello there,{'\n'}
                Welcome back
            </Text>
            </View>
            <View style={{ height: '20%' }}>
                <View>
                    <Item style={styles(colors).txtitm} stackedLabel>
                        <Label style={styles(colors).txtinput}>Email Address</Label>
                        <Input value={email}
                            onChangeText={(useremail) => setEmail(useremail)}
                            placeholderTextColor={colors.text} style={{ color: colors.text }}

                        />
                    </Item>
                </View>
                <View >
                    <Item style={styles(colors).txtitm} stackedLabel >
                        <Label style={styles(colors).txtinput}>Password</Label>
                        <Input value={password}
                            onChangeText={(userPassword) => setPassword(userPassword)}
                            style={{ color: colors.text }}
                            secureTextEntry={passvisibility}
                        >
                        </Input>
                    </Item>

                </View>
            </View>
            <View style={{ height: '40%' }}>
                <View style={{ height: '30%' }}>
                    <TouchableOpacity onPress={() => navigation.navigate('forgot')}>
                        <Text style={styles(colors).forgot}>Forgot Your Password?</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ height: '40%' }}>
                    <TouchableOpacity
                        style={{ width: "100%", paddingRight: "10%", }}
                        onPress={onsignin}
                    >
                        <LinearGradient
                            colors={[colors.card, colors.primary]}
                            style={styles(colors).btn1}
                            start={[0, 0]}
                            end={[1, 1]}
                        >
                            <Text
                                style={styles(colors).btntxt}>
                                Sign In
                        </Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
                {/* <View style={{ height: '15%', }}>
                    <TouchableOpacity onPress={() => navigation.navigate('phone')}>
                        <Text style={styles(colors).txtnav}>Login With Phone Number? </Text>
                    </TouchableOpacity>
                </View> */}
                <View style={{ height: '15%', }}>
                    <TouchableOpacity onPress={() => navigation.navigate('signup')}>
                        <Text style={styles(colors).txtnav}>New Here? SignUp Instead! </Text>
                    </TouchableOpacity>
                </View>

            </View>

        </View>

    );
};


export default Login;

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
        borderBottomColor: 'grey',
        color: colors.text,
        margin: 10
    },
    header: {
        fontFamily: 'Montserrat',
        fontSize: 40,
        color: colors.text
    },
    txtnav: {
        textAlign: 'center',
        color: colors.text,
        
    },
    forgot:{
        marginTop:35,
        textAlign: 'center',
        color: colors.text,
    }


});

