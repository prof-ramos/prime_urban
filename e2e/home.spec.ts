import { test, expect } from "@playwright/test"

test.describe("Página inicial", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/")
  })

  test("exibe header com logo", async ({ page }) => {
    await expect(
      page.locator("header").getByText("PrimeUrban").first(),
    ).toBeVisible()
  })

  test("exibe link de navegação para imóveis no desktop @desktop", async ({ page }) => {
    await expect(
      page.locator("header nav.hidden.md\\:flex").getByRole("link", {
        name: "Imóveis",
      }),
    ).toBeVisible()
  })

  test("exibe hero section com formulário de busca", async ({ page }) => {
    await expect(
      page.getByRole("heading", { name: /Encontre o imóvel/i }),
    ).toBeVisible()
    await expect(
      page.getByPlaceholder("Buscar por endereço ou código"),
    ).toBeVisible()
    await expect(
      page.getByRole("button", { name: "Buscar Imóveis" }),
    ).toBeVisible()
  })

  test("exibe 3 imóveis em destaque", async ({ page }) => {
    await expect(
      page.getByRole("heading", { name: "Imóveis em Destaque" }),
    ).toBeVisible()
    const section = page
      .locator("section")
      .filter({ hasText: "Imóveis em Destaque" })
    // Cada card de destaque tem um link /imoveis/[slug]
    await expect(section.locator('a[href^="/imoveis/"]')).toHaveCount(3)
  })

  test("exibe seção de bairros", async ({ page }) => {
    const section = page
      .locator("section")
      .filter({ hasText: "Bairros de Brasília" })
    await expect(section.getByText("Asa Sul")).toBeVisible()
    await expect(section.getByText("Noroeste")).toBeVisible()
  })

  test("exibe footer", async ({ page }) => {
    await expect(page.getByRole("contentinfo")).toBeVisible()
  })

  test("busca no hero navega para /imoveis com parâmetros @desktop", async ({
    page,
  }) => {
    await page.getByPlaceholder("Buscar por endereço ou código").fill("Asa Sul")
    await page.getByRole("button", { name: "Buscar Imóveis" }).click()
    await page.waitForURL(/\/imoveis/)
    await expect(page).toHaveURL(/q=Asa/)
  })
})
