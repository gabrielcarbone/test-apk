import { withMockDelay } from './mockUtils';
import type { Poliza } from '../types/polizaTypes';

const mockPolizasData: Poliza[] = [
  {
    id_poliza: "10224636",
    cd_sucursal: null,
    desc_ramo: "AUTOMOTORES",
    cd_ramo: 4,
    ramo: 4,
    ramoVida: 6,
    planRetiro: 0,
    producto: null,
    poliza: "2002129",
    certificado: null,
    riesgo: 0,
    descripcion: "FIAT-CROMA 2000 IE 2020 AAS456",
    vigente: "S",
    negocio: "PATRIMONIALES_IMPLEMENTOR",
    fe_inicio_vigencia: "02/09/2025",
    fe_fin_vigencia: "02/10/2025",
    tipo_persona: null,
    tipo_solicitud: null,
    nro_solicitud: 0
  },
  {
    id_poliza: "10224637",
    cd_sucursal: null,
    desc_ramo: "AUTOMOTORES",
    cd_ramo: 4,
    ramo: 4,
    ramoVida: 6,
    planRetiro: 0,
    producto: null,
    poliza: "2002130",
    certificado: null,
    riesgo: 0,
    descripcion: "TOYOTA COROLLA 1.8 XEI 2019 ABC123",
    vigente: "S",
    negocio: "PATRIMONIALES_IMPLEMENTOR",
    fe_inicio_vigencia: "15/08/2024",
    fe_fin_vigencia: "15/08/2025",
    tipo_persona: null,
    tipo_solicitud: null,
    nro_solicitud: 0
  }
];

export const getMockPolizas = (): Promise<Poliza[]> => {
  return withMockDelay(() => mockPolizasData);
};

export const getMockPolizaById = (id: string): Promise<Poliza | null> => {
  return withMockDelay(() => {
    const poliza = mockPolizasData.find(p => p.id_poliza === id);
    return poliza || null;
  });
};