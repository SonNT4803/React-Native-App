import React, { useState } from "react";
import {
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useCartStore } from "@/services/cart.services";

export default function CartScreen() {
  const router = useRouter();
  const [orderInstructions, setOrderInstructions] = useState("");

  // Use the cart store
  const { items, updateQuantity, removeFromCart, getSubtotal } = useCartStore();

  const calculateTotal = () => {
    return getSubtotal();
  };

  const formatPrice = (price: number) => {
    return `${price.toFixed(2)}`;
  };

  const handleCheckout = () => {
    // Implement checkout logic
    console.log("Proceeding to checkout");
  };

  const handleBrowseFood = () => {
    // router.push("/(tabs)/");
  };

  return (
    <ThemedView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color="#FF6B6B" />
        </TouchableOpacity>
        <ThemedText style={styles.headerTitle}>
          {items.length > 0 ? `${items.length} items in cart` : "Your Cart"}
        </ThemedText>
        <View style={{ width: 24 }} />
      </View>

      {items.length === 0 ? (
        <View style={styles.emptyCartContainer}>
          <Ionicons name="cart-outline" size={80} color="#CCCCCC" />
          <ThemedText style={styles.emptyCartTitle}>
            Your cart is empty
          </ThemedText>
          <ThemedText style={styles.emptyCartText}>
            Looks like you haven't added any items to your cart yet.
          </ThemedText>
          <TouchableOpacity
            style={styles.browseFoodButton}
            onPress={handleBrowseFood}
          >
            <ThemedText style={styles.browseFoodButtonText}>
              Browse Food
            </ThemedText>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            {items.map((item) => (
              <View key={item.id} style={styles.cartItem}>
                <Image source={{ uri: item.image }} style={styles.itemImage} />
                <View style={styles.itemDetails}>
                  <ThemedText style={styles.itemName}>{item.name}</ThemedText>
                  <ThemedText style={styles.itemPrice}>{item.price}</ThemedText>
                  <View style={styles.quantityContainer}>
                    <TouchableOpacity
                      style={styles.quantityButton}
                      onPress={() => updateQuantity(item.id, -1)}
                    >
                      <Ionicons name="remove" size={18} color="#FF6B6B" />
                    </TouchableOpacity>
                    <ThemedText style={styles.quantityText}>
                      {item.quantity}
                    </ThemedText>
                    <TouchableOpacity
                      style={styles.quantityButton}
                      onPress={() => updateQuantity(item.id, 1)}
                    >
                      <Ionicons name="add" size={18} color="#FF6B6B" />
                    </TouchableOpacity>
                  </View>
                </View>
                <TouchableOpacity
                  style={styles.removeButton}
                  onPress={() => removeFromCart(item.id)}
                >
                  <Ionicons name="close-circle" size={24} color="#FF6B6B" />
                </TouchableOpacity>
              </View>
            ))}

            <View style={styles.instructionsContainer}>
              <ThemedText style={styles.sectionTitle}>
                Order Instructions
              </ThemedText>
              <TextInput
                style={styles.instructionsInput}
                placeholder="Type Here......"
                placeholderTextColor="#999"
                multiline
                value={orderInstructions}
                onChangeText={setOrderInstructions}
              />
            </View>

            <View style={styles.billContainer}>
              <ThemedText style={styles.sectionTitle}>Bill Summary</ThemedText>
              <View style={styles.billRow}>
                <ThemedText style={styles.billLabel}>Sub-Total</ThemedText>
                <ThemedText style={styles.billValue}>
                  {formatPrice(getSubtotal())}
                </ThemedText>
              </View>
              <View style={styles.billRow}>
                <View style={styles.billLabelWithIcon}>
                  <Ionicons name="bicycle-outline" size={16} color="#666" />
                  <ThemedText style={styles.billLabel}>Delivery</ThemedText>
                </View>
                <ThemedText style={styles.billValue}>Free Ship</ThemedText>
              </View>
              <View style={[styles.billRow, styles.totalRow]}>
                <ThemedText style={styles.totalLabel}>Grand Total</ThemedText>
                <ThemedText style={styles.totalValue}>
                  {formatPrice(calculateTotal())}
                </ThemedText>
              </View>
            </View>
          </ScrollView>

          <View style={styles.checkoutContainer}>
            <TouchableOpacity
              style={styles.checkoutButton}
              onPress={handleCheckout}
            >
              <ThemedText style={styles.checkoutButtonText}>
                Checkout
              </ThemedText>
            </TouchableOpacity>
          </View>
        </>
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingTop: 50,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F5F5F5",
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 100,
  },
  cartItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: 12,
    backgroundColor: "#F5F5F5",
  },
  itemDetails: {
    flex: 1,
    marginLeft: 16,
  },
  itemName: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  itemPrice: {
    fontSize: 16,
    color: "#FF6B6B",
    fontWeight: "bold",
    marginBottom: 8,
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  quantityButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#F5F5F5",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  quantityText: {
    fontSize: 16,
    fontWeight: "bold",
    marginHorizontal: 12,
  },
  removeButton: {
    padding: 8,
  },
  instructionsContainer: {
    marginTop: 24,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
  },
  instructionsInput: {
    backgroundColor: "#F5F5F5",
    borderRadius: 12,
    padding: 16,
    height: 100,
    textAlignVertical: "top",
    fontSize: 16,
  },
  billContainer: {
    marginBottom: 24,
  },
  billRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  billLabelWithIcon: {
    flexDirection: "row",
    alignItems: "center",
  },
  billLabel: {
    fontSize: 16,
    color: "#666",
    marginLeft: 8,
  },
  billValue: {
    fontSize: 16,
    fontWeight: "500",
  },
  totalRow: {
    borderTopWidth: 1,
    borderTopColor: "#F0F0F0",
    paddingTop: 12,
    marginTop: 8,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: "bold",
  },
  totalValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FF6B6B",
  },
  checkoutContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: "#F0F0F0",
  },
  checkoutButton: {
    backgroundColor: "#FF6B6B",
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: "center",
  },
  checkoutButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  emptyCartContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 30,
  },
  emptyCartTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
  },
  emptyCartText: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 30,
  },
  browseFoodButton: {
    backgroundColor: "#FF6B6B",
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 30,
    alignItems: "center",
  },
  browseFoodButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});
