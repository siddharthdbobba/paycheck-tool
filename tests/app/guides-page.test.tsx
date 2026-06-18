import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import GuidesIndexPage from '@/app/guides/page'
import GuidePage, { generateStaticParams } from '@/app/guides/[slug]/page'

const expectedSlugs = [
  'roth-vs-traditional-401k',
  'how-much-of-my-paycheck-to-save',
  '401k-match-vs-student-loans',
  'why-is-my-first-paycheck-so-small',
]

describe('/guides', () => {
  it('generates a static route for each guide', () => {
    expect(generateStaticParams()).toEqual(expectedSlugs.map((slug) => ({ slug })))
  })

  it('renders a guide heading and FAQ structured data', async () => {
    const { container } = render(
      await GuidePage({ params: Promise.resolve({ slug: 'roth-vs-traditional-401k' }) }),
    )

    expect(
      screen.getByRole('heading', {
        level: 1,
        name: 'Roth vs Traditional 401(k): Which Should a New Grad Pick?',
      }),
    ).toBeTruthy()
    expect(screen.getByText(/updated 2026/i)).toBeTruthy()
    expect(screen.getByRole('link', { name: /best roth ira brokerages for beginners/i }).getAttribute('href')).toBe(
      '/best/best-roth-ira-brokerages',
    )

    const scripts = Array.from(container.querySelectorAll('script[type="application/ld+json"]'))
    expect(scripts.some((script) => script.textContent?.includes('"@type":"FAQPage"'))).toBe(true)
    expect(scripts.some((script) => script.textContent?.includes('"@type":"BreadcrumbList"'))).toBe(true)
  })

  it('lists every guide from the index and links back to the checklist', async () => {
    render(await GuidesIndexPage())

    for (const slug of expectedSlugs) {
      expect(screen.getByRole('link', { name: new RegExp(slug.replaceAll('-', '.*'), 'i') }).getAttribute('href')).toBe(
        `/guides/${slug}`,
      )
    }

    expect(screen.getByRole('link', { name: /first paycheck checklist/i }).getAttribute('href')).toBe(
      '/first-paycheck-checklist',
    )
  })
})
