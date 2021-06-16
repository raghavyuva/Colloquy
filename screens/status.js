import { StyleSheet, Text, View, FlatList, Dimensions } from 'react-native'
import { useTheme } from '@react-navigation/native';
import { getInputRangeFromIndexes } from 'react-native-snap-carousel'; // 3.7.2
import Carousel from 'react-native-snap-carousel'; // Version can be specified in package.json
import { DataLayerValue } from '../Context/DataLayer';
import StatusCard from '../components/StatusCard';
import Headingbar from '../components/Header';
import { Config } from '../config';

import React, { useState, useEffect } from 'react'

const Status = (props) => {
    const { colors } = useTheme();
    const [{ userToken, postData, searchactive, UserId, allusers, isOnline, refreshhome }, dispatch] = DataLayerValue();
    const [DATA, setDATA] = useState(null);
    useEffect(() => { 
        fetching()
        return () => {
            fetching() 
        }
    }, []);
    
    const fetching = () => {
        try {
            fetch(`${Config.url}` + `/status`, {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + `${userToken}`,
                    'Content-Type': "application/json",
                },
            }).then(res => res.json()).then((resp) => {
                // console.log(resp);
                setDATA(resp);
            }).catch((r) => {
                alert(r.message)
            })
        } catch (error) {
            alert(error);
        }
    } 
    return ( 
        <View style={styles(colors).Screen}>
            <Headingbar {...props} />
            <FlatList  
                renderItem={({ item, index }) => {
                    return (
                        <StatusCard item={item} user={UserId} {...props} />
                    );
                }}
                keyExtractor={(item, index) => index.toString()}
                data={DATA}
                // onEndReached={fetching && GoTo_top_function}
                scrollEnabled
                onScrollAnimationEnd
                scrollToOverflowEnabled
                onEndReachedThreshold={0}
            // refreshing={refreshhome}
            // onRefresh={fetching}
            // style={{}}
            />
        </View>
    )
}

export default Status

const styles = (colors) => StyleSheet.create({
    Screen: {
        flex: 1,
    },
    carouselContainer: {
        marginTop: 50
    },

    itemLabel: {
        color: 'white',
        fontSize: 24
    },
    counter: {
        marginTop: 25,
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center'
    }
})
// const DATA = [
//     {
//         "username": "@uri_dgy",
//         "image": "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.CGK1zmVoxyt1roVGdrrsygHaJ4%26pid%3DApi&f=1",
//         "id": "4"
//     },
//     {
//         "username": "@yestra",
//         "image": "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%3Fid%3DOIP.v6KZUz5Fyz60pMoQwz2UwQHaKC%26pid%3DApi&f=1",
//         "id": "8"
//     },
//     {
//         "username": "@rachel",
//         "image": "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%3Fid%3DOIP.v6KZUz5Fyz60pMoQwz2UwQHaKC%26pid%3DApi&f=1",
//         "id": "8"
//     },
//     {
//         "username": "@rimshiy",
//         "image": "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%3Fid%3DOIP.cADFBZRwlo4YupZwrouzsgHaE8%26pid%3DApi&f=1",
//         "id": "28"
//     },

// ]