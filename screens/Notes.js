import React from 'react'
import { Text, View, Dimensions, FlatList, Image } from 'react-native'
const { width, height } = Dimensions.get('window');
import { LinearGradient } from 'expo-linear-gradient';
import { DefaultTheme, DarkTheme, useTheme } from '@react-navigation/native';

import Headingbar from '../components/Header';
import { ScrollView, TouchableHighlight, TouchableOpacity } from 'react-native-gesture-handler';
import { Config } from '../config';
const MockInterview = (props) => {
    const Data = [{
        "course": "CSE",
        "id": "1"
    },
    {
        "course": "CIVIL",
        "id": "2"
    }, {
        "course": "MECH",
        "id": "3"
    }, {
        "course": "ECE",
        "id": "4"
    }, {
        "course": "EEE",
        "id": "5"
    }, {
        "course": "Other ",
        "id": "6"
    }]
    const { colors } = useTheme();

    return (
        <View style={{ flex: 1,backgroundColor:colors.background }}>
            <Headingbar {...props} />
            <Image source={require('../assets/student.png')} style={{ width: width, height: height / 2, alignSelf: 'center' }} />
            <FlatList
                ref={(ref) => { flatListRef = ref; }}
                renderItem={({ item }) => {
                    let ele = item
                    return (
                        <TouchableOpacity  style={{
                            width: width / 2, height: 100, backgroundColor: colors.background, flexDirection: 'row',
                            marginLeft: 0, marginBottom: 8, borderWidth: 2, borderColor: colors.border, justifyContent: 'center',
                            borderRadius: 10, marginRight: 0
                        }}>
                                <View style={{ justifyContent: 'center', alignSelf: 'center' }}>
                                    <Text style={{ fontSize: 20, fontWeight: 'bold', color: colors.text , textAlign: "center" }} >{ele.course} </Text>
                                </View>
                           
                        </TouchableOpacity>
                    );
                }}
                keyExtractor={(item, index) => index.toString()}
                data={Data}
                style={{ marginBottom: 50 ,margin:2}}
                numColumns={2}
            />
        </View>
    )
}

export default MockInterview;