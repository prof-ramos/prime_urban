# Resolver Issues UI Pendentes Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Resolver as issues UI-010, UI-011, UI-018, UI-022 e UI-024 mantendo a experiência atual da PrimeUrban estável, acessível e verificável.

**Architecture:** A solução preserva o App Router e os componentes existentes, adicionando apenas unidades pequenas para dados de depoimentos e mapa de bairros. Os filtros compartilham opções reutilizáveis em `lib/properties/filter-options.ts`; a home passa a compor `TestimonialsSection` e `NeighborhoodMap`; a acessibilidade é corrigida no código real e no teste axe, removendo exclusões que mascaravam problemas.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, Tailwind CSS v4, shadcn/ui/Radix, lucide-react, Vitest + Testing Library, Playwright + @axe-core/playwright.

---

## Scope Check

As issues abertas são todas da camada de UI da home/listagem e compartilham a mesma superfície visual:

- `ui-010-quartos-vagas-busca.md`: quartos e vagas visíveis na busca principal.
- `ui-011-busca-avancada-link.md`: gatilho de busca avançada discreto, com aparência de link.
- `ui-018-depoimentos.md`: seção de prova social na home.
- `ui-022-contraste-wcag.md`: contraste, nomes acessíveis de botões/selects e zoom mobile.
- `ui-024-mapa-bairros.md`: mapa funcional com pins clicáveis para bairros.

Isso não precisa ser dividido em planos separados porque todos os itens são regressões/adições de uma mesma jornada: buscar imóveis, explorar bairros e confiar na marca.

## File Structure

- Modify: `lib/properties/filter-options.ts`
  - Responsável por opções estáveis de filtros reutilizadas no hero e na listagem.
  - Adicionar `BEDROOM_OPTIONS` e `PARKING_OPTIONS`.

- Modify: `components/hero-section.tsx`
  - Responsável pela busca inicial da home.
  - Expor `Min. quartos` e `Min. vagas` na busca principal.
  - Transformar o gatilho de busca avançada em link discreto.
  - Adicionar `aria-label` nos `SelectTrigger`.
  - Escurecer textos bronze pequenos onde necessário.

- Modify: `components/property-filters.tsx`
  - Responsável pelos filtros da página `/imoveis`.
  - Expor `Min. quartos` e `Min. vagas` na busca principal.
  - Manter busca avançada para preço/código/palavra-chave com gatilho discreto.
  - Adicionar nomes acessíveis aos selects e ao slider.

- Create: `lib/testimonials.ts`
  - Dados estáticos dos depoimentos; sem dependência de API.

- Create: `components/testimonials-section.tsx`
  - Nova seção de prova social com 3 depoimentos, fotos, textos e contexto do bairro.

- Modify: `app/page.tsx`
  - Inserir `TestimonialsSection` entre bairros e CTA de WhatsApp.

- Create: `components/neighborhood-map.tsx`
  - Mapa visual responsivo, sem dependência externa, com pins clicáveis para `/imoveis?bairro=...`.

- Modify: `components/neighborhoods-section.tsx`
  - Renderizar `NeighborhoodMap` abaixo dos cards de bairros.

- Modify: `app/layout.tsx`
  - Remover `maximumScale: 1` para permitir zoom mobile.

- Modify: `e2e/a11y.spec.ts`
  - Remover exclusões de combobox e `color-contrast`.
  - Passar a falhar em violações sérias/críticas reais.

- Create: `components/__tests__/hero-section.test.tsx`
  - Regressão para campos de quartos/vagas no hero e link avançado.

- Create: `components/__tests__/property-filters.test.tsx`
  - Regressão para filtros primários na listagem.

- Create: `components/__tests__/testimonials-section.test.tsx`
  - Prova de que a seção tem 3 depoimentos com imagens.

- Create: `components/__tests__/neighborhood-map.test.tsx`
  - Prova de que pins/lista apontam para `/imoveis?bairro=...`.

- Modify: `e2e/home.spec.ts`
  - Atualizar expectations da home para quartos, vagas, depoimentos e mapa.

- Modify: `docs/plans/issues/ui-010-quartos-vagas-busca.md`
- Modify: `docs/plans/issues/ui-011-busca-avancada-link.md`
- Modify: `docs/plans/issues/ui-018-depoimentos.md`
- Modify: `docs/plans/issues/ui-022-contraste-wcag.md`
- Modify: `docs/plans/issues/ui-024-mapa-bairros.md`
  - Marcar critérios como concluídos após verificação.

## Task 1: Shared Filter Options

**Files:**
- Modify: `lib/properties/filter-options.ts`
- Test: `lib/__tests__/filter-options.test.ts`

- [ ] **Step 1: Write the failing test**

Append these assertions to `lib/__tests__/filter-options.test.ts` inside the existing `describe` block, or create the block below if the file has separate describes:

