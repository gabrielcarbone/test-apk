import { defineConfig } from 'vite'

export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./tests/setup.ts', '@testing-library/jest-dom/vitest'],
    include: ['tests/components/**/*.{test,spec}.{js,ts,jsx,tsx}']
  },
  define: {
    'import.meta.env.VITE_BASE_URL_API': '"https://capacitacion.nacion-seguros.com.ar:4445"',
    'import.meta.env.VITE_STORAGE_KEY_AUTH_TOKEN': '"nacion_auth_token"',
    'import.meta.env.VITE_STORAGE_KEY_REFRESH_TOKEN': '"refresh_token"',
    'import.meta.env.VITE_STORAGE_KEY_USER_DATA': '"user_data"',
    'import.meta.env.VITE_STORAGE_KEY_POLIZAS': '"polizas_data"',
    'import.meta.env.VITE_STORAGE_KEY_SELECTED_POLIZA': '"selected_poliza"',
    'import.meta.env.VITE_MOCK_DATA': '"false"',
    'import.meta.env.VITE_MOCK_DELAY': '"800"'
  }
})