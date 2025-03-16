import { Tabs } from "expo-router";
import React from "react";

import { AuthGuard } from "@/components/auth/AuthGuard";
import { HapticTab } from "@/components/HapticTab";
import { IconSymbol } from "@/components/ui/IconSymbol";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { useColorScheme } from "@/hooks/useColorScheme";
import { CartBadge } from "@/components/CartBadge";
import { Ionicons } from "@expo/vector-icons";
import { View } from "react-native";
import Toast, { BaseToast, ErrorToast } from "react-native-toast-message";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  // Custom toast configuration
  const toastConfig = {
    success: (props: any) => (
      <BaseToast
        {...props}
        style={{
          borderLeftColor: "green",
          backgroundColor: "#FFFFFF",
          height: "auto",
          paddingVertical: 10,
          width: "90%",
          borderRadius: 8,
          marginBottom: 70, // Keep it above the tab bar
        }}
        contentContainerStyle={{ paddingHorizontal: 15 }}
        text1Style={{
          fontSize: 15,
          fontWeight: "bold",
          color: "#2C3E50",
        }}
        text2Style={{
          fontSize: 13,
          color: "#7F8C8D",
        }}
      />
    ),
    error: (props: any) => (
      <ErrorToast
        {...props}
        style={{
          borderLeftColor: "#FF3B30",
          backgroundColor: "#FFFFFF",
          height: "auto",
          paddingVertical: 10,
          width: "90%",
          borderRadius: 8,
          marginBottom: 70,
        }}
        text1Style={{
          fontSize: 15,
          fontWeight: "bold",
          color: "#2C3E50",
        }}
        text2Style={{
          fontSize: 13,
          color: "#7F8C8D",
        }}
      />
    ),
  };

  return (
    <AuthGuard>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: "#FF6B6B", // Màu active tab
          headerShown: false,
          tabBarButton: HapticTab,
          tabBarBackground: TabBarBackground,
          tabBarStyle: {
            backgroundColor: "#FFFFFF",
            borderTopWidth: 1,
            borderTopColor: "#F0F0F0",
            height: 60,
            paddingBottom: 5,
          },
          tabBarShowLabel: false, // Ẩn nhãn (chữ) bên dưới icon
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            tabBarIcon: ({ color }) => (
              <IconSymbol size={24} name="house.fill" color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="cart"
          options={{
            tabBarIcon: ({ color }) => (
              <View style={{ position: "relative" }}>
                <Ionicons name="cart-outline" size={24} color={color} />
                <CartBadge />
              </View>
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            tabBarIcon: ({ color }) => (
              <IconSymbol size={24} name="person.fill" color={color} />
            ),
          }}
        />
      </Tabs>
      <Toast config={toastConfig} />
    </AuthGuard>
  );
}
