import React,{useState}from 'react';
import { Dimensions, StyleSheet,View,FlatList,ScrollView,Animated, PanResponder, Platform} from 'react-native';
import { SliderBox } from "react-native-image-slider-box";
import Carousel, { Pagination, ParallaxImage  } from 'react-native-snap-carousel';
import {Thumbnail, Text, Left, Body, Button ,Card,CardItem,Image,ActionSheet} from 'native-base';
const { width: screenWidth } = Dimensions.get('window');
import * as Font from 'expo-font';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import { EvilIcons,AntDesign,FontAwesome5,Entypo,Ionicons} from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
const bloginfo =[
    {
    userpic:'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fs.cdpn.io%2F69263%2Fprofile%2Fprofile-512.jpg%3F2&f=1&nofb=1',
    username:'David Rodrigues',
    date:'April 15, 2048',
    description:'my first post gefgewgfgedfgedugd',
    postimage:('http://rsquare2014.com/wp-content/uploads/2017/02/External-Events-banner_2.png'),
    commentnum:'21',
    likenum:'1k',
    upvotenum:'100',
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    },
    {
        userpic:'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fs.cdpn.io%2F69263%2Fprofile%2Fprofile-512.jpg%3F2&f=1&nofb=1',
        username:'David ',
        date:'April 15, 2048',
        description:'my first post gefgewgfgedfgedugd',
        postimage:'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimages.wallpapersden.com%2Fimage%2Fdownload%2Fsmall-memory_58461_3840x2160.jpg&f=1&nofb=1',
        commentnum:'21',
        likenum:'1k',
        upvotenum:'100',
        id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
        },
        {
            userpic:'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fs.cdpn.io%2F69263%2Fprofile%2Fprofile-512.jpg%3F2&f=1&nofb=1',
            username:'David Rodrigues',
            date:'April 15, 2048',
            description:'my first post gefgewgfgedfgedugd',
            postimage:'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%3Fid%3DOIP.SyDN_Kx-lsZasFnhW9ZiGAHaEK%26pid%3DApi&f=1',
            commentnum:'21',
            likenum:'1k',
            upvotenum:'100',
            id: '3ac68afc-c605-48d3-a4f8-fbd91aa97ffh',
            },
            {
                userpic:'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fs.cdpn.io%2F69263%2Fprofile%2Fprofile-512.jpg%3F2&f=1&nofb=1',
                username:'David Rodrigues',
                date:'April 15, 2048',
                description:'my first post gefgewgfgedfgedugd',
                postimage:'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimages.wallpapersden.com%2Fimage%2Fdownload%2Fsmall-memory_58461_3840x2160.jpg&f=1&nofb=1',
                commentnum:'21',
                likenum:'1k',
                upvotenum:'100',
                id: '3ac68afc-c605-48d3-a4f8-fbd91aa97sdf',
                }
]
export default class Carouselimage extends React.Component{
  constructor(props) {
    super(props);
    this.renderItem=this.renderItem.bind(this);
    this.state = {
      activeIndex: 0,
      animating: false,
      loading:true,
    
    };
  
  }
  state={
    likecount:0
  }
  async componentDidMount() {
    await Font.loadAsync({
      'Roboto': require('native-base/Fonts/Roboto.ttf'),
      'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
      ...Ionicons.font,
    })
    this.setState({ loading: false })
  }

  renderItem({item,index,props}, parallaxProps){
    return (
        <ScrollView>
        <Card style={styles.card}>
        <CardItem>
            <Left>
              <Thumbnail source={{uri: item.userpic}} />
              <Body>
                 <Text>{item.username}</Text>
                <Text note>{item.date} </Text>
              </Body>
              <Button style = {styles.follow}>
              <Menu>
      <MenuTrigger  customStyles={{color:'white',backgroundColor:'red'}} >
      
          <Entypo name="dots-three-vertical" size={24} color="white" />
     </MenuTrigger>
          <MenuOptions>
        <MenuOption onSelect={() => alert(`Save`)}  >
          <CardItem style={{flexDirection:'row'}}>
        <Entypo name="share" size={24} color="red" style={{marginRight:8}}/>
        <Text>share</Text>
        </CardItem>
          </MenuOption>
          </MenuOptions>
    </Menu>
              </Button>
            </Left>
          </CardItem>
          <CardItem>
            <Body>
            <ParallaxImage 
          style={styles.image} 
          source={{uri:item.postimage}}
          containerStyle={styles.imageContainer}
          style={styles.image}
          parallaxFactor={0.4}
          {...parallaxProps}
        /> 
              <Text>
               {item.description}
              </Text>
            </Body>

          </CardItem>
          <CardItem>
            
            <Left>
              <Button transparent textStyle={{color: '#87838B'}}>
              <EvilIcons name="comment" size={28} color="black" />
                <Text style = {{textTransform:'capitalize'}}> {item.commentnum} </Text>
              </Button>
              <Button transparent textStyle={{color: '#87838B'}} >
              <AntDesign name="heart" size={28} color="black" />
    <Text style = {{textTransform:'capitalize'}}> likes</Text>
              </Button>
              <Button transparent>
              <FontAwesome5 name="hand-point-up" size={28} color="black" />
              <Text style = {{textTransform:'capitalize'}}>{item.upvotenum}</Text>
              </Button>
            </Left>
          </CardItem>
        </Card>
        </ScrollView>

     

    )
}

get pagination () {
  const { activeIndex } = this.state;
  return (
      <Pagination
        dotsLength={bloginfo.length}
        activeDotIndex={activeIndex}
        dotStyle={{
            width: 10,
            height: 10,
            borderRadius: 5,
            marginHorizontal: 4,
            backgroundColor: 'grey'
        }}
        inactiveDotStyle={{
        }}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
      />
  );
}
 
render(){
  if (this.state.loading) {
    return (
      <View></View>
    );
  }
    return(
    <View>
      <View style={{backgroundColor: '#0E043B', justifyContent: 'center', alignContent: 'center', alignItems: 'center'}}>
          <Carousel
                    layout={"default"}
                    enableMomentum={true}
                    ref={ref => this.carousel = ref}
                    data={bloginfo}
                    loop={false}
                    sliderWidth={screenWidth}
                    sliderHeight={screenWidth}
                    itemWidth={screenWidth - 20}
                    renderItem={this.renderItem}
                    hasParallaxImages={true}
                    onSnapToItem = { index => this.setState({activeIndex:index}) } 
                    extraData={this.state.likecount}
                    />
      </View>
     </View>
    )
}

}
const styles=StyleSheet.create(
{    
    follow:{
            backgroundColor:'#0E043B'
         },
           card:{
            backgroundColor:'#0E043B'
            },
            item: {
              width: screenWidth - 180,
              height: screenWidth - 40,
            },
            image:{
              ...StyleSheet.absoluteFillObject,
              resizeMode: 'contain',
             },
            imageContainer: {
               flex: 1,
               width:screenWidth-100,
               height:200,
               backgroundColor: 'white',
               borderRadius: 8,
               alignSelf:'center',
               marginBottom: Platform.select({ ios: 0, android: 1 }), 
        },
        modal: {
          alignItems: "center",
          justifyContent: "center",
        },
        modalContainer: {
          width: "90%",
          height: "60%",
        },
    }
)