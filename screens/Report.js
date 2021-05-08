import { Button } from 'native-base';
import React, { useState, useEffect } from 'react'
import { View, Text, Image, Dimensions, TextInput, KeyboardAvoidingView } from 'react-native'
import Headingbar from '../components/Header';
const { width, height } = Dimensions.get('window');
import { MaterialIcons } from '@expo/vector-icons';

const Report = (props) => {
    const [Input, setInput] = useState('');
    
    return (
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
            <Headingbar {...props} />
            <KeyboardAvoidingView>
                <Image source={require('../assets/feedback.png')} style={{ width: width - 20, height: height / 2, alignSelf: 'center', }} />
                <Button style={{ backgroundColor: '#0E043B', justifyContent: 'center', alignSelf: "center", width: 150, marginBottom: 50 }}>
                    <MaterialIcons name="attach-file" size={24} color="white" />
                    <Text style={{ color: 'white' }}>Attach File</Text>
                </Button>
            </KeyboardAvoidingView>
            <View>
                <TextInput style={{
                    width: "100%", paddingLeft: 10,
                    paddingBottom: 10, paddingRight: 10,
                    fontSize: 18, color: "#fff",
                    borderColor: '#0E043B',
                    borderWidth: 2,
                    height: 100
                }} 
                    value={Input}
                    placeholder='Report Your Bug'
                    onChangeText={(useremail) => setInput(useremail)}
                ></TextInput>
            </View>
            <Button style={{ backgroundColor: '#0E043B', justifyContent: 'center', alignSelf: "center", width: 150, marginTop: 50 }}>
                <Text style={{ color: 'white' }}>Submit</Text>
            </Button>
        </View>
    )
}

export default Report
