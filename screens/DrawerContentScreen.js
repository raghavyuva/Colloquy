import {
    DrawerContentScrollView,
    DrawerItem
} from '@react-navigation/drawer';
import React, { useState } from 'react';
import { StyleSheet, View, Linking, TouchableOpacity, Switch } from 'react-native';
import { FontAwesome5, MaterialCommunityIcons, SimpleLineIcons, Octicons, FontAwesome, MaterialIcons, AntDesign } from '@expo/vector-icons';
import { DataLayerValue } from '../Context/DataLayer';
import * as SecureStore from 'expo-secure-store';
import { Config } from '../config';
import { Text } from 'native-base';
import { DefaultTheme, DarkTheme, useTheme } from '@react-navigation/native';
import { useFonts } from 'expo-font';

export function DrawerContent(props) {
    const [{ userToken, defdarktheme }, dispatch] = DataLayerValue()
    const [activebar, setactivebar] = useState(true);
    const [cnt, setcnt] = useState(0);
    const [toggle, setToggle] = useState(true);
    const toggleFunction = () => {
        setToggle(!toggle);
        dispatch({ type: 'THEME', data: !defdarktheme })
    };
    const { colors } = useTheme();
    const [load, setload] = useState(true)
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

                                    props.navigation.navigate('external', { screen: 'Home' })

                                }
                            }

                        />
                        <DrawerItem
                            icon={({ color, size }) => (
                                <SimpleLineIcons name="user-follow" size={24} color={colors.primary} />)}
                            labelStyle={{ color: colors.text }}
                            label="Followers"
                            style={styles(colors).bar}
                            onPress={() => {

                                props.navigation.navigate('external', { screen: 'follower' })

                            }}


                        />
                        <DrawerItem
                            icon={({ color, size }) => (
                                <SimpleLineIcons name="user-following" size={24} color={colors.primary} />)}
                            labelStyle={{ color: colors.text }}
                            label="Following"
                            style={styles(colors).bar}
                            onPress={() => {
                                props.navigation.navigate('external', { screen: 'following' })

                            }}

                        />
                        <DrawerItem
                            icon={({ color, size }) => (
                                <MaterialCommunityIcons name="pen" size={24} color={colors.primary} />)}
                            labelStyle={{ color: colors.text }}
                            label="Mock Interview"
                            style={styles(colors).bar}
                            onPress={() => {
                                props.navigation.navigate('external', { screen: 'notes' })
                            }}
                        />

                        <DrawerItem
                            icon={({ color, size }) => (
                                <MaterialCommunityIcons name="feature-search" size={24} color={colors.primary} />
                            )}
                            label="Events"
                            labelStyle={{ color: colors.text }}
                            style={styles(colors).bar}
                            onPress={() => {
                                props.navigation.navigate('external', { screen: 'events' })

                            }}
                            activeBackgroundColor='#2e235e'
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
                                props.navigation.navigate('external', { screen: 'segment' })

                            }
                            }


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
                                props.navigation.navigate('external', { screen: 'feedback' })

                            }}

                        />
                    </View>
                </DrawerContentScrollView>
                <View style={{ flexDirection: 'row' ,justifyContent:'space-between',}}>
                        <Text style={{ color: colors.text }}>{toggle ? "Light Theme" : 'Dark Theme'}</Text>
                        <Switch
                            trackColor={{ false: 'red', true: 'purple' }}
                            thumbColor={colors.primary}
                            ios_backgroundColor="gray"
                            onValueChange={toggleFunction}
                            value={toggle}
                        />
                    </View>
                <View style={defdarktheme?styles(colors).bottomDrawerSection:styles(colors).botmsect}>
                    <DrawerItem
                        icon={({ color, size }) => (
                            <MaterialCommunityIcons name="exit-to-app" size={24} color={colors.primary} />
                        )}
                        label="Sign Out"
                        labelStyle={{ color: colors.text ,}}
                        onPress={() => signOut()}
                    />
                </View>
            </View>
        </View>
    );
}
const styles=(colors)=> StyleSheet.create({
    drawerContent: {
        flex: 1,
    },
    title: {
        fontSize: 28,
        marginTop: 15,
        fontWeight: 'bold',
        color: 'blue',
        fontFamily:'Montserrat'
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
        borderTopColor:'yellow',
        borderTopWidth: 2,

    },
    botmsect:{
        marginBottom: 15,
        borderTopColor:'black',
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
    bar: { marginTop: 20, backgroundColor: colors.card,borderColor: colors.border,borderWidth:2}
})