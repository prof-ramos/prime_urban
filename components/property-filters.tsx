"use client"

import { useState } from "react"
import * as SliderPrimitive from "@radix-ui/react-slider"
import { ChevronDown, Search, SlidersHorizontal, X } from "lucide-react"
import { Badge } from "@/components/ui/badge"
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
  PRICE_STEP,
  PROPERTY_TYPES,
  type FilterOption,
} from "@/lib/properties/filter-options"
import type { FilterState } from "@/lib/properties/types"
export type { FilterState }

interface PropertyFiltersProps {
  filters: FilterState
  onFilterChange: (filters: FilterState) => void
  onReset: () => void
  cityOptions: FilterOption[]
  neighborhoodOptions: FilterOption[]
}

type UpdateFilter = <K extends keyof FilterState>(
  key: K,
  value: FilterState[K],
) => void

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value)
}

export function PropertyFilters({
  filters,
  onFilterChange,
  onReset,
  cityOptions,
  neighborhoodOptions,
}: PropertyFiltersProps) {
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false)

  const updateFilter: UpdateFilter = (key, value) => {
    onFilterChange({ ...filters, [key]: value })
  }

  const updateFilters = (updatedFilters: Partial<FilterState>) => {
    onFilterChange({ ...filters, ...updatedFilters })
  }

  const resetFilters = () => {
    setIsAdvancedOpen(false)
    onReset()
  }

  const hasActiveFilters =
    filters.search ||
    filters.transactionType ||
    filters.propertyType ||
    filters.city ||
    filters.neighborhood ||
    filters.code ||
    filters.bedrooms ||
    filters.parkingSpaces ||
    filters.minPrice > 0 ||
    filters.maxPrice < DEFAULT_MAX_PRICE

  const activeFilterCount = [
    filters.transactionType,
    filters.propertyType,
    filters.city,
    filters.neighborhood,
    filters.search,
    filters.code,
    filters.bedrooms,
    filters.parkingSpaces,
    filters.minPrice > 0,
    filters.maxPrice < DEFAULT_MAX_PRICE,
  ].filter(Boolean).length

  return (
    <div className="mb-6 rounded-xl border border-border/50 bg-card p-4 shadow-sm">
      <PrimaryPropertyFilters
        filters={filters}
        onUpdate={updateFilter}
        cityOptions={cityOptions}
        neighborhoodOptions={neighborhoodOptions}
      />

      <Collapsible open={isAdvancedOpen} onOpenChange={setIsAdvancedOpen}>
        <ActiveFilterSummary
          activeFilterCount={activeFilterCount}
          hasActiveFilters={Boolean(hasActiveFilters)}
          isAdvancedOpen={isAdvancedOpen}
          onReset={resetFilters}
        />

        <AdvancedPropertyFilters
          filters={filters}
          onUpdate={updateFilter}
          onUpdateMany={updateFilters}
        />
      </Collapsible>
    </div>
  )
}

