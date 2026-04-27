# E2E Test Assistant (Playwright)

Help with Playwright E2E tests for $ARGUMENTS.

## Context

- Framework: Playwright com dois projetos — `chromium` (desktop) e `mobile` (iPhone 13)
- Config: `playwright.config.ts`
- Testes em: `e2e/`
- Tag `@desktop`: pula no mobile WebKit (use quando `fill()` em inputs React controlled ou elementos sticky causarem falhas)

## Commands

```bash
npx playwright test e2e/$ARGUMENTS.spec.ts                       # arquivo específico
npx playwright test e2e/$ARGUMENTS.spec.ts --project=chromium    # só desktop
npx playwright test e2e/$ARGUMENTS.spec.ts --project=mobile      # só mobile
npx playwright test --ui                                          # UI interativa
npx playwright show-report                                        # relatório HTML
```

## Task

Analise o arquivo de spec existente (se houver) e:
1. Verifique se os seletores usam `data-testid`, `role` ou texto visível (preferência nessa ordem)
2. Garanta que testes flaky com inputs React controlled no mobile usem tag `@desktop`
3. Use `page.getByRole()` e `page.getByTestId()` em vez de seletores CSS frágeis
4. Adicione assertions de acessibilidade com `@axe-core/playwright` quando relevante
