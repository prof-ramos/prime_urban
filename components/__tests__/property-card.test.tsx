import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { PropertyCard } from '../property-card'

const mockProperty = {
  id: '1',
  slug: 'apartamento-asa-sul-sqn-308',
  title: 'Apartamento Teste',
  type: 'apartamento' as const,
  transactionType: 'venda' as const,
  price: 1850000,
  condoFee: 1800,
  iptu: 650,
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
    expect(screen.getByText('R$ 1.850.000')).toBeInTheDocument()
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
