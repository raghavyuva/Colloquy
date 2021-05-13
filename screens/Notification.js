import React, { useState, useEffect } from 'react';
import { StyleSheet, FlatList, } from 'react-native';
import { View, } from 'native-base';
import Header from '../components/Header';
import { DataLayerValue } from '../Context/DataLayer'
import { Config } from '../config';
import Notify from '../components/Notify';
import LottieView from 'lottie-react-native';
import { DefaultTheme, DarkTheme, useTheme } from '@react-navigation/native';

const Notification = (props) => {
    const [{ userToken, notifylist, UserId }, dispatch] = DataLayerValue();
    const [refresh, setrefresh] = useState(false)
    const [load, setload] = useState(true);
    const {colors} = useTheme();
    useEffect(() => {
        fetching();
       
        return () => {

        }
    }, [])
    const fetching = () => {
        try {
            console.log(`${Config.url}` + `/savednotification`,)
            fetch(`${Config.url}` + `/savednotification`, {
                headers: {
                    'Authorization': 'Bearer ' + `${userToken}`,
                },
                method: 'GET'
            })
                .then((response) => response.json())
                .then((responseJson) => {
                    console.log(responseJson)
                    dispatch({
                        type: "NOTIFYLIST",
                        data: responseJson
                    })
                    setload(false);
                })
        } catch (e) {
            console.log(e);
        }
    }
    const GoTo_top_function = () => {
        flatListRef.scrollToOffset({ animated: true, offset: 0 });
    }
    
    if (load) {
        return (
            <View style={{ justifyContent: "center", flex: 1, backgroundColor: colors.background }}>
                <LottieView
                    loop={true}
                    autoPlay={true}
                    source={require('../animation/5328-loading-11.json')}
                    style={{ width: 400, height: 400 }}
                />
            </View>
        );
    }
    return (
        <View>
            <Header {...props} />
            <FlatList
                data={notifylist}
                renderItem={({ item }) => {
                    return (
                        <Notify item={item} {...props} />
                    );
                }}
                keyExtractor={item => item._id}
                onEndReached={fetching && GoTo_top_function}
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

export default Notification
const styles =(colors)=> StyleSheet.create({

})