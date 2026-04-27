import type { CollectionConfig } from 'payload'

export const Properties: CollectionConfig = {
  slug: 'properties',
  labels: { singular: 'Imóvel', plural: 'Imóveis' },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'transactionType', 'statusEditorial', 'statusComercial'],
    group: 'Conteúdo',
  },
  versions: {
    drafts: true,
  },
  access: {
    read: ({ req }) => {
      if (req.user) return true
      return { _status: { equals: 'published' } }
    },
  },
  fields: [
    { name: 'legacyId', type: 'text', required: true, unique: true },
    { name: 'slug', type: 'text', required: true, unique: true, index: true },
    { name: 'title', type: 'text', required: true },
    {
      name: 'type',
      type: 'select',
      required: true,
      options: [
        { label: 'Apartamento', value: 'apartamento' },
        { label: 'Casa', value: 'casa' },
        { label: 'Cobertura', value: 'cobertura' },
        { label: 'Sala Comercial', value: 'sala_comercial' },
      ],
    },
    {
      name: 'transactionType',
      type: 'select',
      required: true,
      options: [
        { label: 'Venda', value: 'venda' },
        { label: 'Aluguel', value: 'aluguel' },
      ],
    },
    {
      name: 'statusEditorial',
      type: 'select',
      required: true,
      defaultValue: 'published',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Published', value: 'published' },
        { label: 'Archived', value: 'archived' },
      ],
    },
    {
      name: 'statusComercial',
      type: 'select',
      required: true,
      defaultValue: 'disponivel',
      options: [
        { label: 'Disponivel', value: 'disponivel' },
        { label: 'Reservado', value: 'reservado' },
        { label: 'Vendido', value: 'vendido' },
        { label: 'Alugado', value: 'alugado' },
        { label: 'Indisponivel', value: 'indisponivel' },
      ],
    },
    { name: 'price', type: 'number', required: true, min: 0 },
    { name: 'condoFee', type: 'number', min: 0 },
    { name: 'iptu', type: 'number', min: 0 },
    {
      name: 'neighborhood',
      type: 'relationship',
      relationTo: 'neighborhoods',
      required: true,
      index: true,
    },
    { name: 'address', type: 'text', required: true },
    { name: 'privateArea', type: 'number', required: true, min: 0 },
    { name: 'totalArea', type: 'number', min: 0 },
    { name: 'bedrooms', type: 'number', required: true, min: 0 },
    { name: 'suites', type: 'number', min: 0 },
    { name: 'bathrooms', type: 'number', required: true, min: 0 },
    { name: 'parkingSpaces', type: 'number', required: true, min: 0 },
    {
      name: 'images',
      type: 'array',
      required: true,
      minRows: 1,
      fields: [
        {
          name: 'media',
          type: 'upload',
          relationTo: 'media',
        },
        {
          name: 'externalUrl',
          type: 'text',
        },
        {
          name: 'alt',
          type: 'text',
        },
      ],
    },
    { name: 'featured', type: 'checkbox', defaultValue: false },
    { name: 'acceptsPets', type: 'checkbox', defaultValue: false },
    { name: 'solarOrientation', type: 'text' },
  ],
}
