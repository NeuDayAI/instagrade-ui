import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { API_BASE_URL } from './config';

// Create axios instance with default config
const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    // Add auth token if available
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      config.headers['Access-Control-Allow-Origin'] = '*';
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      localStorage.removeItem('access_token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Generic API functions
export const api = {
  get: <T>(url: string, params?: any): Promise<AxiosResponse<T>> => {
    return apiClient.get<T>(url, { params });
  },

  post: <T>(url: string, data?: any): Promise<AxiosResponse<T>> => {
    return apiClient.post<T>(url, data);
  },

  put: <T>(url: string, data: any): Promise<AxiosResponse<T>> => {
    return apiClient.put<T>(url, data);
  },

  delete: <T>(url: string): Promise<AxiosResponse<T>> => {
    return apiClient.delete<T>(url);
  },

  // File upload with progress tracking
  upload: <T>(url: string, file: File, onProgress?: (percentage: number) => void): Promise<AxiosResponse<T>> => {
    const formData = new FormData();
    formData.append('file', file);

    return apiClient.post<T>(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress: (progressEvent) => {
        if (onProgress && progressEvent.total) {
          const percentage = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          onProgress(percentage);
        }
      },
    });
  },
};