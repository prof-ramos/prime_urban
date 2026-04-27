# CodeRabbit Review Corrections Plan

> Generated from `coderabbit review --prompt-only` on 2026-04-27.
> Total findings: ~65. Items are grouped by severity and tracked with checkboxes.
>
> **For agentic workers:** Use `superpowers:subagent-driven-development` or `superpowers:executing-plans` to implement.

---

## P0 — Potential Issues (Blocking / Bugs)

- [ ] **`eslint.config.mjs`** — `defineConfig` import path likely wrong. Change to `import { defineConfig } from "eslint";` and verify ESLint version compatibility.
- [ ] **`eslint.config.mjs`** — `ignores` property should NOT be in the same object as `rules`. Split into two config objects inside the exported array (one with `rules`, another with `ignores`).
- [ ] **`app/robots.ts`** — Replace `siteConfig.siteUrl` with env-aware `getSiteUrl()` helper.
- [ ] **`app/sitemap.ts`** — Same: replace direct `siteConfig.siteUrl` usage with `getSiteUrl()`.
- [ ] **`app/imoveis/[slug]/page.tsx`** — `dangerouslySetInnerHTML` with `JSON.stringify(jsonLd)` is XSS-prone. Sanitize with `</script` escaping before injecting.
- [ ] **`components/property-info.tsx`** — `typeLabels[property.type]` lacks fallback for unknown types. Add nullish coalescing default (e.g., `"Imóvel"`).
- [ ] **`components/__tests__/property-card.test.tsx`** — Imports `Property` from `@/lib/properties/types`; per project convention it must import from `../property-card`.
- [ ] **`lib/properties/types.ts`** — `Property` interface must live in `components/property-card.tsx`, not `lib/`. Move and update all imports.
- [ ] **`lib/properties/types.ts`** — `FilterState` interface must live in `components/property-filters.tsx`, not `lib/`. Move and update all imports.
- [ ] **`analysis_results/*.json`** — wimoveis, imovelweb, zap, vivareal, quintoandar, chavesnamao data files contain bot-blocked/placeholder content (Cloudflare, "Um momento…"). Update scraper to detect and retry, and purge bad results.
- [ ] **`components/contact-form.tsx`** — WhatsApp handler doesn't include `propertyId` in message. Pass `propertyId` into `buildWhatsAppUrl`.

---

## P1 — Refactor Suggestions

- [ ] **`lib/site-url.ts`** — Replace `getSiteUrl()` with a module-level constant `SITE_URL` to avoid repeated function call overhead.
- [ ] **`app/imoveis/page.tsx`** — Replace `value as SortOption` with runtime type guard `isSortOption(value)` before calling `setSortBy`.
- [ ] **`app/imoveis/[slug]/page.tsx`** — Extract duplicated description construction into `buildPropertyDescription(property)` helper, use in both `generateMetadata` and page component.
- [ ] **`lib/mock-data.ts`** — Remove `React.cache()` wrapper from `getPropertyBySlug`; static data doesn't benefit. Replace with `Map`-based O(1) lookup.
- [ ] **`analyze_portals.sh`** — Add `set -euo pipefail`, ERR trap, and per-step log capture for safer execution.
- [ ] **`app/imoveis/page.tsx`** — Move `FilterState` definition to `components/property-filters.tsx`, re-export it there if needed, redirect imports.

---

## P2 — Nitpicks

