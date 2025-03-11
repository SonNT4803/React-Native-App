import { getUserFromToken } from "@/utils/authUtils";
import axiosInstance from "@/utils/axiosIntance";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface LoginResponse {
  accessToken: string;
  refreshToken: string;
}

interface UserData {
  id: number;
  email: string;
  role: string[];
}

class AuthService {
  async login(email: string, password: string): Promise<boolean> {
    try {
      const response = await axiosInstance.post<LoginResponse>("/auth/login", {
        email,
        password,
      });

      // Lưu token vào AsyncStorage
      await AsyncStorage.setItem("accessToken", response.data.accessToken);
      await AsyncStorage.setItem("refreshToken", response.data.refreshToken);

      return true;
    } catch (error) {
      console.error("Login error:", error);
      return false;
    }
  }

  async logout(): Promise<void> {
    try {
      // Xóa token khỏi AsyncStorage
      await AsyncStorage.removeItem("accessToken");
      await AsyncStorage.removeItem("refreshToken");

      // Có thể thêm các bước khác nếu cần, như gọi API logout
      console.log("Đã đăng xuất thành công");
    } catch (error) {
      console.error("Lỗi khi đăng xuất:", error);
    }
  }

  async refreshToken(): Promise<boolean> {
    try {
      const refreshToken = await AsyncStorage.getItem("refreshToken");

      if (!refreshToken) {
        return false;
      }

      const response = await axiosInstance.post<{ accessToken: string }>(
        "/auth/refresh",
        { refreshToken }
      );

      await AsyncStorage.setItem("accessToken", response.data.accessToken);
      return true;
    } catch (error) {
      console.error("Refresh token error:", error);
      return false;
    }
  }

  async isAuthenticated(): Promise<boolean> {
    const token = await AsyncStorage.getItem("accessToken");
    return token !== null;
  }

  async getCurrentUser(): Promise<UserData | null> {
    try {
      const token = await AsyncStorage.getItem("accessToken");
      if (!token) return null;

      // Sử dụng axiosInstance để lấy thông tin user từ API
      const response = await axiosInstance.get("/users/me");
      if (response.data && response.data.statusCode === 200) {
        return response.data.data;
      }
      return null;
    } catch (error) {
      console.error("Error getting current user:", error);
      return null;
    }
  }

  async getUserFromToken(): Promise<UserData | null> {
    try {
      const token = await AsyncStorage.getItem("accessToken");
      if (!token) return null;

      const decoded = getUserFromToken(token);
      if (!decoded) return null;

      return {
        id: decoded.sub,
        email: decoded.email,
        role: decoded.role,
      };
    } catch (error) {
      console.error("Error decoding token:", error);
      return null;
    }
  }
}

export const authService = new AuthService();
