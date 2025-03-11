import { useRouter } from "expo-router";
import React, { useEffect, useState, ReactNode } from "react";
import { View, ActivityIndicator } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { authService } from "@/services/auth.services";

interface AuthGuardProps {
  children: ReactNode;
}

export const AuthGuard = ({ children }: AuthGuardProps) => {
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const isAuth = await authService.isAuthenticated();
        setIsAuthenticated(isAuth);

        if (!isAuth) {
          router.replace("/login");
        }
      } catch (error) {
        console.error("Auth check error:", error);
        router.replace("/login");
      } finally {
        setIsChecking(false);
      }
    };

    checkAuth();
  }, []);

  if (isChecking) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#FF6B6B" />
        <ThemedText style={{ marginTop: 10 }}>
          Đang kiểm tra đăng nhập...
        </ThemedText>
      </View>
    );
  }

  return isAuthenticated ? <>{children}</> : null;
};
