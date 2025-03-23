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
  lastName?: string;
  firstName?: string;
  phone?: string;
  address?: string;
  avatar?: string;
}

// Interface cho việc cập nhật thông tin người dùng
interface UpdateUserData {
  firstName?: string;
  lastName?: string;
  password?: string;
  email?: string;
  phone?: string;
  address?: string;
  avatar?: string;
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

      // First get basic user info from token
      const decoded = getUserFromToken(token);
      if (!decoded) return null;

      // Then fetch detailed user info from API
      const response = await axiosInstance.get(`/users/${decoded.id}`);

      if (response.data && response.status === 200) {
        return {
          id: response.data.id || decoded.id,
          email: response.data.email || decoded.email,
          firstName: response.data.firstName || "",
          lastName: response.data.lastName || "",
          phone: response.data.phone || "",
          address: response.data.address || "",
          avatar: response.data.avatar || "",
          role: response.data.role || decoded.role,
        };
      }

      // Fallback to basic info if API call fails
      return {
        id: decoded.id,
        email: decoded.email,
        role: decoded.role,
      };
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
        id: decoded.id,
        email: decoded.email,
        role: decoded.role,
      };
    } catch (error) {
      console.error("Error decoding token:", error);
      return null;
    }
  }

  // Thêm phương thức cập nhật thông tin người dùng
  async updateUserProfile(userData: UpdateUserData): Promise<boolean> {
    try {
      const token = await AsyncStorage.getItem("accessToken");
      if (!token) return false;

      // Get current user ID
      const currentUser = await this.getCurrentUser();
      if (!currentUser || !currentUser.id) return false;

      // Call the update endpoint
      const response = await axiosInstance.put(
        `/users/${currentUser.id}`,
        userData
      );

      return response.data && response.data.statusCode === 200;
    } catch (error) {
      console.error("Error updating user profile:", error);
      return false;
    }
  }
}

export const authService = new AuthService();
