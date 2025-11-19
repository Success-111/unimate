import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { setAuthToken } from './utils/auth';

export default function Login() {
  const router = useRouter();
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    // Demo behavior: set a token and go to tabs
    await setAuthToken('demo-token');
    router.replace('/(tabs)/home');
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.outer}>
      <View style={styles.container}>
        <Text style={styles.title}>Welcome back 👋</Text>
        <Text style={styles.subtitle}>Sign in to continue</Text>

        <View style={{ width: '100%', marginTop: 24 }}>
          <Text style={styles.label}>Email / Matric No.</Text>
          <TextInput style={styles.input} value={identifier} onChangeText={setIdentifier} placeholder="email or matric no." />
          <Text style={[styles.label, { marginTop: 16 }]}>Password</Text>
          <TextInput style={styles.input} value={password} onChangeText={setPassword} secureTextEntry placeholder="password" />
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => router.push('/signup')} style={{ marginTop: 12 }}>
            <Text style={{ color: '#3D5AFE', textAlign: 'center', fontWeight: '600' }}>Create an account</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  outer: { flex: 1, backgroundColor: '#fff' },
  container: { padding: 24, paddingTop: 80, flex: 1 },
  title: { fontSize: 28, fontWeight: '600', color: '#212121' },
  subtitle: { color: '#616161', marginTop: 6 },
  label: { color: '#212121', marginBottom: 6, fontWeight: '500' },
  input: { height: 52, borderRadius: 12, backgroundColor: '#F3F3F5', paddingHorizontal: 12 },
  button: { marginTop: 24, height: 56, borderRadius: 16, backgroundColor: '#3D5AFE', alignItems: 'center', justifyContent: 'center' },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
});
