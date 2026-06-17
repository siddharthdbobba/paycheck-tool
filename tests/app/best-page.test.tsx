import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { COPY } from '@/lib/copy'
import { COMPARISONS } from '@/lib/data/comparisons'
import { productsForCategory } from '@/lib/data/products'
import BestPage, { generateMetadata, generateStaticParams } from '@/app/best/[slug]/page'

describe('/best/[slug]', () => {
  it('generates a static route for each comparison', () => {
    expect(generateStaticParams()).toEqual(
      COMPARISONS.map((comparison) => ({ slug: comparison.slug })),
    )
  })

  it('generates metadata from the comparison copy', async () => {
    const comparison = COMPARISONS[0]

    await expect(
      generateMetadata({ params: Promise.resolve({ slug: comparison.slug }) }),
    ).resolves.toMatchObject({
      title: comparison.title,
      description: comparison.metaDescription,
    })
  })

  it('renders the comparison page with category products and disclosure copy', async () => {
    const comparison = COMPARISONS[0]
    const categoryProducts = productsForCategory(comparison.category)
    const excludedProduct = productsForCategory('brokerage')[0]

    render(await BestPage({ params: Promise.resolve({ slug: comparison.slug }) }))

    expect(screen.getByRole('heading', { level: 1, name: comparison.title })).toBeTruthy()
    expect(screen.getByText(comparison.intro)).toBeTruthy()
    expect(screen.getAllByText(COPY.disclosure).length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByText(categoryProducts[0].name).length).toBeTruthy()
    expect(screen.queryByText(excludedProduct.name)).toBeNull()
  })
})
