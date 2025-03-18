import React, { useEffect, useState } from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { styles as profileStyles } from "@/assets/profile/styles";
import { authService } from "@/services/auth.services";
import { IconSymbol } from "@/components/ui/IconSymbol";

interface UserData {
  id: number;
  email: string;
  role: string[];
}

export default function ProfileScreen() {
  const router = useRouter();
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      setLoading(true);
      // Sử dụng hàm mới để lấy thông tin người dùng từ token
      const userData = await authService.getUserFromToken();
      setUser(userData);
    } catch (error) {
      console.error("Error loading user data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    Alert.alert("Đăng xuất", "Bạn có chắc chắn muốn đăng xuất?", [
      {
        text: "Hủy",
        style: "cancel",
      },
      {
        text: "Đăng xuất",
        onPress: async () => {
          await authService.logout();
          router.replace("/login");
        },
        style: "destructive",
      },
    ]);
  };

  if (loading) {
    return (
      <ThemedView style={[profileStyles.container, styles.loadingContainer]}>
        <ActivityIndicator size="large" color="#FF6B6B" />
      </ThemedView>
    );
  }

  if (!user) {
    return (
      <ThemedView style={profileStyles.container}>
        <View style={styles.notLoggedIn}>
          <ThemedText style={styles.notLoggedInText}>
            Vui lòng đăng nhập để xem thông tin cá nhân
          </ThemedText>
          <TouchableOpacity
            style={styles.loginButton}
            onPress={() => router.push("/login")}
          >
            <ThemedText style={styles.loginButtonText}>Đăng nhập</ThemedText>
          </TouchableOpacity>
        </View>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={profileStyles.container}>
      <View style={styles.header}>
        <ThemedText style={styles.title}>Hồ sơ của tôi</ThemedText>
      </View>

      <View style={styles.profileInfo}>
        <View style={styles.avatar}>
          <IconSymbol name="person.fill" size={50} color="#FFF" />
        </View>
        <ThemedText style={styles.name}>{user.email.split("@")[0]}</ThemedText>
        <ThemedText style={styles.email}>{user.email}</ThemedText>
        <ThemedText style={styles.role}>
          Vai trò: {user.role.join(", ")}
        </ThemedText>
      </View>

      <View style={styles.menuContainer}>
        <TouchableOpacity style={styles.menuItem}>
          <IconSymbol name="person.fill" size={24} color="#FF6B6B" />
          <ThemedText style={styles.menuText}>Thông tin cá nhân</ThemedText>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <IconSymbol name="cart.fill" size={24} color="#FF6B6B" />
          <ThemedText style={styles.menuText}>Lịch sử đơn hàng</ThemedText>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <IconSymbol name="house.fill" size={24} color="#FF6B6B" />
          <ThemedText style={styles.menuText}>Địa chỉ của tôi</ThemedText>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <ThemedText style={styles.logoutText}>Đăng xuất</ThemedText>
      </TouchableOpacity>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  notLoggedIn: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  notLoggedInText: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
  },
  loginButton: {
    backgroundColor: "#FF6B6B",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 30,
  },
  loginButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  role: {
    fontSize: 14,
    color: "#666",
    marginTop: 5,
  },
  header: {
    width: "100%",
    paddingVertical: 20,
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  profileInfo: {
    alignItems: "center",
    marginVertical: 30,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#FF6B6B",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
  },
  name: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 5,
  },
  email: {
    fontSize: 16,
    color: "#666",
  },
  menuContainer: {
    width: "100%",
    paddingHorizontal: 20,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  menuText: {
    fontSize: 16,
    marginLeft: 15,
  },
  logoutButton: {
    marginTop: 40,
    backgroundColor: "#FF6B6B",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 30,
    alignSelf: "center",
  },
  logoutText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});
