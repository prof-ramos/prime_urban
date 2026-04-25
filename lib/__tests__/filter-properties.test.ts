import { describe, it, expect } from "vitest"
import { filterProperties } from "@/lib/filter-properties"
import { mockProperties } from "@/lib/mock-data"

const defaultFilters = {
  search: "",
  transactionType: "",
  propertyType: "",
  neighborhood: "",
  minPrice: 0,
  maxPrice: 10000000,
  bedrooms: "",
  parkingSpaces: "",
}

describe("filterProperties", () => {
  it("returns all properties by default", () => {
    const results = filterProperties(defaultFilters)
    expect(results).toHaveLength(mockProperties.length)
  })

  it("filters by search term (title)", () => {
    const results = filterProperties({ ...defaultFilters, search: "Cobertura" })
    expect(results).toHaveLength(1)
    expect(results[0].title).toContain("Cobertura")
  })

  it("filters by search term (address)", () => {
    const results = filterProperties({ ...defaultFilters, search: "SQNW" })
    expect(results).toHaveLength(1)
    expect(results[0].address).toContain("SQNW")
  })

  it("filters by search term (neighborhood)", () => {
    const results = filterProperties({ ...defaultFilters, search: "Lago Sul" })
    expect(results).toHaveLength(1)
    expect(results[0].neighborhood).toBe("Lago Sul")
  })

  it("filters by transaction type", () => {
    const results = filterProperties({ ...defaultFilters, transactionType: "aluguel" })
    expect(results.every((p) => p.transactionType === "aluguel")).toBe(true)
  })

  it("filters by property type", () => {
    const results = filterProperties({ ...defaultFilters, propertyType: "casa" })
    expect(results.every((p) => p.type === "casa")).toBe(true)
  })

  it("filters by neighborhood", () => {
    const results = filterProperties({ ...defaultFilters, neighborhood: "Plano Piloto" })
    expect(results.every((p) => p.neighborhood === "Plano Piloto")).toBe(true)
  })

  it("filters by price range", () => {
    const results = filterProperties({
      ...defaultFilters,
      minPrice: 1000000,
      maxPrice: 3000000,
    })
    expect(results.every((p) => p.price >= 1000000 && p.price <= 3000000)).toBe(true)
  })

  it("filters by bedrooms", () => {
    const results = filterProperties({ ...defaultFilters, bedrooms: "4" })
    expect(results.every((p) => p.bedrooms >= 4)).toBe(true)
  })

  it("filters by parking spaces", () => {
    const results = filterProperties({ ...defaultFilters, parkingSpaces: "3" })
    expect(results.every((p) => p.parkingSpaces >= 3)).toBe(true)
  })

  it("combines multiple filters", () => {
    const results = filterProperties({
      ...defaultFilters,
      propertyType: "apartamento",
      transactionType: "venda",
      bedrooms: "3",
    })
    expect(results.every((p) => p.type === "apartamento" && p.transactionType === "venda" && p.bedrooms >= 3)).toBe(true)
  })

  it("sorts by price ascending", () => {
    const results = filterProperties(defaultFilters, "price-asc")
    const prices = results.map((p) => p.price)
    expect(prices).toEqual([...prices].sort((a, b) => a - b))
  })

  it("sorts by price descending", () => {
    const results = filterProperties(defaultFilters, "price-desc")
    const prices = results.map((p) => p.price)
    expect(prices).toStrictEqual([...prices].sort((a, b) => b - a))
  })

  it("sorts by area descending", () => {
    const results = filterProperties(defaultFilters, "area-desc")
    const areas = results.map((p) => p.privateArea)
    expect(areas).toStrictEqual([...areas].sort((a, b) => b - a))
  })

  it("returns empty array when no matches", () => {
    const results = filterProperties({
      ...defaultFilters,
      search: "inexistente",
    })
    expect(results).toEqual([])
  })
})
