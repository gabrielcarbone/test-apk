declare global {
  namespace ImportMeta {
    interface Env {
      VITE_BASE_URL_API: string;
      VITE_STORAGE_KEY_AUTH_TOKEN: string;
      VITE_STORAGE_KEY_REFRESH_TOKEN: string;
      VITE_STORAGE_KEY_USER_DATA: string;
      VITE_STORAGE_KEY_POLIZAS: string;
      VITE_STORAGE_KEY_SELECTED_POLIZA: string;
    }
  }
}

export {};