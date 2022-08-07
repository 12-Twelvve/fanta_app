import { View, Text, Image, StyleSheet } from 'react-native'
import { Card, ListItem, Button } from 'react-native-elements'
import React, { useEffect, useReducer, useState } from 'react'
import DropDownPicker from 'react-native-dropdown-picker';
import BranchSelectorModal from './BranchSelectorModal';

const branches =[ 
{label: 'DurbarMarg', value: 'durbarmarg'},
{label: 'Kumaripati', value: 'kumaripati'},
{label: 'Baneshwor', value: 'baneshwor'},
]

const HomeScreen = ({route, navigation }) => {
    const [open, setOpen] = useState(false);
    const [selectbranch, setSelectBranch] = useState('durbarmarg');
  
  
    return (
        <View>
            <Text style={{ alignSelf: "center", fontSize: 30, color: "#F27405" }}>Sinka</Text>
            {/* setting */}
            <View>
                <BranchSelectorModal/>
            </View>
            <View style={styles.container}>
                {/* ....cards... */}
                <View style={styles.card}>
                    <Card >
                        <Text style={styles.title}>Table Order</Text>
                        <Image
                            source={require('../assests/sinka_logo.jpg')}
                            style={{ width: 250, height: 200 }}
                        />
                        <Text style={{ marginBottom: 10 }}>
                            In Resturant
                        </Text>
                        <Button
                            //icon={<Icon name='code' color='#ffffff' />}
                            buttonStyle={{ borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0, backgroundColor: "#F27405" }}
                            title='VIEW NOW'
                            onPress={() =>
                                navigation.navigate('Table')
                            }
                        />
                    </Card>
                    <Card>
                        <Text style={styles.title}>Packaging</Text>
                        <Image
                            source={require('../assests/sinka_logo.jpg')}
                            style={{ width: 250, height: 200 }}
                        />
                        <Text style={{ marginBottom: 10 }}>
                            Packaging.... no need
                        </Text>
                        <Button
                            //icon={<Icon name='code' color='#ffffff' />}
                            buttonStyle={{ borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0, backgroundColor: "#F27405" }}
                            title='VIEW NOW'
                            onPress={() =>
                                navigation.navigate('Packaging')
                            } />
                    </Card>
                    <Card>
                        <Text style={styles.title}>Online Order</Text>
                        <Image
                            source={require('../assests/sinka_logo.jpg')}
                            style={{ width: 250, height: 200 }}
                        />
                        <Text style={{ marginBottom: 10 }}>
                            online food delivery system
                        </Text>
                        <Button
                            //icon={<Icon name='code' color='#ffffff' />}
                            buttonStyle={{ borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0, backgroundColor: "#F27405" }}
                            title='VIEW NOW'
                            onPress={() =>
                                navigation.navigate('Online')
                            } />
                    </Card>
                    <Card>
                        <Text style={styles.title}>Stock </Text>
                        <Image
                            source={require('../assests/sinka_logo.jpg')}
                            style={{ width: 250, height: 200 }}
                        />
                        <Text style={{ marginBottom: 10 }}>
                            specific branch name

                        </Text>
                        <Button
                            //icon={<Icon name='code' color='#ffffff' />}
                            buttonStyle={{ borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0, backgroundColor: "#F27405" }}
                            title='VIEW NOW'
                            onPress={() =>
                                navigation.navigate('Stock')
                            } />
                    </Card>

                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: "90%",
        
        //alignItems: "center",
        justifyContent: "center",
        backgroundColor: "E4E4E4",
    },
    title: {
        fontWeight: "bold",
        fontSize: 20,
        color: "#F27405",
        alignSelf: "center",
        marginBottom: 10,
    },
    card: {
        flexDirection: "row",
        justifyContent: "space-evenly",
    },
})
export default HomeScreen