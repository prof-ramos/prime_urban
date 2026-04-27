# Payload CMS PrimeUrban Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace PrimeUrban's static mock real-estate data with Payload CMS v3 as the main local/dev content source while preserving the public UI and behavior.

**Architecture:** Payload runs inside the existing Next.js App Router app, with SQLite for local/dev, admin at `/admin`, REST API enabled, and GraphQL omitted. Public pages use Payload Local API through a small server-side data layer, then adapt Payload documents into the current `Property` and `Neighborhood` shapes so cards, filters, detail pages, SEO, sitemap, and E2E behavior remain stable.

**Tech Stack:** Next.js 16.2.2+, React 19, Payload CMS v3, `@payloadcms/db-sqlite`, TypeScript, Vitest, Playwright, ESLint.

---

## Documentation Analysis

The existing `docs/payload-cms-compatibilidade-e-plano.md` is directionally correct. Context7 confirms these required implementation details from current Payload docs:

- Payload requires Node.js `20.9.0+`, a compatible database, and supported Next.js ranges including `16.2.2+`; the repo currently uses `next@16.0.10`, so upgrade Next first.
- Payload's Next integration requires ESM config and wrapping `next.config.mjs` with `withPayload` from `@payloadcms/next/withPayload`.
- `tsconfig.json` must include the alias `"@payload-config": ["./payload.config.ts"]`.
- The App Router structure should include a `(payload)` route group with admin and REST API routes. GraphQL files should be omitted because GraphQL is outside the MVP.
- SQLite is configured with `sqliteAdapter({ client: { url: 'file:./payload.db' }, transactionOptions: {} })`.
- Server Components should use the Local API via `getPayload({ config })`; avoid internal HTTP requests.
- Media uploads can be modeled with an upload collection, but the MVP should preserve existing Unsplash URLs through an external URL fallback.
- Payload migrations and generated types/import maps need explicit npm scripts.

## File Structure

- Create `payload.config.ts`: central Payload config, SQLite adapter, admin user, collections, generated import map.
- Create `collections/Users.ts`: auth users with role support and admin/editor access.
- Create `collections/Media.ts`: upload-enabled media collection for future real images.
- Create `collections/Neighborhoods.ts`: active neighborhood catalogue, replacing `mockNeighborhoods` at runtime.
- Create `collections/Properties.ts`: real-estate collection with editorial and commercial statuses.
- Create `app/(payload)/admin/[[...segments]]/page.tsx`: Payload admin route.
- Create `app/(payload)/admin/[[...segments]]/not-found.tsx`: Payload admin not-found route.
- Create `app/(payload)/api/[...slug]/route.ts`: Payload REST route.
- Create `app/(payload)/layout.tsx`: Payload route group layout.
- Create `app/(payload)/custom.scss`: Payload admin stylesheet entry.
- Create `lib/payload/client.ts`: cached server-side `getPayload` helper.
- Create `lib/payload/adapters.ts`: Payload document to public UI type adapters.
- Create `lib/payload/properties.ts`: public query functions for properties.
- Create `lib/payload/neighborhoods.ts`: public query functions for neighborhoods.
- Create `scripts/seed-payload.ts`: idempotent seed from existing mock data plus admin bootstrap.
- Modify `next.config.mjs`: wrap with `withPayload`.
- Modify `tsconfig.json`: add `@payload-config` path alias.
- Modify `package.json`: add Payload packages and scripts.
- Modify public pages/routes that currently import `lib/mock-data.ts`.
- Keep `lib/mock-data.ts` as seed input only during this MVP; after Payload is wired, public runtime reads must not fall back to it.

## Task 1: Install and Wire Payload Basics

**Files:**
- Modify: `package.json`
- Modify: `package-lock.json`
- Modify: `next.config.mjs`
- Modify: `tsconfig.json`

- [ ] **Step 1: Install compatible packages**

Run:

```bash
npm install next@^16.2.2 react@19.2.0 react-dom@19.2.0 payload @payloadcms/next @payloadcms/ui @payloadcms/db-sqlite
```

Expected: `package.json` and `package-lock.json` update successfully. Do not run `npm audit fix --force`.

- [ ] **Step 2: Add Payload scripts and create env files**

Modify `package.json` scripts to include:

