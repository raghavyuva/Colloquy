import React, { Component,useState } from 'react';
import { Image, StyleSheet, FlatList, ScrollView, Dimensions,  TextInput, KeyboardAvoidingView } from 'react-native';
import { EvilIcons, Ionicons, FontAwesome, AntDesign } from '@expo/vector-icons';
import * as Font from 'expo-font';
import { Header, Right, Button, Text, View, Fab, Icon, Left, Container } from 'native-base';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import { Config } from '../config';
import { TouchableOpacity } from 'react-native-gesture-handler';
const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
const UploadPoll = (props) => {
    const [body, setbody] = useState('');
    return (
        <View style={styles.screen}>
            <Header style={styles.Header}>
                <Button onPress={() => props.navigation.navigate('Home', { screen: 'addblog' })} transparent>
                    <Text style={styles.fieldtitle}>Create Post ?</Text>
                </Button>
                <Right>
                    <Button transparent>
                        <Text>Post</Text>
                    </Button>
                </Right>
            </Header>
            <KeyboardAvoidingView style={styles.screen}>
                <View style={{ backgroundColor: '#4f6d9e', height: screenHeight - 400, borderBottomStartRadius: 20, borderBottomEndRadius: 20 }}>
                </View>
                <View>
                    <View style={styles.contain}>
                        <TouchableOpacity style={styles.opacity}>
                        </TouchableOpacity>
                        <TextInput style={styles.input} placeholder='Title' placeholderTextColor='white' />
                    </View>
                    <View style={styles.contain}>
                        <TouchableOpacity style={styles.opacity}>
                        </TouchableOpacity>
                        <TextInput style={styles.input} placeholder='Caption' placeholderTextColor='white' 
                        onChangeText={(body) => setbody(body)} value={body} />
                    </View>
                </View>
            </KeyboardAvoidingView>
        </View>
    )
}


export default UploadPoll
const styles = StyleSheet.create({
    screen: {
      backgroundColor: '#3d5e94',
      height: screenHeight,
      justifyContent: 'center',
      flex: 1
    },
    logo: {
      width: 300,
      height: 300,
      alignSelf: 'center',
    },
    Header: {
      backgroundColor: "#1e2a78"
    },
    opacity: {
      alignSelf: "center",
      marginLeft: 5
    },
    contain: {
      flexDirection: "row",
      backgroundColor: '#5775a5',
      marginTop: 40,
      width: screenWidth - 100,
      height: 60,
      alignSelf: "center",
      borderRadius: 10,
      marginBottom: 10,
      borderWidth: 0.3,
      borderColor: "#c5c5c5"
    },
    input: {
      width: 200,
      height: 51,
      backgroundColor: "#5775a5",
      paddingLeft: 5,
      alignSelf: "center"
    },
    fieldtitle: {
      color: 'white',
      borderBottomWidth: 2,
      borderBottomColor: 'red',
    }
  });
  
  