import type { Metadata } from "next"
import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { FeaturedProperties } from "@/components/featured-properties"
import { NeighborhoodsSection } from "@/components/neighborhoods-section"
import { WhatsAppCTA } from "@/components/whatsapp-cta"
import { Footer } from "@/components/footer"
import { getAllPublishedProperties } from "@/lib/payload/properties"
import { getActiveNeighborhoods } from "@/lib/payload/neighborhoods"
import { getCities, getNeighborhoods } from "@/lib/properties/filter-options"

export const revalidate = 60

export const metadata: Metadata = {
  title: "PrimeUrban | Imóveis em Brasília",
  description: "Curadoria de imóveis para compra e aluguel em Brasília, DF.",
  openGraph: {
    title: "PrimeUrban | Imóveis em Brasília",
    description: "Curadoria de imóveis para compra e aluguel em Brasília, DF.",
    url: "/",
  },
}

export default async function HomePage() {
  let properties: Awaited<ReturnType<typeof getAllPublishedProperties>> = []
  let neighborhoods: Awaited<ReturnType<typeof getActiveNeighborhoods>> = []
  try {
    ;[properties, neighborhoods] = await Promise.all([
      getAllPublishedProperties(),
      getActiveNeighborhoods(),
    ])
  } catch (err) {
    console.error('[HomePage] failed to fetch content:', err)
  }
  const cityOptions = getCities(properties)
  const neighborhoodOptions = getNeighborhoods(properties)
  const featuredProperties = properties.filter((property) => property.featured)

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <HeroSection cityOptions={cityOptions} neighborhoodOptions={neighborhoodOptions} />
        <FeaturedProperties properties={featuredProperties} />
        <NeighborhoodsSection neighborhoods={neighborhoods} />
        {/* TestimonialsSection será implementado em versão futura, quando houver clientes reais */}
        <WhatsAppCTA />
      </main>
      <Footer />
    </div>
  )
}
