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

export const ForYouFood = () => {
  const [forYouFoods, setForYouFoods] = useState<Food[]>([]);
  const [loading, setLoading] = useState(true);
  const [showRightIndicator, setShowRightIndicator] = useState(true);
  const [showLeftIndicator, setShowLeftIndicator] = useState(false);
  const scrollX = useRef(new Animated.Value(0)).current;
  const scrollViewRef = useRef<ScrollView>(null);
  const router = useRouter();

  useEffect(() => {
    loadForYouFoods();
  }, []);

  const loadForYouFoods = async () => {
    try {
      const data = await FoodService.getForYouFoods();
      setForYouFoods(data);
    } catch (error) {
      console.error("Error loading for you foods:", error);
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

  const handleFoodPress = (foodId: number) => {
    // router.push(`/food/${foodId}`);
  };

  const handleSeeAllPress = () => {
    router.push("/all-foods");
  };

  const formatPrice = (price: number) => {
    return `${price.toLocaleString("vi-VN")}đ`;
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
        <ThemedText style={styles.sectionTitle}>Dành cho bạn</ThemedText>
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
          {forYouFoods.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.bestSellerCard}
              onPress={() => handleFoodPress(item.id)}
              activeOpacity={0.7}
            >
              <Image
                source={{ uri: item.image || "https://placeholder.com/150" }}
                style={styles.foodImage}
              />
              <View style={styles.foodInfo}>
                <ThemedText style={styles.foodName} numberOfLines={1}>
                  {item.name}
                </ThemedText>
                <View style={styles.priceAddContainer}>
                  <ThemedText style={styles.foodPrice}>
                    {formatPrice(item.price)}
                  </ThemedText>
                  <TouchableOpacity style={styles.addButton}>
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
