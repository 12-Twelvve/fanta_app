import { View, ScrollView, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { Button } from 'react-native-elements';
import React, { useEffect, useState } from 'react'
import MenuCategory from './MenuCategory';
import CurrentOrder from './CurrentOrder'
import MenuHeader from './MenuHeader';
import ItemCard from './ItemCard';
import { Data } from '../menuitems';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import {addTableKot } from './redux/tableOrderSlice'
import { cleanKot } from './redux/kotSlice';

export const momo = [
    {
        id: "1",
        name: "Local Jhol Momo",
        price: "150",
        image: require('../assests/jholmomo.png')
    },
    {
        name: "Tandoori momo",
        price: "10",
        image: require('../assests/tandoorimomo.png')
    },
    {
        name: "Steam momo",
        price: "200",
        image: require('../assests/steam_momo.png')
    },
    {
        name: "Sizzler momo",
        price: "90",
        image: require('../assests/sizzler_momo.png')
    },
    {
        name: "Sadheko momo",
        price: "500",
        image: require('../assests/sadheko_momo.png')
    },
    {
        name: "Sukuti momo",
        price: "500",
        image: require('../assests/sukuti_momo.png')
    }
]
const Menu = ({route}) => {
    const [menuSelection, setMenuSelection] = useState('1')
    const [selectedMenu, setSelectedMenu] = useState([])
    const [renderClick, setRenderClick] = useState(false)
    const navigation = useNavigation();
    const kot = useSelector((state)=>state.kot)
    const dispatch =useDispatch()
    
    // const getMenu =()=>{}
    const checkList = (dl) => {
        return dl.id == menuSelection
    }

    const selectMenu = () => {
        let tempselectedItem = Data.find(checkList)
        setSelectedMenu(tempselectedItem?.menulist)
    }
    const handleKot =()=>{
        dispatch(addTableKot({kot, tableNo:route.params.num }))
        navigation.navigate('Track', { num: route.params.num })
        dispatch(cleanKot())
        
    }

    useEffect(() => {
        selectMenu()
    })
    return (
        <View style={styles.container}>
            <View style={styles.category}>
                <View style={{ flexDirection: "row", justifyContent: "space-around",marginTop:20 }}>
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
                    <Text style={{fontWeight:'bold'}}>Table:<Text style={{color:'orange', fontSize:18}}> {route.params.num}</Text></Text>
                </View>
                <MenuCategory setMenuSelection={setMenuSelection} />
            </View>
            {/* Main Menu Section MIDDLE */}
            <View style={styles.menus}>
                <MenuHeader />
                {/* menu items */}
                <ScrollView>
                    <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                        {selectedMenu?.map((e) => {
                            return (
                                <ItemCard setRenderClick={setRenderClick} renderClick={renderClick} num= {route.params.num} title={e.name} price={e.price} image={e.image} />
                            );
                        })}
                    </View>
                </ScrollView>
            </View>
            {/* Current Order Section RIGHT */}
            <View style={styles.currentorder} >
                <View style={{flex:1}}>
                    <Text style={{ color: "black", fontSize: 30, alignSelf: "center", marginTop: 15 }}>CurrentOrder</Text>
                </View>
                <View style={{flex:10}}>
                <CurrentOrder renderClick={renderClick} tablenum ={route.params.num}  />
                </View>
                <View style={{flex:1}} >
                    <Button
                        title="Submit Order"
                        buttonStyle={{
                            backgroundColor: '#F27405',
                            borderRadius: 3,
                            //alignSelf:"baseline"
                        }}
                        onPress={handleKot}
                    />
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        //display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        flex:1,
        
    },
    category: {
        justifyContent: "flex-start",
        backgroundColor: "white",
        width: "20%",
    },
    menus: {
        //justifyContent: "center",
        //flex: 1,
        //flexDirection:"row",
        width: "55%",
    },
    header: {
        flexDirection: "row",
        //alignItems: "center",
    },
    currentorder: {
        //justifyContent: "flex-end",
        backgroundColor: "white",
        width: "25%",
        flex:1,
        // height: "auto",
        //justifyContent:"space-between",
    }

})
export default Menu