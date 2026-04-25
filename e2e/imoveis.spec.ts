import { test, expect } from "@playwright/test"

test.describe("Listagem de imóveis (/imoveis)", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/imoveis")
  })

  test("exibe todos os imóveis do mock", async ({ page }) => {
    await expect(page.getByText("12 imóveis encontrados")).toBeVisible()
  })

  // Filtros do desktop (visíveis apenas em lg+, ou seja, Desktop Chrome)
  test("filtro por tipo — comprar filtra 8 imóveis @desktop", async ({
    page,
  }) => {
    // Primeiro combobox desktop: placeholder "Comprar/Alugar"
    await page.getByRole("combobox").first().click()
    await page.getByRole("option", { name: "Comprar" }).click()
    await expect(page.getByText("8 imóveis encontrados")).toBeVisible()
  })

  test("filtro por tipo — alugar filtra 4 imóveis @desktop", async ({
    page,
  }) => {
    await page.getByRole("combobox").first().click()
    await page.getByRole("option", { name: "Alugar" }).click()
    await expect(page.getByText("4 imóveis encontrados")).toBeVisible()
  })

  test("busca textual filtra resultados @desktop", async ({ page }) => {
    await page.getByPlaceholder(/Buscar por endereço/i).fill("SQNW 111")
    await expect(page.getByText("1 imóvel encontrado")).toBeVisible()
  })

  test("sem resultados exibe mensagem e botão limpar @desktop", async ({ page }) => {
    await page
      .getByPlaceholder(/Buscar por endereço/i)
      .fill("imóvel inexistente xyzxyz")
    await expect(
      page.getByRole("heading", { name: "Nenhum imóvel encontrado" }),
    ).toBeVisible()
    await expect(
      page.getByRole("button", { name: "Limpar filtros" }),
    ).toBeVisible()
  })

  test("botão limpar filtros restaura todos os resultados @desktop", async ({
    page,
  }) => {
    await page
      .getByPlaceholder(/Buscar por endereço/i)
      .fill("imóvel inexistente xyzxyz")
    await page.getByRole("button", { name: "Limpar filtros" }).click()
    await expect(page.getByText("12 imóveis encontrados")).toBeVisible()
  })

  test("card de imóvel navega para a página de detalhe @desktop", async ({ page }) => {
    await page
      .getByRole("link", {
        name: /Apartamento 4 quartos com vista/i,
      })
      .click()
    await expect(page).toHaveURL(/\/imoveis\/apartamento-asa-sul-sqn-308/)
  })
})
