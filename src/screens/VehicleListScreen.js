import React, { useState, useMemo } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { colors, spacing, radii, typography } from "../theme/theme";
import { Card, ScreenHeader, StatusPill } from "../components/UI";
import { vehicles, customers } from "../data/store";

const FILTERS = ["All", "In Progress", "Scheduled", "Completed"];

export default function VehicleListScreen({ navigation }) {
  const [filter, setFilter] = useState("All");

  const filtered = useMemo(
    () => (filter === "All" ? vehicles : vehicles.filter((v) => v.status === filter)),
    [filter]
  );

  const customerName = (id) => customers.find((c) => c.id === id)?.name ?? "Unknown";

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <View style={styles.header}>
        <ScreenHeader
          title="Vehicles"
          subtitle={`${vehicles.length} total`}
          right={
            <TouchableOpacity style={styles.addBtn} onPress={() => navigation.navigate("AddVehicle")}>
              <Ionicons name="add" size={22} color={colors.white} />
            </TouchableOpacity>
          }
        />
        <View style={styles.filterRow}>
          {FILTERS.map((f) => (
            <TouchableOpacity
              key={f}
              onPress={() => setFilter(f)}
              style={[styles.filterChip, filter === f && styles.filterChipActive]}
            >
              <Text style={[styles.filterText, filter === f && styles.filterTextActive]}>{f}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <Text style={[typography.bodyMuted, { textAlign: "center", marginTop: spacing.xl }]}>
            No vehicles in this category.
          </Text>
        }
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate("VehicleDetails", { vehicleId: item.id })}
          >
            <Card style={styles.row}>
              <View style={styles.vehicleIcon}>
                <Ionicons name="car-sport" size={22} color={colors.primary} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={typography.h3}>
                  {item.make} {item.model}
                </Text>
                <Text style={typography.bodyMuted}>{customerName(item.customerId)}</Text>
                <Text style={styles.plate}>{item.plate}</Text>
              </View>
              <StatusPill status={item.status} />
            </Card>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  header: { paddingHorizontal: spacing.lg, paddingTop: spacing.lg },
  listContent: { padding: spacing.lg, paddingTop: spacing.md, paddingBottom: spacing.xxl },
  addBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  filterRow: { flexDirection: "row", flexWrap: "wrap", gap: spacing.sm, marginBottom: spacing.md },
  filterChip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: radii.pill,
    backgroundColor: colors.surfaceAlt,
    borderWidth: 1,
    borderColor: colors.border,
  },
  filterChipActive: { backgroundColor: colors.primary, borderColor: colors.primary },
  filterText: { color: colors.textMuted, fontSize: 13, fontWeight: "600" },
  filterTextActive: { color: colors.white },
  row: { flexDirection: "row", alignItems: "center", marginBottom: spacing.sm, gap: spacing.md },
  vehicleIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: "rgba(255,107,53,0.12)",
    alignItems: "center",
    justifyContent: "center",
  },
  plate: { color: colors.textFaint, fontSize: 12, marginTop: 2, letterSpacing: 0.5 },
});
