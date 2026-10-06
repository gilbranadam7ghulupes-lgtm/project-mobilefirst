import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "../../context/auth";
import { CATEGORIES, PRODUCTS } from "../../data/products";

const { width } = Dimensions.get("window");
const CARD_WIDTH = (width - 48) / 2;

export default function HomeScreen() {
  const { email, signOut } = useAuth();
const router = useRouter();
const [selectedCategory, setSelectedCategory] = useState("laptop");
  async function handleLogout() {
    await signOut();
    // _layout.tsx otomatis pindah ke (auth) saat email jadi null
  }

  const username = email ? email.split("@")[0] : "User";

  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {/* === HEADER GRADIENT === */}
        <LinearGradient
          colors={["#1e3a8a", "#3b82f6"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.header}
        >
          <View style={styles.headerTop}>
            <View>
              <Text style={styles.greeting}>Halo, {username} 👋</Text>
              <Text style={styles.subGreeting}>Mau sewa apa hari ini?</Text>
            </View>
            <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
              <Ionicons name="log-out-outline" size={22} color="#fff" />
            </TouchableOpacity>
          </View>

          {/* Search */}
          <View style={styles.searchWrap}>
            <Ionicons name="search-outline" size={20} color="#64748b" />
            <TextInput
              placeholder="Cari laptop, HP, tablet..."
              placeholderTextColor="#94a3b8"
              style={styles.searchInput}
            />
            <Ionicons name="options-outline" size={20} color="#1d4ed8" />
          </View>
        </LinearGradient>

        {/* === BANNER PROMO === */}
        <View style={styles.bannerWrap}>
          <LinearGradient
            colors={["#f59e0b", "#ef4444"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.banner}
          >
            <View style={{ flex: 1 }}>
              <Text style={styles.bannerTag}>PROMO SPESIAL</Text>
              <Text style={styles.bannerTitle}>Diskon 30%</Text>
              <Text style={styles.bannerDesc}>Sewa pertama kamu!</Text>
            </View>
            <Ionicons name="gift-outline" size={56} color="rgba(255,255,255,0.7)" />
          </LinearGradient>
        </View>

        {/* === KATEGORI === */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Kategori</Text>
            <Text style={styles.seeAll}>Lihat semua</Text>
          </View>
          <View style={styles.categories}>
            {CATEGORIES.map((cat) => {
              const active = selectedCategory === cat.id;
              return (
                <TouchableOpacity
                  key={cat.id}
                  style={styles.categoryItem}
                  onPress={() => setSelectedCategory(cat.id)}
                >
                  <View
                    style={[
                      styles.categoryIcon,
                      active && styles.categoryIconActive,
                    ]}
                  >
                    <Ionicons
                      name={cat.icon as any}
                      size={24}
                      color={active ? "#fff" : "#1d4ed8"}
                    />
                  </View>
                  <Text
                    style={[
                      styles.categoryLabel,
                      active && { color: "#1d4ed8", fontWeight: "700" },
                    ]}
                  >
                    {cat.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

                {/* === PRODUK === */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Rekomendasi</Text>
            <Text style={styles.seeAll}>Lihat semua</Text>
          </View>
          <View style={styles.grid}>
            {PRODUCTS.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={styles.card}
                activeOpacity={0.85}
                onPress={() =>
                  router.push({
                    pathname: "/product/[id]",
                    params: { id: String(item.id) },
                  })
                }
              >
                <View style={styles.imageWrap}>
                  <Image source={{ uri: item.image }} style={styles.image} />
                  <View style={styles.tag}>
                    <Text style={styles.tagText}>{item.tag}</Text>
                  </View>
                </View>
                <View style={styles.cardBody}>
                  <Text style={styles.cardTitle} numberOfLines={1}>
                    {item.name}
                  </Text>
                  <View style={styles.ratingRow}>
                    <Ionicons name="star" size={12} color="#f59e0b" />
                    <Text style={styles.rating}>{item.rating}</Text>
                  </View>
                  <Text style={styles.price}>
                    Rp{item.price.toLocaleString("id-ID")}
                    <Text style={styles.perDay}>/hari</Text>
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* === BOTTOM TAB === */}
      <View style={styles.tabBar}>
        <TabItem icon="home" label="Home" active />
        <TabItem icon="receipt-outline" label="Pesanan" />
        <TabItem icon="heart-outline" label="Favorit" />
        <TabItem icon="person-outline" label="Profil" />
      </View>
    </SafeAreaView>
  );
}

function TabItem({
  icon,
  label,
  active,
}: {
  icon: any;
  label: string;
  active?: boolean;
}) {
  return (
    <TouchableOpacity style={styles.tabItem}>
      <Ionicons name={icon} size={22} color={active ? "#1d4ed8" : "#94a3b8"} />
      <Text
        style={[
          styles.tabLabel,
          active && { color: "#1d4ed8", fontWeight: "700" },
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#f8fafc" },

  /* HEADER */
  header: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 60,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  headerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  greeting: { color: "#fff", fontSize: 20, fontWeight: "800" },
  subGreeting: { color: "rgba(255,255,255,0.85)", fontSize: 13, marginTop: 2 },
  logoutBtn: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "rgba(255,255,255,0.2)",
    alignItems: "center",
    justifyContent: "center",
  },
  searchWrap: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 12,
    gap: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 4,
  },
  searchInput: { flex: 1, fontSize: 14, color: "#0f172a", padding: 0 },

  /* BANNER */
  bannerWrap: { paddingHorizontal: 20, marginTop: -30 },
  banner: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 20,
    padding: 20,
    shadowColor: "#ef4444",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 6,
  },
  bannerTag: {
    color: "rgba(255,255,255,0.9)",
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 1,
  },
  bannerTitle: { color: "#fff", fontSize: 22, fontWeight: "800", marginTop: 2 },
  bannerDesc: { color: "rgba(255,255,255,0.9)", fontSize: 13, marginTop: 2 },

  /* SECTION */
  section: { paddingHorizontal: 20, marginTop: 24 },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 14,
  },
  sectionTitle: { fontSize: 17, fontWeight: "800", color: "#0f172a" },
  seeAll: { fontSize: 13, color: "#1d4ed8", fontWeight: "600" },

  /* KATEGORI */
  categories: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
  },
  categoryItem: { alignItems: "center", flex: 1 },
  categoryIcon: {
    width: 56,
    height: 56,
    borderRadius: 18,
    backgroundColor: "#dbeafe",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 6,
  },
  categoryIconActive: { backgroundColor: "#1d4ed8" },
  categoryLabel: { fontSize: 12, color: "#64748b", fontWeight: "500" },

  /* PRODUK */
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 12,
  },
  card: {
    width: CARD_WIDTH,
    backgroundColor: "#fff",
    borderRadius: 16,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  imageWrap: { position: "relative" },
  image: { width: "100%", height: 120, backgroundColor: "#e2e8f0" },
  tag: {
    position: "absolute",
    top: 8,
    left: 8,
    backgroundColor: "#1d4ed8",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  tagText: { color: "#fff", fontSize: 10, fontWeight: "700" },
  cardBody: { padding: 10 },
  cardTitle: { fontSize: 13, fontWeight: "700", color: "#0f172a" },
  ratingRow: { flexDirection: "row", alignItems: "center", gap: 4, marginTop: 4 },
  rating: { fontSize: 11, color: "#64748b", fontWeight: "600" },
  price: { fontSize: 13, fontWeight: "800", color: "#1d4ed8", marginTop: 6 },
  perDay: { fontSize: 10, fontWeight: "500", color: "#94a3b8" },

  /* TAB BAR */
  tabBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    backgroundColor: "#fff",
    paddingVertical: 10,
    paddingBottom: 20,
    borderTopWidth: 1,
    borderTopColor: "#e2e8f0",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 10,
  },
  tabItem: { flex: 1, alignItems: "center", gap: 2 },
  tabLabel: { fontSize: 10, color: "#94a3b8", fontWeight: "600" },
});