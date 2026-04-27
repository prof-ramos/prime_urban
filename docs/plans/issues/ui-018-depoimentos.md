# UI-018: Criar seção de depoimentos / prova social

## Descrição
Site inteiro sem prova social. Adicionar depoimentos ou logos de parceiros.

## Critério de Aceite
- [ ] Seção com 2-3 depoimentos (nome, foto, texto) OU logos de parceiros
- [ ] Design consistente com restante do site
- [ ] Contraste de texto adequado (WCAG AA)

## Arquivos Prováveis

- `components/testimonials-section.tsx`
- `lib/testimonials.ts`

## Notas

A seção já existe em `components/testimonials-section.tsx` e `lib/testimonials.ts` com mock data,
mas está desabilitada em `app/page.tsx` aguardando depoimentos reais de clientes.
Para ativar, descomentar o import e uso do componente `<TestimonialsSection />` em `app/page.tsx`.
