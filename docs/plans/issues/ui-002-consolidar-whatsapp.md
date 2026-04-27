# UI-002: Consolidar botões flutuantes WhatsApp

## Status
**COMPLETED — merged to main**

## Descrição
Há botão verde flutuante + bubble "Precisa de ajuda?" redundantes. Manter apenas um.

## Critério de Aceite
- [x] Apenas um botão WhatsApp visível
- [x] Bubble removido ou integrado ao botão principal

## Arquivos Prováveis
- `components/floating-whatsapp.tsx`

## Notas
Se o bubble for de um widget externo (ex: WhatsApp Business API), remover e manter apenas o CTA customizado.
