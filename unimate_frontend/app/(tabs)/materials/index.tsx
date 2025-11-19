import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

const mockMaterials = [
  { id: '1', title: 'Intro to Mechanics', size: '2.4 MB', type: 'PDF', downloaded: true },
  { id: '2', title: "Newton's Laws", size: '1.8 MB', type: 'PDF', downloaded: false },
];

export default function Materials() {
  const { course } = useLocalSearchParams<{ course?: string }>();
  const [activeTab, setActiveTab] = useState<'notes'|'slides'>('notes');
  const [data, setData] = useState(mockMaterials);
  
  // Update data when course changes
  useEffect(() => {
    if (course) {
      // Fetch materials based on course and update state
      setData(mockMaterials); // Example of setting data
    }
  }, [course]);

  useEffect(()=>{
    // fetch materials for 'course' if connected to backend
  },[course]);

  return (
    <View style={{ flex:1, backgroundColor:'#fff' }}>
      <View style={styles.header}>
        <Text style={styles.title}>Course Materials</Text>
        <Text style={styles.subtitle}>{course ?? 'Course'}</Text>
      </View>
      <View style={styles.tabRow}>
        {['notes','slides'].map(t=>(
          <TouchableOpacity key={t} onPress={()=>setActiveTab(t as any)} style={[styles.tab, activeTab===t && styles.tabActive]}>
            <Text style={ activeTab===t ? {color:'#3D5AFE'} : {color:'#616161'} }>{t}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <FlatList data={data} keyExtractor={i=>i.id} contentContainerStyle={{padding:16}}
        renderItem={({item})=>(
          <View style={styles.item}>
            <View style={{flex:1}}>
              <Text style={{fontWeight:'600'}}>{item.title}</Text>
              <Text style={{color:'#616161'}}>{item.size} • {item.type}</Text>
            </View>
            <TouchableOpacity style={styles.download}>
              <Text style={{color: item.downloaded ? '#10B981' : '#3D5AFE'}}>{item.downloaded ? 'Saved' : 'Download'}</Text>
            </TouchableOpacity>
          </View>
        )} />
    </View>
  );
}

const styles = StyleSheet.create({
  header:{padding:16,backgroundColor:'#3D5AFE',paddingTop:32,paddingBottom:20},
  title:{color:'#fff',fontSize:20,fontWeight:'600'},
  subtitle:{color:'rgba(255,255,255,0.85)'},
  tabRow:{flexDirection:'row',padding:12,backgroundColor:'#f3f4f6'},
  tab:{flex:1,alignItems:'center',paddingVertical:10},
  tabActive:{backgroundColor:'#fff',borderRadius:10},
  item:{flexDirection:'row',alignItems:'center',padding:12,borderRadius:10,borderWidth:1,borderColor:'#eee',marginBottom:12},
  download:{paddingHorizontal:12,paddingVertical:8,borderRadius:8}
});
