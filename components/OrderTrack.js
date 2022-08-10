import { View, Text, FlatList,ScrollView, TextInput, TouchableOpacity,Modal, StyleSheet , Pressable} from 'react-native'
import React, { useState,  useEffect } from 'react'
import { Checkbox } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Button } from 'react-native-elements'
import { useSelector, useDispatch } from 'react-redux';
import { cleanTable, updateServedItem, updateAllServedItem } from './redux/tableOrderSlice';


export default function OrderTrack({route}) {
    const [rerender, setrerender] = useState(false)
    const [modalVisible, setModalVisible] = useState(false);
    const dispatch = useDispatch()
    const orders = useSelector((state)=>state.table_order?.find(table =>table?.tableNo == route.params.num)?.kot)
    const [discount, setdiscount] = useState(0)
    const [serviceTax, setserviceTax] = useState(0)
    const navigation = useNavigation();
    // checkbox

    const [allserveCheckBox, setallserveCheckBox] = useState(false)
    const [serveCheckBox, setserveCheckBox] = useState({})
    
    const getTotalPrice =()=>{  
        let total =0
        orders?.map((kot)=>{
            kot.items.map((items)=>{
                total +=Number(items.price)*Number(items.quantity)
            })
        })
        return total
    }
    const getGrandTotalPrice =()=>{  
        let total = getTotalPrice()
        let tax= Number(total)*(Number(serviceTax)/100)
        let dscnt= Number(total)*(Number(discount)/100)
        let gtotal = Number(total) + Number(tax) -Number(dscnt)
        return gtotal
    }
    const toggleCheckbox= (kotId, i)=>{
        let tmp = !serveCheckBox[kotId+i]
        serveCheckBox[kotId+i] = tmp
        dispatch(updateServedItem({index:i, kotId:kotId, value:tmp, tableNo:route.params.num}))
    }

    const toggleAllCheckbox =()=>{
        if(allserveCheckBox){
            setallserveCheckBox(false)
            dispatch(updateAllServedItem({value:false, tableNo:route.params.num}))  
        
        }else{
            setallserveCheckBox(true)
            dispatch(updateAllServedItem({value:true, tableNo:route.params.num}))  
        }
    }
    const handleCheckout =()=>{
        // clean the table
        if(allserveCheckBox){
            setModalVisible(!modalVisible)
            dispatch(cleanTable({tableNo:route.params.num}))
            navigation.navigate('Table', {tableNum:route.params.num})
        }
    }
    useEffect(()=>{
        orders?.forEach((kot)=>{
            kot?.items.forEach((item, i)=>{
                serveCheckBox[kot.kotId+i] = item.served
            })
        });
        if (!Object.values(serveCheckBox)?.includes(false)) {
            setallserveCheckBox(true);
        }
        else{
            setallserveCheckBox(false);
        }
        setrerender(!rerender)
    }, [orders, serveCheckBox, allserveCheckBox])
    const Item = ({ item , kotId, index}) => {
        return (
            <View style={{ flexDirection: "row"}}>
                <View style={{ width: "10%", alignItems: "center" }}>
                    <Checkbox
                        status={serveCheckBox[kotId+index] ? 'checked': 'unchecked'}
                        onPress={() => {
                            toggleCheckbox(kotId,index)
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
            <View style={{ flexDirection: "row", justifyContent: "space-evenly", width: "10%",marginTop:20 }}>
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
                <ScrollView>
                {/* <View style={{ height: 300 }}></View> */}
                {orders?.map((kot)=><FlatList
                    data={kot.items}
                    // extraData={kot.kotId} 
                    renderItem={({item, index})=><Item item={item} kotId={kot.kotId} index={index}/>}
                    keyExtractor={(item, index) => index.toString()}
                    extraData={rerender}
                    />
                )} 
                </ScrollView>
                {/* input function for discount and service tax */}
                <View style={styles.inputDiv}>
                <Text style={styles.inputText}>discount </Text>
                <TextInput
                    style={styles.inputField}
                    onChangeText={setdiscount}
                    value={discount}
                    keyboardType="numeric"
                    />
                <Text style={styles.inputText}>service Tax </Text>
                <TextInput
                    style={styles.inputField}
                    onChangeText={setserviceTax}
                    value={serviceTax}
                    keyboardType="numeric"
                    />
                </View>
                {/* total prize */}
                {/* <View style={{flex: 1, height: 1, backgroundColor: 'black', margin:10}} /> */}
                <View>
                    <View>
                    <Text style={styles.inputText}>Total : {getTotalPrice()}</Text>
                    {/* <Text>VAT: 13%</Text> */}
                    <Text style={styles.inputText}>Grand Total : {getGrandTotalPrice()}</Text>
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
                        <Text>serviceTax: {serviceTax}%</Text>
                        <Text>Discount: {discount}%</Text>
                        <Text>Grand Total:<Text style={styles.modalText}>{getGrandTotalPrice()}</Text></Text>
                        </View>
                        {allserveCheckBox?<Text></Text>:<Text style={styles.warningText}>Not All food are Served</Text>}
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
      fontSize:15,
    },
    modalText: {
      fontWeight: "bold",
      fontSize:20,
      marginBottom: 25,
      textAlign: "center",
    },
    warningText: {
        fontWeight: "bold",
        marginBottom: 25,
        textAlign: "center",
        color:"red"
    },
    inputDiv:{
        flexDirection:'row',
        alignItems:'center'
    },
    inputField:{
        height: 40,
        width:100,
        marginVertical: 12,
        borderWidth: 1,
        padding: 5,
        fontSize:25,
        textAlign:'center',
        marginHorizontal:20,
    },
    inputText:{
        fontSize:20,
        textAlign:'center',
        fontWeight:'bold'
    },
  });
  