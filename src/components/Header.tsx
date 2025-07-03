import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { fonts } from "../utils/fonts";
import { useNavigation } from "@react-navigation/native";
import { RootState } from "../redux/store";
import { useSelector } from "react-redux";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type RootStackParamList = {
  HOME: undefined;
};

const Header = ({ isCart }: { isCart: boolean }) => {

  const avatar = useSelector((state: RootState) => state.profile.avatar);
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const handleBack = () => {
    navigation.navigate("HOME");
  };
  return (
    <View style={styles.header}>
      {isCart ? (
        <TouchableOpacity
          style={styles.appDrawerContainer}
          onPress={handleBack}
        >
          <Image
            source={require("../assets/arrowback.png")}
            style={styles.appBackIcon}
          />
        </TouchableOpacity>
      ) : (

        <View style={styles.appDrawerContainer}>
          <Image
            source={require("../assets/apps.png")}
            style={styles.appDrawerIcon}

          />
        </View>

      )}

      {isCart ? <Text style={styles.titleText}>My Cart</Text> : null}


      {avatar ? (
        <Image source={{ uri: avatar }} style={styles.profileImage} />
      ) : (
        <Image
          source={require("../assets/profile-removebg-preview.png")}
          style={styles.profileImage}
        />
      )}

    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  appDrawerContainer: {
    backgroundColor: "white",
    height: 44,
    width: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
  },
  appDrawerIcon: {
    height: 30,
    width: 30,
  },
  appBackIcon: {
    height: 24,
    width: 24,
    marginLeft: 10,
  },
  profileImage: {
    height: 44,
    width: 44,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  titleText: {
    fontSize: 28,
    fontFamily: fonts.regular,
    color: "#000000",
  },
});