```json
{
  "scripts": {
    "typecheck": "tsc --noEmit",
    "payload": "payload",
    "payload:generate-types": "payload generate:types",
    "payload:generate-importmap": "payload generate:importmap",
    "payload:migrate": "payload migrate",
    "payload:migrate:create": "payload migrate:create",
    "payload:seed": "tsx scripts/seed-payload.ts"
  }
}
```

If `tsx` is not installed by Payload dependencies, add it:

```bash
npm install --save-dev tsx
```

Create `.env.example` (commitar no repositório, sem valores reais):

```bash
PAYLOAD_SECRET=
DATABASE_URL=file:./payload.db
PAYLOAD_ADMIN_EMAIL=
PAYLOAD_ADMIN_PASSWORD=
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

Create `.env.local` (nunca commitar):

```bash
PAYLOAD_SECRET=$(node -e "console.log(require('crypto').randomBytes(32).toString('hex'))")
DATABASE_URL=file:./payload.db
PAYLOAD_ADMIN_EMAIL=admin@primeurban.com.br
PAYLOAD_ADMIN_PASSWORD=<senha forte — mínimo 12 caracteres>
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

Add to `.gitignore` (if not already present):

```
.env.local
payload.db
payload.db.backup.*
media/
```

- [ ] **Step 3: Wrap Next config with Payload**

Replace `next.config.mjs` with:

```js
import { withPayload } from '@payloadcms/next/withPayload'

const isProduction = process.env.NODE_ENV === 'production'

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: !isProduction,
  },
}

export default withPayload(nextConfig, { devBundleServerPackages: false })
```

`devBundleServerPackages: false` reduz o tempo de inicialização em desenvolvimento. TypeScript errors must be fixed rather than silenced. Image optimization stays enabled in production and is disabled only in local development to keep the current Unsplash-heavy workflow simple.

- [ ] **Step 4: Add Payload config alias**

Modify `tsconfig.json` so `compilerOptions.paths` contains both aliases:

```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./*"],
      "@payload-config": ["./payload.config.ts"]
    }
  }
}
```

- [ ] **Step 5: Verify base install**

Run:

```bash
npm run typecheck
```

Expected: it may fail because `payload.config.ts` does not exist yet. The expected failure is only about missing `@payload-config` or Payload route files; continue to Task 2.

## Task 2: Create Collections and Payload Config

**Files:**
- Create: `collections/Users.ts`
- Create: `collections/Media.ts`
- Create: `collections/Neighborhoods.ts`
- Create: `collections/Properties.ts`
- Create: `payload.config.ts`

- [ ] **Step 1: Create Users collection**

Create `collections/Users.ts`:

```ts
import type { CollectionConfig } from 'payload'

const isAdmin = ({ req }: { req: { user?: { roles?: string[] } | null } }) =>
  Boolean(req.user?.roles?.includes('admin'))

export const Users: CollectionConfig = {
  slug: 'users',
  auth: true,
  admin: {
    useAsTitle: 'email',
  },
  access: {
    // Permite criação quando não há usuários (bootstrap inicial via admin UI)
    // e quando o solicitante é admin (criação de novos usuários)
    create: async ({ req }) => {
      if (req.user) return isAdmin({ req })
      const { totalDocs } = await req.payload.count({ collection: 'users' })
      return totalDocs === 0
    },
    read: ({ req }) => Boolean(req.user),
    update: isAdmin,
    delete: isAdmin,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'roles',
      type: 'select',
      hasMany: true,
      required: true,
      defaultValue: ['editor'],
      saveToJWT: true,
      options: [
        { label: 'Admin', value: 'admin' },
        { label: 'Editor', value: 'editor' },
      ],
      access: {
        update: isAdmin,
      },
    },
  ],
}
```

- [ ] **Step 2: Create Media collection**

Create `collections/Media.ts`:

```ts
import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true,
  },
  upload: {
    staticDir: 'media',
    adminThumbnail: 'thumbnail',
    mimeTypes: ['image/*'],
    imageSizes: [
      {
        name: 'thumbnail',
        width: 400,
        height: 300,
        position: 'centre',
      },
      {
        name: 'card',
        width: 800,
        height: 600,
        position: 'centre',
      },
      {
        name: 'hero',
        width: 1600,
        height: undefined,
        position: 'centre',
      },
    ],
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
  ],
}
```

