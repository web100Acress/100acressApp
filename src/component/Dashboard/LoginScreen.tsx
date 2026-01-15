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
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";

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

  const randomImage = useMemo(
    () => bannerImages[Math.floor(Math.random() * bannerImages.length)],
    []
  );

  const isValid = email.includes("@") && password.length >= 6;

  const skipLogin = () => {
    navigation.replace("BottomTabs");
  };

  const handleLogin = async () => {
    await AsyncStorage.setItem("isLoggedIn", "true");
    navigation.replace("BottomTabs");
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        {/* Banner */}
        <View style={styles.bannerContainer}>
          <Image source={{ uri: randomImage }} style={styles.banner} />
        </View>

        {/* Content */}
        <View style={styles.content}>
          <Text style={styles.title}>Hello Again, Welcome Back!</Text>
          <Text style={styles.subtitle}>
            Your personalised property search experience is ready.
          </Text>

          <Text style={styles.loginText}>
            Login to get started
          </Text>

          {/* Email */}
          <TextInput
            placeholder="Email address"
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            value={email}
            onChangeText={setEmail}
            style={styles.input}
          />

          {/* Password */}
          <TextInput
            placeholder="Password"
            secureTextEntry
            keyboardType="default"
            autoCapitalize="none"
            autoCorrect={false}
            value={password}
            onChangeText={setPassword}
            style={styles.input}
          />

          {/* Button */}
          <TouchableOpacity
            disabled={!isValid}
            onPress={handleLogin}
            style={[
              styles.button,
              isValid ? styles.buttonActive : styles.buttonDisabled,
            ]}
          >
            <Text style={styles.buttonText}>Continue</Text>
          </TouchableOpacity>

          <Text style={styles.orText}>OR</Text>

          <TouchableOpacity onPress={skipLogin}>
            <Text style={styles.skipText}>Do it later</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  bannerContainer: {
    height: 480,
  },
  banner: {
    width,
    height: "100%",
    resizeMode: "cover",
  },

  content: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    marginTop: -130,
    padding: 24,
  },

  title: {
    fontSize: 24,
    fontWeight: "700",
  },
  subtitle: {
    fontSize: 14,
    color: "#6B7280",
    marginTop: 6,
  },
  loginText: {
    marginTop: 24,
    fontSize: 16,
    fontWeight: "600",
  },

  input: {
    height: 48,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 10,
    paddingHorizontal: 12,
    marginTop: 12,
  },

  button: {
    height: 48,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  buttonActive: {
    backgroundColor: "#f63b3bff",
  },
  buttonDisabled: {
    backgroundColor: "#e7c3c3ff",
  },
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
    color: "#f63b3bff",
    fontWeight: "600",
    backgroundColor: "#e7c3c3ff",
    paddingVertical: 10,
    borderRadius: 20,
  },
});
