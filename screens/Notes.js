import React from 'react'
import { Text, StyleSheet, View, Image, Dimensions, ImageBackground, } from 'react-native'
const { width, height } = Dimensions.get('window');
import { Button } from 'native-base';
import { LinearGradient } from 'expo-linear-gradient';

import Headingbar from '../components/Header';
import { ScrollView, TouchableHighlight } from 'react-native-gesture-handler';
const Notes = (props) => {
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
    }]
    return (
        <View>
            <Headingbar {...props}/>
            <ScrollView style={{ marginBottom: 50,backgroundColor:'black' }}>
                {Data.map((ele) => {
                    return (
                        <TouchableHighlight>
                            <LinearGradient
                                colors={[colors[ele.id % colors.length], colors[2 % colors.length]]}
                                style={{ width: width - 30, height: 100, backgroundColor: "#ffffff", flexDirection: 'row',
                                 marginLeft: 10, marginBottom: 8, borderWidth: 2, borderColor: "#b2b2b2b2", justifyContent: 'center' ,
                                 borderRadius:10
                                 }}
                                 start={0.1,0.2}
                                 end={0.5,0.6}
                                 >
                                <View style={{ justifyContent: 'center', alignSelf: 'center' }}>
                                    <Text style={{ fontSize: 20, fontWeight: 'bold', color: "white", textAlign: "center" }} >{ele.course} </Text>
                                </View>
                            </LinearGradient>
                        </TouchableHighlight>
                    )
                })}
            </ScrollView>
        </View>
    )
}

export default Notes
