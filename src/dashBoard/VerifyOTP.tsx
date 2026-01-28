import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const VerifyOTP = ({ route, navigation }: any) => {
  const { email } = route.params;
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const handleVerify = async () => {
    console.log("👉 Verify button clicked");
    console.log("📧 Email:", email);
    console.log("🔢 Entered OTP:", otp);

    if (!otp) {
      Alert.alert("Error", "Please enter the OTP");
      return;
    }

    try {
      setLoading(true);

      console.log("⏳ Sending OTP verification request...");

      const response = await fetch(
        "https://api.100acress.com/postPerson/otp",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: email,
            otp: otp,
          }),
        }
      );

      const data = await response.json();
      setLoading(false);

      console.log("✅ OTP API Status:", response.status);
      console.log("📦 OTP API Response:", data);

      if (response.ok) {
        Alert.alert("Success", "Email successfully verified", [
          {
            text: "OK",
            onPress: () => navigation.replace("BottomTabs"),
          },
        ]);
      } else {
        Alert.alert("Error", data.message || "Invalid OTP");
      }
    } catch (error) {
      setLoading(false);
      console.log("❌ OTP API Error:", error);
      Alert.alert("Error", "Network error, please try again");
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, padding: 24 }}>
      <Text style={styles.title}>Verify OTP</Text>
      <Text style={styles.subtitle}>
        Enter the OTP sent to your email: {email}
      </Text>

      <TextInput
        placeholder="Enter OTP"
        value={otp}
        onChangeText={(text) => {
          setOtp(text);
          console.log("✏️ OTP typing:", text);
        }}
        keyboardType="number-pad"
        style={styles.input}
      />

      <TouchableOpacity
        style={styles.cta}
        onPress={handleVerify}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.ctaText}>Verify</Text>
        )}
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default VerifyOTP;

const styles = StyleSheet.create({
  title: { fontSize: 28, fontWeight: "700", marginBottom: 6, color: "#e73636" },
  subtitle: { fontSize: 14, marginBottom: 18, color: "#111827" },
  input: {
    height: 52,
    fontSize: 16,
    backgroundColor: "#F3F4F6",
    borderRadius: 14,
    paddingHorizontal: 16,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: "#f6d9d9",
    color: "#111827",
  },
  cta: {
    height: 52,
    borderRadius: 14,
    backgroundColor: "#cb3535",
    justifyContent: "center",
    alignItems: "center",
  },
  ctaText: { color: "#fff", fontWeight: "700", fontSize: 16 },
});
