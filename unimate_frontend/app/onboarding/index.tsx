import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, FlatList } from 'react-native';
import { useRouter } from 'expo-router';
const { width } = Dimensions.get('window');

const slides = [
  { id: '1', title: 'Welcome to Unimate 📚', desc: 'Access course materials, quizzes and track progress.' },
  { id: '2', title: 'Study Smart 🎯', desc: 'A better way to manage semester resources.' },
  { id: '3', title: 'Track Progress 🔥', desc: 'See how you improve over time.' },
];

export default function Onboarding() {
  const router = useRouter();
  const [index, setIndex] = useState(0);
  const goNext = () => {
    if (index < slides.length - 1) setIndex(index + 1);
    else router.replace('/login');
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <FlatList data={slides} horizontal pagingEnabled scrollEnabled={false} keyExtractor={i => i.id}
        renderItem={({ item }) => (
          <View style={[styles.slide, { width }]}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.desc}>{item.desc}</Text>
          </View>
        )}
      />
      <View style={styles.footer}>
        <View style={styles.indicatorRow}>
          {slides.map((_, i) => <View key={i} style={[styles.dot, index === i && styles.dotActive]} />)}
        </View>
        <TouchableOpacity style={styles.btn} onPress={goNext}>
          <Text style={styles.btnText}>{index === slides.length - 1 ? 'Get started' : 'Next'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  slide: { justifyContent: 'center', alignItems: 'center', padding: 24 },
  title: { fontSize: 26, fontWeight: '700', color: '#212121', marginBottom: 10 },
  desc: { textAlign: 'center', fontSize: 16, color: '#616161', width: '80%' },
  footer: { alignItems: 'center', paddingBottom: 40 },
  indicatorRow: { flexDirection: 'row', marginBottom: 16 },
  dot: { width: 10, height: 10, borderRadius: 5, backgroundColor: '#ccc', marginHorizontal: 4 },
  dotActive: { backgroundColor: '#3D5AFE', width: 20 },
  btn: { backgroundColor: '#3D5AFE', paddingVertical: 14, paddingHorizontal: 40, borderRadius: 16 },
  btnText: { color: '#fff', fontWeight: '600' },
});
