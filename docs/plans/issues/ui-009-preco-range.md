# UI-009: Substituir select de preço por range min/max

## Descrição
Placeholder "R$ Qualquer valor" é vago. Substituir por dois campos numéricos (min/max) ou range slider.

## Critério de Aceite
- [ ] Dois inputs visíveis: "Preço mínimo" e "Preço máximo"
- [ ] Placeholder removido
- [ ] Validação: mínimo <= máximo

## Arquivos Prováveis
- `components/property-filters.tsx`
