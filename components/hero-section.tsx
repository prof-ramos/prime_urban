"use client"

import { useState } from "react"
import {
  Building2,
  ChevronDown,
  Home,
  MapPin,
  Search,
  SlidersHorizontal,
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
  DEFAULT_FILTERS,
  DEFAULT_MAX_PRICE,
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
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS)
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false)

  const updateFilter = <K extends keyof FilterState>(key: K, value: FilterState[K]) => {
    setFilters((currentFilters) => ({ ...currentFilters, [key]: value }))
  }

  const handleSearch = () => {
    const params = toPropertySearchParams(filters)
    const queryString = params.toString()
    window.location.href = queryString ? `/imoveis?${queryString}` : "/imoveis"
  }

  return (
    <section className="relative flex min-h-[85vh] items-center justify-center overflow-hidden bg-[var(--navy-900)]">
      {/* Gradient mesh de fundo */}
      <div
        className="absolute inset-0"
        style={{
          background: `
          radial-gradient(ellipse 80% 60% at 10% 20%, rgba(182,136,99,0.18) 0%, transparent 60%),
          radial-gradient(ellipse 60% 80% at 90% 80%, rgba(68,111,145,0.22) 0%, transparent 55%),
          radial-gradient(ellipse 100% 50% at 50% 110%, rgba(182,136,99,0.10) 0%, transparent 50%)
        `,
        }}
      />

      {/* Dot pattern sutil */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `radial-gradient(circle, rgba(182,136,99,0.06) 1px, transparent 1px)`,
          backgroundSize: "48px 48px",
        }}
      />

      {/* Vinheta nas bordas */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse 120% 100% at 50% 50%, transparent 40%, rgba(15,29,40,0.7) 100%)`,
        }}
      />

      <div className="container relative z-10 mx-auto px-4">
        <div className="mx-auto max-w-5xl text-center">
          {/* Badge */}
          <div
            className="animate-fade-in-up delay-0 mb-6 inline-flex items-center gap-2 rounded-full px-4 py-1.5"
            style={{
              background: "rgba(182,136,99,0.12)",
              border: "1px solid rgba(182,136,99,0.30)",
            }}
          >
            <MapPin className="h-3.5 w-3.5 text-secondary" />
            <span className="text-xs font-medium uppercase tracking-widest text-secondary">
              Especialistas em Braslia, DF
            </span>
          </div>

          {/* Headline */}
          <h1 className="animate-fade-in-up delay-200 mb-6 text-balance font-serif text-4xl font-bold leading-tight text-primary-foreground md:text-5xl lg:text-6xl">
            Encontre o imvel dos seus sonhos em{" "}
            <span className="text-secondary">Braslia</span>
          </h1>

          {/* Subheadline */}
          <p className="animate-fade-in-up delay-300 mx-auto mb-10 max-w-2xl text-pretty text-lg text-primary-foreground/70 md:text-xl">
            Curadoria exclusiva de apartamentos, casas e coberturas nos melhores bairros da capital federal.
          </p>

          {/* Search Box  Elevated "Search Lounge" Design */}
          <div className="animate-fade-in-up delay-400 mx-auto w-full max-w-5xl">
            {/* Transaction Type Tabs */}
            <div className="mb-[-1px] flex flex-wrap items-end justify-start gap-2 pl-4 md:pl-8">
              <Label className="mb-3 mr-2 text-[10px] uppercase tracking-[0.2em] text-white/40">
                Tipo de negcio
              </Label>
              {["venda", "aluguel"].map((type) => (
                <button
                  key={type}
                  onClick={() => updateFilter("transactionType", type as any)}
                  className={`relative px-8 py-3 text-sm font-semibold tracking-widest uppercase transition-all duration-300 rounded-t-xl border-t border-x ${
                    filters.transactionType === type
                      ? "bg-white/10 text-secondary border-secondary/40 backdrop-blur-md"
                      : "bg-transparent text-white/40 border-transparent hover:text-white/60"
                  }`}
                >
                  {type === "venda" ? "Comprar" : "Alugar"}
                  {filters.transactionType === type && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-secondary shadow-[0_0_12px_rgba(182,136,99,0.8)]" />
                  )}
                </button>
              ))}
            </div>

            <div
              className="relative overflow-hidden rounded-2xl md:rounded-3xl p-1 text-left"
              style={{
                background: "rgba(255,255,255,0.03)",
                backdropFilter: "blur(24px)",
                WebkitBackdropFilter: "blur(24px)",
                border: "1px solid rgba(182,136,99,0.20)",
                boxShadow: "0 20px 50px rgba(0,0,0,0.5)",
              }}
            >
              {/* Decorative top glow */}
              <div className="absolute top-0 left-1/4 right-1/4 h-[1px] bg-gradient-to-r from-transparent via-secondary/40 to-transparent" />

              <div className="flex flex-col lg:flex-row items-stretch p-2 gap-1 lg:gap-0">
                {/* Field: Property Type */}
                <div className="flex-1 px-6 py-4 transition-colors hover:bg-white/5 rounded-xl lg:rounded-none lg:border-r border-white/10 group">
	                  <Label className="block text-[10px] uppercase tracking-[0.2em] text-white/40 group-hover:text-secondary/70 transition-colors mb-2">
	                    Tipo de imvel
                  </Label>
                  <Select
                    value={filters.propertyType}
                    onValueChange={(value) => updateFilter("propertyType", value)}
                  >
                    <SelectTrigger className="h-auto p-0 border-none bg-transparent text-white focus:ring-0 [&>span]:text-lg md:[&>span]:text-xl font-serif">
                      <SelectValue placeholder="Todos os tipos" />
                      <ChevronDown className="ml-auto h-4 w-4 text-secondary/50" />
                    </SelectTrigger>
                    <SelectContent className="bg-[var(--navy-900)] border-secondary/20 text-white">
                      {PROPERTY_TYPES.map((type) => (
                        <SelectItem key={type.value} value={type.value} className="focus:bg-white/10 focus:text-secondary">
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Field: Neighborhood */}
                <div className="flex-1 px-6 py-4 transition-colors hover:bg-white/5 rounded-xl lg:rounded-none lg:border-r border-white/10 group">
	                  <Label className="block text-[10px] uppercase tracking-[0.2em] text-white/40 group-hover:text-secondary/70 transition-colors mb-2">
	                    Bairro
                  </Label>
                  <Select
                    value={filters.neighborhood}
                    onValueChange={(value) => updateFilter("neighborhood", value)}
                  >
                    <SelectTrigger className="h-auto p-0 border-none bg-transparent text-white focus:ring-0 [&>span]:text-lg md:[&>span]:text-xl font-serif">
                      <SelectValue placeholder="Todos os bairros" />
                      <ChevronDown className="ml-auto h-4 w-4 text-secondary/50" />
                    </SelectTrigger>
                    <SelectContent className="bg-[var(--navy-900)] border-secondary/20 text-white">
                      {neighborhoodOptions.map((n) => (
                        <SelectItem key={n.value} value={n.value} className="focus:bg-white/10 focus:text-secondary">
                          {n.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Field: Price Range */}
                <div className="flex-1 px-6 py-4 transition-colors hover:bg-white/5 rounded-xl lg:rounded-none group">
                  <Label className="block text-[10px] uppercase tracking-[0.2em] text-white/40 group-hover:text-secondary/70 transition-colors mb-2">
                    Faixa de Preo
                  </Label>
                  <div className="flex items-center gap-2 text-lg md:text-xl font-serif text-white/90">
                    <span className="text-secondary/60 text-sm">R$</span>
                    <Input
                      type="text"
                      placeholder="Qualquer valor"
                      value={filters.maxPrice < DEFAULT_MAX_PRICE ? filters.maxPrice.toLocaleString('pt-BR') : ""}
                      onChange={(e) => updateFilter("maxPrice", parseCurrencyInput(e.target.value, DEFAULT_MAX_PRICE))}
                      className="h-auto p-0 border-none bg-transparent text-white focus-visible:ring-0 placeholder:text-white/20 font-serif text-lg md:text-xl"
                    />
                  </div>
                </div>

                {/* Search Button */}
                <div className="p-2 lg:pl-4 flex items-center">
                  <Button
                    onClick={handleSearch}
                    className="w-full lg:w-auto h-16 lg:h-full px-10 bg-secondary text-secondary-foreground hover:bg-secondary/90 rounded-xl lg:rounded-2xl transition-all duration-500 shadow-[0_8px_20px_rgba(182,136,99,0.3)] hover:shadow-[0_12px_30px_rgba(182,136,99,0.5)] group overflow-hidden relative"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                    <Search className="mr-3 h-5 w-5" />
	                    <span className="text-base font-bold tracking-widest uppercase">Buscar Imveis</span>
                  </Button>
                </div>
              </div>

              {/* Advanced Search Toggle */}
              <div className="bg-white/[0.02] px-6 py-3 border-t border-white/5 flex justify-center">
                <button
                  onClick={() => setIsAdvancedOpen(!isAdvancedOpen)}
                  className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-white/40 hover:text-secondary transition-colors"
                >
                  <SlidersHorizontal className="h-3 w-3" />
	                  {isAdvancedOpen ? "Ocultar busca avanada" : "Busca avanada"}
                  <ChevronDown className={`h-3 w-3 transition-transform duration-300 ${isAdvancedOpen ? "rotate-180" : ""}`} />
                </button>
              </div>

              <Collapsible open={isAdvancedOpen}>
                <CollapsibleContent>
                  <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 bg-white/[0.04] border-t border-white/5">
                    <div className="space-y-2">
                      <Label className="text-[10px] uppercase tracking-[0.2em] text-white/30">Busca textual</Label>
                      <Input
                        type="text"
	                        placeholder="Palavra-chave"
                        value={filters.search}
                        onChange={(e) => updateFilter("search", e.target.value)}
                        className="h-11 border-white/10 bg-white/5 text-white placeholder:text-white/20 focus:border-secondary/50"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[10px] uppercase tracking-[0.2em] text-white/30">Mnimo de quartos</Label>
                      <Select value={filters.bedrooms} onValueChange={(value) => updateFilter("bedrooms", value)}>
                        <SelectTrigger className="h-11 border-white/10 bg-white/5 text-white">
                          <SelectValue placeholder="Indiferente" />
                        </SelectTrigger>
                        <SelectContent className="bg-[var(--navy-900)] border-secondary/20 text-white">
                          <SelectItem value="1">1+ Quarto</SelectItem>
                          <SelectItem value="2">2+ Quartos</SelectItem>
                          <SelectItem value="3">3+ Quartos</SelectItem>
                          <SelectItem value="4">4+ Quartos</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[10px] uppercase tracking-[0.2em] text-white/30">Cdigo</Label>
                      <Input
                        type="text"
                        placeholder="Ex: PR001"
                        value={filters.code}
                        onChange={(e) => updateFilter("code", e.target.value)}
                        className="h-11 border-white/10 bg-white/5 text-white placeholder:text-white/20 focus:border-secondary/50"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[10px] uppercase tracking-[0.2em] text-white/30">Valor Mnimo</Label>
                      <Input
                        inputMode="numeric"
                        placeholder="R$ 0"
                        value={filters.minPrice > 0 ? filters.minPrice.toLocaleString('pt-BR') : ""}
                        onChange={(e) => updateFilter("minPrice", parseCurrencyInput(e.target.value, 0))}
                        className="h-11 border-white/10 bg-white/5 text-white placeholder:text-white/20 focus:border-secondary/50"
                      />
                    </div>
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </div>
          </div>

          {/* Stats */}
          <div
            className="animate-fade-in-up delay-500 mt-12 inline-flex flex-wrap justify-center gap-0 overflow-hidden rounded-2xl"
            style={{ border: "1px solid rgba(182,136,99,0.18)" }}
          >
            {[
              { value: "500+", label: "Imveis disponveis" },
              { value: "15", label: "Bairros atendidos" },
              { value: "98%", label: "Clientes satisfeitos" },
            ].map((stat, i) => (
              <div
                key={stat.label}
                className="flex flex-col items-center px-8 py-4"
                style={{
                  borderLeft: i > 0 ? "1px solid rgba(182,136,99,0.18)" : undefined,
                  background: "rgba(255,255,255,0.03)",
                }}
              >
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
