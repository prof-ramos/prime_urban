# UI-024: Adicionar mapa interativo de bairros (opcional)

## Descrição
Brasília é organizada por RA. Mapa com pins clicáveis ajuda na descoberta.

## Critério de Aceite
- [ ] Mapa funcional com bairros marcados
- [ ] Pins clicáveis levam a `/imoveis?bairro=...`
- [ ] Fallback funcional em mobile

## Arquivos Prováveis
- `components/neighborhood-map.tsx` (já existe)

## Solução implementada
Mapa visual implementado sem dependência externa (sem Google Maps, sem Leaflet).
Usa uma grade responsiva de cards de bairro com links diretos para `/imoveis?bairro=...`.
Essa abordagem foi escolhida para:
- Evitar dependências externas e seus custos/complexidade
- Garantir performance e funcionamento offline
- Manter compatibilidade com SSR do Next.js sem configuração extra
- Mobile-first por padrão

O componente `NeighborhoodMap` em `components/neighborhood-map.tsx` já está ativo em `app/page.tsx`.
