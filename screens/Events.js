import React, { useState, useEffect } from 'react'
import { Text, StyleSheet, View, Dimensions, ImageBackground, FlatList } from 'react-native'
import Eventcard from '../components/Eventcard'
import Header from '../components/Header';
const { width, } = Dimensions.get('window');
import { Config } from '../config';
import { DataLayerValue } from '../Context/DataLayer';
import LottieView from 'lottie-react-native';
import { DefaultTheme, DarkTheme, useTheme } from '@react-navigation/native';

const Events = (props) => {
    const [{ userToken, EventData }, dispatch] = DataLayerValue()
    const [refresh, setrefresh] = useState(false)
    const [load, setload] = useState(true);
    const {colors} = useTheme();

    useEffect(() => {
        fetching()
        setTimeout(() => {
            setload(false);
          }, 2000); 
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
            })
    }
    if (load) { 
        return (
          <View style={{ justifyContent: "center", flex: 1, backgroundColor:colors.background }}>
            <LottieView
              loop={true}
              autoPlay={true}
              source={require('../animation/5328-loading-11.json')}
              style={{ width: 400, height: 400 }}
            />
          </View>
        )
      }
    return (
        <View >
            <Header {...props} />
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
                style={{ }}
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