import { fireEvent, render, screen } from "@testing-library/react"
import { describe, expect, it, vi } from "vitest"
import { HeroSection } from "@/components/hero-section"
import type { FilterOption } from "@/lib/properties/filter-options"

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: vi.fn() }),
}))

const cityOptions: FilterOption[] = [{ value: "Brasília", label: "Brasília" }]
const neighborhoodOptions: FilterOption[] = [{ value: "Plano Piloto", label: "Plano Piloto" }]

describe("HeroSection", () => {
  it("exibe filtros principais na busca inicial", () => {
    render(<HeroSection cityOptions={cityOptions} neighborhoodOptions={neighborhoodOptions} />)

    expect(screen.getByRole("combobox", { name: "Tipo de negócio" })).toBeInTheDocument()
    expect(screen.getByRole("combobox", { name: "Tipo de imóvel" })).toBeInTheDocument()
    expect(screen.getByRole("combobox", { name: "Cidade" })).toBeInTheDocument()
    expect(screen.getByRole("combobox", { name: "Bairro" })).toBeInTheDocument()
  })

  it("exibe quartos e vagas somente apos abrir busca avancada", async () => {
    render(<HeroSection cityOptions={cityOptions} neighborhoodOptions={neighborhoodOptions} />)

    // Não deve estar visível inicialmente (no DOM mas oculto pelo Radix Collapsible ou não renderizado)
    expect(screen.queryByRole("combobox", { name: "Min. quartos" })).not.toBeInTheDocument()

    const trigger = screen.getByRole("button", { name: "Abrir busca avançada" })
    fireEvent.click(trigger)

    expect(await screen.findByRole("combobox", { name: "Min. quartos" })).toBeVisible()
    expect(await screen.findByRole("combobox", { name: "Min. vagas" })).toBeVisible()
    expect(screen.getByRole("textbox", { name: "Palavra-chave" })).toBeInTheDocument()
    expect(screen.getByRole("textbox", { name: "Código do imóvel" })).toBeInTheDocument()
  })
})
