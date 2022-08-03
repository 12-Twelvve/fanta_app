import { View, ScrollView, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { Button } from 'react-native-elements';
import React, { useEffect, useState } from 'react'
import MenuCategory from './MenuCategory';
import CurrentOrder from './CurrentOrder'
import MenuHeader from './MenuHeader';
// import MomoItems from './MomoItems';
import ItemCard from './ItemCard';
import { Data } from '../menuitems';
import { DATA } from './MenuCategory'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';


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

    const checkList = (dl) => {
        // console.log(menuSelection, dl.id, "=")
        return dl.id == menuSelection
    }
    const selectMenu = () => {
        // console.log(Data)
        let tempselectedItem = Data.find(checkList)
        setSelectedMenu(tempselectedItem?.menulist)
    }
    useEffect(() => {
        selectMenu()
    })
    return (
        <View style={styles.container}>
            {/* Menu Category Section LEFT */}
            <View style={styles.category}>
                <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
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
                    <Text>Table no. {route.params.num}</Text>
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
                <View>
                    <Text style={{ color: "black", fontSize: 30, alignSelf: "center", marginTop: 15 }}>CurrentOrder</Text>
                </View>
                <CurrentOrder renderClick={renderClick} tablenum ={route.params.num}  />
                <View>
                    <Button
                        title="Submit Order"
                        buttonStyle={{
                            backgroundColor: '#F27405',
                            borderRadius: 3,
                            //alignSelf:"baseline"
                        }}
                        onPress={() => navigation.navigate('Track', { num: route.params.num })}
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
        height: "auto",
        //justifyContent:"space-between",
    }

})
export default Menu