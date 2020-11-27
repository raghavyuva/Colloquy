import React, { Component } from 'react'
import { StyleSheet, TouchableOpacity, Image, FlatList, ImageBackground, Dimensions, Modal, ActivityIndicator, ScrollView, KeyboardAvoidingView } from 'react-native'
import { AsyncStorage } from 'react-native';
import { CardItem, Text, Button, Left, View, Input, Item, Label, Body, Right } from 'native-base';
import { EvilIcons, AntDesign, FontAwesome, Ionicons, Feather } from '@expo/vector-icons';
import { TextInput } from 'react-native-gesture-handler';
import { URL } from '../../config';
const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
export default class PostfullView extends Component {
    constructor(props) {
        super(props)
    }
    state = {
        item: "",
        loading: true,
        comment_en: false,
        comment: '',
        Data: ''
    }
    componentDidMount = async () => {
        const itemm = this.props.route.params.item;
        try {
            await AsyncStorage.getItem('userName').then(userName => {
                AsyncStorage.getItem('userToken').then(token => {
                    const Listener = fetch(`${URL.url}` + `/user/${userName}`, {
                        headers: {
                            'Authorization': 'Bearer ' + `${token}`,
                        }
                    })
                        .then((response) => response.json())
                        .then((responseJson) => {
                            this.setState({ Data: responseJson });
                            // console.log(this.state.Data.user);
                        })
                })
            })
            setTimeout(() => {
                this.setState({ loading: false })
            }, 2000);

        } catch (e) {
            console.log(e);
        }
    }
    comment = async () => {
        try {
            AsyncStorage.getItem('userToken').then(token => {
                fetch(`${URL.url}` + `/posts/comments/${this.props.route.params.item._id}`, {
                    method: 'PUT',
                    headers: {
                        'Authorization': 'Bearer ' + `${token}`,
                        'Content-Type': "application/json",
                    },
                    body: JSON.stringify({
                        text: this.state.comment
                    })
                }).then(res => res.json()).then((resp) => {
                    //console.log(resp);
                    this.setState({ comment_en: false });
                    try {
                        fetch("https://exp.host/--/api/v2/push/send",
                            {
                                headers: {
                                    'Accept': 'application/json',
                                    'Content-Type': 'application/json'
                                },
                                method: "POST",
                                body: JSON.stringify({
                                    to: this.props.route.params.item.postedBy.notifytoken,
                                    sound: 'default',
                                    vibrationPattern: [0, 250, 250, 250],
                                    lightColor: '#FF231F7C',
                                    body: `${this.state.Data.user.username} commented "${this.state.comment}" on your post`,
                                    title: `comment on post ${this.props.route.params.item.caption}`
                                })
                            })
                        this.setState({ comment: '' })
                    } catch (error) {
                        alert(error)
                        console.log(error)
                    }
                })
            })
        } catch (error) {
            alert(error);
        }
    }


