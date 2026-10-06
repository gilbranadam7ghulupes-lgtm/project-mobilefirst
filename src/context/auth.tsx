import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

const USERS_KEY = "registeredUsers";
const SESSION_KEY = "userEmail";

type AuthResult = { ok: boolean; error?: string };

type AuthContextType = {
  email: string | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<AuthResult>;
  signUp: (email: string, password: string) => Promise<AuthResult>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [email, setEmail] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
  let mounted = true;
  async function loadSession() {
    try {
      // Selalu mulai dari login: hapus sesi lama
      await AsyncStorage.removeItem(SESSION_KEY);
      if (mounted) setEmail(null);
    } catch (err) {
      console.error("[auth] load session error:", err);
    } finally {
      if (mounted) setIsLoading(false);
    }
  }
  loadSession();
  return () => {
    mounted = false;
  };
}, []);

  async function getUsers(): Promise<Record<string, string>> {
    try {
      const raw = await AsyncStorage.getItem(USERS_KEY);
      if (!raw) return {};
      const parsed = JSON.parse(raw);
      if (typeof parsed !== "object" || parsed === null) return {};
      return parsed as Record<string, string>;
    } catch (err) {
      console.error("[auth] parse users error:", err);
      await AsyncStorage.removeItem(USERS_KEY);
      return {};
    }
  }

  async function signIn(
    inputEmail: string,
    inputPassword: string
  ): Promise<AuthResult> {
    try {
      if (!inputEmail || !inputPassword) {
        return { ok: false, error: "Email dan password wajib diisi" };
      }
      const users = await getUsers();
      const savedPassword = users[inputEmail];
      if (!savedPassword) {
        return { ok: false, error: "Email belum terdaftar" };
      }
      if (savedPassword !== inputPassword) {
        return { ok: false, error: "Password salah" };
      }
      await AsyncStorage.setItem(SESSION_KEY, inputEmail);
      setEmail(inputEmail);
      console.log("[auth] signIn sukses:", inputEmail);
      return { ok: true };
    } catch (err) {
      console.error("[auth] signIn error:", err);
      return { ok: false, error: "Terjadi kesalahan, coba lagi" };
    }
  }

  async function signUp(
    inputEmail: string,
    inputPassword: string
  ): Promise<AuthResult> {
    try {
      if (!inputEmail || !inputPassword) {
        return { ok: false, error: "Email dan password wajib diisi" };
      }
      const users = await getUsers();
      if (users[inputEmail]) {
        return { ok: false, error: "Email sudah terdaftar" };
      }
      users[inputEmail] = inputPassword;
      await AsyncStorage.setItem(USERS_KEY, JSON.stringify(users));
      console.log("[auth] signUp sukses:", inputEmail);
      return { ok: true };
    } catch (err) {
      console.error("[auth] signUp error:", err);
      return { ok: false, error: "Terjadi kesalahan, coba lagi" };
    }
  }

  async function signOut() {
    try {
      await AsyncStorage.removeItem(SESSION_KEY);
      setEmail(null);
      console.log("[auth] signOut sukses");
    } catch (err) {
      console.error("[auth] signOut error:", err);
      setEmail(null);
    }
  }

  return (
    <AuthContext.Provider value={{ email, isLoading, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}