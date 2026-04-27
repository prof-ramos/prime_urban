"use client"

import { useState } from "react"
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
import { Slider } from "@/components/ui/slider"
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
import type { FilterState } from "@/lib/properties/types"

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

        <AdvancedPropertyFilters filters={filters} onUpdate={updateFilter} />
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
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-4">
      <div className="space-y-2">
        <Label htmlFor="transaction-type">Tipo de negócio</Label>
        <Select
          value={filters.transactionType}
          onValueChange={(value) => onUpdate("transactionType", value)}
        >
          <SelectTrigger id="transaction-type" className="h-12">
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
          <SelectTrigger id="property-type" className="h-12">
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
          <SelectTrigger id="city" className="h-12">
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
          <SelectTrigger id="neighborhood" className="h-12">
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
            variant="outline"
            className="h-10 border-secondary text-secondary"
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
          <Badge variant="outline" className="h-8 border-secondary/40 text-secondary">
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
}: {
  filters: FilterState
  onUpdate: UpdateFilter
}) {
  return (
    <CollapsibleContent>
      <div className="mt-4 grid grid-cols-1 gap-4 rounded-lg bg-[var(--navy-900)]/5 p-4 md:grid-cols-2 xl:grid-cols-5">
        <div className="space-y-2">
          <Label htmlFor="bedrooms">Min. quartos</Label>
          <Select value={filters.bedrooms} onValueChange={(value) => onUpdate("bedrooms", value)}>
            <SelectTrigger id="bedrooms" className="h-12 bg-background">
              <SelectValue placeholder="Qualquer" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">1+ quarto</SelectItem>
              <SelectItem value="2">2+ quartos</SelectItem>
              <SelectItem value="3">3+ quartos</SelectItem>
              <SelectItem value="4">4+ quartos</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="xl:col-span-2 self-end">
          <Label>Faixa de preço</Label>
          <PriceSlider
            min={DEFAULT_FILTERS.minPrice}
            max={DEFAULT_MAX_PRICE}
            value={[filters.minPrice, filters.maxPrice]}
            onChange={([min, max]) => {
              onUpdate("minPrice", min)
              onUpdate("maxPrice", max)
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
  step = 100_000,
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
      <Slider
        defaultValue={[min, max]}
        value={value}
        min={min}
        max={max}
        step={step}
        onValueChange={(v) => onChange(v as [number, number])}
        className="w-full"
      />
    </div>
  )
}
