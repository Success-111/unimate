import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { Link } from 'expo-router';

const mockCourses = [
  { code: 'PHY101', title: 'General Physics' },
  { code: 'MTH101', title: 'General Mathematics' },
];

export default function Home() {
  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#fff' }} contentContainerStyle={{ paddingBottom: 120 }}>
      <View style={styles.header}>
        <View>
          <Text style={styles.welcome}>Welcome, Student 👋</Text>
          <Text style={styles.sub}>1st Semester • 300 Level</Text>
        </View>
        <TouchableOpacity style={styles.avatar}><Text style={{ color: '#fff', fontWeight: '700' }}>S</Text></TouchableOpacity>
      </View>

      <View style={{ padding: 16 }}>
        <Text style={{ fontSize: 18, fontWeight: '600', marginBottom: 12 }}>This Semester's Courses</Text>
        {mockCourses.map(course => (
          <View key={course.code} style={styles.courseCard}>
            <View style={{ flex: 1 }}>
              <Text style={{ fontWeight: '600' }}>{course.code}</Text>
              <Text style={{ color: '#616161' }}>{course.title}</Text>
            </View>

            <View style={{ justifyContent: 'space-between' }}>
              <Link href={`/(tabs)/materials?course=${course.code}`} asChild>
                <TouchableOpacity style={styles.outlineBtn}><Text style={{ color: '#3D5AFE' }}>Materials</Text></TouchableOpacity>
              </Link>

              <Link href={`/(tabs)/quiz?course=${course.code}`} asChild>
                <TouchableOpacity style={styles.primaryBtn}><Text style={{ color: '#fff' }}>Quiz</Text></TouchableOpacity>
              </Link>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  header: { backgroundColor: '#3D5AFE', padding: 20, paddingBottom: 24, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderBottomLeftRadius: 26, borderBottomRightRadius: 26 },
  welcome: { color: '#fff', fontSize: 24, fontWeight: '600' },
  sub: { color: 'rgba(255,255,255,0.85)', marginTop: 4 },
  avatar: { width: 48, height: 48, borderRadius: 24, backgroundColor: '#FFB300', alignItems: 'center', justifyContent: 'center' },
  courseCard: { flexDirection: 'row', padding: 12, borderRadius: 12, borderWidth: 1, borderColor: '#eee', marginBottom: 12, alignItems: 'center' },
  outlineBtn: { borderWidth: 1, borderColor: '#3D5AFE', borderRadius: 10, paddingVertical: 8, paddingHorizontal: 12, marginBottom: 8, alignItems: 'center' },
  primaryBtn: { backgroundColor: '#3D5AFE', borderRadius: 10, paddingVertical: 8, paddingHorizontal: 12, alignItems: 'center' },
});
