import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { buildConfig } from 'payload'
import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { pt } from '@payloadcms/translations/languages/pt'
import { mcpPlugin } from '@payloadcms/plugin-mcp'

import { Media } from './collections/Media'
import { Neighborhoods } from './collections/Neighborhoods'
import { Properties } from './collections/Properties'
import { Users } from './collections/Users'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

function getPayloadSecret() {
  if (!process.env.PAYLOAD_SECRET) {
    throw new Error('PAYLOAD_SECRET is required. Generate one with: node -e "console.log(require(\'crypto\').randomBytes(32).toString(\'hex\'))"')
  }

  return process.env.PAYLOAD_SECRET
}

export default buildConfig({
  secret: getPayloadSecret(),
  i18n: {
    fallbackLanguage: 'pt',
    supportedLanguages: { pt },
  },
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    meta: {
      titleSuffix: '| PrimeUrban',
    },
  },
  collections: [Users, Media, Neighborhoods, Properties],
  plugins: [
    mcpPlugin({
      collections: {
        properties: {
          description: 'Imóveis cadastrados na PrimeUrban (apartamentos, casas, coberturas)',
          enabled: {
            find: true,
            create: true,
            update: true,
            delete: false,
          },
        },
        neighborhoods: {
          description: 'Bairros de Brasília gerenciados pela PrimeUrban',
          enabled: {
            find: true,
            create: true,
            update: true,
            delete: false,
          },
        },
        media: {
          description: 'Arquivos de mídia (imagens dos imóveis)',
          enabled: {
            find: true,
            create: false,
            update: false,
            delete: false,
          },
        },
      },
    }),
  ],
  db: sqliteAdapter({
    client: {
      url: process.env.DATABASE_URL ?? 'file:./payload.db',
    },
    transactionOptions: {},
  }),
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
})
