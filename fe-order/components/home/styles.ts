import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 20,
    paddingTop: 60,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#f0f0f0", // Placeholder color
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    borderRadius: 25,
    paddingHorizontal: 15,
    marginBottom: 20,
    height: 45,
  },
  searchIcon: {
    width: 20,
    height: 20,
  },
  searchInput: {
    flex: 1,
    height: "100%",
    fontSize: 16,
    color: "#333",
  },
  scrollView: {
    flex: 1,
  },
  categoriesContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 25,
  },
  categoryItem: {
    alignItems: "center",
  },
  categoryImage: {
    width: 70,
    height: 70,
    borderRadius: 15,
    marginBottom: 8,
    backgroundColor: "#f0f0f0", // Placeholder color
  },
  categoryText: {
    fontSize: 14,
    color: "#000",
  },
  // Update the section container to remove excessive padding
  sectionContainer: {
    marginVertical: 16,
    width: "100%",
  },
  // Improve the header container with better spacing
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
    paddingHorizontal: 16,
  },
  // Make section titles more prominent
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  // Make the "See All" text more noticeable
  seeAll: {
    fontSize: 14,
    color: "#FF6B6B",
    fontWeight: "500",
  },
  // Improve the scroll container to take full width
  scrollContainer: {
    position: "relative",
    width: "100%",
  },
  // Adjust the scroll view content for better spacing
  scrollViewContent: {
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  bestSellerCard: {
    width: 160,
    marginRight: 15,
    backgroundColor: "#fff",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  foodImage: {
    width: "100%",
    height: 160,
    resizeMode: "cover",
  },
  foodInfo: {
    padding: 12,
    backgroundColor: "#F9F9F9",
  },
  foodName: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 4,
  },
  priceAddContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  foodPrice: {
    fontSize: 14,
    color: "#FF6B6B",
    fontWeight: "bold",
  },
  soldCountContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  soldCount: {
    fontSize: 12,
    color: "#666",
    marginLeft: 4,
  },
  scrollIndicator: {
    position: "absolute",
    top: "50%",
    transform: [{ translateY: -15 }],
    width: 30,
    height: 30,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 3.84,
    elevation: 5,
  },
  leftIndicator: {
    left: 5,
  },
  rightIndicator: {
    right: 5,
  },
  loadingContainer: {
    height: 200,
    justifyContent: "center",
    alignItems: "center",
  },
  productsContainer: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  productsList: {
    padding: 10,
  },
  productsRow: {
    justifyContent: "space-between",
  },
  foodCard: {
    width: "48%",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
    overflow: "hidden",
  },
  foodCardImage: {
    width: "100%",
    height: 150,
    resizeMode: "cover",
  },
  foodCardContent: {
    padding: 12,
  },
  foodCardName: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
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
  },
  addButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#F0F0F0",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  outOfStock: {
    fontSize: 12,
    color: "#FF3B30",
    fontStyle: "italic",
  },
  productsHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    paddingTop: 50, // Điều chỉnh theo status bar
    paddingBottom: 15,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  productsTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },

  // New styles for RecommendedFood component
  recommendedCard: {
    width: 300,
    height: 100,
    flexDirection: "row",
    marginRight: 15,
    backgroundColor: "#fff",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  recommendedImage: {
    width: 100,
    height: "100%",
    resizeMode: "cover",
  },
  recommendedInfo: {
    flex: 1,
    padding: 12,
    justifyContent: "space-between",
    backgroundColor: "#F9F9F9",
  },
  recommendedName: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 4,
  },
  recommendedPrice: {
    fontSize: 14,
    color: "#FF6B6B",
    fontWeight: "bold",
  },

  // Add animation styles
  animatedItem: {
    position: "absolute",
    zIndex: 999,
    width: 50,
    height: 50,
    borderRadius: 25,
    overflow: "hidden",
  },
  animatedImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
});
