import { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "../../context/auth";

const { width } = Dimensions.get("window");

export default function LoginScreen() {
  const router = useRouter();
  const { signIn } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleLogin() {
    setError("");

    if (email.trim() === "" || password === "") {
      setError("Email dan password wajib diisi");
      return;
    }

    setLoading(true);
    const result = await signIn(email.trim(), password);
    setLoading(false);

    if (!result.ok) {
      setError(result.error || "Login gagal");
      return;
    }

    // ✅ NGGAK perlu router.replace — _layout.tsx yang urus
  }

  return (
    <View style={styles.root}>
      <LinearGradient
        colors={["#1e3a5f", "#0f2740", "#0a1a2b"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={StyleSheet.absoluteFill}
      />
      <View style={styles.blobTop} />
      <View style={styles.blobTopInner} />

      <SafeAreaView style={styles.flex}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.flex}
        >
          <View style={styles.container}>
            <Text style={styles.welcome}>Welcome{"\n"}Back</Text>

            <View style={styles.form}>
              <Text style={styles.label}>Email</Text>
              <TextInput
                style={styles.input}
                placeholder="Masukkan email"
                placeholderTextColor="#94a3b8"
                autoCapitalize="none"
                keyboardType="email-address"
                value={email}
                onChangeText={setEmail}
              />

              <Text style={styles.label}>Password</Text>
              <View style={styles.passwordWrap}>
                <TextInput
                  style={styles.inputPassword}
                  placeholder="Masukkan password"
                  placeholderTextColor="#94a3b8"
                  secureTextEntry={!showPassword}
                  value={password}
                  onChangeText={setPassword}
                />
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                  <Ionicons
                    name={showPassword ? "eye-off-outline" : "eye-outline"}
                    size={20}
                    color="#64748b"
                  />
                </TouchableOpacity>
              </View>

              {error !== "" && (
                <View style={styles.errorBox}>
                  <Ionicons name="alert-circle-outline" size={14} color="#fca5a5" />
                  <Text style={styles.errorText}>{error}</Text>
                </View>
              )}

              <TouchableOpacity
                style={styles.button}
                onPress={handleLogin}
                disabled={loading}
                activeOpacity={0.85}
              >
                {loading ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={styles.buttonText}>LOGIN</Text>
                )}
              </TouchableOpacity>

              <View style={styles.footerRow}>
                <Text style={styles.footerText}>Belum punya akun? </Text>
                <TouchableOpacity onPress={() => router.push("/(auth)/signup")}>
                  <Text style={styles.footerLink}>Daftar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#0a1a2b" },
  flex: { flex: 1 },
  blobTop: {
    position: "absolute",
    top: -width * 0.55,
    right: -width * 0.35,
    width: width * 1.2,
    height: width * 1.2,
    borderRadius: width * 0.6,
    backgroundColor: "#2563eb",
  },
  blobTopInner: {
    position: "absolute",
    top: -width * 0.35,
    right: -width * 0.15,
    width: width * 0.9,
    height: width * 0.9,
    borderRadius: width * 0.45,
    backgroundColor: "#1d4ed8",
    opacity: 0.7,
  },
  container: { flex: 1, paddingHorizontal: 32, justifyContent: "center" },
  welcome: {
    color: "#ffffff",
    fontSize: 42,
    fontWeight: "800",
    lineHeight: 48,
    marginBottom: 60,
  },
  form: { width: "100%" },
  label: {
    color: "#e2e8f0",
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 8,
    marginTop: 12,
  },
  input: {
    backgroundColor: "#e2e8f0",
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 14,
    fontSize: 15,
    color: "#0f172a",
  },
  passwordWrap: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#e2e8f0",
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 4,
  },
  inputPassword: {
    flex: 1,
    paddingVertical: 10,
    fontSize: 15,
    color: "#0f172a",
  },
  errorBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 12,
  },
  errorText: { color: "#fca5a5", fontSize: 13, fontWeight: "500" },
  button: {
    backgroundColor: "#2563eb",
    borderRadius: 25,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 32,
    alignSelf: "center",
    paddingHorizontal: 60,
    shadowColor: "#2563eb",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.5,
    shadowRadius: 12,
    elevation: 6,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 15,
    fontWeight: "800",
    letterSpacing: 2,
  },
  footerRow: { flexDirection: "row", justifyContent: "center", marginTop: 24 },
  footerText: { color: "#94a3b8", fontSize: 14 },
  footerLink: { color: "#60a5fa", fontSize: 14, fontWeight: "700" },
});