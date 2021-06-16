import { StyleSheet, Dimensions, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { DataLayerValue } from '../Context/DataLayer'
import { Thumbnail, Text, Button, Left, Body, ListItem, Right, List, View, Card, CardItem } from 'native-base';
import { useTheme } from '@react-navigation/native'
import Carousel, { } from 'react-native-snap-carousel'
import Headingbar from './Header';
const { Width, Height } = Dimensions.get('window');

const horizontalMargin = 20;
const slideWidth = 280;

const sliderWidth = Dimensions.get('window').width;
const itemWidth = slideWidth + horizontalMargin * 2;
const itemHeight = 200;
const StatusView = (props) => {
    console.log(props.route.params.item.postedBy)
    const { colors } = useTheme();
    _renderItem = ({ item, index }) => { 
        // console.log(item)
        return (
            <View style={styles.slide}>
                <Image source={{ uri: item }} style={{ width: Width, height: 700 }} />
            </View>
        );  
    }
    const pagination =() =>{
        const { entries, activeSlide } = this.state;
        return (
            <Pagination
              dotsLength={entries.length}
              activeDotIndex={activeSlide}
              containerStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.75)' }}
              dotStyle={{
                  width: 10,
                  height: 10,
                  borderRadius: 5,
                  marginHorizontal: 8,
                  backgroundColor: 'rgba(255, 255, 255, 0.92)'
              }}
              inactiveDotStyle={{
                  // Define styles for inactive dots here
              }}
              inactiveDotOpacity={0.4}
              inactiveDotScale={0.6}
            />
        );
    }
    return (
        <View style={{ flex: 1 }}> 
        <Headingbar {...props} user={props.route.params.item} />
            <Carousel
                data={props.route.params.item.Image}
                renderItem={_renderItem}
                sliderWidth={sliderWidth}
                sliderHeight={250}
                itemWidth={itemWidth}
            />
              { pagination }
        </View>
    )
}

export default StatusView

const styles = StyleSheet.create({

})
