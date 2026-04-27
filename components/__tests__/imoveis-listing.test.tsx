import { render, screen } from "@testing-library/react"
import { describe, expect, it, vi } from "vitest"
import { ImoveisListing } from "@/components/imoveis-listing"
import type { Property } from "@/lib/properties/types"

// Mock do useRouter
vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: vi.fn(), replace: vi.fn() }),
  useSearchParams: () => new URLSearchParams(),
  usePathname: () => "/imoveis",
}))

const mockProperties: Property[] = [
  { id: "1", title: "Apto 1", transactionType: "venda", price: 500000, neighborhood: "Asa Sul", address: "SQS 101", type: "apartamento", images: [], privateArea: 100, bedrooms: 3, bathrooms: 2, parkingSpaces: 2, slug: "apto-1" },
  { id: "2", title: "Casa 1", transactionType: "aluguel", price: 3000, neighborhood: "Lago Sul", address: "SHIS QI 9", type: "casa", images: [], privateArea: 200, bedrooms: 4, bathrooms: 3, parkingSpaces: 3, slug: "casa-1" },
]

describe("ImoveisListing", () => {
  it("renderiza a lista de imóveis fornecida", () => {
    render(<ImoveisListing initialProperties={mockProperties} />)
    
    expect(screen.getByText("Apto 1")).toBeInTheDocument()
    expect(screen.getByText("Casa 1")).toBeInTheDocument()
    // O sumário é dividido em span (número) e texto
    expect(screen.getByText(String(mockProperties.length))).toBeInTheDocument()
    expect(screen.getByText(/imóveis encontrados/)).toBeInTheDocument()
  })

  it("exibe mensagem de estado vazio quando não há resultados", () => {
    render(<ImoveisListing initialProperties={[]} />)
    
    expect(screen.getByRole("heading", { name: "Nenhum imóvel encontrado" })).toBeInTheDocument()
    expect(screen.getByRole("button", { name: "Limpar filtros" })).toBeVisible()
  })
})
