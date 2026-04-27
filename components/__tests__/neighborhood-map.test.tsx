import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import { NeighborhoodMap } from "@/components/neighborhood-map"

const BAIRROS_MOCK = [
  { slug: "plano-piloto", name: "Plano Piloto", href: "/imoveis?bairro=Plano%20Piloto" },
  { slug: "lago-sul", name: "Lago Sul", href: "/imoveis?bairro=Lago%20Sul" },
  { slug: "aguas-claras", name: "Águas Claras", href: "/imoveis?bairro=%C3%81guas%20Claras" },
]

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
