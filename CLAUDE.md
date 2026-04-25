# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # inicia servidor de desenvolvimento (porta 3000, ou 3001 se ocupada)
npm run build    # build de produção
npm run lint     # ESLint
```

> Há outro servidor Next.js em `/repos/projetos/v0-prime-urban` que pode ocupar a porta 3000. Nesse caso, este projeto sobe automaticamente na **3001**.

## Stack

- **Next.js 16** com App Router e React 19
- **Tailwind CSS v4** (via `@tailwindcss/postcss`) + `tw-animate-css`
- **shadcn/ui** — componentes em `components/ui/`, configurados em `components.json`
- **TypeScript** com `ignoreBuildErrors: true` no `next.config.mjs`
- Sem banco de dados, sem autenticação, sem testes

## Arquitetura

### Rotas (App Router)

| Rota | Arquivo | Observação |
|------|---------|------------|
| `/` | `app/page.tsx` | Server Component — monta a home com seções |
| `/imoveis` | `app/imoveis/page.tsx` | Client Component — listagem com filtros client-side |
| `/imoveis/[slug]` | `app/imoveis/[slug]/page.tsx` | Server Component — detalhe do imóvel, com `generateStaticParams` |

### Dados

Toda a base de imóveis está em **`lib/mock-data.ts`** — um array estático `mockProperties`. Não há API nem banco.

- O tipo `Property` é definido e exportado por **`components/property-card.tsx`** (não em `lib/`).
- Funções de acesso: `getFeaturedProperties()` e `getPropertyBySlug(slug)`.
- Para adicionar imóveis: inserir objetos no array `mockProperties` seguindo a interface `Property`.

### Componentes de negócio

- `components/property-card.tsx` — card usado na listagem e em destaques; define o tipo `Property`
- `components/property-filters.tsx` — filtros com tipo `FilterState` exportado
- `components/property-gallery.tsx` — galeria de imagens no detalhe
- `components/property-info.tsx` — ficha técnica no detalhe
- `components/contact-form.tsx` — formulário de contato no detalhe
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

Além das variáveis semânticas do Tailwind, o código usa classes como `bg-[var(--navy-900)]` e `text-[var(--navy-700)]` para tons de navy intermediários — certifique-se de manter esse padrão ao adicionar novos elementos.

### Testes e CI

**Playwright**: `playwright.config.ts` define dois projetos:
- `chromium` — desktop (Desktop Chrome), roda todos os testes
- `mobile` — iPhone 13, pula testes com tag `@desktop`

**CI GitHub Actions**: `.github/workflows/tests.yml` — job `unit` (Vitest) + job `e2e` (Playwright).

**Tag `@desktop`**: Usada em testes que dependem de features não confiáveis no mobile WebKit (Playwright):
- `fill()` em React controlled inputs não dispara `onChange` no mobile WebKit
- Elementos `sticky` podem cortar clicks por viewport limitado

Testes marcados com `@desktop` (skipados no mobile):
| Teste | Causa do skip |
|-------|---------------|
| `e2e/imoveis.spec.ts:30` busca textual | `fill()` não ativa `onChange` no input search mobile |
| `e2e/imoveis.spec.ts:35` sem resultados | Mesmo — texto não entra no campo |
| `e2e/imoveis.spec.ts:47` limpar filtros | Estado stale do `localFilters` + input inacessível |
| `e2e/imovel-detalhe.spec.ts:40` form submit | Viewport mobile corta `ContactForm` sticky, click falha |

Todos os testes acima **passam no `chromium` desktop**.

### Fontes

Carregadas em `app/layout.tsx` via `next/font/google`:
- `Inter` → `--font-inter`
- `Playfair Display` → `--font-playfair` (fonte serif padrão do `body`)
