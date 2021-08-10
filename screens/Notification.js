import React, { useState, useEffect } from 'react';
import { StyleSheet, FlatList, } from 'react-native';
import { View, } from 'native-base';
import Header from '../components/Header';
import { Config } from '../config';
import Notify from '../components/Notify';
import LoadingComp from '../components/LoadingComp';
import { useSelector, useDispatch } from 'react-redux';
import { setNotifications } from '../redux/actions/NotifyAction';

const Notification = (props) => {
    const [refresh, setrefresh] = useState(false)
    const [load, setload] = useState(true);
    const user = useSelector((state) => state.userDetails);
    const notifylist = useSelector((state) => state.userDetails.notificationlist);
    const dispatch = useDispatch()
    useEffect(() => {
        fetching();

        return () => {
            
        }
    },[])
    const fetching = () => {
        try {
            fetch(`${Config.url}` + `/savednotification`, {
                headers: {
                    'Authorization': 'Bearer ' + `${user.userToken}`,
                },
                method: 'GET'
            })
                .then((response) => response.json())
                .then((responseJson) => {
                    dispatch(setNotifications(responseJson));
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
            <LoadingComp />
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
const styles = (colors) => StyleSheet.create({

})