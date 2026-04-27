import { test, expect } from "@playwright/test"
import AxeBuilder from "@axe-core/playwright"

const WCAG_TAGS = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']

function expectNoAccessibilityViolations(violations: Awaited<ReturnType<AxeBuilder['analyze']>>['violations']) {
  if (violations.length === 0) {
    expect(violations).toHaveLength(0)
    return
  }

  const formatted = violations
    .map((violation) => `${violation.id}: ${violation.description} - ${violation.nodes.length} ocorrências`)
    .join('\n\n')

  throw new Error(`Violações de acessibilidade encontradas:\n\n${formatted}`)
}

test.describe("Auditoria de Acessibilidade (WCAG)", () => {
  test("página inicial não deve ter violações de acessibilidade detectáveis @desktop", async ({ page }) => {
    await page.goto("/")
    
    // Aguarda o carregamento das imagens e componentes dinâmicos principais
    await page.waitForLoadState('networkidle')

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(WCAG_TAGS)
      .analyze()

    expectNoAccessibilityViolations(accessibilityScanResults.violations)
  })

  test("página de listagem não deve ter violações @desktop", async ({ page }) => {
    await page.goto("/imoveis")
    await page.waitForLoadState('networkidle')
    
    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(WCAG_TAGS)
      .analyze()
      
    expectNoAccessibilityViolations(accessibilityScanResults.violations)
  })
})
