import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors, spacing, radii } from "../theme/theme";
import { TextField, PrimaryButton, ScreenHeader } from "../components/UI";
import { addVehicle, customers } from "../data/store";

export default function AddVehicleScreen({ route, navigation }) {
  const presetCustomerId = route.params?.presetCustomerId ?? null;
  const [form, setForm] = useState({
    make: "",
    model: "",
    year: "",
    plate: "",
    color: "",
    service: "",
  });
  const [customerId, setCustomerId] = useState(presetCustomerId);
  const [errors, setErrors] = useState({});

  const update = (key) => (value) => setForm((f) => ({ ...f, [key]: value }));

  const validate = () => {
    const e = {};
    if (!form.make.trim()) e.make = "Make is required";
    if (!form.model.trim()) e.model = "Model is required";
    if (!form.plate.trim()) e.plate = "License plate is required";
    if (!customerId) e.customer = "Select a customer";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSave = () => {
    if (!validate()) return;
    const newVehicle = {
      id: `v${Date.now()}`,
      customerId,
      make: form.make.trim(),
      model: form.model.trim(),
      year: form.year.trim() || "—",
      plate: form.plate.trim().toUpperCase(),
      color: form.color.trim() || "—",
      service: form.service.trim() || "General Detailing",
      status: "Scheduled",
    };
    addVehicle(newVehicle);
    navigation.navigate("VehicleDetails", { vehicleId: newVehicle.id });
  };

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : undefined}>
        <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
          <ScreenHeader title="New Vehicle" subtitle="Add a car or bike for detailing" />

          <Text style={styles.sectionLabel}>Owner</Text>
          <View style={styles.customerPicker}>
            {customers.map((c) => (
              <TouchableOpacity
                key={c.id}
                onPress={() => setCustomerId(c.id)}
                style={[styles.customerChip, customerId === c.id && styles.customerChipActive]}
              >
                <Text
                  style={[
                    styles.customerChipText,
                    customerId === c.id && styles.customerChipTextActive,
                  ]}
                >
                  {c.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          {errors.customer ? <Text style={styles.errorText}>{errors.customer}</Text> : null}

          <TextField
            label="Make"
            placeholder="e.g. Honda"
            value={form.make}
            onChangeText={update("make")}
            error={errors.make}
          />
          <TextField
            label="Model"
            placeholder="e.g. City"
            value={form.model}
            onChangeText={update("model")}
            error={errors.model}
          />
          <TextField
            label="Year"
            placeholder="e.g. 2023"
            keyboardType="number-pad"
            value={form.year}
            onChangeText={update("year")}
          />
          <TextField
            label="License Plate"
            placeholder="e.g. MH 31 XY 4321"
            autoCapitalize="characters"
            value={form.plate}
            onChangeText={update("plate")}
            error={errors.plate}
          />
          <TextField
            label="Color"
            placeholder="e.g. Metallic Grey"
            value={form.color}
            onChangeText={update("color")}
          />
          <TextField
            label="Service Requested"
            placeholder="e.g. Full Detail + Ceramic Coat"
            value={form.service}
            onChangeText={update("service")}
          />

          <PrimaryButton title="Save Vehicle" onPress={handleSave} style={{ marginTop: spacing.sm }} />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  scroll: { padding: spacing.lg, paddingBottom: spacing.xxl },
  sectionLabel: {
    color: colors.textMuted,
    fontSize: 12,
    fontWeight: "600",
    textTransform: "uppercase",
    marginBottom: spacing.sm,
    letterSpacing: 0.5,
  },
  customerPicker: { flexDirection: "row", flexWrap: "wrap", gap: spacing.sm, marginBottom: spacing.xs },
  customerChip: {
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: radii.pill,
    backgroundColor: colors.surfaceAlt,
    borderWidth: 1,
    borderColor: colors.border,
  },
  customerChipActive: { backgroundColor: colors.primary, borderColor: colors.primary },
  customerChipText: { color: colors.textMuted, fontWeight: "600", fontSize: 13 },
  customerChipTextActive: { color: colors.white },
  errorText: { color: colors.danger, fontSize: 12, marginBottom: spacing.md },
});
