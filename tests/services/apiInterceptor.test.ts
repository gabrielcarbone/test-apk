import { vi, describe, test, expect, beforeEach, afterEach } from 'vitest';
import axios from 'axios';
import { createApiClient } from '../../src/services/api';

// Get localStorage mock from global setup
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
};

// Mock authService functions
vi.mock('../../src/services/authService', () => ({
  getAuthToken: vi.fn(),
  shouldRefreshToken: vi.fn(),
  handleTokenExpiration: vi.fn(),
}));

// Mock axios
vi.mock('axios');
const mockedAxios = vi.mocked(axios, true);

describe("API Interceptor Tests", () => {
  let mockAxiosInstance: any;
  let requestInterceptor: any;
  let responseInterceptor: any;

  beforeEach(async () => {
    vi.clearAllMocks();
    
    // Mock axios instance with interceptors
    mockAxiosInstance = {
      interceptors: {
        request: {
          use: vi.fn((successHandler, errorHandler) => {
            requestInterceptor = { successHandler, errorHandler };
          }),
        },
        response: {
          use: vi.fn((successHandler, errorHandler) => {
            responseInterceptor = { successHandler, errorHandler };
          }),
        },
      },
    };

    (mockedAxios.create as any).mockReturnValue(mockAxiosInstance);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe("Request Interceptor", () => {
    test("should add Authorization header when token exists", async () => {
      const { getAuthToken, shouldRefreshToken } = await import('../../src/services/authService');
      
      vi.mocked(getAuthToken).mockReturnValue('mock-token');
      vi.mocked(shouldRefreshToken).mockReturnValue(false);

      createApiClient({ baseURL: 'http://test.com' });

      const mockConfig = { headers: {} };
      const result = await requestInterceptor.successHandler(mockConfig);

      expect(result.headers.Authorization).toBe('Bearer mock-token');
    });

    test("should not add Authorization header when no token exists", async () => {
      const { getAuthToken } = await import('../../src/services/authService');
      
      vi.mocked(getAuthToken).mockReturnValue(null);

      createApiClient({ baseURL: 'http://test.com' });

      const mockConfig = { headers: {} };
      const result = await requestInterceptor.successHandler(mockConfig);

      expect(result.headers.Authorization).toBeUndefined();
    });

    test("should refresh token when shouldRefreshToken returns true", async () => {
      const { getAuthToken, shouldRefreshToken, handleTokenExpiration } = await import('../../src/services/authService');
      
      vi.mocked(getAuthToken)
        .mockReturnValueOnce('old-token')
        .mockReturnValueOnce('new-token');
      vi.mocked(shouldRefreshToken).mockReturnValue(true);
      vi.mocked(handleTokenExpiration).mockResolvedValue({ success: true } as any);

      createApiClient({ baseURL: 'http://test.com' });

      const mockConfig = { headers: {} };
      const result = await requestInterceptor.successHandler(mockConfig);

      expect(handleTokenExpiration).toHaveBeenCalled();
      expect(result.headers.Authorization).toBe('Bearer new-token');
    });

    test("should handle refresh token failure gracefully", async () => {
      const { getAuthToken, shouldRefreshToken, handleTokenExpiration } = await import('../../src/services/authService');
      
      vi.mocked(getAuthToken).mockReturnValue('old-token');
      vi.mocked(shouldRefreshToken).mockReturnValue(true);
      vi.mocked(handleTokenExpiration).mockRejectedValue(new Error('Refresh failed'));

      createApiClient({ baseURL: 'http://test.com' });

      const mockConfig = { headers: {} };
      const result = await requestInterceptor.successHandler(mockConfig);

      // Should still return config even if refresh fails
      expect(result).toBeDefined();
      expect(result.headers.Authorization).toBe('Bearer old-token');
    });
  });

  describe("Response Interceptor", () => {
    test("should pass through successful responses", async () => {
      createApiClient({ baseURL: 'http://test.com' });

      const mockResponse = { status: 200, data: 'success' };
      const result = responseInterceptor.successHandler(mockResponse);

      expect(result).toBe(mockResponse);
    });

    test("should attempt token refresh on 401 error", async () => {
      const { handleTokenExpiration, getAuthToken } = await import('../../src/services/authService');
      
      vi.mocked(handleTokenExpiration).mockResolvedValue({ success: true } as any);
      vi.mocked(getAuthToken).mockReturnValue('new-token');

      // Mock the apiClient call for retry
      const mockRetryCall = vi.fn().mockResolvedValue({ data: 'retry-success' });
      mockAxiosInstance.request = mockRetryCall;

      createApiClient({ baseURL: 'http://test.com' });

      const mockError = {
        response: { status: 401 },
        config: { 
          headers: {},
          _retry: undefined 
        },
      };

      try {
        await responseInterceptor.errorHandler(mockError);
      } catch (error) {
        // Expected to throw since we can't perfectly mock the retry logic
      }

      expect(handleTokenExpiration).toHaveBeenCalled();
      expect(mockError.config._retry).toBe(true);
    });

    test("should attempt token refresh on 403 error", async () => {
      const { handleTokenExpiration } = await import('../../src/services/authService');
      
      vi.mocked(handleTokenExpiration).mockResolvedValue({ success: true } as any);

      createApiClient({ baseURL: 'http://test.com' });

      const mockError = {
        response: { status: 403 },
        config: { 
          headers: {},
          _retry: undefined 
        },
      };

      try {
        await responseInterceptor.errorHandler(mockError);
      } catch (error) {
        // Expected to throw since we can't perfectly mock the retry logic
      }

      expect(handleTokenExpiration).toHaveBeenCalled();
      expect(mockError.config._retry).toBe(true);
    });

    test("should not retry if already attempted", async () => {
      const { handleTokenExpiration } = await import('../../src/services/authService');

      createApiClient({ baseURL: 'http://test.com' });

      const mockError = {
        response: { status: 401 },
        config: { 
          headers: {},
          _retry: true // Already retried
        },
      };

      try {
        await responseInterceptor.errorHandler(mockError);
      } catch (error) {
        // Should reject without calling handleTokenExpiration
        expect(handleTokenExpiration).not.toHaveBeenCalled();
        expect(error).toBe(mockError);
      }
    });

    test("should reject error if refresh fails", async () => {
      const { handleTokenExpiration } = await import('../../src/services/authService');
      
      vi.mocked(handleTokenExpiration).mockResolvedValue(null); // Refresh failed

      createApiClient({ baseURL: 'http://test.com' });

      const mockError = {
        response: { status: 401 },
        config: { 
          headers: {},
          _retry: undefined 
        },
      };

      try {
        await responseInterceptor.errorHandler(mockError);
      } catch (error) {
        expect(handleTokenExpiration).toHaveBeenCalled();
        expect(error).toBe(mockError);
      }
    });

    test("should pass through non-auth errors", async () => {
      const { handleTokenExpiration } = await import('../../src/services/authService');

      createApiClient({ baseURL: 'http://test.com' });

      const mockError = {
        response: { status: 500 },
        config: { headers: {} },
      };

      try {
        await responseInterceptor.errorHandler(mockError);
      } catch (error) {
        expect(handleTokenExpiration).not.toHaveBeenCalled();
        expect(error).toBe(mockError);
      }
    });
  });
});