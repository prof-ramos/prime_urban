import { describe, it, expect } from 'vitest'
import { loadOgFont } from '../og-font'

describe('loadOgFont', () => {
  it('retorna ArrayBuffer e faz cache após primeira chamada', async () => {
    const first = await loadOgFont()
    const second = await loadOgFont()
    // Usa constructor.name para evitar falso negativo de instanceof
    // entre diferentes vm contexts (jsdom vs Node.js)
    expect(first?.constructor?.name).toBe('ArrayBuffer')
    expect((first as ArrayBuffer).byteLength).toBeGreaterThan(0)
    // Cache: mesma referência em chamadas subsequentes
    expect(first).toBe(second)
  })
})
