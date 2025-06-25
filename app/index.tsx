import auth from '@react-native-firebase/auth';

import { useRouter } from 'expo-router';
import { useState } from "react";
const router = useRouter();

import { ActivityIndicator, Button, KeyboardAvoidingView, StyleSheet, TextInput, View } from "react-native";
export default function Index() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);



  const signUp = async() => {
    setLoading(true);
    try{
      await auth().createUserWithEmailAndPassword(email,password);
      console.log('user created')
      setLoading(false)
      setEmail('')
      setPassword('')
      router.push('/profile');
    }catch(err:any){
      console.log(err.message)
    }
    setLoading(false)
  };

  const signIn = async() => {
    setLoading(true);
    try{
      await auth().signInWithEmailAndPassword(email,password);
      console.log('user logged in')
      setLoading(false)
      setEmail('')
      setPassword('')
    }catch(err:any){
      console.log(err.message)
    }
    setLoading(false)
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView behavior="padding">
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          style={styles.input}
          secureTextEntry
        />
        {loading?(<ActivityIndicator size={'small'} style={{margin:28}}/>):(<>
        <Button title="Sign Up" onPress={signUp} disabled={loading} />
        <View style={{ height: 10 }} />
        <Button title="Sign In" onPress={signIn} disabled={loading} />
        </>)}
        
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    flex: 1,
    justifyContent: 'center',
  },
  input: {
    marginVertical: 4,
    height: 50,
    borderWidth: 1,
    borderRadius: 4,
    padding: 10,
    backgroundColor: "#fff",
  },
});