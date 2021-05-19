import React, { useEffect,useState } from 'react'
import { View, Text } from 'react-native'
import Pdf from '../components/Pdf'
import { DataLayerValue } from "../Context/DataLayer";
const Privacy = () => {
    const [{ userToken, postData, searchactive, UserId }, dispatch] = DataLayerValue();
    const [laod, setlaod] = useState(true)
    useEffect(() => {
        dispatch({ type: 'ROUTEPROP', data: 'segment' })
        setTimeout(() => {
            setlaod(false);
        }, 2000);
        return () => {

        }
    }, [])
    if (laod) {
        return(
            <>
            </>
        )
    }
    return (
        <Pdf />
    ) 
}

export default Privacy
