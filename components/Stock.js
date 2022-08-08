import { View, Text, FlatList,SafeAreaView,  TouchableOpacity,  SectionList, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Checkbox } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Button, CheckBox } from 'react-native-elements';
import { TextInput } from 'react-native-paper';


const DATA = [
    {
      title: "Main dishes",
      data: [
        { items: "Local Jhol Momo", availablestock: 1,actualStock:0 },
        { items: "Local Jhol Momo", availablestock: 3,actualStock:0 },
    ]
    },
    {
      title: "Desserts",
      data: [
        { items: "Local Jhol Momo", availablestock: 1,actualStock:0 },
        { items: "Local Jhol Momo", availablestock: 3,actualStock:0 },
    ]
    },
    {
        title: "Daru",
        data: [
          { items: "Local Jhol ", availablestock: 1,actualStock:0 },
          { items: "Local ", availablestock: 3,actualStock:0 },
      
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

    return (
        <View style={{ flexDirection: "row", height: 50 }}>
            <View style={{ width: "50%", alignItems: "center", flexDirection: "row", paddingLeft:20 }}>
                <Text style={styles.title}>{item.items}</Text>
            </View>
            <View style={{ width: "25%", alignItems: "center" }}>
                <Text style={styles.title}> {item.availablestock}</Text>
            </View>
            <View style={{ width: "25%", alignItems: "center" }}>
                <TextInput
                    defaultValue={item.actualStock}
                    value={getActualValue}
                    id={item.title}
                    name={item.items}
                    onChange={(event)=>handleActualUpdate(event)}
                    outlined
                    keyboardType='phone-pad'
                    style={{ width: "100%", height: "100%",fontSize: 24 }}
                />
            </View>
        </View>
    )
}
export default function Stock() {
    const navigation = useNavigation();
    // const [actualValue, setactualValue] = useState({});
    const [stock, setStock] = useState(DATA)
    const handlesubmit =()=>{
        // submit post data -->
    }
    const fectgData =()=>{}
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
            {/* ----------header  item name  available stock actual stock---------------------------------- */}
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center", margin: 30, }}>
                <Text style={{ alignSelf: "center", fontSize: 30 }}>Stock Track</Text>
                <View style={{ flexDirection: "row", }}>
                    <View style={{ width: "50%", backgroundColor: "#F27405", paddingLeft:20, height: 35, justifyContent: "center", }}>
                        <Text style={{ color: "white", fontWeight: "bold", fontSize: 20 }}>Pname</Text>
                    </View>
                    <View style={{ width: "25%", backgroundColor: "#F27405", alignItems: "center", justifyContent: "center", }}>
                        <Text style={{ color: "white" , fontWeight: "bold", fontSize: 20}}>Available_remainingStock</Text>
                    </View>
                    <View style={{ width: "25%", backgroundColor: "#F27405", alignItems: "center", justifyContent: "center", }}>
                        <Text style={{ color: "white" , fontWeight: "bold", fontSize: 20}}>Actual_Remaining_Stock</Text>
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
                {/* <View style={{ flexDirection: "row", justifyContent: "space-between", width: "100%" }}> */}
                    <Button
                        onPress={handlesubmit}
                        buttonStyle={{ backgroundColor: "#F27405", borderRadius: 20, }}
                        title='Update'
                    />
                {/* </View> */}
            </View >
        </>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: 20,
      marginHorizontal: 16
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
  