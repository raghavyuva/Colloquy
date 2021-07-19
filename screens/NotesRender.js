import { FlatList, Image, StyleSheet, Text, Touchable, TouchableOpacity, View, } from 'react-native'
import Headingbar from '../components/Header'
import React, { useEffect, useState } from 'react'
import { useTheme } from '@react-navigation/native';
import { Searchbar, List } from 'react-native-paper';
import { MaterialIcons, AntDesign, MaterialCommunityIcons, Entypo } from '@expo/vector-icons';
import { Config } from '../config';
import { DataLayerValue } from '../Context/DataLayer';

const NotesRender = (props) => {
    const { colors } = useTheme();
    const [Notes, setNotes] = useState(null);
    const [{ userToken, }, dispatch] = DataLayerValue();
    const [typeofnotes, settypeofnotes] = useState(null);

    const fetching = () => {
        fetch(`${Config.url}` + `/get_notes`, {
            headers: {
                'Authorization': 'Bearer ' + `${userToken}`,
            },
            method: 'GET'
        })
            .then((response) => response.json())
            .then((responseJson) => {
                setNotes(responseJson)

            })
    }


    useEffect(() => {
        fetching();
        return () => {

        }
    }, [])

    const TopPart = (item) => (
        <View
            style={{
                flexDirection: 'row',

            }}
        >
            <Image style={{
                width: 100,
                height: 100,
                borderRadius: 10,
                marginLeft: 5
            }} source={{
                uri: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.adazing.com%2Fwp-content%2Fuploads%2F2019%2F02%2Fstacked-book-clipart-07.png&f=1&nofb=1'
            }}
            />
            <View

                style={{
                    flexDirection: 'column'
                }}>
                <Text
                    style={{
                        fontSize: 16,
                        color: colors.text,
                        fontWeight: 'bold',
                        marginLeft: 5,
                    }}
                >{item.title}</Text>
                <Text
                    style={{
                        fontSize: 18,
                        color: 'darkgrey',
                        marginLeft: 5,

                    }}
                >by {item.postedBy.username}</Text>
                <View
                    style={{
                        flexDirection: 'row'
                    }}
                >
                    <View
                        style={{
                            width: 80,
                            height: 30,
                            marginLeft: 5,
                            borderRadius: 15,
                            borderWidth: 1,
                            borderColor: colors.border,
                            marginTop: 5,
                            padding: 5,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                    >
                        <Text
                            style={{
                                fontSize: 18,
                                color: colors.primary,
                                marginLeft: 5,
                                textAlign: 'center'
                            }}
                        >{item.branch}</Text>
                    </View>
                    <View
                        style={{
                            height: 30,
                            marginLeft: 5,
                            borderRadius: 15,
                            borderWidth: 1,
                            borderColor: colors.border,
                            marginTop: 5,
                            padding: 5,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                    >
                        <Text
                            style={{
                                fontSize: 18,
                                color: colors.primary,
                                marginLeft: 5,
                                textAlign: 'center',
                            }}
                            numberOfLines={1}
                        >{item.type}</Text>
                    </View>
                </View>
                <View
                    style={{
                        flexDirection: 'row',
                        marginTop: 15,
                        marginLeft: 5,
                    }}
                >
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: "center",
                            alignItems: 'center',
                            marginRight: 15
                        }}
                    >
                        <MaterialIcons name='comment' color={colors.primary} size={26}
                        />
                        <Text
                            style={{
                                color: 'grey',
                                marginLeft: 2
                            }}
                        >21</Text>
                    </View>
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: "center",
                            alignItems: 'center',
                            marginRight: 15
                        }}
                    >
                        <MaterialIcons name='star' color={colors.primary} size={26}
                        />
                        <Text
                            style={{
                                color: colors.text,
                                marginLeft: 2,
                                fontWeight: '500',
                            }}
                        >8.2</Text>
                    </View>
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: "center",
                            alignItems: 'center',
                        }}
                    >
                        <MaterialCommunityIcons name="book-open-outline" size={24} color={colors.primary} />
                        <Text
                            style={{
                                color: colors.text,
                                marginLeft: 2,
                                fontWeight: '500',
                            }}
                        >50</Text>
                    </View>
                    <View
                        style={{
                            position: 'absolute',
                            right: -20
                        }}
                    >
                        <MaterialIcons name='bookmark-outline' color={colors.primary} size={26} />
                    </View>
                </View>
            </View>
        </View>
    )
    const NotesCard = (item) => (
        <View style={{
            backgroundColor: colors.card,
            margin: 10,
            justifyContent: "center",
            shadowColor: "fff",
            shadowOffset: {
                width: 0,
                height: 6,
            },
            shadowOpacity: 0.39,
            shadowRadius: 8.30,
            elevation: 13,
            padding: 10
        }}>
            <View
                style={{
                    position: 'absolute',
                    right: 5,
                    top: 10,

                }}
            >
                <TouchableOpacity>
                    <MaterialCommunityIcons name="read" size={24} color={colors.primary} />
                </TouchableOpacity>
            </View>
            {TopPart(item)}
        </View>
    )
    return (
        <View style={{
            flex: 1,
            backgroundColor: colors.background
        }}>
            <Headingbar {...props} />
            <View style={{ margin: 15 }}>
                <Searchbar style={{ backgroundColor: colors.card, color: colors.text, }} iconColor='grey' inputStyle={{ color: colors.text }}
                    placeholder="Search Notes"
                    placeholderTextColor='grey'
                // onIconPress={search}
                // onChangeText={search}
                />
            </View>
            <FlatList
                data={Notes}
                renderItem={({ item, index }) => {
                    return (
                        <>
                            {NotesCard(item)}
                        </>
                    )
                }}
            />
        </View>
    )
}

export default NotesRender

const styles = StyleSheet.create({})
