import { useRef } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import ReanimatedSwipeable, {
  SwipeableMethods,
} from "react-native-gesture-handler/ReanimatedSwipeable";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { CartProductEntry, useCartStore } from "@/store/cartStore";
import colors from "@/utils/colors";
import CartItemLeftActions from "./CartItemLeftActions";

type Props = {
  item: CartProductEntry;
};

const CartItem = ({ item }: Props) => {
  const { addProduct, reduceProduct, removeProduct } = useCartStore();
  const swipeableRef = useRef<SwipeableMethods>(null);
  const opacityAnim = useSharedValue(1);
  const scaleAnim = useSharedValue(1);
  const heightAnim = useSharedValue(80);

  const handleQuantityChanged = (type: "increment" | "decrement") => {
    if (type === "increment") {
      addProduct(item);
    } else {
      reduceProduct(item);
    }

    scaleAnim.value = withSequence(
      withSpring(1.2, { damping: 1, stiffness: 100 }),
      withSpring(1, { damping: 1, stiffness: 100 })
    );
  };

  const handleDelete = async () => {
    opacityAnim.value = withTiming(0, { duration: 300, easing: Easing.inOut(Easing.exp) });
    heightAnim.value = withTiming(0, { duration: 300, easing: Easing.inOut(Easing.exp) });
    await new Promise((resolve) => setTimeout(resolve, 300));
    removeProduct(item);
    swipeableRef.current?.close();
  };

  const quantityAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scaleAnim.value }],
  }));
  const containerAnimatedStyle = useAnimatedStyle(() => ({
    opacity: opacityAnim.value,
    height: heightAnim.value,
  }));

  return (
    <ReanimatedSwipeable
      ref={swipeableRef}
      friction={3}
      leftThreshold={50}
      renderLeftActions={(progress, dragX) => (
        <CartItemLeftActions progress={progress} drag={dragX} onShouldDelete={handleDelete} />
      )}
    >
      <Animated.View style={[styles.cartItemContainer, containerAnimatedStyle]}>
        <Image source={{ uri: item.image }} style={styles.image} />
        <View style={styles.itemContainer}>
          <Text style={styles.cartItemName}>{item.title}</Text>
          <Text style={styles.cartItemPrice}>£{item.price.toFixed(2)}</Text>
        </View>
        <View style={styles.quantityContainer}>
          <TouchableOpacity onPress={() => handleQuantityChanged("decrement")}>
            <Ionicons name="remove" size={24} color="black" />
          </TouchableOpacity>
          <Animated.Text style={[styles.quantityText, quantityAnimatedStyle]}>
            {item.quantity}
          </Animated.Text>
          <TouchableOpacity onPress={() => handleQuantityChanged("increment")}>
            <Ionicons name="add" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </Animated.View>
    </ReanimatedSwipeable>
  );
};

export default CartItem;

const styles = StyleSheet.create({
  cartItemContainer: {
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
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
