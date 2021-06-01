import { Button } from 'native-base';
import React, { useState, useEffect } from 'react'
import { View, Text, Image, Dimensions, TextInput, KeyboardAvoidingView } from 'react-native'
import Headingbar from '../components/Header';
const { width, height } = Dimensions.get('window');
import { MaterialIcons } from '@expo/vector-icons';
import { DefaultTheme, DarkTheme, useTheme } from '@react-navigation/native';

const Report = (props) => {
    const [Input, setInput] = useState('');
    const { colors } = useTheme();
    return (
        <View style={{ flex: 1, backgroundColor: colors.background }}>
            <Headingbar {...props} />
            <KeyboardAvoidingView>
                <Image source={{ uri: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fclipground.com%2Fimages%2Fbug-report-png-20.png&f=1&nofb=1' }} style={{ width: width - 20, height: height / 2, alignSelf: 'center', }} />
                <Button style={{ backgroundColor: colors.primary, justifyContent: 'center', alignSelf: "center", width: 150, marginBottom: 50 }}>
                    <MaterialIcons name="attach-file" size={24} color={colors.text} />
                    <Text style={{ color: colors.text }}>Attach File  </Text>
                </Button>
            </KeyboardAvoidingView>
            <View>
                <TextInput style={{
                    width: "100%", paddingLeft: 10,
                    paddingBottom: 10, paddingRight: 10,
                    fontSize: 18, color: colors.text,
                    borderColor: colors.border,
                    borderWidth: 2,
                    height: 100
                }}
                    value={Input}
                    placeholder='Report Your Bug'
                    placeholderTextColor={colors.text}
                    onChangeText={(useremail) => setInput(useremail)}
                ></TextInput>
            </View>
            <Button style={{ backgroundColor: colors.primary, justifyContent: 'center', alignSelf: "center", width: 150, marginTop: 50 }}>
                <Text style={{ color: colors.text }}>Submit </Text>
            </Button>
        </View>
    )
}

export default Report
