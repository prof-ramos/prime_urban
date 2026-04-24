import { describe, it, expect } from 'vitest'
import { loadOgFont } from '../og-font'

describe('loadOgFont', () => {
  it('é uma função assíncrona', () => {
    expect(typeof loadOgFont).toBe('function')
    const result = loadOgFont()
    expect(result).toBeInstanceOf(Promise)
  })
})
