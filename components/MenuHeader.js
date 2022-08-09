import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

const MenuHeader = () => {
    return (
        <View style={styles.container}>
            <Text style={{ fontSize: 18, color: "#F27405", alignSelf: 'center', fontStyle:'italic' }}>Items</Text>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 10,
        marginTop:10,
    },
    input: {
        height: 40,
        width:"80%",
        //margin: 20,
        borderWidth: 1,
        padding: 10,
        borderRadius:10,
    },
})

export default MenuHeader