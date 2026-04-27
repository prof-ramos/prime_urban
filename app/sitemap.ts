import type { MetadataRoute } from "next"
import { getAllPublishedProperties } from "@/lib/payload/properties"
import { getActiveNeighborhoods } from "@/lib/payload/neighborhoods"
import { siteConfig } from "@/lib/site-config"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let properties: Awaited<ReturnType<typeof getAllPublishedProperties>> = []
  let neighborhoods: Awaited<ReturnType<typeof getActiveNeighborhoods>> = []

  try {
    ;[properties, neighborhoods] = await Promise.all([
      getAllPublishedProperties(),
      getActiveNeighborhoods(),
    ])
  } catch (err) {
    console.error('[sitemap] failed to fetch data:', err)
  }
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: siteConfig.siteUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${siteConfig.siteUrl}/imoveis`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${siteConfig.siteUrl}/bairros`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${siteConfig.siteUrl}/sobre`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.5,
    },
    {
      url: `${siteConfig.siteUrl}/contato`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.5,
    },
  ]

  const propertyRoutes: MetadataRoute.Sitemap = properties.map((p) => ({
    url: `${siteConfig.siteUrl}/imoveis/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.8,
  }))

  const neighborhoodRoutes: MetadataRoute.Sitemap = neighborhoods.map((n) => ({
    url: `${siteConfig.siteUrl}/bairros/${n.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.6,
  }))

  return [...staticRoutes, ...propertyRoutes, ...neighborhoodRoutes]
}
