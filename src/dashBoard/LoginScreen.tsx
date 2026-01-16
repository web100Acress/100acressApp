import React, { useMemo, useState } from "react";
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

const LoginScreen = ({ navigation }: any) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const randomImage = useMemo(
    () => bannerImages[Math.floor(Math.random() * bannerImages.length)],
    []
  );

  const isValid = email.includes("@") && password.length >= 4;

  // const handleLogin = async () => {
  //   if (!email || !password) {
  //     Alert.alert("Error", "Email & password required");
  //     return;
  //   }

  //   try {
  //     setLoading(true);

  //     // API call
  //     const res: any = await loginWithEmail({
  //       email: email.trim(),
  //       password: password.trim(),
  //     });

  //     console.log("LOGIN RESPONSE:", res);

  //     const token =
  //       res?.accessToken ||
  //       res?.token ||
  //       res?.data?.token;

  //     const user = res?.data?.user || res?.user; // adjust according to your API

  //     if (!token) {
  //       Alert.alert("Login Failed", "Access token not received");
  //       return;
  //     }

  //     // ✅ Save token & user data
  //     await AsyncStorage.setItem("ACCESS_TOKEN", token);
  //     await AsyncStorage.setItem("user", JSON.stringify(user));
  //     await AsyncStorage.setItem("isLoggedIn", "true");

  //     // Navigate to main app
  //     navigation.replace("BottomTabs");
  //   } catch (error: any) {
  //     console.error("LOGIN ERROR:", error);
  //     Alert.alert("Login Failed", error.message || "Invalid credentials");
  //   } finally {
  //     setLoading(false);
  //   }
  // };


const handleLogin = async () => {
  if (!email || !password) {
    Alert.alert("Error", "Email & password required");
    return;
  }

  try {
    setLoading(true);

    const res = await loginWithEmail({
      email: email.trim(),
      password: password.trim(),
    });

    const token = res?.token;
    const user = res?.User;

    if (!token) {
      Alert.alert("Login Failed", "Invalid credentials");
      return;
    }

    // 1. Storage mein save karein
    await Promise.all([
      AsyncStorage.setItem("ACCESS_TOKEN", token),
      AsyncStorage.setItem("IS_LOGGED_IN", "true"),
      user ? AsyncStorage.setItem("USER_DATA", JSON.stringify(user)) : Promise.resolve(),
    ]);

    // 2. Direct Navigation (Bina Alert ke)
    navigation.replace("BottomTabs");

  } catch (error) {
    Alert.alert("Login Failed", error.message || "Something went wrong");
  } finally {
    setLoading(false);
  }
};


  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "height" : undefined}
      >
        {/* Banner */}
        <View style={styles.bannerContainer}>
          <Image source={{ uri: randomImage }} style={styles.banner} />
        </View>

        <View style={styles.content}>
          <Text style={styles.title}>Hello Again, Welcome Back!</Text>
          <Text style={styles.subtitle}>
            Your personalised property search experience is ready.
          </Text>

          {/* Email */}
          <View style={styles.inputBox}>
            <TextInput
              placeholder="Email"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
              style={styles.input}
            />
          </View>

          {/* Password */}
          <View style={styles.inputBox}>
            <TextInput
              placeholder="Password"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
              style={styles.input}
            />
          </View>

          {/* Forgot Password */}
          <TouchableOpacity
            style={{ alignSelf: "flex-end", marginTop: 6 }}
            onPress={() => navigation.navigate("ForgotPassword")}
          >
            <Text style={styles.forgotText}>Forgot your password?</Text>
          </TouchableOpacity>

          {/* Sign In Button */}
          <TouchableOpacity
            disabled={!isValid || loading}
            onPress={handleLogin}
            style={[
              styles.button,
              isValid ? styles.buttonActive : styles.buttonDisabled,
            ]}
          >
            <Text style={styles.buttonText}>
              {loading ? "Please wait..." : "Sign in"}
            </Text>
          </TouchableOpacity>

          <Text style={styles.orText}>OR</Text>

          {/* Do it later */}
          <TouchableOpacity
            onPress={() => navigation.replace("BottomTabs")}
          >
            <Text style={styles.skipText}>Do it later</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  bannerContainer: { height: 480 },
  banner: { width, height: "100%", resizeMode: "cover" },

  content: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    marginTop: -130,
    padding: 24,
  },

  title: { fontSize: 24, fontWeight: "700" },
  subtitle: { fontSize: 14, color: "#6B7280", marginTop: 6 },

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

  forgotText: {
    color: "#1D4ED8",
    fontSize: 13,
    fontWeight: "600",
  },

  button: {
    height: 48,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 24,
  },

  buttonActive: { backgroundColor: "#1D4ED8" },
  buttonDisabled: { backgroundColor: "#9CA3AF" },

  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },

  orText: {
    textAlign: "center",
    marginVertical: 16,
    color: "#6B7280",
  },

  skipText: {
    textAlign: "center",
    color: "#1D4ED8",
    fontWeight: "600",
    backgroundColor: "#E0E7FF",
    paddingVertical: 12,
    borderRadius: 24,
  },
});
