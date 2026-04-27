import type { FilterState, Property, PropertyType } from "@/lib/properties/types"

export type FilterOption = {
  value: string
  label: string
}

export const DEFAULT_MAX_PRICE = 10000000

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
