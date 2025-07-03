import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import LinearGradient from "react-native-linear-gradient";
import Header from "../components/Header";
import Tags from "../components/Tags";
import ProductCard from "../components/ProductCard";
import data from "../data/data.json";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Product, HomeStackParamList } from "../navigation/types";



const initialProducts: Product[] = data.products.map((product) => ({
  ...product,
  isFavorite: false,
}));

const HomeScreen: React.FC = () => {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [textInput, setTextInput] = useState("");

  const navigation =
    useNavigation<NativeStackNavigationProp<HomeStackParamList>>();

  const handleProductDetails = (item: Product) => {
    navigation.navigate("PRODUCT_DETAILS", {
      item: {
        ...item,
        id: item.id.toString(), 
      },
    });
  };

  const toggleFavorite = (item: Product) => {
    setProducts((prevProducts) =>
      prevProducts.map((prod) =>
        prod.id === item.id
          ? { ...prod, isFavorite: !prod.isFavorite }
          : prod
      )
    );
  };

  const handleSearch = () => {
    const filtered = initialProducts.filter((item) =>
      item.title.toLowerCase().includes(textInput.toLowerCase())
    );
    setProducts(filtered);
  };

  return (
    <LinearGradient colors={["#DEF4FF", "#FFFBFC"]} style={styles.container}>
      <FlatList
        ListHeaderComponent={
          <>
            <Header isCart={false}/>
            <View>
              <Text style={styles.headingText}>ShopSmart Mini</Text>
              <View style={styles.inputContainer}>
                <TouchableOpacity onPress={handleSearch}>
                  <Image
                    source={require("../assets/search.png")}
                    style={styles.searchIcon}
                  />
                </TouchableOpacity>
                <TextInput
                  placeholder="Search"
                  style={styles.textInput}
                  value={textInput}
                  onChangeText={setTextInput}
                  onSubmitEditing={handleSearch}
                  returnKeyType="search"
                />
              </View>
            </View>
            <Tags />
          </>
        }
        data={products}
        numColumns={2}
        renderItem={({ item }) => (
          <ProductCard
            item={item}
            handleProductClick={handleProductDetails}
            toggleFavorite={toggleFavorite}
          />
        )}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
      />
    </LinearGradient>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  headingText: {
    fontSize: 28,
    color: "#000000",
    marginVertical: 20,
    fontFamily: "Poppins-Regular",
  },
  inputContainer: {
    width: "100%",
    backgroundColor: "#FFFFFF",
    height: 48,
    borderRadius: 12,
    alignItems: "center",
    flexDirection: "row",
  },
  searchIcon: {
    height: 26,
    width: 26,
    marginHorizontal: 12,
  },
  textInput: {
    fontSize: 18,
    fontFamily: "Poppins-Regular",
    flex: 1,
  },
});
