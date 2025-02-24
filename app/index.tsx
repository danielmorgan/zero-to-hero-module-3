import { Stack } from "expo-router";
import { useCallback, useMemo, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { Button } from "react-native";
import * as Sentry from "@sentry/react-native";
import { FlashList } from "@shopify/flash-list";
import { useQuery } from "@tanstack/react-query";
import ProductCard from "@/components/ProductCard";
import ProductShimmerGrid from "@/components/ProductListShimmer";
import { Product, getCategories, getProducts } from "@/utils/api";
import colors from "@/utils/colors";

export default function Index() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const {
    data: products = [],
    refetch,
    isLoading,
    isRefetching,
  } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });
  const { data: categoriesData = [] } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  const categories = ["all", ...categoriesData];

  const filteredProducts = useMemo(() => {
    return products?.filter((product) => {
      if (selectedCategory !== "all") {
        return product.category === selectedCategory;
      }
      return product.title.toLowerCase().includes(searchQuery.toLowerCase());
    });
  }, [products, searchQuery, selectedCategory]);

  const renderProduct = useCallback(
    ({ item }: { item: Product }) => <ProductCard product={item} />,
    []
  );

  return (
    <>
      <Stack.Screen
        options={{
          title: "Galactic Products",
          headerShadowVisible: false,
          headerSearchBarOptions: {
            placeholder: "Search products...",
            hideWhenScrolling: false,
            hideNavigationBar: false,
            onChangeText: (event) => {
              setSearchQuery(event.nativeEvent.text);
            },
          },
        }}
      />

      <View style={styles.container}>
        <Button
          title="Throw error"
          onPress={() => {
            Sentry.captureException(new Error("First error"));
          }}
        />

        <View style={styles.categoryContainer}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.categoryScrollView}
          >
            {categories.map((category) => (
              <Pressable
                key={category}
                onPress={() => setSelectedCategory(category)}
                style={[
                  styles.categoryButton,
                  selectedCategory === category && styles.selectedCategoryButton,
                ]}
              >
                <Text
                  style={[
                    styles.categoryButtonText,
                    selectedCategory === category && styles.selectedCategoryButtonText,
                  ]}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </Text>
              </Pressable>
            ))}
          </ScrollView>
        </View>

        {isLoading ? (
          <ProductShimmerGrid />
        ) : (
          <FlashList
            data={filteredProducts}
            renderItem={renderProduct}
            estimatedItemSize={200}
            numColumns={2}
            contentContainerStyle={{ padding: 8 }}
            onRefresh={refetch}
            refreshing={isRefetching}
          />
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  categoryContainer: {
    boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.1)",
    zIndex: 10,
    paddingVertical: 8,
  },
  categoryScrollView: {
    paddingHorizontal: 12,
  },
  categoryButton: {
    borderRadius: 32,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginHorizontal: 4,
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
  },
  categoryButtonText: {
    fontSize: 14,
    color: "#666",
  },
  selectedCategoryButton: {
    backgroundColor: colors.primary,
  },
  selectedCategoryButtonText: {
    color: "#fff",
  },
});
