import React from 'react'
import { Text, StyleSheet, View, Image, Dimensions, ImageBackground, } from 'react-native'
import Header from '../components/Header';
const { width, height } = Dimensions.get('window');
import { Button } from 'native-base';
import { DefaultTheme, DarkTheme, useTheme } from '@react-navigation/native';

const Eventcard = (props) => {
    const { colors } = useTheme();
    return (
        <View style={{ width: width - 10, backgroundColor: colors.card, flexDirection: 'row',  marginBottom: 8, borderWidth: 2, borderColor: colors.border,flex:1,height:120 }}>
            <Image
                source={{ uri: 'https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.modulo.com.br%2Fwp-content%2Fuploads%2F2018%2F08%2Fwebinar.png&f=1&nofb=1'}}
                style={{ width: 120, height: 120,flex:1 }}
            />
            <View>
                <Text style={{ fontSize: 20, fontWeight: 'bold', color: colors.text, marginLeft: 10, }} >{props.item.Title}</Text>
                <Text style={{ fontSize: 14, fontWeight: '400', color: colors.text, marginLeft: 10, marginTop: 10, opacity: 0.7, }} numberOfLines={2}>{props.item.caption}</Text>
                <View style={{justifyContent:'flex-end',flexDirection:'row'}}>
                    <Text style={{ fontSize: 14, fontWeight: '400', color: colors.text, opacity: 0.7 }}>31 December</Text>
                    <Button style={{ width: 100, backgroundColor:colors.primary, marginTop: 1, justifyContent: 'center', borderRadius: 15,height:30 }}>
                        <Text style={{ textAlign: 'center', color: colors.text, fontWeight: 'bold' }}>Details</Text>
                    </Button>
                </View>
            </View>
        </View>
    )
}

export default Eventcard
const styles = StyleSheet.create({
    top: {
        height: '30%',
        marginBottom: 10
    }
})
