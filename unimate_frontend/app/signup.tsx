import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { setAuthToken } from "./utils/auth";

export default function SignUp() {
  const router = useRouter();

  const [fullName, setFullName] = useState("");

  const [university, setUniversity] = useState("");
  const [faculty, setFaculty] = useState("");
  const [department, setDepartment] = useState("");
  const [level, setLevel] = useState("");
  const [semester, setSemester] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = async () => {
    await setAuthToken("demo-token");
    router.replace("/(tabs)/home");
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
        
        <Text style={styles.title}>Create Your Account</Text>
        <Text style={styles.subtitle}>Provide your academic details to continue</Text>

        {/* FULL NAME */}
        <View style={styles.field}>
          <Text style={styles.label}>Full Name</Text>
          <TextInput
            placeholder="Enter full name"
            style={styles.input}
            value={fullName}
            onChangeText={setFullName}
          />
        </View>

        {/* UNIVERSITY */}
        <View style={styles.field}>
          <Text style={styles.label}>University</Text>
          <RNPickerSelect
            onValueChange={setUniversity}
            placeholder={{ label: "Select University", value: "" }}
            items={[
              { label: "University of Calabar", value: "UNICAL" },
              { label: "University of Lagos", value: "UNILAG" },
              { label: "University of Ibadan", value: "UI" },
            ]}
            style={pickerSelectStyles}
          />
        </View>

        {/* FACULTY */}
        <View style={styles.field}>
          <Text style={styles.label}>Faculty</Text>
          <RNPickerSelect
            onValueChange={setFaculty}
            placeholder={{ label: "Select Faculty", value: "" }}
            items={[
              { label: "Physical Sciences", value: "Physical Sciences" },
              { label: "Engineering", value: "Engineering" },
              { label: "Social Sciences", value: "Social Sciences" },
            ]}
            style={pickerSelectStyles}
          />
        </View>

        {/* DEPARTMENT */}
        <View style={styles.field}>
          <Text style={styles.label}>Department</Text>
          <RNPickerSelect
            onValueChange={setDepartment}
            placeholder={{ label: "Select Department", value: "" }}
            items={[
              { label: "Physics", value: "Physics" },
              { label: "Computer Science", value: "CSC" },
              { label: "Mathematics", value: "Math" },
            ]}
            style={pickerSelectStyles}
          />
        </View>

        {/* LEVEL */}
        <View style={styles.field}>
          <Text style={styles.label}>Level</Text>
          <RNPickerSelect
            onValueChange={setLevel}
            placeholder={{ label: "Select Level", value: "" }}
            items={[
              { label: "100 Level", value: "100" },
              { label: "200 Level", value: "200" },
              { label: "300 Level", value: "300" },
              { label: "400 Level", value: "400" },
            ]}
            style={pickerSelectStyles}
          />
        </View>

        {/* SEMESTER */}
        <View style={styles.field}>
          <Text style={styles.label}>Semester</Text>
          <RNPickerSelect
            onValueChange={setSemester}
            placeholder={{ label: "Select Semester", value: "" }}
            items={[
              { label: "First Semester", value: "1" },
              { label: "Second Semester", value: "2" },
            ]}
            style={pickerSelectStyles}
          />
        </View>

        {/* EMAIL */}
        <View style={styles.field}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            placeholder="Enter email"
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        {/* PASSWORD */}
        <View style={styles.field}>
          <Text style={styles.label}>Password</Text>
          <TextInput
            placeholder="Enter password"
            style={styles.input}
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
        </View>

        {/* BUTTON */}
        <TouchableOpacity style={styles.btn} onPress={handleSignUp}>
          <Text style={styles.btnText}>Create Account</Text>
        </TouchableOpacity>

        {/* LOGIN LINK */}
        <View style={styles.bottomTextContainer}>
          <Text style={styles.bottomText}>Already have an account?</Text>
          <TouchableOpacity onPress={() => router.push("/login")}>
            <Text style={styles.bottomLink}> Login</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 24,
  },

  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#1A1A1A",
  },

  subtitle: {
    fontSize: 15,
    color: "#6B6B6B",
    marginTop: 4,
    marginBottom: 28,
  },

  field: {
    marginBottom: 18,
  },

  label: {
    fontSize: 14,
    fontWeight: "500",
    color: "#3D3D3D",
    marginBottom: 6,
  },

  input: {
    height: 52,
    borderRadius: 12,
    backgroundColor: "#F3F3F5",
    paddingHorizontal: 14,
    fontSize: 15,
  },

  btn: {
    backgroundColor: "#3D5AFE",
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 14,
  },

  btnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },

  bottomTextContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 18,
    marginBottom: 40,
  },

  bottomText: {
    color: "#444",
    fontSize: 14,
  },

  bottomLink: {
    color: "#3D5AFE",
    fontSize: 14,
    fontWeight: "600",
  },
});

// Picker style
const pickerSelectStyles = {
  inputIOS: {
    height: 52,
    borderRadius: 12,
    backgroundColor: "#F3F3F5",
    paddingHorizontal: 14,
    paddingVertical: 14,
    fontSize: 15,
  },
  inputAndroid: {
    height: 52,
    borderRadius: 12,
    backgroundColor: "#F3F3F5",
    paddingHorizontal: 14,
    fontSize: 15,
  }
};
