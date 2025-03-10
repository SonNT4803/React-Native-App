import React from "react";
import { TouchableOpacity, Image } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { styles } from "./styles";

interface CategoryItemProps {
  title: string;
  imageSource?: any;
}

export const CategoryItem = ({ title, imageSource }: CategoryItemProps) => {
  return (
    <TouchableOpacity style={styles.categoryItem}>
      <Image
        // source={imageSource}
        style={styles.categoryImage}
      />
      <ThemedText style={styles.categoryText}>{title}</ThemedText>
    </TouchableOpacity>
  );
};
