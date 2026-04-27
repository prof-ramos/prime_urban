import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { PropertyGallery } from '../property-gallery'

vi.mock("next/image", () => ({
  default: ({ src, alt, ...props }: { src: string; alt: string; [key: string]: unknown }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} {...props} />
  ),
}))

const mockImages = [
  'https://example.com/1.jpg',
  'https://example.com/2.jpg',
]

describe('PropertyGallery', () => {
  it('renderiza imagem corretamente', () => {
    render(<PropertyGallery images={mockImages} title="Apartamento" />)
    expect(screen.getByAltText('Apartamento - Foto 1')).toBeInTheDocument()
  })

  it('navega para próxima imagem', () => {
    render(<PropertyGallery images={mockImages} title="Apartamento" />)
    const nextBtn = screen.getByLabelText('Próxima foto')
    fireEvent.click(nextBtn)
    // Após navegar, a imagem 2 deve ser visível (pode haver duplicatas mobile/desktop)
    expect(screen.getAllByAltText('Apartamento - Foto 2').length).toBeGreaterThan(0)
  })

  it('renderiza sem crash quando não há imagens', () => {
    render(<PropertyGallery images={[]} title="Apartamento" />)
    // O componente usa fallback /placeholder-property.jpg
    expect(screen.getByRole('img')).toBeInTheDocument()
  })
})
