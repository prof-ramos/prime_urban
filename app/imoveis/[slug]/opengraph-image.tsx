import { ImageResponse } from 'next/og'
import { getPropertyBySlugFromPayload as getPropertyBySlug } from '@/lib/payload/properties'
import { loadOgFont } from '@/lib/og-font'
import { getSiteUrl } from '@/lib/site-url'
import { TYPE_LABELS } from '@/lib/property-labels'
import { formatCurrency } from '@/lib/format'

export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

function pluralize(count: number, singular: string, plural: string) {
  return `${count} ${count !== 1 ? plural : singular}`
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const property = await getPropertyBySlug(slug)
  const fontData = await loadOgFont()

  const imageOptions = {
    ...size,
    fonts: [
        {
          name: 'Libre Baskerville',
          data: fontData,
          style: 'normal' as const,
          weight: 400 as const,
        },
    ],
  }

  if (!property) {
    return new ImageResponse(
      (
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#1D2D3A',
            fontFamily: 'Libre Baskerville, serif',
            color: '#F9F6F0',
            fontSize: 32,
          }}
        >
          PrimeUrban
        </div>
      ),
      imageOptions,
    )
  }

  const isRent = property.transactionType === 'aluguel'
  const typeLabel = TYPE_LABELS[property.type] ?? property.type

  const domain = new URL(getSiteUrl()).hostname

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          background: '#1D2D3A',
          fontFamily: 'Libre Baskerville, serif',
        }}
      >
        {/* Background accent */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            background:
              'radial-gradient(ellipse at 80% 80%, rgba(182,136,99,0.12) 0%, transparent 60%)',
          }}
        />

        {/* Header bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '32px 48px',
            borderBottom: '1px solid rgba(182,136,99,0.2)',
          }}
        >
          <span
            style={{
              fontSize: 22,
              fontWeight: 700,
              color: '#F9F6F0',
              letterSpacing: '-0.3px',
            }}
          >
            PrimeUrban
          </span>
          <span
            style={{
              fontSize: 14,
              color: 'rgba(249,246,240,0.45)',
            }}
          >
            {property.neighborhood} · Brasília, DF
          </span>
        </div>

        {/* Main content */}
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: '40px 48px',
            gap: 24,
          }}
        >
          {/* Type badge */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
            }}
          >
            <span
              style={{
                fontSize: 13,
                fontWeight: 600,
                color: '#1D2D3A',
                background: '#B68863',
                padding: '4px 12px',
                borderRadius: 4,
                letterSpacing: '0.5px',
                textTransform: 'uppercase',
              }}
            >
              {typeLabel}
            </span>
            <span
              style={{
                fontSize: 13,
                color: isRent ? '#6DB6A0' : '#B68863',
                border: `1px solid ${isRent ? 'rgba(109,182,160,0.4)' : 'rgba(182,136,99,0.4)'}`,
                padding: '4px 12px',
                borderRadius: 4,
                letterSpacing: '0.5px',
              }}
            >
              {isRent ? 'Para Alugar' : 'À Venda'}
            </span>
          </div>

          {/* Title */}
          <h1
            style={{
              fontSize: 36,
              fontWeight: 700,
              color: '#F9F6F0',
              margin: 0,
              lineHeight: 1.25,
              maxWidth: 800,
            }}
          >
            {property.title}
          </h1>

          {/* Price */}
          <div
            style={{
              display: 'flex',
              alignItems: 'baseline',
              gap: 8,
            }}
          >
            <span
              style={{
                fontSize: 42,
                fontWeight: 700,
                color: '#B68863',
                letterSpacing: '-1px',
              }}
            >
              {formatCurrency(property.price)}
            </span>
            {isRent && (
              <span style={{ fontSize: 18, color: 'rgba(249,246,240,0.5)' }}>/mês</span>
            )}
          </div>

          {/* Specs row */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 24,
              color: 'rgba(249,246,240,0.6)',
              fontSize: 16,
            }}
          >
            <span>{pluralize(property.bedrooms, 'quarto', 'quartos')}</span>
            <span style={{ color: 'rgba(249,246,240,0.2)' }}>·</span>
            <span>{pluralize(property.bathrooms, 'banheiro', 'banheiros')}</span>
            <span style={{ color: 'rgba(249,246,240,0.2)' }}>·</span>
            <span>{pluralize(property.parkingSpaces, 'vaga', 'vagas')}</span>
            <span style={{ color: 'rgba(249,246,240,0.2)' }}>·</span>
            <span>{property.privateArea}m²</span>
          </div>
        </div>

        {/* Footer */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            padding: '20px 48px',
            borderTop: '1px solid rgba(182,136,99,0.2)',
          }}
        >
          <span style={{ fontSize: 13, color: 'rgba(249,246,240,0.35)' }}>
            {domain}/imoveis/{slug}
          </span>
        </div>
      </div>
    ),
    imageOptions,
  )
}
