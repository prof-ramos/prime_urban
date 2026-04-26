# Payload CMS: compatibilidade e plano de implementação

Data: 2026-04-26

## Resumo

O Payload CMS v3 deve ser usado como fonte principal dos imóveis da PrimeUrban,
substituindo o fluxo baseado em `lib/mock-data.ts`.

O projeto atual ainda não é plug-and-play com Payload porque usa Next.js
`16.0.10`, enquanto a documentação atual do Payload informa suporte para Next.js
`16.2.2+` entre as versões compatíveis. Com upgrade de Next.js, o projeto é
tecnicamente compatível: usa App Router, ESM em `next.config.mjs`, React 19 e
TypeScript.

O primeiro corte será local/dev, com SQLite, UI pública preservada e seed
obrigatório. Produção persistente com SQLite não será tratada como alvo final.

## Compatibilidade observada

- Stack atual: Next.js `16.0.10`, React `19.2.0`, App Router, TypeScript.
- Payload v3 exige Node.js `20.9.0+`.
- Payload v3 exige banco compatível: MongoDB, Postgres ou SQLite.
- Payload deve envolver o `next.config.mjs` com `withPayload`.
- Payload precisa de `payload.config.ts` e rotas no App Router para admin/API.
- A Local API (`getPayload`) pode ser usada em Server Components sem request HTTP
  interno.
- `generateStaticParams`, `generateMetadata`, sitemap e OG images podem buscar
  dados do Payload.

## Decisões travadas

- Payload será a fonte principal dos imóveis.
- Banco do MVP: SQLite apenas para local/dev.
- Produção: Postgres antes do lançamento, com migração planejada do SQLite para
  Postgres quando o modelo estiver validado.
- Renderização: híbrida com revalidação.
- Coleções do primeiro corte: `users`, `media`, `neighborhoods`, `properties`.
- Imagens: uploads no Payload + URL externa opcional para migração suave.
- Bairros: coleção própria, lista ampla ativa no Payload.
- Status editorial dos imóveis: `draft`, `published`, `archived`.
- Status comercial separado: `disponivel`, `reservado`, `vendido`, `alugado`,
  `indisponivel`.
- Vendidos/alugados: fora da listagem, mas detalhe público acessível com aviso.
- Migração: seed idempotente preservando slugs e dados atuais.
- Admin: `/admin`.
- GraphQL: fora do MVP.
- Formulário de contato: fora do Payload no MVP.
- Admin inicial: bootstrap por variáveis de ambiente no seed.
- Ambiente-alvo inicial: local/dev.
- UI pública: deve continuar idêntica.
- Tipos: camada adaptadora Payload -> `Property` atual.
- Filtros: client-side no MVP.
- SEO: todo baseado no Payload, com seed obrigatório e sem fallback silencioso
  para mocks.

## Plano de implementação

### 1. Atualizar stack e instalar Payload

- Atualizar Next.js para `16.2.2+`.
- Instalar pacotes do Payload:
  - `payload`
  - `@payloadcms/next`
  - `@payloadcms/ui`
  - `@payloadcms/db-sqlite`
- Manter React/React DOM compatíveis com a versão de Next escolhida.
- Atualizar lockfile com install limpo.

### 2. Configurar Payload no Next.js

- Criar `payload.config.ts`.
- Envolver `next.config.mjs` com `withPayload`.
- Adicionar alias `@payload-config`.
- Criar route group `(payload)` com:
  - admin em `/admin`
  - REST API do Payload
- Não criar rota GraphQL no MVP.

### 3. Modelar coleções

Criar coleções:

- `users`
  - autenticação do admin.
- `media`
  - uploads reais de imagens.
- `neighborhoods`
  - `name`
  - `slug`
  - `description`
  - `featured`
  - `active`
- `properties`
  - campos equivalentes ao `Property` atual.
  - relacionamento com `neighborhoods`.
  - `statusEditorial`
  - `statusComercial`
  - imagens por upload e URL externa opcional.

### 4. Criar camada de dados e adaptador

- Criar funções de leitura usando Payload Local API.
- Adaptar documentos Payload para o tipo público `Property` atual.
- Manter `PropertyCard`, `PropertyInfo`, filtros e testes com mínimo impacto.
- Evitar espalhar tipos gerados do Payload pela UI pública.

### 5. Substituir mock data no fluxo público

Substituir usos públicos de `lib/mock-data.ts` por funções baseadas no Payload:

- listagem `/imoveis`
- detalhe `/imoveis/[slug]`
- bairros `/bairros` e `/bairros/[slug]`
- `generateStaticParams`
- `generateMetadata`
- sitemap
- OG image

Regra pública:

- Listagens mostram imóveis com `statusEditorial=published` e status comercial
  visível.
- Vendidos/alugados não aparecem em listagens.
- Detalhe de vendido/alugado continua público com aviso de indisponibilidade.

### 6. Seed idempotente

- Criar script de seed que lê os dados atuais.
- Criar/atualizar bairros por `slug`.
- Criar/atualizar imóveis por `slug`.
- Preservar slugs, textos, preços, metragens, quartos, vagas e URLs Unsplash.
- Criar admin inicial a partir de:
  - `PAYLOAD_ADMIN_EMAIL`
  - `PAYLOAD_ADMIN_PASSWORD`
- Usar senha forte mesmo em desenvolvimento, trocar a senha após o primeiro
  login e nunca commitar essas variáveis em `.env` ou similares. Em produção,
  usar variáveis de ambiente seguras ou gerenciador de segredos.
- Rodar o seed duas vezes sem duplicar registros.

### 7. Testes e validação

Rodar:

```bash
npm ci
npm run lint
npm run typecheck
npm run test:run
npm run test:e2e
npm run build
```

Adicionar ou ajustar testes para:

- adaptador Payload -> `Property`.
- seed idempotente.
- listagem mantendo filtros e ordenação.
- detalhe de imóvel publicado.
- detalhe de imóvel vendido/alugado com aviso.
- bairros e contagens aparentes.
- sitemap e metadata baseados no Payload.

Validação manual:

- acessar `/admin`;
- logar com admin bootstrap;
- editar um imóvel;
- publicar alteração;
- confirmar reflexo no site após revalidação.

## Fora do MVP

- Produção persistente com SQLite.
- Migração para Postgres.
- GraphQL.
- Leads/formulário dentro do Payload.
- Páginas institucionais editáveis.
- Redesign da UI pública.
- Fallback silencioso para `mock-data.ts`.
