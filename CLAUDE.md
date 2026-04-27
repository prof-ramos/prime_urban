# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev          # inicia servidor de desenvolvimento (porta 3000, ou 3001 se ocupada)
npm run build        # build de produção
npm run lint         # ESLint
npm run test:run     # Vitest one-shot (unit + component)
npm test             # Vitest watch mode
npm run test:ui      # Vitest com UI interativa
npm run test:e2e     # Playwright E2E (requer servidor rodando: npm run dev)
npm run test:e2e:ui  # Playwright com UI interativa
```

**Rodar um único arquivo de teste:**
```bash
npx vitest run lib/__tests__/format.test.ts          # unit — arquivo específico
npx playwright test e2e/home.spec.ts                 # E2E — arquivo específico
npx playwright test e2e/imoveis.spec.ts --project=chromium  # projeto específico
```

> Há outro servidor Next.js em `/repos/projetos/v0-prime-urban` que pode ocupar a porta 3000. Nesse caso, este projeto sobe automaticamente na **3001**.

> `@google/design.md` requer Node ≥ 22. Use `nvm use 22` ou `nvm use 24` antes de rodar `npx @google/design.md lint DESIGN.md`.

## Stack

- **Next.js 16** com App Router e React 19
- **Tailwind CSS v4** (via `@tailwindcss/postcss`) + `tw-animate-css`
- **shadcn/ui** — componentes em `components/ui/`, configurados em `components.json`
- **TypeScript** com `ignoreBuildErrors: true` no `next.config.mjs`
- **Vitest** + Testing Library para testes unitários e de componentes (`lib/__tests__/`, `components/__tests__/`, `app/__tests__/`)
- **Playwright** para E2E (`e2e/`) — dois projetos: `chromium` (desktop) e `mobile` (iPhone 13)
- Sem banco de dados, sem autenticação

## Arquitetura

### Rotas (App Router)

| Rota | Arquivo | Observação |
|------|---------|------------|
| `/` | `app/page.tsx` | Server Component — home com seções |
| `/imoveis` | `app/imoveis/page.tsx` | Client Component — listagem com filtros client-side |
| `/imoveis/[slug]` | `app/imoveis/[slug]/page.tsx` | Server Component — detalhe do imóvel, com `generateStaticParams` |
| `/bairros` | `app/bairros/page.tsx` | Server Component — listagem de bairros |
| `/bairros/[slug]` | `app/bairros/[slug]/page.tsx` | Server Component — imóveis por bairro, com `generateStaticParams` |
| `/sobre` | `app/sobre/page.tsx` | Server Component — página institucional |
| `/contato` | `app/contato/page.tsx` | Server Component — usa `ContactPageForm` (Client Component) |

Arquivos especiais: `app/sitemap.ts`, `app/robots.ts`, `app/not-found.tsx`, `app/error.tsx`, `app/loading.tsx`.
OG images dinâmicas via Satori: `app/opengraph-image.tsx` e `app/imoveis/[slug]/opengraph-image.tsx`.

### Dados

Toda a base de imóveis está em **`lib/mock-data.ts`** — um array estático `mockProperties`. Não há API nem banco.

- O tipo `Property` é definido e exportado por **`components/property-card.tsx`** (não em `lib/`).
- Funções de acesso: `getFeaturedProperties()` e `getPropertyBySlug(slug)`.
- Para adicionar imóveis: inserir objetos no array `mockProperties` seguindo a interface `Property`.

### Utilitários (`lib/`)

| Arquivo | Exporta | Uso |
|---------|---------|-----|
| `mock-data.ts` | `mockProperties`, `getFeaturedProperties()`, `getPropertyBySlug()`, `getPropertiesByNeighborhood()`, `mockNeighborhoods`, `getNeighborhoodBySlug()` | Fonte de dados estática |
| `filter-properties.ts` | `filterProperties(filters, sortBy)`, `SortOption` | Filtro e ordenação client-side da listagem |
| `format.ts` | `formatCurrency(value)` | Formata número como `R$ 1.850.000` (instância `Intl` em nível de módulo) |
| `property-labels.ts` | `TYPE_LABELS` | Mapa `tipo → label` em português |
| `site-url.ts` | `getSiteUrl()` | Retorna `NEXT_PUBLIC_SITE_URL` ou fallback |
| `og-font.ts` | `loadOgFont()` | Carrega Libre Baskerville para Satori (server-only, com cache) |
| `utils.ts` | `cn()` | Merge de classes Tailwind via `clsx` + `tailwind-merge` |

### Componentes de negócio

- `components/property-card.tsx` — card usado na listagem e em destaques; define o tipo `Property`
- `components/property-filters.tsx` — filtros com tipo `FilterState` exportado
- `components/property-gallery.tsx` — galeria de imagens no detalhe
- `components/property-info.tsx` — ficha técnica no detalhe
- `components/contact-form.tsx` — formulário de contato no detalhe do imóvel (sticky, validado com Zod + react-hook-form)
- `components/contact-page-form.tsx` — formulário da página `/contato` (Client Component separado)
- `components/header.tsx`, `footer.tsx`, `hero-section.tsx`, `neighborhoods-section.tsx`, `whatsapp-cta.tsx`, `whatsapp-float.tsx` — layout e seções da home

### Design system / Cores

Variáveis CSS definidas em `app/globals.css`:

| Variável | Valor | Uso |
|----------|-------|-----|
| `--primary` / `--primary-brand` | `#1D2D3A` | Navy escuro — cor principal |
| `--secondary` / `--secondary-brand` | `#B68863` | Dourado/bronze — destaques e preços |
| `--accent` | `#3D4D55` | Cinza-azulado |
| `--background` | `#F9F6F0` | Creme |
| `--whatsapp` | `#25D366` | Botões WhatsApp |
| `--whatsapp-hover` | `#20bc5a` | Hover do botão WhatsApp |

