import { describe, expect, it } from "vitest"
import {
  DEFAULT_FILTERS,
  DEFAULT_MAX_PRICE,
  PROPERTY_TYPES,
  getCities,
  getNeighborhoods,
} from "@/lib/properties/filter-options"
import type { Property } from "@/lib/properties/types"

const properties = [
  { city: "Brasília", neighborhood: "Lago Sul" },
  { city: "Brasília", neighborhood: "Plano Piloto" },
  { city: "Goiânia", neighborhood: "Setor Bueno" },
  { city: "Brasília", neighborhood: "Lago Sul" },
] as unknown as Property[]

describe("filter options", () => {
  it("exposes shared property types", () => {
    expect(PROPERTY_TYPES.map((type) => type.value)).toEqual([
      "apartamento",
      "casa",
      "cobertura",
      "sala_comercial",
    ])
  })

  it("keeps a shared default filter state", () => {
    expect(DEFAULT_FILTERS.maxPrice).toBe(DEFAULT_MAX_PRICE)
    expect(DEFAULT_FILTERS.search).toBe("")
  })

  it("returns sorted unique cities", () => {
    expect(getCities(properties)).toEqual([
      { value: "Brasília", label: "Brasília" },
      { value: "Goiânia", label: "Goiânia" },
    ])
  })

  it("returns sorted unique neighborhoods", () => {
    expect(getNeighborhoods(properties)).toEqual([
      { value: "Lago Sul", label: "Lago Sul" },
      { value: "Plano Piloto", label: "Plano Piloto" },
      { value: "Setor Bueno", label: "Setor Bueno" },
    ])
  })
})
