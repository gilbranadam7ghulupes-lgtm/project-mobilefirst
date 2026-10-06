import { ActivityIndicator, StyleSheet, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function SplashScreen() {
  return (
    <LinearGradient
      colors={["#1e3a8a", "#3b82f6", "#93c5fd"]}
      style={styles.splash}
    >
      <Text style={styles.brand}>RentDevice</Text>
      <ActivityIndicator color="#fff" size="large" style={{ marginTop: 16 }} />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  splash: { flex: 1, alignItems: "center", justifyContent: "center" },
  brand: { color: "#fff", fontSize: 28, fontWeight: "800", letterSpacing: 2 },
});