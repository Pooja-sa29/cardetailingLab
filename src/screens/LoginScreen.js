import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors, spacing, typography } from "../theme/theme";
import { TextField, PrimaryButton } from "../components/UI";
import API from "../services/api";

const RESEND_SECONDS = 30;

export default function LoginScreen({ navigation }) {
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(0);

  // Resend countdown
  useEffect(() => {
    if (timer <= 0) return;
    const id = setTimeout(() => setTimer((t) => t - 1), 1000);
    return () => clearTimeout(id);
  }, [timer]);

  const isValidMobile = (m) => /^[6-9]\d{9}$/.test(m);

  const handleSendOtp = async () => {
    if (!isValidMobile(mobile)) {
      setError("Enter a valid 10-digit mobile number");
      return;
    }
    try {
      setError("");
      setLoading(true);
      const response = await API.post("/auth/send-otp", { mobile });
      if (response.data.success) {
        setOtpSent(true);
        setOtp("");
        setTimer(RESEND_SECONDS);
      } else {
        setError(response.data.message || "Could not send OTP");
      }
    } catch (err) {
      console.log("Send OTP Error:", err.response?.data || err.message);
      setError(
        err.response?.data?.message ||
          "Unable to connect to server. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (otp.length !== 6) {
      setError("Enter the 6-digit OTP");
      return;
    }
    try {
      setError("");
      setLoading(true);
      const response = await API.post("/auth/verify-otp", { mobile, otp });
      if (response.data.success) {
        // TODO: save response.data.token in secure storage
        navigation.replace("Main");
      } else {
        setError(response.data.message || "Invalid OTP");
      }
    } catch (err) {
      console.log("Verify OTP Error:", err.response?.data || err.message);
      setError(err.response?.data?.message || "Verification failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleChangeNumber = () => {
    setOtpSent(false);
    setOtp("");
    setError("");
    setTimer(0);
  };

  return (
    <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.brandBlock}>
            <View style={styles.logoCircle}>
              <Text style={styles.logoText}>DL</Text>
            </View>
            <Text style={styles.brand}>The Detailing Lab</Text>
            <Text style={typography.bodyMuted}>
              {otpSent
                ? `Enter the OTP sent to +91 ${mobile}`
                : "Welcome back — sign in with your mobile number"}
            </Text>
          </View>

          {!otpSent ? (
            <>
              <TextField
                label="Mobile Number"
                placeholder="10-digit mobile number"
                keyboardType="phone-pad"
                value={mobile}
                onChangeText={(t) => setMobile(t.replace(/\D/g, "").slice(0, 10))}
                error={error}
              />
              <PrimaryButton
                title="Send OTP"
                onPress={handleSendOtp}
                loading={loading}
              />
            </>
          ) : (
            <>
              <TextField
                label="OTP"
                placeholder="6-digit OTP"
                keyboardType="number-pad"
                value={otp}
                onChangeText={(t) => setOtp(t.replace(/\D/g, "").slice(0, 6))}
                error={error}
              />
              <PrimaryButton
                title="Verify & Log In"
                onPress={handleVerifyOtp}
                loading={loading}
              />

              <View style={styles.footerRow}>
                {timer > 0 ? (
                  <Text style={typography.bodyMuted}>Resend OTP in {timer}s</Text>
                ) : (
                  <TouchableOpacity onPress={handleSendOtp}>
                    <Text style={styles.link}>Resend OTP</Text>
                  </TouchableOpacity>
                )}
              </View>
              <View style={styles.footerRow}>
                <TouchableOpacity onPress={handleChangeNumber}>
                  <Text style={styles.link}>Change number</Text>
                </TouchableOpacity>
              </View>
            </>
          )}

          <View style={styles.footerRow}>
            <Text style={typography.bodyMuted}>New here? </Text>
            <TouchableOpacity onPress={() => navigation.navigate("Registration")}>
              <Text style={styles.link}>Create an account</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  scroll: {
    padding: spacing.lg,
    paddingBottom: spacing.xxl,
    flexGrow: 1,
    justifyContent: "center",
  },
  brandBlock: { alignItems: "center", marginBottom: spacing.xl },
  logoCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: spacing.sm,
  },
  logoText: { color: colors.white, fontWeight: "800", fontSize: 22 },
  brand: { ...typography.h1, marginBottom: 2 },
  footerRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: spacing.lg,
  },
  link: { color: colors.primary, fontWeight: "700" },
});