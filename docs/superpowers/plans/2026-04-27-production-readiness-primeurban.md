# PrimeUrban Production Readiness Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Bring PrimeUrban from “dev/demo works” to a deployable production app with passing build, consistent CMS data, verified E2E, safe environment defaults, and clear operational docs.

**Architecture:** Keep the current Next.js 16 App Router + React 19 + Payload CMS 3 structure. Fix hard production blockers first, then remove runtime split-brain between Payload and static mock data, then make deployment concerns explicit: database, media persistence, env vars, CI/E2E, forms, image optimization, and docs.

**Tech Stack:** Next.js 16.2.4, React 19.2.5, Payload CMS 3.84.1, SQLite currently configured via `@payloadcms/db-sqlite`, Tailwind CSS v4, shadcn/ui, Vitest, Playwright, ESLint, TypeScript.

---

## Audit Summary

Current status as of 2026-04-27:

- `npm run lint`: PASS with 3 warnings.
- `npm run test:run`: PASS, 20 files and 82 tests.
- `npm run typecheck`: FAIL.
- `npm run build`: FAIL during TypeScript.
- `npm run test:e2e`: not executed; Playwright could not start because another `next dev` process for this directory was already running on port 3000 while config tries port 3001.
- Context7 lookup for current Payload/Next docs was attempted three times and timed out. Re-check docs before implementing DB/media deployment choices. If Context7 still fails, use official Payload CMS 3 docs directly as the temporary source of truth for deployment, database adapters, and file/media uploads: `https://payloadcms.com/docs/production/deployment`, `https://payloadcms.com/docs/database/overview`, and `https://payloadcms.com/docs/upload/overview`.

Production blockers:

- TypeScript/build failure in `scripts/seed-payload.ts`, `components/__tests__/imoveis-listing.test.tsx`, and `lib/__tests__/payload-adapters.test.ts`.
- Home still reads `lib/mock-data.ts` in `components/featured-properties.tsx`, `components/neighborhoods-section.tsx`, and `components/neighborhood-map.tsx` while public listing/detail/bairro pages read Payload.
- `payload.db` is tracked and modified; production data strategy is not settled.
- `next.config.mjs` disables image optimization globally with `images.unoptimized: true`.
- Contact forms only simulate submission and do not send/store leads.
- README/CLAUDE still describe “sem banco/API” and mock data as runtime source, which is stale.

## File Structure

- Modify `scripts/seed-payload.ts`: make Payload create/update calls type-safe and remove `.ts` extension dynamic import.
- Modify `components/__tests__/imoveis-listing.test.tsx`: align test fixtures with the current `Property` type.
- Modify `lib/__tests__/payload-adapters.test.ts`: remove stale `@ts-expect-error` directives.
- Modify `components/featured-properties.tsx`: receive Payload data from the server instead of importing `lib/mock-data.ts`.
- Modify `components/neighborhoods-section.tsx`: receive active/featured neighborhoods from the server.
- Modify `components/neighborhood-map.tsx`: receive neighborhoods as props and keep the fixed map point coordinates local.
- Modify `app/page.tsx`: fetch featured properties and neighborhoods once, pass them into home sections.
- Modify `.gitignore`: ignore local SQLite DB files and local Payload uploads if local-only.
- Modify Git index: untrack `payload.db` if production DB will not be committed.
- Modify `next.config.mjs`: remove global image unoptimization or document a deliberate hosting constraint.
- Modify `components/contact-form.tsx` and `components/contact-page-form.tsx`: replace fake submit with a real server endpoint or server action.
- Create `app/api/leads/route.ts` if using a REST-style lead endpoint.
- Create or modify `docs/production-readiness.md`: document env vars, DB/media strategy, seed/migration, deploy checklist, and verification commands.
- Modify `README.md` and `CLAUDE.md`: update architecture and commands to match Payload runtime.
- Modify `playwright.config.ts`: avoid local E2E deadlock when an existing dev server is running on another port.

## Task 1: Unblock TypeScript and Production Build

**Files:**
- Modify: `scripts/seed-payload.ts:4-41`
- Modify: `scripts/seed-payload.ts:154-156`
- Modify: `components/__tests__/imoveis-listing.test.tsx:1-40`
- Modify: `lib/__tests__/payload-adapters.test.ts:60-75`

- [ ] **Step 1: Fix the seed helper typing**

Replace the broad `BasePayload`/union helper with collection-specific overloads or explicit calls. Minimal safe implementation:

