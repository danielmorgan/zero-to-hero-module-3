import { getCategories, getProducts } from "@/utils/api";
import { useQuery } from "@tanstack/react-query";
import { Text, View } from "react-native";

export default function Index() {
  const { data: products } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });
  const { data: categoriesData = [] } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  const categories = ["All", ...categoriesData];

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      {products?.map((product) => (
        <Text key={product.id}>{product.title}</Text>
      ))}
    </View>
  );
}
