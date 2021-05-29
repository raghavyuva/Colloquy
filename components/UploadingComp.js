import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import LottieView from 'lottie-react-native';

const UploadingComp = () => {
    return (
       
            <LottieView
                loop={true}
                autoPlay={true}
                source={require('../animation/4510-uploading.json')}
            />
    )
}

export default UploadingComp

const styles = StyleSheet.create({})
