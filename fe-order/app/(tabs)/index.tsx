import { BestSeller } from "@/components/home/BestSeller";
import { CategoryItem } from "@/components/home/CategoryItem";
import { Header } from "@/components/home/Header";
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
  FlatList,
} from "react-native";
import { ForYouFood } from "@/components/home/ForYouFood";
import { useRouter } from "expo-router";

export default function HomeScreen() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const data = await CategoryService.getAllCategories();
      console.log(data);
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
          {loading ? (
            <ActivityIndicator size="large" color="#FF6B6B" />
          ) : categories.length > 0 ? (
            <FlatList
              data={categories}
              renderItem={({ item }) => (
                <CategoryItem
                  key={item.id}
                  title={item.name}
                  imageSource={item.image}
                  onPress={() =>
                    router.push({
                      pathname: "/all-foods",
                      params: { categoryId: item.id, categoryName: item.name },
                    })
                  }
                />
              )}
              keyExtractor={(item) => item.id.toString()}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.categoriesContainer}
            />
          ) : (
            <ThemedText>Không có danh mục nào</ThemedText>
          )}
        </View>

        <BestSeller />

        <RecommendedFood />

        <ForYouFood />
      </ScrollView>
    </ThemedView>
  );
}