function PrimaryPropertyFilters({
  filters,
  onUpdate,
  cityOptions,
  neighborhoodOptions,
}: {
  filters: FilterState
  onUpdate: UpdateFilter
  cityOptions: FilterOption[]
  neighborhoodOptions: FilterOption[]
}) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-6">
      <div className="space-y-2">
        <Label htmlFor="transaction-type">Tipo de negócio</Label>
        <Select
          value={filters.transactionType}
          onValueChange={(value) => onUpdate("transactionType", value)}
        >
          <SelectTrigger id="transaction-type" aria-label="Tipo de negócio" className="h-12">
            <SelectValue placeholder="Comprar ou alugar" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="venda">Comprar</SelectItem>
            <SelectItem value="aluguel">Alugar</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="property-type">Tipo de imóvel</Label>
        <Select
          value={filters.propertyType}
          onValueChange={(value) => onUpdate("propertyType", value)}
        >
          <SelectTrigger id="property-type" aria-label="Tipo de imóvel" className="h-12">
            <SelectValue placeholder="Todos os tipos" />
          </SelectTrigger>
          <SelectContent>
            {PROPERTY_TYPES.map((type) => (
              <SelectItem key={type.value} value={type.value}>
                {type.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="city">Cidade</Label>
        <Select value={filters.city} onValueChange={(value) => onUpdate("city", value)}>
          <SelectTrigger id="city" aria-label="Cidade" className="h-12">
            <SelectValue placeholder="Todas as cidades" />
          </SelectTrigger>
          <SelectContent>
            {cityOptions.map((city) => (
              <SelectItem key={city.value} value={city.value}>
                {city.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="neighborhood">Bairro</Label>
        <Select
          value={filters.neighborhood}
          onValueChange={(value) => onUpdate("neighborhood", value)}
        >
          <SelectTrigger id="neighborhood" aria-label="Bairro" className="h-12">
            <SelectValue placeholder="Todos os bairros" />
          </SelectTrigger>
          <SelectContent>
            {neighborhoodOptions.map((neighborhood) => (
              <SelectItem key={neighborhood.value} value={neighborhood.value}>
                {neighborhood.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="bedrooms">Min. quartos</Label>
        <Select value={filters.bedrooms} onValueChange={(value) => onUpdate("bedrooms", value)}>
          <SelectTrigger id="bedrooms" aria-label="Min. quartos" className="h-12">
            <SelectValue placeholder="Qualquer" />
          </SelectTrigger>
          <SelectContent>
            {BEDROOM_OPTIONS.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="parking-spaces">Min. vagas</Label>
        <Select
          value={filters.parkingSpaces}
          onValueChange={(value) => onUpdate("parkingSpaces", value)}
        >
          <SelectTrigger id="parking-spaces" aria-label="Min. vagas" className="h-12">
            <SelectValue placeholder="Qualquer" />
          </SelectTrigger>
          <SelectContent>
            {PARKING_OPTIONS.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}

function ActiveFilterSummary({
  activeFilterCount,
  hasActiveFilters,
  isAdvancedOpen,
  onReset,
}: {
  activeFilterCount: number
  hasActiveFilters: boolean
  isAdvancedOpen: boolean
  onReset: () => void
}) {
  return (
    <div className="mt-4 flex flex-col gap-3 border-t border-border/50 pt-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-wrap items-center gap-2">
        <CollapsibleTrigger asChild>
          <Button
            type="button"
            variant="link"
            aria-expanded={isAdvancedOpen}
            aria-label={isAdvancedOpen ? "Fechar busca avançada" : "Abrir busca avançada"}
            className="h-auto justify-start px-0 py-1 text-bronze-700 underline-offset-4 has-[>svg]:px-0"
          >
            <SlidersHorizontal className="mr-2 h-4 w-4" />
            Busca avançada
            <ChevronDown
              className={`ml-2 h-4 w-4 transition-transform ${
                isAdvancedOpen ? "rotate-180" : ""
              }`}
            />
          </Button>
        </CollapsibleTrigger>
        {activeFilterCount > 0 && (
          <Badge variant="outline" className="h-8 border-bronze-700/40 text-bronze-700">
            {activeFilterCount} filtros ativos
          </Badge>
        )}
      </div>

      {hasActiveFilters && (
        <Button
          type="button"
          variant="ghost"
          onClick={onReset}
          className="justify-start text-muted-foreground hover:text-destructive sm:justify-center"
        >
          <X className="mr-2 h-4 w-4" />
          Limpar filtros
        </Button>
      )}
    </div>
  )
}

function AdvancedPropertyFilters({
  filters,
  onUpdate,
  onUpdateMany,
}: {
  filters: FilterState
  onUpdate: UpdateFilter
  onUpdateMany: (updatedFilters: Partial<FilterState>) => void
}) {
  return (
    <CollapsibleContent>
      <div className="mt-4 grid grid-cols-1 gap-4 rounded-lg bg-navy-900/5 p-4 md:grid-cols-2 xl:grid-cols-4">
        <div className="xl:col-span-2 self-end">
          <Label id="price-range-label">Faixa de preço</Label>
          <PriceSlider
            min={DEFAULT_FILTERS.minPrice}
            max={DEFAULT_MAX_PRICE}
            value={[filters.minPrice, filters.maxPrice]}
            onChange={([min, max]) => {
              onUpdateMany({ minPrice: min, maxPrice: max })
            }}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="property-code">Código do imóvel</Label>
          <Input
            id="property-code"
            value={filters.code}
            onChange={(event) => onUpdate("code", event.target.value)}
            placeholder="PU-0002"
            className="h-12 bg-background uppercase"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="keyword">Palavra-chave</Label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="keyword"
              value={filters.search}
              onChange={(event) => onUpdate("search", event.target.value)}
              placeholder="Endereço, bairro, código"
              className="h-12 bg-background pl-9"
            />
          </div>
        </div>
      </div>
    </CollapsibleContent>
  )
}

function PriceSlider({
  min,
  max,
  step = PRICE_STEP,
  value,
  onChange,
}: {
  min: number
  max: number
  step?: number
  value: [number, number]
  onChange: (range: [number, number]) => void
}) {
  const displayMin = formatCurrency(value[0])
  const displayMax = formatCurrency(value[1])

  return (
    <div className="space-y-3">
      <div className="flex justify-between text-sm font-medium text-foreground">
        <span>{displayMin}</span>
        <span>{displayMax}</span>
      </div>
      <SliderPrimitive.Root
        data-slot="slider"
        defaultValue={[min, max]}
        value={value}
        min={min}
        max={max}
        step={step}
        onValueChange={(v) => onChange(v as [number, number])}
        aria-labelledby="price-range-label"
        className="relative flex w-full touch-none items-center select-none data-[disabled]:opacity-50"
      >
        <SliderPrimitive.Track
          data-slot="slider-track"
          className="relative h-1.5 w-full grow overflow-hidden rounded-full bg-muted"
        >
          <SliderPrimitive.Range data-slot="slider-range" className="absolute h-full bg-primary" />
        </SliderPrimitive.Track>
        <SliderPrimitive.Thumb
          data-slot="slider-thumb"
          aria-label="Preço mínimo"
          className="flex min-h-[44px] min-w-[44px] shrink-0 items-center justify-center transition-[color,box-shadow] hover:ring-4 focus-visible:ring-4 focus-visible:ring-ring/50 focus-visible:outline-hidden disabled:pointer-events-none disabled:opacity-50"
        >
          <span className="block size-4 rounded-full border border-primary bg-white shadow-sm" />
        </SliderPrimitive.Thumb>
        <SliderPrimitive.Thumb
          data-slot="slider-thumb"
          aria-label="Preço máximo"
          className="flex min-h-[44px] min-w-[44px] shrink-0 items-center justify-center transition-[color,box-shadow] hover:ring-4 focus-visible:ring-4 focus-visible:ring-ring/50 focus-visible:outline-hidden disabled:pointer-events-none disabled:opacity-50"
        >
          <span className="block size-4 rounded-full border border-primary bg-white shadow-sm" />
        </SliderPrimitive.Thumb>
      </SliderPrimitive.Root>
    </div>
  )
}
