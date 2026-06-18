import type { MetadataRoute } from 'next'
import { BRAND } from '@/lib/copy'
import { COMPARISONS } from '@/lib/data/comparisons'
import { allStatePages } from '@/lib/data/state-pages'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = BRAND.shareUrl

  const staticPages = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 1.0 },
    { url: `${baseUrl}/privacy`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.3 },
    { url: `${baseUrl}/methodology`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: `${baseUrl}/editorial-standards`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.5 },
    { url: `${baseUrl}/first-paycheck-checklist`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.9 },
    { url: `${baseUrl}/take-home-pay`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.8 },
  ]

  const comparisonPages = COMPARISONS.map((c) => ({
    url: `${baseUrl}/best/${c.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  const statePages = allStatePages().map((state) => ({
    url: state.url,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  return [...staticPages, ...comparisonPages, ...statePages]
}
