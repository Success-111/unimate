import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useRouter } from "expo-router";

export default function ForgotPassword() {
  const router = useRouter();
  const [email, setEmail] = useState("");

  const handleReset = () => {
    alert("Password reset link sent.");
    router.back();
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View style={{ width: "100%" }}>
        {/* TITLE */}
        <Text style={styles.title}>Reset Password</Text>
        <Text style={styles.subtitle}>
          Enter your email to receive a reset link
        </Text>

        {/* EMAIL INPUT */}
        <View style={styles.field}>
          <Text style={styles.label}>Email Address</Text>
          <TextInput
            placeholder="Enter email"
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        {/* BUTTON */}
        <TouchableOpacity style={styles.btn} onPress={handleReset}>
          <Text style={styles.btnText}>Send Reset Link</Text>
        </TouchableOpacity>

        {/* BACK TO LOGIN */}
        <TouchableOpacity onPress={() => router.push("/login")}>
          <Text style={styles.back}>Back to Login</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 24,
    justifyContent: "center",
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

  field: { marginBottom: 18 },

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
    marginTop: 10,
  },

  btnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },

  back: {
    color: "#3D5AFE",
    fontWeight: "600",
    marginTop: 18,
    alignSelf: "center",
  },
});