Além das variáveis semânticas do Tailwind, o código usa classes como `bg-[var(--navy-900)]` e `text-[var(--navy-700)]` para tons de navy intermediários — certifique-se de manter esse padrão ao adicionar novos elementos.

**Gotcha Tailwind v4 — opacity:** Use sintaxe `bg-secondary/[8%]` (com colchetes) para valores fora da escala padrão. `/8` sem colchetes não gera classe válida no Tailwind v4.

### Testes e CI

**Playwright**: `playwright.config.ts` define dois projetos:
- `chromium` — desktop (Desktop Chrome), roda todos os testes
- `mobile` — iPhone 13, pula testes com tag `@desktop`

**CI GitHub Actions**: `.github/workflows/tests.yml` — job `unit` (Vitest) + job `e2e` (Playwright).

**Tag `@desktop`**: Usada em testes que dependem de features não confiáveis no mobile WebKit (Playwright):
- `fill()` em React controlled inputs não dispara `onChange` no mobile WebKit
- Elementos `sticky` podem cortar clicks por viewport limitado

Testes marcados com `@desktop` (skipados no mobile):
| Arquivo | Título do teste | Causa do skip |
|---------|----------------|---------------|
| `e2e/imoveis.spec.ts` | `busca textual filtra resultados @desktop` | `fill()` não ativa `onChange` no input search mobile |
| `e2e/imoveis.spec.ts` | `sem resultados exibe mensagem e botão limpar @desktop` | Mesmo — texto não entra no campo |
| `e2e/imoveis.spec.ts` | `botão limpar filtros restaura todos os resultados @desktop` | Estado stale do `localFilters` + input inacessível |
| `e2e/imoveis.spec.ts` | `card de imóvel navega para a página de detalhe @desktop` | Elemento `sticky` corta clicks em viewport mobile |
| `e2e/imovel-detalhe.spec.ts` | `submissão do formulário exibe confirmação @desktop` | Viewport mobile corta `ContactForm` sticky, click falha |

Todos os testes acima **passam no `chromium` desktop**.

### Fontes

Carregadas em `app/layout.tsx` via `next/font/google`:
- `Inter` → `--font-inter` (corpo, UI)
- `Playfair Display` → `--font-playfair` (variável disponível, mas não é a serif principal do design)
- `Libre Baskerville` → `--font-serif` (definida em `globals.css` via `@theme inline`; usada em `font-serif` — headings, preços, OG image)

### Design system e documentação

- `DESIGN.md` — especificação Google Labs Design.md com tokens YAML + prosa. Valide com `npx @google/design.md lint DESIGN.md` (requer Node ≥ 22 — use `nvm use 22` ou `nvm use 24`).
- `.coderabbit.yaml` — configuração do CodeRabbit com `path_instructions` por camada do projeto.
