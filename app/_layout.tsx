import { Stack } from "expo-router";
import { useReactQueryDevTools } from "@dev-plugins/react-query";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import CartButton from "@/components/CartButton";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60,
    },
  },
});

export default function RootLayout() {
  useReactQueryDevTools(queryClient);

  return (
    <QueryClientProvider client={queryClient}>
      <Stack>
        <Stack.Screen name="index" options={{ headerRight: () => <CartButton /> }} />
        <Stack.Screen
          name="product/[id]"
          options={{
            headerBackTitle: "Products",
          }}
        />
      </Stack>
    </QueryClientProvider>
  );
}
