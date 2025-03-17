import { styles } from "@/components/cart/styles";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Order } from "@/models/order.models";
import { useCartStore } from "@/services/cart.services";
import { getUserId } from "@/utils/authUtils";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  ScrollView,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import * as Animatable from "react-native-animatable";
import { showMessage } from "react-native-flash-message";
import { orderService } from "../../services/order.services";

export default function CartScreen() {
  const router = useRouter();
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [orderNote, setOrderNote] = useState("");
  const [userId, setUserId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);

  const { items, updateQuantity, removeFromCart, getSubtotal, clearCart } =
    useCartStore();

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const token = await AsyncStorage.getItem("accessToken");
        if (token) {
          const id = getUserId(token);
          setUserId(id);
        }
      } catch (error) {
        console.error("Error fetching user ID:", error);
      }
    };

    fetchUserId();
  }, []);

  const calculateTotal = () => {
    return getSubtotal();
  };

  const formatPrice = (price: number) => {
    return `${price.toFixed(2)}`;
  };

  const handleCheckout = async () => {
    try {
      if (!userId) {
        showMessage({
          message: "Chưa đăng nhập",
          description: "Vui lòng đăng nhập để tiếp tục thanh toán",
          type: "warning",
        });
        return;
      }

      if (!deliveryAddress || deliveryAddress.trim() === "") {
        Alert.alert(
          "Địa chỉ giao hàng trống",
          "Vui lòng nhập địa chỉ giao hàng để tiếp tục thanh toán",
          [{ text: "OK" }]
        );
        return;
      }

      Alert.alert(
        "Xác nhận đặt hàng",
        "Bạn có chắc chắn muốn đặt đơn hàng này không?",
        [
          {
            text: "Hủy",
            style: "cancel",
          },
          {
            text: "Đồng ý",
            onPress: async () => {
              try {
                setIsLoading(true);

                const orderData: Order = {
                  userId: userId,
                  items: items.map((item) => ({
                    foodId: item.id,
                    quantity: item.quantity,
                    price: item.price,
                  })),
                  totalAmount: calculateTotal(),
                  status: "pending",
                  deliveryAddress: deliveryAddress,
                };

                if (orderNote) {
                  (orderData as any).note = orderNote;
                }

                const result = await orderService.checkout(orderData);

                if (result) {
                  await clearCart();

                  setOrderSuccess(true);
                  setIsLoading(false);

                  setTimeout(() => {
                    showMessage({
                      message: "Đặt hàng thành công!",
                      description:
                        "Cảm ơn bạn đã đặt hàng. Đơn hàng của bạn đang được xử lý.",
                      type: "success",
                      duration: 3000,
                    });

                    setOrderSuccess(false);
                    router.push("/");
                  }, 2000);
                }
              } catch (error) {
                setIsLoading(false);
                console.error("Checkout error:", error);
                showMessage({
                  message: "Đặt hàng thất bại",
                  description:
                    "Có lỗi xảy ra khi đặt hàng. Vui lòng thử lại sau.",
                  type: "danger",
                });
              }
            },
          },
        ]
      );
    } catch (error) {
      console.error("Checkout error:", error);
      showMessage({
        message: "Đặt hàng thất bại",
        description: "Có lỗi xảy ra khi đặt hàng. Vui lòng thử lại sau.",
        type: "danger",
      });
    }
  };

  const handleBrowseFood = () => {
    router.push("/all-foods");
  };

  return (
    <ThemedView style={styles.container}>
      {isLoading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#FF6B6B" />
          <ThemedText style={styles.loadingText}>
            Đang xử lý đơn hàng...
          </ThemedText>
        </View>
      )}

      {orderSuccess && (
        <View style={styles.successOverlay}>
          <Animatable.View
            animation="zoomIn"
            duration={800}
            style={styles.successAnimationContainer}
          >
            <Animatable.View animation="bounceIn" delay={400} duration={800}>
              <Ionicons name="checkmark-circle" size={100} color="#4CAF50" />
            </Animatable.View>
            <Animatable.Text
              animation="fadeIn"
              delay={1000}
              style={styles.successText}
            >
              Đặt hàng thành công!
            </Animatable.Text>
          </Animatable.View>
        </View>
      )}

      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color="#FF6B6B" />
        </TouchableOpacity>
        <ThemedText style={styles.headerTitle}>
          {items.length > 0 ? `${items.length} items in cart` : "Giỏ hàng"}
        </ThemedText>
        <View style={{ width: 24 }} />
      </View>

      {items.length === 0 ? (
        <View style={styles.emptyCartContainer}>
          <Ionicons name="cart-outline" size={80} color="#CCCCCC" />
          <ThemedText style={styles.emptyCartTitle}>
            Giỏ hàng của bạn đang trông
          </ThemedText>
          <ThemedText style={styles.emptyCartText}>
            Có vẻ như bạn chưa thêm bất kỳ mặt hàng nào vào giỏ hàng của mình.
          </ThemedText>
          <TouchableOpacity
            style={styles.browseFoodButton}
            onPress={handleBrowseFood}
          >
            <ThemedText style={styles.browseFoodButtonText}>
              Tìm kiếm món ăn
            </ThemedText>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={[
              styles.scrollContent,
              { paddingBottom: 120 } // Add extra padding at the bottom to prevent tab bar overlap
            ]}
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
                Địa chỉ giao hàng{" "}
                <ThemedText style={styles.requiredField}>*</ThemedText>
              </ThemedText>
              <TextInput
                style={styles.instructionsInput}
                placeholder="Nhập địa chỉ giao hàng..."
                placeholderTextColor="#999"
                multiline
                value={deliveryAddress}
                onChangeText={(text) => {
                  setDeliveryAddress(text);
                }}
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

            <View style={styles.instructionsContainer}>
              <ThemedText style={styles.sectionTitle}>
                Ghi chú đơn hàng
              </ThemedText>
              <TextInput
                style={styles.instructionsInput}
                placeholder="Ghi chú thêm về đơn hàng của bạn..."
                placeholderTextColor="#999"
                multiline
                value={orderNote}
                onChangeText={setOrderNote}
              />
            </View>
          </ScrollView>

          <View style={[styles.checkoutContainer, { marginBottom: 70 }]}>
            <TouchableOpacity
              style={styles.checkoutButton}
              onPress={handleCheckout}
              disabled={items.length === 0}
            >
              <ThemedText style={styles.checkoutButtonText}>
                Thanh toán
              </ThemedText>
            </TouchableOpacity>
          </View>
        </>
      )}
    </ThemedView>
  );
}
