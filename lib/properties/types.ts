export type PropertyType = "apartamento" | "casa" | "cobertura" | "sala_comercial"

export type TransactionType = "venda" | "aluguel"

export interface Property {
  id: string
  code?: string
  slug: string
  title: string
  type: PropertyType
  transactionType: TransactionType
  price: number
  condoFee?: number
  iptu?: number
  city?: string
  neighborhood: string
  address: string
  privateArea: number
  totalArea?: number
  bedrooms: number
  suites?: number
  bathrooms: number
  parkingSpaces: number
  images: string[]
  featured?: boolean
  acceptsPets?: boolean
  solarOrientation?: string
}

export interface Neighborhood {
  name: string
  slug: string
  count: number
  description: string
  featured?: boolean
}

export interface FilterState {
  search: string
  transactionType: string
  propertyType: string
  city: string
  neighborhood: string
  code: string
  minPrice: number
  maxPrice: number
  bedrooms: string
  parkingSpaces: string
}

export type SortOption =
  | "default"
  | "recent"
  | "oldest"
  | "az"
  | "za"
  | "price-asc"
  | "price-desc"
  | "area-desc"
