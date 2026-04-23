import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { mockNeighborhoods } from "@/lib/mock-data"

export const metadata = {
  title: "Bairros de Brasília | PrimeUrban",
  description: "Explore os melhores bairros de Brasília e encontre imóveis na região ideal para você.",
}

export default function BairrosPage() {
  return (
    <>
      <Header />
      <main>
        <section className="bg-primary py-16 md:py-24">
          <div className="container mx-auto px-4 text-center">
            <span className="text-sm font-medium text-secondary uppercase tracking-wider">
              Explore por região
            </span>
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-primary-foreground mt-2 mb-4 text-balance">
              Bairros de Brasília
            </h1>
            <p className="text-primary-foreground/70 max-w-2xl mx-auto text-pretty">
              Conheça os melhores bairros da capital federal e encontre o lugar perfeito para morar.
            </p>
          </div>
        </section>

        <section className="py-16 md:py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockNeighborhoods.map((neighborhood) => (
                <Link
                  key={neighborhood.slug}
                  href={`/bairros/${neighborhood.slug}`}
                  className="group relative overflow-hidden rounded-xl bg-primary p-8 text-primary-foreground transition-all duration-300 hover:bg-accent hover:shadow-lg hover:-translate-y-1"
                >
                  <div className="relative z-10">
                    <h2 className="font-semibold text-2xl mb-2">{neighborhood.name}</h2>
                    <p className="text-primary-foreground/60 mb-6">{neighborhood.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-secondary font-medium">
                        {neighborhood.count} imóveis
                      </span>
                      <ArrowRight className="h-5 w-5 text-secondary opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </div>
                  <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-secondary/10 rounded-full transition-transform group-hover:scale-150" />
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
