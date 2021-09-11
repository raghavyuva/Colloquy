import React, { useState } from 'react'
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native'
import Headingbar from '../components/Header';
import { Searchbar, } from 'react-native-paper';
import { useTheme } from '@react-navigation/native';
import { useSelector, useDispatch } from "react-redux";
import Usercard from '../components/Usercard';
import Postcard from '../components/Postcard';
import { CardItem, } from "native-base";

const Search = (props) => {
    const { colors } = useTheme();
    const feeds = useSelector((state) => state.allfeeds.feeds);
    const user = useSelector((state) => state.userDetails);
    const AllUsers  = useSelector(state => state.userDetails.Allusers)
    const [active, setactive] = useState("Post");
    const [searchText, setsearchText] = useState(null);
    const [refresh, setrefresh] = useState(false);
    const [dataforfilter, setdataforfilter] = useState(null);
    const [Notfound, setNotfound] = useState(false);
    const [filtered, setfiltered] = useState(null);
    const changedata = () => { 
        switch (active) {
            case 'People':
                setdataforfilter(AllUsers);
                setfiltered([])
                setsearchText('')
                setNotfound(false);
                break;
            case 'Post':
                setdataforfilter(feeds);
                setfiltered([])
                setsearchText('')
                setNotfound(false);
                break;
            default:
                break;
        }
    }


    const fetchFeeds = async () => {
        setloading(true);
        const respo = await fetch(`${Config.url}/post`, {
            method: "GET",
            headers: {
                Authorization: "Bearer " + `${user.userToken}`,
            },
        })
            .then((resp) => resp.json())
            .then(async (d) => {
                dispatch(setFeeds(d));
                await fetch(`${Config.url}` + `/allusers`, {
                    headers: {
                        Authorization: "Bearer " + `${user.userToken}`,
                    },
                    method: "GET",
                })
                    .then((response) => response.json())
                    .then((responseJson) => {
                        setAllUsers(responseJson);
                        dispatch(setAppusers(responseJson));
                        setloading(false);
                    });
            });
    };

    const PeopLeComp = () => {
        return (
            <FlatList
                renderItem={({ item }) => {
                    return (
                        <Usercard
                            item={item}
                            name={"followers"}
                            user={user.userId}
                            {...props}
                        />
                    );
                }}
                keyExtractor={(item, index) => index.toString()}
                data={filtered && filtered.length > 0 ? filtered : AllUsers}
                onEndReached={fetchFeeds}
                scrollEnabled
                onScrollAnimationEnd
                scrollToOverflowEnabled
                onEndReachedThreshold={0}
                refreshing={refresh}
                onRefresh={fetchFeeds}
                style={{ marginBottom: 230 }}
            />
        );
    };


    const search = () => {
        switch (active) {
            case 'People':
                let filteredData = allusers.filter(function (item) {
                    setNotfound(false)
                    return item.username.toLowerCase().includes(searchText.toLowerCase());
                });
                setfiltered(filteredData);
                if (filteredData.length === 0) {
                    setNotfound(true)
                }
                break;
            case 'Post':
                let filteredDatas = postData.filter(function (item) {
                    setNotfound(false)
                    return item.caption.toLowerCase().includes(searchText.toLowerCase());

                });
                if (filteredDatas.length === 0) {
                    setNotfound(true)
                }
                setfiltered(filteredDatas);
                break;
            default:
                break;
        }

    };
    const PostCardComp = (props) => {
        return (
            <FlatList
                renderItem={({ item, index }) => {
                    return <Postcard item={item} {...props} name={props.section} />;
                }}
                keyExtractor={(item, index) => index.toString()}
                data={
                    props.section === "NormalView"
                        ? feeds
                        : filtered && filtered.length > 0
                            ? filtered
                            : feeds
                }
                // onEndReached={fetching && GoTo_top_function}
                scrollEnabled
                onScrollAnimationEnd
                scrollToOverflowEnabled
                onEndReachedThreshold={0}
                refreshing={refresh}
                onRefresh={fetchFeeds}
                style={{
                    marginBottom: props.section === "NormalView" ? 0 : 230,
                    marginTop: 10,
                }}
            />
        );
    };
    const FilterCardComp = () => {
        return (
            <FlatList
                renderItem={({ item }) => {
                    return (
                        <CardItem
                            style={
                                active == item.name
                                    ? styles(colors).cardofactive
                                    : styles(colors).cardof
                            }
                        >
                            <TouchableOpacity
                                onPress={() => {
                                    setactive(item.name);
                                    changedata();
                                }}
                                style={{ flexDirection: "row" }}
                            >
                                <Text style={{ color: colors.text }}>{item.name} </Text>
                            </TouchableOpacity>
                        </CardItem>
                    );
                }}
                keyExtractor={(item, index) => index.toString()}
                data={Filter}
                horizontal
            />
        );
    };
    const ActiveRenderer = () => {
        return (
            <>
                {active == "Post" ? (
                    <PostCardComp {...props} section="FilterView" />
                ) : (
                    <>
                        {active == "People" ? (
                            <>
                                <PeopLeComp />
                            </>
                        ) : (
                            <></>
                        )}
                    </>
                )}
            </>
        );
    };
    return (
        <View style={{}}>
            <Headingbar {...props} />
            <View style={{ margin: 15 }}>
                <Searchbar style={{ backgroundColor: colors.card, color: colors.text }} iconColor='grey' inputStyle={{ color: colors.text }}
                    placeholder="Find everything here"
                    placeholderTextColor='grey'
                    // onIconPress={search}
                    onChangeText={search}
                />
                <FilterCardComp />
            </View>
            <ActiveRenderer />
        </View>
    )
}

export default Search

const styles = (colors) =>
    StyleSheet.create({
        cardoff: {
            backgroundColor: colors.background,
            borderWidth: 0,
            borderColor: colors.background,
        },
        cardof: {
            margin: 4,
            backgroundColor: colors.background,
            borderRadius: 20,
            borderWidth: 1,
            borderColor: colors.border,
        },
        cardofactive: {
            backgroundColor: colors.card,
            borderRadius: 20,
            borderWidth: 1,
            borderColor: colors.primary,
            margin: 4,
        },
    });
const Filter = [
    {
        name: "People",
        id: 1,
    },
    {
        name: "Post",
        id: 2,
    },
    // {
    //     "name": 'Tag',
    //     "id": 3
    // },
    // {
    //     "name": 'Category',
    //     "id": 74
    // },
    // {
    //     "name": 'Location',
    //     "id": 75
    // },
];