import { CategoryItem } from "@/components/home/CategoryItem";
import { DealOfDay } from "@/components/home/DealOfDay";
import { Header } from "@/components/home/Header";
import { PopularItem } from "@/components/home/PopularItem";
import { SearchBar } from "@/components/home/SearchBar";
import { styles } from "@/components/home/styles";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Category } from "@/models/category.models";
import { CategoryService } from "@/services/category.services";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, View } from "react-native";

export default function HomeScreen() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await CategoryService.getAllCategories();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <ThemedView style={styles.container}>
      <Header />
      <SearchBar />

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Categories */}
        <View style={styles.categoriesContainer}>
          {loading ? (
            <ActivityIndicator size="large" />
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

        <DealOfDay />

        {/* Popular */}
        <View style={styles.sectionContainer}>
          <ThemedText style={styles.sectionTitle}>Popular</ThemedText>
          <View style={styles.popularContainer}>
            <PopularItem title="Maharaja Mac" />
            <PopularItem title="Cheese Pizza" />
          </View>
        </View>
      </ScrollView>
    </ThemedView>
  );
}