- [ ] **Step 3: Create Neighborhoods collection**

Create `collections/Neighborhoods.ts`:

```ts
import type { CollectionConfig } from 'payload'

export const Neighborhoods: CollectionConfig = {
  slug: 'neighborhoods',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'slug', 'active', 'featured'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
    },
    {
      name: 'legacyCount',
      type: 'number',
      required: true,
      defaultValue: 0,
      admin: {
        description: 'Contagem editorial herdada do mock para bairros sem imóveis.',
      },
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
    },
    {
      name: 'active',
      type: 'checkbox',
      defaultValue: true,
      index: true,
    },
  ],
}
```

- [ ] **Step 4: Create Properties collection**

Create `collections/Properties.ts`:

```ts
import type { CollectionConfig } from 'payload'

export const Properties: CollectionConfig = {
  slug: 'properties',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'transactionType', 'statusEditorial', 'statusComercial'],
  },
  versions: {
    drafts: true,
  },
  access: {
    read: ({ req }) => {
      if (req.user) return true
      return { _status: { equals: 'published' } }
    },
  },
  fields: [
    { name: 'legacyId', type: 'text', required: true, unique: true },
    { name: 'slug', type: 'text', required: true, unique: true, index: true },
    { name: 'title', type: 'text', required: true },
    {
      name: 'type',
      type: 'select',
      required: true,
      options: [
        { label: 'Apartamento', value: 'apartamento' },
        { label: 'Casa', value: 'casa' },
        { label: 'Cobertura', value: 'cobertura' },
        { label: 'Sala Comercial', value: 'sala_comercial' },
      ],
    },
    {
      name: 'transactionType',
      type: 'select',
      required: true,
      options: [
        { label: 'Venda', value: 'venda' },
        { label: 'Aluguel', value: 'aluguel' },
      ],
    },
    {
      name: 'statusEditorial',
      type: 'select',
      required: true,
      defaultValue: 'published',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Published', value: 'published' },
        { label: 'Archived', value: 'archived' },
      ],
    },
    {
      name: 'statusComercial',
      type: 'select',
      required: true,
      defaultValue: 'disponivel',
      options: [
        { label: 'Disponivel', value: 'disponivel' },
        { label: 'Reservado', value: 'reservado' },
        { label: 'Vendido', value: 'vendido' },
        { label: 'Alugado', value: 'alugado' },
        { label: 'Indisponivel', value: 'indisponivel' },
      ],
    },
    { name: 'price', type: 'number', required: true, min: 0 },
    { name: 'condoFee', type: 'number', min: 0 },
    { name: 'iptu', type: 'number', min: 0 },
    {
      name: 'neighborhood',
      type: 'relationship',
      relationTo: 'neighborhoods',
      required: true,
      index: true,
    },
    { name: 'address', type: 'text', required: true },
    { name: 'privateArea', type: 'number', required: true, min: 0 },
    { name: 'totalArea', type: 'number', min: 0 },
    { name: 'bedrooms', type: 'number', required: true, min: 0 },
    { name: 'suites', type: 'number', min: 0 },
    { name: 'bathrooms', type: 'number', required: true, min: 0 },
    { name: 'parkingSpaces', type: 'number', required: true, min: 0 },
    {
      name: 'images',
      type: 'array',
      required: true,
      minRows: 1,
      fields: [
        {
          name: 'media',
          type: 'upload',
          relationTo: 'media',
        },
        {
          name: 'externalUrl',
          type: 'text',
        },
        {
          name: 'alt',
          type: 'text',
        },
      ],
    },
    { name: 'featured', type: 'checkbox', defaultValue: false },
    { name: 'acceptsPets', type: 'checkbox', defaultValue: false },
    { name: 'solarOrientation', type: 'text' },
  ],
}
```

- [ ] **Step 5: Create Payload config**

Create `payload.config.ts`:

