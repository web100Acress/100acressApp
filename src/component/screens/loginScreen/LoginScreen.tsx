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
import CountryPicker, { Country, CountryCode } from "react-native-country-picker-modal";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { width } = Dimensions.get("window");

const bannerImages = [
  "https://images.unsplash.com/photo-1568605114967-8130f3a36994",
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
  "https://images.unsplash.com/photo-1572120360610-d971b9b78825",
  "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6",
];

const LoginScreen = ({ navigation }: any) => {
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [loginType, setLoginType] = useState<"phone" | "email">("phone");

  const [countryCode, setCountryCode] = useState<CountryCode>("IN");
  const [callingCode, setCallingCode] = useState("91");

  const randomImage = useMemo(
    () => bannerImages[Math.floor(Math.random() * bannerImages.length)],
    []
  );

  const isValid =
    loginType === "phone"
      ? phone.length >= 10
      : email.includes("@");

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
        behavior={Platform.OS === "ios" ? "height" : undefined}
      >
        <View style={styles.bannerContainer}>
          <Image source={{ uri: randomImage }} style={styles.banner} />
        </View>

        <View style={styles.content}>
          <Text style={styles.title}>Hello Again, Welcome Back!</Text>
          <Text style={styles.subtitle}>
            Your personalised property search experience is ready.
          </Text>

          <Text style={styles.loginText}>
            Login or Register to get started
          </Text>

          {/* 🔀 Phone / Email Toggle */}
          <View style={styles.toggleContainer}>
            <TouchableOpacity
              onPress={() => setLoginType("phone")}
              style={[
                styles.toggleButton,
                loginType === "phone" && styles.toggleActive,
              ]}
            >
              <Text
                style={[
                  styles.toggleText,
                  loginType === "phone" && styles.toggleTextActive,
                ]}
              >
                Phone No. 
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setLoginType("email")}
              style={[
                styles.toggleButton,
                loginType === "email" && styles.toggleActive,
              ]}
            >
              <Text
                style={[
                  styles.toggleText,
                  loginType === "email" && styles.toggleTextActive,
                ]}
              >
                Email
              </Text>
            </TouchableOpacity>
          </View>

          {/* 📱 Phone Input */}
          {loginType === "phone" && (
            <View style={styles.phoneContainer}>
              <CountryPicker
                countryCode={countryCode}
                withFilter
                withFlag
                withCallingCode
                onSelect={(country: Country) => {
                  setCountryCode(country.cca2);
                  setCallingCode(country.callingCode[0]);
                }}
              />

              <Text style={styles.countryCode}>+{callingCode}</Text>

              <TextInput
                placeholder="Enter phone number"
                keyboardType="phone-pad"
                value={phone}
                onChangeText={setPhone}
                style={styles.input}
              />
            </View>
          )}

          {/* 📧 Email Input */}
          {loginType === "email" && (
            <View style={styles.emailContainer}>
              <TextInput
                placeholder="Enter email address"
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
                style={styles.emailInput}
              />
            </View>
          )}

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
    height: 480 
  },
  banner: { 
    width, 
    height: "100%", 
    resizeMode: "cover" 
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
    fontWeight: "700" 
  },
  subtitle: { 
    fontSize: 14,
     color: "#6B7280",
      marginTop: 6 
    },
  loginText: { 
    marginTop: 24, 
    fontSize: 16, 
    fontWeight: "600" 
  },

  toggleContainer: {
    flexDirection: "row",
    marginTop: 12,
    width: "50%",
  },

  toggleButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
    borderBottomWidth: 1,
  },

  toggleActive: {
  },

  toggleText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#6B7280",
  },

  toggleTextActive: {
    color: "#f63b3bff",
    fontSize: 16,
    fontWeight: "700",
  },

  phoneContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 10,
    marginTop: 12,
    paddingHorizontal: 12,
    gap: 6,
  },

  countryCode: { 
    fontSize: 16, 
    fontWeight: "600", 
  },
  input: { 
    flex: 1, 
    height: 48, 
    fontSize: 16 
  },

  emailContainer: {
    marginTop: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 10,
    paddingHorizontal: 12,
  },

  emailInput: {
    height: 48,
    fontSize: 16,
  },

  button: {
    height: 48,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },

  buttonActive: { 
    backgroundColor: "#f63b3bff" 
  },
  buttonDisabled: { 
    backgroundColor: "#e7c3c3ff" 
  },

  buttonText: { 
    color: "#fff", 
    fontSize: 16, 
    fontWeight: "600"
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
