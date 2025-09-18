import type { LoginRequest, LoginResponse, RefreshTokenRequest } from '../types';
import { withMockDelay } from './mockUtils';

export const authMock = {
  loginUser: async (_credentials?: LoginRequest): Promise<LoginResponse> => {
    return withMockDelay(() => ({
      success: true,
      token: "mock-jwt-token-12345",
      access_token: "mock-access-token",
      refresh_token: "mock-refresh-token",
      usuario_oracle: "MOCK_USER",
      usuario_login: "mockuser",
      email: "mock@example.com",
      nombre: "Usuario Mock",
      tipo_doc: "1",
      desc_tipo_doc: "DNI",
      numero_doc: "12345678",
      telefono_fijo: "011-1234-5678",
      telefono_movil: "011-9876-5432",
      user: {
        id: "1",
        name: "Usuario Mock",
        email: "mock@example.com",
      },
    }));
  },

  refreshToken: async (_request?: RefreshTokenRequest): Promise<LoginResponse> => {
    return withMockDelay(() => ({
      success: true,
      token: "mock-jwt-token-refreshed-67890",
      access_token: "mock-access-token-refreshed",
      refresh_token: "mock-refresh-token-refreshed",
      usuario_oracle: "MOCK_USER",
      usuario_login: "mockuser",
      email: "mock@example.com",
      nombre: "Usuario Mock",
      tipo_doc: "1",
      desc_tipo_doc: "DNI",
      numero_doc: "12345678",
      telefono_fijo: "011-1234-5678",
      telefono_movil: "011-9876-5432",
      user: {
        id: "1",
        name: "Usuario Mock",
        email: "mock@example.com",
      },
    }));
  },
};