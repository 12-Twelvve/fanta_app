import { View, Text, SafeAreaView,  TouchableOpacity,  SectionList, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Button} from 'react-native-elements';
import { TextInput } from 'react-native-paper';
import storage from './Storage';

  const Item = ({ item,title, stock, setStock,}) => {
    const getActualValue =()=>{
        return stock.find((parti)=>parti.title==title).data.find(particu=>particu.item ==item.item).actual_remaining_stock
    }
    const handleActualUpdate =(event)=>{
        const { text } = event.nativeEvent;
        const name = event._dispatchInstances._debugOwner.memoizedProps.name
        stock.forEach((parti)=>{
            if (parti.title==title){
                // acutal update
                parti.data.forEach((itt)=>itt.item==name?itt.actual_remaining_stock=text:itt.actual_remaining_stock )
                // surplus update
                parti.data.forEach((itt)=>itt.item==name?itt.surplus=Number(itt.actual_remaining_stock)-Number(itt.available_remaining_stock):itt.surplus )
            }
        })
        setStock(stock)
    }
    const getEntryValue =()=>{
        return stock.find((parti)=>parti.title==title).data.find(particu=>particu.item ==item.item).stockEntry
    }
    const handleStockEntryUpdate =(event)=>{
        const { text } = event.nativeEvent;
        const name = event._dispatchInstances._debugOwner.memoizedProps.name
        stock.forEach((parti)=>{
            if (parti.title==title){
                // entry update
                parti.data.forEach((itt)=>itt.item==name?itt.stockEntry=text:itt.stockEntry )
                // available update
                // 
            }
        })
        setStock(stock)
    }

    return (
        <View style={{ flexDirection: "row", height: 50 }}>
            <View style={{ width: "30%", alignItems: "center", flexDirection: "row", paddingLeft:20 }}>
                <Text style={styles.title}>{item.item}</Text>
            </View>
            {/* useless */}
            <View style={{ width: "10%", alignItems: "center" }}>
                <Text style={{fontSize: 24, color:item.available_remaining_stock<item.minValue?"red":"", textAlign:'center'}}> {item.available_remaining_stock}</Text>
            </View>

            {/* -------- */}
            <View style={{ width: "15%", alignItems: "center" }}>
                <Text style={styles.title}> {item.available_remaining_stock}</Text>
            </View>
            <View style={{ width: "10%", alignItems: "center" }}>
                <Text style={styles.title}> {item.surplus}</Text>
            </View>
            <View style={{ width: "20%", alignItems: "center", borderWidth:0.5 }}>
                <TextInput
                    defaultValue={item.actual_remaining_stock}
                    value={getActualValue}
                    id={item.title}
                    name={item.item}
                    onChange={(event)=>handleActualUpdate(event)}
                    outlined
                    keyboardType='phone-pad'
                    style={{ width: "100%", fontSize: 24, marginRight:12 , textAlign:'center'}}
                    // style={{ width: "100%", height: "100%",fontSize: 24, marginRight:12 , textAlign:'center'}}
                />
            </View>

            <View style={{ width: "15%", alignItems: "center", borderWidth:0.5 }}>
                <TextInput
                    defaultValue={item.stockEntry}
                    value={getEntryValue}
                    id={item.title}
                    name={item.item}
                    onChange={(event)=>handleStockEntryUpdate(event)}
                    outlined
                    keyboardType='phone-pad'
                    style={{ width: "100%",fontSize: 24, textAlign:'center' }}
                    // style={{ width: "100%", height: "100%",fontSize: 24, textAlign:'center' }}
                />
            </View>
        </View>
    )
}
export default function Stock() {
    const navigation = useNavigation();
    const [branch, setbranch] = useState('')
    const [stock, setStock] = useState('')
    const [lock, setlock] = useState(false)
    const [date, setdate] = useState('')
    const getBranch =()=>{
        storage.load({
            key: 'branch',
            autoSync: true,
            syncInBackground: true,
          })
          .then(br => {
            if (br == "durbarmarg"){
               setbranch("durbarmarg_stock")
            }else{
               setbranch("kumaripati_stock")
            }
          })
          .catch(err => {
            console.warn(err.message);
          });
      }
    const handlesubmit =()=>{
        // manage available stock
        stock.forEach((parti)=>{
                parti.data.forEach((itt)=>{
                    itt.available_remaining_stock=Number(itt.available_remaining_stock)+Number(itt.stockEntry)
                    itt.stockEntry=Number(0)
                })
        })
        // submit post data -->
        getBranch()
        fetch('https://7409-49-126-70-37.in.ngrok.io/'+branch+'', {
            method: 'POST', // or 'PUT'
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({date:date,items:stock}),
        })
        .then((response) => response.json())
        .then((message) => {
            console.log('Success:', message);
            setlock(false)
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }
    const fecthData =()=>{
        getBranch()
        // console.log('http://192.168.1.70:8000/'+branch)
        fetch('https://7409-49-126-70-37.in.ngrok.io/'+branch+'')
        .then((response) => response.json())
        .then((data) =>{
            // console.log("--+--",data.items[0].data)
            if (branch){
                setStock(data.items)
                setdate(data.date)
                setlock(true)
            }
        })
        .catch((error) => {
            console.error('Error: ', error);
        });
    }
    useEffect(()=>{
        if (!lock){
            fecthData()
        }
    })

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
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center", margin: 30, }}>
                <Text style={{ alignSelf: "center", fontSize: 30 }}>Stock Track</Text>
            {/* ----------header  item name  available stock actual stock---------------------------------- */}
                <View style={{ flexDirection: "row", height:60}}>
                    <View style={{ width: "30%", backgroundColor: "#F27405", paddingLeft:20, justifyContent: "center", }}>
                        <Text style={{ color: "white", fontWeight: "bold", fontSize: 20 }}>Particulars</Text>
                    </View>
                    <View style={{ width: "10%", backgroundColor: "#F27405", alignItems: "center", justifyContent: "center", }}>
                        <Text style={{ color: "white" , fontWeight: "bold", fontSize: 20}}>Tomorrow Order</Text>
                    </View> 
                    <View style={{ width: "15%", backgroundColor: "#F27405", alignItems: "center", justifyContent: "center", }}>
                        <Text style={{ color: "white" , fontWeight: "bold", fontSize: 20}}>Available Remaining Stock</Text>
                    </View>
                    <View style={{ width: "10%", backgroundColor: "#F27405", alignItems: "center", justifyContent: "center", }}>
                        <Text style={{ color: "white" , fontWeight: "bold", fontSize: 20}}>surplus</Text>
                    </View>
                    <View style={{ width: "20%", backgroundColor: "#F27405", alignItems: "center", justifyContent: "center", }}>
                        <Text style={{ color: "white" , fontWeight: "bold", fontSize: 20}}>Actual Remaining Stock</Text>
                    </View>
                    <View style={{ width: "15%", backgroundColor: "#F27405", alignItems: "center", justifyContent: "center", }}>
                        <Text style={{ color: "white" , fontWeight: "bold", fontSize: 20}}>Entry</Text>
                    </View>
                </View>
                 <SafeAreaView style={styles.container}>
                 <SectionList
                    sections={stock}  
                    keyExtractor={(item, index) => item + index}
                    renderItem={({ item,  section: { title }}) => <Item title={title} item={item} stock={stock} setStock={setStock} />}
                    renderSectionHeader={({ section: { title } }) => (
                        <Text style={styles.header}>{title}</Text>
                    )}
                    extraData={stock}
                    />
                </SafeAreaView>
                    <Button
                        onPress={handlesubmit}
                        buttonStyle={{ backgroundColor: "#F27405", borderRadius: 20, }}
                        title='Update'
                    />
            </View >
        </>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: 20,
      marginHorizontal: 10
    },
    item: {
      backgroundColor: "#f9c2ff",
      padding: 20,
      marginVertical: 8
    },
    header: {
      fontSize: 32,
      backgroundColor: "#fff",
      fontWeight: "bold"
    },
    title: {
      fontSize: 24
    }
  });
  