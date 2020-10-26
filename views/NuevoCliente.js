import React,{useState,useEffect} from 'react';
import {SafeAreaView,StyleSheet,ScrollView,View,Text,StatusBar,Platform} from 'react-native';
import {TextInput,Headline,Button,Paragraph,Dialog,Portal} from 'react-native-paper'
import globalStyles from '../styles/global'
import axios from 'axios'
const NuevoCLiente = ({navigation,route}) => {
  const {guardarConsultarApi}=route.params
  //campos formulario
  const [nombre,guardarNombre] = useState('')
  const [telefono,guardarTelefono] = useState('')
  const [correo,guardarCorreo] = useState('')
  const [empresa,guardarEmpresa] = useState('')
  const [alerta,guardarAlerta] = useState(false)

  //detect edicion
  useEffect(()=>{
    if(route.params.cliente){
      const {nombre,telefono,correo,empresa} = route.params.cliente
      guardarNombre(nombre)
      guardarEmpresa(empresa)
      guardarTelefono(telefono)
      guardarCorreo(correo)
    }
  },[])


    //guarda cliente
    const guardarCliente =async () => {
      //validar
      if(nombre == '' || telefono == '' || correo == '' || empresa == ''){
        guardarAlerta(true)
        return;
      }
      //generar cliente
      const cliente = {nombre,telefono,correo,empresa}
      var save = false
      if(route.params.cliente){
        const {id} = route.params.cliente
        cliente.id = id
        save = await actualizar(cliente)
      }else{
        save = await guardar(route,cliente)
      }

      //redireccion
      navigation.navigate('Inicio')
       //limpiar form
      guardarNombre('')
      guardarCorreo('')
      guardarTelefono('')
      guardarEmpresa('')
      guardarConsultarApi(true)
    }
    
  const guardar = async(cliente) => {
     //guardar cliente appi
     console.log(cliente)
     try {
       //android
       if(Platform.OS == 'android') await axios.post('http://10.0.2.2:3000/clientes',cliente)
       //ios
       if(Platform.OS == 'ios')await axios.post('http://localhost:3000/clientes',cliente)
       return true
     } catch (error) {
       console.log(error)
     }
  }
  const actualizar = async(cliente) => {
    //guardar cliente appi
    console.log(cliente)
    try {
      //android
      if(Platform.OS == 'android') await axios.put(`http://10.0.2.2:3000/clientes/${cliente.id}`,cliente)
      //ios
      if(Platform.OS == 'ios')await axios.put(`http://localhost:3000/clientes/${cliente.id}`,cliente)
      return true
    } catch (error) {
      console.log(error)
    }
 }
  return(
    <View style={globalStyles.contenedor}>
      <Headline style={globalStyles.titulo}>Añadir nuevo cliente</Headline>
      <TextInput
        label="Nombre"
        value={nombre}
        onChangeText={(texto)=>guardarNombre(texto)}
        style={styles.input}
      />
       <TextInput
        label="Telefono"
        value={telefono}
        onChangeText={(texto)=>guardarTelefono(texto)}
        style={styles.input}
      />
       <TextInput
        label="Correo"
        value={correo}
        onChangeText={(texto)=>guardarCorreo(texto)}
        style={styles.input}
      />
       <TextInput
        label="Empresa"
        value={empresa}
        onChangeText={(texto)=>guardarEmpresa(texto)}
        style={styles.input}
      />
      <Button icon="pencil-circle" mode="contained"
        onPress={()=>guardarCliente()}
      >
        Guardar Cliente
      </Button>

      <Portal>
        <Dialog
          visible={alerta}
          onDismiss={()=>guardarAlerta(false)}
        >
          <Dialog.Title>Error</Dialog.Title>
          <Dialog.Content>
            <Paragraph>Todos los campos son obligatorios</Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={()=>guardarAlerta(false)}>Aceptar</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  )
}
const styles = StyleSheet.create({
    input:{
      marginBottom:20,
      backgroundColor:'transparent'
    }
});
export default NuevoCLiente
