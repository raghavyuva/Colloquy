import React, { useState, useEffect } from 'react'
import { SafeAreaView, FlatList, View } from 'react-native'
import Header from '../components/Header';
import Postcard from '../components/Postcard';
import { DataLayerValue } from '../Context/DataLayer';
import { Config } from '../config';
import LottieView from 'lottie-react-native';
import { DefaultTheme, DarkTheme, useTheme } from '@react-navigation/native';

const Home = (props) => {
    const [{ userToken, subscribeddata }, dispatch] = DataLayerValue();
    const [refresh, setrefresh] = useState(false);
    const [load, setload] = useState(true);
    const fetching = () => {
        setrefresh(true);
        fetch(`${Config.url}` + `/subscription`, {
            headers: {
                'Authorization': 'Bearer ' + `${userToken}`,
            },
            method: 'GET'
        })
            .then((response) => response.json())
            .then((responseJson) => {
                dispatch({
                    type: "SUBSCRIPTION",
                    data: responseJson
                })
                setrefresh(false)
            })
    }
    useEffect(() => {
        fetching();
        setTimeout(() => {
            setload(false)
        }, 2000);
        return () => {
        }
    }, [])
    const {colors} = useTheme();

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
        <SafeAreaView >
            <Header {...props} />
            <FlatList
                ref={(ref) => { flatListRef = ref; }}
                renderItem={({ item }) => {
                    return (
                        <Postcard item={item} {...props} />
                    );
                }}
                keyExtractor={(item, index) => index.toString()}
                data={subscribeddata}
                onEndReached={fetching && GoTo_top_function}
                scrollEnabled
                onScrollAnimationEnd
                scrollToOverflowEnabled
                onEndReachedThreshold={0}
                style={{ marginBottom: 50 }}
                refreshing={refresh}
                onRefresh={fetching}
            />
        </SafeAreaView>
    )
}

export default Home