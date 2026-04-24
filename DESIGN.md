---
version: alpha
name: PrimeUrban
description: Sistema visual de uma vitrine digital de imóveis de alto padrão em Brasília. Quente, sofisticado e calmo — ancorado em navy profundo, bronze dourado e um creme acolhedor.
colors:
  primary: "#1D2D3A"
  primary-foreground: "#F9F6F0"
  secondary: "#B68863"
  secondary-foreground: "#1D2D3A"
  tertiary: "#3D4D55"
  tertiary-foreground: "#F9F6F0"
  neutral: "#F9F6F0"
  on-neutral: "#1D2D3A"
  surface: "#F9F6F0"
  on-surface: "#1D2D3A"
  surface-card: "#FFFFFF"
  on-surface-card: "#1D2D3A"
  muted: "#D9C3A9"
  on-muted: "#3D4D55"
  border: "#D9C3A9"
  ring: "#B68863"
  accent-mauve: "#A78E9C"
  accent-lake: "#446F91"
  info: "#446F91"
  success: "#2E7D32"
  warning: "#B26A00"
  error: "#B00020"
  on-status: "#FFFFFF"
  whatsapp: "#25D366"
  on-whatsapp: "#FFFFFF"
typography:
  display:
    fontFamily: Playfair Display
    fontSize: 56px
    fontWeight: 700
    lineHeight: 1.05
    letterSpacing: -0.01em
  headline-lg:
    fontFamily: Playfair Display
    fontSize: 40px
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Playfair Display
    fontSize: 28px
    fontWeight: 600
    lineHeight: 1.2
  title-lg:
    fontFamily: Libre Baskerville
    fontSize: 20px
    fontWeight: 700
    lineHeight: 1.3
  body-lg:
    fontFamily: Libre Baskerville
    fontSize: 18px
    fontWeight: 400
    lineHeight: 1.7
  body-md:
    fontFamily: Libre Baskerville
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.7
  label-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: 0.02em
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: 500
    lineHeight: 1.2
    letterSpacing: 0.06em
  price:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: -0.01em
rounded:
  none: 0px
  sm: 1rem
  md: 1.125rem
  DEFAULT: 1.25rem
  lg: 1.25rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  xs: 4px
  sm: 12px
  md: 24px
  lg: 40px
  xl: 64px
  gutter: 24px
  margin: 32px
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.primary-foreground}"
    typography: "{typography.label-md}"
    rounded: "{rounded.DEFAULT}"
    padding: "{spacing.md}"
  button-primary-hover:
    backgroundColor: "{colors.tertiary}"
    textColor: "{colors.primary-foreground}"
  button-secondary:
    backgroundColor: "{colors.secondary}"
    textColor: "{colors.secondary-foreground}"
    typography: "{typography.label-md}"
    rounded: "{rounded.DEFAULT}"
    padding: "{spacing.md}"
  button-secondary-hover:
    backgroundColor: "{colors.muted}"
    textColor: "{colors.primary}"
  button-whatsapp:
    backgroundColor: "{colors.whatsapp}"
    textColor: "{colors.on-whatsapp}"
    typography: "{typography.label-md}"
    rounded: "{rounded.full}"
    padding: "{spacing.md}"
  card-property:
    backgroundColor: "{colors.surface-card}"
    textColor: "{colors.on-surface-card}"
    rounded: "{rounded.lg}"
    padding: "{spacing.md}"
  card-property-hover:
    backgroundColor: "{colors.surface-card}"
  badge-featured:
    backgroundColor: "{colors.secondary}"
    textColor: "{colors.secondary-foreground}"
    typography: "{typography.label-sm}"
    rounded: "{rounded.full}"
    padding: "{spacing.xs}"
  badge-status:
    backgroundColor: "{colors.muted}"
    textColor: "{colors.on-muted}"
    typography: "{typography.label-sm}"
    rounded: "{rounded.full}"
    padding: "{spacing.xs}"
  input-field:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    typography: "{typography.body-md}"
    rounded: "{rounded.sm}"
    padding: "{spacing.sm}"
  input-field-focus:
    backgroundColor: "{colors.surface-card}"
  header-nav:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.primary}"
    typography: "{typography.label-md}"
    padding: "{spacing.md}"
  sidebar:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.primary-foreground}"
    padding: "{spacing.md}"
  price-tag:
    textColor: "{colors.secondary}"
    typography: "{typography.price}"
