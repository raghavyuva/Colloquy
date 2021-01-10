import {
    DrawerContentScrollView,
    DrawerItem
} from '@react-navigation/drawer';
import React, { useState } from 'react';
import { StyleSheet, View, Linking, } from 'react-native';
import { FontAwesome5, MaterialCommunityIcons,  SimpleLineIcons, Octicons, FontAwesome, MaterialIcons, AntDesign } from '@expo/vector-icons';
import {
    Title,
    Caption,
    Drawer,
} from 'react-native-paper';
import { DataLayerValue } from '../Context/DataLayer';
import * as SecureStore from 'expo-secure-store';

export function DrawerContent(props) {
    const [{ userToken }, dispatch] = DataLayerValue()
    const [activebar, setactivebar] = useState(true);
    const [cnt, setcnt] = useState(0);
    const [activebar1, setactivebar1] = useState(false)
    const [activebar2, setactivebar2] = useState(false)
    const [activebar3, setactivebar3] = useState(false)
    const [activebar4, setactivebar4] = useState(false)
    const [activebar5, setactivebar5] = useState(false)
    const [activebar6, setactivebar6] = useState(false)

    const signOut = () => {
        SecureStore.deleteItemAsync('userToken');
        SecureStore.deleteItemAsync('User');
        dispatch({
            type: 'LOGOUT',
        })
    }
    const ChangeBar = (itm) => {
        switch (itm) {
            case 0: setactivebar(true); setactivebar1(false); setactivebar2(false); setactivebar3(false); setactivebar4(false); setactivebar5(false); setactivebar6(false);
                break;
            case 1: setactivebar(false); setactivebar1(true); setactivebar2(false); setactivebar3(false); setactivebar4(false); setactivebar5(false); setactivebar6(false);
                break;
            case 2: setactivebar(false); setactivebar1(false); setactivebar2(true); setactivebar3(false); setactivebar4(false); setactivebar5(false); setactivebar6(false);
                break;
            case 3: setactivebar(false); setactivebar1(false); setactivebar2(false); setactivebar3(true); setactivebar4(false); setactivebar5(false); setactivebar6(false);
                break;
            case 4: setactivebar(false); setactivebar1(false); setactivebar2(false); setactivebar3(false); setactivebar4(true); setactivebar5(false); setactivebar6(false);
                break;
            case 5: setactivebar(false); setactivebar1(false); setactivebar2(false); setactivebar3(false); setactivebar4(false); setactivebar5(true); setactivebar6(false);
                break;
            case 6: setactivebar(false); setactivebar1(false); setactivebar2(false); setactivebar3(false); setactivebar4(false); setactivebar5(false); setactivebar6(true);
                break;
            default: setactivebar(true); setactivebar1(false); setactivebar2(false); setactivebar3(false); setactivebar4(false); setactivebar5(false); setactivebar6(false);
                break;
        }
    }
    return (
        <View style={{ flex: 1, backgroundColor: '#0E043B' }}>
            <View style={styles.drawerContent}>
                <View style={styles.userInfoSection}>
                    <View style={{ flexDirection: 'row', marginTop: 15 }}>

                        <View style={{ marginLeft: 15, flexDirection: 'column' }}>
                            <Title style={styles.title}>Primish</Title>
                            <Caption style={styles.caption}>Unleash your potential</Caption>
                        </View>
                    </View>
                </View>
                <DrawerContentScrollView {...props}>
                    <Drawer.Section style={styles.drawerSection}>
                        <DrawerItem
                            icon={({ color, size }) => (
                                <AntDesign name="home" size={24} color="white" />)}
                            labelStyle={{ color: 'white' }}
                            label="Home"
                            style={{ marginTop: 20 }}
                            onPress={
                                () => {

                                    props.navigation.navigate('external', { screen: 'Home' })
                                    ChangeBar(0)
                                }
                            }
                            focused={activebar}
                            activeBackgroundColor='#2e235e'
                        />
                        <DrawerItem
                            icon={({ color, size }) => (
                                <SimpleLineIcons name="user-follow" size={24} color="white" />)}
                            labelStyle={{ color: 'white' }}
                            label="Followers"
                            style={{ marginTop: 20 }}
                            onPress={() => {
                                ChangeBar(1)
                                props.navigation.navigate('external', { screen: 'follower' })

                            }}
                            focused={activebar1}
                            activeBackgroundColor='#2e235e'
                        />
                        <DrawerItem
                            icon={({ color, size }) => (
                                <SimpleLineIcons name="user-following" size={24} color="white" />)}
                            labelStyle={{ color: 'white' }}
                            label="Following"
                            style={{ marginTop: 20 }}
                            onPress={() => {
                                props.navigation.navigate('external', { screen: 'following' })
                                ChangeBar(2)
                            }}
                            focused={activebar2}
                            activeBackgroundColor='#2e235e'
                        />
                         <DrawerItem
                            icon={({ color, size }) => (
                                <SimpleLineIcons name="user-following" size={24} color="white" />)}
                            labelStyle={{ color: 'white' }}
                            label="Notes"
                            style={{ marginTop: 20 }}
                            onPress={() => {
                                props.navigation.navigate('external', { screen: 'notes' })
                               
                            }}
                           
                        />
                       
                        <DrawerItem
                            icon={({ color, size }) => (
                                <MaterialCommunityIcons name="feature-search" size={24} color="white" />
                            )}
                            label="Events"
                            labelStyle={{ color: 'white' }}
                            style={{ marginTop: 20 }}
                            onPress={() => {
                                props.navigation.navigate('external', { screen: 'events' })
                                ChangeBar(4)
                            }}
                            focused={activebar4}
                            activeBackgroundColor='#2e235e'
                        />
                        <DrawerItem
                            icon={({ color, size }) => (
                                <SimpleLineIcons name="support" size={24} color="white" />
                            )}
                            labelStyle={{ color: 'white' }}
                            label="Support"
                            style={{ marginTop: 20 }}
                            onPress={() => Linking.openURL('https://guidemic.in')}

                        />
                        <DrawerItem
                            icon={({ color, size }) => (
                                <Octicons name="mail-read" size={24} color="white" />
                            )}
                            labelStyle={{ color: 'white' }}
                            label="Terms"
                            style={{ marginTop: 20 }}
                            onPress={() => {
                                props.navigation.navigate('external', { screen: 'segment' })
                                ChangeBar(5)
                            }
                            }
                            focused={activebar5}
                            activeBackgroundColor='#2e235e'
                        />
                        <DrawerItem
                            icon={({ color, size }) => (
                                <FontAwesome5 name="hire-a-helper" size={24} color="white" />
                            )}
                            labelStyle={{ color: 'white' }}
                            label="Hire Helper"
                            style={{ marginTop: 20 }}
                            onPress={() => Linking.openURL('https://raghav.orak.in/')}

                        />
                        <DrawerItem
                            icon={({ color, size }) => (
                                <FontAwesome name="telegram" size={24} color="white" />
                            )}
                            labelStyle={{ color: 'white' }}
                            label="Join Channel"
                            style={{ marginTop: 20 }}
                            onPress={() => Linking.openURL('https://t.me/orakin')}

                        />
                        <DrawerItem
                            icon={({ color, size }) => (
                                <MaterialIcons name="feedback" size={24} color="white" />
                            )}
                            labelStyle={{ color: 'white' }}
                            label="Feedback"
                            style={{ marginTop: 20 }}
                            onPress={() => {
                                props.navigation.navigate('external', { screen: 'feedback' })
                                ChangeBar(6)
                            }}
                            focused={activebar6}
                            activeBackgroundColor='#2e235e'
                        />
                    </Drawer.Section>
                </DrawerContentScrollView>
                <Drawer.Section style={styles.bottomDrawerSection}>
                    <DrawerItem
                        icon={({ color, size }) => (
                            <MaterialCommunityIcons name="exit-to-app" size={24} color="white" />
                        )}
                        label="Sign Out"
                        labelStyle={{ color: 'white' }}
                        onPress={() => signOut()}
                    />
                </Drawer.Section>
            </View>

        </View>
    );
}
const styles = StyleSheet.create({
    drawerContent: {
        flex: 1,
    },
    title: {
        fontSize: 28,
        marginTop: 15,
        fontWeight: 'bold',
        color: '#f3f169',
    },
    caption: {
        fontSize: 14,
        color: '#f3f',
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
        borderTopWidth: 3
    },
    preference: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 12,
        paddingHorizontal: 16,
    },
    label: {
        color: "white"
    }
})