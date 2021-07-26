import {
    DrawerContentScrollView,
    DrawerItem
} from '@react-navigation/drawer';
import React, { useState } from 'react';
import { StyleSheet, View, Linking, Text, Image, TouchableOpacity } from 'react-native';
import { FontAwesome5, MaterialCommunityIcons, SimpleLineIcons, Octicons, FontAwesome, MaterialIcons, AntDesign } from '@expo/vector-icons';
import * as SecureStore from 'expo-secure-store';
import {
    Avatar,
} from 'react-native-paper';
import { useFonts } from 'expo-font';
import { useTheme } from '@react-navigation/native';
export function DrawerContent(props) {
    const { colors } = useTheme();
    const [loaded] = useFonts({
        Montserrat: require('../assets/Pacifico/Pacifico-Regular.ttf'),
    });

    // console.log(chatteeOnline)
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
        <View style={{ flex: 1, backgroundColor: colors.card }}>
            <View style={styles(colors).drawerContent}>
                <View style={styles(colors).userInfoSection}>
                    <View style={{ flexDirection: 'row', marginTop: 5, }}>
                        <View style={{ marginLeft: 15, flexDirection: 'column', justifyContent: "center", alignSelf: 'center' }}>
                            <Text style={{
                                fontSize: 38,
                                marginTop: 5,
                                color: colors.text,
                                fontFamily: 'Montserrat',
                                textAlign: 'center'
                            }}>VtYuva</Text>
                            <Text style={styles(colors).caption}>Unleash your potential</Text>
                        </View>
                    </View>
                </View>
                <DrawerContentScrollView {...props}>
                    <View style={styles(colors).drawerSection}>
                        <DrawerItem
                            icon={({ color, size }) => (
                                <AntDesign name="home" size={24} color={colors.text} />)}
                            labelStyle={{ color: colors.text, }}
                            label="Home"
                            onPress={
                                () => {
                                    props.navigation.navigate('external', { screen: 'Home' })
                                }
                            } onPress={
                                () => {
                                    props.navigation.navigate('external', { screen: 'Home' })
                                }
                            }
                        />
                        <DrawerItem
                            icon={({ color, size }) => (
                                <MaterialCommunityIcons name="account-plus" size={24} color={colors.text} />)}
                            labelStyle={{ color: colors.text }}
                            label="Followers"
                            onPress={() => {
                                // dispatch({ type: 'ROUTEPROP', data: 'Followers' })
                                props.navigation.navigate('external', { screen: 'follower' })

                            }}
                        />
                        <DrawerItem
                            icon={({ color, size }) => (
                                <MaterialCommunityIcons name="account-check" size={24} color={colors.text} />)}
                            labelStyle={{ color: colors.text }}
                            label="Following"

                            onPress={() => {
                                props.navigation.navigate('external', { screen: 'following' })
                                // dispatch({ type: 'ROUTEPROP', data: 'Following' })

                            }}
                        />
                        <DrawerItem
                            icon={({ color, size }) => (
                                <MaterialCommunityIcons name="account-voice" size={24} color={colors.text} />)}
                            labelStyle={{ color: colors.text }}
                            label="Mock interview"
                            onPress={() => {
                                // dispatch({ type: 'ROUTEPROP', data: 'interview' })
                                props.navigation.navigate('external', { screen: 'interview' })
                            }}
                        />
                        <DrawerItem
                            icon={({ color, size }) => (
                                <MaterialIcons name="event-seat" size={24} color={colors.text} />)}
                            labelStyle={{ color: colors.text }}
                            label="Events"
                            onPress={() => {
                                // dispatch({ type: 'ROUTEPROP', data: 'events' })
                                props.navigation.navigate('external', { screen: 'events' })

                            }}
                        />
                        <DrawerItem
                            icon={({ color, size }) => (
                                <MaterialIcons name="note" size={24} color={colors.text} />)}
                            labelStyle={{ color: colors.text }}
                            label="Notes"
                            onPress={() => {
                                // dispatch({ type: 'ROUTEPROP', data: 'events' })
                                props.navigation.navigate('external', { screen: 'rendernotes' })
                            }}
                        />
                        <DrawerItem
                            icon={({ color, size }) => (
                                <MaterialIcons name="file-upload" size={24} color={colors.text} />)}
                            labelStyle={{ color: colors.text }}
                            label="Add Notes"
                            onPress={() => {
                                // dispatch({ type: 'ROUTEPROP', data: 'events' })
                                props.navigation.navigate('external', { screen: 'uploadNotes' })
                            }}
                        />

                        <DrawerItem
                            icon={({ color, size }) => (
                                <MaterialIcons name="info-outline" size={24} color={colors.text} />
                            )}
                            label="About Us"
                            labelStyle={{ color: colors.text }}
                            onPress={() => {
                                props.navigation.navigate('aboutus');
                            }}
                        />
                        <DrawerItem
                            icon={({ color, size }) => (
                                <MaterialIcons name="web" size={24} color={colors.text} />
                            )}
                            labelStyle={{ color: colors.text }}
                            label="Guidemic"
                            onPress={() => {
                                Linking.openURL('https://guidemic.in');
                            }}
                        />
                        <DrawerItem
                            icon={({ color, size }) => (
                                <MaterialIcons name="call" size={24} color={colors.text} />
                            )}
                            labelStyle={{ color: colors.text }}
                            label="Contact Us"
                            onPress={() => {
                                // Linking.openURL('https://t.me/raghavyuva');
                            }}
                        />
                        <DrawerItem
                            icon={({ color, size }) => (
                                <MaterialIcons name="privacy-tip" size={24} color={colors.text} />
                            )}
                            labelStyle={{ color: colors.text }}
                            label="Privacy Policy"
                            onPress={() => {
                                props.navigation.navigate('segment');
                            }}
                        />
                        <DrawerItem
                            icon={({ color, size }) => (
                                <MaterialIcons name="fact-check" size={24} color={colors.text} />
                            )}
                            labelStyle={{ color: colors.text }}
                            label="Terms & Condition"
                            onPress={() => {
                                props.navigation.navigate('terms');
                            }}
                        />
                        <DrawerItem
                            icon={({ color, size }) => (
                                <MaterialIcons name="feedback" size={24} color={colors.text} />
                            )}
                            labelStyle={{ color: colors.text }}
                            label="Feedback"
                            onPress={() => {
                                // dispatch({ type: 'ROUTEPROP', data: 'feed' })
                                props.navigation.navigate('external', { screen: 'feedback' })

                            }}
                        />


                    </View>
                </DrawerContentScrollView>
                <View style={styles(colors).bottomDrawerSection}>
                    <DrawerItem
                        icon={({ color, size }) => (
                            <MaterialCommunityIcons name="exit-to-app" size={24} color={colors.text} />
                        )}
                        label="Sign Out"
                        labelStyle={{ color: colors.text }}
                        onPress={() => signOut()}
                    />
                </View>
            </View>
            <TouchableOpacity onPress={() => Linking.openURL('https://guidemic.in')}>
                <Text style={{ color: colors.primary, textAlign: 'center' }}>Supported By &#9829; Guidemic</Text>
            </TouchableOpacity>
        </View>
    );
}
const styles = (colors) => StyleSheet.create({
    drawerContent: {
        flex: 1,

    },
    title: {
        fontSize: 28,
        marginTop: 25,
        fontWeight: 'bold',
        color: colors.text,
        width: 120
    },
    caption: {
        fontSize: 14,
        color: 'yellow',
        textAlign: 'right'
    },
    userInfoSection: {
        paddingLeft: 20,
        backgroundColor: colors.border,
        // justifyContent:"center",
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
        borderTopColor: colors.primary,
        borderTopWidth: 3,
        backgroundColor: colors.border
    },
    preference: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 12,
        paddingHorizontal: 16,
    },
    label: {
        color: colors.text
    }
})