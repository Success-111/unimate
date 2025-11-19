import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';

const mockQuestions = [
  { id:1, question: "What is Newton's First Law?", options: ['Inertia','F=ma','Action-reaction','Energy'], answer:0 },
  { id:2, question: 'Unit of Force?', options: ['Joule','Newton','Pascal','Watt'], answer:1 },
];

export default function QuizIndex() {
  const { course } = {} as { course?: string };
  const router = useRouter();
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number|null>(null);
  const [score, setScore] = useState(0);
  const q = mockQuestions[index];

  const next = () => {
    if (selected === q.answer) setScore(score + 1);
    if (index < mockQuestions.length - 1) {
      setIndex(index + 1); setSelected(null);
    } else {
      const finalScore = String(selected === q.answer ? score + 1 : score);
      router.replace(`/(tabs)/quiz/results?score=${finalScore}&total=${String(mockQuestions.length)}`);
    }
  };

  return (
    <ScrollView style={{ flex:1, backgroundColor:'#fff' }}>
      <View style={styles.header}><Text style={styles.title}>{course ?? 'Quiz'}</Text></View>
      <View style={{ padding: 16 }}>
        <Text style={styles.question}>{q.question}</Text>
        {q.options.map((op: string, i: number) => (
          <TouchableOpacity key={i} onPress={() => setSelected(i)} style={[styles.option, selected === i && styles.optionActive]}>
            <Text style={[styles.optionText, selected === i && { color: '#fff' }]}>{op}</Text>
          </TouchableOpacity>
        ))}
        <TouchableOpacity style={styles.btn} onPress={next}><Text style={styles.btnText}>{index === mockQuestions.length - 1 ? 'Submit' : 'Next'}</Text></TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  header:{padding:20,backgroundColor:'#3D5AFE',borderBottomLeftRadius:24,borderBottomRightRadius:24},
  title:{color:'#fff',fontSize:22,fontWeight:'700'},
  question:{fontSize:18,fontWeight:'600',marginBottom:20,color:'#212121'},
  option:{padding:14,backgroundColor:'#F2F3F5',borderRadius:12,marginBottom:12},
  optionActive:{backgroundColor:'#3D5AFE'},
  optionText:{color:'#212121'},
  btn:{backgroundColor:'#3D5AFE',paddingVertical:14,borderRadius:12,marginTop:20,alignItems:'center'},
  btnText:{color:'#fff',fontSize:16,fontWeight:'600'}
});
