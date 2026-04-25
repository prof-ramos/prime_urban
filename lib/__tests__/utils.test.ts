import { describe, it, expect } from 'vitest'
import { cn } from '../utils'

describe('cn', () => {
  it('mergeia classes simples', () => {
    expect(cn('btn', 'btn-primary')).toBe('btn btn-primary')
  })

  it('ignora valores falsy', () => {
    expect(cn('btn', null, undefined, false, 'active')).toBe('btn active')
  })

  it('resolve conflitos com tailwind-merge (último vence)', () => {
    expect(cn('px-2', 'px-4')).toBe('px-4')
  })

  it('funciona com condicional', () => {
    const isActive = true
    expect(cn('btn', isActive && 'active')).toBe('btn active')
  })
})
