import { Stack } from "expo-router";

export default function AppLayout() {
  console.log("[layout/app] rendered");
  return <Stack screenOptions={{ headerShown: false }} />;
}