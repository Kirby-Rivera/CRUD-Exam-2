// lib/axiosRegistry.ts
import axios, { AxiosInstance } from "axios";
import { SESSION_COOKIE } from "@/configs/constants";
import { API_URL } from "@/configs/environments";
import cookies from "./cookies";

interface HttpPropType {
  method: "GET" | "POST" | "PUT" | "DELETE";
  endpoint: string;
  formData?: any;
}

const axiosRegistry: AxiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// Optional: Add request interceptor

axiosRegistry.interceptors.request.use(
  (config) => {
    // Example: Attach token if available
    const token = cookies.get(SESSION_COOKIE)?.value;

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
    if (error.response?.status === 403) {
      console.warn("Unauthorized. Redirecting to login...");
      // e.g., redirect to login page
    }
    return Promise.reject(error);
  }
);

export async function http<T>({
  method,
  endpoint,
  formData,
}: HttpPropType): Promise<T> {
  let response;

  switch (method) {
    case "GET":
      response = await axiosRegistry.get(endpoint);
      break;
    case "POST":
      response = await axiosRegistry.post(endpoint, formData);
      break;
    case "PUT":
      response = await axiosRegistry.put(endpoint, formData);
      break;
    case "DELETE":
      response = await axiosRegistry.delete(endpoint);
      break;
    default:
      throw new Error(`Unsupported HTTP method: ${method}`);
  }

  return response.data;
}
