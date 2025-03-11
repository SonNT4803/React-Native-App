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
  sectionContainer: {
    marginVertical: 15,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  seeAll: {
    fontWeight: "bold",
    fontSize: 14,
    color: "#FF6B6B",
  },
  scrollContainer: {
    position: "relative",
  },
  scrollViewContent: {
    paddingHorizontal: 15,
  },
  bestSellerCard: {
    width: 160,
    marginRight: 15,
    backgroundColor: "#fff",
    borderRadius: 12,
    shadowColor: "#grey",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
    overflow: "hidden",
  },
  foodImage: {
    width: "100%",
    height: 160,
    resizeMode: "cover",
  },
  foodInfo: {
    padding: 12,
  },
  foodName: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 4,
  },
  foodPrice: {
    fontSize: 14,
    color: "#FF6B6B",
    fontWeight: "bold",
    marginBottom: 4,
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
  foodCardPrice: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#FF6B6B",
  },
  addToCartButton: {
    backgroundColor: "#FF6B6B",
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
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
});
