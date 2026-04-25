export const TYPE_LABELS = {
  apartamento: 'Apartamento',
  cobertura: 'Cobertura',
  casa: 'Casa',
  sala_comercial: 'Sala Comercial',
} as const

export type PropertyType = keyof typeof TYPE_LABELS
