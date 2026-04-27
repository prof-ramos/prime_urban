import { render, screen } from "@testing-library/react"
import { describe, expect, it, vi } from "vitest"
import { TestimonialsSection } from "@/components/testimonials-section"
import { testimonials } from "@/lib/testimonials"

vi.mock("next/image", () => ({
  default: ({ src, alt, ...props }: { src: string; alt: string; [key: string]: unknown }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} {...props} />
  ),
}))

const TESTIMONIALS_COUNT = testimonials.length

describe("TestimonialsSection", () => {
  it("renderiza tres depoimentos com fotos e textos", () => {
    render(<TestimonialsSection />)

    expect(screen.getByRole("heading", { name: "Clientes que encontraram seu lugar" })).toBeInTheDocument()
    expect(screen.getAllByAltText(/^Foto de /)).toHaveLength(TESTIMONIALS_COUNT)
    expect(screen.getByAltText("Foto de Mariana e Felipe Costa")).toBeInTheDocument()
    expect(screen.getByText("Mariana e Felipe Costa")).toBeInTheDocument()
    expect(screen.getByText("Renata Albuquerque")).toBeInTheDocument()
    expect(screen.getByText("Eduardo Vieira")).toBeInTheDocument()
    expect(screen.getByText("Compradores · Lago Sul")).toBeInTheDocument()
    expect(screen.getByText("Investidora · Noroeste")).toBeInTheDocument()
    expect(screen.getByText("Locador · Águas Claras")).toBeInTheDocument()
    expect(screen.getAllByLabelText("Avaliação 5 de 5")).toHaveLength(TESTIMONIALS_COUNT)
    expect(
      screen.getByText(/A PrimeUrban entendeu exatamente o tipo de casa que queríamos/i),
    ).toBeInTheDocument()
    expect(screen.getByText(/Recebi dados de liquidez/i)).toBeInTheDocument()
    expect(screen.getByText(/visitas qualificadas/i)).toBeInTheDocument()
  })
})
