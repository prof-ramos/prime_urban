import { mockProperties } from "@/lib/mock-data"
import type { FilterState } from "@/components/property-filters"
import type { Property } from "@/components/property-card"

export type SortOption = "recent" | "price-asc" | "price-desc" | "area-desc"

export function filterProperties(
  filters: FilterState,
  sortBy: SortOption = "recent",
): Property[] {
  const {
    search,
    transactionType,
    propertyType,
    neighborhood,
    minPrice,
    maxPrice,
    bedrooms,
    parkingSpaces,
  } = filters

  let results = [...mockProperties]

  if (search) {
    const searchLower = search.toLowerCase()
    results = results.filter(
      (p) =>
        p.title.toLowerCase().includes(searchLower) ||
        p.address.toLowerCase().includes(searchLower) ||
        p.neighborhood.toLowerCase().includes(searchLower),
    )
  }

  if (transactionType) {
    results = results.filter((p) => p.transactionType === transactionType)
  }

  if (propertyType) {
    results = results.filter((p) => p.type === propertyType)
  }

  if (neighborhood) {
    results = results.filter((p) => p.neighborhood === neighborhood)
  }

  results = results.filter((p) => p.price >= minPrice && p.price <= maxPrice)

  if (bedrooms) {
    results = results.filter((p) => p.bedrooms >= parseInt(bedrooms))
  }

  if (parkingSpaces) {
    results = results.filter((p) => p.parkingSpaces >= parseInt(parkingSpaces))
  }

  switch (sortBy) {
    case "price-asc":
      results.sort((a, b) => a.price - b.price)
      break
    case "price-desc":
      results.sort((a, b) => b.price - a.price)
      break
    case "area-desc":
      results.sort((a, b) => b.privateArea - a.privateArea)
      break
    default:
      break
  }

  return results
}
