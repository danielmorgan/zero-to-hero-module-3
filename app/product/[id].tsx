import { useLocalSearchParams } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

type Props = {};

const Product = (props: Props) => {
  const { id } = useLocalSearchParams();

  return (
    <View>
      <Text>Product {id}</Text>
    </View>
  );
};

export default Product;

const styles = StyleSheet.create({});
