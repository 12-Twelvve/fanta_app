import { View, Text, Image, StyleSheet } from 'react-native'
import { Card, ListItem, Button } from 'react-native-elements'
import React from 'react'

const HomeScreen = ({ navigation }) => {
    return (
        <View>
            <Text style={{ alignSelf: "center", fontSize: 30, color: "#F27405" }}>Sinka</Text>
            <View style={styles.container}>

                <View style={styles.card}>
                    <Card >
                        <Text style={styles.title}>Table Order</Text>
                        <Image
                            source={require('../assests/sinka_logo.jpg')}
                            style={{ width: 250, height: 200 }}
                        />
                        <Text style={{ marginBottom: 10 }}>
                            The idea with React Native
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
                            The idea with React Native
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
                            The idea with React Native
                        </Text>
                        <Button
                            //icon={<Icon name='code' color='#ffffff' />}
                            buttonStyle={{ borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0, backgroundColor: "#F27405" }}
                            title='VIEW NOW'
                            onPress={() =>
                                navigation.navigate('Online')
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
        //alignItems: "center",
        //justifyContent:"center",


    },
})
export default HomeScreen