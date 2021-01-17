import React, { useState, useEffect } from 'react'
import { Text, StyleSheet, View, Dimensions, ImageBackground, FlatList } from 'react-native'
import Eventcard from '../components/Eventcard'
import Header from '../components/Header';
const { width, } = Dimensions.get('window');
import { Config } from '../config';
import { DataLayerValue } from '../Context/DataLayer';

const Events = (props) => {
    const [{ userToken, EventData }, dispatch] = DataLayerValue()
    const [refresh, setrefresh] = useState(false)

    useEffect(() => {
        fetching()
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
    return (
        <View style={{ backgroundColor: "#0b032b" }}>
            <Header {...props} />
            <View style={styles.top}>
                <ImageBackground
                    source={require('../assets/event.png')}
                    style={{ width: width, height: "100%" }}
                >
                    <View style={{ position: "absolute", bottom: 0 }}>
                        <Text style={{ fontSize: 24, fontWeight: 'bold', color: "black" }}>5 Upcoming Events Listed</Text>
                    </View>
                </ImageBackground>
            </View>
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
                style={{ marginBottom: 50 }}
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