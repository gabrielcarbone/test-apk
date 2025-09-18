import type {
  Poliza,
  PolizasApiResponse,
  PolizaDetalle,
  PolizaDetalleApiResponse,
  PolizaExtendida,
} from "../types/polizaTypes";
import { getMockPolizas, getMockPolizaById } from "../mocks/polizasMock";
import { createApiClient } from "./api";
import { getUserData } from "./authService";

export type { Poliza, PolizasApiResponse, PolizaExtendida, PolizaDetalle };

const polizasEndPoints = {
  getAllActiveByUser: "/mobile_pru/api/polizasvigentes",
  getById: "/mobile_pru/api/detallepoliza",
};

// Función para mapear la respuesta del API al tipo extendido
const mapPolizaDetalleToExtendida = (
  polizaOriginal: Poliza,
  polizaDetalle: PolizaDetalle
): PolizaExtendida => {
  return {
    // Datos originales de la póliza
    ...polizaOriginal,
    // Datos adicionales del detalle
    fechaEmision: polizaDetalle.fechaEmision,
    estado: polizaDetalle.estado,
    planComer: polizaDetalle.planComer,
    formaPago: polizaDetalle.formaPago,
    saldoVencido: polizaDetalle.saldoVencido,
    tomador: polizaDetalle.tomador,
    asegurado: polizaDetalle.asegurado,
    riesgos: polizaDetalle.riesgos,
    cuotas: polizaDetalle.cuotas,
    movimientos: polizaDetalle.movimientos,
    // Mapear campos que tienen nombres diferentes
    desc_ramo: polizaDetalle.dscramo,
    fe_inicio_vigencia: polizaDetalle.fechaVigenciaInicio,
    fe_fin_vigencia: polizaDetalle.fechaVigenciaFin,
    vigente: polizaDetalle.estado === "Vigente" ? "S" : "N",
  };
};

class PolizasService {
  private apiClient = createApiClient({
    baseURL: import.meta.env.VITE_BASE_URL_API,
  });

  async getAllPolizas(): Promise<Poliza[]> {
    if (import.meta.env.VITE_MOCK_DATA === "true") {
      console.log("Using mock data for Polizas");
      return await getMockPolizas();
    }

    const userData = getUserData();
    if (!userData || !userData.tipo_doc || !userData.numero_doc) {
      throw new Error("Faltan datos del usuario o estan incompletos");
    }

    const requestBody = {
      tipoDocumento: userData.tipo_doc,
      numeroDocumento: userData.numero_doc,
    };
    console.log(requestBody);
    const response = await this.apiClient.post<PolizasApiResponse>(
      polizasEndPoints.getAllActiveByUser,
      requestBody
    );
    setStoredPolizas(response.data.result);

    return response.data.result;
  }

  async getPolizaById(poliza: Poliza): Promise<PolizaExtendida | null> {
    if (import.meta.env.VITE_MOCK_DATA === "true") {
      console.log("Using mock data for Poliza by ID");
      return await getMockPolizaById(poliza.id_poliza);
    }

    const userData = getUserData();
    if (!userData || !userData.tipo_doc || !userData.numero_doc) {
      throw new Error("Faltan datos del usuario o estan incompletos");
    }
    const requestBody = {
      tipo_documento: userData.tipo_doc,
      nro_documento: userData.numero_doc,
      ...poliza,
    };

    const response = await this.apiClient.post<PolizaDetalleApiResponse>(
      polizasEndPoints.getById,
      requestBody
    );

    if (response.data && response.data.poliza) {
      return mapPolizaDetalleToExtendida(poliza, response.data.poliza);
    }

    return null;
  }

  async loadAndCachePolizas(): Promise<Poliza[]> {
    return await this.getAllPolizas();
  }
}

// Funciones para manejo de polizas en localStorage
export const getStoredPolizas = (): Poliza[] | null => {
  const data = localStorage.getItem(
    import.meta.env.VITE_STORAGE_KEY_POLIZAS || "polizas_data"
  );
  return data ? JSON.parse(data) : null;
};

export const setStoredPolizas = (polizasData: Poliza[]): void => {
  localStorage.setItem(
    import.meta.env.VITE_STORAGE_KEY_POLIZAS || "polizas_data",
    JSON.stringify(polizasData)
  );
  // Disparar evento personalizado para notificar cambios
  window.dispatchEvent(new CustomEvent("polizas-updated"));
};

export const removeStoredPolizas = (): void => {
  localStorage.removeItem(
    import.meta.env.VITE_STORAGE_KEY_POLIZAS || "polizas_data"
  );
};

export const hasStoredPolizas = (): boolean => {
  return !!getStoredPolizas();
};

const polizasServiceInstance = new PolizasService();

export default polizasServiceInstance;
