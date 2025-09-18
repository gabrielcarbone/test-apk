import { createApiClient } from "./api";
import { authMock } from "../mocks/authMock";

import type { LoginRequest, LoginResponse, UserData } from "../types";

const url = import.meta.env.VITE_BASE_URL_API;

// Endpoints de autenticación
const authEndPoints = {
  login: "/mobile_pru/usuario/login",
  logout: "/mobile_pru/usuario/logout",
  refresh: "/mobile_pru/usuario/login",
  profile: "/mobile_pru/usuario/profile",
};

export const loginUser = async (
  credentials: LoginRequest
): Promise<LoginResponse> => {
  console.log(`Auth Service - loginUser:", ${JSON.stringify(credentials)}`);

  if (import.meta.env.VITE_MOCK_DATA === "true") {
    console.log("Using mock data for loginUser");
    return authMock.loginUser(credentials);
  }

  try {
    const config = {
      baseURL: url,
      timeout: 10000,
    };
    const apiClient = createApiClient(config);
    const response = await apiClient.post<LoginResponse>(
      authEndPoints.login,
      credentials,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Auth Service Error:", error);
    throw error;
  }
};

export const refreshToken = async (
  refreshTokenValue: string
): Promise<LoginResponse> => {
  console.log(`Auth Service - refreshToken:", ${refreshTokenValue}`);

  if (import.meta.env.VITE_MOCK_DATA === "true") {
    console.log("Using mock data for refreshToken");
    return authMock.refreshToken({ refresh_token: refreshTokenValue });
  }

  try {
    const axios = (await import("axios")).default;
    const response = await axios.put<LoginResponse>(
      `${url}${authEndPoints.refresh}`,
      { refresh_token: refreshTokenValue },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${refreshTokenValue}`,
        },
        timeout: 10000,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Refresh Token Service Error:", error);
    window.location.href = "/login";
    throw error;
  }
};

// Funciones auxiliares para manejo de tokens
export const getAuthToken = (): string | null => {
  return localStorage.getItem(import.meta.env.VITE_STORAGE_KEY_AUTH_TOKEN);
};

export const setAuthToken = (token: string): void => {
  localStorage.setItem(import.meta.env.VITE_STORAGE_KEY_AUTH_TOKEN, token);
};

export const removeAuthToken = (): void => {
  localStorage.removeItem(import.meta.env.VITE_STORAGE_KEY_AUTH_TOKEN);
};

export const getRefreshToken = (): string | null => {
  return localStorage.getItem(
    import.meta.env.VITE_STORAGE_KEY_REFRESH_TOKEN || "refresh_token"
  );
};

export const setRefreshToken = (token: string): void => {
  localStorage.setItem(
    import.meta.env.VITE_STORAGE_KEY_REFRESH_TOKEN || "refresh_token",
    token
  );
};

export const removeRefreshToken = (): void => {
  localStorage.removeItem(
    import.meta.env.VITE_STORAGE_KEY_REFRESH_TOKEN || "refresh_token"
  );
};

export const getUserData = (): UserData | null => {
  const data = localStorage.getItem(
    import.meta.env.VITE_STORAGE_KEY_USER_DATA || "user_data"
  );
  return data ? JSON.parse(data) : null;
};

export const setUserData = (userData: UserData): void => {
  localStorage.setItem(
    import.meta.env.VITE_STORAGE_KEY_USER_DATA || "user_data",
    JSON.stringify(userData)
  );
};

export const removeUserData = (): void => {
  localStorage.removeItem(
    import.meta.env.VITE_STORAGE_KEY_USER_DATA || "user_data"
  );
  localStorage.removeItem(
    import.meta.env.VITE_STORAGE_KEY_RIESGOS || "riesgos_data"
  );
  localStorage.removeItem(
    import.meta.env.VITE_STORAGE_KEY_POLIZAS || "polizas_data"
  );
};

export const isAuthenticated = (): boolean => {
  return !!getAuthToken();
};

export const handleTokenExpiration =
  async (): Promise<LoginResponse | null> => {
    const currentRefreshToken = getRefreshToken();

    if (!currentRefreshToken) {
      console.warn("No refresh token available for renewal");
      removeAuthToken();
      removeUserData();
      return null;
    }

    try {
      console.log("Attempting to refresh expired token...");
      const response = await refreshToken(currentRefreshToken);

      if (response.access_token && response.refresh_token) {
        setAuthToken(response.access_token);
        setRefreshToken(response.refresh_token);
        console.log("Token refreshed successfully");
        return response;
      } else {
        console.error("Token refresh failed:", response.message);
        removeAuthToken();
        removeRefreshToken();
        removeUserData();
        return null;
      }
    } catch (error) {
      console.error("Error refreshing token:", error);
      removeAuthToken();
      removeRefreshToken();
      removeUserData();
      return null;
    }
  };

export const isTokenExpired = (token: string): boolean => {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    const currentTime = Math.floor(Date.now() / 1000);
    return payload.exp < currentTime;
  } catch (error) {
    console.error("Error parsing token:", error);
    return true;
  }
};

export const shouldRefreshToken = (): boolean => {
  const token = getAuthToken();
  if (!token) return true;

  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    const currentTime = Math.floor(Date.now() / 1000);
    const timeUntilExpiry = payload.exp - currentTime;
    return timeUntilExpiry < 300;
  } catch (error) {
    console.error("Error checking token expiry:", error);
    return true;
  }
};
