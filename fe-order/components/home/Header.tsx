import { ThemedText } from "@/components/ThemedText";
import React from "react";
import { View } from "react-native";
import { IconSymbol } from "../ui/IconSymbol";
import { styles } from "./styles";
export const Header = () => {
  return (
    <View style={styles.header}>
      <ThemedText style={styles.headerTitle}>Menu</ThemedText>
      <View style={styles.avatar}>
        <IconSymbol name="person.fill" size={50} color="#FFF" />
      </View>
    </View>
  );
};
