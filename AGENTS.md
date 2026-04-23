# AGENTS.md — PrimeUrban

## Setup & Commands

```bash
npm run dev      # dev server (port 3000, falls back to 3001/3002)
npm run build    # production build
npm run lint     # ESLint
```

**Port conflict**: Another Next.js project at `/repos/projetos/v0-prime-urban` occupies port 3000. This project auto-selects the next available port. Always check which port the server started on.

**Dev lock issue**: If `Unable to acquire lock at .next/dev/lock`, kill stale next processes and delete the lock file:
```bash
lsof -ti :3001 | xargs kill -9 2>/dev/null
rm -f .next/dev/lock
```

## Architecture

- **Next.js 16** (App Router) + **React 19** + **Tailwind CSS v4** + **shadcn/ui** (New York style)
- **No database, no auth, no tests** — all data is static in `lib/mock-data.ts`
- **TypeScript** with `ignoreBuildErrors: true` — type errors won't block builds

### Key files

| Path | Purpose |
|------|---------|
| `lib/mock-data.ts` | Static property data — add/edit properties here |
| `components/property-card.tsx` | Defines `Property` type (not in `lib/`) |
| `components/property-filters.tsx` | Defines `FilterState` type |
| `app/globals.css` | Design tokens (colors, fonts, radius) |

### Routes

| Route | Type | Notes |
|-------|------|-------|
| `/` | Server Component | Home page |
| `/imoveis` | Client Component | Listing with client-side filters |
| `/imoveis/[slug]` | Server Component | Property detail + `generateStaticParams` |

## Design System

Colors in `app/globals.css` — use CSS variables, not hardcoded values:
- `--primary` / `--primary-brand`: `#1D2D3A` (navy)
- `--secondary` / `--secondary-brand`: `#B68863` (gold/bronze for prices/highlights)
- `--background`: `#F9F6F0` (cream)
- `--whatsapp`: `#25D366`

Intermediate navy tones use `bg-[var(--navy-900)]` / `text-[var(--navy-700)]` pattern.

Fonts: `--font-inter` (sans), `--font-playfair` / `Libre Baskerville` (serif for body).

## Conventions

- `Property` type lives in `components/property-card.tsx`, not `lib/`
- All images are Unsplash URLs — replace with real assets in production
- WhatsApp CTA links use `--whatsapp` color variable
- slugs follow pattern: `{tipo}-{bairro}-{endereco}` (e.g., `apartamento-asa-sul-sqn-308`)

## References

- Full architecture guide: `CLAUDE.md`
- shadcn config: `components.json`
- Live deploy: Vercel (auto-synced from v0.app)
