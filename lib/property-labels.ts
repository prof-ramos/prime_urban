import type { PropertyType } from "@/lib/properties/types"

export const TYPE_LABELS = {
  apartamento: 'Apartamento',
  cobertura: 'Cobertura',
  casa: 'Casa',
  sala_comercial: 'Sala Comercial',
} satisfies Record<PropertyType, string>
