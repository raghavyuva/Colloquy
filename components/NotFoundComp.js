import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { useTheme } from '@react-navigation/native';
import LottieView from 'lottie-react-native';
const NotFoundComp = () => {
    const { colors } = useTheme();
    return (
        <View style={{ flex: 1, backgroundColor: colors.background }}>
              <View
                style={{
                  justifyContent: "center",
                  alignSelf: "center",
                  flex: 1,
                  marginTop:"50%"
                }}
              >
                <LottieView
                  autoPlay={true}
                  loop={false}
                  source={require("../animation/notfound.json")}
                  style={{
                    width: 400,
                    height: 300,
                    alignSelf: "center",
                  }}
                />
              </View>
            </View>
    )
}

export default NotFoundComp

const styles = StyleSheet.create({})
