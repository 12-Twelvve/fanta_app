import { View, Text, TextInput, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React, {useReducer} from 'react'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {reducer, initialState} from './reducer'


export default function CurrentOrderCard({item, tablenum}) {
    const [state, dispatch] = useReducer(reducer, initialState)

    const handleCancel =()=>{
        console.log(state.tableOrder)
        let temptableOrder = state.tableOrder.find(it =>it.tableNo ==tablenum)
        let temptableList = temptableOrder?.items.filter(it=>it.title != item.title)            
        const temp = {...state,tableOrder:state.tableOrder.map(it=>{
            if(it.tableNo==tablenum){
                return {tableNo:tablenum, items:temptableList}
            }else{
                return it
            }})}
        console.log(state.tableOrder[0].items, temp.tableOrder[0].items)
        dispatch({ type: "REMOVE_ORDER_ITEM", payload:{data:temp }})
    }

    return (
        <View style={styles.menuItemStyle}>
            <View style={{ flexDirection: "row", justifyContent: "flex-start" }}>
                <Text style={styles.titleStyle}>
                    {item.title}
                </Text>
                <TouchableOpacity 
                    style={{ marginLeft: 40 }}
                    onPress={handleCancel}
                    >
                    <MaterialIcons name="cancel" size={20} color="red" />
                </TouchableOpacity>
            </View>
            <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 8 }}>
                <View style={{ flexDirection: "row" }}>
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttonText}>-</Text>
                    </TouchableOpacity>
                    <TextInput
                        style={{ borderWidth: 0.5, width: 20, height: 20 }}
                    />
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttonText}>+</Text>
                    </TouchableOpacity>
                </View>
                <Text style={{ color: "orange", fontSize: 15 }}>
                    Rs {item.price}
                    </Text>
            </View>

        </View>
    )
}
const styles = StyleSheet.create({
    titleStyle: {
        fontSize: 19,
        fontWeight: "600",
    },
    menuItemStyle: {
        //flexDirection: "row",
        justifyContent: "space-evenly",
        //alignSelf:"flex-start",
        //margin: 20,
        backgroundColor: 'white',
        //width: "auto",
        //borderWidth: 0.5,
        marginTop: 10,
        //alignItems: "center",
        flexWrap: "wrap",
        borderRadius: 10,
        padding: 10,
        //marginVertical:10,
    },
    button: {
        width: 20,
        height: 20,
        alignItems: 'center',
        //paddingTop: 10,

        backgroundColor: '#F27405',
        //margin:10
    },
    buttonText: {
        //fontSize: 25,
        color: '#fff'
    }
})