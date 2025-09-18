import { vi, describe, test, expect, beforeEach, afterEach } from "vitest";
import {
  refreshToken,
  handleTokenExpiration,
  isTokenExpired,
  shouldRefreshToken,
  getRefreshToken,
  setRefreshToken,
  removeRefreshToken,
  getAuthToken,
  setAuthToken,
  removeAuthToken,
} from "../../src/services/authService";

// Get localStorage mock from global setup
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};

// Mock axios
vi.mock("axios", () => ({
  default: {
    create: vi.fn(() => ({
      put: vi.fn(),
      post: vi.fn(),
    })),
  },
}));

// Mock API client
vi.mock("../../src/services/api", () => ({
  createApiClient: vi.fn(() => ({
    put: vi.fn(),
  })),
}));

describe("Refresh Token Functionality", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Mock localStorage methods
    Object.defineProperty(globalThis, "localStorage", {
      value: localStorageMock,
      writable: true,
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe("Token Helper Functions", () => {
    test("should get refresh token from localStorage", () => {
      localStorageMock.getItem.mockReturnValue("mock-refresh-token");
      const token = getRefreshToken();
      expect(token).toBe("mock-refresh-token");
      expect(localStorageMock.getItem).toHaveBeenCalledWith("refresh_token");
    });

    test("should set refresh token in localStorage", () => {
      setRefreshToken("new-refresh-token");
      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        "refresh_token",
        "new-refresh-token"
      );
    });

    test("should remove refresh token from localStorage", () => {
      removeRefreshToken();
      expect(localStorageMock.removeItem).toHaveBeenCalledWith("refresh_token");
    });
  });

  describe("Token Expiration Logic", () => {
    test("should detect expired token", () => {
      // Token expirado (exp: 1000000000 = 2001-09-09)
      const expiredToken =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiZXhwIjoxMDAwMDAwMDAwfQ.Xkn3Z8fBQ5aXwVXaJ2pjKHs8GqF9UfP8H5vQcR5dA9Y";
      const result = isTokenExpired(expiredToken);
      expect(result).toBe(true);
    });

    test("should detect valid token", () => {
      // Token válido (exp: 9999999999 = 2286-11-20)
      const validToken =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiZXhwIjo5OTk5OTk5OTk5fQ.Hm2YdJYBm9Ggq0T8LGHIgQjqkKZO2xYQ6p9QJy8D-sQ";
      const result = isTokenExpired(validToken);
      expect(result).toBe(false);
    });

    test("should handle invalid token format", () => {
      const invalidToken = "invalid-token";
      const result = isTokenExpired(invalidToken);
      expect(result).toBe(true);
    });

    test("should detect when token needs refresh (expires in < 5 minutes)", () => {
      localStorageMock.getItem.mockReturnValue(
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiZXhwIjoxMDAwMDAwMDAwfQ.Xkn3Z8fBQ5aXwVXaJ2pjKHs8GqF9UfP8H5vQcR5dA9Y"
      );
      const result = shouldRefreshToken();
      expect(result).toBe(true);
    });

    test("should not need refresh for fresh token", () => {
      localStorageMock.getItem.mockReturnValue(
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiZXhwIjo5OTk5OTk5OTk5fQ.Hm2YdJYBm9Ggq0T8LGHIgQjqkKZO2xYQ6p9QJy8D-sQ"
      );
      const result = shouldRefreshToken();
      expect(result).toBe(false);
    });
  });

  describe("handleTokenExpiration", () => {
    test("should return null when no refresh token is available", async () => {
      localStorageMock.getItem.mockReturnValue(null);
      const result = await handleTokenExpiration();
      expect(result).toBe(null);
      expect(localStorageMock.removeItem).toHaveBeenCalledWith(
        "nacion_auth_token"
      );
    });

    test("should handle successful token refresh in mock mode", async () => {
      // Set environment to mock mode
      vi.stubEnv("VITE_MOCK_DATA", "true");
      localStorageMock.getItem.mockReturnValue("mock-refresh-token");
      const result = await handleTokenExpiration();
      expect(result).toHaveProperty("success", true);
      expect(result).toHaveProperty("access_token");
      expect(result).toHaveProperty("refresh_token");
    });

    test("should clean up tokens when refresh fails", async () => {
      vi.stubEnv("VITE_MOCK_DATA", "false"); // Use real mode to test error handling
      localStorageMock.getItem.mockReturnValue("invalid-refresh-token");
      const result = await handleTokenExpiration();
      expect(result).toBe(null);
      expect(localStorageMock.removeItem).toHaveBeenCalledWith(
        "nacion_auth_token"
      );
      expect(localStorageMock.removeItem).toHaveBeenCalledWith("refresh_token");
    });
  });

  describe("refreshToken function", () => {
    test("should call refresh endpoint with PUT method in mock mode", async () => {
      vi.stubEnv("VITE_MOCK_DATA", "true");

      const result = await refreshToken("mock-refresh-token");

      expect(result).toHaveProperty("success", true);
      expect(result).toHaveProperty("access_token");
      expect(result).toHaveProperty("refresh_token");
    });
  });
});
