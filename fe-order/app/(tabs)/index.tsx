import { BestSeller } from "@/components/home/BestSeller";
import { CategoryItem } from "@/components/home/CategoryItem";
import { Header } from "@/components/home/Header";
import { PopularItem } from "@/components/home/PopularItem";
import { RecommendedFood } from "@/components/home/RecommendedFood";
import { SearchBar } from "@/components/home/SearchBar";
import { styles } from "@/components/home/styles";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Category } from "@/models/category.models";
import { CategoryService } from "@/services/category.services";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  View,
  RefreshControl,
} from "react-native";
import { ForYouFood } from "@/components/home/ForYouFood";

export default function HomeScreen() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const data = await CategoryService.getAllCategories();
      setCategories(data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      await fetchCategories();
    } finally {
      setRefreshing(false);
    }
  };

  return (
    <ThemedView style={styles.container}>
      <Header />
      <SearchBar />

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 80 }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={["#FF6B6B"]}
          />
        }
      >
        {/* Categories */}
        <View style={styles.sectionContainer}>
          <View style={styles.headerContainer}>
            <ThemedText style={styles.sectionTitle}>Danh mục</ThemedText>
          </View>
          <View style={styles.categoriesContainer}>
            {loading ? (
              <ActivityIndicator size="large" color="#FF6B6B" />
            ) : categories.length > 0 ? (
              categories.map((category) => (
                <CategoryItem
                  key={category.id}
                  title={category.name}
                  imageSource={category.image}
                  onPress={() =>
                    console.log(`Selected category: ${category.name}`)
                  }
                />
              ))
            ) : (
              <ThemedText>Không có danh mục nào</ThemedText>
            )}
          </View>
        </View>

        <BestSeller />

        <RecommendedFood />

        <ForYouFood />

        {/* Popular */}
        <View style={styles.sectionContainer}>
          <View style={styles.headerContainer}>
            <ThemedText style={styles.sectionTitle}>Popular</ThemedText>
          </View>
          <View style={{ paddingHorizontal: 16, marginTop: 8 }}>
            <PopularItem title="Maharaja Mac" />
            <PopularItem title="Cheese Pizza" />
          </View>
        </View>
      </ScrollView>
    </ThemedView>
  );
}
