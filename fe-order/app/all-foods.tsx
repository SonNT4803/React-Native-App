import React, { useEffect, useState } from "react";
import {
  View,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { styles } from "@/components/home/styles";
import { FoodService } from "@/services/food.services";
import { Food } from "@/models/food.models";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function AllFoodsScreen() {
  const [foods, setFoods] = useState<Food[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    loadAllFoods();
  }, []);

  const loadAllFoods = async () => {
    try {
      const data = await FoodService.getAllFoods();
      setFoods(data);
    } catch (error) {
      console.error("Error loading foods:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price: number) => {
    return price.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });
  };

  const handleFoodPress = (foodId: number) => {
    // router.push(`/food/${foodId}`);
  };

  const renderFoodItem = ({ item }: { item: Food }) => (
    <TouchableOpacity
      style={styles.foodCard}
      onPress={() => handleFoodPress(item.id)}
      activeOpacity={0.7}
    >
      <Image
        source={{ uri: item.image || "https://placeholder.com/150" }}
        style={styles.foodCardImage}
      />
      <View style={styles.foodCardContent}>
        <ThemedText style={styles.foodCardName} numberOfLines={1}>
          {item.name}
        </ThemedText>
        <ThemedText style={styles.foodCardDescription} numberOfLines={2}>
          {item.description || "Không có mô tả"}
        </ThemedText>
        <View style={styles.foodCardFooter}>
          <ThemedText style={styles.foodCardPrice}>
            {formatPrice(item.price)}
          </ThemedText>
          <TouchableOpacity style={styles.addToCartButton}>
            <Ionicons name="add" size={18} color="#FFF" />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <ThemedView style={styles.productsContainer}>
      <View style={styles.productsHeader}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <ThemedText style={styles.productsTitle}>Tất cả món ăn</ThemedText>
        <View style={{ width: 40 }} />
      </View>

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#FF6B6B" />
        </View>
      ) : (
        <FlatList
          data={foods}
          renderItem={renderFoodItem}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          contentContainerStyle={styles.productsList}
          columnWrapperStyle={styles.productsRow}
          showsVerticalScrollIndicator={false}
        />
      )}
    </ThemedView>
  );
}
