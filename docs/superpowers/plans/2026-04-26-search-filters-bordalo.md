# Search Filters Bordalo Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a Prime Urban search experience inspired by Bordalo Prime: four primary filters, expandable advanced filters, property code search, and explicit listing sort options.

**Architecture:** Keep the current static-data architecture and client-side filtering. Extend the `Property` shape with `city` and `code`, update `FilterState`, then keep all filtering in `lib/filter-properties.ts` so UI components stay presentational.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, Tailwind CSS v4, shadcn/ui, Vitest, Playwright.

---

## File Structure

- Modify `components/property-card.tsx`: add `city` and `code` to `Property`, use `city` in the location line, and surface the code as a small card detail.
- Modify `lib/mock-data.ts`: add `city: "Brasília"` and stable `code: "PU-000N"` values to every mock property.
- Modify `lib/filter-properties.ts`: support `city`, `code`, expanded keyword matching, and sort options `default`, `az`, `za`, `price-asc`, `price-desc`, `oldest`, `recent`.
- Modify `components/property-filters.tsx`: replace the current filter shell with four visible filters plus an advanced collapsible section containing min bedrooms, min/max price, code, and keyword.
- Modify `components/hero-section.tsx`: align the hero search with the four primary fields and an advanced row.
- Modify `app/imoveis/page.tsx`: read query params from the hero, use the expanded sort list, and pass the richer filter state.
- Modify tests in `lib/__tests__/filter-properties.test.ts`, `e2e/home.spec.ts`, and `e2e/imoveis.spec.ts`.

### Task 1: Data And Filter Engine

**Files:**
- Modify: `components/property-card.tsx`
- Modify: `lib/mock-data.ts`
- Modify: `lib/filter-properties.ts`
- Test: `lib/__tests__/filter-properties.test.ts`

- [ ] **Step 1: Write failing unit tests**

Add tests for code filtering, city filtering, keyword matching against code, and the new sort options:

```ts
it("filters by city", () => {
  const results = filterProperties({ ...defaultFilters, city: "Brasília" })
  expect(results).toHaveLength(mockProperties.length)
})

it("filters by property code", () => {
  const results = filterProperties({ ...defaultFilters, code: "PU-0002" })
  expect(results).toHaveLength(1)
  expect(results[0].slug).toBe("cobertura-noroeste-sqnw-111")
})

it("searches by property code as a keyword", () => {
  const results = filterProperties({ ...defaultFilters, search: "PU-0004" })
  expect(results).toHaveLength(1)
  expect(results[0].slug).toBe("casa-lago-sul-shis-qi-25")
})

it("sorts alphabetically from A to Z", () => {
  const results = filterProperties(defaultFilters, "az")
  const titles = results.map((p) => p.title)
  expect(titles).toEqual([...titles].sort((a, b) => a.localeCompare(b, "pt-BR")))
})

it("sorts by oldest mock entry first", () => {
  const results = filterProperties(defaultFilters, "oldest")
  expect(results[0].id).toBe("1")
})
```

- [ ] **Step 2: Run unit test to verify failure**

Run: `npm run test:run -- lib/__tests__/filter-properties.test.ts`
Expected: FAIL because `city`, `code`, and new sort options are not implemented yet.

- [ ] **Step 3: Implement data/type/filter changes**

Add `city` and `code` to `Property`, populate all mock properties, and update filter logic:

```ts
export type SortOption =
  | "default"
  | "recent"
  | "oldest"
  | "az"
  | "za"
  | "price-asc"
  | "price-desc"
  | "area-desc"
```

Filter `city`, `code`, keyword fields, and sort by `id` for default/recent/oldest.

- [ ] **Step 4: Run unit test to verify pass**

Run: `npm run test:run -- lib/__tests__/filter-properties.test.ts`
Expected: PASS.

### Task 2: Filter UI And Hero Query Params

**Files:**
- Modify: `components/property-filters.tsx`
- Modify: `components/hero-section.tsx`
- Modify: `app/imoveis/page.tsx`
- Test: `e2e/home.spec.ts`
- Test: `e2e/imoveis.spec.ts`

- [ ] **Step 1: Write failing E2E expectations**

Update the tests to expect visible primary controls named `Tipo de negócio`, `Tipo de imóvel`, `Cidade`, and `Bairro`, plus advanced controls `Código do imóvel` and `Palavra-chave`.

- [ ] **Step 2: Run E2E test to verify failure**

Run: `npx playwright test e2e/home.spec.ts e2e/imoveis.spec.ts --project=chromium`
Expected: FAIL because the new advanced controls do not exist yet.

- [ ] **Step 3: Implement filter UI**

Build the filter panel with four visible selectors. Add a `Collapsible` advanced area with min bedrooms, min price, max price, code, and keyword. Keep filter updates immediate and reset all fields back to empty plus `minPrice: 0`, `maxPrice: 10000000`.

- [ ] **Step 4: Implement hero query params**

Use `tipo`, `imovel`, `cidade`, `bairro`, `quartos`, `precoMin`, `precoMax`, `codigo`, and `q` query params. In `/imoveis`, initialize state from `useSearchParams`.

- [ ] **Step 5: Run E2E to verify pass**

Run: `npx playwright test e2e/home.spec.ts e2e/imoveis.spec.ts --project=chromium`
Expected: PASS.

### Task 3: Sort Controls And Final Verification

**Files:**
- Modify: `app/imoveis/page.tsx`
- Test: `lib/__tests__/filter-properties.test.ts`
- Test: `e2e/imoveis.spec.ts`

- [ ] **Step 1: Add sort labels**

Expose sort options: `Ordem padrão`, `A a Z`, `Z a A`, `Menor preço`, `Maior preço`, `Mais antigos`, `Mais recentes`.

- [ ] **Step 2: Verify build and lint**

Run: `npm run lint`
Expected: PASS.

Run: `npm run build`
Expected: PASS.

- [ ] **Step 3: Browser smoke test**

Open `http://localhost:3000/`, search from the hero, confirm navigation to `/imoveis`, expand advanced filters, search by `PU-0002`, and confirm one result.

## Self-Review

- Spec coverage: four primary filters, advanced filters, code/keyword search, and explicit ordering are each covered by a task.
- Placeholder scan: no placeholder steps remain; each task contains concrete paths, commands, and expected outcomes.
- Type consistency: `city`, `code`, `search`, `minPrice`, `maxPrice`, and sort option names are used consistently across planned files.
