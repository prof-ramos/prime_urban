"use client"

import { useState } from "react"
import { Search, MapPin, Home, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const neighborhoods = [
  "Asa Sul",
  "Asa Norte",
  "Águas Claras",
  "Sudoeste",
  "Noroeste",
  "Lago Sul",
  "Lago Norte",
  "Park Sul",
  "Guará",
]

export function HeroSection() {
  const [searchQuery, setSearchQuery] = useState("")
  const [transactionType, setTransactionType] = useState<string>("")
  const [neighborhood, setNeighborhood] = useState<string>("")

  const handleSearch = () => {
    const params = new URLSearchParams()
    if (searchQuery) params.set("q", searchQuery)
    if (transactionType) params.set("tipo", transactionType)
    if (neighborhood) params.set("bairro", neighborhood)
    window.location.href = `/imoveis?${params.toString()}`
  }

  return (
    <section className="relative min-h-[85vh] flex items-center justify-center bg-[var(--navy-900)] overflow-hidden">
      {/* Gradient mesh de fundo */}
      <div className="absolute inset-0" style={{
        background: `
          radial-gradient(ellipse 80% 60% at 10% 20%, rgba(182,136,99,0.18) 0%, transparent 60%),
          radial-gradient(ellipse 60% 80% at 90% 80%, rgba(68,111,145,0.22) 0%, transparent 55%),
          radial-gradient(ellipse 100% 50% at 50% 110%, rgba(182,136,99,0.10) 0%, transparent 50%)
        `
      }} />

      {/* Dot pattern sutil */}
      <div className="absolute inset-0" style={{
        backgroundImage: `radial-gradient(circle, rgba(182,136,99,0.06) 1px, transparent 1px)`,
        backgroundSize: '48px 48px'
      }} />

      {/* Vinheta nas bordas */}
      <div className="absolute inset-0" style={{
        background: `radial-gradient(ellipse 120% 100% at 50% 50%, transparent 40%, rgba(15,29,40,0.7) 100%)`
      }} />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6"
            style={{
              background: 'rgba(182,136,99,0.12)',
              border: '1px solid rgba(182,136,99,0.30)',
            }}
          >
            <MapPin className="h-3.5 w-3.5 text-secondary" />
            <span className="text-xs font-medium text-secondary tracking-widest uppercase">
              Especialistas em Brasília, DF
            </span>
          </div>

          {/* Headline */}
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground leading-tight mb-6 text-balance">
            Encontre o imóvel dos seus sonhos em{" "}
            <span className="text-secondary">Brasília</span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-primary-foreground/70 mb-10 max-w-2xl mx-auto text-pretty">
            Curadoria exclusiva de apartamentos, casas e coberturas nos melhores bairros da capital federal.
          </p>

          {/* Search Box — glassmorphism integrado ao fundo escuro */}
          <div
            className="rounded-2xl p-4 md:p-6 max-w-3xl mx-auto"
            style={{
              background: 'rgba(255,255,255,0.06)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: '1px solid rgba(182,136,99,0.20)',
              boxShadow: '0 8px 40px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.08)',
            }}
          >
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
              {/* Search Input */}
              <div className="md:col-span-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-white/40" />
                  <Input
                    type="text"
                    placeholder="Endereço, bairro ou código"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 h-12 text-base text-white placeholder:text-white/35 bg-white/8 border-white/15 focus:border-secondary focus:bg-white/10"
                  />
                </div>
              </div>

              {/* Transaction Type */}
              <Select value={transactionType} onValueChange={setTransactionType}>
                <SelectTrigger className="h-12 text-white border-white/15 bg-white/8 focus:border-secondary [&>span]:text-white/60 data-[placeholder]:text-white/35">
                  <Home className="h-4 w-4 mr-2 text-white/40 shrink-0" />
                  <SelectValue placeholder="Tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="venda">Comprar</SelectItem>
                  <SelectItem value="aluguel">Alugar</SelectItem>
                </SelectContent>
              </Select>

              {/* Neighborhood */}
              <Select value={neighborhood} onValueChange={setNeighborhood}>
                <SelectTrigger className="h-12 text-white border-white/15 bg-white/8 focus:border-secondary [&>span]:text-white/60 data-[placeholder]:text-white/35">
                  <MapPin className="h-4 w-4 mr-2 text-white/40 shrink-0" />
                  <SelectValue placeholder="Bairro" />
                </SelectTrigger>
                <SelectContent>
                  {neighborhoods.map((n) => (
                    <SelectItem key={n} value={n.toLowerCase().replace(/ /g, "-")}>
                      {n}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button
              onClick={handleSearch}
              className="w-full mt-3 h-12 bg-secondary hover:bg-secondary/90 text-secondary-foreground text-base font-semibold tracking-wide"
            >
              <Search className="mr-2 h-4 w-4" />
              Buscar Imóveis
            </Button>
          </div>

          {/* Stats */}
          <div
            className="inline-flex flex-wrap justify-center gap-0 mt-12 rounded-2xl overflow-hidden"
            style={{ border: '1px solid rgba(182,136,99,0.18)' }}
          >
            {[
              { value: '500+', label: 'Imóveis disponíveis' },
              { value: '15',   label: 'Bairros atendidos' },
              { value: '98%',  label: 'Clientes satisfeitos' },
            ].map((stat, i) => (
              <div
                key={stat.label}
                className="flex flex-col items-center px-8 py-4"
                style={{
                  borderLeft: i > 0 ? '1px solid rgba(182,136,99,0.18)' : undefined,
                  background: 'rgba(255,255,255,0.03)',
                }}
              >
                <p className="font-serif text-3xl font-bold text-secondary">{stat.value}</p>
                <p className="text-xs text-white/50 mt-0.5 whitespace-nowrap">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
