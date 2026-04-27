# Production Readiness

## Database

Production database: PostgreSQL.

Required environment variables:

- `DATABASE_URL`
- `PAYLOAD_SECRET`
- `NEXT_PUBLIC_SITE_URL`

Local development may use `file:./payload.db`. Do not commit local SQLite database files.

Payload CMS 3.84 supports PostgreSQL through `@payloadcms/db-postgres`:

```ts
import { postgresAdapter } from '@payloadcms/db-postgres'

db: postgresAdapter({
  pool: {
    connectionString: process.env.DATABASE_URL,
  },
})
```

Keep SQLite only for local development or a persistent single-node deployment with an explicit backup plan.

## SQLite to PostgreSQL Migration

Install and configure `@payloadcms/db-postgres`, then switch `payload.config.ts` from `sqliteAdapter` to the Postgres adapter behind `DATABASE_URL`.

One-time migration options:

- `migrate-sqlite-to-postgres`: export current SQLite Payload data and import into Postgres.
- `seed-postgres`: reseed Postgres from `lib/mock-data.ts` when production content can be rebuilt from seed.

Test the migration locally before changing production. For serverless hosts, use connection pooling such as PgBouncer and configure `DATABASE_URL` with the host's pooling endpoint or required pooling parameters.

## Migrations

Use Payload migrations before production builds or at server startup, depending on the host:

```json
{
  "scripts": {
    "ci": "payload migrate && npm run build"
  }
}
```

For long-running servers where migrations cannot run during build, configure Payload `prodMigrations` in the database adapter and import generated migrations from the migrations index.

## Media

Production uploads must use persistent object storage or a persistent mounted volume. Local `media/` is development-only and ignored by git.

External image URLs remain supported by the `images.externalUrl` field, but real uploaded media must not depend on ephemeral build or serverless filesystem storage.

## Images

Next.js image optimization is enabled for remote Unsplash URLs through `images.remotePatterns` in `next.config.mjs`. Add new remote hostnames there before introducing new external image providers.

The fallback image used by property cards and galleries is `public/placeholder-property.jpg`, exported at 1200x800px in a 3:2 aspect ratio.

## Deployment Environment

Set production values in the deployment provider dashboard, not in git:

- `PAYLOAD_SECRET`: strong random secret, at least 32 bytes.
- `DATABASE_URL`: production PostgreSQL connection string.
- `NEXT_PUBLIC_SITE_URL`: canonical public URL, for metadata, sitemap, and robots.
- `PAYLOAD_ADMIN_EMAIL` and `PAYLOAD_ADMIN_PASSWORD`: only for controlled seed/bootstrap workflows.

## Verification

Run before deploy:

```bash
npm run lint
npm run typecheck
npm run test:run
npm run build
npm run test:e2e
```

All commands must exit 0 before a production deploy.
