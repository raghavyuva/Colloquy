import React, { useState, } from 'react'
import { SafeAreaView,} from 'react-native';
import { Header,Button, Icon, Left, Body, View, Right,  Title, } from 'native-base';
import {
    Avatar,
} from 'react-native-paper';
import { DataLayerValue } from '../Context/DataLayer';
import {  MaterialIcons } from '@expo/vector-icons';
import { Config } from '../config';
import { useFonts } from 'expo-font';

const Headingbar = (props) => {
    const [{  user }, dispatch] = DataLayerValue()
    const [load, setload] = useState(true)
    const [loaded] = useFonts({
        Montserrat: require('../assets/Pacifico/Pacifico-Regular.ttf'),
    });
    if (!loaded) {
        return null;
    }
    return (
        <SafeAreaView>
            <View>
                <Header style={{ backgroundColor: Config.secondary}}>
                    <Left>
                        <Button transparent onPress={() => { props.navigation.openDrawer() }}>
                            <Icon name='menu' />
                        </Button>
                    </Left>
                    <Body> 
                        <Title style={{ fontFamily: 'Montserrat',fontSize: 25,}}>Primish</Title>
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
