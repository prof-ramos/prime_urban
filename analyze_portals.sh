#!/bin/bash

URLS=(
  "https://www.zapimoveis.com.br"
  "https://www.quintoandar.com.br"
  "https://www.vivareal.com.br"
  "https://www.chavesnamao.com.br"
  "https://www.imovelweb.com.br"
  "https://www.wimoveis.com.br"
)

NAMES=(
  "zap"
  "quintoandar"
  "vivareal"
  "chavesnamao"
  "imovelweb"
  "wimoveis"
)

mkdir -p analysis_results/screenshots

for i in "${!URLS[@]}"; do
  URL="${URLS[$i]}"
  NAME="${NAMES[$i]}"
  
  echo "--- Analyzing $NAME ($URL) ---"
  
  # Set Desktop Viewport
  agent-browser set viewport 1440 900
  
  # Open URL
  agent-browser open "$URL"
  
  # Wait for page to settle
  agent-browser wait 5000
  
  # Screenshot Desktop
  agent-browser screenshot "analysis_results/screenshots/${NAME}_desktop.png"
  
  # Extract SEO and Basic Info
  agent-browser eval "JSON.stringify({
    url: window.location.href,
    title: document.title,
    description: document.querySelector('meta[name=\"description\"]')?.content,
    h1: Array.from(document.querySelectorAll('h1')).map(el => el.innerText.trim()),
    canonical: document.querySelector('link[rel=\"canonical\"]')?.href,
    ogTitle: document.querySelector('meta[property=\"og:title\"]')?.content,
    lazyImages: document.querySelectorAll('img[loading=\"lazy\"]').length,
    noAltImages: document.querySelectorAll('img:not([alt])').length,
    structuredData: !!document.querySelector('script[type=\"application/ld+json\"]'),
    hasMap: !!(document.body.innerText.includes('Mapa') || document.querySelector('.map-container') || document.querySelector('[class*=\"map\"]')),
    hasTour: !!(document.body.innerText.includes('Tour Virtual') || document.body.innerText.includes('360'))
  })" > "analysis_results/${NAME}_data.json"
  
  # Performance (LCP)
  agent-browser eval "new Promise(resolve => {
    let lcp = 0;
    new PerformanceObserver((list) => {
      const entries = list.getEntries();
      lcp = entries[entries.length - 1].startTime;
    }).observe({type: 'largest-contentful-paint', buffered: true});
    setTimeout(() => resolve(lcp), 2000);
  })" > "analysis_results/${NAME}_perf.txt"
  
  # Mobile Analysis
  agent-browser set viewport 375 812
  agent-browser wait 2000
  agent-browser screenshot "analysis_results/screenshots/${NAME}_mobile.png"
  
  # Reset Viewport
  agent-browser set viewport 1440 900
  
  echo "Finished $NAME"
done

echo "All analyses complete."
