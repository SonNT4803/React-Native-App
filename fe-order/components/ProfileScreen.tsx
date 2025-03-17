import React from "react";
import { View, Text } from "react-native";
import { useAuth } from "@/hooks/useAuth";

export const ProfileScreen = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (!user) {
    return <Text>Please login to view your profile</Text>;
  }

  return (
    <View>
      <Text>Email: {user.email}</Text>
      <Text>User ID: {user.id}</Text>
      <Text>Roles: {user.role.join(", ")}</Text>
    </View>
  );
};
