import { View, Text, SafeAreaView,  TouchableOpacity,  SectionList, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Button} from 'react-native-elements';
import { TextInput } from 'react-native-paper';


const DATA = [
    {
      title: "Main dishes",
      data: [
        { items: "Local Jhol Momo", availablestock: 1,actualStock:0, surplus:0, stockEntry:0 , tomorrowOrder:0, min:1 },
        { items: "Local Jhol Momo", availablestock: 3,actualStock:0, surplus:0, stockEntry:0 ,tomorrowOrder:1, min:1 },
    ]
    },
    {
      title: "Desserts",
      data: [
        { items: "Local Jhol Momo", availablestock: 1,actualStock:0, surplus:0, stockEntry:0,tomorrowOrder:0, min:1  },
        { items: "Local Jhol Momo", availablestock: 3,actualStock:0, surplus:0, stockEntry:0 ,tomorrowOrder:5, min:2 },
    ]
    },
    {
        title: "Daru",
        data: [
          { items: "Local Jhol ", availablestock: 1,actualStock:0, surplus:0, stockEntry:0 ,tomorrowOrder:5, min:2 },
          { items: "Local ", availablestock: 3,actualStock:0, surplus:0, stockEntry:0 ,tomorrowOrder:5, min:2 },
      
      ]
      }
  ];
  const Item = ({ item,title, stock, setStock,}) => {
    const getActualValue =()=>{
        return stock.find((parti)=>parti.title==title).data.find(particu=>particu.items ==item.items).actualStock
    }
    const handleActualUpdate =(event)=>{
        const { text } = event.nativeEvent;
        const name = event._dispatchInstances._debugOwner.memoizedProps.name
        stock.forEach((parti)=>{
            if (parti.title==title){
                parti.data.forEach((itt)=>itt.items==name?itt.actualStock=text:itt.actualStock )
            }
        })
        setStock(stock)
    }
    const getEntryValue =()=>{
        return stock.find((parti)=>parti.title==title).data.find(particu=>particu.items ==item.items).stockEntry
    }
    const handleStockEntryUpdate =(event)=>{
        const { text } = event.nativeEvent;
        const name = event._dispatchInstances._debugOwner.memoizedProps.name
        stock.forEach((parti)=>{
            if (parti.title==title){
                parti.data.forEach((itt)=>itt.items==name?itt.stockEntry=text:itt.stockEntry )
            }
        })
        setStock(stock)
    }

    return (
        <View style={{ flexDirection: "row", height: 50 }}>
            <View style={{ width: "30%", alignItems: "center", flexDirection: "row", paddingLeft:20 }}>
                <Text style={styles.title}>{item.items}</Text>
            </View>
            <View style={{ width: "10%", alignItems: "center" }}>
                <Text style={{fontSize: 24, color:item.tomorrowOrder<item.min?"red":"", textAlign:'center'}}> {item.tomorrowOrder}</Text>
            </View>
            <View style={{ width: "15%", alignItems: "center" }}>
                <Text style={styles.title}> {item.availablestock}</Text>
            </View>
            <View style={{ width: "10%", alignItems: "center" }}>
                <Text style={styles.title}> {item.surplus}</Text>
            </View>
            <View style={{ width: "20%", alignItems: "center" }}>
                <TextInput
                    defaultValue={item.actualStock}
                    value={getActualValue}
                    id={item.title}
                    name={item.items}
                    onChange={(event)=>handleActualUpdate(event)}
                    outlined
                    keyboardType='phone-pad'
                    style={{ width: "100%", height: "100%",fontSize: 24, marginRight:12 , textAlign:'center'}}
                />
            </View>
            <View style={{ width: "15%", alignItems: "center" }}>
                <TextInput
                    defaultValue={item.stockEntry}
                    value={getEntryValue}
                    id={item.title}
                    name={item.items}
                    onChange={(event)=>handleStockEntryUpdate(event)}
                    outlined
                    keyboardType='phone-pad'
                    style={{ width: "100%", height: "100%",fontSize: 24, textAlign:'center' }}
                />
            </View>
        </View>
    )
}
export default function Stock() {
    const navigation = useNavigation();
    const [stock, setStock] = useState(DATA)
    const handlesubmit =()=>{
        // submit post data -->
    }
    const fecthData =()=>{}
    useEffect(()=>{})

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
                        <Text style={{ color: "white", fontWeight: "bold", fontSize: 20 }}>Pname</Text>
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
                    sections={DATA}
                    keyExtractor={(item, index) => item + index}
                    renderItem={({ item,  section: { title }}) => <Item title={title} item={item} stock={stock} setStock={setStock} />}
                    renderSectionHeader={({ section: { title } }) => (
                        <Text style={styles.header}>{title}</Text>
                    )}
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
  