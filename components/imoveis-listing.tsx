"use client"

import { Suspense, useMemo, useState } from "react"
import { useSearchParams } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { PropertyCard } from "@/components/property-card"
import { PropertyFilters } from "@/components/property-filters"
import { filterProperties } from "@/lib/filter-properties"
import {
  DEFAULT_FILTERS,
  getCities,
  getNeighborhoods,
} from "@/lib/properties/filter-options"
import { parseFiltersFromSearchParams } from "@/lib/properties/search-params"
import type { FilterState, SortOption } from "@/lib/properties/types"
import type { Property } from "@/lib/properties/types"
import { LayoutGrid, List } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface ImoveisListingProps {
  initialProperties: Property[]
}

export function ImoveisListing({ initialProperties }: ImoveisListingProps) {
  return (
    <Suspense fallback={null}>
      <ImoveisListingContent initialProperties={initialProperties} />
    </Suspense>
  )
}

function ImoveisListingContent({ initialProperties }: ImoveisListingProps) {
  const searchParams = useSearchParams()
  const initialFilters = useMemo(
    () => parseFiltersFromSearchParams(searchParams),
    [searchParams],
  )
  const [filters, setFilters] = useState<FilterState>(initialFilters)
  const [sortBy, setSortBy] = useState<SortOption>("recent")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const cityOptions = useMemo(() => getCities(initialProperties), [initialProperties])
  const neighborhoodOptions = useMemo(() => getNeighborhoods(initialProperties), [initialProperties])

  const filteredProperties = useMemo(
    () => filterProperties(initialProperties, filters, sortBy),
    [initialProperties, filters, sortBy],
  )

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 bg-background">
        {/* Page Header */}
        <div className="bg-[var(--navy-900)] py-12 md:py-16">
          <div className="container mx-auto px-4">
            <h1 className="font-serif text-3xl md:text-4xl font-bold text-white mb-2 text-balance">
              Imóveis em Brasília
            </h1>
            <p className="text-white/70">
              Encontre apartamentos, casas e coberturas nos melhores bairros da capital
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-6 md:py-8">
          {/* Filters */}
          <PropertyFilters
            filters={filters}
            onFilterChange={setFilters}
            onReset={() => setFilters(DEFAULT_FILTERS)}
            cityOptions={cityOptions}
            neighborhoodOptions={neighborhoodOptions}
          />

          {/* Results Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <p className="text-muted-foreground">
              <span className="font-semibold text-foreground">{filteredProperties.length}</span>{" "}
              {filteredProperties.length === 1 ? "imóvel encontrado" : "imóveis encontrados"}
            </p>

            <div className="flex items-center gap-3">
              {/* Sort */}
              <Select
                value={sortBy}
                onValueChange={(value) => setSortBy(value as SortOption)}
              >
                <SelectTrigger className="min-h-[44px] min-w-[44px] w-[180px]" aria-label="Ordenar por">
                  <SelectValue placeholder="Ordenar por" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="default">Ordem padrão</SelectItem>
                  <SelectItem value="az">A a Z</SelectItem>
                  <SelectItem value="za">Z a A</SelectItem>
                  <SelectItem value="price-asc">Menor preço</SelectItem>
                  <SelectItem value="price-desc">Maior preço</SelectItem>
                  <SelectItem value="oldest">Mais antigos</SelectItem>
                  <SelectItem value="recent">Mais recentes</SelectItem>
                </SelectContent>
              </Select>

              {/* View Mode */}
              <div className="hidden sm:flex border border-border/50 rounded-lg overflow-hidden">
                <Button
                  variant="ghost"
                  size="sm"
                  aria-label="Visualização em grade"
                  onClick={() => setViewMode("grid")}
                  className={`rounded-none ${
                    viewMode === "grid" ? "bg-[var(--navy-700)] text-white" : ""
                  }`}
                >
                  <LayoutGrid className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  aria-label="Visualização em lista"
                  onClick={() => setViewMode("list")}
                  className={`rounded-none ${
                    viewMode === "list" ? "bg-[var(--navy-700)] text-white" : ""
                  }`}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Results Grid */}
          {filteredProperties.length > 0 ? (
            <div
              className={
                viewMode === "grid"
                  ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                  : "flex flex-col gap-4"
              }
            >
              {filteredProperties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
                <LayoutGrid className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Nenhum imóvel encontrado</h3>
              <p className="text-muted-foreground mb-4">
                Tente ajustar os filtros para ver mais resultados.
              </p>
              <Button
                variant="outline"
                onClick={() => setFilters(DEFAULT_FILTERS)}
                className="border-[var(--navy-700)] text-[var(--navy-700)]"
              >
                Limpar filtros
              </Button>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
