import axios, { AxiosRequestConfig, Method, AxiosError } from "axios";
import cookies from "./cookies";
import { API_URL } from "@/configs/environments";
import { SESSION_COOKIE } from "@/configs/constants";

const getAuthToken = () => {
  return cookies.get(SESSION_COOKIE);
};

const axiosInstance = axios.create({
  baseURL: API_URL,
});

export const fetcher = async <D = never,>(
  method: Method,
  url: string,
  params?: object,
  options?: AxiosRequestConfig
): Promise<D> => {
  const token = getAuthToken();

  const config: AxiosRequestConfig = {
    url,
    method,
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
      ...(options?.headers || {}),
    },
    ...options,
  };

  if (method.toUpperCase() === "GET") {
    config.params = params;
  } else {
    config.data = params;
  }

  try {
    const response = await axiosInstance.request<D>(config);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 403) {
        console.error("Access denied: 403");
      }
    }

    throw error;
  }
};
