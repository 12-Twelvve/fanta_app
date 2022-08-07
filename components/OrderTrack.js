import { View, Text, FlatList, TouchableOpacity,Modal, StyleSheet , Pressable} from 'react-native'
import React, { useState, useReducer, useEffect } from 'react'
import { Checkbox } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Button, CheckBox } from 'react-native-elements'
import {reducer, initialState} from './reducer'




export default function OrderTrack({route}) {
    const [modalVisible, setModalVisible] = useState(false);
    const [state, dispatch] = useReducer(reducer, initialState)
    
    const navigation = useNavigation();
    const [allserveCheckBox, setallserveCheckBox] = useState(false)
    // const [checked, setChecked] = useState(false);
    // const [serveCheckBox, setserveCheckBox] = useState(new Array(state.tableOrder.find(it =>it.tableNo == route.params.num).items.length).fill(false))
    const [serveCheckBox, setserveCheckBox] = useState([])
    const [orderItems, setorderItems] = useState([])
    const getTotalPrice =()=>{
        let total =0
        orderItems?.map((it)=>{
            total +=Number(it.price)
        })
        return total
    }
    const toggleCheckbox= (i)=>{
        let tmp = !serveCheckBox[i]
        setserveCheckBox(serveCheckBox.fill(tmp, i, i+1))
        // update served
        dispatch({ type: "UPDATE_SERVED_ITEM", payload:{data:{index:i }, tableNo: route.params.num }});
        // console.log(serveCheckBox)
    }
    const toggleAllCheckbox =()=>{
        if(allserveCheckBox){
            setserveCheckBox(serveCheckBox.fill(false))
            setallserveCheckBox(false)
        }else{
            setallserveCheckBox(serveCheckBox.fill(true))
            setallserveCheckBox(true)
        }
    }
    const handleCheckout =()=>{
        // clean the table
        // console.log('checkout called ------------')
        // dispatch({ type: "CLEAN_TABLE", payload:{ tableNo: route.params.num }})
        setModalVisible(!modalVisible)
        // console.log("==")
        // handleNavigateToHome()
        navigation.navigate('Table', {tableNum:route.params.num})

    }
    useEffect(()=>{
        setorderItems(state?.tableOrder?.find(it =>it?.tableNo == route.params.num)?.items);
        orderItems?.forEach((_, i)=>{
            serveCheckBox[i] = _.served
        });
        
        if (!serveCheckBox?.includes(false)) {
            setallserveCheckBox(true);
        }
        else{
            setallserveCheckBox(false);
        }
    },[state, orderItems, serveCheckBox] )
    const item = ({ item , index}) => {
        // console.log(item, index)
        return (
            <View style={{ flexDirection: "row"}}>
                <View style={{ width: "10%", alignItems: "center" }}>
                    <Checkbox
                        status={serveCheckBox[index] ? 'checked': 'unchecked'}
                        onPress={() => {
                            toggleCheckbox(index)
                        }}
                    />
                </View>
                <View style={{ width: "45%", alignItems: "center"}}>
                    <Text >{item.title}</Text>

                </View>
                <View style={{ width: "15%", alignItems: "center" }}>
                    <Text>{item.served?"served":"pending"}</Text>
                </View>
                <View style={{ width: "15%", alignItems: "center" }}>
                    <Text>{item.quantity}</Text>
                </View>
                <View style={{ width: "15%", alignItems: "center" }}>
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
                    <View style={{ width: "10%", backgroundColor: "#F27405", alignItems: "center", }}>
                        <Checkbox
                        status={allserveCheckBox ? 'checked': 'unchecked'}
                        // status={'unchecked'}
                        onPress={() => {
                            toggleAllCheckbox()
                        }}
                         />
                    </View>
                    <View style={{ width: "45%", backgroundColor: "#F27405", alignItems: "center", height: 35, justifyContent: "center", }}>
                        <Text style={{ color: "white" }}>Items</Text>
                    </View>
                    <View style={{ width: "15%", backgroundColor: "#F27405", alignItems: "center", justifyContent: "center", }}>
                        <Text style={{ color: "white" }}>Status</Text>
                    </View>
                    <View style={{ width: "15%", backgroundColor: "#F27405", alignItems: "center", justifyContent: "center", }}>
                        <Text style={{ color: "white" }}>Qty</Text>
                    </View>
                    <View style={{ width: "15%", backgroundColor: "#F27405", alignItems: "center", justifyContent: "center", }}>
                        <Text style={{ color: "white" }}>Price</Text>
                    </View>
                </View>
                {/* <View style={{ height: 300 }}></View> */}
                <FlatList
                    data={orderItems}
                    renderItem={item}
                    keyExtractor={(item, index) => index.toString()}
                />
                {/* total prize */}
                {/* <View style={{flex: 1, height: 1, backgroundColor: 'black', margin:10}} /> */}
                <View>
                    <View>
                    <Text>Total:{getTotalPrice()}</Text>
                    <Text>VAT: 13%</Text>
                    <Text>Grand Total:{getTotalPrice()}</Text>
                    </View>
                </View>

                {/* bottom add and submit */}
                <View>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                    setModalVisible(false);
                    }}
                >
                    <TouchableOpacity 
                        style={styles.container} 
                        activeOpacity={1} 
                        onPressOut={() => {setModalVisible(false)}}
                    ></TouchableOpacity>
                    <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <View>
                        <Text>Total:<Text style={styles.modalText}>{getTotalPrice()}</Text></Text>
                        <Text>VAT: 13%</Text>
                        <Text>Grand Total:<Text style={styles.modalText}>{getTotalPrice()}</Text></Text>
                        </View>
                        <Pressable
                        style={[styles.button, styles.buttonClose]}
                        onPress={handleCheckout}
                        >
                        <Text style={styles.textStyle}>checkout</Text>
                        </Pressable>
                        <TouchableOpacity
                            onPress={() => {setModalVisible(false)}}
                            style={{
                                position:'absolute',
                                right: 20,
                                top:10,
                                }}
                        >
                            <MaterialIcons name="close" color="#F27405" size={30} />
                        </TouchableOpacity>
                    </View>
                    </View>
                </Modal>
                </View>
                <View style={{ flexDirection: "row", justifyContent: "space-between", width: "100%" }}>
                    <Button
                        onPress={() => navigation.goBack()}
                        buttonStyle={{ backgroundColor: "#F27405", borderRadius: 20, }}
                        title='ADD ITEMS'
                    />
                    <Button
                        // onPress={() =>navigation.navigate('Home')}
                        onPress={() => setModalVisible(true)}
                        buttonStyle={{ backgroundColor: "#F27405", borderRadius: 20, }}
                        title='Checkout'
                    />
                </View>
            </View >
        </>
    )
}

const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 22,
    },
    modalView: {
      width:320,
      height:320,
      margin: 10,
      backgroundColor: "white",
      borderRadius: 20,
      padding: 45,
      alignItems: "center",
      justifyContent:'center',
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5
    },
    button: {
      borderRadius: 20,
      padding: 10,
      elevation: 2,
      marginTop:30,
    },
    buttonClose: {
      backgroundColor: "red",
    },
    textStyle: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center",
      fontSize:15
    },
    modalText: {
      fontWeight: "bold",
      marginBottom: 25,
      textAlign: "center",
    }
  });
  