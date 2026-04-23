import type { MetadataRoute } from "next"
import { mockProperties, mockNeighborhoods } from "@/lib/mock-data"

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://primeurban.com.br"

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/imoveis`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/bairros`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/sobre`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.5,
    },
    {
      url: `${SITE_URL}/contato`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.5,
    },
  ]

  const propertyRoutes: MetadataRoute.Sitemap = mockProperties.map((p) => ({
    url: `${SITE_URL}/imoveis/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.8,
  }))

  const neighborhoodRoutes: MetadataRoute.Sitemap = mockNeighborhoods.map((n) => ({
    url: `${SITE_URL}/bairros/${n.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.6,
  }))

  return [...staticRoutes, ...propertyRoutes, ...neighborhoodRoutes]
}
