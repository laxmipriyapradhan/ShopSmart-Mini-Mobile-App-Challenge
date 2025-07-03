import React from "react";
import { View, Text, Image } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Provider, useSelector } from "react-redux";
import HomeScreen from "./src/screen/HomeScreen";
import ProductDetailsScreen from "./src/screen/ProductDetailsScreen";
import CartScreen from "./src/screen/CartScreen";
import ReorderScreen from "./src/screen/ReorderScreen";
import ProfileScreen from "./src/screen/ProfileScreen";

import { store, RootState } from "./src/redux/store";
import { RootTabParamList, HomeStackParamList } from "./src/navigation/types";

const Tab = createBottomTabNavigator<RootTabParamList>();
const Stack = createNativeStackNavigator<HomeStackParamList>();

const MyHomeStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="HOME" component={HomeScreen} />
    <Stack.Screen name="PRODUCT_DETAILS" component={ProductDetailsScreen} />
  </Stack.Navigator>
);

const CartTabIcon = ({ focused, size }: { focused: boolean; size: number }) => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  return (
    <View style={{ position: "relative" }}>
      <Image
        source={
          focused
            ? require("./src/assets/focused/shopping_cart.png")
            : require("./src/assets/normal/shopping_cart.png")
        }
        style={{ height: size, width: size, resizeMode: "center" }}
      />
      <View
        style={{
          position: "absolute",
          right: -3,
          bottom: 22,
          height: 14,
          width: 14,
          backgroundColor: focused ? "#E96E6E" : "#C0C0C0",
          borderRadius: 7,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text style={{ color: "white", fontSize: 10 }}>
          {cartItems.length}
        </Text>
      </View>
    </View>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={{
            headerShown: false,
            tabBarShowLabel: false,
          }}
        >
          <Tab.Screen
            name="HOME_STACK"
            component={MyHomeStack}
            options={{
              tabBarIcon: ({ focused, size }) => (
                <Image
                  source={
                    focused
                      ? require("./src/assets/focused/home.png")
                      : require("./src/assets/normal/home.png")
                  }
                  style={{ height: size, width: size, resizeMode: "center" }}
                />
              ),
            }}
          />
          <Tab.Screen
            name="REORDER"
            component={ReorderScreen}
            options={{
              tabBarIcon: ({ focused, size }) => (
                <Image
                  source={
                    focused
                      ? require("./src/assets/focused/reorder.png")
                      : require("./src/assets/normal/reorder.png")
                  }
                  style={{ height: size, width: size, resizeMode: "center" }}
                />
              ),
            }}
          />
          <Tab.Screen
            name="CART"
            component={CartScreen}
            options={{
              tabBarIcon: ({ focused, size }) => (
                <CartTabIcon focused={focused} size={size} />
              ),
            }}
          />
          <Tab.Screen
            name="ACCOUNT"
            component={ProfileScreen}
            options={{
              tabBarIcon: ({ focused, size }) => (
                <Image
                  source={
                    focused
                      ? require("./src/assets/focused/account.png")
                      : require("./src/assets/normal/account.png")
                  }
                  style={{ height: size, width: size, resizeMode: "center" }}
                />
              ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
