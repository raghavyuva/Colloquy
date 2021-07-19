import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const Search = () => {
    const changedata = () => {
        switch (active) {
            case 'People':
                setdataforfilter(AllUsers);
                setfiltered([])
                setsearchText('')
                setNotfound(false);
                break;
            case 'Post':
                setdataforfilter(postData);
                setfiltered([])
                setsearchText('')
                setNotfound(false);
                break;
            default:
                break;
        }
    }





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


    return (
        <View>
            <Text></Text>
        </View>
    )
}

export default Search

const styles = StyleSheet.create({})
