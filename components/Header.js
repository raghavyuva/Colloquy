import React, { useState, useEffect } from 'react'
import { SafeAreaView, } from 'react-native';
import { Header, Button, Icon, Left, Body, View, Right, Title, } from 'native-base';
import {
    Avatar,
} from 'react-native-paper';
import { DataLayerValue } from '../Context/DataLayer';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import { useTheme } from '@react-navigation/native';

const Headingbar = (props) => {
    const [{ user, defdarktheme }, dispatch] = DataLayerValue()
    const [toggle, setToggle] = useState(true);
    const { colors } = useTheme();
    const toggleFunction = () => {
        setToggle(!toggle);
        dispatch({ type: 'THEME', data: !defdarktheme })
    };
    const [loaded] = useFonts({
        Montserrat: require('../assets/Pacifico/Pacifico-Regular.ttf'),
    });
    if (!loaded) {
        return null;
    }
    return (
        <SafeAreaView>
            <View>
                <Header style={{ backgroundColor: colors.background }}>
                    <Left>
                        <Button transparent onPress={() => { props.navigation.openDrawer() }}>
                            <Icon name='menu' style={{ color: colors.text }} />
                        </Button>
                    </Left>
                    <Body>
                        <Title style={{ fontFamily: 'Montserrat', fontSize: 25, color: colors.text }}>Primish</Title>
                    </Body>
                    <Right>
                        <Button transparent onPress={toggleFunction}>
                            {toggle ? (
                                <MaterialIcons name="wb-sunny" size={24} color={colors.text} />
                            ) : (
                                <Ionicons name="md-moon-sharp" size={24} color={colors.text} />
                            )}
                        </Button>
                        {props.route.name === 'Home' ? (
                            <Button transparent  >
                                <Icon name='search' style={{ color: colors.text }} />
                            </Button>
                        ) : (
                            <View>
                            </View>
                        )}
                        {props.route.name == 'profile' ? (
                            <View>

                            </View>
                        ) : (
                            <Button transparent onPress={() => props.navigation.navigate('external', { screen: 'profile' })}>
                                {user == null || user == undefined || user.length == 0 ? (
                                    <>
                                        <View>

                                        </View>
                                    </>
                                ) : (
                                    <>

                                        <Avatar.Image
                                            source={{
                                                uri: user.user.userphoto
                                            }}
                                            size={30}
                                            style={{ borderRadius: 14 }}
                                        />

                                    </>
                                )}
                            </Button>
                        )
                        }

                    </Right>
                </Header>
            </View>
        </SafeAreaView>
    )
}

export default Headingbar;
