import React from "react";
import { View, TouchableOpacity, Image } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { styles } from "./styles";

export const SocialLoginButtons = () => {
  return (
    <View style={styles.socialButtonsContainer}>
      <TouchableOpacity style={styles.socialButton}>
        <View style={styles.socialIconContainer}>
          {/* Replace with actual Google icon */}
          <View style={[styles.socialIcon, { backgroundColor: "#DB4437" }]} />
        </View>
        <ThemedText style={styles.socialButtonText}>Google</ThemedText>
      </TouchableOpacity>

      <TouchableOpacity style={styles.socialButton}>
        <View style={styles.socialIconContainer}>
          {/* Replace with actual Facebook icon */}
          <View style={[styles.socialIcon, { backgroundColor: "#4267B2" }]} />
        </View>
        <ThemedText style={styles.socialButtonText}>Facebook</ThemedText>
      </TouchableOpacity>
    </View>
  );
};
