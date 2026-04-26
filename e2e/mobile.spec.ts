import { test, expect } from '@playwright/test'

test.describe('Mobile viewport', () => {
  test('menu hamburger toggle on mobile', async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== 'mobile', 'Apenas no projeto mobile')
    await page.goto('/')
    const menuBtn = page.getByRole('button', { name: 'Abrir menu' })
    await menuBtn.click()
    await expect(page.getByRole('button', { name: 'Fechar menu' })).toBeVisible()
  })

  test('filtros da listagem funcionam no sheet mobile', async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== 'mobile', 'Apenas no projeto mobile')
    await page.goto('/imoveis')

    await page.getByRole('button', { name: /Filtros/ }).click()
    await page.getByRole('combobox', { name: 'Tipo de negócio' }).click()
    await page.getByRole('option', { name: 'Alugar' }).click()

    await expect(page.getByText(/\d+\s+(imóvel|imóveis)\s+encontrado(s)?/)).toBeVisible()
  })
})
