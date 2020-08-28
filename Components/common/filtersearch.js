import React, { Component,useState } from 'react';
import { Image ,StyleSheet,SafeAreaView,FlatList,Dimensions} from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body,Drawer,View,ListItem,Right,Radio, List} from 'native-base';
import { EvilIcons,AntDesign,FontAwesome5,Entypo} from '@expo/vector-icons';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
const { width: screenWidth } = Dimensions.get('window');
import { ScrollView } from 'react-native-gesture-handler';
const sortby =[
  {
    opname:'Featured',
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
  },
  {
    opname:'Popular',
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
  },
  {
    opname:'Writer name',
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97ffh',
  },
  {
    opname:'Publication Date',
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97sdf',
  },
  {
    opname:'A-Z',
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa94fddh',
  }

];
const Genre = [
  {
    opname:'Tech',
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
  },
  {
    opname:'Buisness & Economics',
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
  },
  {
    opname:'Children',
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97ffh',
  },
  {
    opname:'Cookery',
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
  },
  {
    opname:'Fiction',
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa94fdd',
  },
]
const star = [
  {
    opname:'* * * * *',
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
  },
  {
    opname:'* * * *',
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
  },
  {
    opname:'* * *',
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97ffh',
  },
  {
    opname:'* *',
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
  },
  {
    opname:'*',
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa94fdd',
  },
  {
    opname:'',
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa94dgv',
  },
]
function Item({ filter }) {
  const [state, setState] = useState({
    selected:[],
});
 const _onValueChange=() =>
  { 
    setState({ selected: !state.selected }) 
    }
  return (

<List style={{backgroundColor:'#5cb85c',}}>
  <Button transparent onPress={_onValueChange} style={{marginLeft:20}}>
<Radio
    color={"black"}
    selectedColor={""}
    selected={state.selected}
  />  
  <Left>    
<Text style={{textTransform:'capitalize',fontSize:18,marginLeft:15,}}>{filter}</Text>
</Left> 
</Button>

</List>

  );
}

export default function filter() {
  return (
    <ScrollView style={{flex:1}}>
          
<Header style = {styles.header}>
  <Text style = {styles.feeds}>Filter</Text>
</Header>
<Text note style={{backgroundColor:'black',color:'#FFF',paddingLeft:20}}>sort by</Text>
      <FlatList
        data={sortby}
        renderItem={({ item }) => <Item filter={item.opname} />}
        keyExtractor={item => item.id}
      />
      <Text note style={{backgroundColor:'black',color:'#FFF',paddingLeft:20}}>Genre</Text>
            <FlatList
        data={Genre}
        renderItem={({ item }) => <Item filter={item.opname} />}
        keyExtractor={item => item.id}
      />
               <Text note style={{backgroundColor:'black',color:'#FFF',paddingLeft:20}}>Average customer Review</Text>
         <FlatList
        data={star}
        renderItem={({ item }) => <Item filter={item.opname} />}
        keyExtractor={item => item.id}
      />
         <Content style={styles.footer}>

         <Button style ={styles.apply}>
         <Text style ={{textAlign:'center',fontSize:20,textTransform:'capitalize'}}>Apply</Text>
         </Button>
        
         </Content>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  header:{
    backgroundColor:'#223343'
  },
  feeds:{
    color:"#FFF",
    marginTop:10,
    fontSize:26,
  },
  card:{
    flex:0,
  },
  follow:{
    backgroundColor:'red'
  },
  footer:{
  position:'absolute',
  width:"100%",
  bottom:0,
  flex:0.8
},
apply:{
width:"95%",
backgroundColor:'black',
justifyContent:'center',
borderRadius:10,
alignItems:'center',
alignSelf:'center'
}}
);