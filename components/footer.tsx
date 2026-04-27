import Link from "next/link"
import { MapPin, Phone, Mail, Instagram, Facebook, Linkedin, Award } from "lucide-react"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {/* Brand + CRECI */}
          <div className="space-y-4">
            <div className="flex flex-col">
              <span className="font-serif text-2xl font-bold text-primary-foreground">
                PrimeUrban
              </span>
              <span className="text-xs text-white/90 tracking-widest uppercase">
                Brasília
              </span>
            </div>
            <p className="text-sm text-primary-foreground/70 leading-relaxed">
              Curadoria exclusiva de imóveis de alto padrão em Brasília. Encontre seu próximo lar com quem entende do mercado local.
            </p>            
            <div className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 border border-white/10">
              <Award className="h-4 w-4 text-white/70" />
              <span className="text-xs font-medium text-white/80">CRECI-DF 00000-J</span>
            </div>            
            <div className="flex gap-3 pt-2">
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-primary-foreground/10 hover:bg-white/20 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-primary-foreground/10 hover:bg-white/20 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-primary-foreground/10 hover:bg-white/20 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h2 className="font-serif font-semibold text-white text-base">Navegação</h2>
            <nav className="flex flex-col gap-2">
              <Link href="/imoveis" className="text-sm text-primary-foreground/70 hover:text-white transition-colors py-1">
                Todos os Imóveis
              </Link>
              <Link href="/imoveis?tipo=venda" className="text-sm text-primary-foreground/70 hover:text-white transition-colors py-1">
                Imóveis à Venda
              </Link>
              <Link href="/imoveis?tipo=aluguel" className="text-sm text-primary-foreground/70 hover:text-white transition-colors py-1">
                Imóveis para Alugar
              </Link>
              <Link href="/bairros" className="text-sm text-primary-foreground/70 hover:text-white transition-colors py-1">
                Bairros de Brasília
              </Link>
              <Link href="/sobre" className="text-sm text-primary-foreground/70 hover:text-white transition-colors py-1">
                Sobre Nós
              </Link>
              <Link href="/contato" className="text-sm text-primary-foreground/70 hover:text-white transition-colors py-1">
                Contato
              </Link>
            </nav>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h2 className="font-serif font-semibold text-white text-base">Contato</h2>
            <div className="flex flex-col gap-3">
              <a 
                href="https://maps.google.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-start gap-3 text-sm text-primary-foreground/70 hover:text-white transition-colors"
              >
                <MapPin className="h-5 w-5 flex-shrink-0 mt-0.5 text-white/50" />
                <span>SHIS QI 9, Bloco A, Sala 101<br />Lago Sul, Brasília - DF</span>
              </a>
              <a 
                href="tel:+5561999999999"
                className="flex items-center gap-3 text-sm text-primary-foreground/70 hover:text-white transition-colors"
              >
                <Phone className="h-5 w-5 flex-shrink-0 text-white/50" />
                <span>(61) 99999-9999</span>
              </a>
              <a 
                href="mailto:contato@primeurban.com.br"
                className="flex items-center gap-3 text-sm text-primary-foreground/70 hover:text-white transition-colors"
              >
                <Mail className="h-5 w-5 flex-shrink-0 text-white/50" />
                <span>contato@primeurban.com.br</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-primary-foreground/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-primary-foreground/70">
            <p>&copy; {currentYear} PrimeUrban Brasília. Todos os direitos reservados.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
