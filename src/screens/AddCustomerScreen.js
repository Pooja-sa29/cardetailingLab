import React, { useState } from "react";
import { View, ScrollView, StyleSheet, KeyboardAvoidingView, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors, spacing } from "../theme/theme";
import { TextField, PrimaryButton, ScreenHeader } from "../components/UI";
import { addCustomer } from "../data/store";

export default function AddCustomerScreen({ navigation }) {
  const [form, setForm] = useState({ name: "", phone: "", email: "", address: "" });
  const [errors, setErrors] = useState({});

  const update = (key) => (value) => setForm((f) => ({ ...f, [key]: value }));

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.phone.trim()) e.phone = "Phone number is required";
    if (form.email && !/^\S+@\S+\.\S+$/.test(form.email)) e.email = "Enter a valid email";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSave = () => {
    if (!validate()) return;
    const newCustomer = {
      id: `c${Date.now()}`,
      name: form.name.trim(),
      phone: form.phone.trim(),
      email: form.email.trim(),
      address: form.address.trim(),
      vehicleIds: [],
    };
    addCustomer(newCustomer);
    navigation.navigate("CustomerDetails", { customerId: newCustomer.id });
  };

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : undefined}>
        <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
          <ScreenHeader title="New Customer" subtitle="Add a customer profile" />

          <TextField
            label="Full Name"
            placeholder="e.g. Sanjay Patil"
            value={form.name}
            onChangeText={update("name")}
            error={errors.name}
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
            label="Email (optional)"
            placeholder="customer@example.com"
            keyboardType="email-address"
            autoCapitalize="none"
            value={form.email}
            onChangeText={update("email")}
            error={errors.email}
          />
          <TextField
            label="Address (optional)"
            placeholder="Street, area, city"
            value={form.address}
            onChangeText={update("address")}
          />

          <PrimaryButton title="Save Customer" onPress={handleSave} style={{ marginTop: spacing.sm }} />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  scroll: { padding: spacing.lg, paddingBottom: spacing.xxl },
});
