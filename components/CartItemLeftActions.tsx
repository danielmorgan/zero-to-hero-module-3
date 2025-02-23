import { StyleSheet, TouchableOpacity } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import Animated, { SharedValue, useAnimatedStyle } from "react-native-reanimated";

type Props = {
  progress: SharedValue<number>;
  drag: SharedValue<number>;
  onShouldDelete: () => void;
};

const CartItemLeftActions = ({ progress, drag, onShouldDelete }: Props) => {
  const styleAnimation = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: drag.get() / 2 - 50 }],
    };
  });

  return (
    <Animated.View style={[styles.leftActions, styleAnimation]}>
      <TouchableOpacity onPress={onShouldDelete}>
        <Ionicons name="trash-outline" size={26} color="#fff" />
      </TouchableOpacity>
    </Animated.View>
  );
};

export default CartItemLeftActions;

const styles = StyleSheet.create({
  leftActions: {
    backgroundColor: "crimson",
    width: 100,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
});
