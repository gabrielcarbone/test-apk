import type { Riesgo, RiesgosResponse } from '../types/riesgoTypes';
import { withMockDelay } from './mockUtils';

const mockRiesgosData: Riesgo[] = [
  {
    rampol: "4",
    numero_poliza: "2001000",
    numero_riesgo: "1",
    vehiculo: "TOYOTA COROLLA 1.8 XEI",
    cod_cobertura: "CN",
    descripcion_cobertura: "C NACION",
    nombre_asegurado: "JUAN CARLOS PEREZ",
    domicilio_asegurado: "AV. CORRIENTES 1234, CAPITAL FEDERAL",
    provincia_asegurado: "CAPITAL FEDERAL",
    estado_riesgo: "A",
    inicio_vigencia: "2024-03-15 00:00:00.0",
    fin_vigencia: "2025-03-15 00:00:00.0",
    patente: "AB123CD",
    numero_motor: "12345678",
    numero_chasis: "87654321",
    anio: "2020",
    ult_endoso: null,
    estado_poliza: null,
    nombre_prov_asistencia: "Esta Unidad cuenta con Servicio de Asistencia Mecánica. Solicítelo al: (0054) - 0800-999-0123",
    telefono_prov_asistencia: "0800 888 9999",
    desc_estado: "Vigente",
    estado: "VG",
    telefono_atencion: null
  },
  {
    rampol: "5",
    numero_poliza: "2001001", 
    numero_riesgo: "1",
    vehiculo: "FORD FOCUS 1.6 S",
    cod_cobertura: "TR",
    descripcion_cobertura: "TODO RIESGO",
    nombre_asegurado: "MARIA GONZALEZ",
    domicilio_asegurado: "BELGRANO 567, SAN ISIDRO",
    provincia_asegurado: "BUENOS AIRES",
    estado_riesgo: "A",
    inicio_vigencia: "2024-01-22 00:00:00.0",
    fin_vigencia: "2025-01-22 00:00:00.0",
    patente: "EF456GH",
    numero_motor: "87654321",
    numero_chasis: "12345678",
    anio: "2019",
    ult_endoso: null,
    estado_poliza: null,
    nombre_prov_asistencia: "Esta Unidad cuenta con Servicio de Asistencia Mecánica. Solicítelo al: (0054) - 0800-999-0123",
    telefono_prov_asistencia: "0800 888 9999",
    desc_estado: "Vigente", 
    estado: "VG",
    telefono_atencion: null
  }
];

export const getMockRiesgos = (): Promise<RiesgosResponse> => {
  return withMockDelay(() => ({
    riesgos: mockRiesgosData,
    telefono_atencion: "0800-888-9908",
    whatsapp: "https://api.whatsapp.com/send?phone=5491135600489"
  }));
};

export const getMockRiesgosByStatus = (status: string): Promise<RiesgosResponse> => {
  return withMockDelay(() => {
    const filteredData = mockRiesgosData.filter(riesgo => 
      riesgo.estado.toLowerCase() === status.toLowerCase()
    );
    
    return {
      riesgos: filteredData,
      telefono_atencion: "0800-888-9908",
      whatsapp: "https://api.whatsapp.com/send?phone=5491135600489"
    };
  });
};

export const getMockRiesgosByType = (_type: string): Promise<RiesgosResponse> => {
  return withMockDelay(() => {
    // Por ahora todos son automotor en el mock
    return {
      riesgos: mockRiesgosData,
      telefono_atencion: "0800-888-9908", 
      whatsapp: "https://api.whatsapp.com/send?phone=5491135600489"
    };
  });
};