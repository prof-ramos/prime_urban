import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import { NeighborhoodMap } from "@/components/neighborhood-map"

describe("NeighborhoodMap (empty state)", () => {
  it("exibe fallback quando nenhum bairro está mapeado", () => {
    render(<NeighborhoodMap neighborhoods={[]} />)
    expect(screen.getByText(/Nenhum bairro disponível no momento/i)).toBeInTheDocument()
  })
})
