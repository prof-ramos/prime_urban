# UI-024: Adicionar mapa interativo de bairros (opcional)

## Descrição
Brasília é organizada por RA. Mapa com pins clicáveis ajuda na descoberta.

## Critério de Aceite
- [ ] Mapa funcional com bairros marcados
- [ ] Pins clicáveis levam a `/imoveis?bairro=...`
- [ ] Fallback funcional em mobile

## Arquivos Prováveis
- novo `components/neighborhood-map.tsx`

## Notas
Pode usar embed Google Maps ou Leaflet/OpenStreetMap.