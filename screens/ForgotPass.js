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
import Svg, {
    Stop,
    Path,
    Defs,
    LinearGradient as Fgrad,
  } from "react-native-svg";
const ForgotPass = ({ navigation }) => {
    const { colors } = useTheme();
    const [password, setPassword] = useState(null);
    const [canbeshown, setcanbeshown] = useState(false);
    const [email, setemail] = useState(null);
    const [token, settoken] = useState(null);
    const SendResetLink = () => {
        fetch(`${Config.url}` + `/reset-password`, {
            method: 'POST',
            headers: {
                'Content-Type': "application/json",
            },
            body: JSON.stringify({
                email: email
            })
        }).then(res => res.json()).then((resp) => {
            // console.log(resp);
            alert(resp.message);
            if (resp.message == 'check your email to get a token' ) {
                setcanbeshown(true);
            }
        })
    }

    const newpassword = () => {
        fetch(`${Config.url}` + `/new-password`, {
            method: 'POST',
            headers: {
                'Content-Type': "application/json",
            },
            body: JSON.stringify({
                token: token,
                password: password
            })
        }).then(res => res.json()).then((resp) => {
            // console.log(resp);
            alert(resp.message);
            if (resp.message === 'password updated successfully') {
                navigation.navigate('login');
                setcanbeshown(false);
            } else {
                setcanbeshown(false);
            }
        })
    }
    return (
        <View style={styles(colors).screen}>
            <View
        style={{
          height: "15%",
        }}
      >
        <Svg xmlns="http://www.w3.org/2000/svg">
          <Path
            fill="#e7008a"
            fillOpacity="1"
            d="M0,64L48,80C96,96,192,128,288,122.7C384,117,480,75,576,90.7C672,107,768,181,864,208C960,235,1056,213,1152,213.3C1248,213,1344,235,1392,245.3L1440,256L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
          ></Path>
        </Svg>
      </View>
            {
                canbeshown == true ? (
                    <>
                        <View>
                            <Item style={styles(colors).txtitm} stackedLabel >
                                <Label style={styles(colors).txtinput}>New Password</Label>
                                <Input value={password}
                                    onChangeText={(userPassword) => setPassword(userPassword)}
                                    style={{ color: colors.text }}
                                >
                                </Input>
                            </Item>
                            <Item style={styles(colors).txtitm} stackedLabel >
                                <Label style={styles(colors).txtinput}>Token</Label>
                                <Input value={token}
                                    onChangeText={(token) => settoken(token)}
                                    style={{ color: colors.text }}
                                >
                                </Input>
                            </Item>
                            <TouchableOpacity
                                style={{ width: "100%", paddingRight: "10%", }}
                                onPress={newpassword}
                            >
                                <LinearGradient
                                    colors={["#e7008a", "#e7008a"]}
                                    style={styles(colors).btn1}
                                    start={[0, 0]}
                                    end={[1, 1]}
                                >
                                    <Text
                                        style={styles(colors).btntxt}>
                                        Submit New Password
                                        </Text>
                                </LinearGradient>
                            </TouchableOpacity>
                        </View>
                    </>
                ) : (
                    <>
                        <View>
                            <Item style={styles(colors).txtitm} stackedLabel >
                                <Label style={styles(colors).txtinput}>Email</Label>
                                <Input value={email}
                                    onChangeText={(email) => setemail(email)}
                                    style={{ color: colors.text }}
                                >
                                </Input>
                            </Item>
                            <TouchableOpacity
                                style={{ width: "100%", paddingRight: "10%", }}
                                onPress={SendResetLink}
                            >
                                <LinearGradient
                                    colors={["#e7008a", "#e7008a"]}
                                    style={styles(colors).btn1}
                                    start={[0, 0]}
                                    end={[1, 1]}
                                >
                                    <Text
                                        style={styles(colors).btntxt}>
                                        Reset Password
                                        </Text>
                                </LinearGradient>
                            </TouchableOpacity>
                        </View>
                    </>
                )
            }
        </View>
    )
}

export default ForgotPass


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
        fontSize: 15, color: 'white',
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
        color: colors.text
    }
})
