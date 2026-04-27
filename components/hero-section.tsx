"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
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
import { Button } from "@/components/ui/button"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  BEDROOM_OPTIONS,
  DEFAULT_FILTERS,
  DEFAULT_MAX_PRICE,
  PARKING_OPTIONS,
  PROPERTY_TYPES,
  type FilterOption,
} from "@/lib/properties/filter-options"
import { toPropertySearchParams } from "@/lib/properties/search-params"
import type { FilterState } from "@/lib/properties/types"

interface HeroSectionProps {
  cityOptions: FilterOption[]
  neighborhoodOptions: FilterOption[]
}

const parseCurrencyInput = (value: string, fallback: number) => {
  const digits = value.replace(/\D/g, "")
  if (!digits) return fallback
  const parsed = Number(digits)
  return Number.isFinite(parsed) ? parsed : fallback
}

export function HeroSection({ cityOptions, neighborhoodOptions }: HeroSectionProps) {
  const router = useRouter()
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS)
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false)

  const updateFilter = <K extends keyof FilterState>(key: K, value: FilterState[K]) => {
    setFilters((currentFilters) => ({ ...currentFilters, [key]: value }))
  }

  const handleSearch = () => {
    const params = toPropertySearchParams(filters)
    const queryString = params.toString()
    router.push(queryString ? `/imoveis?${queryString}` : "/imoveis")
  }

  return (
    <section
      className="relative flex min-h-[400px] items-center justify-center overflow-hidden bg-navy-900 bg-cover bg-center md:min-h-[600px] lg:min-h-[86vh]"
      style={{ backgroundImage: "url('/images/hero-prime-urban.png')" }}
    >
      <div
        className="absolute inset-0"
        style={{
          background: `
            linear-gradient(180deg, rgba(12,25,36,0.72) 0%, rgba(12,25,36,0.56) 46%, rgba(12,25,36,0.82) 100%),
            radial-gradient(ellipse 95% 82% at 50% 42%, rgba(12,25,36,0.10) 0%, rgba(12,25,36,0.76) 100%),
            linear-gradient(90deg, rgba(12,25,36,0.80) 0%, rgba(12,25,36,0.24) 48%, rgba(12,25,36,0.80) 100%)
          `,
        }}
      />

      <div className="container relative z-10 mx-auto px-4 py-16">
        <div className="mx-auto max-w-5xl text-center">
          <div className="animate-fade-in-up delay-0 mb-6 inline-flex items-center gap-2 rounded-full border border-secondary/30 bg-secondary/10 px-4 py-1.5">
            <MapPin className="h-3.5 w-3.5 text-secondary" />
            <span className="text-xs font-medium uppercase tracking-[0.22em] text-secondary">
              Especialistas em Brasília, DF
            </span>
          </div>

          <h1 className="animate-fade-in-up delay-200 mx-auto mb-6 max-w-4xl text-balance font-serif text-4xl font-bold leading-tight text-primary-foreground md:text-5xl lg:text-6xl">
            Encontre o imóvel dos seus sonhos em{" "}
            <span className="italic text-secondary">Brasília</span>
          </h1>

          <p className="animate-fade-in-up delay-300 mx-auto mb-10 max-w-2xl text-pretty text-lg leading-relaxed text-primary-foreground/[68%] md:text-xl">
            Curadoria precisa, bairros desejados e atendimento humano para quem quer comprar ou alugar sem ruído.
          </p>

          <div className="animate-fade-in-up delay-400 mx-auto max-w-5xl">
            <div className="rounded-[2rem] border border-secondary/25 bg-[var(--background)] p-3 text-left shadow-[0_26px_80px_rgba(0,0,0,0.38)] md:p-4">
              <div className="mb-3 flex flex-col gap-2 px-2 text-navy-900 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-navy-950">
                    Busca personalizada
                  </p>
                  <p className="mt-1 font-serif text-xl font-bold">
                    Diga o perfil do imóvel, nós refinamos o caminho.
                  </p>
                </div>
                <p className="max-w-xs text-xs leading-relaxed text-navy-700">
                  Filtros essenciais na frente. Detalhes finos ficam a um toque.
                </p>
              </div>

              <div className="grid grid-cols-1 overflow-hidden rounded-[1.35rem] border border-navy-900/10 bg-white shadow-sm md:grid-cols-2 xl:grid-cols-[1fr_1fr_1fr_1fr_1fr_1fr_auto]">
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

                <div className="flex items-stretch border-t border-navy-900/10 bg-navy-900 p-2 md:col-span-2 xl:col-span-1 xl:border-l xl:border-t-0">
                  <Button
                    onClick={handleSearch}
                      className="h-16 w-full rounded-2xl bg-secondary px-8 text-base font-bold text-navy-950 shadow-[0_12px_24px_rgba(182,136,99,0.26)] hover:bg-secondary/90 xl:w-48"
                  >
                    <Search className="mr-2 h-4 w-4" />
                    Buscar Imóveis
                  </Button>
                </div>
              </div>

              <Collapsible open={isAdvancedOpen} onOpenChange={setIsAdvancedOpen}>
                <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <CollapsibleTrigger asChild>
                    <Button
                      type="button"
                      variant="link"
                      aria-expanded={isAdvancedOpen}
                      aria-label={isAdvancedOpen ? "Fechar busca avançada" : "Abrir busca avançada"}
                      className="h-auto min-h-[44px] min-w-[44px] justify-start px-2 py-1 text-sm font-semibold text-navy-950 underline-offset-4 hover:text-navy-900"
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
                  <p className="px-2 text-xs text-navy-700">
                    Código, palavra-chave e faixa de preço.
                  </p>
                </div>

                <CollapsibleContent>
                  <div className="mt-3 grid grid-cols-1 gap-3 rounded-[1.25rem] border border-secondary/20 bg-secondary/[0.07] p-3 md:grid-cols-2 xl:grid-cols-5">
                    <AdvancedInput
                      label="Palavra-chave"
                      placeholder="Endereço, bairro, código"
                      value={filters.search}
                      onChange={(value) => updateFilter("search", value)}
                      className="xl:col-span-2"
                    />
                    <AdvancedInput
                      label="Código do imóvel"
                      placeholder="PU-0002"
                      value={filters.code}
                      onChange={(value) => updateFilter("code", value)}
                    />
                    <AdvancedInput
                      label="Min. preço"
                      placeholder="R$ 0"
                      value={filters.minPrice > 0 ? filters.minPrice.toLocaleString("pt-BR") : ""}
                      onChange={(value) => updateFilter("minPrice", parseCurrencyInput(value, 0))}
                      inputMode="numeric"
                    />
                    <AdvancedInput
                      label="Max. preço"
                      placeholder="Sem limite"
                      value={
                        filters.maxPrice < DEFAULT_MAX_PRICE
                          ? filters.maxPrice.toLocaleString("pt-BR")
                          : ""
                      }
                      onChange={(value) =>
                        updateFilter("maxPrice", parseCurrencyInput(value, DEFAULT_MAX_PRICE))
                      }
                      inputMode="numeric"
                    />
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </div>
          </div>

          <div className="animate-fade-in-up delay-500 mt-12 inline-flex flex-wrap justify-center overflow-hidden rounded-2xl border border-secondary/20">
            {[
              { value: "500+", label: "Imóveis disponíveis", icon: Building2 },
              { value: "15", label: "Bairros atendidos", icon: MapIcon },
              { value: "98%", label: "Clientes satisfeitos", icon: ThumbsUp },
            ].map((stat, index) => (
              <div
                key={stat.label}
                className={`flex min-w-36 flex-col items-center bg-white/[0.035] px-7 py-4${index > 0 ? " border-l border-secondary/[18%]" : ""}`}
              >
                <stat.icon className="mb-1 h-5 w-5 text-secondary/70" />
                <p className="font-serif text-3xl font-bold text-secondary">{stat.value}</p>
                <p className="mt-0.5 whitespace-nowrap text-xs text-white/50">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function HeroSelectField({
  icon: Icon,
  label,
  value,
  placeholder,
  onValueChange,
  options,
}: {
  icon: typeof Home
  label: string
  value: string
  placeholder: string
  onValueChange: (value: string) => void
  options: FilterOption[]
}) {
  return (
    <div className="border-b border-navy-900/10 px-5 py-4 xl:border-b-0 xl:border-r">
      <Label className="mb-2 flex items-center gap-2 whitespace-nowrap text-[10px] font-semibold uppercase tracking-[0.2em] text-navy-950">
        <Icon className="h-3.5 w-3.5 shrink-0" />
        {label}
      </Label>
      <Select value={value} onValueChange={onValueChange}>
        <SelectTrigger
          aria-label={label}
          className="min-h-[44px] border-none bg-transparent p-0 font-serif text-lg text-navy-950 shadow-none focus:ring-0 data-[placeholder]:text-navy-950 [&>svg]:text-navy-950 [&_span]:text-navy-950"
        >
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

function AdvancedInput({
  label,
  placeholder,
  value,
  onChange,
  inputMode,
  className,
}: {
  label: string
  placeholder: string
  value: string
  onChange: (value: string) => void
  inputMode?: "numeric"
  className?: string
}) {
  const inputId = `hero-advanced-${label
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")}`

  return (
    <div className={className}>
      <Label
        htmlFor={inputId}
        className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.18em] text-navy-700/70"
      >
        {label}
      </Label>
      <Input
        id={inputId}
        aria-label={label}
        inputMode={inputMode}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="h-11 border-navy-900/10 bg-white text-navy-900 placeholder:text-navy-700/35"
      />
    </div>
  )
}