- [ ] **`components/property-card.tsx`** — Remove unused `Bath` import from `lucide-react`.
- [ ] **`components/contact-page-form.tsx`** — 100ms artificial delay is too short. Increase to 300–500ms or remove and rely on real async lifecycle.
- [ ] **`components/contact-form.tsx`** — Same 100ms delay issue as above.
- [ ] **`components/footer.tsx`** — Hardcoded `CRECI-DF 00000-J` should come from `siteConfig.creci`.
- [ ] **`app/imoveis/page.tsx`** — `Suspense fallback={null}` should render a visible loading state (spinner/skeleton).
- [ ] **`lib/properties/filter-options.ts`** — Replace inline `localeCompare` with module-level `Intl.Collator("pt-BR", { sensitivity: "base" })`.
- [ ] **`e2e/home.spec.ts`** — Replace `page.locator("label").getByText(...)` with `page.getByText(..., { exact: true })`.
- [ ] **`e2e/imoveis.spec.ts`** — `getByRole("combobox").last()` is fragile; use deterministic locator (label or `data-testid`).
- [ ] **`e2e/imoveis.spec.ts`** — Sorting test only checks visibility of apartment link. Assert it's the **first** result to validate ordering.
- [ ] **`lib/__tests__/search-params.test.ts`** — Exact query-string assertion is brittle. Validate each param individually via `params.get()`.
- [ ] **`app/imoveis/[slug]/page.tsx`** — `PropertyGallery` dynamic import lacks loading fallback. Add `loading` option with skeleton.
- [ ] **`analysis_results/*_perf.txt`** — Raw numeric values with no metadata. Convert to structured JSON including metric name, unit, ISO timestamp, environment.
- [ ] **`quintoandar_detail_snapshot.txt`** — Multiple buttons render as `[object Object]`. Fix label extraction logic in snapshot generator.
- [ ] **`.mcp.json`** — Absolute path `/Users/gabrielramos/...` should be configurable via environment variable or relative path.

---

## P3 — Documentation / DevEx

- [ ] **`.claude/commands/debug.md`** — Document the `$ARGUMENTS` placeholder for the debug command.
- [ ] **`.claude/commands/debug.md`** — Missing trailing newline at EOF.
- [ ] **`.claude/commands/refactor.md`** — Missing trailing newline at EOF.
- [ ] **`.claude/commands/state-management.md`** — Missing trailing newline at EOF.
- [ ] **`.claude/commands/component.md`** — Add error handling, performance, and linting steps.
- [ ] **`.claude/commands/component.md`** — Expand "Requirements" section with export patterns, performance, state management, docs format.
- [ ] **`.claude/commands/component.md`** — Expand "Important Notes" with branch naming, PR review checklist, bundle budget.
- [ ] **`.claude/commands/state-management.md`** — Add server-state vs client-state guidance.
- [ ] **`.claude/commands/hooks.md`** — Clarify "Naming convention (use prefix)" → hooks must start with `use` prefix.
- [ ] **`.claude/commands/e2e.md`** — Prioritize selectors: `getByRole` → `getByText/Label/Placeholder` → `getByTestId` last resort.
- [ ] **`.claude/commands/typescript-migrate.md`** — Add trailing newline at EOF.
- [ ] **`.claude/commands/typescript-migrate.md`** — Add "Common migration challenges" subsection.
- [ ] **`.claude/commands/typescript-migrate.md`** — Expand plan with test migration, build tool updates, dependency type management.

---

## Archive / Data Artifacts

These generated files are analysis artifacts. Fix their format or exclude from git if appropriate:

- [ ] **`analysis_results/chavesnamao_data.json`** — Double-encoded JSON string. Convert to clean JSON object.
- [ ] **`analysis_results/quintoandar_data.json`** — Double-encoded JSON string + invalid array/string format.
- [ ] **`analysis_results/quintoandar_map_info.json`** — Escaped JSON string. Convert to JSON object.
- [ ] **`analysis_results/wimoveis_data.json`** — Double-encoded JSON string.
- [ ] **`analysis_results/vivareal_data.json`** — Double-encoded JSON string.
- [ ] **`analysis_results/zap_data.json`** — Double-encoded JSON string.
- [ ] **`analysis_results/imovelweb_data.json`** — Double-encoded JSON string.
- [ ] **`analysis_results/imovelweb_data.json`** — Support multiple entries (array or NDJSON) instead of single result overwrite.
- [ ] **`analysis_results/zap_data.json`** — Cloudflare-blocked content. Add detection + retry logic.
- [ ] **`chavesnamao_listings_snapshot.txt`** — Typo "Opss!" → "Ops!" in heading ref=e1.
- [ ] **`chavesnamao_listings_snapshot.txt`** — Ref ordering (e3–e8 before e1–e2) looks inconsistent. Verify or document.

---

*End of plan — 65 items total.*
