import React from 'react'
import { Audio, Video } from 'expo-av';
import Carousel from 'react-native-snap-carousel';
import { Text, StyleSheet, View, TouchableOpacity, ImageBackground, Dimensions, Image } from 'react-native'
const { width, height } = Dimensions.get('window');
import { MaterialCommunityIcons, SimpleLineIcons } from '@expo/vector-icons';
import { Button, } from 'native-base';
import LottieView from 'lottie-react-native';

const api = [
    {
        id: 0,
        video: 'https://player.vimeo.com/external/426694466.sd.mp4?s=05ae02363ecc932334b4396e8edf1f67a412e5fa&profile_id=139&oauth2_token_id=57447761',
        poster: 'https://images.pexels.com/photos/3130392/pexels-photo-3130392.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
        user: {
            username: 'whinderssonnunes',
            description: 'Como nasceu o passinho do TikTok',
            music: 'som original',
            avatar: 'https://images.pexels.com/photos/2087954/pexels-photo-2087954.png?auto=compress&cs=tinysrgb&dpr=1&w=500'
        },
        count: {
            like: '1.1M',
            comment: '4080',
            share: '2800'
        }
    },
    {
        id: 0,
        video: 'https://player.vimeo.com/external/484854769.sd.mp4?s=2c4d4231b550e633c0d79755483722bee9710fae&profile_id=165&oauth2_token_id=57447761',
        poster: 'https://images.pexels.com/photos/3130392/pexels-photo-3130392.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
        user: {
            username: 'whinderssonnunes',
            description: 'Como nasceu o passinho do TikTok',
            music: 'som original',
            avatar: 'https://images.pexels.com/photos/2087954/pexels-photo-2087954.png?auto=compress&cs=tinysrgb&dpr=1&w=500'
        },
        count: {
            like: '1.1M',
            comment: '4080',
            share: '2800'
        }
    },
    {
        id: 1,
        video: 'https://player.vimeo.com/external/426217695.hd.mp4?s=350d6ecc750b1a67a217b985016d8d75b3132cba&profile_id=169&oauth2_token_id=57447761',
        poster: 'https://images.pexels.com/photos/3130392/pexels-photo-3130392.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
        user: {
            username: 'whinderssonnunes',
            description: 'Como nasceu o passinho do TikTok',
            music: 'som original',
            avatar: 'https://images.pexels.com/photos/2087954/pexels-photo-2087954.png?auto=compress&cs=tinysrgb&dpr=1&w=500'
        },
        count: {
            like: '1.1M',
            comment: '4080',
            share: '2800'
        }
    },
    {
        id: 1,
        video: 'https://player.vimeo.com/external/437122153.sd.mp4?s=cf9f4cf0a46a41b8ae0172f004422900f5bc25ce&profile_id=165&oauth2_token_id=57447761',
        poster: 'https://images.pexels.com/photos/2087954/pexels-photo-2087954.png?auto=compress&cs=tinysrgb&dpr=1&w=500',
        user: {
            username: 'luismariz',
            description:
                'é que eu fui chutar o balde e tinha concreto dentro #foryoupage #fyp',
            music: 'som original',
            avatar: 'https://images.pexels.com/photos/2087954/pexels-photo-2087954.png?auto=compress&cs=tinysrgb&dpr=1&w=500'
        },
        count: {
            like: '380K',
            comment: '2388',
            share: '535'
        }
    }
]

const Explore = () => {
    const _renderItem = ({ item, index }) => {
        console.log(item)
        return (
            <View style={{ flex: 1,backgroundColor:'black' }}>
                <Video
                    rate={1.0}
                    volume={1.0}
                    isMuted={false}
                    posterSource={{ uri: item.poster }}
                    source={{ uri: item.video }}
                    resizeMode='cover'
                    style={{ width: width, height: height-30, flex: 1, position: 'absolute' }}
                    shouldPlay={true}
                />
                <Image
                    source={{ uri: item.poster }}
                    style={{ width: 60, height: 60, borderRadius: 100, margin: 5, borderWidth: 2, borderColor: "#17b978" }}
                />
                <View style={styles.mainscreen}>
                    <TouchableOpacity>
                    <LottieView
                                        loop={false}
                                        autoPlay={true}
                                        autoSize
                                        source={require('../animation/4607-like-animation.json')}
                                    />
                        <Text style={{ color: 'white' }}>{item.count.like}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
    return (
        <View style={{ flex: 1 }}>
            <Carousel
                data={api}
                renderItem={_renderItem}
                sliderWidth={400}
                itemWidth={400}
                layout='tinder'
                autoplay
                loop
            />
        </View>
    )
}

export default Explore
const styles = StyleSheet.create({
    mainscreen: {
        width: width,
        flexDirection: "row",
        justifyContent: 'space-between',
        bottom: 10,
        position: 'absolute'
    },
    row1: {
        marginTop: 100,
        alignSelf: 'center'
    },
    row2: {
        marginTop: 40,
        alignSelf: "center"
    },
    row3: {
        marginTop: -20,
        alignSelf: "center"
    },
    txt1: {
        fontSize: 18,
        color: "#000",
        alignSelf: "center",
        fontWeight: '500'
    },
    txt2: {
        fontSize: 18,
        color: "#f0f0f0",
        alignSelf: "center",
        fontWeight: '500'
    },
    carousel: {
        height: '50%',
        backgroundColor: "#f0f0f0",
        paddingTop: 30,
    },
    item: {
        borderWidth: 2,
        backgroundColor: '#000',
        borderRadius: 5,
        borderColor: '#fc5185',
        elevation: 3,
        flex: 2
    },
    imageBackground: {
        backgroundColor: '#fc5185',
        borderWidth: 5,
        borderColor: '#fc5185',
        flex: 1
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
        margin: 10
    },
    titleText: {
        fontWeight: 'bold',
        fontSize: 18,
        color: "#000",
        textAlign: "center",
        alignSelf: 'center'
    },
    contentText: {
        fontSize: 12,
        color: "#fff"
    }
})