```ts
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { buildConfig } from 'payload'
import { sqliteAdapter } from '@payloadcms/db-sqlite'

import { Media } from './collections/Media'
import { Neighborhoods } from './collections/Neighborhoods'
import { Properties } from './collections/Properties'
import { Users } from './collections/Users'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

function getPayloadSecret() {
  if (!process.env.PAYLOAD_SECRET) {
    throw new Error('PAYLOAD_SECRET is required. Generate one with: node -e "console.log(require(\'crypto\').randomBytes(32).toString(\'hex\'))"')
  }

  return process.env.PAYLOAD_SECRET
}

export default buildConfig({
  secret: getPayloadSecret(),
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media, Neighborhoods, Properties],
  db: sqliteAdapter({
    client: {
      url: process.env.DATABASE_URL ?? 'file:./payload.db',
    },
    transactionOptions: {},
  }),
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
})
```

- [ ] **Step 6: Generate Payload artifacts**

Run:

```bash
npm run payload:generate-types
npm run payload:generate-importmap
```

Expected: `payload-types.ts` and Payload import map artifacts are generated without errors.

## Task 3: Add Payload App Router Routes

**Files:**
- Create: `app/(payload)/layout.tsx`
- Create: `app/(payload)/custom.scss`
- Create: `app/(payload)/admin/[[...segments]]/page.tsx`
- Create: `app/(payload)/admin/[[...segments]]/not-found.tsx`
- Create: `app/(payload)/api/[...slug]/route.ts`

- [ ] **Step 1: Create route group layout**

Create `app/(payload)/layout.tsx`:

```tsx
import config from '@payload-config'
import '@payloadcms/next/css'
import './custom.scss'
import type { ServerFunctionClient } from 'payload'
import { handleServerFunctions, RootLayout } from '@payloadcms/next/layouts'

type Args = {
  children: React.ReactNode
}

const serverFunction: ServerFunctionClient = async (args) => {
  'use server'
  return handleServerFunctions({
    ...args,
    config,
  })
}

export default function Layout({ children }: Args) {
  return (
    <RootLayout config={config} serverFunction={serverFunction}>
      {children}
    </RootLayout>
  )
}
```

- [ ] **Step 2: Create Payload custom stylesheet**

Create `app/(payload)/custom.scss`:

```scss
:root {
  --theme-bg: #f9f6f0;
}
```

- [ ] **Step 3: Create admin page route**

Create `app/(payload)/admin/[[...segments]]/page.tsx`:

```tsx
import config from '@payload-config'
import { RootPage, generatePageMetadata } from '@payloadcms/next/views'

type AdminPageProps = {
  params: Promise<{ segments?: string[] }>
  searchParams: Promise<Record<string, string | string[] | undefined>>
}

export const generateMetadata = ({ params, searchParams }: AdminPageProps) =>
  generatePageMetadata({ config, params, searchParams })

export default RootPage({ config })
```

- [ ] **Step 4: Create admin not-found route**

Create `app/(payload)/admin/[[...segments]]/not-found.tsx`:

```tsx
import config from '@payload-config'
import { NotFoundPage } from '@payloadcms/next/views'

export default NotFoundPage({ config })
```

- [ ] **Step 5: Create REST API route**

Create `app/(payload)/api/[...slug]/route.ts`:

```ts
import config from '@payload-config'
import { REST_DELETE, REST_GET, REST_PATCH, REST_POST, REST_PUT } from '@payloadcms/next/routes'

export const GET = REST_GET(config)
export const POST = REST_POST(config)
export const DELETE = REST_DELETE(config)
export const PATCH = REST_PATCH(config)
export const PUT = REST_PUT(config)
```

- [ ] **Step 6: Verify admin routes compile**

Run:

```bash
npm run typecheck
```

Expected: PASS or only errors from app pages still importing mock data. Fix import/type errors before moving on.

## Task 4: Build Payload Data Layer and Adapters

**Files:**
- Create: `lib/payload/adapters.ts`
- Create: `lib/payload/properties.ts`
- Create: `lib/payload/neighborhoods.ts`
- Test: `lib/__tests__/payload-adapters.test.ts`

- [ ] **Step 1: Write adapter tests**

Create `lib/__tests__/payload-adapters.test.ts`:

```ts
import { describe, expect, it } from 'vitest'
import { adaptNeighborhood, adaptProperty, isPubliclyListable } from '@/lib/payload/adapters'

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
  type: 'apartamento',
  transactionType: 'venda',
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
    expect(isPubliclyListable({ ...propertyDoc, statusComercial: 'vendido' })).toBe(false)
    expect(isPubliclyListable({ ...propertyDoc, statusComercial: 'alugado' })).toBe(false)
    expect(isPubliclyListable({ ...propertyDoc, statusComercial: 'reservado' })).toBe(true)
  })
})
```

