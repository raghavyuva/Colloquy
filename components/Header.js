import React, { useState, useEffect } from 'react'
import { SafeAreaView, Text, StatusBar, TouchableOpacity } from 'react-native';
import { Header, Button, Icon, Left, Body, View, Right, Title, Item, Input, Radio, } from 'native-base';
import { Avatar,} from 'react-native-paper';
import { DataLayerValue } from '../Context/DataLayer';
import { MaterialIcons, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import { useTheme } from '@react-navigation/native';
import { Menu, Provider } from 'react-native-paper';
import { Config } from '../config';

const Headingbar = (props) => {
    const [{ user, defdarktheme, searchactive, chattee, chatteeOnline }, dispatch] = DataLayerValue()
    const [toggle, setToggle] = useState(true);
    const { colors } = useTheme();
    const [visible, setVisible] = React.useState(false);

    const toggleFunction = () => {
        setToggle(!toggle);
        dispatch({ type: 'THEME', data: !defdarktheme })
    };


    const [loaded] = useFonts({
        Montserrat: require('../assets/Pacifico/Pacifico-Regular.ttf'),
    });

    // console.log(chatteeOnline)
    if (!loaded) {
        return null;
    }

    const ActivateSearch = () => {
        dispatch({ type: 'SEARCHCOMPONENT', data: !searchactive })
    }


    const openMenu = () => setVisible(true);

    const closeMenu = () => setVisible(false);


    const Headingcomp = () => {
        return (
            <View >
                
                <Header style={{ backgroundColor: colors.background }}>
                    <StatusBar backgroundColor={colors.background} />
                    <Left>
                        <Button transparent onPress={() => { props.navigation.openDrawer() }}>
                            <Icon name='menu' style={{ color: colors.text }} />
                        </Button>
                    </Left>
                    <Body>
                        <Title style={{ fontFamily: 'Montserrat', fontSize: 25, color: colors.primary }}>VtYuva</Title>
                    </Body>
                    <Right>
                        <Button transparent onPress={toggleFunction}>
                            {toggle ? (
                                <MaterialIcons name="wb-sunny" size={24} color={colors.text} />
                            ) : (
                                <Ionicons name="md-moon-sharp" size={24} color={colors.text} />
                            )}
                        </Button>
                        {props.route.name === 'Home' || props.route.name === 'chat' ? (
                            <Button transparent onPress={ActivateSearch}>
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
        )
    }

    const Headerforchat = (props) => {
        return (
            <Header style={{ backgroundColor: colors.card }}>
                <StatusBar backgroundColor={colors.background} />
                <Left>
                    <Button transparent onPress={() => { props.navigation.goBack() }}>
                        <Icon name='arrow-back' style={{ color: colors.text }} />
                    </Button>
                </Left>
                <TouchableOpacity style={{ flexDirection: "row" }}
                    onPress={() => props.navigation.navigate('external', { screen: 'userpro', params: { thread: props.user._id } })}>
                    <Avatar.Image
                        source={{
                            uri: props.user.userphoto
                        }}
                        size={40}
                        style={{ margin: 8 }}
                    />
                    <View >
                        <Text style={{ color: colors.text, fontSize: 20, margin: 10 }} numberOfLines={1}>{props.user.username}</Text>
                        {/* <Text style={{ color: colors.primary, marginLeft: 15, fontWeight: 'bold' }}>{chatteeOnline === true ? "online" : "offline"}</Text> */}
                    </View>
                </TouchableOpacity>
                <Right>
                    <Menu
                        visible={visible}
                        onDismiss={closeMenu}
                        anchor={<Button onPress={openMenu} transparent><MaterialCommunityIcons name="dots-vertical" size={24} color={colors.text} /></Button>}>
                        <Menu.Item onPress={() => {
                            Share.share({
                                url: `${props.item.photo}`,
                                title: `${props.item.postedBy.userName}`,
                                message: `${props.item.caption}`,
                            })
                        }} title="share" />
                        <Menu.Item onPress={() => { downloadFile(props.item) }} title="Download Image" />
                    </Menu>
                </Right>
            </Header>
        )
    }
    return (
        <SafeAreaView>

            {
                props.route.name === 'message' ? (
                    <>
                        <Headerforchat {...props} />
                    </>
                ) : (
                    <>
                        {
                            props.route.name === 'addblog' ? (
                                <>
                                </>
                            ) : (
                                <>
                                    {props.route.name === 'Home' ? (
                                        <>
                                            {searchactive ? (
                                                <>

                                                </>
                                            ) : (
                                                <>


                                                    <Headingcomp />
                                                </>
                                            )}
                                        </>
                                    ) : (
                                        <>


                                            <Headingcomp />
                                        </>
                                    )}
                                </>
                            )
                        }
                    </>
                )
            }


        </SafeAreaView>
    )
}

export default Headingbar;
