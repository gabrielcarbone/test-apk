export interface Poliza {
  id_poliza: string;
  cd_sucursal: string | null;
  desc_ramo: string;
  cd_ramo: number;
  ramo: number;
  ramoVida: number;
  planRetiro: number;
  producto: string | null;
  poliza: string;
  certificado: string | null;
  riesgo: number;
  descripcion: string;
  vigente: string;
  negocio: string;
  fe_inicio_vigencia: string;
  fe_fin_vigencia: string;
  tipo_persona: string | null;
  tipo_solicitud: string | null;
  nro_solicitud: number;
}

export interface PolizasApiResponse {
  status: string;
  messageStatus: string | null;
  result: Poliza[];
}

// Tipos para la respuesta del API de detalle de póliza
export interface Persona {
  nomTom?: string;
  apeTom?: string;
  domTom?: string;
  codPTom?: string;
  localTom?: string;
  nacTom?: string;
  provTom?: string;
  nomAse?: string;
  apeAse?: string;
  domAse?: string;
  codPAse?: string;
  localAse?: string;
  nacAse?: string;
  provAse?: string;
  codigo?: string | null;
  nombre?: string | null;
  apellido?: string | null;
  domicilio?: string | null;
  codigoPostal?: string | null;
  localidad?: string | null;
  provincia?: string | null;
  nacionalidad?: string | null;
  telefono?: string | null;
  tipoDocumento?: string | null;
  numeroDocumento?: string | null;
  fechaNacimiento?: string | null;
  cuilCuit?: string | null;
  sexo?: string | null;
  calle?: string | null;
  numero?: string | null;
  piso?: string | null;
  departamento?: string | null;
  email?: string | null;
  pais?: string | null;
  descripcionTipoDocumento?: string | null;
  formattedCuilCuit?: string | null;
  descripcionSexo?: string | null;
}

export interface Riesgo {
  numero: number;
  sumAseg: number | null;
  iniVig: string;
  finVig: string;
  acciones: string | null;
  descripcion: string;
  estado: string;
}

export interface Cuota {
  endoso: string;
  cuota: string;
  vencimiento: string;
  importe: number;
  totales: number | null;
  pagado: string;
  saldo: number;
  suplemento: string;
  idCuota: number;
  importeEnprocesoDePago: number | null;
  cuotaPagaDecidir: boolean | null;
}

export interface Movimiento {
  suplemento: number;
  tipo: string;
  subtipo: string;
  fechaEmision: string;
  fechaIniVig: string;
  fechaFinVig: string;
  premio: number;
  premioCobrado: number;
}

export interface PolizaDetalle {
  poliza: string;
  fechaVigenciaInicio: string;
  fechaEmision: string;
  estado: string;
  sourceName: string | null;
  polizaId: string;
  suplemento: string | null;
  pedidoId: string | null;
  empresa: string | null;
  dscramo: string;
  ramo: number;
  descripcionPoliza: string;
  descripcion: string;
  fechaVigenciaFin: string;
  planComer: string;
  codigoPlanComer: string;
  facturacion: string | null;
  formaPago: string;
  idPersona: string | null;
  ramoVida: number;
  saldoVencido: number;
  tomador: Persona;
  asegurado: Persona;
  riesgos: Riesgo[];
  cuotas: Cuota[];
  siniestros: any[];
  gestiones: any[];
  movimientos: Movimiento[];
}

export interface PolizaDetalleApiResponse {
  status: string;
  messageStatus: string;
  poliza: PolizaDetalle;
}

// Tipo extendido que combina datos básicos con detalle
export interface PolizaExtendida extends Poliza {
  fechaEmision?: string;
  estado?: string;
  planComer?: string;
  formaPago?: string;
  saldoVencido?: number;
  tomador?: Persona;
  asegurado?: Persona;
  riesgos?: Riesgo[];
  cuotas?: Cuota[];
  movimientos?: Movimiento[];
}