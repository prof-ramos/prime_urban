import { describe, it, expect } from 'vitest'
import {
  getPropertyBySlug,
  getFeaturedProperties,
  getPropertiesByNeighborhood,
  getNeighborhoodBySlug,
} from '../mock-data'

describe('mock-data helpers', () => {
  describe('getPropertyBySlug', () => {
    it('retorna imóvel existente', () => {
      const property = getPropertyBySlug('apartamento-asa-sul-sqn-308')
      expect(property).toBeDefined()
      expect(property?.title).toContain('Parque da Cidade')
    })

    it('retorna undefined para slug inexistente', () => {
      expect(getPropertyBySlug('inexistente-xyz')).toBeUndefined()
    })
  })

  describe('getFeaturedProperties', () => {
    it('retorna apenas imóveis em destaque', () => {
      const featured = getFeaturedProperties()
      expect(featured.length).toBeGreaterThan(0)
      expect(featured.every((p) => p.featured)).toBe(true)
    })
  })

  describe('getPropertiesByNeighborhood', () => {
    it('retorna imóveis do bairro correto', () => {
      const lagoSul = getPropertiesByNeighborhood('Lago Sul')
      expect(lagoSul.every((p) => p.neighborhood === 'Lago Sul')).toBe(true)
    })

    it('retorna array vazio para bairro sem imóveis', () => {
      expect(getPropertiesByNeighborhood('Bairro Inexistente')).toEqual([])
    })
  })

  describe('getNeighborhoodBySlug', () => {
    it('retorna bairro existente', () => {
      const n = getNeighborhoodBySlug('aguas-claras')
      expect(n?.name).toBe('Águas Claras')
    })

    it('retorna undefined para slug inexistente', () => {
      expect(getNeighborhoodBySlug('inexistente')).toBeUndefined()
    })
  })
})
