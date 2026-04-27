# UI-001: Remover overlay "Compiling..." em dev

## Descrição
Overlay "Compiling..." aparece no canto inferior esquerdo durante desenvolvimento. Verificar se é componente de dev-only e garantir que não vaze para produção.

## Critério de Aceite
- [ ] Overlay não aparece em produção
- [ ] Build de dev continua funcionando sem erros

## Arquivos Prováveis
- `app/layout.tsx`
- Componente de toast/loading em dev

## Notas
Pode ser do Next.js dev indicator nativo (ajustar em `next.config.js`).
