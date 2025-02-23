import { Stack, router } from "expo-router";
import { Text, TouchableOpacity } from "react-native";
import { useMMKVDevTools } from "@dev-plugins/react-native-mmkv";
import { useReactQueryDevTools } from "@dev-plugins/react-query";
import Ionicons from "@expo/vector-icons/Ionicons";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import CartButton from "@/components/CartButton";
import { storage } from "@/store/mmkv";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60,
    },
  },
});

export default function RootLayout() {
  useReactQueryDevTools(queryClient);
  useMMKVDevTools({ storage });

  return (
    <QueryClientProvider client={queryClient}>
      <GestureHandlerRootView>
        <Stack>
          <Stack.Screen name="index" options={{ headerRight: () => <CartButton /> }} />
          <Stack.Screen
            name="product/[id]"
            options={{
              headerBackTitle: "Products",
            }}
          />
          <Stack.Screen
            name="cart"
            options={{
              title: "Cart",
              presentation: "modal",
            }}
          />
        </Stack>
      </GestureHandlerRootView>
    </QueryClientProvider>
  );
}
