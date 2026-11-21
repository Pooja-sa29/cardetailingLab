import React from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { colors, spacing, radii, typography } from "../theme/theme";
import { Card, StatusPill } from "../components/UI";
import { getCustomerById, getVehiclesForCustomer } from "../data/store";

function InfoRow({ icon, label, value, onPress }) {
  const Wrapper = onPress ? TouchableOpacity : View;
  return (
    <Wrapper onPress={onPress} style={styles.infoRow}>
      <Ionicons name={icon} size={18} color={colors.textMuted} style={{ width: 26 }} />
      <View style={{ flex: 1 }}>
        <Text style={typography.label}>{label}</Text>
        <Text style={typography.body}>{value}</Text>
      </View>
    </Wrapper>
  );
}

export default function CustomerDetailsScreen({ route, navigation }) {
  const { customerId } = route.params;
  const customer = getCustomerById(customerId);
  const vehicles = getVehiclesForCustomer(customerId);

  if (!customer) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={typography.body}>Customer not found.</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.profileBlock}>
          <View style={styles.avatarLg}>
            <Text style={styles.avatarLgText}>{customer.name.charAt(0)}</Text>
          </View>
          <Text style={typography.h1}>{customer.name}</Text>
          <Text style={typography.bodyMuted}>Customer since detailing lab records began</Text>
        </View>

        <View style={styles.quickActions}>
          <TouchableOpacity
            style={styles.quickBtn}
            onPress={() => Linking.openURL(`tel:${customer.phone}`)}
          >
            <Ionicons name="call" size={18} color={colors.primary} />
            <Text style={styles.quickBtnText}>Call</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.quickBtn}
            onPress={() => Linking.openURL(`mailto:${customer.email}`)}
          >
            <Ionicons name="mail" size={18} color={colors.primary} />
            <Text style={styles.quickBtnText}>Email</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.quickBtn}
            onPress={() =>
              navigation.navigate("AddVehicle", { presetCustomerId: customer.id })
            }
          >
            <Ionicons name="add" size={18} color={colors.primary} />
            <Text style={styles.quickBtnText}>Add Vehicle</Text>
          </TouchableOpacity>
        </View>

        <Card style={{ marginBottom: spacing.lg }}>
          <InfoRow icon="call-outline" label="Phone" value={customer.phone} />
          <InfoRow icon="mail-outline" label="Email" value={customer.email} />
          <InfoRow icon="location-outline" label="Address" value={customer.address} />
        </Card>

        <Text style={[typography.h3, { marginBottom: spacing.sm }]}>
          Vehicles ({vehicles.length})
        </Text>
        {vehicles.length === 0 && (
          <Text style={typography.bodyMuted}>No vehicles on file yet.</Text>
        )}
        {vehicles.map((v) => (
          <TouchableOpacity
            key={v.id}
            onPress={() => navigation.navigate("VehicleDetails", { vehicleId: v.id })}
          >
            <Card style={styles.vehicleRow}>
              <View style={{ flex: 1 }}>
                <Text style={typography.h3}>
                  {v.make} {v.model} ({v.year})
                </Text>
                <Text style={typography.bodyMuted}>{v.plate}</Text>
              </View>
              <StatusPill status={v.status} />
            </Card>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  scroll: { padding: spacing.lg, paddingBottom: spacing.xxl },
  profileBlock: { alignItems: "center", marginBottom: spacing.lg },
  avatarLg: {
    width: 84,
    height: 84,
    borderRadius: 42,
    backgroundColor: colors.surfaceAlt,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: spacing.sm,
  },
  avatarLgText: { color: colors.primary, fontWeight: "800", fontSize: 32 },
  quickActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: spacing.lg,
    gap: spacing.sm,
  },
  quickBtn: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    backgroundColor: colors.surface,
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: colors.border,
    gap: 4,
  },
  quickBtnText: { color: colors.primary, fontWeight: "700", fontSize: 12 },
  infoRow: { flexDirection: "row", alignItems: "center", paddingVertical: spacing.sm },
  vehicleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: spacing.sm,
  },
});
