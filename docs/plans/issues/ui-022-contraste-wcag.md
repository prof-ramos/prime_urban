# UI-022: Verificar contraste WCAG 2.1 AA

## Descrição
Textos sobre fundos escuros podem não atingir ratio 4.5:1.

## Critério de Aceite
- [ ] Texto normal (< 18pt): contraste mínimo 4.5:1 (WCAG AA)
- [ ] Texto grande (≥ 18pt ou ≥ 14pt bold): contraste mínimo 3:1 (WCAG AA)
- [ ] Nenhum erro de contraste no DevTools (Chrome Accessibility)
- [ ] `axe-core` sem violações de contraste (verificado via `e2e/a11y.spec.ts`)

## Arquivos Prováveis
- `app/globals.css`

## Referência CI
Os testes de acessibilidade rodam automaticamente em `.github/workflows/tests.yml`
via `e2e/a11y.spec.ts` (axe-core). Qualquer regressão de contraste quebrará o CI.
