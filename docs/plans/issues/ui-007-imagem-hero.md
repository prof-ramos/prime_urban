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

Prompt (copie e cole no Midjourney / Stable Diffusion / DALL-E de sua preferência):

```
Ultra-real editorial architectural photography of a luxury modern residential tower (centered-upright hero), warm bone-white facade with brushed bronze and glass balconies, minimalist geometric lines inspired by Oscar Niemeyer, surrounded by native Cerrado gardens and reflecting water pools plus warm sunset light creating golden refractions on the glass. Graduated twilight sky from deep navy to amber-gold, bright and radiant. Captured with Sony A7R V 16-35mm GM at f/8, golden-hour natural key light with subtle architectural fill, crisp highlights with creamy bokeh, Kinfolk meets Sotheby's real-estate editorial --ar 16:9 --s 250 --q 2 --c 15 --seed 777 --no people, cars, text, logos, power lines, ugly buildings
```

### Por que essa estrutura?

| Segmento | Função |
|----------|--------|
| `Ultra-real [architectural photography]` | Define o gênero fotográfico (não ilustração, não render) |
| `of a [luxury modern residential tower] ([centered-upright hero])` | Produto + enquadramento centralizado (para texto sobreposto) |
| `[warm bone-white facade with brushed bronze and glass balconies]` | Materialidade da torre — cores que dialogam com a paleta do site |
| `[minimalist geometric lines inspired by Oscar Niemeyer]` | Referência visual arquitetônica específica de Brasília |
| `surrounded by [native Cerrado gardens and reflecting water pools]` | Elementos primários de ambiente — bioma local + água |
| `plus [warm sunset light creating golden refractions on the glass]` | Elementos ópticos — refrações douradas na fachada de vidro |
| `[Graduated twilight sky from deep navy to amber-gold], bright and radiant.` | Fundo degradê — navy (#1D2D3A) do site para dourado (#B68863) |
| `Captured with [Sony A7R V 16-35mm GM at f/8]` | Equipamento fotográfico — ultra-wide, profundidade de campo grande |
| `[golden-hour natural key light with subtle architectural fill]` | Lighting setup — luz natural do pôr-do-sol com preenchimento |
| `[crisp highlights with creamy bokeh]` | Qualidade dos highlights — definição no edifício, suavidade no fundo |
| `[Kinfolk meets Sotheby's real-estate editorial]` | Direção estética — minimalismo escandinavo + luxo imobiliário |

### Parâmetros técnicos

| Flag | Valor | O que faz |
|------|-------|-----------|
| `--ar 16:9` | Widescreen | Proporção perfeita para hero section |
| `--s 250` | Style medium-high | Realismo com toque editorial sofisticado |
| `--q 2` | Max quality | Detalhes mais refinados em texturas |
| `--c 15` | Low chaos | Variações controladas, previsível |
| `--seed 777` | Seed fixo | Reproduzível se precisar gerar novamente |
| `--no people, cars, text, logos, power lines, ugly buildings` | Remoções | Sem elementos que poluam a composição |

> **Dica:** no Midjourney, adicione `--style raw` para reduzir o "brilho" padrão da engine.

## Notas
Usar Unsplash como fallback com search `luxury apartment building twilight Brasilia modernist`. Verificar direitos de uso comercial.
