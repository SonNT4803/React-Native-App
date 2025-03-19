import React from "react";
import { View, TouchableOpacity, StyleSheet, Image } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { Ionicons } from "@expo/vector-icons";

export const Header = () => {
  return (
    <View style={styles.header}>
      <View style={styles.leftContainer}>
        <Image
          source={require("@/assets/images/react-logo.png")}
          style={styles.logo}
        />
        <View style={styles.titleContainer}>
          <ThemedText style={styles.greeting}>Xin chào!</ThemedText>
          <ThemedText style={styles.title}>Bạn muốn ăn gì hôm nay?</ThemedText>
        </View>
      </View>
      <View style={styles.rightContainer}>
        <TouchableOpacity style={styles.iconButton}>
          <Ionicons name="notifications-outline" size={24} color="#333" />
          <View style={styles.notificationBadge} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  leftContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  logo: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  titleContainer: {
    justifyContent: "center",
  },
  greeting: {
    fontSize: 14,
    color: "#666",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  rightContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconButton: {
    position: "relative",
    padding: 8,
  },
  notificationBadge: {
    position: "absolute",
    top: 8,
    right: 8,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#FF6B6B",
  },
});
