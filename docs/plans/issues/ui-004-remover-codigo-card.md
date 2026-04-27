# UI-004: Remover código do imóvel do card de destaque

## Descrição
Código "PU-0001" no card não agrega valor ao usuário final. Remover do card, manter internamente para SEO/URL.

## Critério de Aceite
- [ ] Código não aparece mais no `PropertyCard`
- [ ] Slug e URL continuam funcionando corretamente

## Arquivos Prováveis
- `components/property-card.tsx`

## Notas
Apenas remover renderização do código; manter `property.id` disponível para uso interno.
