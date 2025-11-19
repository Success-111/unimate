import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ErrorScreen({ error }: any) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Oops — an error occurred</Text>
      <Text style={styles.message}>{String(error?.message ?? error)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, justifyContent: 'center' },
  title: { fontSize: 20, fontWeight: '700', marginBottom: 8 },
  message: { color: '#666' },
});