---

# PrimeUrban — DESIGN.md

## Overview

PrimeUrban é uma vitrine digital de imóveis de alto padrão em Brasília. O sistema visual foi construído para evocar **elegância serena** e **confiança institucional**, aproximando o usuário da experiência de folhear um portfólio editorial de arquitetura.

A personalidade da marca é **sofisticada, calma e curatorial**. Evitamos o visual agressivo típico de portais de classificados: nada de vermelhos saturados, grids densos ou carimbos promocionais. Em vez disso, há **muita respiração**, serifas editoriais para o conteúdo longo, sans-serif para metadados, e o dourado aparece com parcimônia — apenas onde o olho precisa pousar (preços, CTAs primários, selos de destaque).

O público-alvo são compradores e investidores do Distrito Federal que valorizam discrição e qualidade. A sensação pretendida é a de um **lobby de hotel boutique** — aconchegante, pouco iluminado, materiais quentes.

## Colors

A paleta se organiza em torno de três tons de marca quentes e um fundo creme neutro. O contraste é obtido por variação de valor (navy sobre creme) em vez de saturação.

- **Primary (#1D2D3A) — Navy Profundo:** cor âncora. Usada no cabeçalho, rodapé, tipografia principal e em CTAs secundários. Transmite permanência e seriedade.
- **Secondary (#B68863) — Bronze Dourado:** único driver de destaque cromático. Reservado para **preços**, selos "Destaque" e CTAs primários de conversão. Nunca preencha grandes áreas com ele.
- **Tertiary (#3D4D55) — Cinza-Azulado:** tom de apoio para textos secundários, ícones e estados hover de superfícies escuras.
- **Neutral / Surface (#F9F6F0) — Creme:** fundo padrão de todo o site. Evita o branco clínico e dá um filtro caloroso à página.
- **Surface Card (#FFFFFF):** branco puro reservado a cards de imóveis sobre o creme — cria uma hierarquia tonal sem sombras fortes.
- **Muted (#D9C3A9) — Areia:** bordas, separadores e backgrounds de inputs. Faz a transição entre o creme e o branco sem quebrar a paleta.
- **Accent Mauve (#A78E9C)** e **Accent Lake (#446F91):** acentos decorativos raros (gráficos, ilustrações). Nunca concorrem com o bronze.
- **WhatsApp (#25D366):** reservado **exclusivamente** ao CTA flutuante e botões de contato via WhatsApp. Não reutilizar esse verde em nenhum outro contexto.
- **Status (info/success/warning/error):** apenas para mensagens de formulário e feedback de sistema.

## Typography

O par tipográfico opõe uma **serifa editorial** a uma **sans-serif técnica**:

- **Playfair Display** — serifa de alto contraste para *displays* e manchetes. Dá o tom editorial/premium logo no primeiro olhar.
- **Libre Baskerville** — serifa mais legível e de baixo contraste, aplicada ao `body` do site. Sustenta blocos longos (descrição de imóveis, página *Sobre*) sem fadiga visual.
- **Inter** — sans-serif geométrica usada em labels, botões, filtros, metadados numéricos e preços. Garante clareza em tamanhos pequenos.

Regras de aplicação:

- **Títulos de seção e nomes de imóveis** usam Playfair Display (`display`, `headline-lg`, `headline-md`).
- **Conteúdo corrido** usa Libre Baskerville (`body-md`/`body-lg`).
- **UI chrome** (botões, chips, filtros, labels, preços) usa Inter em pesos 500/600/700.
- **Preços** seguem o token `price` (Inter 700, tabular), sempre em `--secondary`.
- Evite mais de **duas famílias por tela** — Playfair + Inter é a combinação padrão; Libre Baskerville só aparece quando há parágrafo longo.

## Layout

O layout é **editorial e arejado**, pensado para respirar em telas grandes e se condensar limpo no mobile.

- **Grid:** fluido no mobile, contido em desktop com `max-width` ao redor de 1200–1280px. Gutters de 24px, margens externas de 32px.
- **Ritmo vertical:** escala de espaçamento baseada em múltiplos de 8px. Seções da home são separadas por `xl` (64px); blocos internos usam `lg` (40px); elementos de formulário agrupam com `sm` (12px).
- **Cards de imóvel:** padding interno generoso (`md` = 24px), imagem em aspect-ratio 4:3, metadados alinhados à esquerda com labels em Inter e preço em destaque à direita.
- **Hero:** imagem full-bleed com overlay navy `rgba(29,45,58,0.55)`, título em Playfair Display alinhado à esquerda.
- **Containers centralizados:** nenhum texto corrido ultrapassa ~72 caracteres por linha.

## Elevation & Depth

A hierarquia é **tonal**, não baseada em sombras pesadas.

- **Superfícies:** o fundo `--surface` (creme) hospeda cards em `--surface-card` (branco). Essa única mudança de valor já separa o conteúdo do fundo.
- **Sombras:** quando necessárias (cards em hover, popovers, dropdowns), use `shadow` muito difusa — blur 24–40px, opacidade 6–10%, com leve deslocamento no eixo Y (4–8px). Nunca sombras escuras saturadas.
- **Interações:** cards reagem ao hover com uma leve elevação (+2px Y, sombra mais difusa) e transição de `200ms ease-out`. Botões escurecem via troca de `backgroundColor` (ver tokens `*-hover`).

## Shapes

A linguagem de forma é **generosamente arredondada**, alinhada ao token `--radius: 1.25rem`.

- **Cards:** `rounded-xl` (1.5rem) para parecer esculpido e convidativo.
- **Botões e inputs:** `rounded` padrão (1.25rem). Botão do WhatsApp é `full` (pílula) para reforçar a affordance circular.
- **Imagens dentro de cards:** seguem o raio do card, recortadas em cima para uma aresta contínua.
- **Ícones:** pictogramas lineares (lucide-react) com stroke fino, sem preenchimentos pesados.

## Components

### Botões

Três variantes:
- `button-primary` (navy + creme): CTA de conversão principal quando o contexto é navegacional (“Ver imóveis”, “Explorar bairros”).
- `button-secondary` (bronze + navy): CTA editorial — usado em “Agendar visita” e chamadas financeiras.
- `button-whatsapp` (verde + branco, formato pílula): botão flutuante e CTAs de contato direto. Nunca substitua outro botão primário por ele.

Transições: 150–200ms `ease-in-out` no `backgroundColor`.

### Cards

`card-property` é o átomo central da listagem: fundo branco puro, raio `lg`, imagem 4:3 no topo, stack vertical de metadados (bairro → tipo → área/dormitórios → preço). O preço usa o token `price-tag` — Inter 700 em bronze.

Em hover: sombra mais difusa + discreta translação vertical; a imagem não sofre zoom agressivo (máximo `scale(1.02)`).

### Selos

- `badge-featured` (bronze sólido) marca imóveis em destaque e integrações VIP — uso parcimonioso.
- `badge-status` (areia sobre cinza-azulado) sinaliza estados neutros como "Novo", "Exclusivo" ou "Aceita permuta".

### Inputs e Filtros

`input-field` usa fundo creme para se fundir ao layout; no foco migra para branco puro e ganha `--ring` (bronze). Chips de filtro reutilizam o estilo `badge-status` com estado selecionado trocando para `backgroundColor: primary` e `textColor: primary-foreground`.

### Navegação

- `header-nav` é sticky, fundo creme com leve blur de 8px quando a página rola.
- `sidebar` (painel navy) aparece em mobile como off-canvas e no dashboard editorial. Links ativos ganham fundo `--tertiary`.

## Do's and Don'ts

- **Do** reservar o bronze (`secondary`) para preços, selos de destaque e o único CTA primário por tela.
- **Do** deixar o creme respirar — prefira adicionar espaço a adicionar decoração.
- **Do** usar Playfair Display para títulos de imóveis e Libre Baskerville para descrições longas.
- **Do** manter todos os botões com raio `1.25rem` ou maior para preservar a linguagem arredondada.
- **Don't** misturar o verde do WhatsApp com nenhum outro componente que não seja contato direto.
- **Don't** usar vermelhos saturados ou amarelos vibrantes como cor de marca — reserve vermelho apenas para o token `error`.
- **Don't** empilhar três ou mais famílias tipográficas numa mesma tela.
- **Don't** aplicar sombras escuras e duras; a profundidade vem de camadas tonais e sombras difusas.
- **Don't** usar o navy como fundo de blocos extensos de texto corrido — ele é cromaticamente pesado; prefira o creme com texto navy.
