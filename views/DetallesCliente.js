import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, ScrollView, View, Text, StatusBar, Alert} from 'react-native';
import { TextInput, Headline, Button, Paragraph, Dialog, Portal, List, FAB, Subheading } from 'react-native-paper'
import globalStyles from '../styles/global'
import axios from 'axios'
const DetallesCliente = ({ navigation,route}) => {
  const {guardarConsultarApi} = route.params
  const { nombre, telefono, correo, empresa,id } = route.params.item

  const mostrarConfirmacion = () => {
    Alert.alert(
      'Deseas eliminar este cliente?',
      'Un contacto no se puede recuperar',
      [
        {text:'Si, eliminar',onPress:()=>eliminarContacto()},
        {text:'Cancelar',style:'cancel'}
      ]
    )
  }
  const eliminarContacto = async() => {
    try {
      const res = await axios.delete(`http://localhost:3000/clientes/${id}`)
      navigation.navigate('Inicio')
      guardarConsultarApi(true)
    } catch (error) {
      
    }
  }
  
  return (
    <View style={globalStyles.contenedor}>
      <Headline style={globalStyles.titulo}>{nombre}</Headline>
      <Text style={styles.texto}>Empresa: <Subheading>{empresa}</Subheading></Text>
      <Text style={styles.texto}>Correo: <Subheading>{correo}</Subheading></Text>
      <Text style={styles.texto}>Telefono: <Subheading>{telefono}</Subheading></Text>
      <Button
        style={styles.btn}
        mode="contained"
        icon="cancel"
        onPress={()=>mostrarConfirmacion()}
      >Eliminar Cliente</Button>
       <FAB
        icon='pencil'
        style={globalStyles.fab}
        onPress={()=>navigation.navigate('NuevoCliente',{cliente:route.params.item,guardarConsultarApi})}
        />
    </View>
  )
}
const styles = StyleSheet.create({
  texto: {
    marginBottom: 20,
    fontSize: 18
  },
  btn: {
    marginTop: 100,
    backgroundColor: 'red'
  },

});
export default DetallesCliente
