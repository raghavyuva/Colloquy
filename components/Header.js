import React, { useState, useEffect } from 'react'
import { SafeAreaView, ActivityIndicator } from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Drawer, View, ListItem, Right, Radio, List, Title, ActionSheet, Item, Input } from 'native-base';
import {
    Avatar,
} from 'react-native-paper';
import { Config } from '../config';
import { DataLayerValue } from '../Context/DataLayer';
import { FontAwesome5, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';

const Headingbar = (props) => {
    const [{ userToken, UserId, user }, dispatch] = DataLayerValue()
    const [load, setload] = useState(true)
    return (
        <SafeAreaView>
            <View>
                <Header style={{ backgroundColor: '#0E043B' }}>
                    <Left>
                        <Button transparent onPress={() => { props.navigation.openDrawer() }}>
                            <Icon name='menu' />
                        </Button>
                    </Left>
                    <Body>
                        <Title>Primish</Title>
                    </Body>
                    <Right>
                        <Button transparent  >
                            <Icon name='search' />
                        </Button>
                        <Button transparent onPress={() => props.navigation.navigate('external', { screen: 'chat' })}>
                            <MaterialIcons name="message" size={24} color="white" />
                        </Button>
                        <Button transparent onPress={() => props.navigation.navigate('external', { screen: 'profile' })}>
                        <Avatar.Image
                                source={{
                                    uri: user.user.userphoto
                                }}
                                size={30}
                            />
                        </Button>
                    </Right>
                </Header>
            </View>
        </SafeAreaView>
    )
}

export default Headingbar;
