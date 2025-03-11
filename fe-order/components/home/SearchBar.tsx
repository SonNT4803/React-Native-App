import React from "react";
import { View, TextInput } from "react-native";
import { styles } from "./styles";
import FontAwesome from "@expo/vector-icons/FontAwesome";

export const SearchBar = () => {
  return (
    <View style={styles.searchContainer}>
      <FontAwesome
        name="search"
        size={20}
        color="#999"
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
