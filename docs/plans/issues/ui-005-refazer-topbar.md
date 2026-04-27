# UI-005: Refazer top bar — mover localização para footer

## Status
**COMPLETED — merged to main**

## Descrição
Top bar poluída com localização, telefone e tagline. Simplificar: manter telefone discreto, mover localização para footer.

## Critério de Aceite
- [x] Top bar mostra apenas telefone com ícone discreto
- [x] Localização "Brasília, DF" removida do header
- [x] Tagline "Curadoria Imobiliária..." removida ou movida

## Arquivos Prováveis
- `components/header.tsx`
- `components/footer.tsx` (adicionar localização aqui)

## Notas
Verificar se tagline é necessária para SEO/brand.
