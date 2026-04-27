import Image from "next/image"
import Link from "next/link"
import { Bed, Car, Maximize2, MapPin, Heart } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import type { Property } from "@/lib/properties/types"

interface PropertyCardProps {
  property: Property
}

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value)
}

const typeLabels: Record<string, string> = {
  apartamento: "Apartamento",
  casa: "Casa",
  cobertura: "Cobertura",
  sala_comercial: "Sala Comercial",
}

export function PropertyCard({ property }: PropertyCardProps) {
  const monthlyCost = (property.condoFee || 0) + (property.iptu || 0)

  return (
    <Card className="group overflow-hidden border-border/50 hover:border-secondary/60 transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5">
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={property.images[0] || "/placeholder-property.jpg"}
          alt={property.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {/* Gradiente inferior para legibilidade dos badges */}
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/40 to-transparent" />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-2 z-20">
          <Badge 
            className={`${
              property.transactionType === "venda"
                ? "bg-[var(--badge-venda)] text-white"
                : "bg-[var(--badge-aluguel)] text-white"
            }`}
          >
            {property.transactionType === "venda" ? "Venda" : "Aluguel"}
          </Badge>
          {property.featured && (
            <Badge className="bg-bronze-800 text-white">
              Destaque
            </Badge>
          )}
        </div>

        {/* Favorite Button */}
        <button 
          className="absolute top-3 right-3 p-2 rounded-full bg-black/40 hover:bg-black/60 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center z-20"
          aria-label="Adicionar aos favoritos"
        >
          <Heart className="h-5 w-5 text-white/80 hover:text-white" />
        </button>

        {/* Type Label */}
        <div className="absolute bottom-3 left-3">
          <span className="px-3 py-1 bg-card/90 text-sm font-medium text-foreground rounded-full">
            {typeLabels[property.type]}
          </span>
        </div>

        {/* Hover overlay  preço + CTA */}
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-primary/85 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
          <p className="font-serif text-2xl font-bold text-secondary">
            {formatCurrency(property.price)}
            {property.transactionType === "aluguel" && (
              <span className="text-sm font-normal text-white/70 ml-1">/mês</span>
            )}
          </p>
          <Link 
            href={`/imoveis/${property.slug}`}
            className="px-5 py-2 bg-secondary text-[var(--navy-950)] text-sm font-semibold rounded-full tracking-wide hover:bg-secondary/90 transition-colors"
          >
            Ver detalhes
          </Link>
          {property.transactionType === "venda" && (
            <span className="px-4 py-1.5 border border-white/30 text-white/80 text-xs font-medium rounded-full">
              Agendar visita
            </span>
          )}
        </div>
      </div>

      <CardContent className="p-4">
        {/* Location */}
        <div className="flex items-center gap-1 text-navy-700 text-sm mb-2">
          <MapPin className="h-4 w-4 flex-shrink-0" />
          <span className="truncate">{property.neighborhood} - Brasília</span>
        </div>

        {/* Title */}
        <Link href={`/imoveis/${property.slug}`}>
          <h3
            data-testid="property-card-title"
            className="font-semibold text-navy-950 line-clamp-2 hover:text-secondary transition-colors min-h-[3rem]"
          >
            {property.title}
          </h3>
        </Link>

        {/* Price Section */}
        <div className="mt-3 pb-3 border-b border-border/50">
          <p className="text-2xl font-bold text-bronze-800 leading-none">
            {formatCurrency(property.price)}
            {property.transactionType === "aluguel" && (
              <span className="text-sm font-normal text-navy-700 ml-1">/mês</span>
            )}
          </p>
          {monthlyCost > 0 && (
            <p className="text-sm font-medium text-navy-700 mt-2 flex items-center gap-1">
              <span className="text-xs font-normal text-navy-700">+{formatCurrency(monthlyCost)}/mês</span>
              <span className="text-[10px] text-navy-700">(cond. + IPTU)</span>
            </p>
          )}
        </div>

        {/* Features */}
        <div className="flex items-center gap-4 mt-3 text-sm text-navy-700">
          <div className="flex items-center gap-1.5">
            <Maximize2 className="h-3.5 w-3.5 text-secondary shrink-0" />
            <span>{property.privateArea} m²</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Bed className="h-3.5 w-3.5 text-secondary shrink-0" />
            <span>{property.bedrooms} {property.bedrooms === 1 ? 'quarto' : 'quartos'}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Car className="h-3.5 w-3.5 text-secondary shrink-0" />
            <span>{property.parkingSpaces} {property.parkingSpaces === 1 ? 'vaga' : 'vagas'}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
