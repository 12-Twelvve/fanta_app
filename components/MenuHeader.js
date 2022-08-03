import { View, Text, StyleSheet, TextInput } from 'react-native'
import { SearchBar } from 'react-native-elements';
import React,{useState} from 'react'

const MenuHeader = () => {
    const [searchItem, setSearchItem]=useState("");
    return (
        <View style={styles.container}>
            <Text style={{ fontSize: 20, color: "#F27405", alignSelf: 'center', }}>Menu</Text>
            {/* <SearchBar
                placeholder="Search Items.."
                containerStyle={{ flex: 1 }}
                lightTheme
            /> */}
            <TextInput
                style={styles.input}
                //onChangeText={onChangeNumber}
                //value={number}
                placeholder="Search Items.."
                keyboardType="default"
                onChange={(event)=>{
                    setSearchItem(event.target.value);
                  }}
            />
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