import React, { useState, useEffect } from 'react'
import { Text, StyleSheet, View, Dimensions, ImageBackground, FlatList } from 'react-native'
import Eventcard from '../components/Eventcard'
import Header from '../components/Header';
const { width, } = Dimensions.get('window');
import { Config } from '../config';
import { DataLayerValue } from '../Context/DataLayer';
import LottieView from 'lottie-react-native';
import { DefaultTheme, DarkTheme, useTheme } from '@react-navigation/native';
import LoadingComp from '../components/LoadingComp';

const Events = (props) => {
    const [{ userToken, EventData }, dispatch] = DataLayerValue()
    const [refresh, setrefresh] = useState(false)
    const [load, setload] = useState(true);
    const { colors } = useTheme();

    useEffect(() => {
        fetching()
        dispatch({ type: 'ROUTEPROP', data: 'events' })
        return () => {
        }
    }, [])
   
    const fetching = () => {
        setrefresh(true)
        fetch(`${Config.url}` + `/Event`, {
            headers: {
                'Authorization': 'Bearer ' + `${userToken}`,
            },
            method: 'GET'
        })
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson)
                dispatch({
                    type: "EVENTS",
                    eventdata: responseJson
                })
                setrefresh(false);
                setload(false);
            })
    }
    if (load) {
        return (
            <LoadingComp />
        )
    }
    return (
        <View >
            <Header {...props} />
            <Text style={{ color: colors.text, fontSize: 24, fontWeight: 'bold', marginLeft: 10, marginBottom: 15 }}>
                List Of Events
            </Text>
            <FlatList
                ref={(ref) => { flatListRef = ref; }}
                renderItem={({ item }) => {
                    return (
                        <Eventcard item={item} {...props} />
                    );
                }}
                keyExtractor={(item, index) => index.toString()}
                data={EventData}
                scrollEnabled
                onScrollAnimationEnd
                scrollToOverflowEnabled
                onEndReachedThreshold={0}
                style={{}}
                ListEmptyComponent={() => {
                    return (
                        <View>
                            <Text>Nothing Here To Show</Text>
                        </View>
                    )
                }}
                refreshing={refresh}
                onRefresh={fetching}
            />

        </View>
    )
}

export default Events
const styles = StyleSheet.create({
    top: {
        height: '30%',
        marginBottom: 10
    }
})