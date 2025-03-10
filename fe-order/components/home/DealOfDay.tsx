import React from "react";
import { View, Image } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { styles } from "./styles";

export const DealOfDay = () => {
  return (
    <View style={styles.sectionContainer}>
      <ThemedText style={styles.sectionTitle}>Deal of the Day</ThemedText>
      <View style={styles.dealContainer}>
        <View style={styles.dealContent}>
          <ThemedText style={styles.dealTitle}>Today's Offer</ThemedText>
          <ThemedText style={styles.dealDescription}>
            Get Garlic Bread Free{"\n"}on all orders above Rs. 299/-
          </ThemedText>
        </View>
        <Image
          // source={require("@/assets/images/garlic-bread.png")}
          style={styles.dealImage}
        />
      </View>
    </View>
  );
};
