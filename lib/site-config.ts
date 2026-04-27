export const siteConfig = {
  name: "PrimeUrban",
  legalName: "PrimeUrban Brasília",
  defaultCity: "Brasília",
  defaultRegion: "Brasília, DF",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "https://primeurban.com.br",
  description:
    "Curadoria exclusiva de imóveis de alto padrão em Brasília. Apartamentos, casas e coberturas nas melhores regiões do Distrito Federal.",
  contact: {
    email: "contato@primeurban.com.br",
    phone: {
      display: "(61) 99999-9999",
      href: "tel:+5561999999999",
    },
    address: "SHIS QI 9, Bloco A, Sala 101\nLago Sul, Brasília - DF",
    mapsUrl: "https://maps.google.com",
  },
  whatsapp: {
    number: "5561999999999",
    defaultMessage: "Olá! Gostaria de mais informações sobre imóveis em Brasília.",
  },
  social: {
    instagram: "https://instagram.com",
    facebook: "https://facebook.com",
    linkedin: "https://linkedin.com",
  },
} as const

export function buildWhatsAppUrl(message: string = siteConfig.whatsapp.defaultMessage) {
  return `https://wa.me/${siteConfig.whatsapp.number}?text=${encodeURIComponent(message)}`
}

export function getPropertyInterestMessage(propertyTitle: string) {
  return `Olá! Tenho interesse no imóvel: ${propertyTitle}. Gostaria de mais informações.`
}
