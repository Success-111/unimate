import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { clearAuthToken } from '../../utils/auth';

export default function Profile() {
  const router = useRouter();
  const handleLogout = async () => {
    await clearAuthToken();
    router.replace('/login');
  };

  return (
    <ScrollView style={{ flex:1, backgroundColor:'#fff' }}>
      <View style={styles.header}><Text style={styles.headerText}>Profile</Text></View>
      <View style={styles.profileBox}>
        <View style={styles.avatar}><Text style={{color:'#fff',fontSize:22,fontWeight:'700'}}>S</Text></View>
        <Text style={styles.name}>Success Odey</Text>
        <Text style={styles.sub}>Physics (ECT) • University of Calabar</Text>
      </View>
      <View style={{ padding: 16 }}>
        <TouchableOpacity style={styles.option}><Text style={styles.optionText}>Academic Information</Text></TouchableOpacity>
        <TouchableOpacity style={styles.option}><Text style={styles.optionText}>Downloads</Text></TouchableOpacity>
        <TouchableOpacity style={styles.option}><Text style={styles.optionText}>Notifications</Text></TouchableOpacity>
        <TouchableOpacity style={[styles.option,{marginTop:30}]} onPress={handleLogout}><Text style={[styles.optionText,{color:'#d32f2f'}]}>Logout</Text></TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  header:{backgroundColor:'#3D5AFE',padding:20,borderBottomLeftRadius:24,borderBottomRightRadius:24},
  headerText:{fontSize:22,fontWeight:'700',color:'#fff'},
  profileBox:{alignItems:'center',marginTop:20},
  avatar:{width:80,height:80,borderRadius:40,backgroundColor:'#FFB300',justifyContent:'center',alignItems:'center'},
  name:{marginTop:12,fontSize:20,fontWeight:'700',color:'#212121'},
  sub:{color:'#616161',marginTop:4,textAlign:'center'},
  option:{flexDirection:'row',alignItems:'center',padding:16,backgroundColor:'#F7F7F8',borderRadius:12,marginBottom:12},
  optionText:{marginLeft:12,fontSize:15,fontWeight:'500',color:'#212121'}
});
