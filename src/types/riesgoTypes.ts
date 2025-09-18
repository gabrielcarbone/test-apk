export interface Riesgo {
  rampol: string;
  numero_poliza: string;
  numero_riesgo: string;
  vehiculo: string;
  cod_cobertura: string;
  descripcion_cobertura: string;
  nombre_asegurado: string;
  domicilio_asegurado: string;
  provincia_asegurado: string | null;
  estado_riesgo: string;
  inicio_vigencia: string;
  fin_vigencia: string;
  patente: string;
  numero_motor: string;
  numero_chasis: string;
  anio: string;
  ult_endoso: string | null;
  estado_poliza: string | null;
  nombre_prov_asistencia: string;
  telefono_prov_asistencia: string;
  desc_estado: string;
  estado: string;
  telefono_atencion: string | null;
}

export interface RiesgosResponse {
  riesgos: Riesgo[];
  telefono_atencion: string;
  whatsapp: string;
}