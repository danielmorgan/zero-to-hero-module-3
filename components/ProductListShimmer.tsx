import { LinearGradient } from "expo-linear-gradient";
import { Dimensions, StyleSheet, View } from "react-native";
import { createShimmerPlaceholder } from "react-native-shimmer-placeholder";

const Placeholder = createShimmerPlaceholder(LinearGradient);

const { width } = Dimensions.get("window");
const CARD_WIDTH = width * 0.43;
const shimmerGradient = ["#ebebeb", "#ddd", "#ebebeb"];

const ProductShimmer = () => {
  return (
    <View style={styles.card}>
      <Placeholder style={styles.image} shimmerColors={shimmerGradient} />
      {/* Content container */}
      <View style={styles.content}>
        <Placeholder style={styles.title} shimmerColors={shimmerGradient} />
        <View style={styles.ratingContainer}>
          <Placeholder style={styles.rating} shimmerColors={shimmerGradient} />
        </View>
      </View>
    </View>
  );
};

const ProductShimmerGrid = () => {
  return (
    <View style={styles.container}>
      {[...Array(6)].map((_, index) => (
        <ProductShimmer key={index} />
      ))}
    </View>
  );
};

export default ProductShimmerGrid;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    justifyContent: "center",
  },
  card: {
    width: CARD_WIDTH,
    backgroundColor: "white",
    borderRadius: 12,
    margin: 8,
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
  },
  image: {
    width: "100%",
    height: CARD_WIDTH, // Square image
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  content: {
    padding: 12,
    gap: 8,
  },
  title: {
    height: 20,
    width: "85%",
    borderRadius: 4,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  rating: {
    height: 16,
    width: "30%",
    borderRadius: 4,
  },
});
