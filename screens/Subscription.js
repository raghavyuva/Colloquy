import React, { useState, useEffect } from 'react'
import { SafeAreaView, FlatList, View, Dimensions, Image } from 'react-native'
import Header from '../components/Header';
import Postcard from '../components/Postcard';
import { DataLayerValue } from '../Context/DataLayer';
import { Config } from '../config';
import LottieView from 'lottie-react-native';
import { DefaultTheme, DarkTheme, useTheme } from '@react-navigation/native';
import LoadingComp from '../components/LoadingComp';
const { width, height } = Dimensions.get('window');

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
                setload(false);
            })
    }
    useEffect(() => {
        fetching();
        return () => {
        }
    }, [])
    const { colors } = useTheme();
    const GoTo_top_function = () => {
        flatListRef.scrollToOffset({ animated: true, offset: 0 });
    }
    if (load) {
        return (
            <LoadingComp />
        );
    }

    if (subscribeddata.length == null || subscribeddata.length == 0 || subscribeddata.length == undefined || subscribeddata == null) {
        return (
            <View style={{ flex: 1, backgroundColor: colors.background, }}>
                <Header {...props} />
                <View style={{ justifyContent: 'center', alignSelf: 'center', flex: 1 }}>
                    <Image
                        source={{ uri: 'https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fcdn.onlinewebfonts.com%2Fsvg%2Fimg_412721.png&f=1&nofb=1' }}
                        style={{ width: width, height: 400, alignSelf: 'center', marginLeft: 2, justifyContent: 'center', }}
                    />
                </View>

            </View>
        )
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