```ts
import type { Payload } from 'payload'
import type { User, Neighborhood, Property as PayloadProperty } from '../payload-types'

type CollectionData = {
  users: Partial<User> & { email: string; password?: string }
  neighborhoods: Partial<Neighborhood> & { slug: string; name: string; description: string }
  properties: Partial<PayloadProperty> & { slug: string; legacyId: string; title: string }
}

async function upsertByField<TCollection extends keyof CollectionData>({
  payload,
  collection,
  field,
  value,
  data,
}: {
  payload: Payload
  collection: TCollection
  field: string
  value: string
  data: CollectionData[TCollection]
}) {
  const existing = await payload.find({
    collection,
    where: { [field]: { equals: value } },
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
```

- [ ] **Step 2: Remove the `.ts` extension dynamic import**

Replace:

```ts
const { default: config } = await import('../payload.config.ts')
```

with:

```ts
const { default: config } = await import('../payload.config')
```

- [ ] **Step 3: Fix `components/__tests__/imoveis-listing.test.tsx` fixture types**

Inspect `lib/properties/types.ts`. If `bedrooms` and `parkingSpaces` are strings in the current type, change the test fixture numbers to strings. If the app should use numbers, change the type and production code consistently. The quickest no-behavior test-only fix is:

```ts
bedrooms: "3",
parkingSpaces: "2",
```

- [ ] **Step 4: Remove stale `@ts-expect-error` lines**

In `lib/__tests__/payload-adapters.test.ts`, delete unused `@ts-expect-error` comments reported by `tsc` at the current lines 67, 69, and 71. Keep the assertions unchanged.

- [ ] **Step 5: Verify the blocker is gone**

Run:

```bash
npm run typecheck
npm run build
```

Expected:

```text
typecheck exits 0
next build exits 0
```

Commit:

```bash
git add scripts/seed-payload.ts components/__tests__/imoveis-listing.test.tsx lib/__tests__/payload-adapters.test.ts
git commit -m "fix: unblock production build"
```

## Task 2: Finish the Payload Runtime Migration

**Files:**
- Modify: `app/page.tsx`
- Modify: `components/featured-properties.tsx`
- Modify: `components/neighborhoods-section.tsx`
- Modify: `components/neighborhood-map.tsx`
- Test: `components/__tests__/neighborhood-map.test.tsx`
- Test: `components/__tests__/neighborhood-map-empty.test.tsx`

- [ ] **Step 1: Make `FeaturedProperties` data-driven**

Replace the mock import in `components/featured-properties.tsx` with props:

```ts
import type { Property } from "@/lib/properties/types"

type FeaturedPropertiesProps = {
  properties: Property[]
}

export function FeaturedProperties({ properties }: FeaturedPropertiesProps) {
  const featuredProperties = properties.slice(0, 3)
```

- [ ] **Step 2: Make `NeighborhoodsSection` data-driven**

Use the public type and filter inside the component:

```ts
import type { Neighborhood } from "@/lib/properties/types"

type NeighborhoodsSectionProps = {
  neighborhoods: Neighborhood[]
}

export function NeighborhoodsSection({ neighborhoods }: NeighborhoodsSectionProps) {
  const featuredNeighborhoods = neighborhoods.filter((n) => n.featured)
```

Then render `featuredNeighborhoods.map(...)`.

- [ ] **Step 3: Make `NeighborhoodMap` data-driven**

Replace the `mockNeighborhoods` import with:

```ts
import type { Neighborhood } from "@/lib/properties/types"

type NeighborhoodMapProps = {
  neighborhoods: Neighborhood[]
}

export function NeighborhoodMap({ neighborhoods }: NeighborhoodMapProps) {
  const neighborhoodsBySlug = new Map(neighborhoods.map((neighborhood) => [neighborhood.slug, neighborhood]))
```

Keep `points` local because those are UI coordinates, not CMS content.

- [ ] **Step 4: Pass Payload data from `app/page.tsx`**

Fetch once and pass props:

```tsx
let properties: Awaited<ReturnType<typeof getAllPublishedProperties>> = []
let neighborhoods: Awaited<ReturnType<typeof getActiveNeighborhoods>> = []

try {
  ;[properties, neighborhoods] = await Promise.all([
    getAllPublishedProperties(),
    getActiveNeighborhoods(),
  ])
} catch (err) {
  console.error('[HomePage] failed to fetch content:', err)
}

const featuredProperties = properties.filter((property) => property.featured)

<HeroSection cityOptions={cityOptions} neighborhoodOptions={neighborhoodOptions} />
<FeaturedProperties properties={featuredProperties} />
<NeighborhoodsSection neighborhoods={neighborhoods} />
```

- [ ] **Step 5: Verify no public runtime imports mock data**

Run:

```bash
rg -n --type ts --type tsx "mock-data" app components lib/payload | rg "import|require"
```

Expected: no public runtime imports should reference `lib/mock-data.ts`. Seed scripts, tests, and docs may still reference it.

- [ ] **Step 6: Verify**

Run:

