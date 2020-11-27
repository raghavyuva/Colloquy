import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput, Dimensions, SafeAreaView, } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { AuthContext } from '../../Auth/AuthContext';
const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
const Signup = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [age, setAge] = useState("");
  const [username, setUsername] = useState("");
  const [usn, setusn] = useState('')
  const { signUp } = React.useContext(AuthContext);
  const onsignup = () => {
    if (!email || !password || !age || !username) {
      alert("input fields cannot be as empty as like that")
    }
    else {
      fetch(`http://192.168.43.117:3000/signup`, {
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
          usn:usn
        })
      })
        .then((response) => response.json())
        .then((responseData) => {
          console.log(responseData);
          setEmail(null);
          setPassword(null);
          setAge(null);
          setUsername(null);
          setusn(null);
          signUp(responseData);
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
        <Text style={{ justifyContent: 'center', textAlign: 'center', color: "#fff", fontSize: 30, fontWeight: '800' }}></Text>
        <View style={styles.middle}>
          <Text style={{ marginTop: 20, color: "#b3b3b3" }}>Email</Text>
          <TextInput
            style={{ borderBottomColor: "#8b8b8b", borderBottomWidth: 1, width: "100%", paddingLeft: 10, paddingBottom: 10, paddingRight: 10, fontSize: 18 }}
            value={email}
            onChangeText={(useremail) => setEmail(useremail)}
          ></TextInput>
          <Text style={{ marginTop: 20, color: "#b3b3b3" }}>Password</Text>
          <TextInput
            style={{ borderBottomColor: "#8b8b8b", borderBottomWidth: 1, width: "100%", paddingLeft: 10, paddingBottom: 10, paddingRight: 10, fontSize: 18, }}
            value={password}
            onChangeText={(userPassword) => setPassword(userPassword)}
          ></TextInput>
          <TouchableOpacity style={{ marginTop: 10, alignItems: "center" }} onPress={generatepass}><Text style={{ color: "#b3b3b3" }}>Generate Password?</Text></TouchableOpacity>
          <Text style={{ marginTop: 20, color: "#b3b3b3" }}>User Name</Text>
          <TextInput style={{ borderBottomColor: "#8b8b8b", borderBottomWidth: 1, width: "100%", paddingLeft: 10, paddingBottom: 10, paddingRight: 10, fontSize: 18 }}
            value={username}
            onChangeText={(username) => setUsername(username)}
          ></TextInput>
          <Text style={{ marginTop: 20, color: "#b3b3b3" }}>Age</Text>
          <TextInput
            style={{ borderBottomColor: "#8b8b8b", borderBottomWidth: 1, width: "100%", paddingLeft: 10, paddingBottom: 10, paddingRight: 10, fontSize: 18 }}
            value={age}
            onChangeText={(userage) => setAge(userage)}
            keyboardType='number-pad'
          ></TextInput>
          <Text style={{ marginTop: 20, color: "#b3b3b3" }}>Usn</Text>
          <TextInput
            style={{ borderBottomColor: "#8b8b8b", borderBottomWidth: 1, width: "100%", paddingLeft: 10, paddingBottom: 10, paddingRight: 10, fontSize: 18 }}
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
  main: { flexDirection: "column", height: screenHeight },

  middle: { height: '60%', justifyContent: "center", width: "80%", marginLeft: "10%" },

  mainImg: { width: 271, height: 197, marginBottom: 10 },

  txt2: { fontSize: 18, textAlign: 'center', color: "#252526", fontWeight: "100", marginBottom: 20 },

  bottom: { height: '20%', flexDirection: 'column', justifyContent: "space-around" },

  btn1: { width: "100%", margin: 20, padding: 15, alignItems: 'center', borderRadius: 5 },

  btn2: { width: 130, margin: 20, padding: 15, alignItems: 'center', borderRadius: 5 },

  btntxt: { backgroundColor: 'transparent', fontSize: 18, color: '#fff', fontWeight: '800' },

  acc: { flexDirection: "row", justifyContent: "center", },

  acctxt: { color: "#ccc" },

  link: { color: "#12c2d3", fontWeight: "800" },

  MainContainer: {
    flex: 1,
    margin: 2,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: Platform.OS === 'ios' ? 20 : 0,
    backgroundColor: '#E0F7FA',
  },
  bottomNavigationView: {
    backgroundColor: '#0E043B',
    width: '100%',
    height: 250,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 23
  },
  logo: {
    textAlign: 'center',
    width: 200,
    height: 200,
    color: 'yellow',
    marginTop: 50,
    //    backgroundColor: "red",
    justifyContent: "center",
    alignSelf: 'center'
  },
  card: {
    backgroundColor: '#0E043B',
    height: screenHeight
  },
  fieldtitle: {
    color: 'white',
  },
  fieldinput: {
    color: 'yellow',
    width: screenWidth - 60,
  },
  submission: {
    marginTop: 15,
    borderColor: null,
  },
  submit: {
    backgroundColor: '#5F7',
    borderRadius: 26,
    width: 170,
    justifyContent: 'center'
  },
  submittext: {
    color: 'black',
    textTransform: 'capitalize',
  },
  signup: {
    color: 'red',
    fontSize: 20
  },
  fieldtitl: {
    color: '#FFF',
    borderColor: null,
  }

});

export default Signup;