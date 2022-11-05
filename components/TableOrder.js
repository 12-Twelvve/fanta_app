import { View, Text, TouchableOpacity } from 'react-native'
import React, {useReducer, useEffect} from 'react'
import { useNavigation } from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useSelector, useDispatch } from 'react-redux';
import { falseOnlinePortal } from './redux/onlinePortal';

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
    const dispatch = useDispatch()

    const navigation = useNavigation();
    const Table = (props) => {
        const onPressHandler=()=>{
            const tableState = data.find(table =>table.tableNo == props.no)?true:false
            if (tableState){
                navigation.navigate('Track', { num: props.no })
            }else{
                navigation.navigate('Menu', { num: props.no })
            }
            }
        return (
            <TouchableOpacity key={props.no} onPress={onPressHandler}>
                <View style={{ backgroundColor: data.find(table=>table.tableNo == props.no)?"red":"green", justifyContent: "center", alignItems: "center", width: 200, height: 200, borderRadius:20 }}>
                    <View style={{ width: 200, height: 90, backgroundColor:'orange', position:'absolute'}}></View>
                    <Text style={{ color: "white", fontSize: 20, fontWeight:"bold" }}>Table No. {props.no}</Text>
                </View>
            </TouchableOpacity>
        )
    }
    useEffect(()=>{
        dispatch(falseOnlinePortal())
    },[])
    return (
        <View>
            <View style={{ flexDirection: "row", justifyContent: "space-evenly", width: "10%",marginTop:30 }}>
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
            <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "space-evenly", marginTop:30 }}>
                {tableno.map((l) => {
                    return (
                        <Table no={l.id} />
                    );
                })}
            </View>
        </View>
    )
}