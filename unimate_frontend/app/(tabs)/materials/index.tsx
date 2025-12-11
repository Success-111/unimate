import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import api from "@/utils/api";

// Icon Resolver based on File Type
function getIcon(type: string) {
  switch (type.toUpperCase()) {
    case "NOTE": return "document-text-outline";
    case "SLIDE": return "tv-outline";
    case "PAST": return "help-circle-outline";
    case "EBOOK": return "book-outline";
    default: return "document-outline";
  }
}

export default function Materials() {
  const { courseCode } = useLocalSearchParams<{ courseCode?: string }>();
  const [activeTab, setActiveTab] = useState<'notes' | 'slides' | 'past' | 'ebook'>('notes');
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    const fetchMaterials = async () => {
      try {
        const typeMap = {
          notes: "NOTE",
          slides: "SLIDE",
          past: "PAST",
          ebook: "EBOOK",
        };

        const res = await api.get("/materials/", {
          params: {
            course: courseCode,
            category: typeMap[activeTab],
          },
        });

        const materials = res.data.map((m: any) => ({
          id: m.id.toString(),
          title: m.title,
          size: "—",
          type: m.category,
          downloaded: false,
        }));

        setData(materials);
      } catch (err) {
        console.log("MATERIAL FETCH ERROR:", err.response?.data ?? err);
      }
    };

    fetchMaterials();
  }, [activeTab]);

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={styles.header}>
        <Text style={styles.title}>Course Materials</Text>
        <Text style={styles.subtitle}>{courseCode ?? 'Course'}</Text>
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
            <Ionicons
              name={getIcon(item.type)}
              size={28}
              color="#3D5AFE"
              style={{ marginRight: 12 }}
            />

            <View style={{ flex: 1 }}>
              <Text style={{ fontWeight: '600' }}>{item.title}</Text>
              <Text style={{ color: '#616161' }}>
                {item.size} • {item.type}
              </Text>
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
