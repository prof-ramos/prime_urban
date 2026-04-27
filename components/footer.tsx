import Link from "next/link"
import { MapPin, Phone, Mail, Instagram, Facebook, Linkedin } from "lucide-react"
import { siteConfig } from "@/lib/site-config"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex flex-col">
              <span className="font-serif text-2xl font-bold text-primary-foreground">
                {siteConfig.name}
              </span>
              <span className="text-xs text-secondary tracking-widest uppercase">
                {siteConfig.defaultCity}
              </span>
            </div>
            <p className="text-sm text-primary-foreground/70 leading-relaxed">
              {siteConfig.description}
            </p>
            <div className="flex gap-4">
              <a 
                href={siteConfig.social.instagram}
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-primary-foreground/10 hover:bg-secondary transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a 
                href={siteConfig.social.facebook}
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-primary-foreground/10 hover:bg-secondary transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a 
                href={siteConfig.social.linkedin}
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-primary-foreground/10 hover:bg-secondary transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-semibold text-secondary">Links Rápidos</h4>
            <nav className="flex flex-col gap-3">
              <Link href="/imoveis" className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                Todos os Imóveis
              </Link>
              <Link href="/imoveis?tipo=venda" className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                Imóveis à Venda
              </Link>
              <Link href="/imoveis?tipo=aluguel" className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                Imóveis para Alugar
              </Link>
              <Link href="/bairros" className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                Bairros de Brasília
              </Link>
            </nav>
          </div>

          {/* Neighborhoods */}
          <div className="space-y-4">
            <h4 className="font-semibold text-secondary">Bairros</h4>
            <nav className="flex flex-col gap-3">
              <Link href="/bairros/plano-piloto" className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                Plano Piloto
              </Link>
              <Link href="/bairros/lago-sul" className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                Lago Sul
              </Link>
              <Link href="/bairros/aguas-claras" className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                Águas Claras
              </Link>
              <Link href="/bairros/sudoeste-octogonal" className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                Sudoeste/Octogonal
              </Link>
              <Link href="/bairros/taguatinga" className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                Taguatinga
              </Link>
            </nav>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="font-semibold text-secondary">Contato</h4>
            <div className="flex flex-col gap-3">
              <a 
                href={siteConfig.contact.mapsUrl}
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-start gap-3 text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors"
              >
                <MapPin className="h-5 w-5 flex-shrink-0 mt-0.5" />
                <span>{siteConfig.contact.address}</span>
              </a>
              <a 
                href={siteConfig.contact.phone.href}
                className="flex items-center gap-3 text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors"
              >
                <Phone className="h-5 w-5 flex-shrink-0" />
                <span>{siteConfig.contact.phone.display}</span>
              </a>
              <a 
                href={`mailto:${siteConfig.contact.email}`}
                className="flex items-center gap-3 text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors"
              >
                <Mail className="h-5 w-5 flex-shrink-0" />
                <span>{siteConfig.contact.email}</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-primary-foreground/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-primary-foreground/50">
            <p>&copy; {currentYear} {siteConfig.legalName}. Todos os direitos reservados.</p>
            <p>CRECI-DF 00000-J</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
