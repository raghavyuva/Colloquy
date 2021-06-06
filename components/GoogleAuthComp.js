import React, { useState } from 'react'
import { StyleSheet, } from 'react-native'
import { Config } from '../config';
import { DataLayerValue } from '../Context/DataLayer';
import * as SecureStore from 'expo-secure-store';
import { useTheme } from '@react-navigation/native';
import { Button, View, Text, Card, CardItem, Title, Left } from 'native-base';
import * as Google from "expo-google-app-auth";
import LoadingComp from './LoadingComp';

const GoogleAuthComp = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [{ userToken }, dispatch] = DataLayerValue()
    const [pass, setpass] = useState('');
    const [emailby, setemailby] = useState('');
    const { colors } = useTheme();
    const [loggingin, setloggingin] = useState(false);
    const [age, setAge] = useState("");
    const [username, setUsername] = useState("");
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
    const Loginwith = () => {
        try {
            setloggingin(true);
            fetch(`${Config.url}` + `/login`, {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: emailby,
                    password: pass
                })
            })
                .then((response) => response.json())
                .then((responseData) => {
                    console.log(responseData);
                    if (responseData.message == 'Auth successfull') {
                        dispatch({
                            type: 'LOGIN',
                            token: responseData.token,
                            id: responseData.user._id
                        })
                        SecureStore.setItemAsync('userToken', responseData.token);
                        SecureStore.setItemAsync('UserId', responseData.user._id)
                        setemailby(null);
                        setpass(null);
                        setloggingin(false)
                    }
                    else {
                        alert(responseData.message);
                        setloggingin(false);
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
    const Googlesingin = async () => {
        try {
            const result = await Google.logInAsync({
                androidClientId: Config.Android,
                iosClientId: Config.IOS,
                scopes: ["profile", "email"],
            });
            console.log(result)
            if (result.type === "success") {
                // console.log(result.user);
                setemailby(result.user.email);
                setpass(result.user.id);
                Loginwith();
                return result.accessToken;
            } else {
                return { cancelled: true };
            }
        } catch (e) {
            alert(e);
            return { error: true };
        }
    }
    if (loggingin) {
        return (
            <LoadingComp />
        )
    }
    return (
        <Card style={{ backgroundColor: colors.background, borderWidth: 0, borderColor: colors.background, }}>
            <CardItem style={{ backgroundColor: colors.background, }}>
                <Button style={{
                    backgroundColor: colors.card,
                    justifyContent: 'center',
                    alignSelf: "center",
                    width: 200,
                    marginTop: 10,
                    borderColor: 'grey', borderWidth: 1
                }}
                    onPress={Googlesingin}
                >
                    <Text style={{ color: colors.text, textTransform: 'capitalize' }}>Sign In With Google </Text>
                </Button>
            </CardItem>
            <CardItem style={{ marginLeft: 0, backgroundColor: colors.background, }}>
                <Button style={{
                    backgroundColor: colors.card,
                    justifyContent: 'center',
                    alignSelf: "center",
                    width: 200,
                    marginTop: 10,
                    borderColor: 'grey', borderWidth: 1
                }}
                    onPress={Googlesignup}
                >
                    <Text style={{ color: colors.text, textTransform: 'capitalize' }}>Sign Up With Google</Text>
                </Button>
            </CardItem>
        </Card>
    )
}

export default GoogleAuthComp

const styles = StyleSheet.create({})
