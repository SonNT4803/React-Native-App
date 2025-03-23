import React, { useEffect, useState } from "react";
import {
  View,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  Dimensions,
} from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { FoodService } from "@/services/food.services";
import { Food } from "@/models/food.models";
import { Ionicons } from "@expo/vector-icons";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useCartStore } from "@/services/cart.services";
import { showMessage } from "react-native-flash-message";
import * as Animatable from "react-native-animatable";
import Toast from "react-native-toast-message";
import { formartPrice } from "@/constants/FormatPrice";
import { CategoryService } from "@/services/category.services";

const { width } = Dimensions.get("window");
const cardWidth = (width - 48) / 2;

export default function AllFoodsScreen() {
  const [foods, setFoods] = useState<Food[]>([]);
  const [loading, setLoading] = useState(true);
  const [addingToCart, setAddingToCart] = useState<number | null>(null);
  const router = useRouter();
  const { addToCart } = useCartStore();
  const { categoryId, categoryName } = useLocalSearchParams<{
    categoryId: string;
    categoryName: string;
  }>();

  useEffect(() => {
    if (categoryId) {
      loadFoodsByCategory(Number(categoryId));
    } else {
      loadAllFoods();
    }
  }, [categoryId]);

  const loadAllFoods = async () => {
    try {
      const data = await FoodService.getAllFoods();
      setFoods(data);
    } catch (error) {
      console.error("Error loading foods:", error);
      showMessage({
        message: "Không thể tải danh sách món ăn",
        description: "Vui lòng thử lại sau",
        type: "danger",
      });
    } finally {
      setLoading(false);
    }
  };

  const loadFoodsByCategory = async (id: number) => {
    try {
      const data = await CategoryService.getFoodsByCategory(id);
      setFoods(data);
    } catch (error) {
      console.error("Error loading foods by category:", error);
      showMessage({
        message: "Không thể tải danh sách món ăn theo danh mục",
        description: "Vui lòng thử lại sau",
        type: "danger",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleFoodPress = (foodId: number) => {
    router.push(`/detail?id=${foodId}`);
  };

  const handleAddToCart = (food: Food) => {
    setAddingToCart(food.id);

    // Thêm vào giỏ hàng giống như trong RecommendedFood.tsx
    addToCart(food, (name) => {
      Toast.show({
        type: "success",
        text1: "Thêm vào giỏ hàng thành công",
        text2: `Đã thêm ${name} vào giỏ hàng`,
        position: "bottom",
        visibilityTime: 2000,
      });
    });

    // Xóa hiệu ứng sau 500ms
    setTimeout(() => {
      setAddingToCart(null);
    }, 500);
  };

  const renderFoodItem = ({ item }: { item: Food }) => (
    <Animatable.View
      animation="fadeIn"
      duration={500}
      delay={200}
      style={styles.foodCardContainer}
    >
      <TouchableOpacity
        style={styles.foodCard}
        onPress={() => handleFoodPress(item.id)}
        activeOpacity={0.9}
      >
        <Image
          source={{ uri: item.image || "https://via.placeholder.com/150" }}
          style={styles.foodCardImage}
          resizeMode="cover"
        />
        <View style={styles.foodCardBadge}>
          <ThemedText style={styles.foodCardBadgeText}>Hot</ThemedText>
        </View>
        <View style={styles.foodCardContent}>
          <ThemedText style={styles.foodCardName} numberOfLines={1}>
            {item.name}
          </ThemedText>
          <ThemedText style={styles.foodCardDescription} numberOfLines={2}>
            {item.description || "Không có mô tả"}
          </ThemedText>
          <View style={styles.foodCardFooter}>
            <ThemedText style={styles.foodCardPrice}>
              {formartPrice(item.price)}
            </ThemedText>
            <TouchableOpacity
              style={styles.addToCartButton}
              onPress={(e) => {
                e.stopPropagation(); // Ngăn chặn sự kiện lan tỏa đến TouchableOpacity cha
                handleAddToCart(item);
              }}
            >
              {addingToCart === item.id ? (
                <ActivityIndicator size="small" color="#FFF" />
              ) : (
                <Ionicons name="add" size={20} color="#FFF" />
              )}
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    </Animatable.View>
  );

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
          {categoryName ? categoryName : "Tất cả món ăn"}
        </ThemedText>
        <TouchableOpacity
          style={styles.cartButton}
          onPress={() => router.push("/cart")}
        >
          <Ionicons name="cart-outline" size={24} color="#FF6B6B" />
        </TouchableOpacity>
      </View>

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#FF6B6B" />
          <ThemedText style={styles.loadingText}>Đang tải món ăn...</ThemedText>
        </View>
      ) : foods.length > 0 ? (
        <FlatList
          data={foods}
          renderItem={renderFoodItem}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          contentContainerStyle={styles.foodsList}
          columnWrapperStyle={styles.foodsRow}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View style={styles.loadingContainer}>
          <ThemedText style={styles.loadingText}>
            Không có món ăn nào
          </ThemedText>
        </View>
      )}
      <Toast />
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
  cartButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F5F5F5",
    justifyContent: "center",
    alignItems: "center",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#666",
  },
  foodsList: {
    padding: 16,
  },
  foodsRow: {
    justifyContent: "space-between",
  },
  foodCardContainer: {
    width: cardWidth,
    marginBottom: 16,
  },
  foodCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    borderWidth: 1,
    borderColor: "#F0F0F0",
  },
  foodCardImage: {
    width: "100%",
    height: 120,
    backgroundColor: "#F5F5F5",
  },
  foodCardBadge: {
    position: "absolute",
    top: 8,
    left: 8,
    backgroundColor: "#FF6B6B",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  foodCardBadgeText: {
    color: "#FFFFFF",
    fontSize: 10,
    fontWeight: "bold",
  },
  foodCardContent: {
    padding: 12,
    backgroundColor: "#FAFAFA",
  },
  foodCardName: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
    color: "#333333",
  },
  foodCardDescription: {
    fontSize: 12,
    color: "#666",
    marginBottom: 8,
    height: 32,
  },
  foodCardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 4,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: "#F0F0F0",
  },
  foodCardPrice: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FF6B6B",
  },
  addToCartButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#FF6B6B",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
});
