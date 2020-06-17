import React, { Component } from 'react';
import { Image ,StyleSheet,FlatList,ScrollView} from 'react-native';
import { Container, Header, Content, Button, ListItem, Text, Icon, Left, Body, Right, Switch ,Title,Card,CardItem, List} from 'native-base';

const noteinfo =[
    {
        id:'1',
        sharedperson:'daniel',
        sharednotes:'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.ytimg.com%2Fvi%2F0bXVRPzqUTE%2Fmaxresdefault.jpg&f=1&nofb=1',
        notesname:'javascript and its complete guide',
    },
    {
        id:'2',
        sharedperson:'raghav',
        sharednotes:'http://rsquare2014.com/wp-content/uploads/2017/02/External-Events-banner_2.png',
        notesname:'structures of networking',
    },
    {
        id:'3',
        sharedperson:'rasif',
        sharednotes:'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%3Fid%3DOIP.SyDN_Kx-lsZasFnhW9ZiGAHaEK%26pid%3DApi&f=1',
        notesname:'working on machines',
    },
    {
        id:'4',
        sharedperson:'harry',
        sharednotes:'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP.oP6RsHt-5-iliHpCGFcGugHaE8%26pid%3DApi&f=1',
        notesname:'structural engineering',
    },
    {
        id:'5',
        sharedperson:'stephen',
        sharednotes:'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%3Fid%3DOIP.4pWYz7vPYAP-iWWguvUQmgHaEi%26pid%3DApi&f=1',
        notesname:'Semiconductors and light emitting diode',
    },
]

export default class Notesshared extends React.Component{
    constructor(props){
        super(props);
    }

    Listrenderer=({sharednotes,sharedperson,notesname,id})=>{
        return(
        
        <List>
<ListItem>
    <CardItem >
<Text style={Styles.text}>Notes Title: {notesname} </Text>
</CardItem>
<Card>
<Image source={{uri:sharednotes}}  style={Styles.image} />
</Card>
<CardItem>
<Text style={Styles.text}>Shared by: {sharedperson} </Text>   
</CardItem>
</ListItem>
</List>
        );
    }
    render(){
        return(
<Container>
<FlatList 
           
        data={noteinfo}
     renderItem={({ item }) => ( 
            <this.Listrenderer
              id={item.id}
            sharedperson={item.sharedperson}
            notesname={item.notesname}
            sharednotes={item.sharednotes}
            />
          )}
        keyExtractor={item => item.id}
        />
</Container>
        );
    }
}

const Styles = StyleSheet.create({
text:{
    color:'black',
    fontSize:22,
    textAlign:'center',
},
image:{
    width:300,
    height:300,
}
})