import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";

const roles = ["Agent", "Owner", "Builder"];

const CreateAccount = ({ navigation }: any) => {
  const [role, setRole] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // Auto redirect if already logged in
  useEffect(() => {
    const checkLogin = async () => {
      const loggedIn = await AsyncStorage.getItem("IS_LOGGED_IN");
      if (loggedIn === "true") navigation.replace("Dashb");
    };
    checkLogin();
  }, []);

  const handleSignup = async () => {
    if (!role || !name || !email || !mobile || !password || !confirmPassword) {
      Alert.alert("Error", "Please fill all fields");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        "https://api.100acress.com/postPerson/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name,
            email,
            mobile,
            password,
            cpassword: confirmPassword,
            role,
          }),
        }
      );

      const data = await response.json();
      setLoading(false);

      if (response.ok) {
        // Save user data temporarily (OTP verification pending)
        await AsyncStorage.setItem(
          "USER_DATA",
          JSON.stringify(data.user || { name, email, mobile, role })
        );

        // Navigate to OTP verification screen
        navigation.replace("VerifyOTP", { email }); // pass email for OTP
      } else {
        Alert.alert("Error", data.message || "Something went wrong");
      }
    } catch (error) {
      setLoading(false);
      Alert.alert("Error", "Network error, please try again");
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView contentContainerStyle={{ padding: 24 }}>
          <Text style={styles.title}>Create Account</Text>
          <Text style={styles.subtitle}>
            Join 100acress & grow your business
          </Text>

          {/* Role Selection */}
          <Text style={styles.label}>Select your role</Text>
          <View style={styles.roleRow}>
            {roles.map((item) => (
              <TouchableOpacity
                key={item}
                style={[styles.rolePill, role === item && styles.roleActive]}
                onPress={() => setRole(item)}
              >
                <Text
                  style={[styles.roleText, role === item && styles.roleTextActive]}
                >
                  {item}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Input Fields */}
          <Input
            label="Full Name"
            placeholder="Enter your full name"
            value={name}
            onChange={setName}
          />
          <Input
            label="Email"
            placeholder="Enter your email"
            value={email}
            onChange={setEmail}
            keyboardType="email-address"
          />
          <Input
            label="Mobile Number"
            placeholder="Enter mobile number"
            value={mobile}
            onChange={setMobile}
            keyboardType="number-pad"
          />
          <PasswordInput
            label="Password"
            placeholder="Enter password"
            value={password}
            onChange={setPassword}
          />
          <PasswordInput
            label="Confirm Password"
            placeholder="Re-enter password"
            value={confirmPassword}
            onChange={setConfirmPassword}
          />

          {/* Signup Button */}
          <TouchableOpacity
            style={styles.cta}
            onPress={handleSignup}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.ctaText}>Create Account</Text>
            )}
          </TouchableOpacity>

          {/* Already have account */}
          <TouchableOpacity
            style={{ marginTop: 16 }}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.linkText}>
              Already have an account?{" "}
              <Text style={{ fontWeight: "700", color: "#cb3535" }}>Login</Text>
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default CreateAccount;

/* ================= INPUT COMPONENT ================= */
const Input = ({ label, placeholder, value, onChange, keyboardType }: any) => (
  <View style={{ marginBottom: 14 }}>
    <Text style={styles.inputLabel}>{label}</Text>
    <View style={styles.inputBox}>
      <TextInput
        placeholder={placeholder}
        placeholderTextColor="#9CA3AF"
        value={value}
        onChangeText={onChange}
        keyboardType={keyboardType}
        autoCapitalize="none"
        style={styles.input}
      />
    </View>
  </View>
);

/* ================= PASSWORD INPUT ================= */
const PasswordInput = ({ label, placeholder, value, onChange }: any) => {
  const [secure, setSecure] = useState(true);
  return (
    <View style={{ marginBottom: 14 }}>
      <Text style={styles.inputLabel}>{label}</Text>
      <View style={styles.passwordBox}>
        <TextInput
          placeholder={placeholder}
          placeholderTextColor="#9CA3AF"
          value={value}
          onChangeText={onChange}
          secureTextEntry={secure}
          style={styles.passwordInput}
        />
        <TouchableOpacity onPress={() => setSecure(!secure)}>
          <Text style={styles.eyeText}>{secure ? "Show" : "Hide"}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

/* ================= STYLES ================= */
const styles = StyleSheet.create({
  title: {
    fontSize: 28,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 6,
    color: "#e73636",
  },
  subtitle: { fontSize: 14, textAlign: "center", marginBottom: 18, color: "#111827" },
  label: { fontSize: 15, fontWeight: "600", marginBottom: 10, color: "#111827" },
  roleRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 20 },
  rolePill: {
    flex: 1,
    paddingVertical: 10,
    marginHorizontal: 4,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: "#D1D5DB",
    alignItems: "center",
  },
  roleActive: { backgroundColor: "#cb3535", borderColor: "#cb3535" },
  roleText: { fontWeight: "600", color: "#374151" },
  roleTextActive: { color: "#fff" },
  inputLabel: { fontSize: 13, fontWeight: "600", marginBottom: 6, marginLeft: 4 },
  inputBox: {
    backgroundColor: "#F3F4F6",
    borderRadius: 14,
    paddingHorizontal: 16,
    borderWidth: 2,
    borderColor: "#f6d9d9",
  },
  input: { height: 52, fontSize: 16, color: "#111827" },
  passwordBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F3F4F6",
    borderRadius: 14,
    paddingHorizontal: 16,
    borderWidth: 2,
    borderColor: "#f6d9d9",
  },
  passwordInput: { flex: 1, height: 52, fontSize: 16, color: "#111827" },
  eyeText: { color: "#cb3535", fontWeight: "700", fontSize: 14 },
  cta: {
    height: 52,
    borderRadius: 14,
    backgroundColor: "#cb3535",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  ctaText: { color: "#fff", fontWeight: "700", fontSize: 16 },
  linkText: { textAlign: "center", fontSize: 14, color: "#6B7280" },
});
