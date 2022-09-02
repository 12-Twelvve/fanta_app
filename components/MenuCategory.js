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
        title: "Drinks",
    },
    {
        id: "4",
        title: "Desert",
    },
    {
        id: "5",
        title: "Sinkafe",
    },
    {
        id: "6",
        title: "Pizza",
    },
    {
        id: "7",
        title: "khana",
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