import type { RiesgosResponse, Riesgo } from "../types/riesgoTypes";
import { getMockRiesgos } from "../mocks/riesgosMock";
import { createApiClient } from "./api";
import { getUserData } from "./authService";

const riesgosEndPoints = {
  getByUser: "/mobile_pru/api/usuario/riesgo",
};

class RiesgosService {
  private apiClient = createApiClient({
    baseURL: import.meta.env.VITE_BASE_URL_API,
  });

  async getAllRiesgos(): Promise<RiesgosResponse> {
    if (import.meta.env.VITE_MOCK_DATA === "true") {
      console.log("Using mock data for Riesgos");
      return await getMockRiesgos();
    }

    const userData = getUserData();
    if (!userData || !userData.tipo_doc || !userData.numero_doc) {
      throw new Error("Faltan datos del usuario o estan incompletos");
    }

    const requestBody = {
      tipoDoc: userData.tipo_doc,
      numeroDoc: userData.numero_doc,
    };

    const response = await this.apiClient.post<RiesgosResponse>(
      riesgosEndPoints.getByUser,
      requestBody
    );

    setStoredRiesgos(response.data.riesgos);

    return response.data;
  }

  async loadAndCacheRiesgos(): Promise<RiesgosResponse> {
    return await this.getAllRiesgos();
  }
}

// Funciones para manejo de riesgos en localStorage
export const getStoredRiesgos = (): Riesgo[] | null => {
  const data = localStorage.getItem(
    import.meta.env.VITE_STORAGE_KEY_RIESGOS || "riesgos_data"
  );
  return data ? JSON.parse(data) : null;
};

export const setStoredRiesgos = (riesgosData: Riesgo[]): void => {
  localStorage.setItem(
    import.meta.env.VITE_STORAGE_KEY_RIESGOS || "riesgos_data",
    JSON.stringify(riesgosData)
  );
  // Disparar evento personalizado para notificar cambios
  window.dispatchEvent(new CustomEvent('riesgos-updated'));
};

export const removeStoredRiesgos = (): void => {
  localStorage.removeItem(
    import.meta.env.VITE_STORAGE_KEY_RIESGOS || "riesgos_data"
  );
};

export const hasStoredRiesgos = (): boolean => {
  return !!getStoredRiesgos();
};

const riesgosServiceInstance = new RiesgosService();

export default riesgosServiceInstance;
