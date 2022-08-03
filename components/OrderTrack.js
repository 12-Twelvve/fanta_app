import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import React, { useState, useReducer, useEffect } from 'react'
import { Checkbox } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Button, CheckBox } from 'react-native-elements'
import {reducer, initialState} from './reducer'

const data = [
    { items: "Local Jhol Momo", served: false, qty: "1", price: "150" },
    { items: "Local Jhol Momo", served: false, qty: "1", price: "150" },
]
export default function OrderTrack({route}) {
    const [state, dispatch] = useReducer(reducer, initialState)
    
    const navigation = useNavigation();
    const [checked, setChecked] = useState(false);
    // const [serveCheckBox, setserveCheckBox] = useState(new Array(state.tableOrder.find(it =>it.tableNo == route.params.num).items.length).fill(false))
    const [serveCheckBox, setserveCheckBox] = useState([])
    const [orderItems, setorderItems] = useState([])
    const toggleCheckbox= (i)=>{
        let tmp = !serveCheckBox[i]
        setserveCheckBox(serveCheckBox.fill(tmp, i, i+1))
        // update served
        dispatch({ type: "UPDATE_SERVED_ITEM", payload:{data:{index:i }, tableNo: route.params.num }});
        // console.log(serveCheckBox)
    }
    useEffect(()=>{
        setorderItems(state.tableOrder.find(it =>it.tableNo == route.params.num).items)
        orderItems.forEach((_, i)=>{
            serveCheckBox[i] = _.served
        })
        console.log(serveCheckBox)
    })
    const item = ({ item , index}) => {
        console.log(item, index)
        return (
            <View style={{ flexDirection: "row", height: 35 }}>
                <View style={{ width: "70%", alignItems: "center", flexDirection: "row" }}>
                    <Checkbox
                        status={serveCheckBox[index] ? 'checked': 'unchecked'}
                        onPress={() => {
                            // setChecked(!checked);
                            toggleCheckbox(index)
                        }}
                    />
                    <Text>{item.title}</Text>
                </View>
                <View style={{ width: "10%", alignItems: "center" }}>
                    <Text>{item.served?"served":"pending"}</Text>
                </View>
                <View style={{ width: "10%", alignItems: "center" }}>
                    <Text>{item.quantity}</Text>
                </View>
                <View style={{ width: "10%", alignItems: "center" }}>
                    <Text>{item.price}</Text>
                </View>
            </View>
        )
    }
    return (
        <>
            {/* Headbar with back and home button */}
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
            {/* --------------------------------------------------------------------------------- */}
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center", margin: 30, }}>
            <Text style={{ alignSelf: "center",fontSize:30 }}>Order Track</Text>
                <View style={{ flexDirection: "row", }}>
                    <View style={{ width: "70%", backgroundColor: "#F27405", alignItems: "center", height: 35, justifyContent: "center", }}>
                        <Text style={{ color: "white" }}>Items</Text>
                    </View>
                    <View style={{ width: "10%", backgroundColor: "#F27405", alignItems: "center", justifyContent: "center", }}>
                        <Text style={{ color: "white" }}>Status</Text>
                    </View>
                    <View style={{ width: "10%", backgroundColor: "#F27405", alignItems: "center", justifyContent: "center", }}>
                        <Text style={{ color: "white" }}>Qty</Text>
                    </View>
                    <View style={{ width: "10%", backgroundColor: "#F27405", alignItems: "center", justifyContent: "center", }}>
                        <Text style={{ color: "white" }}>Price</Text>
                    </View>
                </View>

                <FlatList
                    data={orderItems}
                    renderItem={item}
                    keyExtractor={(item, index) => index.toString()}
                />
                <View style={{ flexDirection: "row", justifyContent: "space-between", width: "100%" }}>
                    <Button
                        onPress={() => navigation.goBack()}
                        buttonStyle={{ backgroundColor: "#F27405", borderRadius: 20, }}
                        title='ADD ITEMS'
                    />
                    <Button
                        onPress={() =>
                            navigation.navigate('Home')
                        }
                        buttonStyle={{ backgroundColor: "#F27405", borderRadius: 20, }}
                        title='Done'
                    />
                </View>
            </View >
        </>
    )
}