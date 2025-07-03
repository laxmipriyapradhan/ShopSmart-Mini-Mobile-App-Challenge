import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, {  useState } from "react";
import LinearGradient from "react-native-linear-gradient";
import Header from "../components/Header";
import { fonts } from "../utils/fonts";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootTabParamList } from "../navigation/types"; 
import PrimaryButton from "../resuableComponent/PrimaryBuuton";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";

const colorsArray = [
  "#91A1B0",
  "#B11D1D",
  "#1F44A3",
  "#9F632A",
  "#1D752B",
  "#000000",
];
type ProductDetailsRouteParams = {
  item: {
    id: string;
    title: string;
    price: number;
    image: string;
   
  };
};


const ProductDetailsScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootTabParamList>>();
  const dispatch = useDispatch();

  const route = useRoute<RouteProp<{ PRODUCT_DETAILS: ProductDetailsRouteParams }, 'PRODUCT_DETAILS'>>();
  const { item } = route.params;

  const [selectedSize, setSelectedSize] = useState("M");
  const [selectedColor, setSelectedColor] = useState("#B11D1D");
  const imageUrl =
    "https://res.cloudinary.com/dlc5c1ycl/image/upload/v1710567613/vulb5bckiruhpzt2v8ec.png";


  const handleAddToCart = () => {
    const productWithVariants = {
      ...item,
      size: selectedSize,
      color: selectedColor,
    };
    dispatch(addToCart(productWithVariants));
    navigation.navigate("CART")
  };
  
  return (
    <ScrollView>
    <LinearGradient colors={["#DEF4FF", "#FFFBFC"]} style={styles.container}>
      <View style={styles.header}>
        <Header  isCart = {false}/>
      </View>
      <View style={styles.imageContainer}>
        <Image source={{ uri: item.image }} style={styles.coverImage} />
      </View>
      <View style={styles.contentContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.fontText}>{item.title}</Text>
          <Text style={styles.fontText}>${item.price}</Text>
        </View>
        <Text style={[styles.fontText, styles.sizeText]}>Size</Text>
        <View style={styles.sizeContainer}>
          <TouchableOpacity
            style={styles.sizeValueContainer}
            onPress={() => setSelectedSize("S")}
          >
            <Text
              style={[
                styles.sizeValueText,
                selectedSize === "S" && styles.selectedText,
              ]}
            >
              S
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.sizeValueContainer}
            onPress={() => setSelectedSize("M")}
          >
            <Text
              style={[
                styles.sizeValueText,
                selectedSize === "M" && styles.selectedText,
              ]}
            >
              M
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.sizeValueContainer}
            onPress={() => setSelectedSize("L")}
          >
            <Text
              style={[
                styles.sizeValueText,
                selectedSize === "L" && styles.selectedText,
              ]}
            >
              L
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.sizeValueContainer}
            onPress={() => setSelectedSize("XL")}
          >
            <Text
              style={[
                styles.sizeValueText,
                selectedSize === "XL" && styles.selectedText,
              ]}
            >
              XL
            </Text>
          </TouchableOpacity>
        </View>
        {/* color container */}
        <View style={styles.colorContainer}>
          {colorsArray.map((color, index) => {
            return (
              <TouchableOpacity
                key={index}
                onPress={() => setSelectedColor(color)}
              >
                <View
                  style={[
                    styles.borderColorCircle,
                    selectedColor === color && {
                      borderColor: color,
                      borderWidth: 2,
                      borderRadius: 24,
                    },
                  ]}
                >
                  <View
                    style={[styles.colorCircle, { backgroundColor: color }]}
                  ></View>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
        <PrimaryButton title="Add to Cart" onPress={handleAddToCart} />
      </View>
    </LinearGradient>
    </ScrollView>
  );
};

export default ProductDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 15,
  },
  imageContainer: {
    height: 420,
    width: "100%",
  },
  coverImage: {
    resizeMode: "cover",
    flex: 1,
  },
  contentContainer: {
    padding: 20,
  },
  textContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  fontText: {
    fontSize: 20,
    fontFamily: fonts.regular,
    fontWeight: "700",
    color: "#444444",
  },
  sizeText: {
    marginTop: 20,
  },
  sizeContainer: {
    flexDirection: "row",
    marginTop: 5,
    marginBottom: 5,
  },
  sizeValueContainer: {
    backgroundColor: "#FFFFFF",
    height: 40,
    width: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 5,
  },
  sizeValueText: {
    fontSize: 18,
    fontFamily: fonts.regular,
    fontWeight: "700",
  },
  selectedText: {
    color: "#E55B5B",
  },
  colorContainer: {
    flexDirection: "row",
  },
  borderColorCircle: {
    height: 48,
    width: 48,
    padding: 5,
    marginHorizontal: 5,
  },
  colorCircle: {
    flex: 1,
    borderRadius: 18,
  },

});

