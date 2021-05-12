import React, { useState, useEffect } from 'react'
import { View, Text, SafeAreaView, FlatList } from 'react-native'
import Header from '../components/Header';
import Postcard from '../components/Postcard';
import { DataLayerValue } from '../Context/DataLayer';
import { Config } from '../config';
import * as Permissions from 'expo-permissions';
import * as Notifications from 'expo-notifications';

const Home = (props) => {
    const [{ userToken, postData }, dispatch] = DataLayerValue();
    const [Notify, setNotify] = useState('');
    const [refresh, setrefresh] = useState(false);
    const fetching = () => {
        setrefresh(true);
        fetch(`${Config.url}` + `/post`, {
            headers: {
                'Authorization': 'Bearer ' + `${userToken}`,
            },
            method: 'GET'
        })
            .then((response) => response.json())
            .then((responseJson) => {
                dispatch({
                    type: "POSTDATA",
                    postData: responseJson
                })
                setrefresh(false)
            })
    }
    useEffect(() => {
        let IsMounted = true;
        requestUserPermission();
        registerForPushNotifications();
        Notifications.addNotificationReceivedListener(_handleNotification);
        fetching();
        return () => {
            IsMounted = false;
        }
    }, [])
    const _handleNotification = notification => {
        setNotify(notification)
    };
    const requestUserPermission = async () => {
        const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
        let finalStatus = existingStatus;
        // only ask if permissions have not already been determined, because
        // iOS won't necessarily prompt the user a second time.
        if (existingStatus !== 'granted') {
            // Android remote notification permissions are granted during the app
            // install, so this will only ask on iOS
            const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
            finalStatus = status;
        }
        // Stop here if the user did not grant permissions 
        if (finalStatus !== 'granted') {
            return;
        }
    }
    const registerForPushNotifications = async () => {
        const token = await Notifications.getExpoPushTokenAsync();
        try {
            fetch(`${Config.url}` + `/notifytoken`, {
                method: 'PUT',
                headers: {
                    'Authorization': 'Bearer ' + `${userToken}`,
                    'Content-Type': "application/json",
                },
                body: JSON.stringify({
                    notifytoken: token.data
                })
            }).then(res => res.json()).then((resp) => {
            })
            console.log('token sent', token.data);
        } catch (error) {
            alert(error);
            console.log(error);
        }
    };

    const GoTo_top_function = () => {

        flatListRef.scrollToOffset({ animated: true, offset: 0 });

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
                data={postData}
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
