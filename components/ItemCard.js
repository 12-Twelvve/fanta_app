import { View, Text, Image, StyleSheet } from 'react-native'
import React, { useReducer } from 'react'
import { Card, Button } from 'react-native-elements'

import { useDispatch } from 'react-redux'
// import { addTableOrderItem } from './redux/tableOrderSlice'
import { addItem } from './redux/kotSlice'

export default function ItemCard(props) {
    const dispatch = useDispatch()
    const handleButtonPress = () => {
        props.setRenderClick(!props.renderClick)
        // dispatch(addTableOrderItem({data:{title:props.title, price:props.price, served:false, quantity:1}, tableNo: props.num }))
        dispatch(addItem({data:{title:props.title, price:props.price, served:false, quantity:1}}))
    }
    return (
        <View style={styles.container}>
            <Card >
                <Text style={styles.title}>{props.title}</Text>
                <Image
                    source={props.image}
                    style={{ width: 150, height: 100,marginBottom: 10 }}
                />
                {/* <Text style={{ marginBottom: 10 }}>
                    food description
                </Text> */}
                <Text style={{ fontSize: 15, color: "#F27405",fontWeight: "bold" }}>Rs {props.price}</Text>
                <Button
                    onPress={handleButtonPress}
                    buttonStyle={{ backgroundColor: "#F27405", borderRadius: 20, }}
                    title='PLACE ORDER'
                />
            </Card>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center",
        width: "auto",
    },
    title: {
        fontWeight: "bold",
        fontSize: 20,
        color: "#F27405",
        alignSelf: "center",
        marginBottom: 10,
    },

})