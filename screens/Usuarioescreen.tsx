import { Alert, Button, FlatList, StatusBar, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ref, set, onValue, update, remove } from "firebase/database";
import Tarjeta from '../components/tarjeta';
import { db } from '../config/Config';


export default function UsuarioScreen() {
  const [cedula, setcedula,] = useState("")
  const [nombre, setnombre,] = useState("")
  const [correo, setcorreo,] = useState("")
  const [comentario, setcomentario,] = useState("")
  const [usuarios, setusuarios] = useState([])

  //----------------GUARDAR----------------------/// 
  function guardarUsuario(cedula: string, nombre: string, correo: string, comentario: string) {

    set(ref(db, 'usuarios/' + cedula), {
      name: nombre,
      email: correo,
      comment: comentario
    });
    Alert.alert('Se guardo')
    /// limpiar campos 
    setcedula('')
    setnombre('')
    setcorreo('')
    setcomentario('')
  }
  ///--------------LEER INFORMACION-----------//// 
  useEffect(() => {
    const starCountRef = ref(db, 'usuarios/');
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();

      //console.log(data); 

      const dataTemp: any = Object.keys(data).map((key) => ({
        key, ...data[key]


      }))
      console.log(dataTemp);
      setusuarios(dataTemp)
    });
  }, [])



  //editar
  function editar(id: string) {

    update(ref(db, 'usuarios/' + id), {
      name: nombre,
      email: correo,
      comment: comentario
    });

    Alert.alert('edicion completa')
    /// limpiar campos 
    setcedula('')
    setnombre('')
    setcorreo('')
    setcomentario('')
  }
  ///////EDITAR2




  function editar2(item: any) {
    setcedula(item.key)
    setnombre(item.name)
    setcorreo(item.email)
    setcomentario(item.comment)
  }
  //// visualizar


  //eliminar
  function eliminar(id: string) {

    remove(ref(db, 'usuarios/' + id));

  }


  type Usuario = {
    name: string
    key: string
  }
  return (
    <View style={styles.container}>
      <Text>Usuario</Text>
      <TextInput placeholder='Ingresar Cedula' style={styles.txt}
        onChangeText={(texto) => setcedula(texto)}
        value={cedula}
        keyboardType='numeric' />

      <TextInput placeholder='Ingresar Nombre' style={styles.txt}
        onChangeText={(texto) => setnombre(texto)}
        value={nombre} />

      <TextInput placeholder='correo' style={styles.txt}
        onChangeText={(texto) => setcorreo(texto)}
        value={correo}
        keyboardType='email-address' />

      <TextInput placeholder='Ingresar Descripción' style={styles.txt}
        onChangeText={(texto) => setcomentario(texto)}
        value={comentario}
        multiline />

      <Button title='GUARDAR' onPress={() => guardarUsuario(cedula, nombre, correo, comentario)} />
      <FlatList
        data={usuarios}
        renderItem={({ item }: { item: Usuario }) =>
          <View>
            <Tarjeta usuario={item} />
            <View style={{ flexDirection: 'row' }}>
              <Button title='Editar' color={'green'} onPress={() => editar2(item)} />
              <Button title='Eliminar' color={'red'} onPress={() => eliminar(item.key)} />

            </View>
          </View>

        }
      />

      <StatusBar />

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#d09d25',
    alignItems: 'center',
    justifyContent: 'center',
  },
  txt: {
    backgroundColor: '#52e06c',
    height: 50,
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 2,
    fontSize: 20
  }

})