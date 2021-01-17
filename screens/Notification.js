import React, { useState, useEffect } from 'react';
import { StyleSheet, FlatList, } from 'react-native';
import { View, } from 'native-base';
import Header from '../components/Header';
import { DataLayerValue } from '../Context/DataLayer'
import { Config } from '../config';
import Notify from '../components/Notify';
import LottieView from 'lottie-react-native';

const Notification = (props) => {
    const [{ userToken, notifylist, UserId }, dispatch] = DataLayerValue();
    const [refresh, setrefresh] = useState(false)
    const [load, setload] = useState(true);
    useEffect(() => {
        fetching();
        setTimeout(() => {
            setload(false)
        }, 2000);
        return () => {

        }
    }, [])
    const fetching = () => {
        try {
            const Listener = fetch(`${Config.url}` + `/savednotification`, {
                headers: {
                    'Authorization': 'Bearer ' + `${userToken}`,
                }
            })
                .then((response) => response.json())
                .then((responseJson) => {
                    dispatch({
                        type: "NOTIFYLIST",
                        data: responseJson
                    })
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
            <View style={{ justifyContent: "center", flex: 1, backgroundColor: '#0E043B' }}>
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
const styles = StyleSheet.create({
    header: {
        backgroundColor: '#0E043B',
    },
    feeds: {
        color: "#FFF",
        fontSize: 26,
        marginTop: 10
    },
    follow: {
        backgroundColor: '#053e42'
    },
    view: {
        color: '#053e42'
    }
})