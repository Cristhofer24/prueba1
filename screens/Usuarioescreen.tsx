import { Alert, Button, FlatList, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { db } from '../config/Config'
import {onValue, ref, set } from "firebase/database";
export default function Usuarioescreen() {
const [cedula, setcedula] = useState("")
const [nombre, setnombre] = useState("")
const [correo, setcorreo] = useState("")
const [comentario, setcomentario] = useState("")
const [usuarios, setusuarios] = useState([])

/***Guardar informacion*/
function guardar(cedula:string, nombre:string, correo:string, comentario:string) {

  set(ref(db, 'usuarios/' + cedula), {
    name: nombre,
    email: correo,
   coment: comentario
  });
  Alert.alert("mesaje","Informacion Guardada")
  setcedula("")
  setnombre("")
  setcorreo("")
  setcomentario("")
}
/**leer  */
useEffect(() => {
  const starCountRef = ref(db, 'usuarios/');
  onValue(starCountRef, (snapshot) => {
    const data = snapshot.val();
    // console.log(data);
    const datatemp:any = Object.keys(data).map((key)=>({
      key, ...data[key]
    // console.log(datatemp);
   
    }))
    setusuarios(datatemp)

  });
}, [])

type Usuario={
 name:string
}

  return (
    <View style={styles.container}>
      <Text>Usuarioescreen</Text>
      <TextInput
      placeholder='Ingrese cedula' style={styles.txt}
      onChangeText={(texto)=>setcedula(texto)}
      value={cedula}
      keyboardType='numeric'
      />
        <TextInput
      placeholder='Ingrese nombre'  style={styles.txt}
      value={nombre}
      onChangeText={(texto)=>setnombre(texto)}
      />
        <TextInput
      placeholder='Ingrese correo'  style={styles.txt}
      onChangeText={(texto)=>setcorreo(texto)}
      value={correo}
      keyboardType='email-address'
      />
        <TextInput
      placeholder='Ingrese comentario'  style={styles.txt} multiline
      value={comentario}
      onChangeText={(texto)=>setcomentario(texto)}
      />
      <Button title='Guardar' onPress={()=>guardar(cedula,nombre,correo,comentario)}/>
       <FlatList
       data={usuarios}
       renderItem={({item}:{item:Usuario})=>
      <View>
        <Text>{item.name}</Text>
      </View>
      }
       />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'green',
    alignItems: 'center',
    justifyContent: 'center',
  },
  txt:{
    backgroundColor:'#E3FFAD',
    height:50,
    width:'80%'
  }
})