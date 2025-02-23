import { Text, View } from "react-native";
import { useCartStore } from "@/store/cartStore";

const CartButton = () => {
  const { count } = useCartStore();

  return (
    <View>
      <Text>{count}</Text>
    </View>
  );
};

export default CartButton;
