import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { CartProductEntry, useCartStore } from "@/store/cartStore";
import colors from "@/utils/colors";

type Props = {
  item: CartProductEntry;
};

const CartItem = ({ item }: Props) => {
  const { addProduct, reduceProduct } = useCartStore();

  const handleQuantityChanged = (type: "increment" | "decrement") => {
    if (type === "increment") {
      addProduct(item);
    } else {
      reduceProduct(item);
    }
  };

  return (
    <View style={styles.cartItemContainer}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.itemContainer}>
        <Text style={styles.cartItemName}>{item.title}</Text>
        <Text style={styles.cartItemPrice}>£{item.price.toFixed(2)}</Text>
      </View>
      <View style={styles.quantityContainer}>
        <TouchableOpacity onPress={() => handleQuantityChanged("decrement")}>
          <Ionicons name="remove" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.quantityText}>{item.quantity}</Text>
        <TouchableOpacity onPress={() => handleQuantityChanged("increment")}>
          <Ionicons name="add" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CartItem;

const styles = StyleSheet.create({
  cartItemContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 16,
  },
  image: {
    width: 50,
    height: 50,
  },
  itemContainer: {
    flex: 1,
  },
  cartItemName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  cartItemPrice: {
    fontSize: 14,
    color: "#666",
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  quantityButton: {
    padding: 8,
    backgroundColor: "#ddd",
    borderRadius: 4,
  },
  quantityText: {
    fontSize: 16,
    fontWeight: "bold",
    backgroundColor: colors.primary,
    color: "#fff",
    textAlign: "center",
    padding: 4,
    width: 30,
    borderRadius: 4,
  },
});
