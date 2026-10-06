export type Product = {
  id: number;
  name: string;
  category: "laptop" | "hp" | "tablet" | "aksesoris";
  price: number;
  rating: number;
  image: string;
  tag: string;
  description: string;
  specs: { label: string; value: string }[];
};

export const CATEGORIES = [
  { id: "laptop", label: "Laptop", icon: "laptop-outline" },
  { id: "hp", label: "HP", icon: "phone-portrait-outline" },
  { id: "tablet", label: "Tablet", icon: "tablet-portrait-outline" },
  { id: "aksesoris", label: "Aksesoris", icon: "headset-outline" },
];

export const PRODUCTS: Product[] = [
  {
    id: 1,
    name: "MacBook Air M2",
    category: "laptop",
    price: 150000,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800",
    tag: "Populer",
    description:
      "Laptop tipis dan ringan dengan baterai awet, cocok untuk kuliah, kerja, dan editing ringan.",
    specs: [
      { label: "Prosesor", value: "Apple M2" },
      { label: "RAM", value: "8 GB" },
      { label: "Penyimpanan", value: "256 GB SSD" },
      { label: "Layar", value: '13.6"' },
    ],
  },
  {
    id: 2,
    name: "iPhone 15 Pro",
    category: "hp",
    price: 120000,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=800",
    tag: "Baru",
    description:
      "Smartphone flagship dengan kamera yang bagus, pas untuk acara atau kebutuhan konten.",
    specs: [
      { label: "Chip", value: "A17 Pro" },
      { label: "RAM", value: "8 GB" },
      { label: "Penyimpanan", value: "256 GB" },
      { label: "Layar", value: '6.1"' },
    ],
  },
  {
    id: 3,
    name: "Asus ROG Zephyrus",
    category: "laptop",
    price: 200000,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=800",
    tag: "Gaming",
    description:
      "Laptop gaming bertenaga tinggi untuk main game berat dan rendering.",
    specs: [
      { label: "Prosesor", value: "Ryzen 9" },
      { label: "RAM", value: "16 GB" },
      { label: "Penyimpanan", value: "1 TB SSD" },
      { label: "GPU", value: "RTX 4060" },
    ],
  },
  {
    id: 4,
    name: "Samsung S24 Ultra",
    category: "hp",
    price: 130000,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=800",
    tag: "Hot",
    description:
      "HP Android premium dengan layar besar dan kamera zoom jarak jauh.",
    specs: [
      { label: "Chip", value: "Snapdragon 8 Gen 3" },
      { label: "RAM", value: "12 GB" },
      { label: "Penyimpanan", value: "256 GB" },
      { label: "Layar", value: '6.8"' },
    ],
  },
];