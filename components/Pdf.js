import React from 'react'
import { View, Text } from 'react-native'
import PDFReader from 'rn-pdf-reader-js'
import { usePreventScreenCapture ,} from 'expo-screen-capture';
const Pdf = () => {
    usePreventScreenCapture();
    return (
        <PDFReader
            source={{
                uri: `https://guidemic.in/wp-content/uploads/2020/10/dsa-mod-1.pdf`
            }}
        />
    )
}

export default Pdf
