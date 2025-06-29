import axios, { AxiosRequestConfig, Method, AxiosInstance } from "axios";
import { SESSION_COOKIE } from "@/configs/constants";
import { API_URL } from "@/configs/environments";
import cookies from "./cookies";

const axiosConfig: AxiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

axiosConfig.interceptors.request.use(
  (config) => {
    const token = cookies.get(SESSION_COOKIE)?.value;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosConfig.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 403) {
      console.warn("Unauthorized. Redirecting to login...");
    }
    return Promise.reject(error);
  }
);

export const fetcher = <D = never>(
  method: Method,
  url: string,
  params?: object,
  options?: AxiosRequestConfig
) => {
  const config: AxiosRequestConfig = {
    url,
    method,
    ...options,
  };

  if (method.toUpperCase() === "GET") {
    config.params = params;
  } else {
    config.data = params;
  }

  return axiosConfig.request<D>(config).then((res) => res.data);
};
