import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { useRouter } from "expo-router";
import api from "./utils/api";
import { saveTokens } from "./utils/auth";

type Option = { label: string; value: number };

export default function SignUp() {
  const router = useRouter();

  const [fullName, setFullName] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [university, setUniversity] = useState<number | null>(null);
  const [faculty, setFaculty] = useState<number | null>(null);
  const [department, setDepartment] = useState<number | null>(null);
  const [level, setLevel] = useState<number | null>(null);
  const [semester, setSemester] = useState<number | null>(null);

  const [universities, setUniversities] = useState<Option[]>([]);
  const [faculties, setFaculties] = useState<Option[]>([]);
  const [departments, setDepartments] = useState<Option[]>([]);
  const [levels, setLevels] = useState<Option[]>([]);
  const [semesters, setSemesters] = useState<Option[]>([]);

  const [loading, setLoading] = useState(false);

  // -------------------- UNIVERSITIES --------------------
  useEffect(() => {
    api
      .get("/universities/")
      .then((res) => {
        setUniversities(
          res.data.map((u: any) => ({
            label: u.name,
            value: Number(u.id),
          }))
        );
      })
      .catch((err) => console.log("UNI ERROR:", err));
  }, []);

  // -------------------- FACULTIES --------------------
  useEffect(() => {
    if (!university) return;

    // reset
    setFaculty(null);
    setDepartment(null);
    setLevel(null);
    setSemester(null);
    setFaculties([]);
    setDepartments([]);
    setLevels([]);
    setSemesters([]);

    api
      .get(`/faculties/?university=${university}`)
      .then((res) => {
        setFaculties(
          res.data.map((f: any) => ({
            label: f.name,
            value: Number(f.id),
          }))
        );
      })
      .catch((err) => console.log("FAC ERROR:", err));
  }, [university]);

  // -------------------- DEPARTMENTS --------------------
  useEffect(() => {
    if (!faculty) return;

    setDepartment(null);
    setLevel(null);
    setSemester(null);
    setDepartments([]);
    setLevels([]);
    setSemesters([]);

    api
      .get(`/departments/?faculty=${faculty}`)
      .then((res) => {
        setDepartments(
          res.data.map((d: any) => ({
            label: d.name,
            value: Number(d.id),
          }))
        );
      })
      .catch((err) => console.log("DEP ERROR:", err));
  }, [faculty]);

  // -------------------- LEVELS --------------------
  useEffect(() => {
    if (!department) return;

    setLevel(null);
    setSemester(null);
    setLevels([]);
    setSemesters([]);

    api
      .get(`/levels/?department=${department}`)
      .then((res) => {
        setLevels(
          res.data.map((l: any) => ({
            label: l.name,
            value: Number(l.id),
          }))
        );
      })
      .catch((err) => console.log("LEVEL ERROR:", err));
  }, [department]);

  // -------------------- SEMESTERS --------------------
  useEffect(() => {
    if (!level) return;

    setSemester(null);
    setSemesters([]);

    api
      .get(`/semesters/?level=${level}`)
      .then((res) => {
        setSemesters(
          res.data.map((s: any) => ({
            label: s.name,
            value: Number(s.id),
          }))
        );
      })
      .catch((err) => console.log("SEM ERROR:", err));
  }, [level]);

  // -------------------- SIGNUP --------------------
  const handleSignUp = async () => {
    if (!fullName || !email || !password)
      return alert("Fill all required fields");

    setLoading(true);

    try {
      const [firstName, ...rest] = fullName.trim().split(" ");
      const lastName = rest.join(" ");

      await api.post("/auth/register/", {
        username: email,
        email,
        password,
        first_name: firstName,
        last_name: lastName,
        university_id: university,
        faculty_id: faculty,
        department_id: department,
        level_id: level,
        semester_id: semester,
      });

      const res = await api.post("/auth/login/", {
        username: email,
        password,
      });

      await saveTokens(res.data.access, res.data.refresh);

      router.replace("/(tabs)/home");
    } catch (err: any) {
      console.log("SIGNUP ERROR:", err.response?.data);
      alert("Signup failed");
    }

    setLoading(false);
  };

  // helper
  const Field = (props: any) => (
    <View style={{ marginBottom: 18 }}>
      <Text style={styles.label}>{props.label}</Text>
      {props.children}
    </View>
  );

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Create Your Account</Text>

        <Field label="Full Name">
          <TextInput
            style={styles.input}
            placeholder="Enter full name"
            value={fullName}
            onChangeText={setFullName}
          />
        </Field>

        <Field label="University">
          <RNPickerSelect
            onValueChange={(v) => setUniversity(Number(v))}
            items={universities}
            placeholder={{ label: "Select a University", value: null }}
            style={pickerStyles}
          />
        </Field>

        <Field label="Faculty">
          <RNPickerSelect
            onValueChange={(v) => setFaculty(Number(v))}
            items={faculties}
            placeholder={{
              label: faculties.length
                ? "Select Faculty"
                : "Select University First",
              value: null,
            }}
            style={pickerStyles}
          />
        </Field>

        <Field label="Department">
          <RNPickerSelect
            onValueChange={(v) => setDepartment(Number(v))}
            items={departments}
            placeholder={{
              label: departments.length
                ? "Select Department"
                : "Select Faculty First",
              value: null,
            }}
            style={pickerStyles}
          />
        </Field>

        <Field label="Level">
          <RNPickerSelect
            onValueChange={(v) => setLevel(Number(v))}
            items={levels}
            placeholder={{
              label: levels.length
                ? "Select Level"
                : "Select Department First",
              value: null,
            }}
            style={pickerStyles}
          />
        </Field>

        <Field label="Semester">
          <RNPickerSelect
            onValueChange={(v) => setSemester(Number(v))}
            items={semesters}
            placeholder={{
              label: semesters.length
                ? "Select Semester"
                : "Select Level First",
              value: null,
            }}
            style={pickerStyles}
          />
        </Field>

        <Field label="Email">
          <TextInput
            style={styles.input}
            placeholder="Enter email"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />
        </Field>

        <Field label="Password">
          <TextInput
            style={styles.input}
            placeholder="Enter password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
        </Field>

        <TouchableOpacity style={styles.btn} onPress={handleSignUp}>
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.btnText}>Create Account</Text>
          )}
        </TouchableOpacity>

        <View style={{ height: 40 }} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 24 },
  title: { fontSize: 28, fontWeight: "700", marginBottom: 20 },
  label: { fontSize: 14, fontWeight: "500", marginBottom: 6, color: "#333" },
  input: {
    height: 52,
    backgroundColor: "#F3F3F5",
    borderRadius: 12,
    paddingHorizontal: 14,
  },
  btn: {
    backgroundColor: "#3D5AFE",
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 20,
  },
  btnText: { color: "#fff", fontSize: 16, fontWeight: "600" },
});

const pickerStyles = {
  inputIOS: {
    height: 52,
    backgroundColor: "#F3F3F5",
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 14,
  },
  inputAndroid: {
    height: 52,
    backgroundColor: "#F3F3F5",
    borderRadius: 12,
    paddingHorizontal: 14,
  },
};
