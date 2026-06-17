import type { MetadataRoute } from 'next'
import { COMPARISONS } from '@/lib/data/comparisons'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://paychecktool.app'

  const staticPages = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 1.0 },
    { url: `${baseUrl}/privacy`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.3 },
    { url: `${baseUrl}/first-paycheck-checklist`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.9 },
  ]

  const comparisonPages = COMPARISONS.map((c) => ({
    url: `${baseUrl}/best/${c.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  return [...staticPages, ...comparisonPages]
}
