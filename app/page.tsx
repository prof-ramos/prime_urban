import type { Metadata } from "next"
import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { FeaturedProperties } from "@/components/featured-properties"
import { NeighborhoodsSection } from "@/components/neighborhoods-section"
import { WhatsAppCTA } from "@/components/whatsapp-cta"
import { Footer } from "@/components/footer"
import { getAllPublishedProperties } from "@/lib/payload/properties"
import { getCities, getNeighborhoods } from "@/lib/properties/filter-options"
import { REVALIDATE_TIMES } from "@/lib/payload/revalidate"

export const revalidate = REVALIDATE_TIMES.PROPERTIES

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
  try {
    properties = await getAllPublishedProperties()
  } catch (err) {
    console.error('[HomePage] failed to fetch properties:', err)
  }
  const cityOptions = getCities(properties)
  const neighborhoodOptions = getNeighborhoods(properties)

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <HeroSection cityOptions={cityOptions} neighborhoodOptions={neighborhoodOptions} />
        <FeaturedProperties />
        <NeighborhoodsSection />
        {/* TestimonialsSection será implementado em versão futura, quando houver clientes reais */}
        <WhatsAppCTA />
      </main>
      <Footer />
    </div>
  )
}
