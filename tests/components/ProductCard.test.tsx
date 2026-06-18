import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import ProductCard from '@/components/ProductCard'
import type { Product } from '@/lib/calc/types'

const product: Product = {
  id: 'savings-sofi',
  category: 'savings',
  name: 'SoFi Checking & Savings',
  blurb: 'High-yield savings with no account fees.',
  highlights: ['Competitive APY', 'No monthly fee'],
  affiliateUrl: 'https://AFFILIATE_REPLACE/sofi',
  rating: 4.8,
  bestForTag: 'starter emergency funds',
  headlineStat: { value: '4.0% APY', label: 'high-yield savings' },
  ctaLabel: 'Open my savings account',
}

describe('ProductCard', () => {
  it('renders placeholder affiliate products as non-clickable coming soon cards', () => {
    render(<ProductCard product={product} />)

    expect(screen.getByRole('button', { name: /coming soon/i }).hasAttribute('disabled')).toBe(true)
    expect(screen.queryByRole('link', { name: /open my savings account/i })).toBeNull()
  })

  it('renders live affiliate products as sponsored links', () => {
    render(<ProductCard product={{ ...product, affiliateUrl: 'https://example.com/sofi' }} />)

    const link = screen.getByRole('link', { name: /open my savings account/i })
    expect(link.getAttribute('href')).toBe('/go/savings-sofi')
    expect(link.getAttribute('rel')).toContain('sponsored')
  })

  it('renders partial stars that match the numeric rating', () => {
    render(<ProductCard product={{ ...product, affiliateUrl: 'https://example.com/sofi', rating: 4.5 }} />)

    expect(screen.getByText('★★★★½')).toBeTruthy()
  })
})
