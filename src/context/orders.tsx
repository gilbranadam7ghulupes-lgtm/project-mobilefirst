import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuth } from "./auth";

export type Order = {
  id: string;
  productId: number;
  productName: string;
  image: string;
  pricePerDay: number;
  days: number;
  total: number;
  createdAt: string;
  status: "Menunggu" | "Disewa" | "Selesai";
};

type NewOrder = Omit<Order, "id" | "createdAt" | "status">;

type OrdersContextType = {
  orders: Order[];
  addOrder: (data: NewOrder) => Promise<void>;
};

const OrdersContext = createContext<OrdersContextType | undefined>(undefined);

export function OrdersProvider({ children }: { children: ReactNode }) {
  const { email } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);

  // Muat pesanan milik akun yang sedang login
  useEffect(() => {
    async function load() {
      if (!email) {
        setOrders([]);
        return;
      }
      try {
        const raw = await AsyncStorage.getItem(`orders:${email}`);
        setOrders(raw ? JSON.parse(raw) : []);
      } catch (err) {
        console.error("[orders] load error:", err);
        setOrders([]);
      }
    }
    load();
  }, [email]);

  async function addOrder(data: NewOrder) {
    if (!email) return;
    const newOrder: Order = {
      ...data,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      status: "Menunggu",
    };
    const updated = [newOrder, ...orders];
    setOrders(updated);
    try {
      await AsyncStorage.setItem(`orders:${email}`, JSON.stringify(updated));
    } catch (err) {
      console.error("[orders] save error:", err);
    }
  }

  return (
    <OrdersContext.Provider value={{ orders, addOrder }}>
      {children}
    </OrdersContext.Provider>
  );
}

export function useOrders() {
  const ctx = useContext(OrdersContext);
  if (!ctx) throw new Error("useOrders must be used within OrdersProvider");
  return ctx;
}