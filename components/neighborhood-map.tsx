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
  { slug: "lago-sul", x: 61, y: 52 },
  { slug: "lago-norte", x: 57, y: 31 },
  { slug: "aguas-claras", x: 34, y: 63 },
  { slug: "sudoeste-octogonal", x: 43, y: 49 },
  { slug: "park-way", x: 47, y: 73 },
]

const neighborhoodsBySlug = new Map(
  mockNeighborhoods.map((neighborhood) => [neighborhood.slug, neighborhood]),
)

function getNeighborhoodSearchHref(name: string) {
  return `/imoveis?bairro=${encodeURIComponent(name)}`
}

export function NeighborhoodMap() {
  const mappedNeighborhoods = points.flatMap((point) => {
    const neighborhood = neighborhoodsBySlug.get(point.slug)
    return neighborhood ? [{ ...point, ...neighborhood }] : []
  })

  if (mappedNeighborhoods.length === 0) {
    return (
      <div className="mt-8 rounded-lg border border-white/[12%] bg-white/[0.06] p-8 text-center text-white/70">
        Nenhum bairro disponível no momento.
      </div>
    )
  }

  return (
    <div
      className="mt-8 grid gap-5 lg:grid-cols-[1.35fr_0.65fr]"
      aria-labelledby="neighborhood-map-title"
    >
      <div className="relative min-h-[360px] overflow-hidden rounded-lg border border-white/[12%] bg-navy-950">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_42%,rgba(182,136,99,0.2),transparent_62%),linear-gradient(135deg,rgba(255,255,255,0.1),transparent_35%)]" />
        <div className="absolute left-[18%] top-[18%] h-[68%] w-[64%] rounded-[52%_48%_58%_42%] border border-white/[16%] bg-white/[0.04]" />
        <div className="absolute left-[35%] top-[24%] h-[58%] w-[22%] rotate-[-12deg] rounded-full border border-bronze-300/50" />

        {mappedNeighborhoods.map((neighborhood) => (
          <Link
            key={neighborhood.slug}
            href={getNeighborhoodSearchHref(neighborhood.name)}
            aria-label={`Ver imóveis em ${neighborhood.name}`}
            className="group absolute z-10 -translate-x-1/2 -translate-y-1/2 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-navy-950"
            style={{ left: `${neighborhood.x}%`, top: `${neighborhood.y}%` }}
          >
            <span className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full bg-secondary text-navy-950 shadow-[0_12px_30px_rgba(0,0,0,0.35)] transition-transform group-hover:scale-110">
              <MapPin className="h-5 w-5 fill-current" aria-hidden="true" />
            </span>
            <span className="pointer-events-none absolute left-1/2 top-12 hidden -translate-x-1/2 whitespace-nowrap rounded-full bg-white px-3 py-1 text-xs font-semibold text-navy-900 shadow-lg md:block">
              {neighborhood.name}
            </span>
          </Link>
        ))}
      </div>

      <div className="rounded-lg border border-white/[12%] bg-white/[0.06] p-5">
        <h3 id="neighborhood-map-title" className="font-serif text-2xl font-bold text-white">
          Mapa dos bairros mais procurados
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-white/70">
          Toque nos pins para ver imóveis disponíveis por bairro.
        </p>
        <div className="mt-5 grid gap-2">
          {mappedNeighborhoods.map((neighborhood) => (
            <Link
              key={neighborhood.slug}
              href={getNeighborhoodSearchHref(neighborhood.name)}
              className="flex min-h-[44px] min-w-[44px] items-center justify-between rounded-md border border-white/10 px-3 py-2 text-sm text-white transition-colors hover:border-secondary/60 hover:bg-white/[8%]"
            >
              <span>{neighborhood.name}</span>
              <span className="text-bronze-300">{neighborhood.count} imóveis</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
