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

export default function RegistrationScreen({ navigation }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const update = (key) => (value) => setForm((f) => ({ ...f, [key]: value }));

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Full name is required";
    if (!form.email.trim()) e.email = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = "Enter a valid email";
    if (!form.phone.trim()) e.phone = "Phone number is required";
    else if (form.phone.replace(/\D/g, "").length < 10) e.phone = "Enter a valid phone number";
    if (!form.password) e.password = "Password is required";
    else if (form.password.length < 6) e.password = "Minimum 6 characters";
    if (form.confirmPassword !== form.password) e.confirmPassword = "Passwords do not match";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleRegister = () => {
    if (!validate()) return;
    setLoading(true);
    // Simulate an API call — hook up real auth (Firebase/Supabase/REST) here.
    setTimeout(() => {
      setLoading(false);
      navigation.replace("Main");
    }, 900);
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
            <Text style={typography.bodyMuted}>Create your staff account</Text>
          </View>

          <TextField
            label="Full Name"
            placeholder="e.g. Priya Sharma"
            value={form.name}
            onChangeText={update("name")}
            error={errors.name}
          />
          <TextField
            label="Email"
            placeholder="you@detailinglab.com"
            keyboardType="email-address"
            autoCapitalize="none"
            value={form.email}
            onChangeText={update("email")}
            error={errors.email}
          />
          <TextField
            label="Phone Number"
            placeholder="+91 98xxxxxxx"
            keyboardType="phone-pad"
            value={form.phone}
            onChangeText={update("phone")}
            error={errors.phone}
          />
          <TextField
            label="Password"
            placeholder="Minimum 6 characters"
            secureTextEntry
            value={form.password}
            onChangeText={update("password")}
            error={errors.password}
          />
          <TextField
            label="Confirm Password"
            placeholder="Re-enter password"
            secureTextEntry
            value={form.confirmPassword}
            onChangeText={update("confirmPassword")}
            error={errors.confirmPassword}
          />

          <PrimaryButton
            title="Create Account"
            onPress={handleRegister}
            loading={loading}
            style={{ marginTop: spacing.sm }}
          />

          <View style={styles.footerRow}>
            <Text style={typography.bodyMuted}>Already have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
              <Text style={styles.link}>Log in</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  scroll: { padding: spacing.lg, paddingBottom: spacing.xxl },
  brandBlock: { alignItems: "center", marginBottom: spacing.xl, marginTop: spacing.md },
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
