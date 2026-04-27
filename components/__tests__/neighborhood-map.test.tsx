import { render, screen } from "@testing-library/react"
import { describe, expect, it, vi } from "vitest"
import { NeighborhoodMap } from "@/components/neighborhood-map"
import { mockNeighborhoods } from "@/lib/mock-data"

const BAIRROS_MOCK = ["plano-piloto", "lago-sul", "aguas-claras"].map((slug) => {
  const n = mockNeighborhoods.find((x) => x.slug === slug)!
  return { slug, name: n.name, href: `/imoveis?bairro=${encodeURIComponent(n.name)}` }
})

describe("NeighborhoodMap", () => {
  it("renderiza pins clicaveis para busca de imoveis por bairro", () => {
    render(<NeighborhoodMap />)

    expect(
      screen.getByRole("heading", { name: "Mapa dos bairros mais procurados" }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole("link", { name: new RegExp(`Ver imóveis em ${BAIRROS_MOCK[0].name}`, "i") }),
    ).toHaveAttribute("href", BAIRROS_MOCK[0].href)
    expect(
      screen.getByRole("link", { name: new RegExp(`Ver imóveis em ${BAIRROS_MOCK[1].name}`, "i") }),
    ).toHaveAttribute("href", BAIRROS_MOCK[1].href)
    expect(
      screen.getByRole("link", { name: new RegExp(`Ver imóveis em ${BAIRROS_MOCK[2].name}`, "i") }),
    ).toHaveAttribute("href", BAIRROS_MOCK[2].href)
  })
})
