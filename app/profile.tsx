import firestore from '@react-native-firebase/firestore';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Button, StyleSheet, View } from 'react-native';
export default function Profile() {

    const[loading,setLoading]=useState(false)

    useEffect(() => {
  const preload = async () => {
    await firestore().collection('users').doc('12345').get();
    console.log('Document preloaded');
  };
  preload();
}, []);

    useEffect(()=>{
      firestore().enableNetwork()
  .then(() => {
    console.log('Firestore is now offline.');
  });

    },[])

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
const fetchUser = () => {
  setLoading(true);
  const docRef = firestore().collection('users').doc('12345');

  const unsubscribe = docRef.onSnapshot(
    { includeMetadataChanges: true },
    (docSnapshot) => {
      if (docSnapshot.exists()) {
        const source = docSnapshot.metadata.fromCache ? 'local cache' : 'server';
        console.log('Data came from:', source);
        console.log('User data:', docSnapshot.data());
      } else {
        console.log('No such document!');
      }
      setLoading(false);
    },
    (error) => {
      console.log('Error fetching document:', error);
      setLoading(false);
    }
  );

  // Optional: unsubscribe when no longer needed
  return unsubscribe;
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