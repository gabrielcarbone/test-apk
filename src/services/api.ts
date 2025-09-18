import axios, { type AxiosRequestConfig, type AxiosInstance } from "axios";
import {
  getAuthToken,
  shouldRefreshToken,
  handleTokenExpiration,
} from "./authService";

export const createApiClient = (config: AxiosRequestConfig): AxiosInstance => {
  const apiClient = axios.create(config);

  // Request interceptor para agregar token y verificar si necesita refresh
  apiClient.interceptors.request.use(
    async (config) => {
      console.log(
        `apiClient.interceptors.request.use: ${JSON.stringify(config)}`
      );

      const token = getAuthToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;

        if (shouldRefreshToken()) {
          try {
            console.log("Token necesita refresh, intentar refresh");
            await handleTokenExpiration();

            const newToken = getAuthToken();
            if (newToken) {
              config.headers.Authorization = `Bearer ${newToken}`;
            }
          } catch (error) {
            console.error("Failed to refresh token:", error);
          }
        }
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // Response interceptor para manejar errores de token expirado
  apiClient.interceptors.response.use(
    (response) => {
      //console.log(`API Response:, ${JSON.stringify(response)}`);
      return response;
    },
    async (error) => {
      console.error(`API Error: ${JSON.stringify(error)}`);

      const originalRequest = error.config;

      // Si es error 401/403 y no hemos intentado refresh
      if (
        (error.response?.status === 401 || error.response?.status === 403) &&
        !originalRequest._retry
      ) {
        originalRequest._retry = true;

        try {
          console.log("Received 401/403, attempting token refresh...");
          const refreshResult = await handleTokenExpiration();

          if (refreshResult) {
            const newToken = getAuthToken();
            if (newToken) {
              originalRequest.headers.Authorization = `Bearer ${newToken}`;
              return apiClient(originalRequest);
            }
          }
        } catch (refreshError) {
          console.error("Token refresh failed:", refreshError);
        }
      }

      return Promise.reject(error);
    }
  );

  return apiClient;
};
