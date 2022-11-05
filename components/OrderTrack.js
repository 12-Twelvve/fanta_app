import { View, Text, FlatList,ScrollView, TextInput, TouchableOpacity,Modal, StyleSheet , Pressable} from 'react-native'
import React, { useState,  useEffect } from 'react'
import { Checkbox } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Button } from 'react-native-elements'
import { useSelector, useDispatch } from 'react-redux';
import { cleanTable, updateServedItem, updateAllServedItem, updateCancelItem, deleteItem } from './redux/tableOrderSlice';
import storage from './Storage';


export default function OrderTrack({route}) {
    const [rerender, setrerender] = useState(false)
    const [modalVisible, setModalVisible] = useState(false);
    const [deleteModalVisible, setDeleteModalVisible] = useState(false);
    const [deleteConfirmation, setdeleteConfirmation] = useState(false)
    const [deleteData, setdeleteData] = useState({})
    const dispatch = useDispatch()
    const orders = useSelector((state)=>state.table_order?.find(table =>table?.tableNo == route.params.num)?.kot)
    const [discount, setdiscount] = useState(0)
    const [serviceTax, setserviceTax] = useState(0)
    const [onlinePartner_token, setonlinePartner_token] = useState('')
    const [branch, setbranch] = useState('')
    const navigation = useNavigation();
    const online_portal = useSelector((state)=>state.online_portal)
    // for submitting.
    const ord = useSelector((state)=>state.table_order?.find(table =>table?.tableNo == route.params.num))
    // checkbox
    const [allserveCheckBox, setallserveCheckBox] = useState(false)
    const [serveCheckBox, setserveCheckBox] = useState({})
    const [removeitem, setremoveitem] = useState({})
    const getBranch =()=>{
        storage.load({
            key: 'branch',
            autoSync: true,
            syncInBackground: true,
          })
          .then(br => {
            if (br == "durbarmarg"){
               setbranch("durbarmarg_order")
            }else{
               setbranch("kumaripati_order")
            }
          })
          .catch(err => {
            console.warn(err.message);
          });
    }
    const getTotalPrice =()=>{  
        let total =0
        orders?.map((kot)=>{
            kot.items.map((items)=>{
                if (!items.cancel){
                    // console.log(items.cancel)
                    total +=Number(items.price)*Number(items.quantity)
                }
            })
        })
        return total
    }
    const getGrandTotalPrice =()=>{  
        let total = getTotalPrice()
        let dscnt= Number(total)*(Number(discount)/100)
        let total2 = Number(total) - Number(dscnt)
        let tax= Number(total2)*(Number(serviceTax)/100)
        let gtotal = Number(total2) + Number(tax)
        return gtotal.toFixed(2)
    }
    const toggleCheckbox= (kotId, i)=>{
        let tmp = !serveCheckBox[kotId+i]
        serveCheckBox[kotId+i] = tmp
        dispatch(updateServedItem({index:i, kotId:kotId, value:tmp, tableNo:route.params.num}))
        // handle served
        handleOrder()
    }
    const toggleCancelCheckbox= (kotId, i)=>{
        let tmp = !removeitem[kotId+i]
        removeitem[kotId+i] = tmp
        dispatch(updateCancelItem({index:i, kotId:kotId, value:tmp, tableNo:route.params.num}))
        // handle served
        handleOrder()
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
            navigation.navigate('Home')
            // handle Checkout
            handleCheckoutOrder()
        }
    }
    const handleCheckoutOrder =()=>{
        getBranch()
        fetch('https://fanta-backend12.herokuapp.com/'+branch+'?type=checkout', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({...ord, discount:discount, serviceTax:serviceTax, total:getTotalPrice(), grandTotal:getGrandTotalPrice(), token:onlinePartner_token}),
        })
        .then((response) => response.json())
        .then((message) => {
            console.log('Success:', message);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }
    const handleOrder=()=>{
        // console.log("ordertrck87-",ord)
        getBranch()
        fetch('https://fanta-backend12.herokuapp.com/'+branch+'', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(ord),
        })
        .then((response) => response.json())
        .then((message) => {
            console.log('Success:', message);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }
    const toggleDeleteItem= (dt)=>{
        dispatch(deleteItem({index:dt.index, kotId:dt.kotId, tableNo:route.params.num}))
        delete serveCheckBox[dt.kotId+dt.index]
        handleOrder()
        setDeleteModalVisible(false)
    }
    useEffect(()=>{
        // console.log(serveCheckBox)
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
        // submit data
        handleOrder()

    }, [orders, serveCheckBox, allserveCheckBox])

    const deleteConfirmationModel =(kotId, index)=>{
       setdeleteData({kotId, index})
       setDeleteModalVisible(true)
    }

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
                <View style={{ width: "40%", alignItems: "center"}}>
                    <Text >{item.title}</Text>
                </View>
                <View style={{ width: "10%", alignItems: "center" }}>
                    <Text>{item.served?"served":"pending"}</Text>
                </View>
                <View style={{ width: "10%", alignItems: "center" }}>
                    <Text>{item.quantity}</Text>
                </View>
                <View style={{ width: "10%", alignItems: "center" }}>
                    <Text>{item.price}</Text>
                </View>
                <View style={{ width: "10%", alignItems: "center" }}>
                    <Checkbox
                        color='red'
                        status={removeitem[kotId+index] ? 'checked': 'unchecked'}
                        onPress={() => {
                            toggleCancelCheckbox(kotId,index)
                        }}
                    />
                </View>
                <View style={{ width: "10%", alignItems: "center" }}>
                    <TouchableOpacity onPress={()=>{
                        // console.log(index, kotId,'sdsdsdsds')
                        deleteConfirmationModel(kotId, index)
                        }} >
                        <MaterialIcons  name="cancel" size={20} color="red" />
                    </TouchableOpacity>
                </View>

            </View>
        )
    }
    return (
        <>
             {/* model for delete prompt */}
             <View>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={deleteModalVisible}
                    onRequestClose={() => {
                    setDeleteModalVisible(false);
                    }}
                >
                    <TouchableOpacity 
                        style={styles.container} 
                        activeOpacity={1} 
                        onPressOut={() => {setDeleteModalVisible(false)}}
                    ></TouchableOpacity>
                    <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <View>
                        <Text>Are you sure you want to delete this item?</Text>
                        </View>
                        <Pressable
                        style={[styles.button, styles.buttonClose]}
                        onPress={()=>toggleDeleteItem(deleteData)}
                        >
                        <Text style={styles.textStyle}>Delete</Text>
                        </Pressable>
                        <TouchableOpacity
                            onPress={() => {setDeleteModalVisible(false)}}
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
            {/* {deleteConfirmation?deleteConfirmationModel:''} */}

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
                    <View style={{ width: "40%", backgroundColor: "#F27405", alignItems: "center", height: 35, justifyContent: "center", }}>
                        <Text style={{ color: "white" }}>Items</Text>
                    </View>
                    <View style={{ width: "10%", backgroundColor: "#F27405", alignItems: "center", justifyContent: "center", }}>
                        <Text style={{ color: "white" }}>Status</Text>
                    </View>
                    <View style={{ width: "10%", backgroundColor: "#F27405", alignItems: "center", justifyContent: "center", }}>
                        <Text style={{ color: "white" }}>Quantity</Text>
                    </View>
                    <View style={{ width: "10%", backgroundColor: "#F27405", alignItems: "center", justifyContent: "center", }}>
                        <Text style={{ color: "white" }}>Price</Text>
                    </View>
                    <View style={{ width: "10%", backgroundColor: "#F27405", alignItems: "center", justifyContent: "center", }}>
                        <Text style={{ color: "white" }}>Canceled</Text>
                    </View>
                    <View style={{ width: "10%", backgroundColor: "#F27405", alignItems: "center", justifyContent: "center", }}>
                        <Text style={{ color: "white" }}>Delete</Text>
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
                {/* for online partners order */}

                {
                    online_portal?<View style={styles.inputDiv}>
                    <Text style={styles.inputText}> Token </Text>
                    <TextInput
                        style={styles.tokenField}
                        onChangeText={setonlinePartner_token}
                        value={onlinePartner_token}
                        />
                    </View>:''
                }
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
                {/* model for checkout */}
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
                        // onPress={() => navigation.goBack()}
                        onPress={() => navigation.navigate('Menu', {num:route.params.num})}
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
    tokenField:{
        height: 40,
        width:205,
        marginVertical: 12,
        borderWidth: 1,
        padding: 3,
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
  


  //  LOG  --addkot [{"id": "", "kot": [], "tableNo": ""}, {"id": 1661504956333, "kot": [[Object], [Object]], "tableNo": "3"}]