import React, { useState } from 'react';
import { StyleSheet, Text, View,TouchableOpacity, TextInput, Dimensions, SafeAreaView, } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
const { height: screenHeight } = Dimensions.get('window');
import { Config } from '../config';
import * as SecureStore from 'expo-secure-store';
import { DataLayerValue } from '../Context/DataLayer';

const Signup = ({ navigation }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [age, setAge] = useState("");
    const [username, setUsername] = useState("");
    const [usn, setusn] = useState('');
    const [{ userToken }, dispatch] = DataLayerValue();
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
                    usn: usn
                })
            })
                .then((response) => response.json())
                .then((responseData) => {
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
                    setusn(null);
                })
                .done();
        }
    }

    const generatepass = () => {
        var randomstring = Math.random().toString(36).slice(-9);
        setPassword(randomstring);
    }
    return (
        <SafeAreaView>
            <View style={styles.main}>
                <Text style={{ justifyContent: 'center', textAlign: 'center', color: Config.light, fontSize: 30, fontWeight: '800' }}></Text>
                <View style={styles.middle}>
                    <Text style={{ marginTop: 20, color: Config.light }}>Email</Text>
                    <TextInput
                    style={{ borderBottomColor: "#fff", borderBottomWidth: 1, width: "100%", paddingLeft: 10, paddingBottom: 10, paddingRight: 10, fontSize: 18, color: "#fff", }}
                        value={email}
                        onChangeText={(useremail) => setEmail(useremail)}
                    ></TextInput>
                    <Text style={{ marginTop: 20, color: Config.light }}>Password</Text>
                    <TextInput
                        style={{ borderBottomColor: Config.light, borderBottomWidth: 1, width: "100%", paddingLeft: 10, paddingBottom: 10, paddingRight: 10, fontSize: 18,color: "#fff", }}
                        value={password}
                        onChangeText={(userPassword) => setPassword(userPassword)}
                    ></TextInput>
                    <TouchableOpacity style={{ marginTop: 10, alignItems: "center" }} onPress={generatepass}><Text style={{ color: "#b3b3b3" }}>Generate Password?</Text></TouchableOpacity>
                    <Text style={{ marginTop: 20, color: Config.light }}>User Name</Text>
                    <TextInput style={{ borderBottomColor: Config.light, borderBottomWidth: 1, width: "100%", paddingLeft: 10, paddingBottom: 10, paddingRight: 10, fontSize: 18 ,color: "#fff",}}
                        value={username}
                        onChangeText={(username) => setUsername(username)}
                    ></TextInput>
                    <Text style={{ marginTop: 20, color: Config.light }}>Age</Text>
                    <TextInput
                        style={{ borderBottomColor: Config.light, borderBottomWidth: 1, width: "100%", paddingLeft: 10, paddingBottom: 10, paddingRight: 10, fontSize: 18,color: "#fff", }}
                        value={age}
                        onChangeText={(userage) => setAge(userage)}
                        keyboardType='number-pad'
                    ></TextInput>
                    <Text style={{ marginTop: 20, color: Config.light }}>Usn</Text>
                    <TextInput
                        style={{ borderBottomColor: Config.light, borderBottomWidth: 1, width: "100%", paddingLeft: 10, paddingBottom: 10, paddingRight: 10, fontSize: 18,color: "#fff", }}
                        value={usn}
                        onChangeText={(userusn) => setusn(userusn)}
                    ></TextInput>
                </View>
                <View style={styles.bottom}>
                    <View>
                        <TouchableOpacity style={{ width: "100%", paddingRight: "10%" }} onPress={onsignup}>
                            <LinearGradient
                                colors={['#36D1DC', '#5B86E5']}
                                style={styles.btn1}
                                start={[0, 0]}
                                end={[1, 1]}
                            >
                                <Text
                                    style={styles.btntxt}>
                                    Signup
                        </Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.acc}>
                        <View><Text style={styles.acctxt}>Already a user?</Text></View>
                        <View>
                            <TouchableOpacity onPress={() => {
                                navigation.navigate('login');
                            }}>
                                <Text style={styles.link}>Login</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    main: { flexDirection: "column", height: screenHeight, backgroundColor: Config.primary },

    middle: { height: '60%', justifyContent: "center", width: "80%", marginLeft: "10%" },

    mainImg: { width: 271, height: 197, marginBottom: 10 },

    txt2: { fontSize: 18, textAlign: 'center', color: "#252526", fontWeight: "100", marginBottom: 20 },

    bottom: { height: '20%', flexDirection: 'column', justifyContent: "space-around" },

    btn1: { width: "100%", margin: 20, padding: 15, borderRadius: 5 },

    btn2: { width: 130, margin: 20, padding: 15, alignItems: 'center', borderRadius: 5 },

    btntxt: { backgroundColor: 'transparent', fontSize: 18, color: Config.light, fontWeight: '800', textAlign: "center" },

    acc: { flexDirection: "row", justifyContent: "center", },

    acctxt: { color: Config.light },

    link: { color: "#12c2d3", fontWeight: "800" },


});

export default Signup;