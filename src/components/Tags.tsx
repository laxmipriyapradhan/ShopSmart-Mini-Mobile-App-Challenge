import React, { useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ListRenderItem,
} from "react-native";

const Tags: React.FC = () => {
  const [selected, setSelected] = useState<string>("Trending Now");
  const tags: string[] = ["Trending Now", "All", "New", "Fashion", "Mens"];

  const renderItem: ListRenderItem<string> = ({ item }) => (
    <TouchableOpacity onPress={() => setSelected(item)}>
      <Text
        style={[
          styles.tagText,
          item === selected ? styles.isSelected : null,
        ]}
      >
        {item}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        horizontal
        data={tags}
        renderItem={renderItem}
        keyExtractor={(item) => item}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.container}
      />
    </View>
  );
};

export default Tags;

const styles = StyleSheet.create({
  tagText: {
    fontSize: 16,
    fontFamily: "Poppins-Regular",
    borderRadius: 10,
    paddingHorizontal: 30,
    paddingVertical: 10,
    marginHorizontal: 10,
    backgroundColor: "#DFDCDC",
    color: "#938F8F",
    fontWeight: "700",
  },
  isSelected: {
    backgroundColor: "#1484CD",
    color: "#FFFFFF",
  },
  container: {
    marginVertical: 10,
  },
});
