import { Stack } from "expo-router";
import { AuthProvider, useAuth } from "../context/auth";
import SplashScreen from "../components/SplashScreen";
import { OrdersProvider } from "../context/orders";
function RootNavigator() {
  const { email, isLoading } = useAuth();

  if (isLoading) {
    return <SplashScreen />;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Protected guard={!!email}>
        <Stack.Screen name="(app)" />
      </Stack.Protected>

      <Stack.Protected guard={!email}>
        <Stack.Screen name="(auth)" />
      </Stack.Protected>
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <OrdersProvider>
        <RootNavigator />
      </OrdersProvider>
    </AuthProvider>
  );
}

