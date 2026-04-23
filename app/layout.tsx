import React from "react"
import type { Metadata, Viewport } from 'next'

import { Analytics } from '@vercel/analytics/next'
import { WhatsAppFloat } from '@/components/whatsapp-float'
import './globals.css'

import { Inter, Playfair_Display, Geist_Mono as V0_Font_Geist_Mono, Libre_Baskerville as V0_Font_Libre_Baskerville } from 'next/font/google'

// Initialize fonts
const _geistMono = V0_Font_Geist_Mono({ subsets: ['latin'], weight: ["100","200","300","400","500","600","700","800","900"] })
const _libreBaskerville = V0_Font_Libre_Baskerville({ subsets: ['latin'], weight: ["400","700"] })

const inter = Inter({ subsets: ["latin"], variable: '--font-inter' });
const playfair = Playfair_Display({ subsets: ["latin"], variable: '--font-playfair' });

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://primeurban.com.br'
const SITE_NAME = 'PrimeUrban'
const DEFAULT_DESCRIPTION =
  'Curadoria exclusiva de imóveis de alto padrão em Brasília. Apartamentos, casas e coberturas nas melhores regiões do Distrito Federal.'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'PrimeUrban — Imóveis de Alto Padrão em Brasília',
    template: `%s | ${SITE_NAME}`,
  },
  description: DEFAULT_DESCRIPTION,
  keywords: [
    'imóveis Brasília',
    'alto padrão DF',
    'apartamentos Brasília',
    'casas Brasília',
    'imobiliária Brasília',
    'Plano Piloto',
    'Lago Sul',
    'Águas Claras',
  ],
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: SITE_URL,
    siteName: SITE_NAME,
    title: 'PrimeUrban — Imóveis de Alto Padrão em Brasília',
    description: DEFAULT_DESCRIPTION,
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'PrimeUrban — Imóveis de Alto Padrão em Brasília',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PrimeUrban — Imóveis de Alto Padrão em Brasília',
    description: DEFAULT_DESCRIPTION,
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/icon-light-32x32.png', media: '(prefers-color-scheme: light)' },
      { url: '/icon-dark-32x32.png', media: '(prefers-color-scheme: dark)' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-icon.png',
  },
  manifest: '/manifest.json',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: '#1D2D3A',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" className="bg-background">
      <body className={`${inter.variable} ${playfair.variable} font-serif antialiased`}>
        {children}
        <WhatsAppFloat />
        <Analytics />
      </body>
    </html>
  )
}
