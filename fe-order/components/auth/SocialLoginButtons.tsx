import { ThemedText } from "@/components/ThemedText";
import React from "react";
import { TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome"; // Import icon thư viện
import { styles } from "./styles";

export const SocialLoginButtons = () => {
  return (
    <View style={styles.socialButtonsContainer}>
      <TouchableOpacity style={styles.socialButton}>
        <View style={styles.socialIconContainer}>
          <Icon name="google" size={24} color="red" style={styles.socialIcon} />
        </View>
        <ThemedText style={styles.socialButtonText}>Google</ThemedText>
      </TouchableOpacity>

      <TouchableOpacity style={styles.socialButton}>
        <View style={styles.socialIconContainer}>
          <Icon
            name="facebook"
            size={24}
            color="blue"
            style={styles.socialIcon}
          />
        </View>
        <ThemedText style={styles.socialButtonText}>Facebook</ThemedText>
      </TouchableOpacity>
    </View>
  );
};
