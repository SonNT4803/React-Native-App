import { styles } from "@/assets/detail/styles";
import { ThemedText } from "@/components/ThemedText";
import { formartPrice } from "@/constants/FormatPrice";
import { Food } from "@/models/food.models";
import { useCartStore } from "@/services/cart.services";
import { FoodService } from "@/services/food.services";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  ScrollView,
  TouchableOpacity,
  View,
} from "react-native";
import Toast from "react-native-toast-message";

export default function FoodDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [food, setFood] = useState<Food | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [recommendedFoods, setRecommendedFoods] = useState<Food[]>([]);
  const router = useRouter();
  const { addToCart } = useCartStore();

  useEffect(() => {
    if (id) {
      loadFoodDetail(parseInt(id));
      loadRecommendedFoods();
    }
  }, [id]);

  const loadFoodDetail = async (foodId: number) => {
    try {
      setLoading(true);
      const data = await FoodService.getFoodById(foodId);
      setFood(data);
    } catch (error) {
      console.error("Error loading food detail:", error);
    } finally {
      setLoading(false);
    }
  };

  const loadRecommendedFoods = async () => {
    try {
      const data = await FoodService.getForYouFoods(3);
      setRecommendedFoods(data);
    } catch (error) {
      console.error("Error loading recommended foods:", error);
    }
  };

  const handleGoBack = () => {
    router.back();
  };

  const navigateToHome = () => {
    router.push("/");
  };

  const handleAddToCart = () => {
    if (food) {
      const foodWithQuantity = { ...food, quantity };

      addToCart(foodWithQuantity, (name) => {
        Toast.show({
          type: "success",
          text1: "Thêm vào giỏ hàng thành công",
          text2: `Đã thêm ${quantity} ${name} vào giỏ hàng`,
          position: "bottom",
          visibilityTime: 2000,
        });

        // Navigate to cart screen after adding item
        router.push("/cart");
      });
    }
  };

  const navigateToFood = (foodId: number) => {
    router.push(`/detail?id=${foodId}`);
  };

  const renderRecommendedItem = ({ item }: { item: Food }) => (
    <TouchableOpacity
      style={styles.recommendedItem}
      onPress={() => navigateToFood(item.id)}
    >
      <Image
        source={{ uri: item.image || "https://placeholder.com/400" }}
        style={styles.recommendedImage}
      />
      <View style={styles.recommendedInfo}>
        <ThemedText style={styles.recommendedName} numberOfLines={1}>
          {item.name}
        </ThemedText>
        <ThemedText style={styles.recommendedPrice}>
          {formartPrice(item.price)}
        </ThemedText>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FF6B6B" />
      </View>
    );
  }

  if (!food) {
    return (
      <View style={styles.errorContainer}>
        <ThemedText style={styles.errorText}>
          Food item not found or error loading data
        </ThemedText>
        <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
          <ThemedText style={styles.backButtonText}>Go Back</ThemedText>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={handleGoBack}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.homeBtn} onPress={navigateToHome}>
          <Ionicons name="home-outline" size={24} color="#333" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.favoriteBtn}>
          <Ionicons name="heart-outline" size={24} color="#FF6B6B" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Food Image */}
        <Image
          source={{ uri: food.image || "https://placeholder.com/400" }}
          style={styles.foodImage}
        />

        {/* Content Container with rounded corners */}
        <View style={styles.contentContainer}>
          {/* Rating & Price Section */}
          <View style={styles.ratingPriceContainer}>
            <View style={styles.ratingContainer}>
              <Ionicons name="star" size={18} color="#FFD700" />
              <ThemedText style={styles.ratingText}>{4.8}</ThemedText>
            </View>
            <ThemedText style={styles.priceText}>
              {formartPrice(food.price)}
            </ThemedText>
          </View>

          {/* Food Name */}
          <ThemedText style={styles.foodName}>{food.name}</ThemedText>

          {/* Food Description */}
          <ThemedText style={styles.description}>
            {food.description || "No description available"}
          </ThemedText>

          {/* Food Features Section */}
          <View style={styles.featuresContainer}>
            <View style={styles.featureItem}>
              <Ionicons name="flame-outline" size={22} color="#FF6B6B" />
              <ThemedText style={styles.featureText}>High Protein</ThemedText>
            </View>
            <View style={styles.featureItem}>
              <Ionicons name="leaf-outline" size={22} color="#4CAF50" />
              <ThemedText style={styles.featureText}>
                Fresh Ingredients
              </ThemedText>
            </View>
            <View style={styles.featureItem}>
              <Ionicons name="time-outline" size={22} color="#FFC107" />
              <ThemedText style={styles.featureText}>15-20 min</ThemedText>
            </View>
          </View>

          {/* Recommended Foods Section */}
          {recommendedFoods.length > 0 && (
            <View style={styles.recommendedContainer}>
              <ThemedText style={styles.sectionTitle}>
                Có thể bạn cũng thích
              </ThemedText>
              <FlatList
                data={recommendedFoods}
                renderItem={renderRecommendedItem}
                keyExtractor={(item) => item.id.toString()}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.recommendedList}
              />
            </View>
          )}
        </View>
      </ScrollView>

      <View style={styles.bottomBar}>
        <TouchableOpacity
          style={styles.addToCartButton}
          onPress={handleAddToCart}
        >
          <ThemedText style={styles.addToCartText}>Add to Cart</ThemedText>
        </TouchableOpacity>
      </View>
    </View>
  );
}
