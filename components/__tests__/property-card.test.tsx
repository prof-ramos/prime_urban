import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { PropertyCard } from '../property-card'
import type { Property } from '@/lib/properties/types'

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: vi.fn() }),
  usePathname: () => "/",
  useSearchParams: () => new URLSearchParams(),
}))

vi.mock("next/image", () => ({
  default: ({ src, alt, ...props }: { src: string; alt: string; [key: string]: unknown }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} {...props} />
  ),
}))

const mockProperty: Property = {
  id: '1',
  code: 'PU-0001',
  slug: 'apartamento-asa-sul-sqn-308',
  title: 'Apartamento Teste',
  type: 'apartamento',
  transactionType: 'venda',
  price: 1850000,
  condoFee: 1800,
  iptu: 650,
  city: 'Brasília',
  neighborhood: 'Plano Piloto',
  address: 'SQS 308',
  privateArea: 180,
  totalArea: 210,
  bedrooms: 4,
  suites: 2,
  bathrooms: 3,
  parkingSpaces: 2,
  images: ['https://example.com/img.jpg'],
  featured: true,
  acceptsPets: true,
  solarOrientation: 'Nascente',
}

describe('PropertyCard', () => {
  it('renderiza título do imóvel', () => {
    render(<PropertyCard property={mockProperty} />)
    expect(screen.getByText('Apartamento Teste')).toBeInTheDocument()
  })

  it('renderiza badge de transação', () => {
    render(<PropertyCard property={mockProperty} />)
    expect(screen.getByText('Venda')).toBeInTheDocument()
  })

  it('renderiza preço formatado', () => {
    render(<PropertyCard property={mockProperty} />)
    // O overlay de hover duplica o preço — verificamos que ao menos um elemento existe
    expect(screen.getAllByText('R$ 1.850.000').length).toBeGreaterThan(0)
  })

  it('renderiza label do tipo', () => {
    render(<PropertyCard property={mockProperty} />)
    expect(screen.getByText('Apartamento')).toBeInTheDocument()
  })

  it('renderiza link para detalhe', () => {
    render(<PropertyCard property={mockProperty} />)
    const link = screen.getByRole('link', { name: /Apartamento Teste/i })
    expect(link).toHaveAttribute('href', '/imoveis/apartamento-asa-sul-sqn-308')
  })
})
