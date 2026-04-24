import { test, expect } from '@playwright/test'

test.describe('Página 404', () => {
  test('renderiza título e links para navegação', async ({ page }) => {
    await page.goto('/rota-inexistente-xyz')
    await expect(page.getByRole('heading', { name: /Página não encontrada/i })).toBeVisible()
    await expect(page.getByRole('link', { name: /Voltar ao início/i })).toBeVisible()
    await expect(page.getByRole('link', { name: /Ver imóveis/i })).toBeVisible()
  })

  test('link "Voltar ao início" navega para /', async ({ page }) => {
    await page.goto('/rota-inexistente')
    await page.getByRole('link', { name: /Voltar ao início/i }).click()
    await expect(page).toHaveURL('/')
  })
})
