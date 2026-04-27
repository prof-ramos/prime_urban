import { test, expect } from "@playwright/test"

test.describe("Listagem de imóveis (/imoveis)", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/imoveis")
  })

  test("exibe todos os imóveis do mock", async ({ page }) => {
    await expect(page.getByText("12 imóveis encontrados")).toBeVisible()
  })

  test("exibe filtros principais e busca avançada", async ({ page }) => {
    await expect(page.locator("label").getByText("Tipo de negócio", { exact: true })).toBeVisible()
    await expect(page.locator("label").getByText("Tipo de imóvel", { exact: true })).toBeVisible()
    await expect(page.locator("label").getByText("Cidade", { exact: true })).toBeVisible()
    await expect(page.locator("label").getByText("Bairro", { exact: true })).toBeVisible()

    await page.getByRole("button", { name: /Busca avançada/i }).click()
    await expect(page.getByLabel("Código do imóvel")).toBeVisible()
    await expect(page.getByLabel("Palavra-chave")).toBeVisible()
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
    await page.getByRole("button", { name: /Busca avançada/i }).click()
    await page.getByLabel("Palavra-chave").fill("SQNW 111")
    await expect(page.getByText("1 imóvel encontrado")).toBeVisible()
  })

  test("busca por código filtra resultado @desktop", async ({ page }) => {
    await page.getByRole("button", { name: /Busca avançada/i }).click()
    await page.getByLabel("Código do imóvel").fill("PU-0002")
    await expect(page.getByText("1 imóvel encontrado")).toBeVisible()
    await expect(page.getByText("Código PU-0002")).toBeVisible()
  })

  test("sem resultados exibe mensagem e botão limpar @desktop", async ({ page }) => {
    await page.getByRole("button", { name: /Busca avançada/i }).click()
    await page.getByLabel("Palavra-chave").fill("imóvel inexistente xyzxyz")
    await expect(
      page.getByRole("heading", { name: "Nenhum imóvel encontrado" }),
    ).toBeVisible()
    await expect(
      page.getByRole("button", { name: "Limpar filtros" }).first(),
    ).toBeVisible()
  })

  test("botão limpar filtros restaura todos os resultados @desktop", async ({
    page,
  }) => {
    await page.getByRole("button", { name: /Busca avançada/i }).click()
    await page.getByLabel("Palavra-chave").fill("imóvel inexistente xyzxyz")
    await page.getByRole("button", { name: "Limpar filtros" }).first().click()
    await expect(page.getByText("12 imóveis encontrados")).toBeVisible()
  })

  test("ordenação por menor preço mostra aluguel mais barato primeiro @desktop", async ({ page }) => {
    await page.getByRole("combobox").last().click()
    await page.getByRole("option", { name: "Menor preço" }).click()
    await expect(
      page.getByRole("link", { name: /Apartamento 2 quartos no Guará II/i }),
    ).toBeVisible()
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
