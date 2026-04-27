import type { Metadata } from "next"
import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { FeaturedProperties } from "@/components/featured-properties"
import { NeighborhoodsSection } from "@/components/neighborhoods-section"
import { WhatsAppCTA } from "@/components/whatsapp-cta"
import { Footer } from "@/components/footer"
import { mockProperties } from "@/lib/mock-data"
import { getCities, getNeighborhoods } from "@/lib/properties/filter-options"

export const metadata: Metadata = {
  title: "PrimeUrban | Imóveis em Brasília",
  description: "Curadoria de imóveis para compra e aluguel em Brasília, DF.",
  openGraph: {
    title: "PrimeUrban | Imóveis em Brasília",
    description: "Curadoria de imóveis para compra e aluguel em Brasília, DF.",
    url: "/",
  },
}

export default function HomePage() {
  const cityOptions = getCities(mockProperties)
  const neighborhoodOptions = getNeighborhoods(mockProperties)

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
