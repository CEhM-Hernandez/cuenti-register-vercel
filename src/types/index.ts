// ===================================================
// 1. Enums - Constantes fundamentales
// ===================================================
export enum StepName {
  EMAIL_PASSWORD,
  BUSINESS_TYPE,
  FULL_NAME,
  PHONE,
}

// ===================================================
// 2. Tipos relacionados con el flujo/proceso
// ===================================================
export type TotalSteps = {
  id: number
  title: React.ReactNode
  description: string
  imgUrl: string
}[]

export type StepOneProps = {
  lastStep: { step: number; name: StepName }
  businessType: string
}

export interface StepperProps {
  step: number
  TotalSteps: TotalSteps
}

// ===================================================
// 3. Tipos para el estado y datos de usuario
// ===================================================
export type ErrorFields = {
  businessType?: string
  otherBusiness?: string
  name?: string
  lastname?: string
  nameAndLastname?: string
  phoneNumber?: string
  countryCode?: string
  countryName?: string
  phonePrefix?: string
}

export type UserData = {
  businessType: string
  otherBusiness: string
  name: string
  lastname: string
  phoneNumber: string
  phonePrefix: string
  countryCode: string
  countryName: string
  step: number
  city: string
  department: string
}

// ===================================================
// 4. Tipos de dominio (entidades o conceptos específicos)
// ===================================================
export type Country = {
  countryCode: string
  countryName: string
  countryNumberPrefix?: string
}

export type Option = {
  value: string
  id: number
  icon: string
}

export type ActivityOptionProps = {
  option: Option
  selectedValue: string
  otherBusiness: string
  onSelect: (value: string) => void
}

// ===================================================
// 5. Props de componentes
// ===================================================
export interface CuentiInputProps {
  label: string | React.ReactNode
  name: string
  type: string
  placeholder: string
  autocomplete?: 'true' | 'false'
  classNames?: {
    input?: string[]
    inputWrapper?: string[]
    label?: string[]
    errorMessage?: string[]
  }
  [key: string]: any
  disabled?: boolean
}

// ===================================================
// 6. Tipos para datos de APIs externas
// ===================================================

// Resultado del servicio countyCuenti
export interface CountyCuentiResult {
  countryName: string
  nombreMunicipio: string
  nombreDepartamento: string
  currencySymbol: string
}

// Tipo para el país en la API (se renombra para diferenciarlo del dominio)
export interface ApiCountry {
  name: {
    common: string
    native?: Record<string, { official: string; common: string }>
  }
  cca2: string
  currency: string[]
}

// Tipo para la moneda en la API
export interface Currency {
  symbol_native: string
  code: string
}

// Tipo para la ciudad y departamento en la API
export interface CityDepartment {
  nombreDepartamento: string
  nombreMunicipio: string
}

export interface webhookData {
  email: string
  nombre: string
  surname: string
  nickName: string
  tipo_negocio_j4pro: string
  celular: string
  pais: string
  id_empresa_cuenti: string
  codigo_whatsapp: string
  estado: 'Demo Activo'
  ciclo_de_vida: 'Lead'
  viaje_del_cliente: 'Demo Activo'
  origen: 'App'
}

export interface CuentiUser {
  id_usuario: 0
  selectorSeleccionado: number
  email_usuario: string
  usuario: string
  celular: string
  clave: string
  nombre: string
  paisSeleccionado: string
  ciudad: string
  departamento: string
  simbolo_moneda: string
  id_vendedor: number
  esJ4pro: 1
}
