import React from "react";
import { View, Image } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { styles } from "./styles";
export const Header = () => {
  return (
    <View style={styles.header}>
      <ThemedText style={styles.headerTitle}>Menu</ThemedText>
      <Image
        // source={require("@/assets/images/avatar.png")}
        style={styles.avatar}
      />
    </View>
  );
};
