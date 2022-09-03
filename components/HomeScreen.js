import { View, Text, Image, StyleSheet } from 'react-native'
import { Card, Button } from 'react-native-elements'
import React, { useEffect, useState } from 'react'
import BranchSelectorModal from './BranchSelectorModal';
import storage from './Storage';

const HomeScreen = ({route, navigation }) => {
    const [selectbranch, setSelectBranch] = useState('durbarmarg');
    const getBranch =()=>{
        storage.load({
            key: 'branch',
            autoSync: true,
            syncInBackground: true,
          })
          .then(ret => {
            // success
            // console.log(ret)
            setSelectBranch(ret)
          })
          .catch(err => {
            console.warn(err.message);
          });
      }
      useEffect(()=>{
        getBranch();
      },[])
      
    return (
        <View>
            <Text style={{ alignSelf: "center", fontSize: 30, color: "#F27405" }}>Sinka</Text>
            {/* setting */}
            <View>
                <BranchSelectorModal selectbranch={selectbranch} setSelectBranch={setSelectBranch}/>
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
                        <Text style={styles.title}>Online Order</Text>
                        <Image
                            source={require('../assests/sinka_logo.jpg')}
                            style={{ width: 250, height: 200 }}
                        />
                        <Text style={{ marginBottom: 10 }}>
                            online delivery partner
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
                            {selectbranch}
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