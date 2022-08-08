import { View, Text, TouchableOpacity } from 'react-native'
import React, {useReducer, useEffect} from 'react'
import { useNavigation } from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// import Menu from './Menu'
import { useSelector } from 'react-redux';

const tableno = [
    {
        id: "1"
    },
    {
        id: "2"
    },
    {
        id: "3"
    },
    {
        id: "4"
    },
    {
        id: "5"
    },
]


export default function TableOrder() {
    const data = useSelector((state)=>state.table_order)
    const navigation = useNavigation();
    const Table = (props) => {
        return (
            <TouchableOpacity key={props.no} onPress={() => navigation.navigate('Menu', { num: props.no })}>
                <View style={{ backgroundColor: data.find(table=>table.tableNo == props.no)?"red":"green", justifyContent: "center", alignItems: "center", width: 200, height: 200, borderRadius:20 }}>
                    <View style={{ width: 50, height: 50, backgroundColor:'white', position:'absolute'}}></View>
                    <Text style={{ color: "white", fontSize: 20, fontWeight:"bold" }}>Table No. {props.no}</Text>
                </View>
            </TouchableOpacity>
        )
    }
    return (
        <View>
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
            <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "space-evenly", }}>
                {tableno.map((l) => {
                    return (
                        <Table no={l.id} />
                    );
                })}
            </View>
        </View>
    )
}