import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    paddingTop: 50,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  scrollView: {
    flex: 1,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  emptyText: {
    fontSize: 16,
    color: "#999",
    marginTop: 16,
  },
  orderCard: {
    backgroundColor: "#fff",
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 12,
    padding: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  orderHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  orderId: {
    fontSize: 15,
    fontWeight: "600",
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  statusText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "500",
  },
  orderInfo: {
    marginBottom: 12,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  orderDate: {
    fontSize: 13,
    color: "#666",
    marginBottom: 2,
  },
  orderAddress: {
    fontSize: 13,
    color: "#666",
    marginBottom: 2,
  },
  orderNote: {
    fontSize: 13,
    color: "#666",
    fontStyle: "italic",
  },
  orderItems: {
    marginBottom: 12,
  },
  orderItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  foodImage: {
    width: 40,
    height: 40,
    borderRadius: 6,
    marginRight: 10,
  },
  foodInfo: {
    flex: 1,
  },
  foodName: {
    fontSize: 13,
    fontWeight: "500",
    marginBottom: 2,
  },
  foodPrice: {
    fontSize: 12,
    color: "#666",
  },
  itemTotal: {
    fontSize: 13,
    fontWeight: "500",
  },
  orderFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  totalLabel: {
    fontSize: 15,
    fontWeight: "600",
  },
  totalAmount: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FF6B6B",
  },
  loadMoreContainer: {
    padding: 16,
    alignItems: "center",
  },
  // Thêm styles mới
  filterContainer: {
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  filterScrollView: {
    flexDirection: "row",
  },
  filterButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginRight: 8,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  filterButtonActive: {
    backgroundColor: "#FF6B6B",
    borderColor: "#FF6B6B",
  },
  filterButtonText: {
    fontSize: 12,
    fontWeight: "500",
  },
  filterButtonTextActive: {
    color: "#fff",
  },
  searchContainer: {
    marginHorizontal: 16,
    marginVertical: 12,
  },
  searchInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 15,
    color: "#333",
    paddingLeft: 8,
  },
  searchIcon: {
    marginRight: 4,
  },
  clearButton: {
    padding: 6,
  },
  scrollToTopButton: {
    position: "absolute",
    right: 16,
    bottom: 16,
    backgroundColor: "#FF6B6B",
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
