export const siteConfig = {
  name: "PrimeUrban",
  description:"Curadoria exclusiva de imóveis de alto padrão em Brasília.",
  siteUrl:"https://primeurban.com.br",
  defaultRegion:"Brasília, DF",
  defaultCity:"Brasília",
  contact:{
    phone:{display:"(61) 99999-9999",raw:"+5561999999999"},
    email:"contato@primeurban.com.br",
  },
  creci:"CRECI-DF 00000-J",
  whatsapp:{defaultMessage:"Olá! Gostaria de mais informações sobre os imóveis."},
} as const

export function getPropertyInterestMessage(propertyTitle:string):string{
  return `Olá! Tenho interesse no imóvel *${propertyTitle}*.`
}

export function buildWhatsAppUrl(message?:string):string{
  const msg = message ?? siteConfig.whatsapp.defaultMessage
  return `https://wa.me/${siteConfig.contact.phone.raw}?text=${encodeURIComponent(msg)}`
}
