import axios, { AxiosInstance, AxiosResponse } from "axios";

const apiEndpoint = "http://localhost:3000";

// Tạo một instance của Axios
const axiosInstance: AxiosInstance = axios.create({
  baseURL: `${apiEndpoint}`,
  timeout: 0,
  headers: {
    "Content-Type": "application/json",
  },
});

// Cấu hình request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Cấu hình response interceptor
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error) => {
    if (error.response) {
      console.error("Server error:", error.response.data);
    } else if (error.request) {
      console.error("Network error:", error.request);
    } else {
      console.error("Error:", error.message);
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
