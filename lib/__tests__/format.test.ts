import { describe, it, expect } from 'vitest'
import { formatCurrency } from '../format'

// Normaliza espaço não-quebrável usado pelo Intl.NumberFormat pt-BR
const nbsp = '\u00A0'

describe('formatCurrency', () => {
  it('formata 1000000 como R$ 1.000.000', () => {
    expect(formatCurrency(1000000)).toBe(`R$${nbsp}1.000.000`)
  })

  it('formata valor com centavos sem fração (arredonda)', () => {
    expect(formatCurrency(999.99)).toBe(`R$${nbsp}1.000`)
  })

  it('formata 0 como R$ 0', () => {
    expect(formatCurrency(0)).toBe(`R$${nbsp}0`)
  })

  it('formata valor negativo', () => {
    expect(formatCurrency(-500)).toBe(`-R$${nbsp}500`)
  })

  it('formata valor grande', () => {
    expect(formatCurrency(8500000)).toBe(`R$${nbsp}8.500.000`)
  })
})