- [ ] **Step 2: Run adapter tests and confirm failure**

Run:

```bash
npm run test:run -- lib/__tests__/payload-adapters.test.ts
```

Expected: FAIL because `lib/payload/adapters.ts` does not exist.

- [ ] **Step 3: Create adapters**

Create `lib/payload/adapters.ts`.

Reuse the public UI/domain types from `lib/properties/types.ts`; do not import `Property` from a component and do not create `lib/properties/repository.ts`. The runtime data layer for Payload remains `lib/payload/properties.ts` and `lib/payload/neighborhoods.ts`.

```ts
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

export function isPubliclyListable(property: Pick<PayloadProperty, 'statusEditorial' | 'statusComercial'>) {
  return (
    property.statusEditorial === 'published' &&
    ['disponivel', 'reservado'].includes(property.statusComercial ?? 'disponivel')
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
    id: property.legacyId ?? property.id,
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
```

- [ ] **Step 4: Create property query functions**

Create `lib/payload/properties.ts`:

```ts
import { getPayload } from 'payload'
import config from '@payload-config'
import { adaptProperty, isPubliclyListable } from '@/lib/payload/adapters'

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

  return docs.filter(isPubliclyListable).map(adaptProperty)
}

export async function getPropertyBySlugFromPayload(slug: string) {
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
  return property ? adaptProperty(property) : undefined
}

export async function getFeaturedPropertiesFromPayload() {
  const properties = await getAllPublishedProperties()
  return properties.filter((property) => property.featured)
}
```

- [ ] **Step 5: Create neighborhood query functions**

Create `lib/payload/neighborhoods.ts`:

```ts
import { getPayload } from 'payload'
import config from '@payload-config'
import { adaptNeighborhood } from '@/lib/payload/adapters'
import { getAllPublishedProperties } from '@/lib/payload/properties'

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

  const properties = await getAllPublishedProperties()
  const countsByNeighborhood = new Map<string, number>()

  for (const property of properties) {
    countsByNeighborhood.set(
      property.neighborhood,
      (countsByNeighborhood.get(property.neighborhood) ?? 0) + 1,
    )
  }

  return docs.map((neighborhood) => {
    const count = countsByNeighborhood.get(neighborhood.name) ?? neighborhood.legacyCount ?? 0
    return adaptNeighborhood(neighborhood, count || neighborhood.legacyCount || 0)
  })
}

export async function getNeighborhoodBySlugFromPayload(slug: string) {
  const neighborhoods = await getActiveNeighborhoods()
  return neighborhoods.find((neighborhood) => neighborhood.slug === slug)
}

export async function getPropertiesByNeighborhoodFromPayload(name: string) {
  const properties = await getAllPublishedProperties()
  return properties.filter((property) => property.neighborhood === name)
}
```

- [ ] **Step 6: Run adapter tests**

Run:

```bash
npm run test:run -- lib/__tests__/payload-adapters.test.ts
```

Expected: PASS.

## Task 5: Seed Payload from Current Mock Data

**Files:**
- Create: `scripts/seed-payload.ts`

- [ ] **Step 1: Create seed script**

Create `scripts/seed-payload.ts`:

```ts
import { getPayload } from 'payload'
import config from '@payload-config'
import { mockNeighborhoods, mockProperties } from '@/lib/mock-data'

async function upsertByField({
  collection,
  field,
  value,
  data,
}: {
  collection: 'users' | 'neighborhoods' | 'properties'
  field: string
  value: string
  data: Record<string, unknown>
}) {
  const payload = await getPayload({ config })
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

async function seedAdmin() {
  const email = process.env.PAYLOAD_ADMIN_EMAIL
  const password = process.env.PAYLOAD_ADMIN_PASSWORD
  if (!email || !password) {
    console.log('Skipping admin seed: PAYLOAD_ADMIN_EMAIL or PAYLOAD_ADMIN_PASSWORD missing')
    return
  }

  await upsertByField({
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

async function seedNeighborhoods() {
  for (const neighborhood of mockNeighborhoods) {
    await upsertByField({
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

async function getNeighborhoodIdByName(name: string) {
  const payload = await getPayload({ config })
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

async function seedProperties() {
  for (const property of mockProperties) {
    const neighborhoodId = await getNeighborhoodIdByName(property.neighborhood)
    await upsertByField({
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

async function verifySeedIntegrity() {
  const payload = await getPayload({ config })
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
  console.log('Before seeding, back up payload.db if it already contains important local data.')
  await seedAdmin()
  await seedNeighborhoods()
  await seedProperties()
  await verifySeedIntegrity()
  console.log('Payload seed complete')
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
```

