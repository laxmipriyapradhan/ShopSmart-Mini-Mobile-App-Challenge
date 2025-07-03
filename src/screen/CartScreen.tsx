import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import LinearGradient from "react-native-linear-gradient";
import Header from "../components/Header";
import CartCard from "../components/CartCard";
import PrimaryButton from "../resuableComponent/PrimaryBuuton";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { removeFromCart } from "../redux/cartSlice";

const CartScreen = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const totalPrice = useSelector((state: RootState) => state.cart.total);

  const handleDeleteItem = async (id: string) => {
    dispatch(removeFromCart(id));
  };
  return (
    <LinearGradient colors={["#DEF4FF", "#FFFBFC"]} style={styles.container}>
      <View style={styles.header}>
        <Header isCart={true} />
      </View>
      <FlatList
        data={cartItems}
        renderItem={({ item }) => (
          <CartCard item={item} handleDelete={handleDeleteItem} />
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ marginTop: 40, paddingBottom: 200 }}
        ListFooterComponent={
          <>
            <View style={styles.bottomContentContainer}>
              <View style={styles.flexRowContainer}>
                <Text style={styles.titleText}>Total:</Text>
                <Text style={styles.priceText}>${totalPrice}</Text>
              </View>
              <View style={styles.flexRowContainer}>
                <Text style={styles.titleText}>Shpping:</Text>
                <Text style={styles.priceText}>$0.0</Text>
              </View>
              <View style={styles.divider} />
              <View style={styles.flexRowContainer}>
                <Text style={styles.titleText}>Grand Total:</Text>
                <Text style={[styles.priceText, styles.grandPriceText]}>
                  ${totalPrice}
                </Text>
              </View>
            </View>
            {/* <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Checkout</Text>
            </TouchableOpacity> */}
            <PrimaryButton title="Checkout" onPress={() => Alert.alert("Added to cart succssfully")} />
          </>
        }
      />
    </LinearGradient>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
  header: {},
  flexRowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 5,
  },
  bottomContentContainer: {
    marginHorizontal: 10,
    marginTop: 30,
  },
  titleText: {
    fontSize: 18,
    color: "#757575",
    fontWeight: "500",
  },
  priceText: {
    fontSize: 18,
    color: "#757575",
    fontWeight: "600",
  },
  divider: {
    borderWidth: 1,
    borderColor: "#C0C0C0",
    marginTop: 10,
    marginBottom: 5,
  },
  grandPriceText: {
    color: "#FFF",
    fontWeight: "700",
  },

});

