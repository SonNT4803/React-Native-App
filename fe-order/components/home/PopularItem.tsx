import React from "react";
import { TouchableOpacity, Image } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { styles } from "./styles";

interface PopularItemProps {
  title: string;
  imageSource?: any;
}

export const PopularItem = ({ title, imageSource }: PopularItemProps) => {
  return (
    <TouchableOpacity style={styles.popularItem}>
      <Image
        // source={imageSource}
        style={styles.popularImage}
      />
      <ThemedText style={styles.popularText}>{title}</ThemedText>
    </TouchableOpacity>
  );
};
