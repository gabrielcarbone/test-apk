"use strict";
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
            }
        }
    }
});
