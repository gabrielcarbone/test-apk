import { vi } from 'vitest';

// Mock localStorage for Node.js environment
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => { store[key] = value; },
    removeItem: (key: string) => { delete store[key]; },
    clear: () => { store = {}; },
  };
})();

// Mock window and navigator for Node.js environment  
Object.defineProperty(globalThis, 'window', {
  value: {
    localStorage: localStorageMock,
    navigator: {
      clipboard: {
        writeText: vi.fn(),
        readText: vi.fn(),
      },
    },
    dispatchEvent: vi.fn(),
  },
  writable: true,
});

// Mock navigator directly
Object.defineProperty(globalThis, 'navigator', {
  value: {
    clipboard: {
      writeText: vi.fn(),
      readText: vi.fn(),
    },
  },
  writable: true,
});

// Mock localStorage directly
Object.defineProperty(globalThis, 'localStorage', {
  value: localStorageMock,
  writable: true,
});

// Mock CustomEvent for Node.js environment
Object.defineProperty(globalThis, 'CustomEvent', {
  value: class CustomEvent {
    type: string;
    detail?: any;
    
    constructor(type: string, eventInitDict?: { detail?: any }) {
      this.type = type;
      this.detail = eventInitDict?.detail;
    }
  },
  writable: true,
});

// Mock import.meta for Jest ES modules
Object.defineProperty(globalThis, 'import', {
  value: {
    meta: {
      env: {
        VITE_BASE_URL_API: "https://capacitacion.nacion-seguros.com.ar:4445",
        VITE_STORAGE_KEY_AUTH_TOKEN: "nacion_auth_token",
        VITE_STORAGE_KEY_REFRESH_TOKEN: "refresh_token",
        VITE_STORAGE_KEY_USER_DATA: "user_data",
        VITE_STORAGE_KEY_POLIZAS: "polizas_data",
        VITE_STORAGE_KEY_SELECTED_POLIZA: "selected_poliza",
        VITE_STORAGE_KEY_FAQS: "faqs_data",
      }
    }
  }
});