// The Detailing Lab — theme
// Dark garage aesthetic with a hot-orange accent (soap-suds / auto-shop vibe)

export const colors = {
  background: "#0D1117",
  surface: "#161B22",
  surfaceAlt: "#1E2530",
  border: "#2A313D",
  primary: "#FF6B35",      // detailing-orange accent
  primaryDark: "#E0551F",
  secondary: "#00B4D8",    // soap-blue accent
  text: "#F5F6F8",
  textMuted: "#9AA4B2",
  textFaint: "#5C6673",
  success: "#3DDC84",
  warning: "#FFC24B",
  danger: "#FF5C5C",
  white: "#FFFFFF",
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const radii = {
  sm: 8,
  md: 14,
  lg: 20,
  pill: 999,
};

export const typography = {
  h1: { fontSize: 28, fontWeight: "800", color: colors.text },
  h2: { fontSize: 22, fontWeight: "700", color: colors.text },
  h3: { fontSize: 17, fontWeight: "700", color: colors.text },
  body: { fontSize: 15, fontWeight: "400", color: colors.text },
  bodyMuted: { fontSize: 14, fontWeight: "400", color: colors.textMuted },
  label: { fontSize: 12, fontWeight: "600", color: colors.textMuted, letterSpacing: 0.5 },
  button: { fontSize: 16, fontWeight: "700", color: colors.white },
};
