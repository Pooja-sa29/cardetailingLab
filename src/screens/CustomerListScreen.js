import React, { useState, useMemo } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { colors, spacing, radii, typography } from "../theme/theme";
import { Card, ScreenHeader, TextField } from "../components/UI";
import { customers } from "../data/store";

export default function CustomerListScreen({ navigation }) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    if (!query.trim()) return customers;
    const q = query.toLowerCase();
    return customers.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.phone.includes(q) ||
        c.email.toLowerCase().includes(q)
    );
  }, [query]);

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <View style={styles.header}>
        <ScreenHeader
          title="Customers"
          subtitle={`${customers.length} total`}
          right={
            <TouchableOpacity
              style={styles.addBtn}
              onPress={() => navigation.navigate("AddCustomer")}
            >
              <Ionicons name="add" size={22} color={colors.white} />
            </TouchableOpacity>
          }
        />
        <TextField
          placeholder="Search by name, phone, or email"
          value={query}
          onChangeText={setQuery}
          containerStyle={{ marginBottom: 0 }}
        />
      </View>

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <Text style={[typography.bodyMuted, { textAlign: "center", marginTop: spacing.xl }]}>
            No customers found.
          </Text>
        }
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate("CustomerDetails", { customerId: item.id })}
          >
            <Card style={styles.row}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>{item.name.charAt(0)}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={typography.h3}>{item.name}</Text>
                <Text style={typography.bodyMuted}>{item.phone}</Text>
              </View>
              <View style={styles.vehicleBadge}>
                <Ionicons name="car-sport-outline" size={14} color={colors.textMuted} />
                <Text style={styles.vehicleBadgeText}>{item.vehicleIds.length}</Text>
              </View>
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
  row: { flexDirection: "row", alignItems: "center", marginBottom: spacing.sm, gap: spacing.md },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.surfaceAlt,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: colors.border,
  },
  avatarText: { color: colors.primary, fontWeight: "800", fontSize: 18 },
  vehicleBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: colors.surfaceAlt,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: radii.pill,
  },
  vehicleBadgeText: { color: colors.textMuted, fontSize: 12, fontWeight: "700" },
});
