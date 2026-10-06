import { Stack } from "expo-router";

export default function AuthLayout() {
  console.log("[layout/auth] rendered");
  return <Stack screenOptions={{ headerShown: false }} />;
}