import firestore from '@react-native-firebase/firestore';
import React, { useState } from 'react';
import { ActivityIndicator, Button, StyleSheet, View } from 'react-native';
export default function Profile() {

    const[loading,setLoading]=useState(false)

      //add user
  const addUser = async () => {
  try{
    setLoading(true)
    await firestore()
    .collection('users')
    .doc('12345') // specify your own ID
    .set({
      name: 'Deepesh 123',
      email: 'deepeshdfa@example.com',
      age: 30,
    });
    console.log('uesr added successfully')
    setLoading(false)
  }catch(err:any){
    console.log(err.message)
  }
  setLoading(false)
};

//retrieve data
const fetchUser = async () => {
  try{
    setLoading(true)
    const docRef = firestore().collection('users').doc('12345');

 const doc = await docRef.get();
if (doc.metadata.fromCache) {
  console.log('Data is from local cache');
} else {
  console.log('Data is from server');
}
  setLoading(false)
  }catch(err:any){
    console.log(err.message)
  }
};
  return (
    <View style={styles.container}>
      {loading?(<ActivityIndicator/>):(<>
      <Button title="Add User" onPress={addUser} />
      <Button title="Fetch User" onPress={fetchUser} />
      </>)}
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
    flex: 1,
    justifyContent: 'center',
    gap: 20,
    paddingHorizontal: 20,
  },

})