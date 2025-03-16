import React from "react";
import { View, StyleSheet } from "react-native";
import { ThemedText } from "./ThemedText";
import { useCartStore } from "@/services/cart.services";

export const CartBadge = () => {
  const { items } = useCartStore();

  if (items.length === 0) {
    return null;
  }

  return (
    <View style={styles.badge}>
      <ThemedText style={styles.badgeText}>
        {items.length > 9 ? "9+" : items.length}
      </ThemedText>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    position: "absolute",
    right: -8,
    top: -5,
    backgroundColor: "#FF6B6B",
    borderRadius: 12,
    minWidth: 18,
    height: 18,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 4,
    borderWidth: 1.5,
    borderColor: "#FFFFFF",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
  },
  badgeText: {
    color: "#FFFFFF",
    fontSize: 10,
    fontWeight: "bold",
    textAlign: "center",
    lineHeight: 14,
  },
});
