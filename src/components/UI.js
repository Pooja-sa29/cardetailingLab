import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { colors, spacing, radii, typography } from "../theme/theme";

export function TextField({
  label,
  icon,
  error,
  containerStyle,
  ...inputProps
}) {
  const [focused, setFocused] = useState(false);
  return (
    <View style={[{ marginBottom: spacing.md }, containerStyle]}>
      {label ? <Text style={styles.label}>{label}</Text> : null}
      <View
        style={[
          styles.inputWrap,
          focused && styles.inputWrapFocused,
          error && styles.inputWrapError,
        ]}
      >
        <TextInput
          placeholderTextColor={colors.textFaint}
          style={styles.input}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          {...inputProps}
        />
      </View>
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
}

export function PrimaryButton({ title, onPress, loading, disabled, style, variant = "primary" }) {
  const isOutline = variant === "outline";
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={onPress}
      disabled={disabled || loading}
      style={[
        styles.btn,
        isOutline ? styles.btnOutline : styles.btnFilled,
        (disabled || loading) && { opacity: 0.6 },
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={isOutline ? colors.primary : colors.white} />
      ) : (
        <Text style={[typography.button, isOutline && { color: colors.primary }]}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
}

export function Card({ children, style }) {
  return <View style={[styles.card, style]}>{children}</View>;
}

export function ScreenHeader({ title, subtitle, right }) {
  return (
    <View style={styles.headerRow}>
      <View>
        <Text style={typography.h1}>{title}</Text>
        {subtitle ? <Text style={typography.bodyMuted}>{subtitle}</Text> : null}
      </View>
      {right}
    </View>
  );
}

export function StatusPill({ status }) {
  const map = {
    "In Progress": { bg: "rgba(255,194,75,0.15)", color: colors.warning },
    Completed: { bg: "rgba(61,220,132,0.15)", color: colors.success },
    Scheduled: { bg: "rgba(0,180,216,0.15)", color: colors.secondary },
    Cancelled: { bg: "rgba(255,92,92,0.15)", color: colors.danger },
  };
  const s = map[status] || map["Scheduled"];
  return (
    <View style={[styles.pill, { backgroundColor: s.bg }]}>
      <Text style={[styles.pillText, { color: s.color }]}>{status}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  label: { ...typography.label, marginBottom: spacing.xs, textTransform: "uppercase" },
  inputWrap: {
    backgroundColor: colors.surfaceAlt,
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: spacing.md,
  },
  inputWrapFocused: { borderColor: colors.primary },
  inputWrapError: { borderColor: colors.danger },
  input: {
    color: colors.text,
    fontSize: 15,
    paddingVertical: 12,
  },
  errorText: { color: colors.danger, fontSize: 12, marginTop: 4 },
  btn: {
    height: 52,
    borderRadius: radii.md,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  btnFilled: { backgroundColor: colors.primary },
  btnOutline: { backgroundColor: "transparent", borderWidth: 1.5, borderColor: colors.primary },
  card: {
    backgroundColor: colors.surface,
    borderRadius: radii.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: spacing.lg,
  },
  pill: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: radii.pill,
    alignSelf: "flex-start",
  },
  pillText: { fontSize: 12, fontWeight: "700" },
});
