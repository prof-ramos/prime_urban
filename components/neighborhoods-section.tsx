import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import type { Neighborhood } from "@/lib/properties/types"

type NeighborhoodsSectionProps = {
  neighborhoods: Neighborhood[]
}

// Gradiente sutil único por índice — cada bairro tem identidade visual distinta
const cardGradients = [
  'radial-gradient(ellipse at 0% 0%, rgba(182,136,99,0.22) 0%, transparent 70%)',
  'radial-gradient(ellipse at 100% 0%, rgba(68,111,145,0.22) 0%, transparent 70%)',
  'radial-gradient(ellipse at 0% 100%, rgba(167,142,156,0.20) 0%, transparent 70%)',
  'radial-gradient(ellipse at 100% 100%, rgba(182,136,99,0.18) 0%, transparent 70%)',
  'radial-gradient(ellipse at 50% 0%, rgba(68,111,145,0.20) 0%, transparent 70%)',
  'radial-gradient(ellipse at 50% 100%, rgba(182,136,99,0.16) 0%, transparent 70%)',
]

export function NeighborhoodsSection({ neighborhoods }: NeighborhoodsSectionProps) {
  const featuredNeighborhoods = neighborhoods.filter((n) => n.featured)

  return (
    <section className="py-16 md:py-24 bg-[var(--navy-900)]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="text-xs font-medium text-white/80 uppercase tracking-[0.1em]">
            Explore por região
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-white mt-3 mb-4 text-balance">
            Bairros de Brasília
          </h2>
          <p className="text-white/50 max-w-xl mx-auto text-pretty text-sm">
            Conheça os melhores bairros da capital federal e encontre o lugar perfeito para você morar.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {featuredNeighborhoods.map((neighborhood, i) => (
            <Link
              key={neighborhood.slug}
              href={`/bairros/${neighborhood.slug}`}
              className="group relative overflow-hidden rounded-xl p-5 text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
              style={{
                background: cardGradients[i % cardGradients.length],
                backgroundColor: 'rgba(255,255,255,0.08)',
                border: '1px solid rgba(255,255,255,0.12)',
              }}
            >
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: 'rgba(182,136,99,0.12)' }}
              />

              <div className="relative z-10">
                <h3 className="font-semibold text-base mb-1 leading-tight text-white/95">{neighborhood.name}</h3>
                <p className="text-xs text-white/70 mb-4 leading-relaxed line-clamp-2">
                  {neighborhood.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-secondary font-medium">
                    {neighborhood.count} imóveis
                  </span>
                  <ArrowUpRight className="h-3.5 w-3.5 text-secondary opacity-0 group-hover:opacity-100 transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
