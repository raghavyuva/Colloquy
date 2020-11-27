import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  ImageBackground,
  Image,
  AsyncStorage,
  ActivityIndicator
} from 'react-native'
import { Container, CardItem, Left, Button, Fab, Icon } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import Carousel from 'react-native-anchor-carousel';
import Header from '../Homestack/Header';
const { width } = Dimensions.get('window');
import { EvilIcons, AntDesign, FontAwesome5, Entypo, Ionicons } from '@expo/vector-icons';
import { URL } from '../../config';
export default class userprofile extends Component {
  constructor(props){
    super(props)
  }
  state = {
    Data: null,
    loading: true,
    active: false,
  }
 
  renderItem = ({ item, index }) => {
    const { uri, title, content } = item;
    return (
      <TouchableOpacity
        activeOpacity={1}
        style={styles.item}
        onPress={() => {
          this.numberCarousel.scrollToIndex(index);
        }}
      >
        <ImageBackground
          source={{ uri: item.photo }}
          style={styles.imageBackground}
        >
        </ImageBackground>
        <View style={styles.lowerContainer}>
          <Text style={styles.titleText} numberOfLines={2}>{item.caption}</Text>
          <Text style={styles.contentText}>{content}</Text>
          <CardItem style={{ backgroundColor: "#fc5185" }} >
            <Left>
              <Button transparent textStyle={{ color: '#87838B' }}>
                <EvilIcons name="comment" size={28} color="black" />
                <Text style={{ textTransform: 'capitalize' }}>  </Text>
              </Button>
              <Button transparent textStyle={{ color: '#87838B' }} >
                <AntDesign name="heart" size={28} color="black" />
                <Text style={{ textTransform: 'capitalize' }}> likes</Text>
              </Button>
              <Button transparent>
                <FontAwesome5 name="hand-point-up" size={28} color="black" />
                <Text style={{ textTransform: 'capitalize' }}>50</Text>
              </Button>
            </Left>
          </CardItem>
        </View>
      </TouchableOpacity>
    );
  };
  fetching = async () => {
    try {
     const id = this.props.route.params.thread;
      await 
        AsyncStorage.getItem('userToken').then(token => {
          const Listener = fetch(`${URL.url}` + `/user/${id}`, {
            headers: {
              'Authorization': 'Bearer ' + `${token}`,
            }
          }) 
            .then((response) => response.json())
            .then((responseJson) => {
              this.setState({ Data: responseJson });
              // console.log(this.state.Data);
            })
        }) 

    } catch (e) {
      console.log(e);
    }
  }
  componentDidMount = async() => {
  await  this.fetching() 
  //  console.log(this.props.route.params.thread)
  
    setTimeout(() => { 
      this.setState({ loading: false });
    }, 2000); 
  }
  componentWillUnmount = () => {
    
  }
  componentDidUpdate = () =>{
    this.fetching() 
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
      <Container style={{ backgroundColor: "#f0f0f0" }}>
        <Header {...this.props} />
        <View style={styles.mainscreen}>
          <Grid style={styles.mainscreen}>
            <Row style={styles.row1}>
              <Image
                source={{ uri:this.state.Data.user.userphoto }}
                style={{ 
                  height: 150,
                  width: 150,
                  borderRadius: 20,
                  alignSelf: "center",
                  marginVertical: 20
                }}
              />
            </Row>
            <Row style={styles.row2}>
              <Text style={styles.txt1}>
             {this.state.Data.user.username}
              </Text>
            </Row>
            <Row style={styles.row3}>
            <Text style={styles.txt1}>
             {this.state.Data.user.tagline}
              </Text> 

            </Row>
            <Row>
              <View style={{
                flexDirection: "row",
                alignSelf: "center",
                marginTop: -10
              }}>
                <View>
                  <Text style={{
                    fontWeight: "bold",
                    fontSize: 15,
                    color: "#f0f0f0",
                    alignSelf: "center"
                  }}>{this.state.Data.userposts.length}</Text>
                  <Text style={{
                    fontWeight: '500',
                    fontSize: 16,
                    color: "#9ca1a2",
                    alignSelf: "center"
                  }}>
                    posts
                                </Text>
                </View>

                <View style={{ marginHorizontal: 40 }}>
                  <Text style={{
                    fontWeight: "bold",
                    fontSize: 15,
                    color: "#f0f0f0",
                    alignSelf: "center"
                  }}>{this.state.Data.user.followers.length}</Text>
                  <Text style={{
                    fontWeight: '500',
                    fontSize: 16,
                    color: "#9ca1a2",
                    alignSelf: "center"
                  }}>
                    followers
                                </Text>
                </View>
                <View>
                  <Text style={{
                    fontWeight: "bold",
                    fontSize: 15,
                    color: "#f0f0f0",
                    alignSelf: "center"
                  }}>{this.state.Data.user.following.length}</Text>
                  <Text style={{
                    fontWeight: '500',
                    fontSize: 16,
                    color: "#9ca1a2",
                    alignSelf: "center"
                  }}>
                    following
                                </Text>
                </View>
              </View>
            </Row>
          </Grid>
        </View>
        <View>
          <Carousel
            style={styles.carousel}
           data={this.state.Data.userposts}
            renderItem={this.renderItem}
            itemWidth={0.7 * width}
            inActiveOpacity={0.3}
            containerWidth={width - 10}
            ref={(c) => {
              this.numberCarousel = c;
            }}
          />
        </View>
      </Container>
    );
  }


}

const styles = StyleSheet.create({
  mainscreen: {
    height: "40%",
    backgroundColor: "#364f6b",
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    paddingHorizontal: 40,
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
    fontSize: 22,
    color: "#f0f0f0",
    alignSelf: "center",
    fontWeight: 'bold'
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
    backgroundColor: '#fc5185',
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
    color: "#fff"
  },
  contentText: {
    fontSize: 12,
    color: "#fff"
  }
})