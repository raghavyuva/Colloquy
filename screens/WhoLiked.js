import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native'
import Header from '../components/Header';
import { Config } from '../config';
import { DataLayerValue } from '../Context/DataLayer';
import { Title } from 'native-base';
import { useTheme } from '@react-navigation/native';
import Usercard from '../components/Usercard';

const WhoLiked = (props) => {
    const [data, setdata] = useState(props.route.params.item);
    const [{ userToken, user, otherprofile, UserId }, dispatch] = DataLayerValue()
    const { colors } = useTheme();
    const [AllUsers, setAllUsers] = useState(null);
    useEffect(() => {
        let IsMounted = true;
        getuser()
        return () => {

            IsMounted = false;

        }
    }, [])
    const getuser = () => {
        data.likes.map((ele) => {
            try {
                fetch(`${Config.url}` + `/AllUsers`, {
                    headers: {
                        'Authorization': 'Bearer ' + `${userToken}`,
                    },
                    method: 'GET'
                })
                    .then((response) => response.json())
                    .then((responseJson) => {
                        setAllUsers(responseJson)

                    })
            } catch (e) {
                console.log(e);
            }
        })



    }
    // const followuser = (itm) => {
    //     try {
    //         fetch(`${Config.url}` + `/follow`, {
    //             method: 'PUT',
    //             headers: {
    //                 'Authorization': 'Bearer ' + `${userToken}`,
    //                 'Content-type': 'application/json'
    //             },
    //             body: JSON.stringify({
    //                 followid: itm.user._id
    //             })
    //         }).then(res => res.json()).then((resp) => {
    //             console.log(resp);

    //         })
    //     }
    //     catch (error) {
    //         console.log('error', error)
    //     }
    // }
    // const unfollow = (itm) => {
    //     try {
    //         fetch(`${Config.url}` + `/unfollow`, {
    //             method: 'PUT',
    //             headers: {
    //                 'Authorization': 'Bearer ' + `${userToken}`,
    //                 'Content-type': 'application/json'
    //             },

    //             body: JSON.stringify({
    //                 followid: itm.user._id
    //             })
    //         })
    //             .then((response) => response.json())
    //             .then((responseJson) => { console.log(responseJson) }).catch((err) => { alert(err); })
    //     } catch (error) {
    //         alert(error);
    //     }
    // }

    return (
        <View style={{ flex: 1, backgroundColor: colors.background }}>
            <Header {...props} />
            <Title style={{ fontFamily: 'Montserrat', fontSize: 25, color: colors.primary,marginLeft:18 }}>People Who Liked</Title>
            <FlatList
                renderItem={({ item }) => {
                    // console.log(item)
                    return (
                        data.likes.map((ele) => {
                            if (ele == item._id) {
                                return (
                                    <Usercard item={item} user={UserId} name='followers' {...props} />
                                )
                            } else {
                                return (
                                    <>
                                    </>
                                )
                            }
                        })
                    );
                }}
                keyExtractor={(item, index) => index.toString()}
                data={AllUsers}
            />
        </View>
    )
}

export default WhoLiked;
const styles = StyleSheet.create({

})
