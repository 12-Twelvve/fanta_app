import { View, Text } from 'react-native'
import React,{useEffect, useReducer, useState} from 'react'
import { Button } from 'react-native-elements'
import CurrentOrderCard from './CurrentOrderCard'
import {reducer, initialState} from './reducer'

const CurrentOrder = (props) => {
    const [state, dispatch] = useReducer(reducer, initialState)
    useEffect(()=>{
        console.log("====current order=====",state.tableOrder)
    }, [props.renderClick, state])
    return (
        <View style={{ backgroundColor: "#ECECEC", height: "60%", borderRadius: 30, padding: 10, marginTop: 25,}}>
            <View >
                {state.tableOrder.find((item)=>(item.tableNo==props.tablenum))?.items.map((item)=><CurrentOrderCard item={item} tablenum={props.tablenum}/>)}
            </View>
        </View>
    )
}

export default CurrentOrder