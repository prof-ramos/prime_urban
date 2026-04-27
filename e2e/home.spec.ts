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
    await expect(page.locator("label").getByText("Tipo de negócio", { exact: true })).toBeVisible()
    await expect(page.locator("label").getByText("Tipo de imóvel", { exact: true })).toBeVisible()
    await expect(page.locator("label").getByText("Cidade", { exact: true })).toBeVisible()
    await expect(page.locator("label").getByText("Bairro", { exact: true })).toBeVisible()
    await expect(page.getByRole("button", { name: /Busca avançada/i })).toBeVisible()
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
    await expect(section.getByText("Plano Piloto")).toBeVisible()
    await expect(section.getByText("Lago Sul")).toBeVisible()
  })

  test("exibe footer", async ({ page }) => {
    await expect(page.getByRole("contentinfo")).toBeVisible()
  })

  test("busca no hero navega para /imoveis com parâmetros @desktop", async ({
    page,
  }) => {
    await page.getByRole("button", { name: /Busca avançada/i }).click()
    await page.getByPlaceholder("Palavra-chave").fill("Asa Sul")
    await page.getByRole("button", { name: "Buscar Imóveis" }).click()
    await page.waitForURL(/\/imoveis/)
    await expect(page).toHaveURL(/q=Asa/)
  })
})
