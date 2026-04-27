# UI-007: Adicionar imagem hero de impacto

## Descrição
Hero tem fundo escuro sem imagem real. Adicionar fotografia imobiliária emocional com overlay escuro.

## Critério de Aceite
- [ ] Hero possui `backgroundImage` real (Unsplash ou asset)
- [ ] Overlay escuro garante legibilidade do texto
- [ ] `min-height` adequado (ex: `600px` desktop, `400px` mobile)

## Arquivos Prováveis
- `app/page.tsx` (hero section)
- `app/globals.css` ou Tailwind classes

## Prompt para geração da imagem
Prompt (copie e cole no gerador de imagem de sua preferência):
```
A stunning twilight aerial view of a luxury modern apartment building entrance in Brasilia, Brazil. Warm interior lights glowing through floor-to-ceiling windows. Clean modernist architecture reflecting Niemeyer's geometric curves. Landscaped gardens with native cerrado vegetation. Soft golden-hour sky. Premium real estate photography style, cinematic wide angle, shallow depth of field, 8K quality.
```

## Notas
Usar Unsplash com tema "apartamento luxo Brasília" ou similar. Verificar direitos.
