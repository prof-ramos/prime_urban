# UI-003: Corrigir headline do hero cortada no topo

## Descrição
Texto "Encontre o imóvel dos seus sonhos" tem a parte superior cortada. Aumentar padding/margin ou min-height do hero.

## Critério de Aceite
- [ ] Headline totalmente visível em todas as resoluções (mobile, tablet, desktop)
- [ ] Nenhum corte no topo do texto

## Arquivos Prováveis
- `app/page.tsx` (hero section)
- `app/globals.css` (se necessário ajustar tokens)

## Notas
Verificar se o header fixed está causando overlap com o hero.
