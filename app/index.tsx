import { useCallback } from "react";
import { getCategories, getProducts, Product } from "@/utils/api";
import { useQuery } from "@tanstack/react-query";
import { StyleSheet, View } from "react-native";
import { FlashList } from "@shopify/flash-list";
import ProductCard from "@/components/ProductCard";

export default function Index() {
  const {
    data: products = [],
    refetch,
    isRefetching,
  } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });
  const { data: categoriesData = [] } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  const categories = ["All", ...categoriesData];

  const renderProduct = useCallback(
    ({ item }: { item: Product }) => <ProductCard product={item} />,
    []
  );

  return (
    <View style={styles.container}>
      <FlashList
        data={products}
        renderItem={renderProduct}
        estimatedItemSize={200}
        numColumns={2}
        contentContainerStyle={{ padding: 8 }}
        onRefresh={refetch}
        refreshing={isRefetching}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
