# Payload CMS PrimeUrban Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace PrimeUrban's static mock real-estate data with Payload CMS v3 as the main local/dev content source while preserving the public UI and behavior.

**Architecture:** Payload runs inside the existing Next.js App Router app, with SQLite for local/dev, admin at `/admin`, REST API enabled, and GraphQL omitted. Public pages use Payload Local API through a small server-side data layer, then adapt Payload documents into the current `Property` and `Neighborhood` shapes so cards, filters, detail pages, SEO, sitemap, and E2E behavior remain stable.

**Tech Stack:** Next.js 16.2.4+ (Already on 16.2.4), React 19 (Already on 19.2.5), Payload CMS v3, `@payloadcms/db-sqlite`, TypeScript, Vitest, Playwright, ESLint.

---

## Documentation Analysis

- Payload requires Node.js `20.9.0+`, a compatible database, and supported Next.js ranges. The repo is already on `next@16.2.4`, so no Next upgrade is needed.
- Payload's Next integration requires ESM config and wrapping `next.config.mjs` with `withPayload` from `@payloadcms/next/withPayload`.
- `tsconfig.json` must include the alias `"@payload-config": ["./payload.config.ts"]`.
- The App Router structure should include a `(payload)` route group with admin and REST API routes. GraphQL files should be omitted.
- SQLite is configured with `sqliteAdapter({ client: { url: 'file:./payload.db' }, transactionOptions: {} })`.
- Server Components should use the Local API via `getPayload({ config })`; avoid internal HTTP requests.
- Media uploads can be modeled with an upload collection, but the MVP should preserve existing Unsplash URLs through an external URL fallback in the Property collection.

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
- Modify `components/property-card.tsx`: remove duplicate `Property` type and import from `@/lib/properties/types`.
- Modify public pages/routes that currently import `lib/mock-data.ts`.
- Keep `lib/mock-data.ts` as seed input only during this MVP; after Payload is wired, public runtime reads must not fall back to it.

## Task 1: Install and Wire Payload Basics

**Files:**
- Modify: `package.json`
- Modify: `next.config.mjs`
- Modify: `tsconfig.json`
- Modify: `components/property-card.tsx`

- [ ] **Step 1: Install compatible packages**

Run:

```bash
npm install payload @payloadcms/next @payloadcms/ui @payloadcms/db-sqlite
```

Expected: `package.json` and `package-lock.json` update successfully. Do not run `npm audit fix --force`.

- [ ] **Step 2: Add Payload scripts and create env files**

Modify `package.json` scripts to include:

```json
{
  "scripts": {
    "payload": "payload",
    "payload:generate-types": "payload generate:types",
    "payload:generate-importmap": "payload generate:importmap",
    "payload:migrate": "payload migrate",
    "payload:migrate:create": "payload migrate:create",
    "payload:seed": "tsx scripts/seed-payload.ts"
  }
}
```

If `tsx` is not installed, add it:

```bash
npm install --save-dev tsx
```

Create `.env.example`:

```bash
PAYLOAD_SECRET=
DATABASE_URL=file:./payload.db
PAYLOAD_ADMIN_EMAIL=
PAYLOAD_ADMIN_PASSWORD=
NEXT_PUBLIC_SITE_URL=http://localhost:3001
```