```ts
import { describe, expect, it } from "vitest"
import {
  BEDROOM_OPTIONS,
  PARKING_OPTIONS,
  DEFAULT_FILTERS,
  DEFAULT_MAX_PRICE,
  PROPERTY_TYPES,
  getCities,
  getNeighborhoods,
} from "@/lib/properties/filter-options"
import type { Property } from "@/lib/properties/types"

describe("filter options", () => {
  it("exposes reusable bedroom and parking options", () => {
    expect(BEDROOM_OPTIONS).toEqual([
      { value: "1", label: "1+ quarto" },
      { value: "2", label: "2+ quartos" },
      { value: "3", label: "3+ quartos" },
      { value: "4", label: "4+ quartos" },
    ])

    expect(PARKING_OPTIONS).toEqual([
      { value: "1", label: "1+ vaga" },
      { value: "2", label: "2+ vagas" },
      { value: "3", label: "3+ vagas" },
      { value: "4", label: "4+ vagas" },
    ])
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run:

```bash
npm run test:run -- lib/__tests__/filter-options.test.ts
```

Expected: FAIL with an import error similar to `"BEDROOM_OPTIONS" is not exported` or `"PARKING_OPTIONS" is not exported`.

- [ ] **Step 3: Add shared options**

Modify `lib/properties/filter-options.ts` so the top half reads:

```ts
import type { FilterState, Property, PropertyType } from "@/lib/properties/types"

export type FilterOption = {
  value: string
  label: string
}

export const DEFAULT_MAX_PRICE = 10000000

export const DEFAULT_FILTERS: FilterState = {
  search: "",
  transactionType: "",
  propertyType: "",
  city: "",
  neighborhood: "",
  code: "",
  minPrice: 0,
  maxPrice: DEFAULT_MAX_PRICE,
  bedrooms: "",
  parkingSpaces: "",
}

export const PROPERTY_TYPES: Array<{ value: PropertyType; label: string }> = [
  { value: "apartamento", label: "Apartamento" },
  { value: "casa", label: "Casa" },
  { value: "cobertura", label: "Cobertura" },
  { value: "sala_comercial", label: "Sala Comercial" },
]

export const BEDROOM_OPTIONS: FilterOption[] = [
  { value: "1", label: "1+ quarto" },
  { value: "2", label: "2+ quartos" },
  { value: "3", label: "3+ quartos" },
  { value: "4", label: "4+ quartos" },
]

export const PARKING_OPTIONS: FilterOption[] = [
  { value: "1", label: "1+ vaga" },
  { value: "2", label: "2+ vagas" },
  { value: "3", label: "3+ vagas" },
  { value: "4", label: "4+ vagas" },
]
```

Leave `getCities`, `getNeighborhoods`, and `toOptions` unchanged.

- [ ] **Step 4: Run test to verify it passes**

Run:

```bash
npm run test:run -- lib/__tests__/filter-options.test.ts
```

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add lib/properties/filter-options.ts lib/__tests__/filter-options.test.ts
git commit -m "feat: share bedroom and parking filter options"
```

## Task 2: Hero Search Fields and Advanced Link

**Files:**
- Modify: `components/hero-section.tsx`
- Create: `components/__tests__/hero-section.test.tsx`

- [ ] **Step 1: Write the failing component test**

Create `components/__tests__/hero-section.test.tsx`:

```tsx
import { describe, expect, it, vi } from "vitest"
import { render, screen } from "@testing-library/react"
import { HeroSection } from "@/components/hero-section"

const cityOptions = [{ value: "Brasília", label: "Brasília" }]
const neighborhoodOptions = [{ value: "Plano Piloto", label: "Plano Piloto" }]

describe("HeroSection", () => {
  it("exibe quartos e vagas na busca principal", () => {
    render(<HeroSection cityOptions={cityOptions} neighborhoodOptions={neighborhoodOptions} />)

    expect(screen.getByText("Min. quartos")).toBeInTheDocument()
    expect(screen.getByText("Min. vagas")).toBeInTheDocument()
    expect(screen.getByRole("combobox", { name: "Min. quartos" })).toBeInTheDocument()
    expect(screen.getByRole("combobox", { name: "Min. vagas" })).toBeInTheDocument()
  })

  it("mantem busca avancada como controle discreto", () => {
    render(<HeroSection cityOptions={cityOptions} neighborhoodOptions={neighborhoodOptions} />)

    const trigger = screen.getByRole("button", { name: /Busca avançada/i })
    expect(trigger).toHaveClass("underline-offset-4")
    expect(trigger).toHaveAttribute("aria-label", "Abrir busca avançada")
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run:

```bash
npm run test:run -- components/__tests__/hero-section.test.tsx
```

Expected: FAIL because `Min. vagas` is absent and the trigger is still a pill-style button without the new accessible label/class.

- [ ] **Step 3: Update imports and options**

Modify the imports in `components/hero-section.tsx`:

```tsx
import {
  BedDouble,
  Building2,
  Car,
  ChevronDown,
  Home,
  MapIcon,
  MapPin,
  Search,
  SlidersHorizontal,
  ThumbsUp,
} from "lucide-react"
```

Modify the filter-options import:

```tsx
import {
  BEDROOM_OPTIONS,
  DEFAULT_FILTERS,
  DEFAULT_MAX_PRICE,
  PARKING_OPTIONS,
  PROPERTY_TYPES,
  type FilterOption,
} from "@/lib/properties/filter-options"
```

- [ ] **Step 4: Add primary bedrooms and parking selects**

Replace the main search grid in `components/hero-section.tsx` with:

```tsx
<div className="grid grid-cols-1 overflow-hidden rounded-[1.35rem] border border-[var(--navy-900)]/10 bg-white shadow-sm md:grid-cols-2 xl:grid-cols-[1fr_1fr_1fr_1fr_0.8fr_0.8fr_auto]">
  <HeroSelectField
    icon={Home}
    label="Tipo de negócio"
    value={filters.transactionType}
    placeholder="Comprar ou alugar"
    onValueChange={(value) => updateFilter("transactionType", value)}
    options={[
      { value: "venda", label: "Comprar" },
      { value: "aluguel", label: "Alugar" },
    ]}
  />
  <HeroSelectField
    icon={Building2}
    label="Tipo de imóvel"
    value={filters.propertyType}
    placeholder="Todos os tipos"
    onValueChange={(value) => updateFilter("propertyType", value)}
    options={PROPERTY_TYPES}
  />
  <HeroSelectField
    icon={MapPin}
    label="Cidade"
    value={filters.city}
    placeholder="Todas as cidades"
    onValueChange={(value) => updateFilter("city", value)}
    options={cityOptions}
  />
  <HeroSelectField
    icon={MapIcon}
    label="Bairro"
    value={filters.neighborhood}
    placeholder="Todos os bairros"
    onValueChange={(value) => updateFilter("neighborhood", value)}
    options={neighborhoodOptions}
  />
  <HeroSelectField
    icon={BedDouble}
    label="Min. quartos"
    value={filters.bedrooms}
    placeholder="Qualquer"
    onValueChange={(value) => updateFilter("bedrooms", value)}
    options={BEDROOM_OPTIONS}
  />
  <HeroSelectField
    icon={Car}
    label="Min. vagas"
    value={filters.parkingSpaces}
    placeholder="Qualquer"
    onValueChange={(value) => updateFilter("parkingSpaces", value)}
    options={PARKING_OPTIONS}
  />

  <div className="flex items-stretch border-t border-[var(--navy-900)]/10 bg-[var(--navy-900)] p-2 md:col-span-2 xl:col-span-1 xl:border-l xl:border-t-0">
    <Button
      onClick={handleSearch}
      className="h-16 w-full rounded-2xl bg-secondary px-8 text-base font-bold text-[var(--navy-950)] shadow-[0_12px_24px_rgba(182,136,99,0.26)] hover:bg-secondary/90 xl:w-48"
    >
      <Search className="mr-2 h-4 w-4" />
      Buscar Imóveis
    </Button>
  </div>
