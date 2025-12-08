import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  ActivityIndicator,
  Alert,
  Image,
} from "react-native";
import RNPickerSelect from "react-native-picker-select";
import api from "../../utils/api";

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);

  // dropdown states
  const [universities, setUniversities] = useState<any[]>([]);
  const [faculties, setFaculties] = useState<any[]>([]);
  const [departments, setDepartments] = useState<any[]>([]);
  const [levels, setLevels] = useState<any[]>([]);
  const [semesters, setSemesters] = useState<any[]>([]);

  // form fields
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  const [university, setUniversity] = useState<number | null>(null);
  const [faculty, setFaculty] = useState<number | null>(null);
  const [department, setDepartment] = useState<number | null>(null);
  const [level, setLevel] = useState<number | null>(null);
  const [semester, setSemester] = useState<number | null>(null);

  // -------------------- LOAD USER --------------------
  useEffect(() => {
    loadUser();
    loadUniversities();
  }, []);

  const loadUser = async () => {
    try {
      const res = await api.get("/auth/user/");
      setUser(res.data);

      setFirstName(res.data.first_name);
      setLastName(res.data.last_name);
      setEmail(res.data.email);

      const p = res.data.profile;
      if (p) {
        setUniversity(p.university?.id ?? null);
        setFaculty(p.faculty?.id ?? null);
        setDepartment(p.department?.id ?? null);
        setLevel(p.level?.id ?? null);
        setSemester(p.semester?.id ?? null);
      }
    } catch (err) {
      console.log("LOAD USER ERROR:", err);
      Alert.alert("Error", "Could not load user profile.");
    }
    setLoading(false);
  };

  // -------------------- LOAD UNIVERSITY LIST --------------------
  const loadUniversities = async () => {
    try {
      const res = await api.get("/universities/");
      setUniversities(res.data.map((u: any) => ({ label: u.name, value: u.id })));
    } catch (err) {
      console.log("UNI ERROR:", err);
    }
  };

  // -------------------- NESTED LOOKUPS --------------------
  useEffect(() => {
    if (!university) return;
    api.get(`/faculties/?university=${university}`).then((res) => {
      setFaculties(res.data.map((f: any) => ({ label: f.name, value: f.id })));
    });
  }, [university]);

  useEffect(() => {
    if (!faculty) return;
    api.get(`/departments/?faculty=${faculty}`).then((res) => {
      setDepartments(res.data.map((d: any) => ({ label: d.name, value: d.id })));
    });
  }, [faculty]);

  useEffect(() => {
    if (!department) return;
    api.get(`/levels/?department=${department}`).then((res) => {
      setLevels(res.data.map((l: any) => ({ label: l.name, value: l.id })));
    });
  }, [department]);

  useEffect(() => {
    if (!level) return;
    api.get(`/semesters/?level=${level}`).then((res) => {
      setSemesters(res.data.map((s: any) => ({ label: s.name, value: s.id })));
    });
  }, [level]);

  if (loading) {
    return (
      <View style={styles.loadingWrap}>
        <ActivityIndicator size="large" color="#3D5AFE" />
      </View>
    );
  }

  // -------------------- UI COMPONENT --------------------
  const Field = ({ label, children }: any) => (
    <View style={{ marginBottom: 20 }}>
      <Text style={styles.label}>{label}</Text>
      {children}
    </View>
  );

  // -------------------- PROFILE UI --------------------
  return (
    <ScrollView style={styles.container}>
      {/* TOP PROFILE HEADER */}
      <View style={styles.header}>
        <Image
          source={{ uri: "https://ui-avatars.com/api/?name=" + user.first_name }}
          style={styles.avatar}
        />
        <Text style={styles.name}>{firstName} {lastName}</Text>
        <Text style={styles.email}>{email}</Text>

        <TouchableOpacity
          style={styles.editBtn}
          onPress={() => setEditing(!editing)}
        >
          <Text style={styles.editBtnText}>{editing ? "Cancel" : "Edit Profile"}</Text>
        </TouchableOpacity>
      </View>

      {/* FORM */}
      <View style={styles.card}>
        <Field label="First Name">
          <TextInput
            style={styles.input}
            editable={editing}
            value={firstName}
            onChangeText={setFirstName}
          />
        </Field>

        <Field label="Last Name">
          <TextInput
            style={styles.input}
            editable={editing}
            value={lastName}
            onChangeText={setLastName}
          />
        </Field>

        <Field label="Email">
          <TextInput
            style={styles.input}
            editable={editing}
            value={email}
            onChangeText={setEmail}
          />
        </Field>

        <Field label="University">
          <RNPickerSelect
            onValueChange={(v) => setUniversity(v)}
            items={universities}
            value={university}
            disabled={!editing}
            placeholder={{ label: "Select University", value: null }}
            style={pickerStyles}
          />
        </Field>

        <Field label="Faculty">
          <RNPickerSelect
            onValueChange={(v) => setFaculty(v)}
            items={faculties}
            value={faculty}
            disabled={!editing}
            placeholder={{ label: "Select Faculty", value: null }}
            style={pickerStyles}
          />
        </Field>

        <Field label="Department">
          <RNPickerSelect
            onValueChange={(v) => setDepartment(v)}
            items={departments}
            value={department}
            disabled={!editing}
            placeholder={{ label: "Select Department", value: null }}
            style={pickerStyles}
          />
        </Field>

        <Field label="Level">
          <RNPickerSelect
            onValueChange={(v) => setLevel(v)}
            items={levels}
            value={level}
            disabled={!editing}
            placeholder={{ label: "Select Level", value: null }}
            style={pickerStyles}
          />
        </Field>

        <Field label="Semester">
          <RNPickerSelect
            onValueChange={(v) => setSemester(v)}
            items={semesters}
            value={semester}
            disabled={!editing}
            placeholder={{ label: "Select Semester", value: null }}
            style={pickerStyles}
          />
        </Field>
      </View>

      {/* SAVE BUTTON */}
      {editing && (
        <TouchableOpacity style={styles.saveBtn}>
          <Text style={styles.saveText}>Save Changes</Text>
        </TouchableOpacity>
      )}

      <View style={{ height: 80 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f8f9ff" },

  header: {
    alignItems: "center",
    padding: 25,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderColor: "#eee",
  },

  avatar: {
    width: 90,
    height: 90,
    borderRadius: 90,
    marginBottom: 10,
  },

  name: { fontSize: 22, fontWeight: "700" },
  email: { fontSize: 14, color: "#777", marginBottom: 10 },

  editBtn: {
    backgroundColor: "#3D5AFE",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 10,
  },

  editBtnText: { color: "#fff", fontWeight: "600" },

  card: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 16,
    marginTop: 20,
    marginHorizontal: 15,
    elevation: 2,
  },

  label: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 6,
    color: "#333",
  },

  input: {
    backgroundColor: "#F3F3F6",
    borderRadius: 12,
    paddingHorizontal: 14,
    height: 50,
    justifyContent: "center",
  },

  saveBtn: {
    backgroundColor: "#3D5AFE",
    paddingVertical: 15,
    alignItems: "center",
    borderRadius: 14,
    marginHorizontal: 15,
    marginTop: 20,
  },

  saveText: { color: "#fff", fontSize: 16, fontWeight: "700" },

  loadingWrap: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

const pickerStyles = {
  inputIOS: {
    height: 50,
    backgroundColor: "#F3F3F6",
    borderRadius: 12,
    paddingHorizontal: 14,
  },
  inputAndroid: {
    height: 50,
    backgroundColor: "#F3F3F6",
    borderRadius: 12,
    paddingHorizontal: 14,
  },
};
