import { useRouter } from "expo-router";
import { Alert, FlatList, Platform, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import CartItem from "@/components/CartItem";
import { useCartStore } from "@/store/cartStore";
import colors from "@/utils/colors";

const Cart = () => {
  const { products, total, clearCart } = useCartStore();
  const { bottom } = useSafeAreaInsets();
  const router = useRouter();

  const handleCheckout = () => {
    if (products.length === 0) {
      Alert.alert("Add a product to your cart first!");
      return;
    }
    clearCart();
    Alert.alert("Checkout successful!");
    router.dismiss();
  };

  return (
    <View style={styles.container}>
      {products.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No products in cart</Text>
        </View>
      ) : (
        <FlatList
          data={products}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <CartItem item={item} />}
          ListHeaderComponent={() => (
            <>
              {products.length && <Text style={styles.totalText}>Total: ${total.toFixed(2)}</Text>}
            </>
          )}
          contentContainerStyle={{ gap: 10 }}
        />
      )}

      <TouchableOpacity
        style={[
          styles.checkoutButton,
          {
            paddingBottom: Platform.OS === "ios" ? bottom + 16 : 16,
          },
        ]}
        onPress={handleCheckout}
      >
        <Ionicons name="card" size={20} color="white" />
        <Text style={styles.checkoutText}>Checkout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Cart;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 16,
  },
  emptyContainer: {
    flex: 1,
    backgroundColor: "#fff",
  },
  emptyText: {
    textAlign: "center",
  },
  totalText: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  checkoutButton: {
    backgroundColor: colors.primary,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    padding: 16,
  },
  checkoutText: {
    color: "white",
    fontWeight: "600",
    fontSize: 16,
  },
});
