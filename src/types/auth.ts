// Authentication related interfaces

export interface LoginRequest {
  username: string;
  password: string;
}

export interface RefreshTokenRequest {
  refresh_token: string;
}

export interface LoginResponse {
  success: boolean;
  token?: string;
  access_token?: string;
  refresh_token?: string;
  usuario_oracle?: string;
  usuario_login?: string;
  email?: string;
  nombre?: string;
  tipo_doc?: string;
  desc_tipo_doc?: string;
  numero_doc?: string;
  telefono_fijo?: string;
  telefono_movil?: string;
  user?: {
    id: string;
    name: string;
    email: string;
  };
  message?: string;
}

export interface AuthError {
  message: string;
  code?: string;
  status?: number;
}

export interface AuthContextType {
  user: UserData | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  showWelcomeMessage: boolean;
  setUser: (user: UserData | null) => void;
  logout: () => void;
  triggerWelcomeMessage: () => void;
  loadUserData: () => Promise<void>;
}

// Import UserData from user.ts to avoid circular dependencies
import type { UserData } from './user';