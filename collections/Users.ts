import type { CollectionConfig, PayloadRequest } from 'payload'

const isAdmin = ({ req }: { req: PayloadRequest }) =>
  Boolean((req.user as { roles?: string[] } | null)?.roles?.includes('admin'))

export const Users: CollectionConfig = {
  slug: 'users',
  labels: { singular: 'Usuário', plural: 'Usuários' },
  auth: true,
  admin: {
    useAsTitle: 'email',
    group: 'Sistema',
  },
  access: {
    create: async ({ req }) => {
      if (req.user) return isAdmin({ req })
      const { totalDocs } = await req.payload.count({ collection: 'users' })
      return totalDocs === 0
    },
    read: ({ req, id }) => {
      if (!req.user) return false
      if (isAdmin({ req })) return true
      return { id: { equals: req.user.id } }
    },
    update: isAdmin,
    delete: isAdmin,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'roles',
      type: 'select',
      hasMany: true,
      required: true,
      defaultValue: ['editor'],
      saveToJWT: true,
      options: [
        { label: 'Admin', value: 'admin' },
        { label: 'Editor', value: 'editor' },
      ],
      access: {
        update: isAdmin,
      },
    },
  ],
}
