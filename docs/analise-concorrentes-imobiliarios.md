# Relatório de Análise Técnica: Benchmarking Imobiliário Brasileiro

Este relatório apresenta uma análise comparativa e técnica dos principais portais imobiliários do Brasil, visando extrair padrões de UX, SEO e performance para o projeto PrimeUrban.

## 1. Tabela Comparativa

| Portal | Performance (Est.) | JSON-LD Schema? | CTA Principal (Ficha) | Mapa Integrado | Tour Virtual? | Lazy Loading? | Mobile-First? |
| :--- | :--- | :---: | :--- | :--- | :---: | :---: | :---: |
| **Zap Imóveis** | Média | Sim | WhatsApp / Telefone | Google Maps | Sim | Sim | Sim |
| **QuintoAndar** | Rápida | Sim | Agendar Visita | Mapbox | Sim | Sim | Sim |
| **Viva Real** | Média | Sim | WhatsApp / Mensagem | Google Maps | Sim | Sim | Sim |
| **Chaves na Mão** | Média | Sim | WhatsApp / Chat | Google Maps | Não | Sim | Sim |
| **Imovelweb** | Lenta/Média | Sim | Ver Telefone | Google Maps | Sim | Sim | Sim |
| **Wimoveis** | Lenta/Média | Sim | Ver Telefone | Google Maps | Sim | Sim | Sim |

---

## 2. Top 10 Ideias de Melhoria (Next.js & App Router)

1.  **Filtros de Busca em Tabs no Hero**
    *   **O que é:** Divisão clara entre "Comprar" e "Alugar" logo no início do fluxo.
    *   **Onde viu:** QuintoAndar, Zap Imóveis.
    *   **Como implementar:** Usar o componente `Tabs` do shadcn/ui com persistência de estado via `searchParams` no Next.js.
    *   **Impacto:** UX (Redução de fricção).

2.  **Breadcrumbs Dinâmicos para SEO**
    *   **O que é:** Trilha de navegação que ajuda o usuário e o Google a entender a hierarquia (Home > SP > Bairro).
    *   **Onde viu:** Todos os portais.
    *   **Como implementar:** Gerar breadcrumbs baseados no slug da rota (`app/imoveis/[estado]/[cidade]/[bairro]/page.tsx`).
    *   **Impacto:** SEO (Indexação e Internal Linking).

3.  **Skeleton Loading para Cards de Imóvel**
    *   **O que é:** Exibição de um estado visual placeholder enquanto os dados do Payload CMS são carregados.
    *   **Onde viu:** QuintoAndar.
    *   **Como implementar:** Utilizar o arquivo `loading.tsx` do App Router para renderizar skeletons dos cards.
    *   **Impacto:** Performance Percebida (LCP/FCP).

4.  **Galeria de Fotos com Carrossel Otimizado**
    *   **O que é:** Navegação rápida de fotos sem sair do card de listagem.
    *   **Onde viu:** QuintoAndar.
    *   **Como implementar:** Embla Carousel (usado pelo QuintoAndar) com `priority={index === 0}` nas primeiras imagens via `next/image`.
    *   **Impacto:** UX / Conversão.

5.  **Mapa de Proximidade e Pontos de Interesse**
    *   **O que é:** Exibição de escolas, parques e transporte próximos ao imóvel.
    *   **Onde viu:** Zap Imóveis, QuintoAndar.
    *   **Como implementar:** Integração com Google Places API ou Mapbox GL JS no Detail Page.
    *   **Impacto:** Conversão (Informação vital).

6.  **Seção "Imóveis Similares" Baseada em Bairro**
    *   **O que é:** Recomendações no rodapé da ficha do imóvel para aumentar o tempo de permanência.
    *   **Onde viu:** Todos os portais.
    *   **Como implementar:** Query no Payload CMS filtrando por `neighborhood` e excluindo o `id` atual.
    *   **Impacto:** SEO (Link Equity) / Retenção.

7.  **Labels Descritivas em Imagens da Galeria**
    *   **O que é:** Texto sobreposto indicando "Sala", "Cozinha", "Fachada" nas fotos.
    *   **Onde viu:** QuintoAndar.
    *   **Como implementar:** Adicionar um campo `label` na collection `Media` do Payload e renderizar como um badge sobre a imagem.
    *   **Impacto:** UX / Acessibilidade.

8.  **URL Slugs Semânticas e Únicas**
    *   **O que é:** URLs que incluem tipo, bairro e ID (ex: `/apartamento-vila-mariana-id-123`).
    *   **Onde viu:** Zap Imóveis, Viva Real.
    *   **Como implementar:** Configurar o campo `slug` no Payload para ser gerado a partir de múltiplos campos.
    *   **Impacto:** SEO (Keywords na URL).

9.  **WhatsApp CTA Flutuante (Mobile)**
    *   **O que é:** Botão fixo no rodapé para contato rápido via WhatsApp no mobile.
    *   **Onde viu:** Chaves na Mão, Viva Real.
    *   **Como implementar:** Componente `Fixed` com `z-index` alto, visível apenas em viewports mobile.
    *   **Impacto:** Conversão (Métrica principal no Brasil).

10. **Structured Data (JSON-LD) para RealEstateListing**
    *   **O que é:** Script invisível que informa ao Google preço, endereço e tipo de imóvel.
    *   **Onde viu:** Todos os portais.
    *   **Como implementar:** Gerar o script JSON-LD dinamicamente no `layout.tsx` ou `page.tsx` da ficha de imóvel.
    *   **Impacto:** SEO (Rich Snippets nos resultados de busca).

---

## 3. Achados de SEO Técnico

*   **Canonicals:** Cruciais para evitar conteúdo duplicado em páginas de listagem com filtros aplicados.
*   **H1 Descritivo:** O QuintoAndar utiliza H1s muito específicos (ex: "Apartamento para alugar com 38m²...") ao invés de apenas o nome do imóvel. Isso ajuda no rankeamento de cauda longa (long-tail).
*   **Sitemaps Segmentados:** Portais grandes dividem sitemaps por cidade ou estado para facilitar o rastreamento.

---

## 4. Padrões de Design System

*   **Cores:** Predomínio de Azul (confiança), Laranja (energia/ação - Zap/Chaves) ou Rosa/Roxo (inovação - QuintoAndar).
*   **Card Design:** Proporção de imagem 4:3, bordas arredondadas (8px a 12px), sombras leves (shadow-sm ou shadow-md).
*   **Tipografia:** Uso de fontes Sans-Serif limpas (Inter, Roboto, Montserrat) com tamanhos base de 16px para corpo e 18-24px para títulos de cards.

---

## 5. Quick Wins (Menos de 1 dia de esforço)

1.  **H1 Dinâmico na Ficha:** Alterar o `<h1>` da página de detalhes para incluir `[Tipo] + [Bairro] + [Quartos]` ao invés de apenas o título curto.
2.  **Next/Image Priority:** Adicionar a propriedade `priority` à primeira imagem do carrossel na página de detalhes para melhorar o LCP instantaneamente.
3.  **Meta Description com Preço:** Incluir o valor do imóvel na meta description gerada via `generateMetadata` do Next.js para aumentar o CTR no Google.
