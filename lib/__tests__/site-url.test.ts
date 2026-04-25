import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { getSiteUrl } from '../site-url'

describe('getSiteUrl', () => {
  let originalEnv: string | undefined

  beforeEach(() => {
    originalEnv = process.env.NEXT_PUBLIC_SITE_URL
  })

  afterEach(() => {
    if (originalEnv === undefined) {
      delete process.env.NEXT_PUBLIC_SITE_URL
    } else {
      process.env.NEXT_PUBLIC_SITE_URL = originalEnv
    }
  })

  it('retorna env var quando definida', () => {
    process.env.NEXT_PUBLIC_SITE_URL = 'https://staging.example.com'
    expect(getSiteUrl()).toBe('https://staging.example.com')
  })

  it('retorna fallback quando env var está definida como string vazia', () => {
    process.env.NEXT_PUBLIC_SITE_URL = ''
    expect(getSiteUrl()).toBe('')
  })

  it('retorna fallback quando env var não está definida', () => {
    delete process.env.NEXT_PUBLIC_SITE_URL
    expect(getSiteUrl()).toBe('https://primeurban.com.br')
  })
})
