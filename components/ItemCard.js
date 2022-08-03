import { View, Text, Image, StyleSheet } from 'react-native'
import React, { useReducer } from 'react'
import { Card, Button } from 'react-native-elements'
import { reducer, initialState } from './reducer'

export default function ItemCard(props) {
    const [state, dispatch] = useReducer(reducer, initialState)
    const handleButtonPress = () => {
        props.setRenderClick(!props.renderClick)
        dispatch({ type: "ADD_TABLE_ORDER_ITEM", payload:{data:{title:props.title, price:props.price, served:false, quantity:1}, tableNo: props.num }});
    }
    return (
        <View style={styles.container}>
            <Card >
                <Text style={styles.title}>{props.title}</Text>
                <Image
                    source={props.image}
                    style={{ width: 150, height: 100 }}
                />
                <Text style={{ marginBottom: 10 }}>
                    The idea with React Native
                </Text>
                <Text style={{ fontSize: 15, color: "#F27405", }}>Rs {props.price}</Text>
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