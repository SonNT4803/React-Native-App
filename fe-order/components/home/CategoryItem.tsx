import React from "react";
import { TouchableOpacity, Image, StyleSheet } from "react-native";
import { ThemedText } from "@/components/ThemedText";

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

const styles = StyleSheet.create({
  categoryItem: {
    alignItems: "center",
    marginHorizontal: 8,
    marginBottom: 16,
    width: 80,
  },
  categoryImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#FFE8E8",
    marginBottom: 8,
  },
  categoryText: {
    fontSize: 12,
    textAlign: "center",
    color: "#333",
    fontWeight: "500",
  },
});
