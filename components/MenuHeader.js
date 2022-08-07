import { View, Text, StyleSheet, TextInput } from 'react-native'
import React,{useState} from 'react'

const MenuHeader = () => {
    const [searchItem, setSearchItem]=useState("");
    return (
        <View style={styles.container}>
            <Text style={{ fontSize: 20, color: "#F27405", alignSelf: 'center', }}>Items</Text>
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