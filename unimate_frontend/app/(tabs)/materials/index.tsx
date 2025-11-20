import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

const mockNotes = [
  { id: '1', title: 'Intro to Mechanics', size: '2.4 MB', type: 'PDF', downloaded: true },
  { id: '2', title: "Newton's Laws", size: '1.8 MB', type: 'PDF', downloaded: false },
];

const mockSlides = [
  { id: '3', title: 'Mechanics Slides 1', size: '3.2 MB', type: 'PPTX', downloaded: false },
  { id: '4', title: 'Motion & Forces Slides', size: '2.1 MB', type: 'PPTX', downloaded: true },
];

const mockPastQuestions = [
  { id: '5', title: 'PHY101 PQ 2018', size: '850 KB', type: 'PDF', downloaded: false },
  { id: '6', title: 'PHY101 PQ 2020', size: '920 KB', type: 'PDF', downloaded: false },
];

const mockEbooks = [
  { id: '7', title: 'Physics Foundations eBook', size: '5.6 MB', type: 'EPUB', downloaded: true },
];

export default function Materials() {
  const { course } = useLocalSearchParams<{ course?: string }>();
  const [activeTab, setActiveTab] = useState<'notes' | 'slides' | 'past' | 'ebook'>('notes');
  const [data, setData] = useState(mockNotes);

  // Update data when tab changes
  useEffect(() => {
    if (activeTab === 'notes') setData(mockNotes);
    if (activeTab === 'slides') setData(mockSlides);
    if (activeTab === 'past') setData(mockPastQuestions);
    if (activeTab === 'ebook') setData(mockEbooks);
  }, [activeTab]);

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={styles.header}>
        <Text style={styles.title}>Course Materials</Text>
        <Text style={styles.subtitle}>{course ?? 'Course'}</Text>
      </View>

      {/* Tabs */}
      <View style={styles.tabRow}>
        {[
          { key: 'notes', label: 'Notes' },
          { key: 'slides', label: 'Slides' },
          { key: 'past', label: 'Past Questions' },
          { key: 'ebook', label: 'eBook' },
        ].map((t) => (
          <TouchableOpacity
            key={t.key}
            onPress={() => setActiveTab(t.key as any)}
            style={[styles.tab, activeTab === t.key && styles.tabActive]}
          >
            <Text style={activeTab === t.key ? styles.activeLabel : styles.inactiveLabel}>
              {t.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Material List */}
      <FlatList
        data={data}
        keyExtractor={(i) => i.id}
        contentContainerStyle={{ padding: 16 }}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <View style={{ flex: 1 }}>
              <Text style={{ fontWeight: '600' }}>{item.title}</Text>
              <Text style={{ color: '#616161' }}>{item.size} • {item.type}</Text>
            </View>
            <TouchableOpacity style={styles.download}>
              <Text style={{ color: item.downloaded ? '#10B981' : '#3D5AFE' }}>
                {item.downloaded ? 'Saved' : 'Download'}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  header: { padding: 16, backgroundColor: '#3D5AFE', paddingTop: 32, paddingBottom: 20 },
  title: { color: '#fff', fontSize: 20, fontWeight: '600' },
  subtitle: { color: 'rgba(255,255,255,0.85)' },
  tabRow: { flexDirection: 'row', padding: 10, backgroundColor: '#f3f4f6' },
  tab: { flex: 1, alignItems: 'center', paddingVertical: 10, marginHorizontal: 2 },
  tabActive: { backgroundColor: '#fff', borderRadius: 10 },
  activeLabel: { color: '#3D5AFE', fontWeight: '600' },
  inactiveLabel: { color: '#616161' },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#eee',
    marginBottom: 12,
  },
  download: { paddingHorizontal: 12, paddingVertical: 8, borderRadius: 8 },
});
