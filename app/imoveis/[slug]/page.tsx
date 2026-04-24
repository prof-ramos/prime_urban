import { notFound } from "next/navigation"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { PropertyGallery } from "@/components/property-gallery"
import { PropertyInfo } from "@/components/property-info"
import { ContactForm } from "@/components/contact-form"
import { PropertyDetailActions } from "@/components/property-detail-actions"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { getPropertyBySlug, mockProperties } from "@/lib/mock-data"
import type { Metadata } from "next"

interface PropertyPageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PropertyPageProps): Promise<Metadata> {
  const { slug } = await params
  const property = getPropertyBySlug(slug)
  
  if (!property) {
    return {
      title: "Imóvel não encontrado",
    }
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 0,
    }).format(value)
  }

  const description = `${property.type === "apartamento" ? "Apartamento" : property.type} ${
    property.transactionType === "venda" ? "à venda" : "para alugar"
  } em ${property.neighborhood}, Brasília. ${property.bedrooms} quartos, ${property.privateArea}m². ${formatCurrency(property.price)}`

  const ogImages = property.images.map((url) => ({
    url,
    width: 1200,
    height: 800,
    alt: property.title,
  }))

  return {
    title: property.title,
    description,
    openGraph: {
      title: property.title,
      description,
      type: 'website',
      locale: 'pt_BR',
      images: ogImages,
    },
    twitter: {
      card: 'summary_large_image',
      title: property.title,
      description,
      ...(property.images.length > 0 && { images: [property.images[0]] }),
    },
  }
}

export async function generateStaticParams() {
  return mockProperties.map((property) => ({
    slug: property.slug,
  }))
}

export default async function PropertyPage({ params }: PropertyPageProps) {
  const { slug } = await params
  const property = getPropertyBySlug(slug)

  if (!property) {
    notFound()
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 bg-background">
        <div className="container mx-auto px-4 py-6 md:py-8">
          {/* Breadcrumb & Actions */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link href="/">Início</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link href="/imoveis">Imóveis</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage className="truncate max-w-[200px]">
                    {property.neighborhood}
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>

            <PropertyDetailActions
              propertyId={property.id}
              propertyTitle={property.title}
            />
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Gallery & Info */}
            <div className="lg:col-span-2 space-y-6">
              <PropertyGallery images={property.images} title={property.title} />
              <PropertyInfo property={property} />
              
              {/* Description */}
              <div className="bg-card rounded-xl border border-border/50 p-6">
                <h2 className="font-semibold text-lg mb-4">Descrição</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Excelente {property.type} localizado em {property.neighborhood}, uma das regiões mais valorizadas de Brasília. 
                  O imóvel conta com {property.bedrooms} quartos{property.suites ? `, sendo ${property.suites} suíte(s)` : ""}, 
                  {property.bathrooms} banheiro(s) e {property.parkingSpaces} vaga(s) de garagem. 
                  Com {property.privateArea}m² de área privativa{property.totalArea ? ` e ${property.totalArea}m² de área total` : ""}, 
                  oferece conforto e praticidade para sua família.
                  {property.solarOrientation && ` Orientação solar ${property.solarOrientation}.`}
                  {property.acceptsPets && " Aceita pets."}
                </p>
              </div>

              {/* Location Placeholder */}
              <div className="bg-card rounded-xl border border-border/50 p-6">
                <h2 className="font-semibold text-lg mb-4">Localização</h2>
                <p className="text-muted-foreground mb-4">{property.address} - {property.neighborhood}, Brasília - DF</p>
                <div className="aspect-video bg-muted rounded-lg flex items-center justify-center text-muted-foreground">
                  Mapa interativo - Integração com Google Maps
                </div>
              </div>
            </div>

            {/* Right Column - Contact Form */}
            <div className="lg:col-span-1">
              <ContactForm propertyTitle={property.title} propertyId={property.id} />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
