import { describe, expect, it } from "vitest"
import { DEFAULT_FILTERS } from "@/lib/properties/filter-options"
import {
  parseFiltersFromSearchParams,
  toPropertySearchParams,
} from "@/lib/properties/search-params"

describe("property search params", () => {
  it("parses the current URL contract into filters", () => {
    const params = new URLSearchParams({
      tipo: "venda",
      imovel: "apartamento",
      cidade: "Brasília",
      bairro: "Plano Piloto",
      q: "SQN",
      codigo: "PU-0001",
      quartos: "3",
      precoMin: "1000000",
      precoMax: "3000000",
      vagas: "2",
    })

    expect(parseFiltersFromSearchParams(params)).toEqual({
      search: "SQN",
      transactionType: "venda",
      propertyType: "apartamento",
      city: "Brasília",
      neighborhood: "Plano Piloto",
      code: "PU-0001",
      minPrice: 1000000,
      maxPrice: 3000000,
      bedrooms: "3",
      parkingSpaces: "2",
    })
  })

  it("uses defaults for absent or invalid numeric values", () => {
    const params = new URLSearchParams({ precoMin: "abc", precoMax: "NaN" })

    expect(parseFiltersFromSearchParams(params)).toEqual(DEFAULT_FILTERS)
  })

  it("serializes only active filters", () => {
    const params = toPropertySearchParams({
      ...DEFAULT_FILTERS,
      transactionType: "aluguel",
      propertyType: "casa",
      city: "Brasília",
      neighborhood: "Lago Sul",
      search: "piscina",
      code: "PU-0004",
      bedrooms: "4",
      minPrice: 2000000,
      maxPrice: 9000000,
      parkingSpaces: "3",
    })

    expect(params.toString()).toBe(
      "tipo=aluguel&imovel=casa&cidade=Bras%C3%ADlia&bairro=Lago+Sul&q=piscina&codigo=PU-0004&quartos=4&vagas=3&precoMin=2000000&precoMax=9000000",
    )
  })

  it("omits default values while keeping the public query keys stable", () => {
    expect(toPropertySearchParams(DEFAULT_FILTERS).toString()).toBe("")
  })
})
