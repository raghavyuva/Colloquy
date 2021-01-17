import React from 'react'
import { StyleSheet, Dimensions, Image } from 'react-native'
const { width: screenWidth, } = Dimensions.get('window');
import { Button, Text, View, } from 'native-base';
const Welcome = (props) => {
    const onstepinpress = () => {
        props.navigation.navigate('login');
    }
    return (
        <View style={styles.screen}>
            <Text style={{
                textAlign: "center", color: '#f3f',
                fontSize: 28, fontWeight: 'bold', backgroundColor: 'black',
                width: 200, justifyContent: 'center',
                alignSelf: 'center',
                marginBottom: 50
            }}>
                Primish</Text>
            <Image source={require('../assets/social.png')} style={styles.background} />
            <Button onPress={onstepinpress} style={{ position: 'absolute', bottom: 0, width: screenWidth, justifyContent: 'center', backgroundColor: '#5067FF' }}>
                <Text>step in</Text>
            </Button>
        </View>
    )
}

export default Welcome
const styles = StyleSheet.create({
    screen: {
        justifyContent: 'center',
        flex: 1,
        backgroundColor: 'white'
    },
    background: {
        width: screenWidth,
        height: 300,
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

