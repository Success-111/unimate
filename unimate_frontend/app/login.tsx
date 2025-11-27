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
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import api from "./utils/api";
import { saveTokens } from "./utils/auth";

export default function Login() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) return alert("Enter email & password");

    setLoading(true);

    try {
      const res = await api.post("/auth/login/", {
        username: email,
        password,
      });

      await saveTokens(res.data.access, res.data.refresh);

      router.replace("/(tabs)/home");
    } catch (err) {
      console.log(err);
      alert("Invalid credentials");
    }

    setLoading(false);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View style={{ width: "100%" }}>
        <Text style={styles.title}>Welcome back 👋</Text>

        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter email"
          autoCapitalize="none"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />

        <Text style={[styles.label, { marginTop: 18 }]}>Password</Text>
        <View style={styles.passwordWrap}>
          <TextInput
            style={styles.passwordInput}
            placeholder="Enter password"
            secureTextEntry={!showPass}
            value={password}
            onChangeText={setPassword}
          />

          <TouchableOpacity onPress={() => setShowPass(!showPass)}>
            <Ionicons
              name={showPass ? "eye-off-outline" : "eye-outline"}
              size={22}
              color="#6B6B6B"
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.btn}
          disabled={loading}
          onPress={handleLogin}
        >
          <Text style={styles.btnText}>{loading ? "Loading..." : "Login"}</Text>
        </TouchableOpacity>

        <View style={styles.bottomRow}>
          <Text style={styles.small}>Don't have an account?</Text>
          <TouchableOpacity onPress={() => router.push("/signup")}>
            <Text style={styles.link}> Sign up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, justifyContent: "center", backgroundColor: "#fff" },
  title: { fontSize: 28, fontWeight: "700", marginBottom: 30 },
  label: { fontSize: 14, fontWeight: "500", color: "#333" },
  input: {
    height: 52,
    backgroundColor: "#F3F3F5",
    borderRadius: 12,
    paddingHorizontal: 14,
    marginTop: 6,
  },
  passwordWrap: {
    height: 52,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F3F3F5",
    borderRadius: 12,
    paddingHorizontal: 14,
    marginTop: 6,
  },
  passwordInput: { flex: 1 },
  btn: {
    backgroundColor: "#3D5AFE",
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 30,
  },
  btnText: { color: "#fff", fontSize: 16, fontWeight: "600" },
  bottomRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 18,
  },
  small: { color: "#444" },
  link: { color: "#3D5AFE", fontWeight: "600" },
});
