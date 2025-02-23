import { Link } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useCartStore } from "@/store/cartStore";
import colors from "@/utils/colors";

const CartButton = () => {
  const { count } = useCartStore();
  return (
    <Link href="/cart" asChild>
      <TouchableOpacity>
        {count > 0 && (
          <View style={styles.countContainer}>
            <Text style={styles.countText}>{count}</Text>
          </View>
        )}
        <Ionicons name="cart" size={28} color="black" />
      </TouchableOpacity>
    </Link>
  );
};
export default CartButton;
const styles = StyleSheet.create({
  countContainer: {
    position: "absolute",
    zIndex: 1,
    right: -10,
    bottom: -5,
    width: 20,
    height: 20,
    backgroundColor: colors.primary,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  countText: {
    fontSize: 12,
    color: "white",
    fontWeight: "bold",
  },
});
