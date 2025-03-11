import React from "react";
import { TouchableOpacity, Image } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { styles } from "./styles";

interface CategoryItemProps {
  title: string;
  imageSource?: string;
  onPress?: () => void;
}

export const CategoryItem = ({
  title,
  imageSource,
  onPress,
}: CategoryItemProps) => {
  return (
    <TouchableOpacity style={styles.categoryItem} onPress={onPress}>
      <Image
        source={
          imageSource
            ? { uri: imageSource }
            : require("@/assets/images/react-logo.png")
        }
        style={styles.categoryImage}
      />
      <ThemedText style={styles.categoryText}>{title}</ThemedText>
    </TouchableOpacity>
  );
};
