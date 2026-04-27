import { describe, expect, it } from 'vitest'
import { adaptNeighborhood, adaptProperty, isPubliclyListable } from '../payload/adapters'

const neighborhoodDoc = {
  id: 'n1',
  name: 'Plano Piloto',
  slug: 'plano-piloto',
  description: 'RA I · Centro histórico e político',
  legacyCount: 312,
  featured: true,
  active: true,
}

const propertyDoc = {
  id: 'p1',
  legacyId: '1',
  slug: 'apartamento-asa-sul-sqn-308',
  title: 'Apartamento 4 quartos com vista para o Parque da Cidade',
  type: 'apartamento' as const,
  transactionType: 'venda' as const,
  statusEditorial: 'published',
  statusComercial: 'disponivel',
  price: 1850000,
  condoFee: 1800,
  iptu: 650,
  neighborhood: neighborhoodDoc,
  address: 'SQS 308, Bloco A',
  privateArea: 180,
  totalArea: 210,
  bedrooms: 4,
  suites: 2,
  bathrooms: 3,
  parkingSpaces: 2,
  images: [
    {
      externalUrl: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80',
      alt: 'Apartamento 4 quartos',
    },
  ],
  featured: true,
  acceptsPets: true,
  solarOrientation: 'Nascente',
}

describe('Payload adapters', () => {
  it('adapts a neighborhood document to the public shape', () => {
    expect(adaptNeighborhood(neighborhoodDoc)).toEqual({
      name: 'Plano Piloto',
      slug: 'plano-piloto',
      count: 312,
      description: 'RA I · Centro histórico e político',
      featured: true,
    })
  })

  it('adapts a property document to the current Property shape', () => {
    const property = adaptProperty(propertyDoc)
    expect(property.id).toBe('1')
    expect(property.slug).toBe('apartamento-asa-sul-sqn-308')
    expect(property.neighborhood).toBe('Plano Piloto')
    expect(property.images).toEqual([
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80',
    ])
  })

  it('keeps sold and rented detail pages public but excludes them from listings', () => {
    // @ts-expect-error -- Payload generated type differs from hand-written fixture
    expect(isPubliclyListable({ ...propertyDoc, statusComercial: 'vendido' })).toBe(false)
    // @ts-expect-error -- Payload generated type differs from hand-written fixture
    expect(isPubliclyListable({ ...propertyDoc, statusComercial: 'alugado' })).toBe(false)
    // @ts-expect-error -- Payload generated type differs from hand-written fixture
    expect(isPubliclyListable({ ...propertyDoc, statusComercial: 'reservado' })).toBe(true)
  })
})
