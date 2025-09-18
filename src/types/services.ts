// External services interfaces

// Generic service response pattern (for future services)
export interface ServiceResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}