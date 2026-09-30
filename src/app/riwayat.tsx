import { StyleSheet, FlatList } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

// Data dummy riwayat - nanti diganti dari database/API
const riwayatData = [
  {
    id: '1',
    laptopName: 'MacBook Air M2',
    peminjam: 'Andi Saputra',
    tanggalMulai: '10 Sep 2026',
    tanggalSelesai: '12 Sep 2026',
    status: 'selesai',
  },
  {
    id: '2',
    laptopName: 'ASUS ROG Strix',
    peminjam: 'Budi Santoso',
    tanggalMulai: '18 Sep 2026',
    tanggalSelesai: '25 Sep 2026',
    status: 'berlangsung',
  },
  {
    id: '3',
    laptopName: 'Lenovo ThinkPad',
    peminjam: 'Citra Dewi',
    tanggalMulai: '5 Sep 2026',
    tanggalSelesai: '7 Sep 2026',
    status: 'selesai',
  },
  {
    id: '4',
    laptopName: 'MacBook Air M2',
    peminjam: 'Dedi Kurniawan',
    tanggalMulai: '20 Sep 2026',
    tanggalSelesai: '22 Sep 2026',
    status: 'terlambat',
  },
];

const statusConfig = {
  selesai: { label: 'Selesai', color: '#22c55e' },
  berlangsung: { label: 'Berlangsung', color: '#3b82f6' },
  terlambat: { label: 'Terlambat', color: '#ef4444' },
};

export default function ExploreScreen() {
  const renderRiwayatItem = ({ item }: { item: typeof riwayatData[0] }) => {
    const status = statusConfig[item.status as keyof typeof statusConfig];

    return (
      <ThemedView style={styles.card}>
        <ThemedView style={styles.cardHeader}>
          <ThemedText type="smallBold">{item.laptopName}</ThemedText>
          <ThemedView style={[styles.badge, { backgroundColor: status.color }]}>
            <ThemedText style={styles.badgeText}>{status.label}</ThemedText>
          </ThemedView>
        </ThemedView>

        <ThemedText style={styles.peminjamText}>
          Dipinjam oleh: {item.peminjam}
        </ThemedText>

        <ThemedView style={styles.dateRow}>
          <ThemedText style={styles.dateText}>
            {item.tanggalMulai} → {item.tanggalSelesai}
          </ThemedText>
        </ThemedView>
      </ThemedView>
    );
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.header}>
        Riwayat Peminjaman
      </ThemedText>
      <FlatList
        data={riwayatData}
        keyExtractor={(item) => item.id}
        renderItem={renderRiwayatItem}
        contentContainerStyle={styles.listContent}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 16,
  },
  header: {
    marginBottom: 16,
  },
  listContent: {
    paddingBottom: 20,
  },
  card: {
    padding: 14,
    marginBottom: 12,
    borderRadius: 12,
    backgroundColor: 'rgba(150,150,150,0.1)',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  badgeText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: '600',
  },
  peminjamText: {
    fontSize: 13,
    opacity: 0.8,
    marginBottom: 4,
  },
  dateRow: {
    marginTop: 2,
  },
  dateText: {
    fontSize: 12,
    opacity: 0.6,
  },
});