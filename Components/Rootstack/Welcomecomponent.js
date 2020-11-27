import React, { Component } from 'react';
import {
    ImageBackground,
    SafeAreaView, StyleSheet, Dimensions,Image
} from 'react-native';
import { Container, Header, Content, Item, Input, Button, Text, View, CheckBox, ListItem, Body, AppLoading } from 'native-base';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
// import {Actions} from 'react-native-router-flux';
const { width: screenWidth,height:screenHeight } = Dimensions.get('window');
export default class Welcomepage extends React.Component {
    constructor(props) {
        super(props);
    };
    state = {
        loading: true
    }
    async componentDidMount() {
        await Font.loadAsync({
            'Roboto': require('native-base/Fonts/Roboto.ttf'),
            'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
            ...Ionicons.font,
        })
        this.setState({ loading: false })
    }
    onstepinpress = () => {
        this.props.navigation.navigate('login');
    }
    render() {
        if (this.state.loading) {
            return (
                <View></View>
            );
        }
        return (
            <View style={styles.screen}>
                <Image source={{uri:'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP.-dkFR6eMe-GT-2CI7vwnIAHaFj%26pid%3DApi&f=1'}} style={styles.background} />
                <Text>Welcome tO primish</Text>
                <Button onPress={this.onstepinpress} style={{ position: 'absolute', bottom: 0, width: screenWidth, justifyContent: 'center', backgroundColor: '#5067FF' }}>
                    <Text>step in</Text>
                </Button>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    screen: {
        justifyContent: 'center',
        backgroundColor: '#0E043B',
        flex:1
    },
    background: {
        width: screenWidth,
        height: 300,
        flex:0.2,
        position:'absolute',
        top:60
    },
    button: {
        backgroundColor: 'black',
        justifyContent: 'center',
        width: "100%",
        position: 'absolute',
        bottom: 0,
        borderRadius: 3
    },
    texts: {
        textAlign: 'center'
    }
});

