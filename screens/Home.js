import React, { useState, useEffect } from 'react'
import { View, Text, SafeAreaView, FlatList } from 'react-native'
import Header from '../components/Header';
import Postcard from '../components/Postcard';
import { DataLayerValue } from '../Context/DataLayer';
import { Config } from '../config';
import * as Notifications from 'expo-notifications';
import { DefaultTheme, DarkTheme, useTheme } from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import Constants from 'expo-constants';

const Home = (props) => {
    const [{ userToken, postData }, dispatch] = DataLayerValue();
    const [Notify, setNotify] = useState('');
    const [refresh, setrefresh] = useState(false);
    const [loading, setloading] = useState(true)
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
                setloading(false)
            })
    }
    const { colors } = useTheme();

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

    async function requestUserPermission() {
        let token;
        if (Constants.isDevice) {
          const { status: existingStatus } = await Notifications.getPermissionsAsync();
          let finalStatus = existingStatus;
          if (existingStatus !== 'granted') {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
          }
          if (finalStatus !== 'granted') {
            alert('Failed to get push token for push notification!');
            return;
          }
          token = (await Notifications.getExpoPushTokenAsync()).data;
          console.log(token);
        } else {
          alert('Must use physical device for Push Notifications');
        }
      
        if (Platform.OS === 'android') {
          Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
          });
        }
      
        return token;
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
    if (loading) {
        return (
            <View style={{ justifyContent: "center", flex: 1, backgroundColor: colors.background }}>
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
