import React, { useState, useEffect } from 'react'
import { SafeAreaView, FlatList } from 'react-native'
import Header from '../components/Header';
import Postcard from '../components/Postcard';
import { DataLayerValue } from '../Context/DataLayer';
import { Config } from '../config';
const Home = (props) => {
    const [{ userToken, subscribeddata }, dispatch] = DataLayerValue();
    const [refresh, setrefresh] = useState(false)
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
        return () => {
        }
    }, [])
    const GoTo_top_function = () => {
        flatListRef.scrollToOffset({ animated: true, offset: 0 });
    }
    return (
        <SafeAreaView style={{ backgroundColor: '#000' }}>
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
