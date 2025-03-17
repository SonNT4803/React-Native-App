import { Tabs } from "expo-router";
import React from "react";

import { AuthGuard } from "@/components/auth/AuthGuard";
import { CartBadge } from "@/components/CartBadge";
import { HapticTab } from "@/components/HapticTab";
import { IconSymbol } from "@/components/ui/IconSymbol";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { Ionicons } from "@expo/vector-icons";
import { View } from "react-native";
import Toast, { BaseToast, ErrorToast } from "react-native-toast-message";

export default function TabLayout() {
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
          marginBottom: 50,
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
          tabBarActiveTintColor: "#FF6B6B",
          headerShown: false,
          tabBarButton: HapticTab,
          tabBarBackground: TabBarBackground,
          tabBarStyle: {
            backgroundColor: "#996666",
            borderTopWidth: 0,
            borderTopColor: "transparent",
            height: 60,
            paddingBottom: 5,
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: -2,
            },
            shadowOpacity: 0.15,
            shadowRadius: 8,
            elevation: 10,
            borderRadius: 30,
            marginHorizontal: 16,
            marginBottom: 10, // Increased from 1 to 10 to move it higher
            position: "absolute",
            overflow: "hidden",
            bottom: 10, // Increased from 5 to 10 to move it higher
            left: 0,
            right: 0,
            zIndex: 1000, // Ensure it's above other content
          },
          tabBarShowLabel: false,
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