</div>
```

- [ ] **Step 5: Make advanced search a discreet link-like trigger**

Replace the `CollapsibleTrigger` button block in `components/hero-section.tsx` with:

```tsx
<CollapsibleTrigger asChild>
  <Button
    type="button"
    variant="link"
    aria-label={isAdvancedOpen ? "Fechar busca avançada" : "Abrir busca avançada"}
    className="h-auto justify-start px-2 py-1 text-sm font-semibold text-[var(--bronze-700)] underline-offset-4 hover:text-[var(--navy-900)]"
  >
    <SlidersHorizontal className="mr-2 h-4 w-4" />
    Busca avançada
    <ChevronDown
      className={`ml-1 h-4 w-4 transition-transform ${
        isAdvancedOpen ? "rotate-180" : ""
      }`}
    />
  </Button>
</CollapsibleTrigger>
```

- [ ] **Step 6: Remove duplicated bedroom advanced field**

In the advanced filters grid, remove the `AdvancedSelect` block for `Min. quartos` and change the grid classes from `xl:grid-cols-6` to:

```tsx
<div className="mt-3 grid grid-cols-1 gap-3 rounded-[1.25rem] border border-secondary/20 bg-secondary/[0.07] p-3 md:grid-cols-2 xl:grid-cols-5">
```

Keep keyword, code, min price, and max price. Change the helper text to:

```tsx
<p className="px-2 text-xs text-[var(--navy-700)]/70">
  Código, palavra-chave e faixa de preço.
</p>
```

- [ ] **Step 7: Add accessible names to hero select triggers**

Update `HeroSelectField` so the trigger has an accessible name:

```tsx
<SelectTrigger
  aria-label={label}
  className="h-10 border-none bg-transparent p-0 font-serif text-lg text-[var(--navy-900)] shadow-none focus:ring-0 [&>svg]:text-[var(--bronze-700)]"
>
  <SelectValue placeholder={placeholder} />
</SelectTrigger>
```

Also change small bronze label classes in this component from `text-secondary` to `text-[var(--bronze-700)]`.

- [ ] **Step 8: Run test to verify it passes**

Run:

```bash
npm run test:run -- components/__tests__/hero-section.test.tsx
```

Expected: PASS.

- [ ] **Step 9: Commit**

```bash
git add components/hero-section.tsx components/__tests__/hero-section.test.tsx
git commit -m "feat: expose essential hero search filters"
```

## Task 3: Listing Filters Match Hero Filters

**Files:**
- Modify: `components/property-filters.tsx`
- Create: `components/__tests__/property-filters.test.tsx`

- [ ] **Step 1: Write the failing component test**

Create `components/__tests__/property-filters.test.tsx`:

```tsx
import { describe, expect, it, vi } from "vitest"
import { render, screen } from "@testing-library/react"
import { PropertyFilters } from "@/components/property-filters"
import { DEFAULT_FILTERS } from "@/lib/properties/filter-options"

const cityOptions = [{ value: "Brasília", label: "Brasília" }]
const neighborhoodOptions = [{ value: "Plano Piloto", label: "Plano Piloto" }]

