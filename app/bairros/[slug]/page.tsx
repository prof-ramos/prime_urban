import { notFound } from "next/navigation"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { PropertyCard } from "@/components/property-card"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import {
  getNeighborhoodBySlug,
  getPropertiesByNeighborhood,
  mockNeighborhoods,
} from "@/lib/mock-data"

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return mockNeighborhoods.map((n) => ({ slug: n.slug }))
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const neighborhood = getNeighborhoodBySlug(slug)
  if (!neighborhood) return {}
  const title = `Imóveis no ${neighborhood.name}`
  const description = `Encontre imóveis no ${neighborhood.name}, Brasília. ${neighborhood.description}.`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
      locale: 'pt_BR',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  }
}

export default async function BairroDetalhePage({ params }: Props) {
  const { slug } = await params
  const neighborhood = getNeighborhoodBySlug(slug)
  if (!neighborhood) return notFound()

  const properties = getPropertiesByNeighborhood(neighborhood.name)

  return (
    <>
      <Header />
      <main>
        <section className="bg-primary py-12 md:py-16">
          <div className="container mx-auto px-4">
            <Breadcrumb className="mb-4">
              <BreadcrumbList className="text-primary-foreground/80">
                <BreadcrumbItem>
                  <BreadcrumbLink asChild className="hover:text-primary-foreground">
                    <Link href="/">Início</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink asChild className="hover:text-primary-foreground">
                    <Link href="/bairros">Bairros</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage className="text-primary-foreground">
                    {neighborhood.name}
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-primary-foreground mb-2">
              {neighborhood.name}
            </h1>
            <p className="text-primary-foreground/70 text-lg">{neighborhood.description}</p>
          </div>
        </section>

        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <p className="text-muted-foreground mb-8">
              {properties.length === 0
                ? "Nenhum imóvel disponível neste bairro no momento."
                : `${properties.length} ${properties.length === 1 ? "imóvel encontrado" : "imóveis encontrados"}`}
            </p>

            {properties.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {properties.map((property) => (
                  <PropertyCard key={property.id} property={property} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <p className="text-muted-foreground mb-4">
                  Em breve novos imóveis neste bairro.
                </p>
                <Link
                  href="/imoveis"
                  className="text-secondary font-medium hover:underline"
                >
                  Ver todos os imóveis
                </Link>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
