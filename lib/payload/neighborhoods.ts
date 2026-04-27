import { getPayload } from 'payload'
import config from '@payload-config'
import { adaptNeighborhood, adaptProperty, isPubliclyListable } from './adapters'

export async function getActiveNeighborhoods() {
  const payload = await getPayload({ config })
  const { docs } = await payload.find({
    collection: 'neighborhoods',
    where: {
      active: { equals: true },
    },
    sort: 'name',
    limit: 1000,
    pagination: false,
  })

  const countResults = await Promise.all(
    docs.map((neighborhood) =>
      payload.count({
        collection: 'properties',
        where: {
          statusEditorial: { equals: 'published' },
          neighborhood: { equals: neighborhood.id },
        },
      })
    )
  )

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return docs.map((neighborhood: any, i: number) => {
    const legacyCount: number = neighborhood.legacyCount ?? 0
    const count = countResults[i].totalDocs > 0 ? countResults[i].totalDocs : legacyCount
    return adaptNeighborhood(neighborhood, count)
  })
}

export async function getNeighborhoodBySlugFromPayload(slug: string) {
  const payload = await getPayload({ config })
  const { docs } = await payload.find({
    collection: 'neighborhoods',
    where: {
      slug: { equals: slug },
      active: { equals: true },
    },
    limit: 1,
  })

  if (!docs[0]) return undefined
  const neighborhood = docs[0]

  const { totalDocs } = await payload.count({
    collection: 'properties',
    where: {
      statusEditorial: { equals: 'published' },
      neighborhood: { equals: neighborhood.id },
    },
  })

  const count = totalDocs > 0 ? totalDocs : (neighborhood.legacyCount ?? 0)
  // @ts-expect-error -- Payload generated type mismatch
  return adaptNeighborhood(neighborhood, count)
}

export async function getPropertiesByNeighborhoodFromPayload(name: string) {
  const payload = await getPayload({ config })

  const { docs: neighborhoodDocs } = await payload.find({
    collection: 'neighborhoods',
    where: { name: { equals: name } },
    limit: 1,
  })

  if (!neighborhoodDocs[0]) return []
  const neighborhoodId = neighborhoodDocs[0].id

  const limit = 100
  let page = 1
  const docs = []

  while (true) {
    const result = await payload.find({
      collection: 'properties',
      where: {
        statusEditorial: { equals: 'published' },
        neighborhood: { equals: neighborhoodId },
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
