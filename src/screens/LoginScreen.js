import React, { useState } from "react";
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

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);


  const handleLogin = async () => {

  if (!email.trim() || !password.trim()) {
    setError("Enter your email and password");
    return;
  }

  try {

    setError("");
    setLoading(true);
// setTimeout(() => {
//       setLoading(false);
//       navigation.replace("Main");
//     }, 700);
   const response = await API.post("/auth/login", {
  email: email.trim(),
  password: password,
});

    if (response.data.success) {

      console.log("Login Response:", response.data);

      // Save token securely when real authentication is implemented.

      navigation.replace("Main");

    } else {

      setError(response.data.message || "Invalid credentials");
    }

  } catch (error) {

    console.log("Login API Error:", error.response?.data || error.message);

    setError(
      error.response?.data?.message ||
      "Unable to connect to server. Please try again."
    );

  } finally {

    setLoading(false);

  }
};

  return (
    <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
          <View style={styles.brandBlock}>
            <View style={styles.logoCircle}>
              <Text style={styles.logoText}>DL</Text>
            </View>
            <Text style={styles.brand}>The Detailing Lab</Text>
            <Text style={typography.bodyMuted}>Welcome back — sign in to continue</Text>
          </View>

          <TextField
            label="Email"
            placeholder="you@detailinglab.com"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />
          <TextField
            label="Password"
            placeholder="Your password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            error={error}
          />

          <PrimaryButton title="Log In" onPress={handleLogin} loading={loading} />

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
  scroll: { padding: spacing.lg, paddingBottom: spacing.xxl, flexGrow: 1, justifyContent: "center" },
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
  footerRow: { flexDirection: "row", justifyContent: "center", marginTop: spacing.lg },
  link: { color: colors.primary, fontWeight: "700" },
});
