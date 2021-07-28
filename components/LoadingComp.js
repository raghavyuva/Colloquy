import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { DefaultTheme, DarkTheme, useTheme } from '@react-navigation/native';
import LottieView from 'lottie-react-native';

const LoadingComp = (props) => {
    const { colors } = useTheme();

    return (
        <View style={{ justifyContent: "center", flex: 1, backgroundColor: colors.background }}>
            <LottieView
                loop={true}
                autoPlay={true}
                source={require('../animation/7751-load.json')}
            />
        </View>
    )
}

export default LoadingComp

const styles = StyleSheet.create({})
