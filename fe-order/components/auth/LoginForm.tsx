import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Text,
} from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { styles } from "./styles";
import { authService } from "@/services/auth.services";
import { IconSymbol } from "@/components/ui/IconSymbol";

interface LoginFormProps {
  onLogin: (email: string, password: string) => void;
  onLoginSuccess: () => void;
  onLoginFailure: (error: string) => void;
}

export const LoginForm = ({
  onLogin,
  onLoginSuccess,
  onLoginFailure,
}: LoginFormProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Thêm state để quản lý lỗi
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });
  const [formValid, setFormValid] = useState(false);

  // Thêm state để theo dõi việc người dùng đã tương tác với từng trường chưa
  const [touched, setTouched] = useState({
    email: false,
    password: false,
  });

  // State để theo dõi xem form đã được submit chưa
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Kiểm tra tính hợp lệ của form mỗi khi email hoặc password thay đổi
  useEffect(() => {
    validateForm();
  }, [email, password]);

  // Kiểm tra định dạng email
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = emailRegex.test(email);

    if (!email) {
      setErrors((prev) => ({ ...prev, email: "Email không được để trống" }));
      return false;
    } else if (!isValid) {
      setErrors((prev) => ({ ...prev, email: "Email không đúng định dạng" }));
      return false;
    } else {
      setErrors((prev) => ({ ...prev, email: "" }));
      return true;
    }
  };

  // Kiểm tra mật khẩu
  const validatePassword = (password: string): boolean => {
    if (!password) {
      setErrors((prev) => ({
        ...prev,
        password: "Mật khẩu không được để trống",
      }));
      return false;
    } else {
      setErrors((prev) => ({ ...prev, password: "" }));
      return true;
    }
  };

  // Kiểm tra toàn bộ form
  const validateForm = () => {
    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);
    setFormValid(isEmailValid && isPasswordValid);
  };

  // Xử lý khi thay đổi email
  const handleEmailChange = (text: string) => {
    setEmail(text);
    // Nếu người dùng đã tương tác với trường này trước đó hoặc đã submit form
    if (touched.email || isSubmitted) {
      validateEmail(text);
    }
  };

  // Xử lý khi thay đổi mật khẩu
  const handlePasswordChange = (text: string) => {
    setPassword(text);
    // Nếu người dùng đã tương tác với trường này trước đó hoặc đã submit form
    if (touched.password || isSubmitted) {
      validatePassword(text);
    }
  };

  // Xử lý sự kiện khi người dùng bắt đầu tương tác với trường
  const handleFocus = (field: "email" | "password") => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  // Xử lý sự kiện khi người dùng blur khỏi trường
  const handleBlur = (field: "email" | "password") => {
    if (field === "email") {
      validateEmail(email);
    } else {
      validatePassword(password);
    }
  };

  // Xử lý khi nhấn nút đăng nhập
  const handleSubmit = async () => {
    // Đánh dấu form đã được submit
    setIsSubmitted(true);

    // Kiểm tra lại form trước khi gửi
    validateForm();

    if (formValid) {
      setIsLoading(true);
      try {
        onLogin(email, password);
        const success = await authService.login(email, password);

        if (success) {
          onLoginSuccess();
        } else {
          onLoginFailure(
            "Đăng nhập không thành công. Vui lòng kiểm tra lại email và mật khẩu."
          );
        }
      } catch (error) {
        onLoginFailure("Đã xảy ra lỗi. Vui lòng thử lại sau.");
      } finally {
        setIsLoading(false);
      }
    }
  };

  // Chỉ hiển thị lỗi khi người dùng đã tương tác với trường đó hoặc đã submit form
  const shouldShowEmailError = (touched.email || isSubmitted) && errors.email;
  const shouldShowPasswordError =
    (touched.password || isSubmitted) && errors.password;

  return (
    <View style={styles.formContainer}>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={handleEmailChange}
          onFocus={() => handleFocus("email")}
          onBlur={() => handleBlur("email")}
          style={[
            styles.input,
            shouldShowEmailError ? styles.inputError : null,
          ]}
          keyboardType="email-address"
          autoCapitalize="none"
          placeholderTextColor="#999"
        />
        {shouldShowEmailError ? (
          <Text style={styles.errorText}>{errors.email}</Text>
        ) : null}
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={handlePasswordChange}
          onFocus={() => handleFocus("password")}
          onBlur={() => handleBlur("password")}
          style={[
            styles.input,
            shouldShowPasswordError ? styles.inputError : null,
          ]}
          secureTextEntry={!showPassword}
          placeholderTextColor="#999"
        />
        <TouchableOpacity
          onPress={() => setShowPassword(!showPassword)}
          style={styles.eyeIcon}
        >
          <IconSymbol
            name={showPassword ? "eye.slash" : "eye"}
            size={20}
            color="#666"
          />
        </TouchableOpacity>
        {shouldShowPasswordError ? (
          <Text style={styles.errorText}>{errors.password}</Text>
        ) : null}
      </View>

      <TouchableOpacity
        style={[styles.loginButton, isLoading && styles.loginButtonDisabled]}
        onPress={handleSubmit}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator color="#FFFFFF" size="small" />
        ) : (
          <ThemedText style={styles.loginButtonText}>Login</ThemedText>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default LoginForm;