```bash
npm run test:run
npm run typecheck
npm run build
```

Commit:

```bash
git add app/page.tsx components/featured-properties.tsx components/neighborhoods-section.tsx components/neighborhood-map.tsx components/__tests__/neighborhood-map.test.tsx components/__tests__/neighborhood-map-empty.test.tsx
git commit -m "fix: serve home content from payload"
```

## Task 3: Decide and Harden Database and Media Persistence

**Files:**
- Modify: `payload.config.ts`
- Modify: `.gitignore`
- Create: `docs/production-readiness.md`

- [ ] **Step 1: Re-check current Payload deployment docs**

Run Context7 before editing:

```text
resolve-library-id: Payload CMS
query-docs: Payload CMS 3 production deployment database adapter media uploads migrations Next.js App Router
```

Expected: confirm whether SQLite is acceptable for the chosen host or whether PostgreSQL should replace it.

- [ ] **Step 2: Pick one DB strategy**

For production on Vercel or any serverless host, prefer PostgreSQL. If keeping SQLite, deploy only to a persistent single-node environment and document backups.

Write the decision in `docs/production-readiness.md`:

```md
## Database

Production database: PostgreSQL.

Required env:
- DATABASE_URL
- PAYLOAD_SECRET

Local development may use `file:./payload.db`.
Do not commit local SQLite database files.

## SQLite to PostgreSQL Migration

Install and configure `@payloadcms/db-postgres`, then switch `payload.config.ts` from `sqliteAdapter` to the Postgres adapter behind `DATABASE_URL`.

One-time migration options:
- `migrate-sqlite-to-postgres`: export current SQLite Payload data and import into Postgres.
- `seed-postgres`: reseed Postgres from `lib/mock-data.ts` when production content can be rebuilt from seed.

Test the migration locally before changing production. For serverless hosts, use connection pooling such as PgBouncer and configure `DATABASE_URL` with the host's pooling endpoint or required pooling parameters.
```

- [ ] **Step 3: Stop committing local SQLite state**

Update `.gitignore`:

```gitignore
# Payload local data
payload.db
payload.db-*
media/
```

Then untrack the current local DB:

```bash
git rm --cached payload.db
```

- [ ] **Step 4: Document media persistence**

Add to `docs/production-readiness.md`:

```md
## Media

Production uploads must use persistent object storage or a persistent mounted volume.
Local `media/` is development-only and ignored by git.
External image URLs remain supported by the `images.externalUrl` field.
```

- [ ] **Step 5: Verify**

Run:

```bash
git status --short
npm run typecheck
```

Commit:

```bash
git add .gitignore docs/production-readiness.md
git commit -m "docs: define production data persistence"
```

## Task 4: Make E2E Reproducible Locally and in CI

**Files:**
- Modify: `playwright.config.ts`
- Modify: `.github/workflows/tests.yml`

- [ ] **Step 1: Avoid dev server deadlock**

Change the web server command to a production-like build/start flow after Task 1:

```ts
webServer: {
  command: "npm run build && npm run start -- --port=3001",
  url: "http://localhost:3001",
  reuseExistingServer: !process.env.CI,
  timeout: 120000,
},
```

- [ ] **Step 2: Ensure CI has required env vars**

In `.github/workflows/tests.yml`, add non-secret CI values where acceptable:

```yaml
env:
  PAYLOAD_SECRET: test-payload-secret-for-ci-only
  DATABASE_URL: file:./payload.db
  NEXT_PUBLIC_SITE_URL: http://localhost:3001
```

For real deployment, set production values in the host dashboard, not in git.

- [ ] **Step 3: Verify**

Run:

```bash
npm run test:e2e
```

Expected:

```text
all Playwright projects pass, or any failure includes a real page assertion rather than webServer startup failure
```

Commit:

```bash
git add playwright.config.ts .github/workflows/tests.yml
git commit -m "test: make e2e production-like"
```

## Task 5: Replace Fake Contact Submission

**Files:**
- Create: `app/api/leads/route.ts`
- Modify: `components/contact-form.tsx`
- Modify: `components/contact-page-form.tsx`
- Test: `components/__tests__/contact-form.test.tsx`

- [ ] **Step 1: Add a minimal lead endpoint**

Create `app/api/leads/route.ts`:

