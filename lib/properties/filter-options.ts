import type { FilterState, Property, PropertyType } from "@/lib/properties/types"

export type FilterOption = {
  value: string
  label: string
}

export const DEFAULT_MAX_PRICE = 10000000
export const PRICE_STEP = 100_000

export const DEFAULT_FILTERS: FilterState = {
  search: "",
  transactionType: "",
  propertyType: "",
  city: "",
  neighborhood: "",
  code: "",
  minPrice: 0,
  maxPrice: DEFAULT_MAX_PRICE,
  bedrooms: "",
  parkingSpaces: "",
}

export const PROPERTY_TYPES: Array<{ value: PropertyType; label: string }> = [
  { value: "apartamento", label: "Apartamento" },
  { value: "casa", label: "Casa" },
  { value: "cobertura", label: "Cobertura" },
  { value: "sala_comercial", label: "Sala Comercial" },
]

export const BEDROOM_OPTIONS: FilterOption[] = [
  { value: "1", label: "1+ quarto" },
  { value: "2", label: "2+ quartos" },
  { value: "3", label: "3+ quartos" },
  { value: "4", label: "4+ quartos" },
]

export const PARKING_OPTIONS: FilterOption[] = [
  { value: "1", label: "1+ vaga" },
  { value: "2", label: "2+ vagas" },
  { value: "3", label: "3+ vagas" },
  { value: "4", label: "4+ vagas" },
]

export function getCities(properties: Property[]): FilterOption[] {
  return toOptions(properties.map((property) => property.city))
}

export function getNeighborhoods(properties: Property[]): FilterOption[] {
  return toOptions(properties.map((property) => property.neighborhood))
}

function toOptions(values: string[]): FilterOption[] {
  return Array.from(new Set(values))
    .filter(Boolean)
    .sort((a, b) => a.localeCompare(b, "pt-BR"))
    .map((name) => ({ value: name, label: name }))
}
