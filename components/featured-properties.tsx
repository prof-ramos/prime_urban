import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { PropertyCard } from "@/components/property-card"
import { Button } from "@/components/ui/button"
import { getFeaturedProperties } from "@/lib/mock-data"

export function FeaturedProperties() {
  const featuredProperties = getFeaturedProperties().slice(0, 3)

  return (
    <section className="py-16 md:py-24 bg-[var(--base-cream)]">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <span className="text-sm font-medium text-secondary uppercase tracking-wider">
              Seleção exclusiva
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mt-2 text-balance">
              Imóveis em Destaque
            </h2>
          </div>
          <Button 
            variant="outline" 
            asChild
            className="border-primary text-primary hover:bg-primary hover:text-primary-foreground self-start md:self-auto bg-transparent"
          >
            <Link href="/imoveis">
              Ver todos os imóveis
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProperties.map((property, i) => (
            <div
              key={property.id}
              className="animate-fade-in-up"
              style={{ animationDelay: `${i * 120}ms` }}
            >
              <PropertyCard property={property} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
