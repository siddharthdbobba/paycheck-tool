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
    expect(screen.queryByText(categoryProducts[0].payoutNote)).toBeNull()
    expect(screen.getByText(/how we rank these picks/i)).toBeTruthy()
    expect(screen.getByText(/fees, eligibility, APY or rewards value/i)).toBeTruthy()
    expect(screen.getByText(/updated 2026/i)).toBeTruthy()
    expect(screen.getByRole('link', { name: /run your numbers/i }).getAttribute('href')).toBe('/')
    expect(screen.getByText(/email me my plan/i)).toBeTruthy()
  })

  it('adds dateModified and url to the comparison JSON-LD', async () => {
    const comparison = COMPARISONS[0]
    const { container } = render(await BestPage({ params: Promise.resolve({ slug: comparison.slug }) }))
    const script = container.querySelector('script[type="application/ld+json"]')

    expect(script?.textContent).toContain('"dateModified"')
    expect(script?.textContent).toContain(`"url":"https://paycheck-tool-faceless1.vercel.app/best/${comparison.slug}"`)
  })

  it('renders accessible desktop comparison headers, sticky table chrome, zebra rows, and best-for chips', async () => {
    const comparison = COMPARISONS[0]
    const categoryProducts = productsForCategory(comparison.category)
    const { container } = render(await BestPage({ params: Promise.resolve({ slug: comparison.slug }) }))

    expect(container.querySelector('thead')?.className).toContain('sticky')
    expect(container.querySelector('thead')?.className).toContain('top-16')
    expect(container.querySelector('tbody tr')?.className).toContain('even:bg-zinc-50')

    const headers = Array.from(container.querySelectorAll('table th'))
    expect(headers.every((header) => header.getAttribute('scope'))).toBe(true)

    const table = container.querySelector('table')

    for (const product of categoryProducts) {
      expect(table?.textContent).toContain(`Best for ${product.bestForTag}`)
    }
  })
})
