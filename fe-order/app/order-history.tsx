import { styles } from "@/assets/orderhistory/styles";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { formatCurrency } from "@/constants/formatCurrency";
import { formatDate } from "@/constants/formatDate";
import { OrderHistory } from "@/models/order.models";
import { orderService } from "@/services/order.services";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Image,
  RefreshControl,
  ScrollView,
  TextInput,
  TouchableOpacity,
  View,
  Animated,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from "react-native";

export default function OrderHistoryScreen() {
  const router = useRouter();
  const [orders, setOrders] = useState<OrderHistory[]>([]);
  const [allOrders, setAllOrders] = useState<OrderHistory[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  // Thêm states mới
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [showScrollToTop, setShowScrollToTop] = useState(false);

  const scrollViewRef = useRef<ScrollView>(null);
  const scrollY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    loadOrderHistory();
  }, []);

  useEffect(() => {
    filterOrders();
  }, [activeFilter, searchQuery, allOrders]);

  const loadOrderHistory = async (isLoadMore = false) => {
    try {
      if (!isLoadMore) {
        setLoading(true);
      }
      const currentPage = isLoadMore ? page : 1;
      const response = await orderService.getOrderHistory(currentPage);

      if (response.statusCode === 200) {
        const newOrders = response.data;
        if (isLoadMore) {
          setAllOrders([...allOrders, ...newOrders]);
        } else {
          setAllOrders(newOrders);
        }
        setHasMore(newOrders.length === 10); // Assuming 10 items per page
        if (isLoadMore) {
          setPage(currentPage + 1);
        } else {
          setPage(2);
        }
      }
    } catch (error) {
      console.error("Error loading order history:", error);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  const filterOrders = () => {
    let filteredOrders = [...allOrders];

    // Lọc theo trạng thái
    if (activeFilter !== "all") {
      filteredOrders = filteredOrders.filter(
        (order) => order.status.toLowerCase() === activeFilter.toLowerCase()
      );
    }

    // Lọc theo tìm kiếm
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      filteredOrders = filteredOrders.filter(
        (order) =>
          order.id.toString().includes(query) ||
          (order.deliveryAddress &&
            order.deliveryAddress.toLowerCase().includes(query)) ||
          order.orderDetails.some((detail) =>
            detail.food.name.toLowerCase().includes(query)
          )
      );
    }

    setOrders(filteredOrders);
  };

  const handleLoadMore = async () => {
    if (loadingMore || !hasMore) return;
    setLoadingMore(true);
    await loadOrderHistory(true);
  };

  const onRefresh = async () => {
    setRefreshing(true);
    setPage(1);
    setActiveFilter("all");
    setSearchQuery("");
    await loadOrderHistory();
    setRefreshing(false);
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "pending":
        return "#FFA500"; // Orange
      case "confirmed":
        return "#3498DB"; // Blue
      case "delivering":
        return "#9B59B6"; // Purple
      case "completed":
        return "#2ECC71"; // Green
      case "cancelled":
        return "#E74C3C"; // Red
      default:
        return "#95A5A6"; // Gray
    }
  };

  const getStatusText = (status: string) => {
    switch (status.toLowerCase()) {
      case "pending":
        return "Đang chờ";
      case "confirmed":
        return "Đã xác nhận";
      case "delivering":
        return "Đang giao";
      case "completed":
        return "Hoàn thành";
      case "cancelled":
        return "Đã hủy";
      default:
        return status;
    }
  };

  const handleGoBack = () => {
    router.back();
  };

  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter);
  };

  const handleSearchChange = (text: string) => {
    setSearchQuery(text);
  };

  const scrollToTop = () => {
    scrollViewRef.current?.scrollTo({ y: 0, animated: true });
  };

  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
    {
      useNativeDriver: false,
      listener: (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const offsetY = event.nativeEvent.contentOffset.y;
        setShowScrollToTop(offsetY > 300);
      },
    }
  );

  if (loading) {
    return (
      <ThemedView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FF6B6B" />
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <ThemedText style={styles.headerTitle}>Lịch sử đơn hàng</ThemedText>
        <View style={{ width: 24 }} />
      </View>

      {/* Thêm thanh tìm kiếm */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Tìm kiếm đơn hàng..."
          value={searchQuery}
          onChangeText={handleSearchChange}
        />
      </View>

      {/* Thêm bộ lọc */}
      <View style={styles.filterContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.filterScrollView}
        >
          <TouchableOpacity
            style={[
              styles.filterButton,
              activeFilter === "all" && styles.filterButtonActive,
            ]}
            onPress={() => handleFilterChange("all")}
          >
            <ThemedText
              style={[
                styles.filterButtonText,
                activeFilter === "all" && styles.filterButtonTextActive,
              ]}
            >
              Tất cả
            </ThemedText>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.filterButton,
              activeFilter === "pending" && styles.filterButtonActive,
            ]}
            onPress={() => handleFilterChange("pending")}
          >
            <ThemedText
              style={[
                styles.filterButtonText,
                activeFilter === "pending" && styles.filterButtonTextActive,
              ]}
            >
              Đang chờ
            </ThemedText>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.filterButton,
              activeFilter === "confirmed" && styles.filterButtonActive,
            ]}
            onPress={() => handleFilterChange("confirmed")}
          >
            <ThemedText
              style={[
                styles.filterButtonText,
                activeFilter === "confirmed" && styles.filterButtonTextActive,
              ]}
            >
              Đã xác nhận
            </ThemedText>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.filterButton,
              activeFilter === "delivering" && styles.filterButtonActive,
            ]}
            onPress={() => handleFilterChange("delivering")}
          >
            <ThemedText
              style={[
                styles.filterButtonText,
                activeFilter === "delivering" && styles.filterButtonTextActive,
              ]}
            >
              Đang giao
            </ThemedText>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.filterButton,
              activeFilter === "completed" && styles.filterButtonActive,
            ]}
            onPress={() => handleFilterChange("completed")}
          >
            <ThemedText
              style={[
                styles.filterButtonText,
                activeFilter === "completed" && styles.filterButtonTextActive,
              ]}
            >
              Hoàn thành
            </ThemedText>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.filterButton,
              activeFilter === "cancelled" && styles.filterButtonActive,
            ]}
            onPress={() => handleFilterChange("cancelled")}
          >
            <ThemedText
              style={[
                styles.filterButtonText,
                activeFilter === "cancelled" && styles.filterButtonTextActive,
              ]}
            >
              Đã hủy
            </ThemedText>
          </TouchableOpacity>
        </ScrollView>
      </View>

      {orders.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Ionicons name="receipt-outline" size={80} color="#ccc" />
          <ThemedText style={styles.emptyText}>
            {searchQuery || activeFilter !== "all"
              ? "Không tìm thấy đơn hàng nào phù hợp"
              : "Bạn chưa có đơn hàng nào"}
          </ThemedText>
        </View>
      ) : (
        <ScrollView
          ref={scrollViewRef}
          style={styles.scrollView}
          contentContainerStyle={{ paddingVertical: 8 }}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          onScroll={handleScroll}
          scrollEventThrottle={400}
        >
          {orders.map((order) => (
            <View key={order.id} style={styles.orderCard}>
              <View style={styles.orderHeader}>
                <ThemedText style={styles.orderId}>
                  Đơn hàng #{order.id}
                </ThemedText>
                <View
                  style={[
                    styles.statusBadge,
                    { backgroundColor: getStatusColor(order.status) },
                  ]}
                >
                  <ThemedText style={styles.statusText}>
                    {getStatusText(order.status)}
                  </ThemedText>
                </View>
              </View>

              <View style={styles.orderInfo}>
                <ThemedText style={styles.orderDate}>
                  Ngày đặt: {formatDate(order.orderDate)}
                </ThemedText>
                {order.deliveryAddress && (
                  <ThemedText style={styles.orderAddress}>
                    Địa chỉ: {order.deliveryAddress}
                  </ThemedText>
                )}
                {order.note && (
                  <ThemedText style={styles.orderNote}>
                    Ghi chú: {order.note}
                  </ThemedText>
                )}
              </View>

              <View style={styles.orderItems}>
                {order.orderDetails.map((detail) => (
                  <View key={detail.id} style={styles.orderItem}>
                    <Image
                      source={{ uri: detail.food.image }}
                      style={styles.foodImage}
                    />
                    <View style={styles.foodInfo}>
                      <ThemedText style={styles.foodName}>
                        {detail.food.name}
                      </ThemedText>
                      <ThemedText style={styles.foodPrice}>
                        {formatCurrency(detail.price)} x {detail.quantity}
                      </ThemedText>
                    </View>
                    <ThemedText style={styles.itemTotal}>
                      {formatCurrency(Number(detail.price) * detail.quantity)}
                    </ThemedText>
                  </View>
                ))}
              </View>

              <View style={styles.orderFooter}>
                <ThemedText style={styles.totalLabel}>Tổng cộng:</ThemedText>
                <ThemedText style={styles.totalAmount}>
                  {formatCurrency(order.totalAmount)}
                </ThemedText>
              </View>
            </View>
          ))}

          {loadingMore && (
            <View style={styles.loadMoreContainer}>
              <ActivityIndicator size="small" color="#FF6B6B" />
            </View>
          )}
        </ScrollView>
      )}

      {showScrollToTop && (
        <TouchableOpacity
          style={styles.scrollToTopButton}
          onPress={scrollToTop}
        >
          <Ionicons name="arrow-up" size={24} color="#fff" />
        </TouchableOpacity>
      )}
    </ThemedView>
  );
}
