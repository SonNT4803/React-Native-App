import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getUserFromToken, isTokenExpired } from "@/utils/authUtils";

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const loadToken = async () => {
      try {
        const storedToken = await AsyncStorage.getItem("accessToken");

        if (storedToken && !isTokenExpired(storedToken)) {
          setToken(storedToken);
          const userData = getUserFromToken(storedToken);
          setUser(userData);
        }
      } catch (error) {
        console.error("Error loading auth token:", error);
      } finally {
        setLoading(false);
      }
    };

    loadToken();
  }, []);

  const logout = async () => {
    try {
      await AsyncStorage.removeItem("accessToken");
      await AsyncStorage.removeItem("refreshToken");
      setToken(null);
      setUser(null);
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return { user, loading, token, logout };
};
