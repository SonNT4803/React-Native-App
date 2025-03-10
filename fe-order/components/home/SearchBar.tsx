import React from "react";
import { View, Image, TextInput } from "react-native";
import { styles } from "./styles";

export const SearchBar = () => {
  return (
    <View style={styles.searchContainer}>
      <Image
        // source={require("@/assets/images/search.png")}
        style={styles.searchIcon}
      />
      <TextInput
        style={styles.searchInput}
        placeholder="Search"
        placeholderTextColor="#999"
      />
    </View>
  );
};
