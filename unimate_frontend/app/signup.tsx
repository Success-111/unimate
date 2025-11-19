import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { setAuthToken } from './utils/auth';

export default function SignUp() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = async () => {
    // Demo: set token and navigate
    await setAuthToken('demo-token');
    router.replace('/(tabs)/home');
  };

  return (
    <View style={{ flex: 1, padding: 24, backgroundColor: '#fff' }}>
      <Text style={{ fontSize: 24, fontWeight: '700' }}>Create account</Text>
      <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} />
      <TextInput style={styles.input} placeholder="Password" secureTextEntry value={password} onChangeText={setPassword} />
      <TouchableOpacity style={styles.btn} onPress={handleSignUp}><Text style={{ color: '#fff' }}>Sign up</Text></TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  input: { height: 52, borderRadius: 12, backgroundColor: '#F3F3F5', paddingHorizontal: 12, marginTop: 12 },
  btn: { marginTop: 20, backgroundColor: '#3D5AFE', padding: 14, alignItems: 'center', borderRadius: 12 },
});
