import { test, expect } from '@playwright/test'

test.describe('Mobile viewport', () => {
  test('menu hamburger toggle on mobile', async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== 'mobile', 'Apenas no projeto mobile')
    await page.goto('/')
    const menuBtn = page.getByRole('button', { name: 'Abrir menu' })
    await menuBtn.click()
    await expect(page.getByRole('button', { name: 'Fechar menu' })).toBeVisible()
  })
})