describe("PropertyFilters", () => {
  it("exibe quartos e vagas como filtros primarios", () => {
    render(
      <PropertyFilters
        filters={DEFAULT_FILTERS}
        onFilterChange={vi.fn()}
        onReset={vi.fn()}
        cityOptions={cityOptions}
        neighborhoodOptions={neighborhoodOptions}
      />,
    )

    expect(screen.getByText("Min. quartos")).toBeInTheDocument()
    expect(screen.getByText("Min. vagas")).toBeInTheDocument()
    expect(screen.getByRole("combobox", { name: "Min. quartos" })).toBeInTheDocument()
    expect(screen.getByRole("combobox", { name: "Min. vagas" })).toBeInTheDocument()
  })

  it("renderiza busca avancada como gatilho discreto", () => {
    render(
      <PropertyFilters
        filters={DEFAULT_FILTERS}
        onFilterChange={vi.fn()}
        onReset={vi.fn()}
        cityOptions={cityOptions}
        neighborhoodOptions={neighborhoodOptions}
      />,
    )

    expect(screen.getByRole("button", { name: /Busca avançada/i })).toHaveClass("underline-offset-4")
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run:

```bash
npm run test:run -- components/__tests__/property-filters.test.tsx
```

Expected: FAIL because `Min. vagas` is absent from the DOM and the trigger is outline-style.

- [ ] **Step 3: Update imports**

Modify `components/property-filters.tsx` imports:

```tsx
import { BedDouble, Car, ChevronDown, Search, SlidersHorizontal, X } from "lucide-react"
```

Modify the filter-options import:

```tsx
import {
  BEDROOM_OPTIONS,
  DEFAULT_FILTERS,
  DEFAULT_MAX_PRICE,
  PARKING_OPTIONS,
  PROPERTY_TYPES,
  type FilterOption,
} from "@/lib/properties/filter-options"
```

- [ ] **Step 4: Add primary filter helper**

Add this helper above `PrimaryPropertyFilters`:

```tsx
function SelectFilterField({
  id,
  label,
  value,
  placeholder,
  onValueChange,
  options,
}: {
  id: string
  label: string
  value: string
  placeholder: string
  onValueChange: (value: string) => void
  options: FilterOption[]
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <Select value={value} onValueChange={onValueChange}>
        <SelectTrigger id={id} aria-label={label} className="h-12">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
```

- [ ] **Step 5: Replace primary grid with six filters**

Replace the entire return of `PrimaryPropertyFilters` with:

```tsx
return (
  <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-6">
    <SelectFilterField
      id="transaction-type"
      label="Tipo de negócio"
      value={filters.transactionType}
      placeholder="Comprar ou alugar"
      onValueChange={(value) => onUpdate("transactionType", value)}
      options={[
        { value: "venda", label: "Comprar" },
        { value: "aluguel", label: "Alugar" },
      ]}
    />
    <SelectFilterField
      id="property-type"
      label="Tipo de imóvel"
      value={filters.propertyType}
      placeholder="Todos os tipos"
      onValueChange={(value) => onUpdate("propertyType", value)}
      options={PROPERTY_TYPES}
    />
    <SelectFilterField
      id="city"
      label="Cidade"
      value={filters.city}
      placeholder="Todas as cidades"
      onValueChange={(value) => onUpdate("city", value)}
      options={cityOptions}
    />
    <SelectFilterField
      id="neighborhood"
      label="Bairro"
      value={filters.neighborhood}
      placeholder="Todos os bairros"
      onValueChange={(value) => onUpdate("neighborhood", value)}
      options={neighborhoodOptions}
    />
    <SelectFilterField
      id="bedrooms"
      label="Min. quartos"
      value={filters.bedrooms}
      placeholder="Qualquer"
      onValueChange={(value) => onUpdate("bedrooms", value)}
      options={BEDROOM_OPTIONS}
    />
    <SelectFilterField
      id="parking-spaces"
      label="Min. vagas"
      value={filters.parkingSpaces}
      placeholder="Qualquer"
      onValueChange={(value) => onUpdate("parkingSpaces", value)}
      options={PARKING_OPTIONS}
    />
  </div>
)
```

- [ ] **Step 6: Make advanced trigger link-like**

Replace the `CollapsibleTrigger` button in `ActiveFilterSummary`:

```tsx
<Button
  type="button"
  variant="link"
  aria-label={isAdvancedOpen ? "Fechar busca avançada" : "Abrir busca avançada"}
  className="h-auto px-0 py-1 text-sm font-semibold text-[var(--bronze-700)] underline-offset-4 hover:text-[var(--navy-900)]"
>
  <SlidersHorizontal className="mr-2 h-4 w-4" />
  Busca avançada
  <ChevronDown
    className={`ml-1 h-4 w-4 transition-transform ${
      isAdvancedOpen ? "rotate-180" : ""
    }`}
  />
</Button>
```

- [ ] **Step 7: Remove duplicated advanced bedroom field**

In `AdvancedPropertyFilters`, remove the bedroom select block. Change the grid class to:

```tsx
<div className="mt-4 grid grid-cols-1 gap-4 rounded-lg bg-[var(--navy-900)]/5 p-4 md:grid-cols-2 xl:grid-cols-4">
```

Keep price, code, and keyword. Add an accessible label to `Slider`:

```tsx
<Slider
  aria-label="Faixa de preço"
  defaultValue={[min, max]}
  value={value}
  min={min}
  max={max}
  step={step}
  onValueChange={(v) => onChange(v as [number, number])}
  className="w-full"
/>
```

- [ ] **Step 8: Run test to verify it passes**

Run:

```bash
npm run test:run -- components/__tests__/property-filters.test.tsx
```

Expected: PASS.

- [ ] **Step 9: Commit**

```bash
git add components/property-filters.tsx components/__tests__/property-filters.test.tsx
git commit -m "feat: align listing filters with quick search"
```

## Task 4: Testimonials Section

**Files:**
- Create: `lib/testimonials.ts`
- Create: `components/testimonials-section.tsx`
- Modify: `app/page.tsx`
- Create: `components/__tests__/testimonials-section.test.tsx`

- [ ] **Step 1: Write the failing component test**

Create `components/__tests__/testimonials-section.test.tsx`:

```tsx
import { describe, expect, it } from "vitest"
import { render, screen } from "@testing-library/react"
import { TestimonialsSection } from "@/components/testimonials-section"

describe("TestimonialsSection", () => {
  it("renderiza tres depoimentos com fotos e textos", () => {
    render(<TestimonialsSection />)

    expect(screen.getByRole("heading", { name: "Clientes que encontraram seu lugar" })).toBeInTheDocument()
    expect(screen.getAllByRole("img")).toHaveLength(3)
    expect(screen.getByText("Mariana e Felipe Costa")).toBeInTheDocument()
    expect(screen.getByText("Renata Albuquerque")).toBeInTheDocument()
    expect(screen.getByText("Eduardo Vieira")).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run:

```bash
npm run test:run -- components/__tests__/testimonials-section.test.tsx
```

Expected: FAIL because `components/testimonials-section.tsx` does not exist.

- [ ] **Step 3: Create testimonial data**

Create `lib/testimonials.ts`:

```ts
export type Testimonial = {
  name: string
  role: string
  neighborhood: string
  quote: string
  imageUrl: string
}

export const testimonials: Testimonial[] = [
  {
    name: "Mariana e Felipe Costa",
    role: "Compradores",
    neighborhood: "Lago Sul",
    quote:
      "A PrimeUrban entendeu exatamente o tipo de casa que queríamos e trouxe opções reais, sem perda de tempo. Fechamos com segurança em duas visitas.",
    imageUrl: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=300&q=80",
  },
  {
    name: "Renata Albuquerque",
    role: "Investidora",
    neighborhood: "Noroeste",
    quote:
      "O atendimento foi consultivo do começo ao fim. Recebi dados de liquidez, condomínio e documentação antes de decidir pela compra.",
    imageUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&q=80",
  },
  {
    name: "Eduardo Vieira",
    role: "Locador",
    neighborhood: "Águas Claras",
    quote:
      "Meu apartamento foi anunciado com posicionamento correto e visitas qualificadas. A negociação aconteceu rápido e com muita clareza.",
    imageUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&q=80",
  },
]
```

- [ ] **Step 4: Create testimonials component**

Create `components/testimonials-section.tsx`:

```tsx
import { Quote, Star } from "lucide-react"
import { testimonials } from "@/lib/testimonials"

export function TestimonialsSection() {
  return (
    <section className="bg-[var(--background)] py-16 md:py-24" aria-labelledby="testimonials-title">
      <div className="container mx-auto px-4">
        <div className="mb-10 max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--bronze-700)]">
            Prova social
          </span>
          <h2
            id="testimonials-title"
            className="mt-3 font-serif text-3xl font-bold text-[var(--navy-900)] md:text-4xl"
          >
            Clientes que encontraram seu lugar
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-[var(--navy-700)]/80">
            Histórias reais de compra, locação e investimento acompanhadas por uma curadoria humana em Brasília.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {testimonials.map((testimonial) => (
            <article
              key={testimonial.name}
              className="rounded-lg border border-[var(--navy-900)]/10 bg-white p-6 shadow-sm"
            >
              <div className="mb-5 flex items-center gap-4">
                <img
                  src={testimonial.imageUrl}
                  alt={`Foto de ${testimonial.name}`}
                  className="h-14 w-14 rounded-full object-cover"
                />
                <div>
                  <h3 className="font-semibold text-[var(--navy-900)]">{testimonial.name}</h3>
                  <p className="text-sm text-[var(--navy-700)]/70">
                    {testimonial.role} · {testimonial.neighborhood}
                  </p>
                </div>
              </div>

              <div className="mb-4 flex gap-1 text-[var(--bronze-700)]" aria-label="Avaliação 5 de 5">
                {[0, 1, 2, 3, 4].map((item) => (
                  <Star key={item} className="h-4 w-4 fill-current" aria-hidden="true" />
                ))}
              </div>

              <Quote className="mb-3 h-5 w-5 text-[var(--bronze-700)]" aria-hidden="true" />
              <p className="text-sm leading-relaxed text-[var(--navy-700)]">
                “{testimonial.quote}”
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 5: Render section on home**

Modify `app/page.tsx` imports:

```tsx
import { TestimonialsSection } from "@/components/testimonials-section"
```

Render it after `NeighborhoodsSection`:

```tsx
<NeighborhoodsSection />
<TestimonialsSection />
<WhatsAppCTA />
```

- [ ] **Step 6: Run test to verify it passes**

Run:

```bash
npm run test:run -- components/__tests__/testimonials-section.test.tsx
```

Expected: PASS.

- [ ] **Step 7: Commit**

```bash
git add lib/testimonials.ts components/testimonials-section.tsx components/__tests__/testimonials-section.test.tsx app/page.tsx
git commit -m "feat: add testimonials section"
```

## Task 5: Neighborhood Map

**Files:**
- Create: `components/neighborhood-map.tsx`
- Modify: `components/neighborhoods-section.tsx`
- Create: `components/__tests__/neighborhood-map.test.tsx`

- [ ] **Step 1: Write the failing component test**

Create `components/__tests__/neighborhood-map.test.tsx`:

```tsx
import { describe, expect, it } from "vitest"
import { render, screen } from "@testing-library/react"
import { NeighborhoodMap } from "@/components/neighborhood-map"

describe("NeighborhoodMap", () => {
  it("renderiza pins clicaveis para busca de imoveis por bairro", () => {
    render(<NeighborhoodMap />)

    expect(screen.getByRole("heading", { name: "Mapa dos bairros mais procurados" })).toBeInTheDocument()
    expect(screen.getByRole("link", { name: /Ver imóveis em Plano Piloto/i })).toHaveAttribute(
      "href",
      "/imoveis?bairro=Plano%20Piloto",
    )
    expect(screen.getByRole("link", { name: /Ver imóveis em Lago Sul/i })).toHaveAttribute(
      "href",
      "/imoveis?bairro=Lago%20Sul",
    )
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run:

```bash
npm run test:run -- components/__tests__/neighborhood-map.test.tsx
```

Expected: FAIL because `components/neighborhood-map.tsx` does not exist.

- [ ] **Step 3: Create functional map component**

Create `components/neighborhood-map.tsx`:

```tsx
import Link from "next/link"
import { MapPin } from "lucide-react"
import { mockNeighborhoods } from "@/lib/mock-data"

type MapPoint = {
  slug: string
  x: number
  y: number
}

const points: MapPoint[] = [
  { slug: "plano-piloto", x: 49, y: 39 },
  { slug: "lago-sul", x: 60, y: 52 },
  { slug: "lago-norte", x: 57, y: 31 },
  { slug: "aguas-claras", x: 33, y: 62 },
  { slug: "sudoeste-octogonal", x: 43, y: 49 },
  { slug: "park-way", x: 47, y: 72 },
]

const neighborhoodsBySlug = new Map(mockNeighborhoods.map((neighborhood) => [neighborhood.slug, neighborhood]))

export function NeighborhoodMap() {
  const mappedNeighborhoods = points
    .map((point) => {
      const neighborhood = neighborhoodsBySlug.get(point.slug)
      return neighborhood ? { ...point, ...neighborhood } : null
    })
    .filter((neighborhood): neighborhood is MapPoint & NonNullable<ReturnType<typeof neighborhoodsBySlug.get>> =>
      Boolean(neighborhood),
    )

  return (
    <div className="mt-8 grid gap-5 lg:grid-cols-[1.35fr_0.65fr]" aria-labelledby="neighborhood-map-title">
      <div className="relative min-h-[360px] overflow-hidden rounded-lg border border-white/12 bg-[var(--navy-950)]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_42%,rgba(182,136,99,0.20),transparent_62%),linear-gradient(135deg,rgba(255,255,255,0.10),transparent_35%)]" />
        <div className="absolute left-[18%] top-[18%] h-[68%] w-[64%] rounded-[52%_48%_58%_42%] border border-white/16 bg-white/[0.04]" />
        <div className="absolute left-[35%] top-[24%] h-[58%] w-[22%] rotate-[-12deg] rounded-full border border-[var(--bronze-700)]/40" />

        <h3 id="neighborhood-map-title" className="sr-only">
          Mapa dos bairros mais procurados
        </h3>

        {mappedNeighborhoods.map((neighborhood) => (
          <Link
            key={neighborhood.slug}
            href={`/imoveis?bairro=${encodeURIComponent(neighborhood.name)}`}
            aria-label={`Ver imóveis em ${neighborhood.name}`}
            className="group absolute z-10 -translate-x-1/2 -translate-y-1/2 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--navy-950)]"
            style={{ left: `${neighborhood.x}%`, top: `${neighborhood.y}%` }}
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-[var(--navy-950)] shadow-[0_12px_30px_rgba(0,0,0,0.35)] transition-transform group-hover:scale-110">
              <MapPin className="h-5 w-5 fill-current" aria-hidden="true" />
            </span>
            <span className="pointer-events-none absolute left-1/2 top-12 hidden -translate-x-1/2 whitespace-nowrap rounded-full bg-white px-3 py-1 text-xs font-semibold text-[var(--navy-900)] shadow-lg md:block">
              {neighborhood.name}
            </span>
          </Link>
        ))}
      </div>

      <div className="rounded-lg border border-white/12 bg-white/[0.06] p-5">
        <h3 className="font-serif text-2xl font-bold text-white">
          Mapa dos bairros mais procurados
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-white/64">
          Toque nos pins para ver imóveis disponíveis por bairro.
        </p>
        <div className="mt-5 grid gap-2">
          {mappedNeighborhoods.map((neighborhood) => (
            <Link
              key={neighborhood.slug}
              href={`/imoveis?bairro=${encodeURIComponent(neighborhood.name)}`}
              className="flex items-center justify-between rounded-md border border-white/10 px-3 py-2 text-sm text-white transition-colors hover:border-secondary/60 hover:bg-white/8"
            >
              <span>{neighborhood.name}</span>
              <span className="text-[var(--bronze-300)]">{neighborhood.count} imóveis</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
```

- [ ] **Step 4: Render map in neighborhoods section**

Modify `components/neighborhoods-section.tsx`:

```tsx
import { NeighborhoodMap } from "@/components/neighborhood-map"
```

After the cards grid, add:

```tsx
<NeighborhoodMap />
```

- [ ] **Step 5: Run test to verify it passes**

Run:

```bash
npm run test:run -- components/__tests__/neighborhood-map.test.tsx
```

Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add components/neighborhood-map.tsx components/neighborhoods-section.tsx components/__tests__/neighborhood-map.test.tsx
git commit -m "feat: add clickable neighborhood map"
```

## Task 6: WCAG Contrast, Names, and Zoom

**Files:**
- Modify: `app/globals.css`
- Modify: `app/layout.tsx`
- Modify: `components/hero-section.tsx`
- Modify: `components/property-filters.tsx`
- Modify: `components/neighborhoods-section.tsx`
- Modify: `components/neighborhood-map.tsx`
- Modify: `components/testimonials-section.tsx`
- Modify: `e2e/a11y.spec.ts`

- [ ] **Step 1: Write the failing a11y expectation**

Modify `e2e/a11y.spec.ts` to remove exclusions:

```ts
import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

const pages = ['/', '/imoveis', '/sobre']

for (const path of pages) {
  test(`a11y scan: ${path}`, async ({ page }) => {
    await page.goto(path)
    await page.waitForLoadState('networkidle')

    const results = await new AxeBuilder({ page }).analyze()
    const seriousViolations = results.violations.filter((violation) =>
      ['serious', 'critical'].includes(violation.impact ?? ''),
    )

    expect(
      seriousViolations.map((violation) => ({
        id: violation.id,
        impact: violation.impact,
        nodes: violation.nodes.map((node) => node.target),
      })),
    ).toEqual([])
  })
}
```

- [ ] **Step 2: Run a11y test to verify it fails before fixes**

Run the dev server in one terminal:

```bash
npm run dev
```

Expected: Next prints the selected localhost port. If port 3000 is busy, use the printed fallback port.

Run in another terminal, replacing `3000` if needed:

```bash
PLAYWRIGHT_BASE_URL=http://localhost:3000 npm run test:e2e -- e2e/a11y.spec.ts
```

Expected: FAIL before fixes with `color-contrast`, `button-name`, or `meta-viewport`.

- [ ] **Step 3: Add accessible bronze variables**

In `app/globals.css`, add these tokens next to the existing brand color variables:

```css
--bronze-300: #d8b997;
--bronze-700: #8a5a36;
--bronze-800: #704625;
--navy-950: #0f1d28;
```

If the file already has `--navy-950`, keep the existing value and only add the bronze tokens.

- [ ] **Step 4: Remove mobile zoom lock**

Modify `app/layout.tsx` viewport:

```ts
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#1D2D3A',
}
```

- [ ] **Step 5: Replace low-contrast small bronze text**

Use these targeted replacements:

```bash
rg "text-secondary" components/hero-section.tsx components/neighborhoods-section.tsx components/testimonials-section.tsx components/neighborhood-map.tsx
```

Apply only replacements for small text/icons on light cream/white backgrounds:

```tsx
text-[var(--bronze-700)]
```

For bronze text on navy/dark backgrounds use:

```tsx
text-[var(--bronze-300)]
```

For text inside gold buttons/pins use:

```tsx
text-[var(--navy-950)]
```

Do not change decorative borders like `border-secondary/25` unless axe flags them.

- [ ] **Step 6: Add missing accessible names**

Ensure every `SelectTrigger` in touched components has `aria-label={label}` or a literal label:

```tsx
<SelectTrigger id={id} aria-label={label} className="h-12">
```

```tsx
<SelectTrigger
  aria-label={label}
  className="h-10 border-none bg-transparent p-0 font-serif text-lg text-[var(--navy-900)] shadow-none focus:ring-0 [&>svg]:text-[var(--bronze-700)]"
>
```

Ensure icon-only or visually ambiguous controls have literal names:

```tsx
aria-label={isAdvancedOpen ? "Fechar busca avançada" : "Abrir busca avançada"}
```

- [ ] **Step 7: Run unit tests touched by a11y changes**

Run:

```bash
npm run test:run -- components/__tests__/hero-section.test.tsx components/__tests__/property-filters.test.tsx components/__tests__/testimonials-section.test.tsx components/__tests__/neighborhood-map.test.tsx
```

Expected: PASS.

- [ ] **Step 8: Run a11y test to verify it passes**

With the dev server running:

```bash
PLAYWRIGHT_BASE_URL=http://localhost:3000 npm run test:e2e -- e2e/a11y.spec.ts
```

Expected: PASS with no serious/critical violations on `/`, `/imoveis`, and `/sobre`.

- [ ] **Step 9: Commit**

```bash
git add app/globals.css app/layout.tsx components/hero-section.tsx components/property-filters.tsx components/neighborhoods-section.tsx components/neighborhood-map.tsx components/testimonials-section.tsx e2e/a11y.spec.ts
git commit -m "fix: resolve wcag contrast and control names"
```

## Task 7: Home E2E Coverage

**Files:**
- Modify: `e2e/home.spec.ts`

- [ ] **Step 1: Update failing expectations**

Modify `e2e/home.spec.ts` in the hero test:

```ts
await expect(page.locator("label").getByText("Min. quartos", { exact: true })).toBeVisible()
await expect(page.locator("label").getByText("Min. vagas", { exact: true })).toBeVisible()
await expect(page.getByRole("button", { name: /Busca avançada/i })).toBeVisible()
```

Modify the neighborhoods test:

```ts
await expect(section.getByRole("heading", { name: "Mapa dos bairros mais procurados" })).toBeVisible()
await expect(section.getByRole("link", { name: /Ver imóveis em Plano Piloto/i })).toHaveAttribute(
  "href",
  "/imoveis?bairro=Plano%20Piloto",
)
```

Add a new test:

```ts
test("exibe depoimentos de clientes", async ({ page }) => {
  await expect(
    page.getByRole("heading", { name: "Clientes que encontraram seu lugar" }),
  ).toBeVisible()
  await expect(page.getByText("Mariana e Felipe Costa")).toBeVisible()
  await expect(page.getByText("Renata Albuquerque")).toBeVisible()
  await expect(page.getByText("Eduardo Vieira")).toBeVisible()
})
```

- [ ] **Step 2: Run home E2E**

With the dev server running:

```bash
PLAYWRIGHT_BASE_URL=http://localhost:3000 npm run test:e2e -- e2e/home.spec.ts
```

Expected: PASS.

- [ ] **Step 3: Commit**

```bash
git add e2e/home.spec.ts
git commit -m "test: cover resolved home ui issues"
```

## Task 8: Issue Docs and Final Verification

**Files:**
- Modify: `docs/plans/issues/ui-010-quartos-vagas-busca.md`
- Modify: `docs/plans/issues/ui-011-busca-avancada-link.md`
- Modify: `docs/plans/issues/ui-018-depoimentos.md`
- Modify: `docs/plans/issues/ui-022-contraste-wcag.md`
- Modify: `docs/plans/issues/ui-024-mapa-bairros.md`

- [ ] **Step 1: Run full targeted verification**

Run:

```bash
npm run test:run
npm run build
```

Expected:

- `npm run test:run`: PASS.
- `npm run build`: PASS. A non-fatal warning about unsupported `z-index` during static rendering may still appear if it already existed; do not treat that warning as failure unless the build exits non-zero.

Run E2E with the dev server:

```bash
npm run dev
PLAYWRIGHT_BASE_URL=http://localhost:3000 npm run test:e2e -- e2e/home.spec.ts e2e/a11y.spec.ts
```

Expected: PASS.

- [ ] **Step 2: Update issue status blocks**

For each issue file, add or update the status line:

```md
## Status

COMPLETED — implemented and verified on 2026-04-27.
```

For each acceptance checklist, mark relevant criteria as checked:

```md
- [x] ...
```

Add these verification notes:

`docs/plans/issues/ui-010-quartos-vagas-busca.md`:

```md
## Verification

- `Min. quartos` and `Min. vagas` are visible in the hero search and `/imoveis` primary filters.
- Filter state continues to use `bedrooms` and `parkingSpaces`, which already serialize to `quartos` and `vagas`.
```

`docs/plans/issues/ui-011-busca-avancada-link.md`:

```md
## Verification

- The advanced search trigger now uses `variant="link"` styling with `underline-offset-4`.
- The control keeps explicit `aria-label` text for open/close state.
```

`docs/plans/issues/ui-018-depoimentos.md`:

```md
## Verification

- Home renders `TestimonialsSection` with three testimonial cards.
- Each testimonial includes name, context, image, rating, and quoted text.
```

`docs/plans/issues/ui-022-contraste-wcag.md`:

```md
## Verification

- Removed mobile `maximumScale: 1`.
- Added accessible names to Radix select triggers.
- Replaced low-contrast bronze text with darker/light-context-safe tokens.
- `e2e/a11y.spec.ts` runs without excluding comboboxes or disabling `color-contrast`.
```

`docs/plans/issues/ui-024-mapa-bairros.md`:

```md
## Verification

- `NeighborhoodMap` renders a responsive visual Brasília map with clickable pins.
- Pins and list links navigate to `/imoveis?bairro=<bairro>`.
```

- [ ] **Step 3: Commit docs**

```bash
git add docs/plans/issues/ui-010-quartos-vagas-busca.md docs/plans/issues/ui-011-busca-avancada-link.md docs/plans/issues/ui-018-depoimentos.md docs/plans/issues/ui-022-contraste-wcag.md docs/plans/issues/ui-024-mapa-bairros.md
git commit -m "docs: mark remaining ui issues resolved"
```

## Self-Review

- Spec coverage:
  - UI-010 covered by Tasks 1, 2, 3, and 7.
  - UI-011 covered by Tasks 2, 3, and 7.
  - UI-018 covered by Task 4 and Task 7.
  - UI-022 covered by Task 6 and Task 8.
  - UI-024 covered by Task 5 and Task 7.
- Placeholder scan:
  - No `TBD`, `TODO`, `implement later`, or vague "add tests" steps remain.
- Type consistency:
  - `FilterState.bedrooms` and `FilterState.parkingSpaces` remain strings.
  - `BEDROOM_OPTIONS`, `PARKING_OPTIONS`, and `FilterOption` all use `{ value: string; label: string }`.
  - `NeighborhoodMap` links use the existing `/imoveis?bairro=...` query shape and `mockNeighborhoods` data.
- Worktree note:
  - This plan was written in the current project checkout because the user requested resolution directly in this workspace. Preserve unrelated dirty files and do not revert changes not made for these issues.