- [ ] **Step 2: Run seed twice**

Ensure `.env.local` exists with `PAYLOAD_SECRET`, `DATABASE_URL`, `PAYLOAD_ADMIN_EMAIL`, and `PAYLOAD_ADMIN_PASSWORD` set (see Task 1, Step 2). Use a strong admin password, change it after the first login, and never commit `.env.local`.

Back up an existing local database before running seed:

```bash
cp payload.db "payload.db.backup.$(date +%Y%m%d%H%M%S)" 2>/dev/null || true
```

Run:

```bash
npm run payload:seed
npm run payload:seed
```

Expected: both runs print `Payload seed complete`; no duplicate slugs or emails are created.

## Task 6: Wire Public Pages to Payload

**Files:**
- Modify: `app/imoveis/page.tsx`
- Modify: `app/imoveis/[slug]/page.tsx`
- Modify: `app/bairros/page.tsx`
- Modify: `app/bairros/[slug]/page.tsx`
- Modify: `app/sitemap.ts`
- Modify: `app/imoveis/[slug]/opengraph-image.tsx`
- Modify: `components/featured-properties.tsx`
- Modify: `components/neighborhoods-section.tsx`
- Modify: `lib/filter-properties.ts`

- [ ] **Step 1: Update filter function to accept data**

Modify `lib/filter-properties.ts` so it no longer imports `mockProperties`:

```ts
import type { FilterState, Property, SortOption } from '@/lib/properties/types'

export function filterProperties(
  properties: Property[],
  filters: FilterState,
  sortBy: SortOption = 'recent',
): Property[] {
  const { search, transactionType, propertyType, neighborhood, minPrice, maxPrice, bedrooms, parkingSpaces } = filters
  let results = [...properties]

  if (search) {
    const searchLower = search.toLowerCase()
    results = results.filter(
      (p) =>
        p.title.toLowerCase().includes(searchLower) ||
        p.address.toLowerCase().includes(searchLower) ||
        p.neighborhood.toLowerCase().includes(searchLower),
    )
  }

  if (transactionType) results = results.filter((p) => p.transactionType === transactionType)
  if (propertyType) results = results.filter((p) => p.type === propertyType)
  if (neighborhood) results = results.filter((p) => p.neighborhood === neighborhood)
  if (Number.isFinite(minPrice) && Number.isFinite(maxPrice) && minPrice <= maxPrice) {
    results = results.filter((p) => p.price >= minPrice && p.price <= maxPrice)
  }
  if (bedrooms) results = results.filter((p) => p.bedrooms >= parseInt(bedrooms, 10))
  if (parkingSpaces) results = results.filter((p) => p.parkingSpaces >= parseInt(parkingSpaces, 10))

  switch (sortBy) {
    case 'price-asc':
      results.sort((a, b) => a.price - b.price)
      break
    case 'price-desc':
      results.sort((a, b) => b.price - a.price)
      break
    case 'area-desc':
      results.sort((a, b) => b.privateArea - a.privateArea)
      break
  }

  return results
}
```

- [ ] **Step 2: Split `/imoveis` into server and client components**

Create a client component, for example `app/imoveis/properties-client.tsx`, containing the current interactive state and accepting `properties: Property[]`.

Then make `app/imoveis/page.tsx` a Server Component:

```tsx
import { getAllPublishedProperties } from '@/lib/payload/properties'
import { REVALIDATE_TIMES } from '@/lib/payload/revalidate'
import { PropertiesClient } from './properties-client'

export const revalidate = REVALIDATE_TIMES.PROPERTIES

export default async function PropertiesPage() {
  const properties = await getAllPublishedProperties()
  return <PropertiesClient properties={properties} />
}
```

