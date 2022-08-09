import { View, Text,  ScrollView, } from 'react-native'
import React from 'react'
import CurrentOrderCard from './CurrentOrderCard'
import { useSelector } from 'react-redux'

const CurrentOrder = (props) => {
    const data = useSelector((state)=>state.table_order)
    return (
        <View style={{ backgroundColor: "#ECECEC", flex: 1 , borderRadius: 30, padding: 10, marginTop: 10,}}>
            <ScrollView >
                {data.find((item)=>(item.tableNo==props.tablenum))?.items.map((item)=><CurrentOrderCard item={item} tablenum={props.tablenum}/>)}
            </ScrollView>
        </View>
    )
}

export default CurrentOrder