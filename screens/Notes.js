import React from 'react'
import { Text, View, Dimensions, FlatList, Image } from 'react-native'
const { width, height } = Dimensions.get('window');
import { LinearGradient } from 'expo-linear-gradient';

import Headingbar from '../components/Header';
import { ScrollView, TouchableHighlight, TouchableOpacity } from 'react-native-gesture-handler';
const MockInterview = (props) => {
    const colors = ['#1b262c', '#0f4c75', '#3282b8', '#6b028d', "#221f3b", '#c42b71']
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
        "course": "Other",
        "id": "6"
    }]
    return (
        <View style={{ flex: 1,backgroundColor:'#0b032b' }}>
            <Headingbar {...props} />
            <Image source={require('../assets/student.png')} style={{ width: width, height: height / 2, alignSelf: 'center' }} />
            <FlatList
                ref={(ref) => { flatListRef = ref; }}
                renderItem={({ item }) => {
                    let ele = item
                    return (
                        <TouchableOpacity  style={{
                            width: width / 2, height: 100, backgroundColor: "#ffffff", flexDirection: 'row',
                            marginLeft: 0, marginBottom: 8, borderWidth: 2, borderColor: "#b2b2b2b2", justifyContent: 'center',
                            borderRadius: 10, marginRight: 0
                        }}>
                                <View style={{ justifyContent: 'center', alignSelf: 'center' }}>
                                    <Text style={{ fontSize: 20, fontWeight: 'bold', color: "black", textAlign: "center" }} >{ele.course} </Text>
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
