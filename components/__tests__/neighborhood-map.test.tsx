import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import { NeighborhoodMap } from "@/components/neighborhood-map"

describe("NeighborhoodMap", () => {
  it("renderiza pins clicaveis para busca de imoveis por bairro", () => {
    render(<NeighborhoodMap />)

    expect(
      screen.getByRole("heading", { name: "Mapa dos bairros mais procurados" }),
    ).toBeInTheDocument()
    expect(screen.getByRole("link", { name: /Ver imóveis em Plano Piloto/i })).toHaveAttribute(
      "href",
      "/imoveis?bairro=Plano%20Piloto",
    )
    expect(screen.getByRole("link", { name: /Ver imóveis em Lago Sul/i })).toHaveAttribute(
      "href",
      "/imoveis?bairro=Lago%20Sul",
    )
    expect(screen.getByRole("link", { name: /Ver imóveis em Águas Claras/i })).toHaveAttribute(
      "href",
      "/imoveis?bairro=%C3%81guas%20Claras",
    )
  })
})
