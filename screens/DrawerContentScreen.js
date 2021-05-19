import {
    DrawerContentScrollView,
    DrawerItem
} from '@react-navigation/drawer';
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Linking, TouchableOpacity, Switch, Dimensions } from 'react-native';
import { FontAwesome5, MaterialCommunityIcons, SimpleLineIcons, Octicons, FontAwesome, MaterialIcons, AntDesign } from '@expo/vector-icons';
import { DataLayerValue } from '../Context/DataLayer';
import * as SecureStore from 'expo-secure-store';
import { Config } from '../config';
import { Text } from 'native-base';
import { DefaultTheme, DarkTheme, useTheme } from '@react-navigation/native';
import { useFonts } from 'expo-font';
const { width, height } = Dimensions.get('window');
import { Divider, } from 'react-native-paper';

export function DrawerContent(props) {
    const [{ userToken, defdarktheme, routename }, dispatch] = DataLayerValue()
    const [active, setactive] = useState(null);
    const { colors } = useTheme();
    const [loaded] = useFonts({
        Montserrat: require('../assets/Pacifico/Pacifico-Regular.ttf'),
    });
    if (!loaded) {
        return null;
    }
    const signOut = () => {
        SecureStore.deleteItemAsync('userToken');
        SecureStore.deleteItemAsync('User');
        dispatch({
            type: 'LOGOUT',
        })
    }
    return (
        <View style={styles(colors).container}>
            <View style={styles(colors).drawerContent}>
                <View style={styles(colors).userInfoSection}>
                    <View style={{ flexDirection: 'row', marginTop: 15 }}>

                        <View style={{ marginLeft: 15, flexDirection: 'column' }}>
                            <Text style={styles(colors).title}>Primish</Text>
                            <Text style={styles(colors).caption}>Unleash your potential</Text>
                        </View>
                    </View>
                </View>
                <DrawerContentScrollView {...props}>
                    <View style={styles(colors).drawerSection}>
                        <DrawerItem
                            icon={({ color, size }) => (
                                <AntDesign name="home" size={24} color={colors.primary} />)}
                            labelStyle={{ color: colors.text }}
                            label="Home"
                            style={styles(colors).bar}
                            onPress={
                                () => {
                                    dispatch({ type: 'ROUTEPROP', data: 'Home' })
                                    props.navigation.navigate('external', { screen: 'Home' })

                                }
                            }
                            activeBackgroundColor={colors.background}
                            activeTintColor='green'
                            focused={routename === 'Home'}
                        />
                        <DrawerItem
                            icon={({ color, size }) => (
                                <SimpleLineIcons name="user-follow" size={24} color={colors.primary} />)}
                            labelStyle={{ color: colors.text }}
                            label="Followers"
                            style={styles(colors).bar}
                            onPress={() => {
                                dispatch({ type: 'ROUTEPROP', data: 'Followers' })
                                props.navigation.navigate('external', { screen: 'follower' })

                            }}
                            focused={routename === 'Followers'}
                            activeBackgroundColor={colors.background}
                            activeTintColor='green'

                        />
                        <DrawerItem
                            icon={({ color, size }) => (
                                <SimpleLineIcons name="user-following" size={24} color={colors.primary} />)}
                            labelStyle={{ color: colors.text }}
                            label="Following"
                            style={styles(colors).bar}
                            onPress={() => {
                                props.navigation.navigate('external', { screen: 'following' })
                                dispatch({ type: 'ROUTEPROP', data: 'Following' })

                            }}
                            focused={routename === 'Following'}
                            activeBackgroundColor={colors.background}
                            activeTintColor='green'
                        />
                        <DrawerItem
                            icon={({ color, size }) => (
                                <MaterialCommunityIcons name="pen" size={24} color={colors.primary} />)}
                            labelStyle={{ color: colors.text }}
                            label="Interview"
                            style={styles(colors).bar}
                            onPress={() => {
                                dispatch({ type: 'ROUTEPROP', data: 'interview' })
                                props.navigation.navigate('external', { screen: 'notes' })
                            }}
                            focused={routename === 'interview'}
                            activeBackgroundColor={colors.background}

                            activeTintColor='green'
                        />
                        <DrawerItem
                            icon={({ color, size }) => (
                                <MaterialCommunityIcons name="feature-search" size={24} color={colors.primary} />
                            )}
                            label="Events"
                            labelStyle={{ color: colors.text }}
                            style={styles(colors).bar}
                            onPress={() => {
                                dispatch({ type: 'ROUTEPROP', data: 'events' })
                                props.navigation.navigate('external', { screen: 'events' })

                            }}
                            focused={routename === 'events'}
                            activeBackgroundColor={colors.background}

                            activeTintColor='green'
                        />

                        <DrawerItem
                            icon={({ color, size }) => (
                                <SimpleLineIcons name="support" size={24} color={colors.primary} />
                            )}
                            labelStyle={{ color: colors.text }}
                            label="Support"
                            style={styles(colors).bar}
                            onPress={() => Linking.openURL('https://guidemic.in')}

                        />
                        <DrawerItem
                            icon={({ color, size }) => (
                                <Octicons name="mail-read" size={24} color={colors.primary} />
                            )}
                            labelStyle={{ color: colors.text }}
                            label="Terms"
                            style={styles(colors).bar}
                            onPress={() => {
                                dispatch({ type: 'ROUTEPROP', data: 'segment' })
                                props.navigation.navigate('external', { screen: 'segment' })

                            }
                            }
                            focused={routename === 'segment'}
                            activeBackgroundColor={colors.background}

                            activeTintColor='green'

                        />
                        <DrawerItem
                            icon={({ color, size }) => (
                                <FontAwesome5 name="hire-a-helper" size={24} color={colors.primary} />
                            )}
                            labelStyle={{ color: colors.text }}
                            label="Hire Helper"
                            style={styles(colors).bar}
                            onPress={() => Linking.openURL('https://raghav.orak.in/')}

                        />
                        <DrawerItem
                            icon={({ color, size }) => (
                                <FontAwesome name="telegram" size={24} color={colors.primary} />
                            )}
                            labelStyle={{ color: colors.text }}
                            label="Join Channel"
                            style={styles(colors).bar}
                            onPress={() => Linking.openURL('https://t.me/orakin')}

                        />
                        <DrawerItem
                            icon={({ color, size }) => (
                                <MaterialIcons name="feedback" size={24} color={colors.primary} />
                            )}
                            labelStyle={{ color: colors.text }}
                            label="Feedback"
                            style={styles(colors).bar}
                            onPress={() => {
                                dispatch({ type: 'ROUTEPROP', data: 'feed' })
                                props.navigation.navigate('external', { screen: 'feedback' })

                            }}
                            focused={routename === 'feed'}
                            activeBackgroundColor={colors.background}

                            activeTintColor='green'
                        />
                    </View>
                </DrawerContentScrollView>
                <View style={defdarktheme ? styles(colors).bottomDrawerSection : styles(colors).botmsect}>
                    <DrawerItem
                        icon={({ color, size }) => (
                            <MaterialCommunityIcons name="exit-to-app" size={24} color={colors.primary} />
                        )}
                        label="Sign Out"
                        labelStyle={{ color: colors.text, }}
                        onPress={() => signOut()}
                    />
                </View>
            </View>
        </View>
    );
}
const styles = (colors) => StyleSheet.create({
    drawerContent: {
        flex: 1,

    },
    title: {
        fontSize: 28,
        marginTop: 15,
        fontWeight: 'bold',
        color: colors.text,
        fontFamily: 'Montserrat'
    },
    container:
    {
        flex: 1,
    }
    ,
    caption: {
        fontSize: 14,
        color: colors.text,
    },
    userInfoSection: {
        paddingLeft: 20,
    },
    row: {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    section: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 15,
    },
    paragraph: {
        fontWeight: 'bold',
        marginRight: 3,
    },
    drawerSection: {
        marginTop: 3,
    },
    bottomDrawerSection: {
        marginBottom: 15,
        borderTopColor: 'yellow',
        borderTopWidth: 2,

    },
    botmsect: {
        marginBottom: 15,
        borderTopColor: 'black',
        borderTopWidth: 2,

    },
    preference: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 12,
        paddingHorizontal: 16,
    },
    label: {
        color: Config.texticons
    },
    bar: { marginTop: 10, }
})