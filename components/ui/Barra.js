import React from 'react';
import {SafeAreaView,StyleSheet,ScrollView,View,Text,StatusBar,} from 'react-native';
import {Button} from 'react-native-paper'
const BarraSuperior = ({navigation,route}) => {

    const handlePress = (params) => {
      navigation.navigate('NuevoCliente')
    }
    
  return(
      <Button
      color="#fff"
        onPress={()=>handlePress()}
        icon="plus-circle"
      >
          Cliente
      </Button>
  )
}
const styles = StyleSheet.create({
    
});
export default BarraSuperior