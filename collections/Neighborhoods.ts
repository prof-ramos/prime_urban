import type { CollectionConfig } from 'payload'

export const Neighborhoods: CollectionConfig = {
  slug: 'neighborhoods',
  labels: { singular: 'Bairro', plural: 'Bairros' },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'slug', 'active', 'featured'],
    group: 'Conteúdo',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
    },
    {
      name: 'legacyCount',
      type: 'number',
      required: true,
      defaultValue: 0,
      admin: {
        description: 'Contagem editorial herdada do mock para bairros sem imóveis.',
      },
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
    },
    {
      name: 'active',
      type: 'checkbox',
      defaultValue: true,
      index: true,
    },
  ],
}
