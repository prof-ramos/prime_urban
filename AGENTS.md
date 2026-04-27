# AGENTS.md — PrimeUrban

## Setup & Commands

```bash
npm run dev          # dev server (Next.js + Payload)
npm run build        # production build
npm run lint         # ESLint
npm run test         # Vitest (unit/component)
npm run test:e2e     # Playwright (end-to-end)
agent-browser install # ensure browser verification tools are ready
```

## Architecture

- **Next.js 16** (App Router) + **React 19** + **Tailwind CSS v4** + **shadcn/ui**
- **Payload CMS**: Backend for properties, neighborhoods, and media management.
- **Database**: PostgreSQL (via Payload).
- **Testing**: Vitest for unit/components, Playwright for E2E.

### Key files

| Path | Purpose |
|------|---------|
| `payload.config.ts` | CMS Configuration |
| `collections/` | Database schemas (Properties, Neighborhoods, etc.) |
| `lib/payload/` | Adapters and API calls to the CMS |
| `components/hero-section.tsx` | Main search filter implementation |
| `app/globals.css` | Design tokens and Tailwind configuration |

### Routes

| Route | Type | Notes |
|-------|------|-------|
| `/` | Server Component | Home page (Static with revalidation) |
| `/imoveis` | Client Component | Listing with filter state and search params |
| `/imoveis/[slug]` | Server Component | Dynamic property detail |
| `/admin` | Payload Admin | CMS dashboard |

## Design System

- **Primary:** `#1D2D3A` (Navy) - Use `--primary`
- **Secondary:** `#B68863` (Bronze) - Use `--secondary` for highlights/CTAs
- **Typography:** Serif for headings (`font-serif`), Sans for body/UI (`font-sans`).

## Conventions

- **Filter UX:** Use "Categorized Grid" (4 primary columns + advanced toggle).
- **Asset Management:** Use Payload `Media` collection for all production images.
- **Slugs:** Automated by Payload based on the property title.
- **Validation:** Always verify UI changes with `agent-browser` or `chrome-devtools`.

## References

- `CLAUDE.md`: Main technical guide.
- `GEMINI.md`: AI Agent mandates and verification workflows.
