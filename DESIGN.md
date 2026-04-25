---
name: PrimeUrban
description: Curadoria imobiliária de alto padrão em Brasília, DF. Identidade navy escuro + dourado/bronze.
colors:
  primary: "#1D2D3A"
  secondary: "#B68863"
  accent: "#3D4D55"
  neutral: "#F9F6F0"
  muted: "#D9C3A9"
typography:
  h1:
    fontFamily: "Libre Baskerville"
    fontSize: "3.75rem"
    fontWeight: 700
  h2:
    fontFamily: "Libre Baskerville"
    fontSize: "2.25rem"
    fontWeight: 700
  body-md:
    fontFamily: "Inter"
    fontSize: "1rem"
  body-sm:
    fontFamily: "Inter"
    fontSize: "0.875rem"
  label:
    fontFamily: "Inter"
    fontSize: "0.75rem"
rounded:
  sm: "8px"
  md: "10px"
  lg: "20px"
  xl: "24px"
  full: "9999px"
spacing:
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "32px"
  section: "96px"
components:
  button-primary:
    backgroundColor: "{colors.secondary}"
    textColor: "{colors.primary}"
    rounded: "{rounded.md}"
    padding: "12px 24px"
  button-whatsapp:
    backgroundColor: "#25D366"
    textColor: "#ffffff"
    rounded: "{rounded.md}"
    padding: "16px 32px"
  property-card:
    backgroundColor: "#ffffff"
    rounded: "{rounded.lg}"
  button-outline:
    backgroundColor: "{colors.neutral}"
    textColor: "{colors.primary}"
    rounded: "{rounded.md}"
    padding: "12px 24px"
  badge-rent:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.neutral}"
    rounded: "{rounded.full}"
  badge-sale:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.neutral}"
    rounded: "{rounded.full}"
  badge-featured:
    backgroundColor: "{colors.secondary}"
    textColor: "{colors.primary}"
    rounded: "{rounded.full}"
---

## Overview

PrimeUrban é uma plataforma de curadoria imobiliária de alto padrão focada em Brasília, DF. A identidade visual une **luxo refinado** e **confiança institucional**: navy profundo como cor institucional, dourado/bronze como acento de valor, e creme quente como background neutro.

O princípio central é **contraste de temperatura**: seções light (`#F9F6F0`) alternam com seções dark (`#0F1D28` — navy-900), criando ritmo visual. O dourado `#B68863` é a ponte entre os dois mundos.

## Colors

- **Primary (`#1D2D3A`)**: Navy escuro. Cor institucional — textos principais, header, badges de venda, botão "Fale Conosco".
- **Secondary (`#B68863`)**: Dourado/bronze. Cor de valor — preços de imóveis, badges "Destaque", ícones de features, CTAs primários, links ativos.
- **Accent (`#3D4D55`)**: Cinza-azulado. Suporte — badges "Aluguel", muted foreground.
- **Neutral (`#F9F6F0`)**: Creme quente. Background padrão das seções light.
- **Muted (`#D9C3A9`)**: Tan/areia. Borders e separadores.

Escala navy adicional definida em `globals.css` (`--navy-50` a `--navy-900`). Seções atmosféricas usam `--navy-900` (`#0F1D28`) como fundo.

### Contraste WCAG AA

| Fundo | Texto | Contraste |
|-------|-------|-----------|
| `#0F1D28` | `#F9F6F0` | ~17:1 ✅ |
| `#1D2D3A` | `#F9F6F0` | ~14:1 ✅ |
| `#F9F6F0` | `#1D2D3A` | ~14:1 ✅ |
| `#B68863` | `#1D2D3A` | ~4.5:1 ✅ (limiar) |

## Typography

- **Libre Baskerville** (serif): Autoridade e prestígio. Headings, preços, estatísticas. Nunca em corpo corrido.
- **Inter** (sans-serif): Clareza funcional. Corpo, labels, navegação, formulários.

Labels de seção: `text-xs uppercase tracking-[0.2em] text-secondary`.

## Layout

- Container: `container mx-auto px-4`
- Seções: `py-16 md:py-24`
- Hero: `min-h-[85vh]`
- Grid imóveis: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6`
- Grid bairros: `grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3`
- Alternância de seções: hero (dark) → featured (light) → bairros (dark) → WhatsApp CTA (dark)

## Elevation & Depth

- **Repouso**: border sutil + sombra leve
- **Hover**: `hover:-translate-y-0.5` + `shadow-xl` + `border-secondary/60`
- **Atmosfera dark**: `radial-gradient` mesh com glows bronze/azul/verde

Glassmorphism (`bg-white/8` + `backdrop-blur(20px)`) apenas no hero search box sobre fundo dark.

## Shapes

- Border radius padrão: `20px` (cards, modais, search box)
- Pills: `rounded-full` (badges, tipo de imóvel)
- Cards de bairro: `rounded-xl` (12px)

## Components

### PropertyCard
Aspecto `4/3` na imagem. Hover revela overlay `bg-primary/80 backdrop-blur-sm` com preço serif + pill "Ver imóvel".

### HeroSection
`bg-[var(--navy-900)]` com gradient mesh bronze/azul + dot pattern. Search box glassmorphism. Animações escalonadas: badge (0ms) → h1 (200ms) → subtitle (300ms) → search (400ms) → stats (500ms).

### NeighborhoodsSection
Dark section com 6 gradientes únicos por card. Hover fill `rgba(182,136,99,0.08)`.

### WhatsAppCTA
Dark section com gradient mesh verde/bronze. Ícone com glow verde. Botão `bg-[var(--whatsapp)]` com `hover:shadow` verde.

## Do's and Don'ts

**Do:**
- `font-serif` em headings e preços
- `text-secondary` em elementos de valor/destaque
- `min-h-[44px] min-w-[44px]` em todos os elementos interativos
- `text-balance` em headings, `text-pretty` em parágrafos
- Declarar variáveis CSS em `globals.css` antes do uso
- Opacity Tailwind com sintaxe `/[N%]` para valores fora da escala padrão

**Don't:**
- Inter em headings principais
- Purple gradients ou cores fora da paleta
- Verde fora do contexto WhatsApp
- CSS vars não declaradas (`--sky-200`, `--blue-400`, etc.)
