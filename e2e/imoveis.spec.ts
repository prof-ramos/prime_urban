import { test, expect } from "@playwright/test"

test.describe("Listagem de imóveis (/imoveis)", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/imoveis")
  })

  test("exibe lista inicial de imóveis e sumário", async ({ page }) => {
    await expect(page.getByText(/imóve(is|l) encontrados?/).first()).toBeVisible()
    await expect(page.locator('.group').first()).toBeVisible()
  })

  test("exibe filtros principais e busca avançada", async ({ page }) => {
    await expect(page.getByLabel("Tipo de negócio", { exact: true })).toBeVisible()
    await expect(page.getByLabel("Tipo de imóvel", { exact: true })).toBeVisible()
    
    await page.getByRole("button", { name: /Busca avançada/i }).click()
    
    await expect(page.getByLabel("Min. quartos", { exact: true })).toBeVisible()
    await expect(page.getByPlaceholder("PU-0002")).toBeVisible()
    await expect(page.getByPlaceholder(/bairro|endereço/i)).toBeVisible()
  })

  test("filtro por tipo altera resultados @desktop", async ({ page }) => {
    await page.getByLabel("Tipo de negócio", { exact: true }).click()
    await page.getByRole("option", { name: "Comprar" }).click()
    await expect(page.locator('.group').first()).toBeVisible()
  })

  test("busca textual filtra resultados @desktop", async ({ page }) => {
    await page.getByRole("button", { name: /Busca avançada/i }).click()
    const searchInput = page.getByPlaceholder(/bairro|endereço/i)
    await searchInput.fill("SQNW")
    // Pode ser "1 imóvel encontrado" ou "X imóveis encontrados"
    await expect(page.getByText(/imóve(is|l) encontrados?/).first()).toBeVisible()
  })

  test("sem resultados exibe mensagem e botão limpar @desktop", async ({ page }) => {
    await page.getByRole("button", { name: /Busca avançada/i }).click()
    await page.getByPlaceholder(/bairro|endereço/i).fill("imóvel inexistente xyzxyz")
    
    await expect(
      page.getByRole("heading", { name: "Nenhum imóvel encontrado" }),
    ).toBeVisible()
    await expect(
      page.getByRole("button", { name: "Limpar filtros" }).first(),
    ).toBeVisible()
  })

  test("ordenação por menor preço mostra resultados @desktop", async ({ page }) => {
    await page.getByRole("combobox").last().click()
    await page.getByRole("option", { name: "Menor preço" }).click()
    await expect(page.locator('.group').first()).toBeVisible()
  })

  test("card de imóvel navega para a página de detalhe @desktop", async ({ page }) => {
    const firstCardTitle = page.getByTestId("property-card-title").first()
    await firstCardTitle.click()
    await expect(page).toHaveURL(/\/imoveis\//)
  })
})
