import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Image,
  Text,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { FoodService } from "@/services/food.services";
import { Food } from "@/models/food.models";
import { ThemedText } from "@/components/ThemedText";
import { formartPrice } from "@/constants/FormatPrice";

export const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Food[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (searchQuery.trim().length > 0) {
      searchFoods();
    } else {
      setSearchResults([]);
      setShowDropdown(false);
    }
  }, [searchQuery]);

  const searchFoods = async () => {
    if (searchQuery.trim().length === 0) return;

    setLoading(true);
    try {
      // Replace with actual food search API call
      const allFoods = await FoodService.getAllFoods();
      const filtered = allFoods.filter((food) =>
        food.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSearchResults(filtered);
      setShowDropdown(filtered.length > 0);
    } catch (error) {
      console.error("Error searching foods:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleFoodPress = (foodId: number) => {
    setShowDropdown(false);
    setSearchQuery("");
    router.push(`/detail?id=${foodId}`);
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    setSearchResults([]);
    setShowDropdown(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Ionicons
            name="search-outline"
            size={18}
            color="#999"
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Tìm kiếm món ăn yêu thích..."
            placeholderTextColor="#999"
            value={searchQuery}
            onChangeText={setSearchQuery}
            onFocus={() =>
              searchQuery.trim().length > 0 && setShowDropdown(true)
            }
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity
              onPress={handleClearSearch}
              style={styles.clearButton}
            >
              <Ionicons name="close-circle" size={18} color="#999" />
            </TouchableOpacity>
          )}
        </View>
        <TouchableOpacity style={styles.filterButton}>
          <Ionicons name="filter" size={20} color="#FF6B6B" />
        </TouchableOpacity>
      </View>

      {showDropdown && (
        <View style={styles.dropdownContainer}>
          {loading ? (
            <View style={styles.loadingContainer}>
              <ThemedText style={styles.messageText}>
                Đang tìm kiếm...
              </ThemedText>
            </View>
          ) : searchResults.length > 0 ? (
            <FlatList
              data={searchResults}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.resultItem}
                  onPress={() => handleFoodPress(item.id)}
                >
                  <Image
                    source={{ uri: item.image || "https://placeholder.com/80" }}
                    style={styles.resultImage}
                  />
                  <View style={styles.resultInfo}>
                    <ThemedText style={styles.resultName} numberOfLines={1}>
                      {item.name}
                    </ThemedText>
                    <ThemedText style={styles.resultPrice}>
                      {formartPrice(item.price)}
                    </ThemedText>
                  </View>
                </TouchableOpacity>
              )}
              style={styles.resultsList}
              contentContainerStyle={{ paddingVertical: 8 }}
              maxToRenderPerBatch={10}
              initialNumToRender={5}
              showsVerticalScrollIndicator={false}
            />
          ) : (
            <View style={styles.noResultsContainer}>
              <ThemedText style={styles.messageText}>
                Không tìm thấy món ăn
              </ThemedText>
            </View>
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    zIndex: 100,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 46,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: "#333",
    height: "100%",
  },
  clearButton: {
    padding: 4,
  },
  filterButton: {
    marginLeft: 12,
    width: 46,
    height: 46,
    backgroundColor: "#F5F5F5",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  dropdownContainer: {
    position: "absolute",
    top: 70,
    left: 16,
    right: 16,
    backgroundColor: "white",
    borderRadius: 12,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    zIndex: 1000,
    maxHeight: 300,
    overflow: "hidden",
  },
  resultsList: {
    flexGrow: 0,
  },
  resultItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  resultImage: {
    width: 50,
    height: 50,
    borderRadius: 8,
    marginRight: 12,
  },
  resultInfo: {
    flex: 1,
  },
  resultName: {
    fontSize: 14,
    fontWeight: "500",
    color: "#333",
    marginBottom: 4,
  },
  resultPrice: {
    fontSize: 12,
    color: "#FF6B6B",
    fontWeight: "500",
  },
  loadingContainer: {
    padding: 20,
    alignItems: "center",
  },
  noResultsContainer: {
    padding: 20,
    alignItems: "center",
  },
  messageText: {
    fontSize: 14,
    color: "#666",
  },
});
