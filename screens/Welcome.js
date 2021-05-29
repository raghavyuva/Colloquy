import React from 'react'
import { StyleSheet, Dimensions, Image } from 'react-native'
const { width: screenWidth, } = Dimensions.get('window');
import { Button, Text, View, Card, CardItem, Title } from 'native-base';
import { useTheme } from '@react-navigation/native';
import { useFonts } from 'expo-font';

const Welcome = (props) => {
    const { colors } = useTheme();
    const [loaded] = useFonts({
        Montserrat: require('../assets/Pacifico/Pacifico-Regular.ttf'),
    });
    if (!loaded) {
        return null;
    }
    const onsignuppress = () => {
        props.navigation.navigate('signup');
    }
    const onloginpress = () => {
        props.navigation.navigate('login');
    }
    return (
        <View style={styles(colors).screen}>
            <Card style={{ backgroundColor: colors.background, borderColor: colors.background, borderWidth: 0 }} >
                <Title style={{ fontFamily: 'Montserrat', fontSize: 52, color: colors.text }}>VtYuva</Title>
                <Text style={styles(colors).caption}>Unleash your potential</Text>
            </Card>
            <Card style={{ backgroundColor: colors.background, borderColor: colors.background }}>
                <Image source={{ uri: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcrmtipoftheday.com%2Fwp-content%2Fuploads%2F2017%2F10%2FPowerApps-Logo.png&f=1&nofb=1" }} style={{ width: 200, height: 200 }} />
            </Card>
            <Card style={{ flexDirection: "row", justifyContent: 'space-around', margin: 5, borderColor: colors.background, backgroundColor: colors.background, }}>
                <CardItem style={{ backgroundColor: colors.background, borderColor: colors.background }}>
                    <Button style={{ backgroundColor: colors.card, }} onPress={onloginpress}>
                        <Text>Login</Text>
                    </Button>
                </CardItem>
                <CardItem style={{ backgroundColor: colors.background, borderColor: colors.background }}>
                    <Button style={{ backgroundColor: colors.card }} onPress={onsignuppress}>
                        <Text>signup</Text>
                    </Button>
                </CardItem>
            </Card>
        </View>
    )
}

export default Welcome
const styles = (colors) => StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: colors.background,
        justifyContent: 'center',
        alignItems: 'center'
    },
    caption: {
        fontSize: 14,
        color: 'grey',
        textAlign: 'right'
    },
});

