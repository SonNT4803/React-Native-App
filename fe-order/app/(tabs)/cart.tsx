import React from "react";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { styles } from "@/components/cart/styles";

export default function CartScreen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.title}>Cart</ThemedText>
      <ThemedText>Your cart items will appear here</ThemedText>
    </ThemedView>
  );
}
