import type { Neighborhood, Property } from '@/lib/properties/types'

type PayloadNeighborhood = {
  id?: string
  name: string
  slug: string
  description: string
  legacyCount?: number | null
  featured?: boolean | null
  active?: boolean | null
}

type PayloadMedia = {
  url?: string | null
}

type PayloadImage = {
  media?: PayloadMedia | string | null
  externalUrl?: string | null
}

type PayloadProperty = {
  id: string
  legacyId?: string | null
  slug: string
  title: string
  type: Property['type']
  transactionType: Property['transactionType']
  statusEditorial?: string | null
  statusComercial?: string | null
  price: number
  condoFee?: number | null
  iptu?: number | null
  neighborhood: PayloadNeighborhood | string
  address: string
  privateArea: number
  totalArea?: number | null
  bedrooms: number
  suites?: number | null
  bathrooms: number
  parkingSpaces: number
  images?: PayloadImage[] | null
  featured?: boolean | null
  acceptsPets?: boolean | null
  solarOrientation?: string | null
}

const PUBLIC_COMERCIAL_STATUSES = ['disponivel', 'reservado']

export function isPubliclyListable(property: Pick<PayloadProperty, 'statusEditorial' | 'statusComercial'>) {
  return (
    property.statusEditorial === 'published' &&
    PUBLIC_COMERCIAL_STATUSES.includes(property.statusComercial ?? 'disponivel')
  )
}

export function adaptNeighborhood(neighborhood: PayloadNeighborhood, count?: number): Neighborhood {
  return {
    name: neighborhood.name,
    slug: neighborhood.slug,
    count: count ?? neighborhood.legacyCount ?? 0,
    description: neighborhood.description,
    featured: Boolean(neighborhood.featured),
  }
}

export function adaptProperty(property: PayloadProperty): Property {
  const neighborhood =
    typeof property.neighborhood === 'string' ? property.neighborhood : property.neighborhood.name

  return {
    id: (property.legacyId && property.legacyId.trim() !== '') ? property.legacyId : property.id,
    slug: property.slug,
    title: property.title,
    type: property.type,
    transactionType: property.transactionType,
    price: property.price,
    condoFee: property.condoFee ?? undefined,
    iptu: property.iptu ?? undefined,
    neighborhood,
    address: property.address,
    privateArea: property.privateArea,
    totalArea: property.totalArea ?? undefined,
    bedrooms: property.bedrooms,
    suites: property.suites ?? undefined,
    bathrooms: property.bathrooms,
    parkingSpaces: property.parkingSpaces,
    images: (property.images ?? [])
      .map((image) => {
        if (image.externalUrl) return image.externalUrl
        if (typeof image.media === 'object' && image.media?.url) return image.media.url
        return null
      })
      .filter((url): url is string => Boolean(url)),
    featured: Boolean(property.featured),
    acceptsPets: Boolean(property.acceptsPets),
    solarOrientation: property.solarOrientation ?? undefined,
  }
}
