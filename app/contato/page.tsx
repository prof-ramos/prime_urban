import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ContactPageForm } from "@/components/contact-page-form"

export const metadata = {
  title: "Contato | PrimeUrban",
  description: "Entre em contato com a PrimeUrban. Estamos prontos para ajudá-lo a encontrar o imóvel ideal.",
}

export default function ContatoPage() {
  return (
    <>
      <Header />
      <main>
        <section className="bg-primary py-16 md:py-24">
          <div className="container mx-auto px-4 text-center max-w-2xl">
            <span className="text-sm font-medium text-secondary uppercase tracking-wider">
              Fale conosco
            </span>
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-primary-foreground mt-2 mb-4 text-balance">
              Entre em contato
            </h1>
            <p className="text-primary-foreground/80 text-lg text-pretty">
              Nossa equipe está pronta para ajudá-lo a encontrar o imóvel ideal ou responder qualquer dúvida.
            </p>
          </div>
        </section>

        <section className="py-16 md:py-24 bg-background">
          <div className="container mx-auto px-4 max-w-lg">
            <ContactPageForm />
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
