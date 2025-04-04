import React, { useState } from "react";
import {
  View,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
} from "react-native";
import { useRouter } from "expo-router";
import { ThemedText } from "@/components/ThemedText";
import { LoginForm } from "@/components/auth/LoginForm";
import { SocialLoginButtons } from "@/components/auth/SocialLoginButtons";
import { styles } from "@/components/auth/styles";

export default function LoginScreen() {
  const router = useRouter();
  const [loginError, setLoginError] = useState("");

  const handleLogin = (email: string, password: string) => {
    console.log("Login with:", email, password);
    // Xử lý đăng nhập được thực hiện trong LoginForm
  };

  const handleLoginSuccess = () => {
    router.replace("/(tabs)");
  };

  const handleLoginFailure = (errorMessage: string) => {
    setLoginError(errorMessage);
  };

  const handleSignUp = () => {
    // Navigate to sign up screen
    console.log("Navigate to sign up");
    // router.push("/signup");
  };

  const handleForgotPassword = () => {
    // Navigate to forgot password screen
    console.log("Navigate to forgot password");
    // router.push("/forgot-password");
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.logoContainer}>
          <Image
            // source={require("@/assets/images/logo.png")}
            style={styles.logo}
          />
        </View>

        <View style={styles.welcomeContainer}>
          <ThemedText style={styles.welcomeTitle}>Welcome Back!</ThemedText>
          <ThemedText style={styles.welcomeSubtitle}>
            Sign in to continue to Food App
          </ThemedText>
        </View>

        {loginError ? (
          <View style={styles.errorContainer}>
            <Text style={styles.errorMessage}>{loginError}</Text>
          </View>
        ) : null}

        <LoginForm
          onLogin={handleLogin}
          onLoginSuccess={handleLoginSuccess}
          onLoginFailure={handleLoginFailure}
        />

        <TouchableOpacity
          onPress={handleForgotPassword}
          style={styles.forgotPasswordButton}
        >
          <ThemedText style={styles.forgotPasswordText}>
            Forgot Password?
          </ThemedText>
        </TouchableOpacity>

        <View style={styles.dividerContainer}>
          <View style={styles.divider} />
          <ThemedText style={styles.dividerText}>OR</ThemedText>
          <View style={styles.divider} />
        </View>

        <SocialLoginButtons />

        <View style={styles.signupContainer}>
          <ThemedText style={styles.signupText}>
            Don't have an account?
          </ThemedText>
          <TouchableOpacity onPress={handleSignUp}>
            <ThemedText style={styles.signupButtonText}>Sign Up</ThemedText>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
