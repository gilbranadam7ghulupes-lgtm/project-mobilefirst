import { StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

// Data dummy laptop - nanti bisa diganti dari database/API
const laptopData = [
  {
    id: '1',
    name: 'MacBook Air M2',
    spec: '8GB RAM / 256GB SSD',
    pricePerDay: 150000,
    status: 'tersedia',
    image: 'https://via.placeholder.com/150',
  },
  {
    id: '2',
    name: 'ASUS ROG Strix',
    spec: '16GB RAM / 512GB SSD',
    pricePerDay: 200000,
    status: 'disewa',
    image: 'https://via.placeholder.com/150',
  },
  {
    id: '3',
    name: 'Lenovo ThinkPad',
    spec: '8GB RAM / 512GB SSD',
    pricePerDay: 120000,
    status: 'tersedia',
    image: 'https://via.placeholder.com/150',
  },
];

export default function HomeScreen() {
  const renderLaptopItem = ({ item }: { item: typeof laptopData[0] }) => (
    <TouchableOpacity style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <ThemedView style={styles.cardContent}>
        <ThemedText type="smallBold">{item.name}</ThemedText>
        <ThemedText style={styles.specText}>{item.spec}</ThemedText>
        <ThemedView style={styles.bottomRow}>
          <ThemedText style={styles.price}>
            Rp{item.pricePerDay.toLocaleString('id-ID')}/hari
          </ThemedText>
          <ThemedView
            style={[
              styles.badge,
              item.status === 'tersedia' ? styles.badgeAvailable : styles.badgeRented,
            ]}
          >
            <ThemedText style={styles.badgeText}>
              {item.status === 'tersedia' ? 'Tersedia' : 'Disewa'}
            </ThemedText>
          </ThemedView>
        </ThemedView>
      </ThemedView>
    </TouchableOpacity>
  );

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.header}>
        Daftar Laptop
      </ThemedText>
      <FlatList
        data={laptopData}
        keyExtractor={(item) => item.id}
        renderItem={renderLaptopItem}
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
    flexDirection: 'row',
    marginBottom: 12,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: 'rgba(150,150,150,0.1)',
  },
  image: {
    width: 90,
    height: 90,
  },
  cardContent: {
    flex: 1,
    padding: 10,
    justifyContent: 'space-between',
  },
  specText: {
    fontSize: 12,
    opacity: 0.7,
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 6,
  },
  price: {
    fontSize: 13,
    fontWeight: '600',
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  badgeAvailable: {
    backgroundColor: '#22c55e',
  },
  badgeRented: {
    backgroundColor: '#ef4444',
  },
  badgeText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: '600',
  },
});