import { describe, it, expect } from 'vitest'
import { TYPE_LABELS } from '../property-labels'

describe('TYPE_LABELS', () => {
  it('retorna label para apartamento', () => {
    expect(TYPE_LABELS['apartamento']).toBe('Apartamento')
  })

  it('retorna label para cobertura', () => {
    expect(TYPE_LABELS['cobertura']).toBe('Cobertura')
  })

  it('retorna label para casa', () => {
    expect(TYPE_LABELS['casa']).toBe('Casa')
  })

  it('retorna label para sala_comercial', () => {
    expect(TYPE_LABELS['sala_comercial']).toBe('Sala Comercial')
  })

  it('retorna undefined para tipo inexistente', () => {
    // @ts-expect-error — chave inválida não deve existir no TYPE_LABELS
    expect(TYPE_LABELS['inexistente']).toBeUndefined()
  })
})