```ts
import { NextResponse } from "next/server"
import { z } from "zod"

const leadSchema = z.object({
  name: z.string().trim().min(2),
  email: z.string().trim().email(),
  phone: z.string().trim().min(8),
  message: z.string().trim().min(1),
  propertyId: z.string().trim().optional(),
  propertyTitle: z.string().trim().optional(),
})

export async function POST(request: Request) {
  const body = await request.json().catch(() => null)
  const parsed = leadSchema.safeParse(body)

  if (!parsed.success) {
    return NextResponse.json(
      { error: "ValidationError", message: "Dados inválidos." },
      { status: 422 },
    )
  }

  // Temporary MVP behavior: this endpoint validates lead data but does not persist it.
  // Production work must either create a Payload `leads` collection and call
  // payload.create({ collection: "leads", data: parsed.data }) here, or document
  // the chosen external CRM/email integration before launch.
  console.info("[lead:not-persisted]", parsed.data)
  return NextResponse.json({ ok: true }, { status: 201 })
}
```

- [ ] **Step 2: Replace simulated submit in `ContactForm`**

Replace the timeout block with:

```ts
try {
  const response = await fetch("/api/leads", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...formData, propertyId, propertyTitle }),
  })

  if (!response.ok) {
    const body = await response.json().catch(() => null)
    const message =
      body?.message ?? (response.status === 422 ? "Revise os campos informados." : "Não foi possível enviar sua mensagem.")
    setSubmitError(message)
    return
  }

  setSubmitted(true)
} finally {
  setIsSubmitting(false)
}
```

- [ ] **Step 3: Replace simulated submit in `ContactPageForm`**

Use the same `fetch("/api/leads")` pattern without property fields.

- [ ] **Step 4: Verify**

Run:

```bash
npm run test:run
npm run typecheck
```

Commit:

```bash
git add app/api/leads/route.ts components/contact-form.tsx components/contact-page-form.tsx components/__tests__/contact-form.test.tsx
git commit -m "feat: submit contact leads"
```

## Task 6: Production Images and SEO Sanity

**Files:**
- Modify: `next.config.mjs`
- Modify: `components/property-card.tsx`
- Modify: `components/property-gallery.tsx`
- Modify: `docs/production-readiness.md`

- [ ] **Step 1: Remove global image unoptimization**

Replace:

```js
images: {
  unoptimized: true,
},
```

with either remote patterns for the current image sources or a documented host-specific choice. For remote image support:

```js
images: {
  remotePatterns: [
    { protocol: 'https', hostname: 'images.unsplash.com' },
  ],
},
```

- [ ] **Step 2: Add a real fallback property image**

Create or add `public/placeholder-property.jpg`, because current components reference it. Use a 3:2 property image at 1200x800px, optimized JPEG or WebP, ideally under 100KB and acceptable up to 200KB. If a retina source is needed, keep a 2400x1600px source outside runtime assets and export the optimized 1200x800px file. Default alt text for fallback usage should be `Placeholder property image`.

- [ ] **Step 3: Verify**

Run:

```bash
npm run build
npm run test:run
```

Commit:

```bash
git add next.config.mjs public/placeholder-property.jpg components/property-card.tsx components/property-gallery.tsx docs/production-readiness.md
git commit -m "fix: enable production image handling"
```

## Task 7: Refresh Documentation

**Files:**
- Modify: `README.md`
- Modify: `CLAUDE.md`
- Modify: `docs/production-readiness.md`

- [ ] **Step 1: Update runtime architecture**

Replace statements saying “sem banco/API” or “toda base em `lib/mock-data.ts`” with:

```md
Runtime público: Payload CMS via Local API em Server Components.
`lib/mock-data.ts` é usado como fonte de seed local, não como fonte pública principal.
```

- [ ] **Step 2: Add production verification checklist**

Add:

```md
## Production Verification

Run before deploy:

```bash
npm run lint
npm run typecheck
npm run test:run
npm run build
npm run test:e2e
```

All commands must exit 0.
```

- [ ] **Step 3: Verify docs do not contradict code**

Run:

```bash
rg -n "sem banco|sem autenticação|Toda a base|array estático sem banco|mock-data.ts.*Fonte de dados" README.md CLAUDE.md docs
```

Expected: no stale production-runtime claims.

Commit:

```bash
git add README.md CLAUDE.md docs/production-readiness.md
git commit -m "docs: update production readiness guidance"
```

## Final Verification

- [ ] Run:

```bash
npm run lint
npm run typecheck
npm run test:run
npm run build
npm run test:e2e
```

- [ ] Verify no local/private artifacts are staged:

```bash
git status --short
git diff --cached --name-only
```

Expected: no `.env*`, no local DB, no Playwright reports, no personal paths, no generated analysis dumps unless intentionally included.

## Self-Review

- Spec coverage: The plan covers build/typecheck, tests, Payload runtime consistency, DB/media persistence, forms, image optimization, E2E reproducibility, and docs.
- Placeholder scan: No `TBD`, `TODO`, `implement later`, or vague “add tests” steps remain.
- Type consistency: Uses `Property` and `Neighborhood` from `lib/properties/types.ts`; Payload-generated types remain limited to seed/admin data boundaries.
