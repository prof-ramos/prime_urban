import { getPayload } from 'payload'
import config from '@payload-config'
import { adaptProperty, isPubliclyListable } from './adapters'

export async function getAllPublishedProperties() {
  const payload = await getPayload({ config })
  const limit = 100
  let page = 1
  const docs = []

  while (true) {
    const result = await payload.find({
      collection: 'properties',
      where: {
        statusEditorial: { equals: 'published' },
      },
      depth: 2,
      limit,
      page,
    })

    docs.push(...result.docs)

    if (!result.hasNextPage) break
    page += 1
  }

  // @ts-expect-error - docs are Payload documents, adapters handle the transformation
  return docs.filter(isPubliclyListable).map(adaptProperty)
}

export async function getPropertyBySlugFromPayload(slug: string) {
  if (!slug || typeof slug !== 'string' || !slug.trim()) return undefined
  const payload = await getPayload({ config })
  const { docs } = await payload.find({
    collection: 'properties',
    where: {
      slug: { equals: slug },
      statusEditorial: { equals: 'published' },
    },
    depth: 2,
    limit: 1,
  })

  const property = docs[0]
  // @ts-expect-error -- Payload generated type differs from PayloadProperty until payload-types.ts is regenerated
  return property ? adaptProperty(property) : undefined
}

export async function getFeaturedPropertiesFromPayload() {
  const payload = await getPayload({ config })
  const limit = 100
  let page = 1
  const docs = []

  while (true) {
    const result = await payload.find({
      collection: 'properties',
      where: {
        statusEditorial: { equals: 'published' },
        featured: { equals: true },
      },
      depth: 2,
      limit,
      page,
    })

    docs.push(...result.docs)

    if (!result.hasNextPage) break
    page += 1
  }

  // @ts-expect-error - docs are Payload documents, adapters handle the transformation
  return docs.filter(isPubliclyListable).map(adaptProperty)
}
