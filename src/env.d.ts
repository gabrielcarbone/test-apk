/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_NAME: string;
  readonly VITE_APP_VERSION: string;
  readonly VITE_BASE_URL_API: string;
  readonly VITE_AUTH_ENDPOINT: string;
  readonly VITE_STORAGE_KEY_AUTH_TOKEN: string;
  readonly VITE_STORAGE_KEY_REFRESH_TOKEN: string;
  readonly VITE_STORAGE_KEY_USER_DATA: string;
  readonly VITE_STORAGE_KEY_POLIZAS: string;
  readonly VITE_STORAGE_KEY_SELECTED_POLIZA: string;
  readonly VITE_DEFAULT_LANGUAGE: string;
  readonly VITE_DEBUG_MODE: string;
  readonly VITE_SUPPORT_URL: string;
  readonly VITE_CONTACT_PHONE: string;
  readonly VITE_ENABLE_NOTIFICATIONS: string;
  readonly VITE_ENABLE_CALENDAR: string;
  readonly VITE_ENABLE_PAYMENTS: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
