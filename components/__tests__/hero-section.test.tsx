import { fireEvent, render, screen, waitFor } from "@testing-library/react"
import { describe, expect, it, vi } from "vitest"
import { HeroSection } from "@/components/hero-section"
import type { FilterOption } from "@/lib/properties/filter-options"

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: vi.fn() }),
}))

const cityOptions: FilterOption[] = [{ value: "Brasília", label: "Brasília" }]
const neighborhoodOptions: FilterOption[] = [{ value: "Plano Piloto", label: "Plano Piloto" }]

describe("HeroSection", () => {
  it("exibe quartos e vagas na busca principal com nomes acessiveis", () => {
    render(<HeroSection cityOptions={cityOptions} neighborhoodOptions={neighborhoodOptions} />)

    expect(screen.getByText("Min. quartos")).toBeInTheDocument()
    expect(screen.getByText("Min. vagas")).toBeInTheDocument()
    expect(screen.getByRole("combobox", { name: "Min. quartos" })).toBeInTheDocument()
    expect(screen.getByRole("combobox", { name: "Min. vagas" })).toBeInTheDocument()
  })

  it("mantem busca avancada como controle discreto com estado acessivel", async () => {
    render(<HeroSection cityOptions={cityOptions} neighborhoodOptions={neighborhoodOptions} />)

    const trigger = screen.getByRole("button", { name: "Abrir busca avançada" })

    expect(trigger).toBeVisible()

    fireEvent.click(trigger)

    await waitFor(() => {
      expect(screen.getByRole("button", { name: "Fechar busca avançada" })).toHaveAttribute(
        "aria-label",
        "Fechar busca avançada",
      )
      expect(screen.getByRole("textbox", { name: "Palavra-chave" })).toBeInTheDocument()
      expect(screen.getByRole("textbox", { name: "Código do imóvel" })).toBeInTheDocument()
    })
  })
})
