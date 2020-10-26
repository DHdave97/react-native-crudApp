import React ,{useEffect,useState}from 'react';
import {SafeAreaView,StyleSheet,ScrollView,View,Text,StatusBar,Platform,FlatList} from 'react-native';
import {TextInput,Headline,Button,Paragraph,Dialog,Portal,List,FAB} from 'react-native-paper'
import globalStyles from '../styles/global'
import axios from 'axios'
const Inicio = ({navigation}) => {
  //state de la app
  const [clientes,guardarClientes] = useState([])
  const [consultarApi,guardarConsultarApi] = useState(true)
  useEffect(()=>{
    const obtenerClientesApi = async() => {
      try {
        const resultado = await axios.get('http://localhost:3000/clientes')
        guardarClientes(resultado.data)
        guardarConsultarApi(false)
      } catch (error) {
        
      }
    }
    if(consultarApi){
      obtenerClientesApi()
    }
  },[consultarApi])
  return(
      <View style={globalStyles.contenedor}>
        <Button 
        icon="plus-circle" 
        onPress={()=>navigation.navigate('NuevoCliente',{guardarConsultarApi})}>Nuevo cliente</Button>
  <Headline style={globalStyles.titulo}>{clientes.length > 0 ? 'Clientes':'Aun no hay clientes'}</Headline>
        <FlatList
          data={clientes}
          keyExtractor={cliente=>(cliente.id).toString()}
          renderItem={({item})=>(
            <List.Item
              title={item.nombre}
              description={item.empresa}
              onPress={()=>navigation.navigate('DetallesCliente',{item,guardarConsultarApi})}
            />
          )}
        />
        <FAB
        icon='plus'
        style={globalStyles.fab}
        onPress={()=>navigation.navigate('NuevoCliente',{guardarConsultarApi})}
        />
      </View>
  )
}
const styles = StyleSheet.create({
     
});
export default Inicio
