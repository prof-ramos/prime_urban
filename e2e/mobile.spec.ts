import { test, expect } from '@playwright/test'

test.describe('Mobile viewport', () => {
  test.use({ viewport: { width: 375, height: 667 } })

  test('menu hamburger toggle on mobile', async ({ page }) => {
    await page.goto('/')
    const menuBtn = page.getByRole('button', { name: 'Abrir menu' })
    await menuBtn.click()
    await expect(page.getByRole('button', { name: 'Fechar menu' })).toBeVisible()
  })
})
