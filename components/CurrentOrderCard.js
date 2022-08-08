import { View, Text, TextInput, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React, {useReducer} from 'react'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useDispatch } from 'react-redux';
import { removeTableOrderItem , decrementQuantity} from './redux/tableOrderSlice';

export default function CurrentOrderCard({item, tablenum}) {
    const dispatch = useDispatch();
    const handleDecrease=()=>{
        if(item.quantity>1){
            dispatch(decrementQuantity({tableNo:tablenum, title:item.title}))
        }else{
            handleCancel()
        }
    }
    const handleCancel =()=>{
        dispatch(removeTableOrderItem({tableNo:tablenum, title:item.title}))
    }
    return (
        <View style={styles.menuItemStyle}>
            <View style={{ flexDirection: "row", justifyContent: "flex-start", position:'relative' }}>
                <Text style={styles.titleStyle}>
                    {item.title}
                </Text>
                <TouchableOpacity 
                    style={{
                    position:'absolute',
                    right: 10,
                    }}
                    onPress={handleCancel}
                    >
                    <MaterialIcons name="cancel" size={20} color="red" />
                </TouchableOpacity>
            </View>
            <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 8 }}>
                <View style={{ flexDirection: "row" }}>
                    {/* <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttonText}>-</Text>
                    </TouchableOpacity> */}
                    <Text style={{width: 20, textAlign:'center', fontWeight: "bold" }}>{item.quantity}</Text>
                    {/* <TextInput
                        style={{ borderWidth: 0.5, width: 20, height: 20 }}
                    /> */}
                    <TouchableOpacity
                     style={styles.button}
                     onPress={handleDecrease}
                     >
                        <Text style={styles.buttonText}>-</Text>
                    </TouchableOpacity>
                </View>
                <Text style={{ color: "orange", fontSize: 15,fontWeight: "bold" }}>
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
        // justifyContent: "space-evenly",
        //alignSelf:"flex-start",
        //margin: 20,
        backgroundColor: 'white',
        //width: "auto",
        //borderWidth: 0.5,
        marginTop: 10,
        //alignItems: "center",
        // flexWrap: "wrap",
        borderRadius: 10,
        padding: 10,
        //marginVertical:10,
    },
    button: {
        width: 20,
        height: 20,
        alignItems: 'center',
        //paddingTop: 10,
        backgroundColor: 'gray',
        // margin:10
        marginLeft:12,

    },
    buttonText: {
        //fontSize: 25,
        color: '#fff',
        fontWeight:'900'

    }
})