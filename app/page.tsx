import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { FeaturedProperties } from "@/components/featured-properties"
import { NeighborhoodsSection } from "@/components/neighborhoods-section"
import { WhatsAppCTA } from "@/components/whatsapp-cta"
import { Footer } from "@/components/footer"
import { mockProperties } from "@/lib/mock-data"
import { getCities, getNeighborhoods } from "@/lib/properties/filter-options"

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
        <WhatsAppCTA />
      </main>
      <Footer />
    </div>
  )
}
