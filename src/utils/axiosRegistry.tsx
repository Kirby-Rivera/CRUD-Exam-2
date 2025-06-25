// lib/axiosRegistry.ts
import axios, { AxiosInstance } from "axios";

const axiosRegistry: AxiosInstance = axios.create({
  baseURL: process.env.API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Optional: Add request interceptor
axiosRegistry.interceptors.request.use(
  (config) => {
    // Example: Attach token if available
    const token =
      typeof window !== "undefined" ? localStorage.getItem("token") : null;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Optional: Add response interceptor
axiosRegistry.interceptors.response.use(
  (response) => response,
  (error) => {
    // You could handle global error responses here
    if (error.response?.status === 401) {
      console.warn("Unauthorized. Redirecting to login...");
      // e.g., redirect to login page
    }
    return Promise.reject(error);
  }
);

export default axiosRegistry;
