// User data related interfaces

export interface UserData {
  usuario_oracle: string;
  usuario_login: string;
  email: string;
  nombre: string;
  tipo_doc?: string;
  desc_tipo_doc?: string;
  numero_doc?: string;
  telefono_fijo?: string;
  telefono_movil?: string;
  // Campos adicionales de otros servicios (se agregan dinámicamente)
  [key: string]: any;
}

export interface EnrichedUserData extends UserData {
  // Campos adicionales de servicios externos se pueden agregar aquí en el futuro
}