Create `.env.local` (ensure it's in `.gitignore`):

```bash
PAYLOAD_SECRET=$(node -e "console.log(require('crypto').randomBytes(32).toString('hex'))")
DATABASE_URL=file:./payload.db
PAYLOAD_ADMIN_EMAIL=admin@primeurban.com.br
PAYLOAD_ADMIN_PASSWORD=<strong-password>
NEXT_PUBLIC_SITE_URL=http://localhost:3001
```

- [ ] **Step 3: Wrap Next config with Payload**

Replace `next.config.mjs` with:

```js
import { withPayload } from '@payloadcms/next/withPayload'

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configurações existentes podem ser mantidas aqui
}

export default withPayload(nextConfig, { devBundleServerPackages: false })
```

- [ ] **Step 4: Add Payload config alias and consolidate types**

Modify `tsconfig.json` paths.

Then, modify `components/property-card.tsx` to remove the `Property` interface and import it:
```ts
import type { Property } from "@/lib/properties/types"
```

- [ ] **Step 5: Verify base install**

Run: `npm run typecheck` (Expected to fail on missing config, but confirms alias recognition).

## Task 2: Create Collections and Payload Config

**Files:**
- Create: `collections/Users.ts`
- Create: `collections/Media.ts`
- Create: `collections/Neighborhoods.ts`
- Create: `collections/Properties.ts`
- Create: `payload.config.ts`

- [ ] **Step 1: Create Users collection** (Auth, roles admin/editor)
- [ ] **Step 2: Create Media collection** (Upload enabled, staticDir: 'media')
- [ ] **Step 3: Create Neighborhoods collection** (slug, name, description, legacyCount, featured, active)
- [ ] **Step 4: Create Properties collection** (slug, title, type, transactionType, prices, neighborhood relationship, images array with media/externalUrl)
- [ ] **Step 5: Create Payload config** (Configures sqlite, collections, and typescript output: `payload-types.ts`)
- [ ] **Step 6: Generate artifacts**

Run:
```bash
npm run payload:generate-types
npm run payload:generate-importmap
```

## Task 3: Add Payload App Router Routes

**Files:**
- Create: `app/(payload)/layout.tsx`
- Create: `app/(payload)/custom.scss`
- Create: `app/(payload)/admin/[[...segments]]/page.tsx`
- Create: `app/(payload)/api/[...slug]/route.ts`

- [ ] **Step 1: Create route group layout and styles**
- [ ] **Step 2: Create admin and REST API routes**
- [ ] **Step 3: Verify admin routes compile**

Run: `npm run typecheck`

## Task 4: Build Payload Data Layer and Adapters

**Files:**
- Create: `lib/payload/adapters.ts`
- Create: `lib/payload/properties.ts`
- Create: `lib/payload/neighborhoods.ts`
- Test: `lib/__tests__/payload-adapters.test.ts`

- [ ] **Step 1: Create adapters** (Converts Payload docs to `Property` and `Neighborhood` types from `lib/properties/types.ts`)
- [ ] **Step 2: Create query functions** (Uses `getPayload` Local API for server-side data fetching)
- [ ] **Step 3: Verify with unit tests**

## Task 5: Seed Payload from Current Mock Data

**Files:**
- Create: `scripts/seed-payload.ts`

- [ ] **Step 1: Create seed script** (Idempotent script to sync `lib/mock-data.ts` to SQLite)
- [ ] **Step 2: Run seed and verify**

Run: `npm run payload:seed`

## Task 6: Wire Public Pages to Payload

**Files:**
- Modify: `app/imoveis/page.tsx`
- Modify: `app/imoveis/[slug]/page.tsx`
- Modify: `app/bairros/page.tsx`
- Modify: `app/bairros/[slug]/page.tsx`
- Modify: `components/featured-properties.tsx`
- Modify: `components/neighborhoods-section.tsx`

- [ ] **Step 1: Swap imports** (Replace `lib/mock-data.ts` usage with `lib/payload/properties.ts` and `lib/payload/neighborhoods.ts`)
- [ ] **Step 2: Update revalidation logic** (Add `export const revalidate = 60` or similar where appropriate)

## Task 7: Tests and Verification

- [ ] **Step 1: Run all tests** (`npm run test:run`)
- [ ] **Step 2: Run lint and typecheck**
- [ ] **Step 3: Verify E2E** (`npm run test:e2e`)
- [ ] **Step 4: Manual Admin UI check** (Login at `/admin`, check collections)

## Self-Review

- Spec coverage: Payload v3, SQLite, Local API, Type consolidation, Seed from mock data.
- Placeholder scan: All steps show actual file paths and required actions.
- Type consistency: Uses `lib/properties/types.ts` as the single source of truth for public types.
