import { test, expect } from "@playwright/test"

const SLUG = "apartamento-asa-sul-sqn-308"

test.describe("Detalhe do imóvel", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(`/imoveis/${SLUG}`)
  })

  test("exibe título do imóvel", async ({ page }) => {
    await expect(
      page.getByRole("heading", {
        name: "Apartamento 4 quartos com vista para o Parque da Cidade",
      }),
    ).toBeVisible()
  })

  test("exibe breadcrumb com link para /imoveis", async ({ page }) => {
    // Escopa ao <nav> do breadcrumb dentro do <main>
    await expect(
      page.locator("main nav").getByRole("link", { name: "Imóveis", exact: true }),
    ).toBeVisible()
  })

  test("exibe formulário de contato", async ({ page }) => {
    const main = page.locator("main")
    // CardTitle do shadcn/ui renderiza como div, não heading semântico
    await expect(main.getByText("Agende uma visita")).toBeVisible()
    await expect(main.getByLabel("Nome completo")).toBeVisible()
    await expect(main.getByLabel("E-mail")).toBeVisible()
    await expect(main.getByLabel("Telefone")).toBeVisible()
  })

  test("botão WhatsApp está visível no formulário", async ({ page }) => {
    await expect(
      page.getByRole("button", { name: /Chamar no WhatsApp/i }),
    ).toBeVisible()
  })

  test("submissão do formulário exibe confirmação", async ({ page }) => {
    await page.locator("main").getByLabel("Nome completo").fill("João Silva")
    await page.locator("main").getByLabel("E-mail").fill("joao@exemplo.com")
    await page.locator("main").getByLabel("Telefone").fill("(61) 98888-8888")
    await page.getByRole("button", { name: "Enviar mensagem" }).click()

    await expect(page.getByText("Mensagem enviada!")).toBeVisible()
    await expect(
      page.getByRole("button", { name: /Falar pelo WhatsApp agora/i }),
    ).toBeVisible()
  })

  test("página 404 para slug inválido", async ({ page }) => {
    await page.goto("/imoveis/slug-inexistente")
    await expect(
      page.getByRole("heading", { name: /Página não encontrada/i }),
    ).toBeVisible()
  })
})
