# PrimeUrban

Plataforma de curadoria imobiliária de alto padrão focada em Brasília, DF. Identidade visual navy escuro + dourado/bronze.

## Stack

- **Next.js 16** com App Router e React 19
- **Tailwind CSS v4** + shadcn/ui
- **TypeScript**
- **Vitest** + Testing Library (testes unitários e de componentes)
- **Playwright** (E2E — chromium desktop + mobile iPhone 13)

## Começando

```bash
npm install
npm run dev        # http://localhost:3000 (ou 3001 se porta ocupada)
```

## Comandos

```bash
npm run dev          # servidor de desenvolvimento
npm run build        # build de produção
npm run lint         # ESLint
npm run test:run     # Vitest one-shot
npm test             # Vitest watch mode
npm run test:e2e     # Playwright E2E (requer servidor rodando)
npm run test:e2e:ui  # Playwright com UI interativa
```

## Payload seed

Quando a integração com Payload estiver habilitada, copie `.env.example` para
`.env.local`, preencha `PAYLOAD_SECRET`, `DATABASE_URL`,
`PAYLOAD_ADMIN_EMAIL` e `PAYLOAD_ADMIN_PASSWORD`, e rode:

```bash
npm run payload:seed
```

Gere um `PAYLOAD_SECRET` local seguro com:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Nunca commite `.env.local` ou credenciais reais.

## Estrutura

```
app/
  page.tsx                    # Home (Server Component)
  imoveis/
    page.tsx                  # Listagem com filtros (Client Component)
    [slug]/page.tsx           # Detalhe do imóvel (Server Component)
components/
  property-card.tsx           # Card + tipo Property
  property-filters.tsx        # Filtros + tipo FilterState
  property-gallery.tsx        # Galeria de imagens
  property-info.tsx           # Ficha técnica
  contact-form.tsx            # Formulário de contato
  hero-section.tsx            # Hero da home
  neighborhoods-section.tsx   # Seção de bairros
  whatsapp-cta.tsx            # CTA WhatsApp
lib/
  mock-data.ts                # Base de imóveis (array estático)
  filter-properties.ts        # Filtro e ordenação client-side
  format.ts                   # formatCurrency()
  property-labels.ts          # TYPE_LABELS (tipo → label pt-BR)
  site-url.ts                 # getSiteUrl()
  og-font.ts                  # Carrega Libre Baskerville para OG images
  utils.ts                    # cn() (clsx + tailwind-merge)
e2e/                          # Testes Playwright
```

## Dados

Toda a base de imóveis está em `lib/mock-data.ts` — array estático sem banco de dados ou API. O tipo `Property` é definido e exportado por `components/property-card.tsx`.

## Design System

Especificado em `DESIGN.md` (formato Google Labs Design.md). Paleta principal:

| Token | Valor | Uso |
|-------|-------|-----|
| `--primary` | `#1D2D3A` | Navy — cor institucional |
| `--secondary` | `#B68863` | Dourado/bronze — destaques e preços |
| `--accent` | `#3D4D55` | Cinza-azulado |
| `--background` | `#F9F6F0` | Creme quente |
| `--whatsapp` | `#25D366` | Botões WhatsApp |

Tipografia: **Libre Baskerville** (headings/preços) + **Inter** (corpo/UI).

Valide o design system:

```bash
nvm use 22   # ou nvm use 24
npx @google/design.md lint DESIGN.md
```

## Testes E2E

O Playwright usa dois projetos: `chromium` (desktop) e `mobile` (iPhone 13). Testes que dependem de `fill()` em React controlled inputs ou elementos `sticky` são marcados com `@desktop` e pulados no mobile.

```bash
# Iniciar servidor antes
npm run dev

# Rodar E2E
npm run test:e2e
```
