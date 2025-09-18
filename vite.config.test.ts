import { defineConfig } from 'vite'

export default defineConfig({
  test: {
    environment: 'node',
    globals: true,
    setupFiles: ['./tests/setup.ts'],
    include: ['tests/services/**/*.{test,spec}.{js,ts}', 'tests/*.{test,spec}.{js,ts}'],
    exclude: ['tests/components/**/*.{test,spec}.{js,ts,jsx,tsx}']
  },
  define: {
    'import.meta.env.VITE_BASE_URL_API': '"https://capacitacion.nacion-seguros.com.ar:4445"',
    'import.meta.env.VITE_STORAGE_KEY_AUTH_TOKEN': '"nacion_auth_token"',
    'import.meta.env.VITE_STORAGE_KEY_REFRESH_TOKEN': '"refresh_token"',
    'import.meta.env.VITE_STORAGE_KEY_USER_DATA': '"user_data"',
    'import.meta.env.VITE_STORAGE_KEY_RIESGOS': '"riesgos_data"',
  }
})