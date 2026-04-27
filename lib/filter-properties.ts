import type { FilterState, Property, SortOption } from "@/lib/properties/types"

export function filterProperties(
  properties: Property[],
  filters: FilterState,
  sortBy: SortOption = "recent",
): Property[] {
  const {
    search,
    transactionType,
    propertyType,
    city,
    neighborhood,
    code,
    minPrice,
    maxPrice,
    bedrooms,
    parkingSpaces,
  } = filters

  let results = [...properties]

  if (search) {
    const searchLower = search.toLowerCase()
    results = results.filter(
      (p) =>
        p.title.toLowerCase().includes(searchLower) ||
        p.code?.toLowerCase().includes(searchLower) ||
        p.address.toLowerCase().includes(searchLower) ||
        p.city?.toLowerCase().includes(searchLower) ||
        p.neighborhood.toLowerCase().includes(searchLower),
    )
  }

  if (transactionType) {
    results = results.filter((p) => p.transactionType === transactionType)
  }

  if (propertyType) {
    results = results.filter((p) => p.type === propertyType)
  }

  if (city) {
    results = results.filter((p) => p.city === city)
  }

  if (neighborhood) {
    results = results.filter((p) => p.neighborhood === neighborhood)
  }

  if (code) {
    const codeLower = code.toLowerCase().trim()
    results = results.filter((p) => p.code?.toLowerCase().includes(codeLower))
  }

  if (Number.isFinite(minPrice) && Number.isFinite(maxPrice) && minPrice <= maxPrice) {
    results = results.filter((p) => p.price >= minPrice && p.price <= maxPrice)
  }

  if (bedrooms) {
    const minBedrooms = parseInt(bedrooms, 10)
    if (Number.isFinite(minBedrooms)) {
      results = results.filter((p) => p.bedrooms >= minBedrooms)
    }
  }

  if (parkingSpaces) {
    const minParking = parseInt(parkingSpaces, 10)
    if (Number.isFinite(minParking)) {
      results = results.filter((p) => p.parkingSpaces >= minParking)
    }
  }

  switch (sortBy) {
    case "recent":
      results.sort((a, b) => Number(b.id) - Number(a.id))
      break
    case "oldest":
      results.sort((a, b) => Number(a.id) - Number(b.id))
      break
    case "az":
      results.sort((a, b) => a.title.localeCompare(b.title, "pt-BR"))
      break
    case "za":
      results.sort((a, b) => b.title.localeCompare(a.title, "pt-BR"))
      break
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
