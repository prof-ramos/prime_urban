# UI-011: Reorganizar "Busca Avançada" como link secundário

## Descrição
"Busca Avançada" com seta parece dropdown primário. Mover para link discreto abaixo do botão "Buscar".

## Critério de Aceite
- [ ] Botão "Buscar" é o único CTA primário na barra
- [ ] "Busca Avançada" é link discreto abaixo
- [ ] Ao clicar em "Busca Avançada", os filtros adicionais expandem/colapsam corretamente
- [ ] Estado expandido é acessível via teclado (aria-expanded propagado)

## Arquivos Prováveis
- `components/property-filters.tsx`
- `components/hero-section.tsx`
