import React from 'react'
import PDFReader from 'rn-pdf-reader-js'
import { usePreventScreenCapture ,} from 'expo-screen-capture';
const Pdf = () => {
    usePreventScreenCapture();
    return (
        <PDFReader
            source={{
                uri: `http://africau.edu/images/default/sample.pdf`
            }}
        />
    )
}

export default Pdf;
