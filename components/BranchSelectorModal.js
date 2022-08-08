import { View, Text, Modal, Pressable, TouchableOpacity, StyleSheet } from 'react-native'
import React, {useEffect, useState} from 'react'
import { RadioButton } from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// localstorage
import storage from './Storage';

const branches = ['DurbarMarg', "kumaripati", "Baneshwor"]

const BranchSelectorModal = ({selectbranch,setSelectBranch}) => {
    // const [checked, setChecked] = useState('Durbarmarg'); //initial choice
    const [modalVisible, setModalVisible] = useState(false);
    const toggleBranch =()=>{
        setModalVisible(false)
        // save to localStorage
        storage.save({
          key:'branch',
          data:selectbranch,
          expires:null,
        })
    }
    const getBranch =()=>{
      storage.load({
        key: 'branch',
        autoSync: true,
        syncInBackground: true,
      })
      .then(ret => {
        // success
        console.log(ret)
        setSelectBranch(ret)
      })
      .catch(err => {
        console.warn(err.message);
      });
    }
    useEffect(()=>{
      getBranch()
    },[])
  return (
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
            {/* radio button */}
            <View>
            <View style={{flexDirection:'row',}}>
            <RadioButton
                value="Durbarmarg" 
                status={ selectbranch === 'Durbarmarg' ? 'checked' : 'unchecked' } 
                onPress={() => setSelectBranch('Durbarmarg')} 
                />
            <Text style={styles.textStyle}>DurbarMarg</Text>
            </View>
            <View style={{flexDirection:'row'}}>
            <RadioButton
                value="Kumaripati"
                status={ selectbranch === 'Kumaripati' ? 'checked' : 'unchecked' }
                onPress={() => setSelectBranch('Kumaripati')}
                /><Text style={styles.textStyle}>Kumaripati</Text>
            </View>
            </View>
            <Pressable
            style={[styles.button, styles.buttonClose]}
            onPress={toggleBranch}
            >
            <Text style={styles.textStyle}>Done</Text>
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
    <TouchableOpacity
        onPress={() => {setModalVisible(true)}}
        style={{
            position:'absolute',
            right: 50,
            top:10,
            }}
    >
        <MaterialIcons name="settings-input-composite" color="#F27405" size={30} />
     </TouchableOpacity>
    </View>
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
      backgroundColor: "black",
    },
    textStyle: {
      color: "orange",
      fontWeight: "bold",
      fontSize:15,
      alignSelf:"center"

    },
    modalText: {
      fontWeight: "bold",
      marginBottom: 25,
      textAlign: "center",
    }
  });
  

export default BranchSelectorModal