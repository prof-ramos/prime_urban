import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export const metadata = {
  title: "Sobre a PrimeUrban | Imóveis em Brasília",
  description: "Conheça a PrimeUrban, especialista em imóveis de alto padrão em Brasília.",
}

const team = [
  { name: "Rodrigo Almeida", role: "Sócio-fundador", years: 15 },
  { name: "Camila Ferreira", role: "Diretora Comercial", years: 10 },
  { name: "Marcus Oliveira", role: "Especialista em Alto Padrão", years: 8 },
  { name: "Ana Paula Costa", role: "Consultora de Investimentos", years: 6 },
]

const differentials = [
  {
    title: "Especialização em Brasília",
    description:
      "Mais de 15 anos atuando exclusivamente no mercado imobiliário do Distrito Federal, com conhecimento profundo de cada bairro.",
  },
  {
    title: "Atendimento personalizado",
    description:
      "Cada cliente tem um consultor dedicado que acompanha todo o processo — da busca à assinatura do contrato.",
  },
  {
    title: "Portfólio selecionado",
    description:
      "Curadoria rigorosa dos imóveis: trabalhamos apenas com propriedades que atendem nossos padrões de qualidade e localização.",
  },
  {
    title: "Transparência total",
    description:
      "Documentação clara, histórico do imóvel completo e assessoria jurídica incluída em todas as transações.",
  },
]

export default function SobrePage() {
  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className="bg-primary py-16 md:py-24">
          <div className="container mx-auto px-4 text-center max-w-3xl">
            <span className="text-sm font-medium text-secondary uppercase tracking-wider">
              Quem somos
            </span>
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-primary-foreground mt-2 mb-6 text-balance">
              Sua referência em imóveis de alto padrão em Brasília
            </h1>
            <p className="text-primary-foreground/80 text-lg text-pretty">
              A PrimeUrban nasceu da missão de simplificar as transações imobiliárias de alto padrão no
              Distrito Federal, conectando pessoas a imóveis que realmente transformam vidas.
            </p>
          </div>
        </section>

        {/* Missão */}
        <section className="py-16 md:py-24 bg-background">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <span className="text-sm font-medium text-secondary uppercase tracking-wider">
                  Nossa missão
                </span>
                <h2 className="font-serif text-3xl font-bold text-foreground mt-2 mb-4">
                  Conectar pessoas ao lar ideal
                </h2>
                <p className="text-muted-foreground text-pretty leading-relaxed mb-4">
                  Acreditamos que encontrar o imóvel certo é um dos momentos mais importantes da vida.
                  Por isso, unimos tecnologia, dados de mercado e atendimento humano para tornar esse
                  processo mais simples, seguro e satisfatório.
                </p>
                <p className="text-muted-foreground text-pretty leading-relaxed">
                  Desde 2009, já realizamos mais de 2.400 transações, gerando mais de R$ 4,8 bilhões
                  em negócios para nossos clientes no Distrito Federal.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-primary/5 rounded-xl p-6 text-center">
                  <p className="font-serif text-4xl font-bold text-secondary">15+</p>
                  <p className="text-sm text-muted-foreground mt-1">anos de mercado</p>
                </div>
                <div className="bg-primary/5 rounded-xl p-6 text-center">
                  <p className="font-serif text-4xl font-bold text-secondary">2.4k</p>
                  <p className="text-sm text-muted-foreground mt-1">transações realizadas</p>
                </div>
                <div className="bg-primary/5 rounded-xl p-6 text-center">
                  <p className="font-serif text-4xl font-bold text-secondary">6</p>
                  <p className="text-sm text-muted-foreground mt-1">bairros atendidos</p>
                </div>
                <div className="bg-primary/5 rounded-xl p-6 text-center">
                  <p className="font-serif text-4xl font-bold text-secondary">98%</p>
                  <p className="text-sm text-muted-foreground mt-1">clientes satisfeitos</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Diferenciais */}
        <section className="py-16 md:py-24 bg-primary/5">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="text-center mb-12">
              <span className="text-sm font-medium text-secondary uppercase tracking-wider">
                Por que a PrimeUrban
              </span>
              <h2 className="font-serif text-3xl font-bold text-foreground mt-2">
                Nossos diferenciais
              </h2>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {differentials.map((item) => (
                <div key={item.title} className="bg-background rounded-xl p-6">
                  <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Equipe */}
        <section className="py-16 md:py-24 bg-background">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="text-center mb-12">
              <span className="text-sm font-medium text-secondary uppercase tracking-wider">
                Time
              </span>
              <h2 className="font-serif text-3xl font-bold text-foreground mt-2">
                Quem cuida dos seus interesses
              </h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {team.map((member) => (
                <div key={member.name} className="text-center">
                  <div className="w-20 h-20 rounded-full bg-primary/10 mx-auto mb-3 flex items-center justify-center">
                    <span className="font-serif text-2xl font-bold text-primary">
                      {member.name.charAt(0)}
                    </span>
                  </div>
                  <p className="font-semibold text-foreground text-sm">{member.name}</p>
                  <p className="text-muted-foreground text-xs mt-1">{member.role}</p>
                  <p className="text-secondary text-xs mt-1">{member.years} anos</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
