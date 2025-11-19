import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';

export default function QuizResults() {
  const router = useRouter();
  const { score = '0', total = '0' } = useLocalSearchParams();
  const s = Number(score), t = Number(total);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Quiz Completed 🎉</Text>
      <Text style={styles.score}>{s}/{t}</Text>
      <Text style={styles.sub}>Accuracy: {t ? Math.round((s/t)*100) : 0}%</Text>
      <TouchableOpacity style={styles.btn} onPress={() => router.replace('/(tabs)/home')}><Text style={styles.btnText}>Back to Home</Text></TouchableOpacity>
      <TouchableOpacity style={styles.retry} onPress={() => router.back()}><Text style={styles.retryText}>Try Again</Text></TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{flex:1,justifyContent:'center',alignItems:'center',backgroundColor:'#fff',padding:24},
  title:{fontSize:26,fontWeight:'700',color:'#212121'},
  score:{fontSize:48,fontWeight:'700',color:'#3D5AFE',marginVertical:10},
  sub:{fontSize:16,color:'#616161',marginBottom:24},
  btn:{backgroundColor:'#3D5AFE',paddingVertical:14,paddingHorizontal:40,borderRadius:16,marginBottom:16},
  btnText:{color:'#fff',fontSize:16,fontWeight:'600'},
  retry:{paddingVertical:14,paddingHorizontal:40,borderRadius:16,borderWidth:1,borderColor:'#3D5AFE',backgroundColor:'transparent'},
  retryText:{color:'#3D5AFE',fontSize:16,fontWeight:'600'}
});
