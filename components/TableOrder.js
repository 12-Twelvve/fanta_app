import { View, Text, TouchableOpacity } from 'react-native'
import React, {useReducer, useEffect} from 'react'
import { useNavigation } from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Menu from './Menu'
import {reducer, initialState} from './reducer'


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


export default function TableOrder({route}) {
    const [state, dispatch] = useReducer(reducer, initialState)
    useEffect(()=>{
        if(route?.params){
            dispatch({ type: "CLEAN_TABLE", payload:{ tableNo: route?.params?.tableNum }})
        }
    },[route])
    const navigation = useNavigation();
    const Table = (props) => {
        return (
            <TouchableOpacity onPress={() => navigation.navigate('Menu', { num: props.no })}>
                <View style={{ backgroundColor: "#F27405", justifyContent: "center", alignItems: "center", width: 200, height: 200, }}>
                    <Text style={{ color: "white", fontSize: 20 }}>Table No. {props.no}</Text>
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