import React, { useMemo, useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { loginWithEmail } from "../api/authService";

const { width } = Dimensions.get("window");

const LoginScreen = ({ navigation }: any) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState<any>(null);

  // Check login status on mount
  useEffect(() => {
    checkLoginStatus();
  }, []);

  const checkLoginStatus = async () => {
    const status = await AsyncStorage.getItem("IS_LOGGED_IN");
    const savedUser = await AsyncStorage.getItem("USER_DATA");
    if (status === "true" && savedUser) {
      setIsLoggedIn(true);
      setUserData(JSON.parse(savedUser));
    }
  };

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Email & password required");
      return;
    }
    try {
      setLoading(true);
      const res: any = await loginWithEmail({
        email: email.trim(),
        password: password.trim(),
      });

      const token = res?.token;
      const user = res?.User;

      if (!token) {
        Alert.alert("Login Failed", "Invalid credentials");
        return;
      }

      // ✅ Data Store Karein
      await AsyncStorage.setItem("ACCESS_TOKEN", token);
      await AsyncStorage.setItem("IS_LOGGED_IN", "true");
      if (user) {
        await AsyncStorage.setItem("USER_DATA", JSON.stringify(user));
        setUserData(user);
      }
      
      setIsLoggedIn(true);
      Alert.alert("Success", "Welcome Back!");
      navigation.replace("BottomTabs"); // Direct App Entry

    } catch (error: any) {
      Alert.alert("Error", error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };


    const handleLogout = async () => {
  try {
    // 1️⃣ Clear local storage
    await AsyncStorage.clear();

    // 2️⃣ Reset state
    setIsLoggedIn(false);
    setUserData(null);

    // 3️⃣ Navigate to Login screen
    navigation.replace("Login"); 
  } catch (error) {
    console.log("Logout Error:", error);
    Alert.alert("Error", "Unable to logout. Please try again.");
  }
};

  // UI rendering based on Login Status
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={styles.content}>
        {isLoggedIn ? (
          /* ✅ LOGIN KE BAAD YE DIKHEGA (User Info & Logout) */
          <View style={styles.userInfoContainer}>
            <Text style={styles.title}>Welcome, {userData?.name || 'User'}!</Text>
            <Text style={styles.subtitle}>Email: {userData?.email}</Text>
            
            <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
              <Text style={styles.buttonText}>Logout</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.button, styles.buttonActive]} 
              onPress={() => navigation.replace("BottomTabs")}
            >
              <Text style={styles.buttonText}>Go to Home</Text>
            </TouchableOpacity>
          </View>
        ) : (
          /* ❌ LOGIN SE PEHLE YE DIKHEGA (Login Form) */
          <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined}>
            <Text style={styles.title}>Sign In</Text>
            <View style={styles.inputBox}>
              <TextInput placeholder="Email" value={email} onChangeText={setEmail} style={styles.input} />
            </View>
            <View style={styles.inputBox}>
              <TextInput placeholder="Password" secureTextEntry value={password} onChangeText={setPassword} style={styles.input} />
            </View>

            <TouchableOpacity 
              onPress={handleLogin} 
              style={[styles.button, email.includes('@') ? styles.buttonActive : styles.buttonDisabled]}
              disabled={loading}
            >
              {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Login</Text>}
            </TouchableOpacity>
          </KeyboardAvoidingView>
        )}
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  content: { padding: 24, flex: 1, justifyContent: 'center' },
  userInfoContainer: { alignItems: 'center' },
  title: { fontSize: 24, fontWeight: "700", marginBottom: 10 },
  subtitle: { fontSize: 16, color: "#6B7280", marginBottom: 20 },
  inputBox: { marginTop: 16, borderWidth: 1, borderColor: "#E5E7EB", borderRadius: 10, paddingHorizontal: 12 },
  input: { height: 48, fontSize: 16 },
  button: { height: 48, borderRadius: 10, justifyContent: "center", alignItems: "center", marginTop: 24, width: '100%' },
  buttonActive: { backgroundColor: "#1D4ED8" },
  buttonDisabled: { backgroundColor: "#9CA3AF" },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "600" },
  logoutButton: { backgroundColor: '#EF4444', padding: 12, borderRadius: 10, marginTop: 20, width: '100%', alignItems: 'center' }
});