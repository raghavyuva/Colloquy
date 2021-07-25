import React, { useState, useEffect } from 'react'
import { Text, StyleSheet, View, FlatList } from 'react-native'
import Eventcard from '../components/Eventcard'
import Header from '../components/Header';
import { Config } from '../config';
import { useTheme } from '@react-navigation/native';
import LoadingComp from '../components/LoadingComp';
import { useSelector, useDispatch } from 'react-redux';
import { setEvents } from '../redux/actions/EventAction';

const Events = (props) => {
    const [refresh, setrefresh] = useState(false)
    const [load, setload] = useState(true);
    const { colors } = useTheme();
    const user = useSelector((state) => state.userDetails);
    const EventData = useSelector(state => state.EventData.events);
    const dispatch = useDispatch();
    useEffect(() => {
        fetching()
        return () => {
        }
    }, [])
    const fetching = () => {
        setrefresh(true)
        fetch(`${Config.url}` + `/Event`, {
            headers: {
                'Authorization': 'Bearer ' + `${user.userToken}`,
            },
            method: 'GET'
        })
            .then((response) => response.json())
            .then((responseJson) => {
                dispatch(setEvents(responseJson));
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