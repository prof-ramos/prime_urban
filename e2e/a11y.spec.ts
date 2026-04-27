import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

const pages = ['/', '/imoveis', '/sobre']

for (const path of pages) {
  test(`a11y scan: ${path}`, async ({ page }) => {
    test.setTimeout(120000)

    await page.goto(path, { waitUntil: 'networkidle' })
    const results = await new AxeBuilder({ page }).analyze()
    const seriousViolations = results.violations.filter((violation) =>
      ['serious', 'critical'].includes(violation.impact ?? '')
    )

    expect(
      seriousViolations.map((violation) => ({
        id: violation.id,
        impact: violation.impact,
        nodes: violation.nodes.map((node) => node.target),
      })),
    ).toEqual([])
  })
}
