import * as dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })

import type { BasePayload } from 'payload'
import { mockNeighborhoods, mockProperties } from '../lib/mock-data'

async function upsertByField({
  payload,
  collection,
  field,
  value,
  data,
}: {
  payload: BasePayload
  collection: 'users' | 'neighborhoods' | 'properties'
  field: string
  value: string
  data: Record<string, unknown>
}) {
  const existing = await payload.find({
    collection,
    where: {
      [field]: { equals: value },
    },
    limit: 1,
  })

  if (existing.docs[0]) {
    return payload.update({
      collection,
      id: existing.docs[0].id,
      data,
      overrideAccess: true,
    })
  }

  return payload.create({
    collection,
    data,
    overrideAccess: true,
  })
}

async function seedAdmin(payload: BasePayload) {
  const email = process.env.PAYLOAD_ADMIN_EMAIL
  const password = process.env.PAYLOAD_ADMIN_PASSWORD
  if (!email || !password) {
    console.log('Skipping admin seed: PAYLOAD_ADMIN_EMAIL or PAYLOAD_ADMIN_PASSWORD missing')
    return
  }

  await upsertByField({
    payload,
    collection: 'users',
    field: 'email',
    value: email,
    data: {
      email,
      password,
      name: 'PrimeUrban Admin',
      roles: ['admin'],
    },
  })
}

async function seedNeighborhoods(payload: BasePayload) {
  for (const neighborhood of mockNeighborhoods) {
    await upsertByField({
      payload,
      collection: 'neighborhoods',
      field: 'slug',
      value: neighborhood.slug,
      data: {
        name: neighborhood.name,
        slug: neighborhood.slug,
        description: neighborhood.description,
        legacyCount: neighborhood.count,
        featured: Boolean(neighborhood.featured),
        active: true,
      },
    })
  }
}

async function getNeighborhoodIdByName(payload: BasePayload, name: string) {
  const result = await payload.find({
    collection: 'neighborhoods',
    where: {
      name: { equals: name },
    },
    limit: 1,
  })

  const doc = result.docs[0]
  if (!doc) throw new Error(`Neighborhood not seeded: ${name}`)
  return doc.id
}

async function seedProperties(payload: BasePayload) {
  for (const property of mockProperties) {
    const neighborhoodId = await getNeighborhoodIdByName(payload, property.neighborhood)
    await upsertByField({
      payload,
      collection: 'properties',
      field: 'slug',
      value: property.slug,
      data: {
        legacyId: property.id,
        slug: property.slug,
        title: property.title,
        type: property.type,
        transactionType: property.transactionType,
        statusEditorial: 'published',
        statusComercial: 'disponivel',
        price: property.price,
        condoFee: property.condoFee,
        iptu: property.iptu,
        neighborhood: neighborhoodId,
        address: property.address,
        privateArea: property.privateArea,
        totalArea: property.totalArea,
        bedrooms: property.bedrooms,
        suites: property.suites,
        bathrooms: property.bathrooms,
        parkingSpaces: property.parkingSpaces,
        images: property.images.map((url) => ({
          externalUrl: url,
          alt: property.title,
        })),
        featured: Boolean(property.featured),
        acceptsPets: Boolean(property.acceptsPets),
        solarOrientation: property.solarOrientation,
        _status: 'published',
      },
    })
  }
}

async function verifySeedIntegrity(payload: BasePayload) {
  const [neighborhoods, properties] = await Promise.all([
    payload.count({ collection: 'neighborhoods' }),
    payload.count({ collection: 'properties' }),
  ])

  if (neighborhoods.totalDocs < mockNeighborhoods.length) {
    throw new Error(`Seed integrity failed: expected at least ${mockNeighborhoods.length} neighborhoods, found ${neighborhoods.totalDocs}`)
  }

  if (properties.totalDocs < mockProperties.length) {
    throw new Error(`Seed integrity failed: expected at least ${mockProperties.length} properties, found ${properties.totalDocs}`)
  }
}

async function main() {
  const { getPayload } = await import('payload')
  const { default: config } = await import('../payload.config.ts')

  console.log('Seeding Payload...')
  const payload = await getPayload({ config })
  
  await seedAdmin(payload)
  await seedNeighborhoods(payload)
  await seedProperties(payload)
  await verifySeedIntegrity(payload)
  console.log('Payload seed complete')
  process.exit(0)
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
