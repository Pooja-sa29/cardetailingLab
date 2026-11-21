import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { colors, spacing, radii, typography } from "../theme/theme";
import { Card, StatusPill } from "../components/UI";
import { getVehicleById, getCustomerById, vehicles } from "../data/store";

const STATUS_OPTIONS = ["Scheduled", "In Progress", "Completed", "Cancelled"];

function DetailRow({ icon, label, value }) {
  return (
    <View style={styles.detailRow}>
      <Ionicons name={icon} size={18} color={colors.textMuted} style={{ width: 26 }} />
      <View style={{ flex: 1 }}>
        <Text style={typography.label}>{label}</Text>
        <Text style={typography.body}>{value}</Text>
      </View>
    </View>
  );
}

export default function VehicleDetailsScreen({ route, navigation }) {
  const { vehicleId } = route.params;
  const vehicle = getVehicleById(vehicleId);
  const [status, setStatus] = useState(vehicle?.status);

  if (!vehicle) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={typography.body}>Vehicle not found.</Text>
      </SafeAreaView>
    );
  }

  const owner = getCustomerById(vehicle.customerId);

  const updateStatus = (newStatus) => {
    setStatus(newStatus);
    const idx = vehicles.findIndex((v) => v.id === vehicle.id);
    if (idx >= 0) vehicles[idx] = { ...vehicles[idx], status: newStatus };
  };

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.heroBlock}>
          <View style={styles.heroIcon}>
            <Ionicons name="car-sport" size={34} color={colors.primary} />
          </View>
          <Text style={typography.h1}>
            {vehicle.make} {vehicle.model}
          </Text>
          <Text style={typography.bodyMuted}>{vehicle.year} • {vehicle.color}</Text>
          <View style={{ marginTop: spacing.sm }}>
            <StatusPill status={status} />
          </View>
        </View>

        <Card style={{ marginBottom: spacing.lg }}>
          <DetailRow icon="pricetag-outline" label="License Plate" value={vehicle.plate} />
          <DetailRow icon="construct-outline" label="Service" value={vehicle.service} />
          {owner && (
            <TouchableOpacity onPress={() => navigation.navigate("CustomerDetails", { customerId: owner.id })}>
              <DetailRow icon="person-outline" label="Owner" value={owner.name} />
            </TouchableOpacity>
          )}
        </Card>

        <Text style={[typography.h3, { marginBottom: spacing.sm }]}>Update Status</Text>
        <View style={styles.statusGrid}>
          {STATUS_OPTIONS.map((s) => (
            <TouchableOpacity
              key={s}
              onPress={() => updateStatus(s)}
              style={[styles.statusOption, status === s && styles.statusOptionActive]}
            >
              <Text style={[styles.statusOptionText, status === s && styles.statusOptionTextActive]}>
                {s}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  scroll: { padding: spacing.lg, paddingBottom: spacing.xxl },
  heroBlock: { alignItems: "center", marginBottom: spacing.lg },
  heroIcon: {
    width: 76,
    height: 76,
    borderRadius: 20,
    backgroundColor: "rgba(255,107,53,0.12)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: spacing.sm,
  },
  detailRow: { flexDirection: "row", alignItems: "center", paddingVertical: spacing.sm },
  statusGrid: { flexDirection: "row", flexWrap: "wrap", gap: spacing.sm },
  statusOption: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: radii.pill,
    backgroundColor: colors.surfaceAlt,
    borderWidth: 1,
    borderColor: colors.border,
  },
  statusOptionActive: { backgroundColor: colors.primary, borderColor: colors.primary },
  statusOptionText: { color: colors.textMuted, fontWeight: "600", fontSize: 13 },
  statusOptionTextActive: { color: colors.white },
});
