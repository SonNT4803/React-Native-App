import React, { useState } from "react";
import { View, TextInput, TouchableOpacity } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { styles } from "./styles";

interface LoginFormProps {
  onLogin: (email: string, password: string) => void;
}

export const LoginForm = ({ onLogin }: LoginFormProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = () => {
    if (email.trim() && password.trim()) {
      onLogin(email, password);
    }
  };

  return (
    <View style={styles.formContainer}>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          keyboardType="email-address"
          autoCapitalize="none"
          placeholderTextColor="#999"
        />
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          style={styles.input}
          secureTextEntry={!showPassword}
          placeholderTextColor="#999"
        />
        <TouchableOpacity
          onPress={() => setShowPassword(!showPassword)}
          style={styles.eyeIcon}
        >
          <ThemedText>{showPassword ? "Hide" : "Show"}</ThemedText>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={[
          styles.loginButton,
          (!email || !password) && styles.loginButtonDisabled,
        ]}
        onPress={handleSubmit}
        disabled={!email || !password}
      >
        <ThemedText style={styles.loginButtonText}>Login</ThemedText>
      </TouchableOpacity>
    </View>
  );
};
