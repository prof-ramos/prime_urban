# PrimeUrban

Vitrine digital de imóveis de alto padrão em Brasília. Aplicação Next.js com catálogo curado, filtros por bairro, páginas de detalhe e integração direta com WhatsApp para captação de leads.

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com/gabriel-ramos-projects-c715690c/v0-prime-urban)
[![Built with v0](https://img.shields.io/badge/Built%20with-v0.app-black?style=for-the-badge)](https://v0.app/chat/l7xhUjtNMEc)

## Stack

- **Next.js 16** (App Router) + **React 19**
- **Tailwind CSS v4** via `@tailwindcss/postcss` + `tw-animate-css`
- **shadcn/ui** (estilo *New York*, componentes em `components/ui/`)
- **TypeScript** — build tolerante a erros (`ignoreBuildErrors: true`)
- **Playwright** para testes end-to-end (Chromium + iPhone 13)
- **Vercel Analytics** integrado

Sem banco de dados, sem autenticação — toda a base de imóveis é estática em `lib/mock-data.ts`.

## Funcionalidades

- **Home** com hero, destaques, grid de bairros e CTA WhatsApp
- **Listagem `/imoveis`** com filtros client-side (tipo, bairro, preço, dormitórios, área)
- **Detalhe `/imoveis/[slug]`** com galeria, ficha técnica e formulário de contato — pré-gerado via `generateStaticParams`
- **Páginas de bairros `/bairros` e `/bairros/[slug]`** cobrindo as 31 regiões administrativas do DF
- **Páginas institucionais** `/sobre` e `/contato`
- **Botão WhatsApp flutuante** persistente em todo o site
- **SEO pronto** — metadata global, OpenGraph, Twitter Card, `robots.ts` e `sitemap.ts`

## Comandos

```bash
npm run dev          # servidor de desenvolvimento (porta 3000, ou 3001 se ocupada)
npm run build        # build de produção
npm run lint         # ESLint
npm run start        # servidor em modo produção
npm run test:e2e     # testes Playwright
npm run test:e2e:ui  # Playwright em modo UI
```

> Caso outro projeto Next.js esteja rodando em `/repos/projetos/v0-prime-urban`, ele pode ocupar a porta 3000 e este projeto subirá automaticamente na **3001** (porta esperada pela configuração do Playwright).

## Estrutura

```
app/
  page.tsx                 # Home (Server Component)
  imoveis/
    page.tsx               # Listagem com filtros (Client Component)
    [slug]/page.tsx        # Detalhe do imóvel
  bairros/
    page.tsx               # Índice de regiões administrativas
    [slug]/page.tsx        # Imóveis por bairro
  sobre/page.tsx
  contato/page.tsx
  layout.tsx               # Metadata, fontes, Analytics, WhatsApp flutuante
  globals.css              # Design tokens
  sitemap.ts · robots.ts
components/
  property-card.tsx        # Card + define o tipo `Property`
  property-filters.tsx     # Filtros + define `FilterState`
  property-gallery.tsx     # Galeria da página de detalhe
  property-info.tsx        # Ficha técnica
  contact-form.tsx         # Formulário do detalhe
  contact-page-form.tsx    # Formulário da página /contato
  featured-properties.tsx · neighborhoods-section.tsx · hero-section.tsx
  header.tsx · footer.tsx · whatsapp-cta.tsx · whatsapp-float.tsx
  ui/                      # Primitivos shadcn/ui
lib/
  mock-data.ts             # Base estática de imóveis + bairros
  utils.ts                 # Helpers (cn, formatadores)
e2e/                       # Specs Playwright
```

## Dados

Toda a base vive em `lib/mock-data.ts`:

- Array `mockProperties` com os imóveis (tipo `Property` definido em `components/property-card.tsx`).
- Array `mockNeighborhoods` com as 31 RAs do DF.
- Funções de acesso: `getFeaturedProperties()` e `getPropertyBySlug(slug)`.

Para adicionar um imóvel, inclua um novo objeto em `mockProperties` respeitando a interface `Property`. Os slugs seguem o padrão `{tipo}-{bairro}-{endereco}` (ex.: `apartamento-asa-sul-sqn-308`).

Imagens atualmente apontam para o Unsplash — substituir por assets reais em produção.

## Design System

Tokens definidos em `app/globals.css`:

| Variável | Valor | Uso |
|----------|-------|-----|
| `--primary` / `--primary-brand` | `#1D2D3A` | Navy escuro — cor principal |
| `--secondary` / `--secondary-brand` | `#B68863` | Dourado/bronze — preços e destaques |
| `--accent` | `#3D4D55` | Cinza-azulado |
| `--background` | `#F9F6F0` | Creme |
| `--whatsapp` | `#25D366` | Botões WhatsApp |

Para tons intermediários de navy o padrão é `bg-[var(--navy-900)]` / `text-[var(--navy-700)]`.

**Fontes** (carregadas em `app/layout.tsx` via `next/font/google`):
- `Inter` → `--font-inter` (sans-serif)
- `Playfair Display` → `--font-playfair` (serifa dos títulos)
- `Libre Baskerville` → serifa padrão do `body`

A identidade visual completa — tokens machine-readable + prose de aplicação — está em [`DESIGN.md`](./DESIGN.md), no formato [google-labs-code/design.md](https://github.com/google-labs-code/design.md).

## Variáveis de ambiente

| Variável | Default | Descrição |
|----------|---------|-----------|
| `NEXT_PUBLIC_SITE_URL` | `https://primeurban.com.br` | URL canônica usada em metadata, OG e sitemap |

## Deploy

O projeto é implantado na Vercel e permanece sincronizado com o workspace v0.app:

- **Produção:** [vercel.com/gabriel-ramos-projects-c715690c/v0-prime-urban](https://vercel.com/gabriel-ramos-projects-c715690c/v0-prime-urban)
- **Workspace v0:** [v0.app/chat/l7xhUjtNMEc](https://v0.app/chat/l7xhUjtNMEc)

Alterações feitas no v0.app são empurradas automaticamente para este repositório, e a Vercel publica a última versão a cada push.
