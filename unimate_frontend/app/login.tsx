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
import { Ionicons } from "@expo/vector-icons"; // 👈 ADD THIS
import { setAuthToken } from "./utils/auth";

export default function Login() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false); // 👈 VISIBILITY STATE

  const handleLogin = async () => {
    await setAuthToken("demo-token");
    router.replace("/(tabs)/home");
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View style={{ width: "100%" }}>
        {/* TITLE */}
        <Text style={styles.title}>Welcome back 👋</Text>
        <Text style={styles.subtitle}>Login to continue learning</Text>

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

        {/* PASSWORD WITH TOGGLE ICON */}
        <View style={styles.field}>
          <Text style={styles.label}>Password</Text>

          <View style={styles.passwordWrapper}>
            <TextInput
              placeholder="Enter password"
              style={styles.passwordInput}
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={setPassword}
            />

            <TouchableOpacity
              onPress={() => setShowPassword(!showPassword)}
              style={styles.eyeButton}
            >
              <Ionicons
                name={showPassword ? "eye-off-outline" : "eye-outline"}
                size={22}
                color="#6B6B6B"
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* FORGOT PASSWORD */}
        <TouchableOpacity onPress={() => router.push("/forgot-password")}>
          <Text style={styles.forgot}>Forgot password?</Text>
        </TouchableOpacity>

        {/* BUTTON */}
        <TouchableOpacity style={styles.btn} onPress={handleLogin}>
          <Text style={styles.btnText}>Login</Text>
        </TouchableOpacity>

        {/* SIGNUP LINK */}
        <View style={styles.bottomTextContainer}>
          <Text style={styles.bottomText}>Don't have an account?</Text>
          <TouchableOpacity onPress={() => router.push("/signup")}>
            <Text style={styles.bottomLink}> Sign up</Text>
          </TouchableOpacity>
        </View>
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

  /* 🔥 Password Wrapper */
  passwordWrapper: {
    height: 52,
    borderRadius: 12,
    backgroundColor: "#F3F3F5",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
  },

  passwordInput: {
    flex: 1,
    fontSize: 15,
  },

  eyeButton: {
    paddingHorizontal: 4,
  },

  forgot: {
    color: "#3D5AFE",
    fontWeight: "600",
    marginTop: 8,
    alignSelf: "flex-end",
  },

  btn: {
    backgroundColor: "#3D5AFE",
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 22,
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
