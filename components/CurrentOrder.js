import { View, Text } from 'react-native'
import React,{useEffect, useReducer, useState} from 'react'
// import { Button } from 'react-native-elements'
import CurrentOrderCard from './CurrentOrderCard'
// import {reducer, initialState} from './reducer'
import { useSelector } from 'react-redux'

const CurrentOrder = (props) => {
    // const [state, dispatch] = useReducer(reducer, initialState)
    const data = useSelector((state)=>state.table_order)
    // useEffect(()=>{
    //     console.log("====current order=====",data)
    // }, [props.renderClick])
    return (
        <View style={{ backgroundColor: "#ECECEC", flex: 1 , borderRadius: 30, padding: 10, marginTop: 10,}}>
            <View >
                {data.find((item)=>(item.tableNo==props.tablenum))?.items.map((item)=><CurrentOrderCard item={item} tablenum={props.tablenum}/>)}
            </View>
        </View>
    )
}

export default CurrentOrder