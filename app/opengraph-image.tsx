import { ImageResponse } from 'next/og'
import { loadOgFont } from '@/lib/og-font'
import { getSiteUrl } from '@/lib/site-url'

export const alt = 'PrimeUrban — Imóveis de Alto Padrão em Brasília'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
  const fontData = await loadOgFont()
  const domain = new URL(getSiteUrl()).hostname
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#1D2D3A',
          fontFamily: 'Libre Baskerville, serif',
        }}
      >
        {/* Background pattern */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            background:
              'radial-gradient(ellipse at 20% 50%, rgba(182,136,99,0.15) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(182,136,99,0.1) 0%, transparent 50%)',
          }}
        />

        {/* Border frame */}
        <div
          style={{
            position: 'absolute',
            top: 32,
            right: 32,
            bottom: 32,
            left: 32,
            border: '1px solid rgba(182,136,99,0.3)',
            borderRadius: 8,
          }}
        />

        {/* Content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 20,
            padding: '0 80px',
            textAlign: 'center',
            zIndex: 1,
          }}
        >
          {/* Logo mark */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              marginBottom: 8,
            }}
          >
            <div
              style={{
                width: 48,
                height: 48,
                background: '#B68863',
                borderRadius: 4,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <div
                style={{
                  width: 24,
                  height: 24,
                  border: '2px solid #1D2D3A',
                  borderRadius: 2,
                  transform: 'rotate(45deg)',
                }}
              />
            </div>
            <span
              style={{
                fontSize: 36,
                fontWeight: 400,
                color: '#F9F6F0',
                letterSpacing: '-0.5px',
              }}
            >
              PrimeUrban
            </span>
          </div>

          {/* Divider */}
          <div
            style={{
              width: 60,
              height: 2,
              background: '#B68863',
              borderRadius: 1,
            }}
          />

          {/* Tagline */}
          <p
            style={{
              fontSize: 24,
              color: 'rgba(249,246,240,0.75)',
              margin: 0,
              letterSpacing: '0.5px',
            }}
          >
            Imóveis de Alto Padrão em Brasília
          </p>

          {/* Sub-tagline */}
          <p
            style={{
              fontSize: 16,
              color: 'rgba(249,246,240,0.45)',
              margin: 0,
              maxWidth: 600,
            }}
          >
            Curadoria exclusiva nas melhores regiões do Distrito Federal
          </p>
        </div>

        {/* Bottom label */}
        <div
          style={{
            position: 'absolute',
            bottom: 48,
            display: 'flex',
            alignItems: 'center',
            gap: 8,
          }}
        >
          <span style={{ fontSize: 13, color: 'rgba(249,246,240,0.35)' }}>
            {domain}
          </span>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: 'Libre Baskerville',
          data: fontData,
          style: 'normal',
          weight: 400,
        },
      ],
    },
  )
}
