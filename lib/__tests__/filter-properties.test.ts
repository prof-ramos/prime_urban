import { describe, it, expect } from "vitest"
import { filterProperties } from "@/lib/filter-properties"
import { mockProperties } from "@/lib/mock-data"
import { DEFAULT_FILTERS } from "@/lib/properties/filter-options"

const defaultFilters = DEFAULT_FILTERS

describe("filterProperties", () => {
  it("returns all properties by default", () => {
    const results = filterProperties(mockProperties, defaultFilters)
    expect(results).toHaveLength(mockProperties.length)
  })

  it("filters by search term (title)", () => {
    const results = filterProperties(mockProperties, { ...defaultFilters, search: "Cobertura" })
    expect(results).toHaveLength(1)
    expect(results[0].title).toContain("Cobertura")
  })

  it("filters by search term (address)", () => {
    const results = filterProperties(mockProperties, { ...defaultFilters, search: "SQNW" })
    expect(results).toHaveLength(1)
    expect(results[0].address).toContain("SQNW")
  })

  it("filters by search term (neighborhood)", () => {
    const results = filterProperties(mockProperties, { ...defaultFilters, search: "Lago Sul" })
    expect(results).toHaveLength(1)
    expect(results[0].neighborhood).toBe("Lago Sul")
  })

  it("filters by transaction type", () => {
    const results = filterProperties(mockProperties, { ...defaultFilters, transactionType: "aluguel" })
    expect(results.every((p) => p.transactionType === "aluguel")).toBe(true)
  })

  it("filters by property type", () => {
    const results = filterProperties(mockProperties, { ...defaultFilters, propertyType: "casa" })
    expect(results.every((p) => p.type === "casa")).toBe(true)
  })

  it("filters by neighborhood", () => {
    const results = filterProperties(mockProperties, { ...defaultFilters, neighborhood: "Plano Piloto" })
    expect(results.every((p) => p.neighborhood === "Plano Piloto")).toBe(true)
  })

  it("filters by city", () => {
    const results = filterProperties(mockProperties, { ...defaultFilters, city: "Brasília" })
    expect(results).toHaveLength(mockProperties.length)
  })

  it("filters by property code", () => {
    const results = filterProperties(mockProperties, { ...defaultFilters, code: "PU-0002" })
    expect(results).toHaveLength(1)
    expect(results[0].slug).toBe("cobertura-noroeste-sqnw-111")
  })

  it("searches by property code as a keyword", () => {
    const results = filterProperties(mockProperties, { ...defaultFilters, search: "PU-0004" })
    expect(results).toHaveLength(1)
    expect(results[0].slug).toBe("casa-lago-sul-shis-qi-25")
  })

  it("filters by price range", () => {
    const results = filterProperties(mockProperties, {
      ...defaultFilters,
      minPrice: 1000000,
      maxPrice: 3000000,
    })
    expect(results.every((p) => p.price >= 1000000 && p.price <= 3000000)).toBe(true)
  })

  it("filters by bedrooms", () => {
    const results = filterProperties(mockProperties, { ...defaultFilters, bedrooms: "4" })
    expect(results.every((p) => p.bedrooms >= 4)).toBe(true)
  })

  it("filters by parking spaces", () => {
    const results = filterProperties(mockProperties, { ...defaultFilters, parkingSpaces: "3" })
    expect(results.every((p) => p.parkingSpaces >= 3)).toBe(true)
  })

  it("combines multiple filters", () => {
    const results = filterProperties(mockProperties, {
      ...defaultFilters,
      propertyType: "apartamento",
      transactionType: "venda",
      bedrooms: "3",
    })
    expect(results.every((p) => p.type === "apartamento" && p.transactionType === "venda" && p.bedrooms >= 3)).toBe(true)
  })

  it("sorts by price ascending", () => {
    const results = filterProperties(mockProperties, defaultFilters, "price-asc")
    const prices = results.map((p) => p.price)
    expect(prices).toEqual([...prices].sort((a, b) => a - b))
  })

  it("sorts by price descending", () => {
    const results = filterProperties(mockProperties, defaultFilters, "price-desc")
    const prices = results.map((p) => p.price)
    expect(prices).toStrictEqual([...prices].sort((a, b) => b - a))
  })

  it("sorts alphabetically from A to Z", () => {
    const results = filterProperties(mockProperties, defaultFilters, "az")
    const titles = results.map((p) => p.title)
    expect(titles).toStrictEqual([...titles].sort((a, b) => a.localeCompare(b, "pt-BR")))
  })

  it("sorts alphabetically from Z to A", () => {
    const results = filterProperties(mockProperties, defaultFilters, "za")
    const titles = results.map((p) => p.title)
    expect(titles).toStrictEqual([...titles].sort((a, b) => b.localeCompare(a, "pt-BR")))
  })

  it("sorts by oldest mock entry first", () => {
    const results = filterProperties(mockProperties, defaultFilters, "oldest")
    expect(results[0].id).toBe("1")
  })

  it("sorts by recent mock entry first", () => {
    const results = filterProperties(mockProperties, defaultFilters, "recent")
    expect(results[0].id).toBe("12")
  })

  it("sorts by area descending", () => {
    const results = filterProperties(mockProperties, defaultFilters, "area-desc")
    const areas = results.map((p) => p.privateArea)
    expect(areas).toStrictEqual([...areas].sort((a, b) => b - a))
  })

  it("returns empty array when no matches", () => {
    const results = filterProperties(mockProperties, {
      ...defaultFilters,
      search: "inexistente",
    })
    expect(results).toEqual([])
  })
})
