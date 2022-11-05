import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation } from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useSelector, useDispatch } from 'react-redux';
import { trueOnlinePortal } from './redux/onlinePortal';

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
    const data = useSelector((state)=>state.table_order)
    const navigation = useNavigation();
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(trueOnlinePortal())
    },[])

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
            <TouchableOpacity onPress={onPressHandler}>
                <View style={{ backgroundColor: data.find(table=>table.tableNo == props.no)?"red":"#F27405", justifyContent: "center", alignItems: "center", width: 200, height: 200, borderRadius:20 }}>
                {/* <View style={{ backgroundColor: data.find(table=>table.tableNo == props.no)?"red":"green",  }}> */}
                    <Text style={{ color: "white", fontSize: 20, fontWeight:'bold' }}>{props.no}</Text>
                </View>
            </TouchableOpacity>
        )
    }


    return (
        <>
            <View style={{ flexDirection: "row", justifyContent: "space-evenly", width: "10%",marginTop:20 }}>
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
            <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "space-evenly",marginTop:20 }}>

                {tableno.map((l) => {
                    return (
                        <Table no={l.id} />
                    );

                })}
            </View>
        </>
    )
}