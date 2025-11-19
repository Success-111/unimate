import React from 'react';
import { View, Text } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

export default function CourseMaterials() {
  const { courseCode } = useLocalSearchParams();
  return (
    <View style={{ flex: 1, backgroundColor: '#fff', padding: 16 }}>
      <Text style={{ fontSize: 22, fontWeight: '700' }}>{courseCode}</Text>
      <Text style={{ color: '#616161', marginTop: 8 }}>Materials for {courseCode} will appear here.</Text>
    </View>
  );
}