- [ ] **Step 3: Update dynamic property route**

In `app/imoveis/[slug]/page.tsx`, replace mock helpers with Payload helpers:

```ts
import { getAllPublishedProperties, getPropertyBySlugFromPayload } from '@/lib/payload/properties'
```

Use:

```ts
export const revalidate = REVALIDATE_TIMES.PROPERTIES

export async function generateStaticParams() {
  const properties = await getAllPublishedProperties()
  return properties.map((property) => ({ slug: property.slug }))
}
```

And use `await getPropertyBySlugFromPayload(slug)` in metadata and page rendering.

- [ ] **Step 4: Update neighborhood routes and home sections**

Replace imports from `lib/mock-data.ts` with:

```ts
import {
  getActiveNeighborhoods,
  getNeighborhoodBySlugFromPayload,
  getPropertiesByNeighborhoodFromPayload,
} from '@/lib/payload/neighborhoods'
```

Create `lib/payload/revalidate.ts` and use constants instead of raw literals:

```ts
export const REVALIDATE_TIMES = {
  PROPERTIES: 60,
  NEIGHBORHOODS: 300,
  FEATURED: 60,
} as const
```

Use shorter values for frequently edited property inventory and longer values for relatively stable neighborhood pages. Set `export const revalidate = REVALIDATE_TIMES.NEIGHBORHOODS` on neighborhood pages and `REVALIDATE_TIMES.FEATURED` for home sections that read featured properties.

- [ ] **Step 5: Update sitemap and OG image**

Use Payload helpers in `app/sitemap.ts` and `app/imoveis/[slug]/opengraph-image.tsx`.

If Payload data is missing, return `notFound()` for pages and the existing generic PrimeUrban fallback for OG images. Do not silently read `mock-data.ts`.

## Task 7: Tests and Verification

**Files:**
- Modify: `lib/__tests__/filter-properties.test.ts`
- Modify: `lib/__tests__/mock-data.test.ts` or replace with Payload adapter/data tests
- Modify: `e2e/*.spec.ts` only if assertions depend on mock imports

- [ ] **Step 1: Update filter tests**

Update `filterProperties` calls to pass a properties array:

```ts
const results = filterProperties(mockProperties, defaultFilters)
```

Expected: existing filter tests still assert the same behavior.

- [ ] **Step 2: Run unit tests**

Run:

```bash
npm run test:run
```

Expected: all Vitest tests pass.

- [ ] **Step 3: Run lint and typecheck**

Run:

```bash
npm run lint
npm run typecheck
```

Expected: both pass. Existing unused-variable warnings are acceptable only if `npm run lint` exits with code 0.

- [ ] **Step 4: Run E2E**

Start from a seeded database, then run:

```bash
npm run payload:seed
npm run test:e2e
```

Expected: public UI tests still pass with the same visible counts and slugs.

- [ ] **Step 5: Run production build**

Run:

```bash
npm run build
```

Expected: build passes, routes include `/admin`, `/api/[...slug]`, public pages, sitemap, and OG image routes.

- [ ] **Step 6: Manual Admin UI Testing**

Run:

```bash
npm run dev
```

Open `http://localhost:3000/admin` and verify:

- [ ] login works with the bootstrap admin credentials from `.env.local`.
- [ ] `Users`, `Media`, `Neighborhoods`, and `Properties` are visible in the sidebar.
- [ ] a neighborhood can be created, edited, searched, filtered, and deleted.
- [ ] a property can be created, edited, searched, filtered, and deleted.
- [ ] media upload works and generates admin thumbnails.
- [ ] `Properties.neighborhood` relationship displays the expected neighborhood title.
- [ ] draft/published status works in the admin UI.
- [ ] `statusEditorial` and `statusComercial` can be changed and saved.

## Self-Review

- Spec coverage: Covers Payload as primary source, SQLite, local/dev target, admin `/admin`, no GraphQL, seed, adapter, filters client-side, SEO from Payload, and UI preservation.
- Placeholder scan: No unresolved markers or unspecified edge handling remains.
- Type consistency: Collection slugs are consistently `users`, `media`, `neighborhoods`, and `properties`; public adapter returns the existing `Property` and `Neighborhood` shapes.
