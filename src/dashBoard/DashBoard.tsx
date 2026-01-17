import React, { useEffect, useMemo, useState } from "react";
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
import { loginWithEmail } from "../api/authService";

const { width } = Dimensions.get("window");

const bannerImages = [
  "https://images.unsplash.com/photo-1568605114967-8130f3a36994",
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
  "https://images.unsplash.com/photo-1572120360610-d971b9b78825",
  "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6",
];

const DashBoad = ({ navigation }: any) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState<any>(null);

  const randomImage = useMemo(
    () => bannerImages[Math.floor(Math.random() * bannerImages.length)],
    []
  );

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
    await AsyncStorage.clear();
    setIsLoggedIn(false);
    setUserData(null);
    navigation.replace("Login");
  };

  return (
    <SafeAreaView style={{ flex: 1, marginTop: -50}}>
      {isLoggedIn ? (
        /* ================= LOGGED IN UI ================= */
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.header} />

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

          <View style={styles.card}>
            <Text style={styles.label}>Email</Text>
            <Text style={styles.value}>{userData?.email}</Text>

            <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
              <Text style={styles.logoutText}>Logout</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      ) : (
        /* ================= LOGIN UI ================= */
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "height" : undefined}
        >
          {/* Banner */}
          <View style={styles.bannerContainer}>
            <Image source={{ uri: randomImage }} style={styles.banner} />
            <View style={styles.bannerOverlay} />
          </View>

          {/* Login Card */}
          <View style={styles.content}>
            <Text style={styles.title}>Welcome Back 👋</Text>
            <Text style={styles.subtitle}>
              Sign in to continue
            </Text>

            <View style={styles.inputBox}>
              <TextInput
                placeholder="Email address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
                style={styles.input}
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
              disabled={loading}
              style={[
                styles.button,
                email.includes("@")
                  ? styles.buttonActive
                  : styles.buttonDisabled,
              ]}
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.buttonText}>Sign In</Text>
              )}
            </TouchableOpacity>

            {/* CREATE ACCOUNT */}
            <TouchableOpacity
              style={styles.createAccount}
              onPress={() => navigation.navigate("CreateNewAcc")}
            >
              <Text style={styles.createText}>
                Don’t have an account?{" "}
                <Text style={styles.createLink}>Create new account</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      )}
    </SafeAreaView>
  );
};

export default DashBoad;

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  header: {
    height: 220,
    backgroundColor: "#f8b4b4",
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
  },

  value: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 20,
  },

  logoutBtn: {
    alignItems: "center",
    paddingVertical: 12,
  },

  logoutText: {
    color: "#EF4444",
    fontWeight: "600",
  },

  /* LOGIN */
  bannerContainer: {
    height: 450,
  },

  banner: {
    width,
    height: "100%",
    resizeMode: "cover",
  },

  bannerOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.35)",
  },

  content: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    marginTop: -120,
    padding: 24,
  },

  title: {
    fontSize: 26,
    fontWeight: "800",
  },

  subtitle: {
    fontSize: 14,
    color: "#6B7280",
    marginTop: 6,
  },

  inputBox: {
    marginTop: 18,
    backgroundColor: "#F9FAFB",
    borderRadius: 12,
    paddingHorizontal: 14,
  },

  input: {
    height: 48,
    fontSize: 16,
  },

  button: {
    height: 50,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 28,
  },

  buttonActive: {
    backgroundColor: "#ff5a1f",
  },

  buttonDisabled: {
    backgroundColor: "#9CA3AF",
  },

  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },

  createAccount: {
    marginTop: 24,
    alignItems: "center",
  },

  createText: {
    fontSize: 14,
    color: "#6B7280",
  },

  createLink: {
    color: "#ff5a1f",
    fontWeight: "700",
  },
});