    commentui = ({ item, index }) => {
        return (
            <CardItem style={{ backgroundColor: "#000", borderBottomWidth: 0.2, borderBottomColor: 'grey' }}>
                <Left>

                    <Body>
                        <Text style={{ color: 'grey' }} >{item.postedBy.username}</Text>


                        <Text style={{ fontSize: 15, color: "#f0f0f0", }}>{item.text}</Text>
                    </Body>
                    <Image
                        source={{ uri: item.postedBy.userphoto }}
                        style={{ width: 30, height: 30, borderRadius: 100, margin: 5 }}
                    />
                </Left>
            </CardItem>
        )
    }
    render() {
        if (this.state.loading) {
            return (
                <View style={{ justifyContent: "center", alignSelf: 'center', flex: 1 }}>
                    <ActivityIndicator size={50} color='red' />
                </View>
            );
        }
        return (
            <View style={{ backgroundColor: "#000", height: screenHeight }}>
                <ScrollView>
                    <TouchableOpacity
                        activeOpacity={1}
                        style={styles.item}

                    >
                        <CardItem style={{ flexDirection: 'row', backgroundColor: '#000' }}>
                            <TouchableOpacity >
                                <Image
                                    source={{ uri: this.props.route.params.item.postedBy.userphoto }}
                                    style={{ width: 60, height: 60, borderRadius: 100, margin: 15, borderWidth: 2, borderColor: "#17b978" }}
                                />
                            </TouchableOpacity>
                            <Body style={{ margin: 20 }}>
                                <Text style={{ color: "white", fontWeight: "500", fontSize: 18, }} numberOfLines={1}>{this.props.route.params.item.postedBy.username}</Text>
                                <Text style={{ color: "white", fontWeight: "500", fontSize: 10, }} numberOfLines={1}>1 day ago</Text>
                            </Body>
                            <Right>
                                <View >
                                    <TouchableOpacity style={{}} onPress={() => { this.downloadFile(item) }}>
                                        <Feather name="bookmark" size={28} color="white" style={{ textAlign: "right" }} />
                                    </TouchableOpacity>
                                </View>
                            </Right>
                        </CardItem>
                        <Image
                            source={{ uri: this.props.route.params.item.photo }}
                            style={styles.imageBackground}
                        >
                        </Image>
                        <View style={styles.lowerContainer}>
                            <Text style={styles.titleText}></Text>
                            <Text style={styles.contentText}>{this.props.route.params.item.caption}</Text>
                            <CardItem style={{ backgroundColor: "#000" }} >
                                <Left>
                                    <Button transparent textStyle={{ color: '#87838B' }} onPress={() => {
                                        this.setState({ comment_en: !this.state.comment_en })
                                    }}>
                                        <EvilIcons name="comment" size={28} color="white" />
                                        <Text style={{ textTransform: 'capitalize', color: 'white' }}> {this.props.route.params.item.comments.length} </Text>
                                    </Button>
                                    <Button transparent textStyle={{ color: '#87838B' }} >
                                        <AntDesign name="heart" size={28} color="white" />
                                        <Text style={{ textTransform: 'capitalize', color: 'white' }}>{this.props.route.params.item.likes.length}  likes</Text>
                                    </Button>
                                    <Button transparent>
                                        <FontAwesome name="smile-o" size={28} color='white' />
                                        <Text style={{ textTransform: 'capitalize', color: 'white' }}>50</Text>
                                    </Button>
                                    <Button transparent onPress={() => {
                                        Share.share({
                                            url: `${item.photo}`,
                                            title: `${item.postedBy.userName}`,
                                            message: `${item.caption}`,

                                        })
                                    }} >
                                        <Ionicons name="md-share-alt" size={24} color="white" />
                                    </Button>
                                </Left>
                            </CardItem>
                        </View>
                    </TouchableOpacity>
                    <FlatList
                        renderItem={this.commentui}
                        keyExtractor={(item) => item._id}
                        data={this.props.route.params.item.comments}
                    />
                </ScrollView>
                <View style={{ backgroundColor: '#4c4c4c' }}>
                    <Item >
                        <Input style={styles.fieldinpu}
                            onChangeText={(comment) => this.setState({ comment })} value={this.state.comment}
                            placeholder='Add a comment' placeholderTextColor='#bababa' />
                        <Button transparent style={{ borderRadius: 8 }} onPress={() => {
                            this.comment()
                        }}>
                            <Text style={{ textTransform: 'capitalize', color: '#fff' }}>comment</Text>
                        </Button>
                    </Item>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    txt1: {
        fontSize: 22,
        color: "#f0f0f0",
        alignSelf: "center",
        fontWeight: 'bold'
    },
    txt2: {
        fontSize: 18,
        color: "#f0f0f0",
        alignSelf: "center",
        fontWeight: '800'
    },
    carousel: {
        height: '50%',
        backgroundColor: "#f0f0f0",
        paddingTop: 30,
    },
    item: {
        borderWidth: 2,
        backgroundColor: '#000',
        borderRadius: 1,
        borderColor: 'grey',
        elevation: 3,
        margin: 10
    },
    imageBackground: {
        backgroundColor: '#482ff7',
        width: 300,
        height: 300,
        alignSelf: "center",
        marginTop: 0,
    },
    rightTextContainer: {
        marginLeft: 'auto',
        marginRight: -2,
        backgroundColor: 'rgba(49, 49, 51,0.5)',
        padding: 3,
        marginTop: 3,
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5
    },
    rightText: { color: 'white' },
    lowerContainer: {
        margin: 0
    },
    titleText: {
        fontWeight: 'bold',
        fontSize: 18,
        color: "#fff"
    },
    contentText: {
        fontSize: 12,
        color: "#fff"
    },
    fieldinpu: {
        color: '#fff'
    }
})
