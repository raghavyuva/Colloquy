import { StyleSheet, Text, View } from 'react-native'
import Svg, { Stop, Path, Defs, LinearGradient as Fgrad, } from 'react-native-svg';
import { useTheme } from '@react-navigation/native';
import React from 'react';
const WaveComp = () => {
    const { colors } = useTheme();

    return (
        <View style={{ height: '30%' }}>
            <Svg height="45%" width="100%" id="svg" viewBox="0 0 1440 400"
                xmlns="http://www.w3.org/2000/svg" class="transition duration-300 ease-in-out delay-150">
                <Defs><Fgrad id="gradient">
                    <Stop offset="20%" stopColor={colors.card}>
                    </Stop><Stop offset="80%"
                        stopColor={colors.primary}></Stop>
                </Fgrad></Defs>
                <Path d="M 0,400 C 0,400 0,200 0,200 C 80.54545454545456,234.19138755980862 
        161.09090909090912,268.38277511961724 252,260 C 342.9090909090909,251.61722488038276 
        444.18181818181813,200.66028708133967 548,177 C 651.8181818181819,153.33971291866033 
        758.1818181818182,156.97607655502395 872,180 C 985.8181818181818,203.02392344497605 1107.090909090909,245.43540669856458 1203,252 
        C 1298.909090909091,258.5645933014354 1369.4545454545455,229.2822966507177 1440,200 C 1440,200 1440,400 1440,400 Z"
                    stroke="none" stroke-width="0" fill="url(#gradient)"
                    class="transition-all duration-300 ease-in-out delay-150" transform="rotate(-180 720 200)">
                </Path></Svg>
            <Text style={styles(colors).header}>
                Get On the Board
           </Text>

        </View>
    )
}

export default WaveComp

const styles = (colors) => StyleSheet.create({
    header: {
        fontFamily: 'Montserrat',
        fontSize: 40,
        color: colors.text
    },
})
