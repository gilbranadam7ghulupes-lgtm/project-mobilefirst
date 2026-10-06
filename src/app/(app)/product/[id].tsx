import { useState } from "react";
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { PRODUCTS } from "../../../data/products";
import { useOrders } from "../../../context/orders";

export default function ProductDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { addOrder } = useOrders();
  const [days, setDays] = useState(1);

  const product = PRODUCTS.find((p) => p.id === Number(id));

  if (!product) {
    return (
      <SafeAreaView style={styles.center}>
        <Text style={styles.notFound}>Produk tidak ditemukan</Text>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.link}>Kembali</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  const total = product.price * days;

  async function handleRent() {
    if (!product) return;
    await addOrder({
      productId: product.id,
      productName: product.name,
      image: product.image,
      pricePerDay: product.price,
      days,
      total,
    });
    Alert.alert("Berhasil", `${product.name} disewa selama ${days} hari`, [
      { text: "OK", onPress: () => router.back() },
    ]);
  }

  return (
    <View style={styles.root}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        <View>
          <Image source={{ uri: product.image }} style={styles.image} />
          <SafeAreaView style={styles.backWrap} edges={["top"]}>
            <TouchableOpacity
              style={styles.backBtn}
              onPress={() => router.back()}
            >
              <Ionicons name="arrow-back" size={22} color="#0f172a" />
            </TouchableOpacity>
          </SafeAreaView>
        </View>

        <View style={styles.body}>
          <View style={styles.tag}>
            <Text style={styles.tagText}>{product.tag}</Text>
          </View>

          <Text style={styles.name}>{product.name}</Text>

          <View style={styles.ratingRow}>
            <Ionicons name="star" size={16} color="#f59e0b" />
            <Text style={styles.rating}>{product.rating}</Text>
          </View>

          <Text style={styles.sectionTitle}>Deskripsi</Text>
          <Text style={styles.desc}>{product.description}</Text>

          <Text style={styles.sectionTitle}>Spesifikasi</Text>
          <View style={styles.specBox}>
            {product.specs.map((s, i) => (
              <View
                key={s.label}
                style={[styles.specRow, i > 0 && styles.specBorder]}
              >
                <Text style={styles.specLabel}>{s.label}</Text>
                <Text style={styles.specValue}>{s.value}</Text>
              </View>
            ))}
          </View>

          <Text style={styles.sectionTitle}>Durasi sewa</Text>
          <View style={styles.durationRow}>
            {[1, 3, 7, 14].map((d) => (
              <TouchableOpacity
                key={d}
                style={[
                  styles.durationChip,
                  days === d && styles.durationChipActive,
                ]}
                onPress={() => setDays(d)}
              >
                <Text
                  style={[
                    styles.durationText,
                    days === d && styles.durationTextActive,
                  ]}
                >
                  {d} hari
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>

      <SafeAreaView style={styles.bottomBar} edges={["bottom"]}>
        <View>
          <Text style={styles.priceLabel}>Total ({days} hari)</Text>
          <Text style={styles.price}>Rp{total.toLocaleString("id-ID")}</Text>
        </View>
        <TouchableOpacity
          style={styles.rentBtn}
          activeOpacity={0.85}
          onPress={handleRent}
        >
          <Text style={styles.rentText}>Sewa Sekarang</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#f8fafc" },
  center: { flex: 1, alignItems: "center", justifyContent: "center", gap: 12 },
  notFound: { fontSize: 16, color: "#0f172a", fontWeight: "600" },
  link: { color: "#1d4ed8", fontWeight: "700" },

  image: { width: "100%", height: 300, backgroundColor: "#e2e8f0" },
  backWrap: { position: "absolute", top: 0, left: 16 },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 8,
  },

  body: {
    padding: 20,
    marginTop: -24,
    backgroundColor: "#f8fafc",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  tag: {
    alignSelf: "flex-start",
    backgroundColor: "#1d4ed8",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  tagText: { color: "#fff", fontSize: 11, fontWeight: "700" },
  name: { fontSize: 24, fontWeight: "800", color: "#0f172a", marginTop: 10 },
  ratingRow: { flexDirection: "row", alignItems: "center", gap: 6, marginTop: 6 },
  rating: { fontSize: 14, color: "#64748b", fontWeight: "600" },

  sectionTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: "#0f172a",
    marginTop: 22,
    marginBottom: 8,
  },
  desc: { fontSize: 14, color: "#475569", lineHeight: 21 },

  specBox: { backgroundColor: "#fff", borderRadius: 14, paddingHorizontal: 14 },
  specRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
  },
  specBorder: { borderTopWidth: 1, borderTopColor: "#e2e8f0" },
  specLabel: { fontSize: 13, color: "#64748b" },
  specValue: { fontSize: 13, color: "#0f172a", fontWeight: "700" },

  durationRow: { flexDirection: "row", gap: 10 },
  durationChip: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: "#dbeafe",
  },
  durationChipActive: { backgroundColor: "#1d4ed8" },
  durationText: { fontSize: 13, color: "#1d4ed8", fontWeight: "600" },
  durationTextActive: { color: "#fff" },

  bottomBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#e2e8f0",
  },
  priceLabel: { fontSize: 11, color: "#94a3b8" },
  price: { fontSize: 18, fontWeight: "800", color: "#1d4ed8" },
  rentBtn: {
    backgroundColor: "#2563eb",
    paddingHorizontal: 28,
    paddingVertical: 14,
    borderRadius: 25,
  },
  rentText: { color: "#fff", fontSize: 14, fontWeight: "800" },
});