import React, { useState,useEffect } from 'react';
import { Image, StyleSheet } from 'react-native';
import {  Thumbnail, Text, Button,  Left, Body,  ListItem, Right, List, } from 'native-base';
import { DataLayerValue } from '../Context/DataLayer';
import { Config } from '../config';
const Usercard = (props) => {
    const [{ userToken,  }, dispatch] = DataLayerValue()
    const [name, setname] = useState('');
    useEffect(() => {
        setname(props.name)
        return () => {     
        }
    }, [])
    const followuser = (itm) => {
        console.log(itm._id)
        try {
            fetch(`${Config.url}`+`/follow`, {
                method: 'PUT',
                headers: {
                    'Authorization': 'Bearer '+`${userToken}`,
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    followid: itm._id
                })
            }).then(res => res.json()).then((resp) => {
                console.log(resp);
            })
        }
        catch (error) {
            console.log('error', error)
        }
    }
    const unfollow = (itm) => {
        console.log(itm._id)

        try {
            fetch(`${Config.url}`+`/unfollow`, {
                method: 'PUT',
                headers: {
                    'Authorization': 'Bearer ' + `${userToken}`,
                    'Content-type': 'application/json'
                },
               
                body: JSON.stringify({
                    followid: itm._id
                })
            })
                .then((response) => response.json())
                .then((responseJson) => {console.log(responseJson)}).catch((err)=>{alert(err);})
        } catch (error) {
            alert(error);
        }
    }
   const opencomp = (id) =>{
    props.navigation.navigate('external', { screen: 'userpro', params: { thread:id } })
   }
   if (props.name=='followers') {
       return(
        <List>
        <ListItem thumbnail onPress={()=>opencomp(props.item._id)}>
            <Left>
                <Thumbnail square source={{ uri: props.item.userphoto }} />
            </Left>
            <Body>
                <Text style={{color:'white'}}>{props.item.username}</Text>
                <Text note numberOfLines={1}>{props.item.tagline}</Text>
            </Body>
            <Right>
                {props.item.followers.includes(props.user)? (
                    <Button style={styles.follow} onPress={() => unfollow(props.item)}>
                        <Text>unfollow</Text>
                    </Button>
                ) : (
                        <Button style={styles.follow} onPress={() => followuser(props.item)} >
                            <Text>follow</Text>
                        </Button>
                    )}
            </Right>
        </ListItem>
    </List>
       )
   }
   else{
    return (
        <List>
            <ListItem thumbnail onPress={()=>opencomp(props.item._id)}>
                <Left>
                    <Thumbnail square source={{ uri: props.item.userphoto }} />
                </Left>
                <Body>
                    <Text style={{color:'white'}}>{props.item.username}</Text>
                    <Text note numberOfLines={1}>{props.item.tagline}</Text>
                </Body>
                <Right>
                        <Button style={styles.follow} onPress={() => unfollow(props.item)}>
                            <Text>unfollow</Text>
                        </Button>
                </Right>
            </ListItem>
        </List>
    )
                    }
}

export default Usercard
const styles = StyleSheet.create({
    follow: {
        backgroundColor: '#053e42'
    },
    search: {
        backgroundColor: '#053e42'
    },
    following: {
        marginLeft: 20,
        fontSize: 25,
        fontWeight: '500'
    }
})
