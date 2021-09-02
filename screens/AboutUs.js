import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { WebView } from 'react-native-webview';

const AboutUs = () => {
    return <WebView source={{ uri: 'https://raghavyuva.com/' }} />;
}

export default AboutUs
 
const styles = StyleSheet.create({})
