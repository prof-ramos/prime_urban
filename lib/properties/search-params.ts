import { DEFAULT_FILTERS, DEFAULT_MAX_PRICE } from "@/lib/properties/filter-options"
import type { FilterState } from "@/lib/properties/types"

type SearchParamsLike = {
  get(name: string): string | null
}

export function parseFiltersFromSearchParams(searchParams: SearchParamsLike): FilterState {
  const minPrice = parseNumber(searchParams.get("precoMin"), DEFAULT_FILTERS.minPrice)
  const maxPrice = parseNumber(searchParams.get("precoMax"), DEFAULT_MAX_PRICE)

  return {
    ...DEFAULT_FILTERS,
    search: searchParams.get("q") || DEFAULT_FILTERS.search,
    transactionType: searchParams.get("tipo") || DEFAULT_FILTERS.transactionType,
    propertyType: searchParams.get("imovel") || DEFAULT_FILTERS.propertyType,
    city: searchParams.get("cidade") || DEFAULT_FILTERS.city,
    neighborhood: searchParams.get("bairro") || DEFAULT_FILTERS.neighborhood,
    code: searchParams.get("codigo") || DEFAULT_FILTERS.code,
    minPrice,
    maxPrice,
    bedrooms: searchParams.get("quartos") || DEFAULT_FILTERS.bedrooms,
    parkingSpaces: searchParams.get("vagas") || DEFAULT_FILTERS.parkingSpaces,
  }
}

export function toPropertySearchParams(filters: FilterState): URLSearchParams {
  const params = new URLSearchParams()

  setIfPresent(params, "tipo", filters.transactionType)
  setIfPresent(params, "imovel", filters.propertyType)
  setIfPresent(params, "cidade", filters.city)
  setIfPresent(params, "bairro", filters.neighborhood)
  setIfPresent(params, "q", filters.search)
  setIfPresent(params, "codigo", filters.code)
  setIfPresent(params, "quartos", filters.bedrooms)
  setIfPresent(params, "vagas", filters.parkingSpaces)

  if (Number.isFinite(filters.minPrice) && filters.minPrice > DEFAULT_FILTERS.minPrice) {
    params.set("precoMin", String(filters.minPrice))
  }

  if (Number.isFinite(filters.maxPrice) && filters.maxPrice < DEFAULT_MAX_PRICE) {
    params.set("precoMax", String(filters.maxPrice))
  }

  return params
}

function parseNumber(value: string | null, fallback: number) {
  if (!value) return fallback
  const parsed = Number(value)
  return Number.isFinite(parsed) ? parsed : fallback
}

function setIfPresent(params: URLSearchParams, key: string, value: string) {
  const trimmedValue = value.trim()
  if (trimmedValue) params.set(key, trimmedValue)
}
