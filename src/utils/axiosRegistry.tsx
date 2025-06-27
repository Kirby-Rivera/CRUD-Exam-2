import axios, { AxiosRequestConfig, Method, AxiosError } from 'axios';
import { API_URL } from '@/configs/environments';

// Optional: Helper to get the token from somewhere (localStorage, cookies, etc.)
const getAuthToken = () => {
  return localStorage.getItem('access_token'); // or cookies.get('token')
};

const axiosInstance = axios.create({
  baseURL: API_URL, // <-- your base URL here
  // You can also set default headers, timeouts, etc. here
});

export const fetcher = async <D = never>(
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
      Authorization: token ? `Bearer ${token}` : '',
      ...(options?.headers || {}), // allow overriding or extending headers
    },
    ...options,
  };

  if (method.toUpperCase() === 'GET') {
    config.params = params;
  } else {
    config.data = params;
  }

  try {
    const response = await axiosInstance.request<D>(config);
    return response.data;
  } catch (error) {
    // Handle 403 or other errors here
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 403) {
        console.error('Access denied: 403');
        // You can handle logout, redirect to login, show message, etc.
      }
    }
    // Rethrow so the caller can handle it too
    throw error;
  }
};
