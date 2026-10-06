import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
    ActivityIndicator,
    Dimensions,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "../../context/auth";

const { width } = Dimensions.get("window");

export default function SignUpScreen() {
  const router = useRouter();
  const { signUp } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSignUp() {
    setError("");

    if (email.trim() === "" || password === "" || confirmPassword === "") {
      setError("Semua kolom wajib diisi");
      return;
    }
    if (!email.includes("@") || !email.includes(".")) {
      setError("Format email tidak valid");
      return;
    }
    if (password.length < 6) {
      setError("Password minimal 6 karakter");
      return;
    }
    if (password !== confirmPassword) {
      setError("Konfirmasi password tidak cocok");
      return;
    }

    setLoading(true);
    const result = await signUp(email.trim(), password);
    setLoading(false);

    if (!result.ok) {
  setError(result.error || "Gagal mendaftar");
  return;
}

router.replace("/(auth)/login");

    // ✅ NGGAK perlu router.replace — _layout.tsx auto pindah ke (app)
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
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            <TouchableOpacity
              style={styles.backBtn}
              onPress={() => router.back()}
            >
              <Ionicons name="arrow-back" size={22} color="#fff" />
            </TouchableOpacity>

            <Text style={styles.welcome}>Create{"\n"}Account</Text>
            <Text style={styles.subtitle}>
              Daftar sekarang dan mulai sewa laptop & HP
            </Text>

            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="contoh@email.com"
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
                placeholder="Minimal 6 karakter"
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

            <Text style={styles.label}>Konfirmasi Password</Text>
            <View style={styles.passwordWrap}>
              <TextInput
                style={styles.inputPassword}
                placeholder="Ulangi password"
                placeholderTextColor="#94a3b8"
                secureTextEntry={!showConfirm}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
              />
              <TouchableOpacity onPress={() => setShowConfirm(!showConfirm)}>
                <Ionicons
                  name={showConfirm ? "eye-off-outline" : "eye-outline"}
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
              onPress={handleSignUp}
              disabled={loading}
              activeOpacity={0.85}
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.buttonText}>DAFTAR</Text>
              )}
            </TouchableOpacity>

            <View style={styles.footerRow}>
              <Text style={styles.footerText}>Sudah punya akun? </Text>
              <TouchableOpacity onPress={() => router.replace("/(auth)/login")}>
                <Text style={styles.footerLink}>Masuk</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#0a1a2b" },
  flex: { flex: 1 },
  scrollContent: {
    paddingHorizontal: 32,
    paddingVertical: 24,
    flexGrow: 1,
    justifyContent: "center",
  },
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
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.15)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
  },
  welcome: {
    color: "#ffffff",
    fontSize: 38,
    fontWeight: "800",
    lineHeight: 44,
    marginBottom: 8,
  },
  subtitle: { color: "#cbd5e1", fontSize: 14, marginBottom: 24 },
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
    marginTop: 16,
  },
  errorText: { color: "#fca5a5", fontSize: 13, fontWeight: "500" },
  button: {
    backgroundColor: "#2563eb",
    borderRadius: 25,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 28,
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