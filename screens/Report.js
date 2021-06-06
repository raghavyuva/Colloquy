import { Button, Accordion } from 'native-base';
import React, { useState, useEffect } from 'react';
import { View, Text, Image, Dimensions, TextInput, KeyboardAvoidingView, FlatList, ScrollView } from 'react-native';
import Headingbar from '../components/Header';
const { width, height } = Dimensions.get('window');
import { MaterialIcons } from '@expo/vector-icons';
import { DefaultTheme, DarkTheme, useTheme } from '@react-navigation/native';
import { Searchbar, List } from 'react-native-paper';
const Report = (props) => {
    const [Input, setInput] = useState('');
    const { colors } = useTheme();
    const [expanded, setExpanded] = React.useState(true);
    const handlePress = () => setExpanded(!expanded);
    return (
        <View style={{ flex: 1, backgroundColor: colors.background }}>
            <Headingbar {...props} />
            <View style={{ margin: 15 }}>
                <Searchbar style={{ backgroundColor: colors.card, color: colors.text }} iconColor='grey' inputStyle={{ color: colors.text }}
                    placeholder="Describe Your Issue"
                    placeholderTextColor='grey'
                />
            </View>
            <ScrollView>
                <List.Section title="Articles" style={{ backgroundColor: colors.background }} titleStyle={{ color: colors.text }} >
                    <FlatList
                        renderItem={({ item }) => {
                            return (
                                <List.Accordion
                                    title={item.title}
                                    left={props => <MaterialIcons name="article" size={24} color='grey' />}
                                    titleStyle={{ color: colors.text }}
                                >
                                    <Text style={{ color: 'grey' }}>{item.data}</Text>
                                </List.Accordion>
                            );
                        }}
                        keyExtractor={(item, index) => index.toString()}
                        data={menu}
                        scrollEnabled
                    />
                </List.Section>
            </ScrollView>
        </View>
    );
}
export default Report;
const menu = [
    {
        title: 'How to Send Messages in Vtyuva?',
        data: 'Biryani also known as biriyani, biriani, birani or briyani, is a mixed rice dish with its origins among the Muslims of the Indian subcontinent. This dish is especially popular throughout the Indian subcontinent, as well as among the diaspora from the region. It is also prepared in other regions such as Iraqi Kurdistan.',
    },
    {
        title: 'Is My data protected in Vtyuva?',
        data: 'Pizza is a savory dish of Italian origin, consisting of a usually round, flattened base of leavened wheat-based dough topped with tomatoes, cheese, and various other ingredients (anchovies, olives, meat, etc.) baked at a high temperature, traditionally in a wood-fired oven. In formal settings, like a restaurant, pizza is eaten with knife and fork, but in casual settings it is cut into wedges to be eaten while held in the hand. Small pizzas are sometimes called pizzettas.'
    },
    {
        title: 'Are The chats E2E encrypted? ',
        data: 'A drink (or beverage) is a liquid intended for human consumption. In addition to their basic function of satisfying thirst, drinks play important roles in human culture. Common types of drinks include plain drinking water, milk, coffee, tea, hot chocolate, juice and soft drinks. In addition, alcoholic drinks such as wine, beer, and liquor, which contain the drug ethanol, have been part of human culture for more than 8,000 years.'
    },
    {
        title: 'How can i change the password?',
        data: 'you can go to your profile and click pencil icon,once clicked the modal will be popped and you can see reset password via email option,click that to get an email,then verify your present password and submit new password to get it changed,thats all you should do.'
    },
]
