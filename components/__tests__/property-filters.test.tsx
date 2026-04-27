import { fireEvent, render, screen } from "@testing-library/react"
import { beforeAll, describe, expect, it, vi } from "vitest"
import { PropertyFilters } from "@/components/property-filters"
import { DEFAULT_FILTERS } from "@/lib/properties/filter-options"
import type { FilterState } from "@/components/property-filters"

const cityOptions = [{ value: "Brasília", label: "Brasília" }]
const neighborhoodOptions = [{ value: "Plano Piloto", label: "Plano Piloto" }]

function renderPropertyFilters(filters: FilterState = DEFAULT_FILTERS) {
  const onFilterChange = vi.fn()
  const onReset = vi.fn()

  render(
    <PropertyFilters
      filters={filters}
      onFilterChange={onFilterChange}
      onReset={onReset}
      cityOptions={cityOptions}
      neighborhoodOptions={neighborhoodOptions}
    />,
  )

  return { onFilterChange, onReset }
}

describe("PropertyFilters", () => {
  beforeAll(() => {
    global.ResizeObserver = class ResizeObserver {
      observe() {}
      unobserve() {}
      disconnect() {}
    }
  })

  it("exibe quartos e vagas na busca principal com nomes acessiveis", () => {
    renderPropertyFilters()

    expect(screen.getByText("Min. quartos")).toBeInTheDocument()
    expect(screen.getByText("Min. vagas")).toBeInTheDocument()
    expect(screen.getByRole("combobox", { name: "Min. quartos" })).toBeInTheDocument()
    expect(screen.getByRole("combobox", { name: "Min. vagas" })).toBeInTheDocument()
  })

  it("reflete os valores de quartos e vagas dos filtros primarios", () => {
    renderPropertyFilters({
      ...DEFAULT_FILTERS,
      bedrooms: "2",
      parkingSpaces: "1",
    })

    expect(screen.getByRole("combobox", { name: "Min. quartos" })).toHaveTextContent(
      "2+ quartos",
    )
    expect(screen.getByRole("combobox", { name: "Min. vagas" })).toHaveTextContent("1+ vaga")
  })

  it("mantem busca avancada como controle discreto e remove quartos do avancado", () => {
    renderPropertyFilters()

    const trigger = screen.getByRole("button", { name: "Abrir busca avançada" })

    expect(trigger).toHaveClass("underline-offset-4")
    expect(trigger).toHaveAttribute("aria-label", "Abrir busca avançada")

    fireEvent.click(trigger)

    expect(screen.getByRole("button", { name: "Fechar busca avançada" })).toHaveAttribute(
      "aria-label",
      "Fechar busca avançada",
    )
    expect(screen.getByRole("textbox", { name: "Código do imóvel" })).toBeInTheDocument()
    expect(screen.getByRole("textbox", { name: "Palavra-chave" })).toBeInTheDocument()
    expect(screen.getByRole("slider", { name: "Preço mínimo" })).toBeInTheDocument()
    expect(screen.getByRole("slider", { name: "Preço máximo" })).toBeInTheDocument()
    expect(screen.getAllByText("Min. quartos")).toHaveLength(1)
  })

  it("emite minPrice e maxPrice juntos ao alterar a faixa de preco", () => {
    const { onFilterChange } = renderPropertyFilters()

    fireEvent.click(screen.getByRole("button", { name: "Abrir busca avançada" }))
    fireEvent.keyDown(screen.getByRole("slider", { name: "Preço mínimo" }), {
      key: "ArrowRight",
      code: "ArrowRight",
    })

    expect(onFilterChange).toHaveBeenCalledTimes(1)
    expect(onFilterChange).toHaveBeenLastCalledWith({
      ...DEFAULT_FILTERS,
      minPrice: 100000,
      maxPrice: DEFAULT_FILTERS.maxPrice,
    })
  })
})
