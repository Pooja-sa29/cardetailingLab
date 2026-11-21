import React, { useMemo } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { colors, spacing, radii, typography } from "../theme/theme";
import { Card, ScreenHeader, StatusPill } from "../components/UI";
import { vehicles, customers, dashboardStats } from "../data/store";

function StatCard({ icon, label, value, color }) {
  return (
    <Card style={styles.statCard}>
      <View style={[styles.statIcon, { backgroundColor: color + "22" }]}>
        <Ionicons name={icon} size={20} color={color} />
      </View>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={typography.bodyMuted}>{label}</Text>
    </Card>
  );
}

export default function DashboardScreen({ navigation }) {
  const stats = useMemo(() => dashboardStats(), []);
  const recentJobs = vehicles.slice(0, 4);

  const findCustomerName = (customerId) =>
    customers.find((c) => c.id === customerId)?.name ?? "Unknown Customer";

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <ScreenHeader
          title="Dashboard"
          subtitle="The Detailing Lab • Today's overview"
        />

        <View style={styles.statsGrid}>
          <StatCard icon="people" label="Customers" value={stats.totalCustomers} color={colors.secondary} />
          <StatCard icon="car-sport" label="Vehicles" value={stats.totalVehicles} color={colors.primary} />
          <StatCard icon="construct" label="In Progress" value={stats.inProgress} color={colors.warning} />
          <StatCard icon="checkmark-circle" label="Completed" value={stats.completedToday} color={colors.success} />
        </View>

        <View style={styles.quickActionsRow}>
          <TouchableOpacity
            style={[styles.actionBtn, { backgroundColor: colors.primary }]}
            onPress={() => navigation.navigate("Vehicles", { screen: "AddVehicle" })}
          >
            <Ionicons name="add-circle" size={18} color={colors.white} />
            <Text style={styles.actionBtnText}>New Vehicle</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.actionBtn, styles.actionBtnAlt]}
            onPress={() => navigation.navigate("Customers", { screen: "AddCustomer" })}
          >
            <Ionicons name="person-add" size={18} color={colors.primary} />
            <Text style={[styles.actionBtnText, { color: colors.primary }]}>New Customer</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.sectionHeaderRow}>
          <Text style={typography.h3}>Recent Jobs</Text>
          <TouchableOpacity onPress={() => navigation.navigate("Vehicles")}>
            <Text style={styles.link}>See all</Text>
          </TouchableOpacity>
        </View>

        {recentJobs.map((job) => (
          <TouchableOpacity
            key={job.id}
            onPress={() =>
              navigation.navigate("Vehicles", { screen: "VehicleDetails", params: { vehicleId: job.id } })
            }
          >
            <Card style={styles.jobCard}>
              <View style={{ flex: 1 }}>
                <Text style={typography.h3}>
                  {job.make} {job.model}
                </Text>
                <Text style={typography.bodyMuted}>{findCustomerName(job.customerId)}</Text>
                <Text style={styles.plate}>{job.plate}</Text>
              </View>
              <StatusPill status={job.status} />
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
  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: spacing.lg,
  },
  statCard: {
    width: "48%",
    marginBottom: spacing.md,
  },
  statIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: spacing.sm,
  },
  statValue: { fontSize: 24, fontWeight: "800", color: colors.text, marginBottom: 2 },
  quickActionsRow: { flexDirection: "row", marginBottom: spacing.lg, gap: spacing.sm },
  actionBtn: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 48,
    borderRadius: radii.md,
    gap: 6,
  },
  actionBtnAlt: {
    backgroundColor: "transparent",
    borderWidth: 1.5,
    borderColor: colors.primary,
  },
  actionBtnText: { color: colors.white, fontWeight: "700" },
  sectionHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing.sm,
  },
  link: { color: colors.primary, fontWeight: "700" },
  jobCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: spacing.sm,
  },
  plate: { color: colors.textFaint, fontSize: 12, marginTop: 4, letterSpacing: 0.5 },
});
