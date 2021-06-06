import React from 'react'
import { StyleSheet, Image } from 'react-native'
import { useTheme } from '@react-navigation/native';
import { Button, View, Text, Card, CardItem, Title } from 'native-base';

const Welcomecard = (props) => {
    const { colors } = useTheme();
    const onsignuppress = () => {
        props.navigation.navigate('signup');
    }
    const onloginpress = () => {
        props.navigation.navigate('login');
    }
    return (
        <View>
            <Card style={{ backgroundColor: colors.background, borderColor: colors.background, borderWidth: 0 }} >
                <Title style={{ fontFamily: 'Montserrat', fontSize: 52, color: colors.text }}>VtYuva</Title>
                <Text style={styles(colors).caption}>Unleash your potential</Text>
            </Card>
            <Card style={{ backgroundColor: colors.background, borderColor: colors.background }}>
                <Image source={require('../assets/logo.png')} style={{ width: 300, height: 300 }} />
            </Card>
            <Card style={{ flexDirection: "row", justifyContent: 'space-between', borderColor: colors.background, backgroundColor: colors.background, }}>
                <CardItem style={{ backgroundColor: colors.background, borderColor: colors.background }}>
                    <Button style={{ backgroundColor: colors.card, borderColor: 'grey', borderWidth: 1 }} onPress={onloginpress}>
                        <Text style={{ color: colors.text, textTransform: 'capitalize' }}>Login</Text>
                    </Button>
                </CardItem>
                <CardItem style={{ backgroundColor: colors.background, borderColor: colors.background }}>
                    <Button style={{ backgroundColor: colors.card, borderColor: 'grey', borderWidth: 1 }} onPress={onsignuppress}>
                        <Text style={{ color: colors.text, textTransform: 'capitalize' }}>signup</Text>
                    </Button>
                </CardItem>
            </Card>
        </View>
    )
}

export default Welcomecard

const styles = (colors) => StyleSheet.create({
    caption: {
        fontSize: 14,
        color: 'grey',
        textAlign: 'right'
    },
})
