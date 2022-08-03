import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Menu from './Menu'
const tableno = [
    {
        id: "Foodmandu"
    },
    {
        id: "BhojDeals"
    },
    {
        id: "Pathao Food"
    },
    {
        id: "khajatime"
    },
    {
        id: "Bhok lagyo"
    },


]
export default function OnlineOrder() {

    const navigation = useNavigation();

    const Table = (props) => {
        return (
            <TouchableOpacity onPress={() => navigation.navigate('Menu', { num: 1 })}>
                <View style={{ backgroundColor: "#F27405", justifyContent: "center", alignItems: "center", width: 200, height: 200, }}>

                    <Text style={{ color: "white", fontSize: 20 }}>{props.no}</Text>

                </View>
            </TouchableOpacity>
        )
    }


    return (
        <>
            <View style={{ flexDirection: "row", justifyContent: "space-evenly", width: "10%" }}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                >
                    <MaterialIcons name="arrow-back" color="#F27405" size={30} />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => navigation.navigate('Home')}
                >
                    <MaterialIcons name="home" color="#F27405" size={30} />
                </TouchableOpacity>
            </View>
            <Text style={{ alignSelf: "center", fontSize: 30 }}>Online Order</Text>
            <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "space-evenly", }}>

                {tableno.map((l) => {
                    return (
                        <Table no={l.id} />
                    );

                })}
            </View>
        </>
    )
}