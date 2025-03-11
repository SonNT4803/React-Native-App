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
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#000",
  },
  dealContainer: {
    backgroundColor: "#FF6B6B",
    borderRadius: 15,
    padding: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  dealContent: {
    flex: 1,
  },
  dealTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFF",
    marginBottom: 5,
  },
  dealDescription: {
    fontSize: 14,
    color: "#FFF",
  },
  dealImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    backgroundColor: "rgba(255, 255, 255, 0.3)", // Placeholder color
  },
  popularContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  popularItem: {
    width: "48%",
  },
  popularImage: {
    width: "100%",
    height: 150,
    borderRadius: 15,
    marginBottom: 8,
    backgroundColor: "#f0f0f0", // Placeholder color
  },
  popularText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#000",
    textAlign: "center",
  },
  centerContent: {
    justifyContent: "center",
    alignItems: "center",
  },
  popularPrice: {
    fontSize: 14,
    color: "#FF6B6B",
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 4,
  },
  foodListContainer: {
    paddingVertical: 15,
  },
  foodCard: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 15,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
    overflow: "hidden",
  },
  foodImage: {
    width: 100,
    height: 100,
    backgroundColor: "#f0f0f0",
  },
  foodInfo: {
    flex: 1,
    padding: 12,
  },
  foodTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#000",
  },
  foodDescription: {
    fontSize: 12,
    color: "#666",
    marginBottom: 10,
  },
  foodPriceContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  foodPrice: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#FF6B6B",
  },
  addToCartButton: {
    backgroundColor: "#FF6B6B",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 20,
  },
  addToCartText: {
    color: "#FFF",
    fontSize: 12,
    fontWeight: "500",
  },
});
