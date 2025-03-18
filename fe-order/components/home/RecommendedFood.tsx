import React, { useEffect, useState, useRef } from "react";
import {
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Animated,
} from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { styles } from "./styles";
import { FoodService } from "@/services/food.services";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Food } from "@/models/food.models";
import { useCartStore } from "@/services/cart.services";
import Toast from "react-native-toast-message";
import { formartPrice } from "@/constants/FormatPrice";

export const RecommendedFood = () => {
  const [recommendedFoods, setRecommendedFoods] = useState<Food[]>([]);
  const [loading, setLoading] = useState(true);
  const [showRightIndicator, setShowRightIndicator] = useState(true);
  const [showLeftIndicator, setShowLeftIndicator] = useState(false);
  const scrollX = useRef(new Animated.Value(0)).current;
  const scrollViewRef = useRef<ScrollView>(null);
  const router = useRouter();
  const { addToCart } = useCartStore();

  useEffect(() => {
    loadRecommendedFoods();
  }, []);

  const loadRecommendedFoods = async () => {
    try {
      const data = await FoodService.getRecommendedFoods();
      setRecommendedFoods(data);
    } catch (error) {
      console.error("Error loading recommended foods:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleScroll = (event: any) => {
    const xOffset = event.nativeEvent.contentOffset.x;
    const contentWidth = event.nativeEvent.contentSize.width;
    const layoutWidth = event.nativeEvent.layoutMeasurement.width;

    setShowLeftIndicator(xOffset > 10);
    setShowRightIndicator(xOffset < contentWidth - layoutWidth - 10);
  };

  const handleFoodPress = (food: Food) => {
    addToCart(food, (name) => {
      Toast.show({
        type: "success",
        text1: "Thêm vào giỏ hàng thành công",
        text2: `Đã thêm ${name} vào giỏ hàng`,
        position: "bottom",
        visibilityTime: 2000,
      });
    });
  };

  // Update the handleAddToCart function to show Toast notification
  const handleAddToCart = (food: Food) => {
    addToCart(food, (name) => {
      Toast.show({
        type: "success",
        text1: "Thêm vào giỏ hàng thành công",
        text2: `Đã thêm ${name} vào giỏ hàng`,
        position: "bottom",
        visibilityTime: 2000,
      });
    });
  };

  const handleSeeAllPress = () => {
    router.push("/all-foods");
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FF6B6B" />
      </View>
    );
  }

  return (
    <View style={styles.sectionContainer}>
      <View style={styles.headerContainer}>
        <ThemedText style={styles.sectionTitle}>Món ngon phải thử</ThemedText>
        <TouchableOpacity onPress={handleSeeAllPress}>
          <ThemedText style={styles.seeAll}>Xem tất cả</ThemedText>
        </TouchableOpacity>
      </View>

      <View style={styles.scrollContainer}>
        {showLeftIndicator && (
          <View style={[styles.scrollIndicator, styles.leftIndicator]}>
            <Ionicons name="chevron-back" size={24} color="#FF6B6B" />
          </View>
        )}

        <ScrollView
          ref={scrollViewRef}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollViewContent}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            {
              useNativeDriver: false,
              listener: handleScroll,
            }
          )}
          scrollEventThrottle={16}
        >
          {recommendedFoods.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.recommendedCard}
              onPress={() => handleFoodPress(item)}
              activeOpacity={0.7}
            >
              <Image
                source={{ uri: item.image || "https://placeholder.com/150" }}
                style={styles.recommendedImage}
              />
              <View style={styles.recommendedInfo}>
                <ThemedText style={styles.recommendedName} numberOfLines={2}>
                  {item.name}
                </ThemedText>
                <View style={styles.priceAddContainer}>
                  <ThemedText style={styles.recommendedPrice}>
                    {formartPrice(item.price)}
                  </ThemedText>
                  <TouchableOpacity
                    style={styles.addButton}
                    onPress={(e) => {
                      e.stopPropagation(); // Prevent triggering the parent TouchableOpacity
                      handleAddToCart(item);
                    }}
                  >
                    <Ionicons name="add" size={20} color="#2C3E50" />
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {showRightIndicator && (
          <View style={[styles.scrollIndicator, styles.rightIndicator]}>
            <Ionicons name="chevron-forward" size={24} color="#FF6B6B" />
          </View>
        )}
      </View>
    </View>
  );
};
