import React, { useState, useEffect } from "react";
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
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LinearGradient from "react-native-linear-gradient";
import { loginWithEmail } from "../api/authService";

const { width } = Dimensions.get("window");

const LoginScreen = ({ navigation }: any) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState<any>(null);

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

      await AsyncStorage.setItem("ACCESS_TOKEN", token);
      await AsyncStorage.setItem("IS_LOGGED_IN", "true");

      if (user) {
        await AsyncStorage.setItem("USER_DATA", JSON.stringify(user));
        setUserData(user);
      }

      setIsLoggedIn(true);
      navigation.replace("BottomTabs");
    } catch (error: any) {
      Alert.alert("Error", error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.clear();
      setIsLoggedIn(false);
      setUserData(null);
      navigation.replace("Login");
    } catch (error) {
      Alert.alert("Error", "Unable to logout");
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {isLoggedIn ? (
        <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
          {/* 🔴 Header */}
          <View
            style={styles.header}
          />
        
          {/* 👤 Profile */}
          <View style={styles.profileWrapper}>
            <Image
              source={{
                uri: "https://www.clipartmax.com/png/middle/344-3442642_clip-art-freeuse-library-profile-man-user-people-icon-icono-de-login.png",
              }}
              style={styles.profileImage}
            />
            <Text style={styles.profileName}>
              {userData?.name || "User Name"}
            </Text>
          </View>

          {/* 🧾 Card */}
          <View style={styles.card}>
            <Text style={styles.label}>Email : </Text>
            <Text style={styles.value}>{userData?.email}</Text>

            {/* <TouchableOpacity style={styles.primaryBtn}>
              <Text style={styles.primaryBtnText}>Update</Text>
            </TouchableOpacity> */}

            <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
              <Text style={styles.logoutText}>Logout</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      ) : (
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          style={styles.loginContainer}
        >
          <Text style={styles.title}>Sign In</Text>

          <View style={styles.inputBox}>
            <TextInput
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              style={styles.input}
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputBox}>
            <TextInput
              placeholder="Password"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
              style={styles.input}
            />
          </View>

          <TouchableOpacity
            onPress={handleLogin}
            style={[
              styles.button,
              email.includes("@")
                ? styles.buttonActive
                : styles.buttonDisabled,
            ]}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Login</Text>
            )}
          </TouchableOpacity>
        </KeyboardAvoidingView>
      )}
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  header: {
    height: 220,
    backgroundColor: "#f8b4b4"
  },

  profileWrapper: {
    alignItems: "center",
    marginTop: -70,
  },

  profileImage: {
    width: 110,
    height: 110,
    borderRadius: 55,
    borderWidth: 4,
    borderColor: "#fff",
  },

  profileName: {
    marginTop: 10,
    fontSize: 28,
    fontWeight: "700",
  },

  card: {
    backgroundColor: "#fff",
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 16,
    padding: 20,
    elevation: 4,
  },

  label: {
    color: "#6B7280",
    fontSize: 16,
    fontWeight: 500
  },

  value: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 20,
  },

  primaryBtn: {
    backgroundColor: "#111827",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 12,
  },

  primaryBtnText: {
    color: "#fff",
    fontWeight: "600",
  },

  logoutBtn: {
    alignItems: "center",
    paddingVertical: 12,
  },

  logoutText: {
    color: "#EF4444",
    fontWeight: "600",
  },

  loginContainer: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 24,
  },

  title: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 20,
  },

  inputBox: {
    marginTop: 16,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 10,
    paddingHorizontal: 12,
  },

  input: {
    height: 48,
    fontSize: 16,
  },

  button: {
    height: 48,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 24,
  },

  buttonActive: {
    backgroundColor: "#1D4ED8",
  },

  buttonDisabled: {
    backgroundColor: "#9CA3AF",
  },

  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
