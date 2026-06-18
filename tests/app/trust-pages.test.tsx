import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import RootLayout, { metadata } from '@/app/layout'
import sitemap from '@/app/sitemap'
import EditorialStandardsPage, {
  metadata as editorialMetadata,
} from '@/app/editorial-standards/page'
import MethodologyPage, { metadata as methodologyMetadata } from '@/app/methodology/page'
import { BRAND, COPY } from '@/lib/copy'

vi.mock('next/font/google', () => ({
  Geist: () => ({ variable: 'font-geist-sans' }),
  Geist_Mono: () => ({ variable: 'font-geist-mono' }),
}))

vi.mock('next/navigation', () => ({
  usePathname: () => '/methodology',
}))

describe('trust pages and site metadata', () => {
  it('sets metadataBase from the canonical brand URL', () => {
    expect(metadata.metadataBase?.toString()).toBe(`${BRAND.shareUrl}/`)
  })

  it('adds methodology and editorial standards to the sitemap', () => {
    const urls = sitemap().map((entry) => entry.url)

    expect(urls).toContain(`${BRAND.shareUrl}/methodology`)
    expect(urls).toContain(`${BRAND.shareUrl}/editorial-standards`)
  })

  it('renders the footer trust cluster with policy links and advice disclaimer', () => {
    render(
      <RootLayout>
        <div>Child content</div>
      </RootLayout>,
    )

    expect(screen.getByRole('link', { name: /methodology/i }).getAttribute('href')).toBe('/methodology')
    expect(screen.getByRole('link', { name: /editorial standards/i }).getAttribute('href')).toBe('/editorial-standards')
    expect(screen.getByRole('link', { name: /privacy/i }).getAttribute('href')).toBe('/privacy')
    expect(screen.getByText(COPY.disclaimer)).toBeTruthy()
    expect(screen.getByText(/not financial advice/i)).toBeTruthy()
  })

  it('renders methodology content, outbound source links, metadata, and Article JSON-LD', () => {
    const { container } = render(<MethodologyPage />)

    expect(methodologyMetadata.title).toContain('Methodology')
    expect(screen.getByRole('heading', { level: 1, name: /methodology/i })).toBeTruthy()
    expect(screen.getAllByText(/2026 tax year/i).length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByText(/standard deduction/i).length).toBeGreaterThanOrEqual(1)
    expect(screen.getByText(/6.2%/i)).toBeTruthy()
    expect(screen.getByText(/1.45%/i)).toBeTruthy()
    expect(screen.getAllByText(/estimates, not advice/i).length).toBeGreaterThanOrEqual(1)
    expect(screen.getByText(/fees, eligibility, APY/i)).toBeTruthy()

    const outboundLinks = Array.from(container.querySelectorAll('a[href^="https://"]'))
    expect(outboundLinks.length).toBeGreaterThanOrEqual(2)
    expect(outboundLinks.every((link) => link.getAttribute('rel') === 'noopener')).toBe(true)

    const jsonLd = container.querySelector('script[type="application/ld+json"]')?.textContent ?? ''
    expect(jsonLd).toContain('"@type":"Article"')
    expect(jsonLd).toContain('"author":{"@type":"Organization"')
  })

  it('renders editorial standards content and metadata', () => {
    render(<EditorialStandardsPage />)

    expect(editorialMetadata.title).toContain('Editorial Standards')
    expect(screen.getByRole('heading', { level: 1, name: /editorial standards/i })).toBeTruthy()
    expect(screen.getByText(/sourcing policy/i)).toBeTruthy()
    expect(screen.getByText(/no fabricated testimonials/i)).toBeTruthy()
    expect(screen.getByText(/compensation never changes rankings/i)).toBeTruthy()
    expect(screen.getByText(/review and update cadence/i)).toBeTruthy()
  })
})
