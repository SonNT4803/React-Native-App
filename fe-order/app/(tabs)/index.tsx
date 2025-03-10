import React from "react";
import { View, ScrollView } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { Header } from "@/components/home/Header";
import { SearchBar } from "@/components/home/SearchBar";
import { CategoryItem } from "@/components/home/CategoryItem";
import { DealOfDay } from "@/components/home/DealOfDay";
import { PopularItem } from "@/components/home/PopularItem";
import { styles } from "@/components/home/styles";
import { ThemedText } from "@/components/ThemedText";

export default function HomeScreen() {
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
          <CategoryItem title="Combo" />
          <CategoryItem title="Pizza" />
          <CategoryItem title="Burger" />
          <CategoryItem title="Shakes" />
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
