import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center py-24 bg-background">
        <div className="container mx-auto px-4 text-center max-w-lg">
          <p className="font-serif text-8xl font-bold text-secondary mb-4">404</p>
          <h1 className="font-serif text-3xl font-bold text-foreground mb-4">
            Página não encontrada
          </h1>
          <p className="text-muted-foreground mb-8 text-pretty">
            O endereço que você acessou não existe ou foi removido.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/"
              className="inline-flex items-center justify-center h-12 px-6 rounded-md bg-primary text-primary-foreground font-medium hover:bg-accent transition-colors"
            >
              Voltar ao início
            </Link>
            <Link
              href="/imoveis"
              className="inline-flex items-center justify-center h-12 px-6 rounded-md border border-border text-foreground font-medium hover:bg-muted transition-colors"
            >
              Ver imóveis
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
