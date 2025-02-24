import { Stack, useNavigationContainerRef } from "expo-router";
import { useEffect } from "react";
import { useMMKVDevTools } from "@dev-plugins/react-native-mmkv";
import { useReactQueryDevTools } from "@dev-plugins/react-query";
import * as Sentry from "@sentry/react-native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import CartButton from "@/components/CartButton";
import { storage } from "@/store/mmkv";

const navigationIntegration = Sentry.reactNavigationIntegration({
  enableTimeToInitialDisplay: true,
});

Sentry.init({
  dsn: process.env.EXPO_PUBLIC_SENTRY_DSN,
  attachScreenshot: true,
  tracesSampler: () => 1.0,
  replaysSessionSampleRate: 1.0,
  replaysOnErrorSampleRate: 1.0,
  _experiments: {
    profilesSampleRate: 1.0,
  },
  integrations: [Sentry.mobileReplayIntegration(), navigationIntegration],
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60,
    },
  },
});

function RootLayout() {
  useReactQueryDevTools(queryClient);
  useMMKVDevTools({ storage });

  const ref = useNavigationContainerRef();
  useEffect(() => {
    navigationIntegration.registerNavigationContainer(ref);
  }, [ref]);

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

export default Sentry.wrap(RootLayout);
