import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { authService } from "@/services/auth.services";

export default function AuthCheckScreen() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        // Kiểm tra xem người dùng đã đăng nhập chưa
        const isAuth = await authService.isAuthenticated();

        // Đợi một khoảng thời gian ngắn để hiển thị splash screen
        await new Promise((resolve) => setTimeout(resolve, 1000));

        if (isAuth) {
          router.replace("/(tabs)");
        } else {
          // Nếu chưa đăng nhập, chuyển đến màn hình login
          router.replace("/login");
        }
      } catch (error) {
        console.error("Auth check error:", error);
        // Nếu có lỗi, vẫn chuyển đến màn hình login
        router.replace("/login");
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <View style={styles.logo} />
      </View>
      <ActivityIndicator size="large" color="#FF6B6B" style={styles.loader} />
      <ThemedText style={styles.loadingText}>Đang tải ứng dụng...</ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 40,
  },
  logo: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#FF6B6B",
  },
  loader: {
    marginBottom: 20,
  },
  loadingText: {
    fontSize: 16,
    color: "#666",
  },
});
