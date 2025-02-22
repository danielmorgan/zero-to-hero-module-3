import { Product } from "@/utils/api";
import colors from "@/utils/colors";
import { useRouter } from "expo-router";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

type Props = {
  product: Product;
};

const ProductCard = ({ product }: Props) => {
  const router = useRouter();

  return (
    <TouchableOpacity
      onPress={() => router.push(`/product/${product.id}`)}
      style={styles.productCard}
    >
      <Image source={{ uri: product.image }} style={styles.image} />
      <View style={styles.productInfo}>
        <Text style={styles.productTitle}>{product.title}</Text>
        <Text style={styles.productPrice}>${product.price}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default ProductCard;

const styles = StyleSheet.create({
  productCard: {
    flex: 1,
    margin: 8,
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.2)",
    gap: 8,
  },
  image: {
    width: "100%",
    height: 150,
  },
  productInfo: {
    flex: 1,
    gap: 4,
  },
  productTitle: {
    fontSize: 16,
    fontWeight: "500",
  },
  productPrice: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.primary,
  },
});
