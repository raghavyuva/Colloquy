import React from 'react'
import { StyleSheet } from 'react-native'
import { View, } from 'native-base';
import { useTheme } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import Welcomecard from '../components/welcomecard';
import GoogleAuthComp from '../components/GoogleAuthComp';

const Welcome = (props) => {
    const { colors } = useTheme();
    const [loaded] = useFonts({
        Montserrat: require('../assets/Pacifico/Pacifico-Regular.ttf'),
    });
    if (!loaded) {
        return null;
    }
    return (
        <View style={styles(colors).screen}>
            <Welcomecard  {...props} />
            {/* <GoogleAuthComp {...props} /> */}
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

});

