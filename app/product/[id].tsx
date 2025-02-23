import { Stack, router, useLocalSearchParams } from "expo-router";
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useQuery } from "@tanstack/react-query";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ProductDetailsShimmer } from "@/components/ProductDetailsShimmer";
import { useCartStore } from "@/store/cartStore";
import { getProduct } from "@/utils/api";
import colors from "@/utils/colors";

const Product = () => {
  const { id } = useLocalSearchParams();
  const { bottom } = useSafeAreaInsets();
  const { addProduct } = useCartStore();

  const { data: product, isLoading } = useQuery({
    queryKey: ["product", id],
    queryFn: () => getProduct(Number(id)),
  });

  const handleAddToCart = () => {
    if (product) {
      addProduct(product);
      // router.push("/cart");
    }
  };

  if (isLoading) {
    return <ProductDetailsShimmer />;
  }

  if (!product) {
    return <Text>Product not found</Text>;
  }

  return (
    <>
      <Stack.Screen options={{ title: product.title }} />

      <View style={styles.container}>
        <ScrollView>
          <Image source={{ uri: product.image }} style={styles.image} resizeMode="contain" />
          <View style={styles.content}>
            <Text style={styles.title}>{product.title}</Text>
            <Text style={styles.price}>${product.price}</Text>
            <Text style={styles.category}>{product.category}</Text>
            <Text style={styles.description}>{product.description}</Text>
            <View style={styles.ratingContainer}>
              <Text style={styles.rating}>★ {product.rating.rate}</Text>
              <Text style={styles.ratingCount}>({product.rating.count} reviews)</Text>
            </View>
          </View>
        </ScrollView>

        <TouchableOpacity
          style={[
            styles.addToCartButton,
            {
              paddingBottom: Platform.OS === "ios" ? bottom + 16 : 16,
            },
          ]}
          onPress={handleAddToCart}
        >
          <Ionicons name="cart" size={20} color="white" />
          <Text style={styles.addToCartText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default Product;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  image: {
    width: "100%",
    height: 300,
    backgroundColor: "#f9f9f9",
  },
  content: {
    padding: 16,
    gap: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
  },
  price: {
    fontSize: 20,
    fontWeight: "700",
    color: colors.primary,
  },
  category: {
    fontSize: 16,
    color: "#666",
    textTransform: "capitalize",
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: "#333",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  rating: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFB800",
  },
  ratingCount: {
    fontSize: 14,
    color: "#666",
  },
  addToCartButton: {
    backgroundColor: colors.primary,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    padding: 16,
  },
  addToCartText: {
    color: "white",
    fontWeight: "600",
    fontSize: 16,
  },
});
