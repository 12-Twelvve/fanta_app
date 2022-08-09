import React, { useState } from "react";
import { FlatList, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from '@react-navigation/native';
export const DATA = [
    {
        id: "1",
        title: "Momo",
    },
    {
        id: "2",
        title: "Lunch",
    },
    {
        id: "3",
        title: "Third Item",
    },
    {
        id: "4",
        title: "Fourth Item",
    },
    {
        id: "5",
        title: "Fifth Item",
    },
    {
        id: "6",
        title: "Sixth Item",
    },
    {
        id: "7",
        title: "Seventh Item",
    },

];

const Item = ({ item, onPress, backgroundColor, textColor }) => (
    <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
        <Text style={[styles.title, textColor]}>{item.title}</Text>
    </TouchableOpacity>
);


const MenuCategory = (props) => {
    const [selectedId, setSelectedId] = useState('1');
    const navigation = useNavigation();
    const handlePress = (item) => {
        setSelectedId(item.id);
        props.setMenuSelection(item.id)
    }
    const renderItem = ({ item }) => {
        const backgroundColor = item.id === selectedId ? "#F27405" : "#ECECEC";
        const color = item.id === selectedId ? 'white' : 'black';
        return (
            <Item
                item={item}
                onPress={() => handlePress(item)}
                backgroundColor={{ backgroundColor }}
                textColor={{ color }}
            />
        );
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity
                onPress={() => navigation.navigate('Home')}
            >
                <Text style={{ color: "black", fontSize: 30, alignSelf: "center" }}>Sinka</Text>
            </TouchableOpacity>
            <FlatList
                data={DATA}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
            //extraData={selectedId}
            />

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        //flex: 1,
    },
    item: {
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    title: {
        fontSize: 20,
    },
});

export default MenuCategory;