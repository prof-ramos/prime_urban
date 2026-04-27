"use client"

import { MessageCircle, Phone, Clock, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { buildWhatsAppUrl } from "@/lib/site-config"

export function WhatsAppCTA() {
  const whatsappUrl = buildWhatsAppUrl()

  return (
    <section className="relative py-16 md:py-24 overflow-hidden bg-[var(--navy-900)]">
      {/* Gradient mesh atmosférico */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: `
          radial-gradient(ellipse 70% 80% at 0% 50%, rgba(37,211,102,0.10) 0%, transparent 60%),
          radial-gradient(ellipse 60% 70% at 100% 30%, rgba(182,136,99,0.12) 0%, transparent 55%),
          radial-gradient(ellipse 80% 40% at 50% 100%, rgba(37,211,102,0.07) 0%, transparent 50%)
        `
      }} />

      {/* Dot pattern */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: `radial-gradient(circle, rgba(37,211,102,0.05) 1px, transparent 1px)`,
        backgroundSize: '48px 48px'
      }} />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Icon */}
          <div
            className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-6"
            style={{
              background: 'rgba(37,211,102,0.15)',
              border: '1px solid rgba(37,211,102,0.30)',
              boxShadow: '0 0 32px rgba(37,211,102,0.15)',
            }}
          >
            <MessageCircle className="h-8 w-8 text-[var(--whatsapp)]" />
          </div>

          <h2 className="font-serif text-3xl md:text-4xl font-bold text-white mb-4 text-balance">
            Fale com um especialista agora
          </h2>
          <p className="text-lg text-white/[82%] mb-8 max-w-2xl mx-auto text-pretty">
            Nossa equipe está pronta para ajudá-lo a encontrar o imóvel perfeito. Atendimento personalizado via WhatsApp.
          </p>

          <div className="flex flex-wrap justify-center gap-8 mb-10">
            {[
              { icon: CheckCircle, label: 'Resposta imediata' },
              { icon: Clock,        label: 'Seg-Sáb 8h-20h' },
              { icon: Phone,        label: 'Sem compromisso' },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-2 text-white/[82%]">
                <Icon className="h-5 w-5 text-[var(--whatsapp)]" />
                <span className="text-sm font-medium">{label}</span>
              </div>
            ))}
          </div>

          <Button
            asChild
            size="lg"
            className="bg-[var(--whatsapp)] hover:bg-[var(--whatsapp-hover)] text-[var(--navy-950)] text-base font-semibold px-8 py-6 h-auto min-h-[56px] shadow-lg hover:shadow-[0_0_32px_rgba(37,211,102,0.35)] transition-shadow duration-300"
          >
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="mr-2 h-5 w-5" />
              Chamar no WhatsApp
            </a>
          </Button>
        </div>
      </div>
    </section>
  )
}
