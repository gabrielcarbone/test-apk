import riesgosService from "../../src/services/riesgosService";
import { RiesgosResponse } from "../../src/types/riesgoTypes";
import * as authService from "../../src/services/authService";
import * as api from "../../src/services/api";
import { vi } from "vitest";

vi.mock("../../src/services/authService");
vi.mock("../../src/services/api");

const mockGetUserData = vi.mocked(authService.getUserData);
const mockCreateApiClient = vi.mocked(api.createApiClient);

describe("Riesgos Service", () => {
  beforeEach(() => {
    vi.stubEnv("VITE_MOCK_DATA", "true");
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe("getAllRiesgos", () => {
    test("should return riesgos data with success structure", async () => {
      const response: RiesgosResponse = await riesgosService.getAllRiesgos();
      expect(response).toHaveProperty("riesgos");
      expect(response).toHaveProperty("telefono_atencion");
      expect(response).toHaveProperty("whatsapp");
      expect(Array.isArray(response.riesgos)).toBe(true);
    });

    test("should return riesgos with correct structure", async () => {
      const response: RiesgosResponse = await riesgosService.getAllRiesgos();
      expect(response.riesgos.length).toBeGreaterThan(0);
      // Verificar estructura de cada riesgo
      response.riesgos.forEach((riesgo) => {
        expect(riesgo).toHaveProperty("rampol");
        expect(riesgo).toHaveProperty("numero_poliza");
        expect(riesgo).toHaveProperty("numero_riesgo");
        expect(riesgo).toHaveProperty("inicio_vigencia");
        expect(riesgo).toHaveProperty("fin_vigencia");
        expect(riesgo).toHaveProperty("vehiculo");
        expect(riesgo).toHaveProperty("patente");
        expect(riesgo).toHaveProperty("estado");
        expect(riesgo).toHaveProperty("anio");
        expect(riesgo).toHaveProperty("descripcion_cobertura");
        expect(riesgo).toHaveProperty("nombre_asegurado");
        expect(typeof riesgo.rampol).toBe("string");
        expect(typeof riesgo.numero_poliza).toBe("string");
        expect(typeof riesgo.numero_riesgo).toBe("string");
        expect(typeof riesgo.inicio_vigencia).toBe("string");
        expect(typeof riesgo.fin_vigencia).toBe("string");
        expect(typeof riesgo.vehiculo).toBe("string");
        expect(typeof riesgo.patente).toBe("string");
        expect(typeof riesgo.estado).toBe("string");
        expect(typeof riesgo.anio).toBe("string");
        expect(typeof riesgo.descripcion_cobertura).toBe("string");
        expect(typeof riesgo.nombre_asegurado).toBe("string");
      });
    });

    test("should return riesgos with optional properties when present", async () => {
      const response: RiesgosResponse = await riesgosService.getAllRiesgos();
      const riesgosWithAsistencia = response.riesgos.filter(
        (r) => r.nombre_prov_asistencia
      );
      riesgosWithAsistencia.forEach((riesgo) => {
        expect(typeof riesgo.nombre_prov_asistencia).toBe("string");
      });
    });

    test("should return valid estado values", async () => {
      const response: RiesgosResponse = await riesgosService.getAllRiesgos();
      const validEstados = ["VG", "VN"];
      response.riesgos.forEach((riesgo) => {
        expect(validEstados).toContain(riesgo.estado);
      });
    });

    test("should return unique riesgo combinations", async () => {
      const response: RiesgosResponse = await riesgosService.getAllRiesgos();
      const riesgoKeys = response.riesgos.map(
        (r) => `${r.numero_poliza}-${r.numero_riesgo}`
      );
      const uniqueKeys = [...new Set(riesgoKeys)];
      expect(uniqueKeys.length).toBe(riesgoKeys.length);
    });

    test("should return contact information", async () => {
      const response: RiesgosResponse = await riesgosService.getAllRiesgos();
      expect(typeof response.telefono_atencion).toBe("string");
      expect(typeof response.whatsapp).toBe("string");
      expect(response.telefono_atencion.length).toBeGreaterThan(0);
      expect(response.whatsapp.length).toBeGreaterThan(0);
    });

    test("should handle mock delay properly", async () => {
      const startTime = Date.now();
      await riesgosService.getAllRiesgos();
      const endTime = Date.now();
      const duration = endTime - startTime;
      // Debe tomar al menos 500ms (considerando el mock delay)
      expect(duration).toBeGreaterThan(500);
    });

    test("should return consistent data on multiple calls", async () => {
      const response1 = await riesgosService.getAllRiesgos();
      const response2 = await riesgosService.getAllRiesgos();
      expect(response1.riesgos.length).toBe(response2.riesgos.length);
      expect(response1.telefono_atencion).toBe(response2.telefono_atencion);
      expect(response1.whatsapp).toBe(response2.whatsapp);
      // Verificar que los riesgos son los mismos
      response1.riesgos.forEach((riesgo, index) => {
        expect(riesgo.numero_poliza).toBe(
          response2.riesgos[index].numero_poliza
        );
        expect(riesgo.numero_riesgo).toBe(
          response2.riesgos[index].numero_riesgo
        );
        expect(riesgo.estado).toBe(response2.riesgos[index].estado);
      });
    });

    test("should return expected number of riesgos", async () => {
      const response: RiesgosResponse = await riesgosService.getAllRiesgos();
      // Verificar que retorna los riesgos mock esperados
      expect(response.riesgos.length).toBeGreaterThanOrEqual(1);
    });

    test("should return riesgos with correct date formats in vigencia", async () => {
      const response: RiesgosResponse = await riesgosService.getAllRiesgos();
      const dateRegex = /\d{4}-\d{2}-\d{2}/;
      response.riesgos.forEach((riesgo) => {
        expect(riesgo.inicio_vigencia).toMatch(dateRegex);
        expect(riesgo.fin_vigencia).toMatch(dateRegex);
      });
    });

    test("should return riesgos with valid patentes", async () => {
      const response: RiesgosResponse = await riesgosService.getAllRiesgos();
      response.riesgos.forEach((riesgo) => {
        expect(riesgo.patente).toBeDefined();
        expect(typeof riesgo.patente).toBe("string");
      });
    });
  });

  describe("loadAndCacheRiesgos", () => {
    test("should load and cache riesgos successfully", async () => {
      const response: RiesgosResponse =
        await riesgosService.loadAndCacheRiesgos();

      expect(response).toHaveProperty("riesgos");
      expect(response).toHaveProperty("telefono_atencion");
      expect(response).toHaveProperty("whatsapp");
      expect(Array.isArray(response.riesgos)).toBe(true);
    });
  });
});
